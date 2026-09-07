// Read requests are all backed by bundled static data, so a slow or unreachable API
// should surrender quickly rather than leave the page on a spinner. Without this the
// browser waits out the server's own database timeout before the fallback appears.
const DEFAULT_TIMEOUT_MS = 5000;

export const fetchWithTimeout = async (url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeoutMs}ms`);
        }
        throw err;
    } finally {
        clearTimeout(timer);
    }
};
