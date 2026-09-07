/**
 * Admin authentication.
 *
 * Sessions are a stateless HMAC-signed token in an httpOnly cookie:
 *   base64url(JSON payload) "." base64url(HMAC-SHA256(payload))
 *
 * The algorithm is fixed and never read from the token, so the JWT
 * "algorithm confusion" class of attack does not apply. Stateless means a
 * Hostinger restart does not log the admin out, and there is no session table.
 *
 * The password is never stored anywhere in plaintext — only a scrypt hash, in
 * the ADMIN_PASSWORD_HASH environment variable. Generate one with:
 *   node scripts/hash-password.mjs
 */
const crypto = require('crypto');

const COOKIE_NAME = 'ak_admin';
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

// 128 * N * r = 16 MB, comfortably under Node's 32 MB scrypt default.
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

const toB64u = (buf) => buf.toString('base64url');
const fromB64u = (s) => Buffer.from(s, 'base64url');

/** Constant-time compare that tolerates length mismatch without throwing. */
const safeEqual = (a, b) => a.length === b.length && crypto.timingSafeEqual(a, b);

/** `scrypt$<salt b64>$<key b64>` — self-describing so the format can evolve. */
const hashPassword = (password, salt = crypto.randomBytes(16)) => {
    const key = crypto.scryptSync(password, salt, SCRYPT.keylen, SCRYPT);
    return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
};

const verifyPassword = (password, stored) => {
    if (typeof password !== 'string' || typeof stored !== 'string') return false;
    const parts = stored.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') return false;

    let salt, expected;
    try {
        salt = Buffer.from(parts[1], 'base64');
        expected = Buffer.from(parts[2], 'base64');
    } catch {
        return false;
    }
    if (salt.length === 0 || expected.length === 0) return false;

    const key = crypto.scryptSync(password, salt, expected.length, SCRYPT);
    return safeEqual(key, expected);
};

const signSession = (username, secret, ttlSeconds = SESSION_TTL_SECONDS) => {
    const payload = { sub: username, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
    const body = toB64u(Buffer.from(JSON.stringify(payload), 'utf8'));
    const mac = toB64u(crypto.createHmac('sha256', secret).update(body).digest());
    return `${body}.${mac}`;
};

/** Returns the payload, or null for anything malformed, tampered, or expired. */
const verifySession = (token, secret) => {
    if (typeof token !== 'string' || typeof secret !== 'string' || secret === '') return null;

    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [body, mac] = parts;

    const expected = crypto.createHmac('sha256', secret).update(body).digest();
    if (!safeEqual(fromB64u(mac), expected)) return null;

    let payload;
    try {
        payload = JSON.parse(fromB64u(body).toString('utf8'));
    } catch {
        return null;
    }
    if (!payload || typeof payload.sub !== 'string' || typeof payload.exp !== 'number') return null;
    if (payload.exp * 1000 <= Date.now()) return null;

    return payload;
};

const cookieOptions = () => ({
    httpOnly: true,          // unreadable from JavaScript, so XSS cannot steal the session
    sameSite: 'strict',      // not sent cross-site, which is what blocks CSRF
    secure: process.env.NODE_ENV === 'production', // HTTPS-only once deployed
    path: '/',
    maxAge: SESSION_TTL_SECONDS * 1000,
});

/**
 * Is admin auth configured at all? Read at request time, not module load, so a
 * missing variable is reported per request rather than crashing boot.
 */
const authConfig = () => {
    const secret = process.env.SESSION_SECRET;
    const hash = process.env.ADMIN_PASSWORD_HASH;
    const username = process.env.ADMIN_USERNAME;
    const configured = Boolean(secret && hash && username) && secret.length >= 32;
    return { secret, hash, username, configured };
};

/**
 * Gate for every mutating admin route.
 *
 * Fails CLOSED: if the environment is not configured, this denies rather than
 * allows. An unconfigured deployment must not be an open one.
 */
const requireAuth = (req, res, next) => {
    const { secret, configured } = authConfig();
    if (!configured) {
        console.error('Admin auth is not configured — refusing the request. See .env.example.');
        return res.status(503).json({
            error: 'Admin authentication is not configured on this server',
        });
    }

    const payload = verifySession(req.cookies?.[COOKIE_NAME], secret);
    if (!payload) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    req.admin = { username: payload.sub };
    next();
};

/**
 * Fixed-window limiter for the login route, keyed by IP. In-memory, so it
 * resets on restart and does not span instances — enough to blunt online
 * password guessing, which is all it claims to do.
 */
const createLoginRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 10 } = {}) => {
    const hits = new Map();

    return (req, res, next) => {
        const now = Date.now();
        const key = req.ip || 'unknown';

        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);

        const entry = hits.get(key) ?? { count: 0, resetAt: now + windowMs };
        entry.count += 1;
        hits.set(key, entry);

        if (entry.count > max) {
            const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
            res.setHeader('Retry-After', String(retryAfter));
            return res.status(429).json({
                error: 'Too many login attempts. Try again later.',
                retryAfter,
            });
        }
        next();
    };
};

module.exports = {
    COOKIE_NAME,
    SESSION_TTL_SECONDS,
    hashPassword,
    verifyPassword,
    signSession,
    verifySession,
    cookieOptions,
    authConfig,
    requireAuth,
    createLoginRateLimiter,
};
