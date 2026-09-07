const API_BASE = '/api';

// The session lives in an httpOnly cookie, so there is deliberately no token to
// read or store here — JavaScript cannot see it, which is what makes an XSS bug
// unable to steal the session. `credentials: 'same-origin'` is the fetch default
// but is stated explicitly because these calls depend on it.
const request = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    let body = null;
    if (res.headers.get('content-type')?.includes('application/json')) {
        body = await res.json().catch(() => null);
    }

    if (!res.ok) {
        const error = new Error(body?.error || `Request failed (${res.status})`);
        error.status = res.status;
        error.retryAfter = body?.retryAfter;
        throw error;
    }
    return body;
};

export const login = (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const logout = () => request('/auth/logout', { method: 'POST' });

/** Resolves to { username } when signed in, or null when not. */
export const fetchSession = async () => {
    try {
        return await request('/auth/me');
    } catch (err) {
        if (err.status === 401 || err.status === 503) return null;
        throw err;
    }
};
