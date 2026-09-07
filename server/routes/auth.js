const express = require('express');
const router = express.Router();
const {
    COOKIE_NAME,
    verifyPassword,
    signSession,
    cookieOptions,
    authConfig,
    requireAuth,
    createLoginRateLimiter,
} = require('../auth');

const loginRateLimit = createLoginRateLimiter();

// POST /api/auth/login
router.post('/login', loginRateLimit, (req, res) => {
    const { secret, hash, username: expectedUser, configured } = authConfig();

    if (!configured) {
        console.error('Login attempted but admin auth is not configured. See .env.example.');
        return res.status(503).json({
            error: 'Admin authentication is not configured on this server',
        });
    }

    const { username, password } = req.body ?? {};
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Always run the password check, even when the username is wrong, so the
    // response time does not reveal whether the username exists. The message is
    // identical for both failures for the same reason.
    const userOk = username === expectedUser;
    const passOk = verifyPassword(password, hash);

    if (!userOk || !passOk) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.cookie(COOKIE_NAME, signSession(username, secret), cookieOptions());
    res.json({ username });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    // Clearing must repeat the attributes the cookie was set with (all but
    // maxAge), or the browser treats it as a different cookie and keeps the
    // original.
    const { httpOnly, sameSite, secure, path } = cookieOptions();
    res.clearCookie(COOKIE_NAME, { httpOnly, sameSite, secure, path });
    res.json({ ok: true });
});

// GET /api/auth/me - who am I? Used by the front-end route guard on load.
router.get('/me', requireAuth, (req, res) => {
    res.json({ username: req.admin.username });
});

module.exports = router;
