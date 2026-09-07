import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchWithTimeout } from './http';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('fetchWithTimeout', () => {
    it('returns the response when the request completes in time', async () => {
        const response = { ok: true, status: 200 };
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));

        await expect(fetchWithTimeout('/api/products')).resolves.toBe(response);
    });

    it('aborts and reports a timeout when the server hangs', async () => {
        // Mimic an unreachable database: the server never answers, so the request
        // must be cut short rather than leaving the page on a spinner.
        vi.stubGlobal('fetch', vi.fn((url, { signal }) => new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => {
                const err = new Error('aborted');
                err.name = 'AbortError';
                reject(err);
            });
        })));

        await expect(fetchWithTimeout('/api/products', {}, 20))
            .rejects.toThrow('Request timed out after 20ms');
    });

    it('passes the abort signal and caller options through to fetch', async () => {
        const spy = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', spy);

        await fetchWithTimeout('/api/blogs', { method: 'GET', headers: { A: 'b' } });

        const [url, options] = spy.mock.calls[0];
        expect(url).toBe('/api/blogs');
        expect(options.method).toBe('GET');
        expect(options.headers).toEqual({ A: 'b' });
        expect(options.signal).toBeInstanceOf(AbortSignal);
    });

    it('surfaces a genuine network error unchanged', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')));

        await expect(fetchWithTimeout('/api/products')).rejects.toThrow('Failed to fetch');
    });

    it('clears its timer so a resolved request cannot abort later', async () => {
        vi.useFakeTimers();
        try {
            const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));

            await fetchWithTimeout('/api/products');

            expect(clearSpy).toHaveBeenCalled();
        } finally {
            vi.useRealTimers();
        }
    });
});
