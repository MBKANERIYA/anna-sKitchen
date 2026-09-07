import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
    hashPassword,
    verifyPassword,
    signSession,
    verifySession,
    authConfig,
    cookieOptions,
    createLoginRateLimiter,
} = require('./auth.js');

const SECRET = 'a'.repeat(48);

describe('password hashing', () => {
    it('verifies a correct password', () => {
        const hash = hashPassword('correct-horse-battery');
        expect(verifyPassword('correct-horse-battery', hash)).toBe(true);
    });

    it('rejects a wrong password', () => {
        const hash = hashPassword('correct-horse-battery');
        expect(verifyPassword('correct-horse-batteryX', hash)).toBe(false);
        expect(verifyPassword('', hash)).toBe(false);
    });

    it('salts, so the same password hashes differently every time', () => {
        expect(hashPassword('same-password')).not.toBe(hashPassword('same-password'));
    });

    it('never contains the plaintext password', () => {
        expect(hashPassword('hunter2-hunter2')).not.toContain('hunter2');
    });

    it('rejects malformed or non-string stored hashes without throwing', () => {
        for (const bad of ['', 'nonsense', 'scrypt$only-two', 'bcrypt$a$b', null, undefined, 42]) {
            expect(verifyPassword('whatever', bad)).toBe(false);
        }
    });
});

describe('session tokens', () => {
    it('round-trips a signed session', () => {
        const payload = verifySession(signSession('admin', SECRET), SECRET);
        expect(payload?.sub).toBe('admin');
    });

    it('rejects a token signed with a different secret', () => {
        const token = signSession('admin', SECRET);
        expect(verifySession(token, 'b'.repeat(48))).toBeNull();
    });

    it('rejects a tampered payload', () => {
        // Forge an "admin" claim and reuse the original signature.
        const token = signSession('admin', SECRET);
        const [, mac] = token.split('.');
        const forged = Buffer.from(
            JSON.stringify({ sub: 'attacker', exp: Math.floor(Date.now() / 1000) + 999 })
        ).toString('base64url');

        expect(verifySession(`${forged}.${mac}`, SECRET)).toBeNull();
    });

    it('rejects an expired session', () => {
        expect(verifySession(signSession('admin', SECRET, -1), SECRET)).toBeNull();
    });

    it('rejects malformed tokens and an empty secret', () => {
        for (const bad of ['', 'a', 'a.b.c', null, undefined, 42]) {
            expect(verifySession(bad, SECRET)).toBeNull();
        }
        expect(verifySession(signSession('admin', SECRET), '')).toBeNull();
    });

    it('cannot be forged by stripping the signature', () => {
        const body = Buffer.from(
            JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + 999 })
        ).toString('base64url');

        expect(verifySession(body, SECRET)).toBeNull();
        expect(verifySession(`${body}.`, SECRET)).toBeNull();
    });
});

describe('cookie hardening', () => {
    const original = process.env.NODE_ENV;
    afterEach(() => { process.env.NODE_ENV = original; });

    it('is httpOnly and SameSite=strict, so XSS cannot read it and CSRF cannot use it', () => {
        const opts = cookieOptions();
        expect(opts.httpOnly).toBe(true);
        expect(opts.sameSite).toBe('strict');
    });

    it('sets Secure in production only', () => {
        process.env.NODE_ENV = 'production';
        expect(cookieOptions().secure).toBe(true);
        process.env.NODE_ENV = 'development';
        expect(cookieOptions().secure).toBe(false);
    });
});

describe('authConfig fails closed', () => {
    const saved = {};
    const KEYS = ['ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH', 'SESSION_SECRET'];

    beforeEach(() => {
        for (const k of KEYS) { saved[k] = process.env[k]; delete process.env[k]; }
    });
    afterEach(() => {
        for (const k of KEYS) {
            if (saved[k] === undefined) delete process.env[k];
            else process.env[k] = saved[k];
        }
    });

    it('is unconfigured when nothing is set', () => {
        expect(authConfig().configured).toBe(false);
    });

    it('is unconfigured when any single variable is missing', () => {
        for (const omit of KEYS) {
            process.env.ADMIN_USERNAME = 'admin';
            process.env.ADMIN_PASSWORD_HASH = hashPassword('a-long-enough-password');
            process.env.SESSION_SECRET = SECRET;
            delete process.env[omit];

            expect(authConfig().configured, `missing ${omit}`).toBe(false);
        }
    });

    it('rejects a session secret shorter than 32 characters', () => {
        process.env.ADMIN_USERNAME = 'admin';
        process.env.ADMIN_PASSWORD_HASH = hashPassword('a-long-enough-password');
        process.env.SESSION_SECRET = 'too-short';

        expect(authConfig().configured).toBe(false);
    });

    it('is configured when all three are present and valid', () => {
        process.env.ADMIN_USERNAME = 'admin';
        process.env.ADMIN_PASSWORD_HASH = hashPassword('a-long-enough-password');
        process.env.SESSION_SECRET = SECRET;

        expect(authConfig().configured).toBe(true);
    });
});

describe('login rate limiting', () => {
    it('blocks with 429 once the window limit is exceeded', () => {
        const limit = createLoginRateLimiter({ windowMs: 60_000, max: 3 });
        const req = { ip: '1.2.3.4' };
        const makeRes = () => {
            const res = { statusCode: null, body: null, headers: {} };
            res.setHeader = (k, v) => { res.headers[k] = v; };
            res.status = (c) => { res.statusCode = c; return res; };
            res.json = (b) => { res.body = b; return res; };
            return res;
        };

        let allowed = 0;
        for (let i = 0; i < 3; i++) limit(req, makeRes(), () => allowed++);
        expect(allowed).toBe(3);

        const blocked = makeRes();
        let passed = false;
        limit(req, blocked, () => { passed = true; });

        expect(passed).toBe(false);
        expect(blocked.statusCode).toBe(429);
        expect(blocked.headers['Retry-After']).toBeDefined();
    });

    it('tracks each IP separately', () => {
        const limit = createLoginRateLimiter({ windowMs: 60_000, max: 1 });
        const res = () => ({ setHeader() {}, status() { return this; }, json() { return this; } });

        let a = 0, b = 0;
        limit({ ip: '1.1.1.1' }, res(), () => a++);
        limit({ ip: '2.2.2.2' }, res(), () => b++);

        expect(a).toBe(1);
        expect(b).toBe(1);
    });
});
