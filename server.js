/**
 * Production entry point — this is the "Entry file" to set in hPanel.
 *
 * One Node process serves both the API (/api/*) and the built SPA from dist/,
 * so the site needs a single application and a single domain on Hostinger.
 *
 * The project root is ESM ("type": "module" in package.json) while server/ is
 * CommonJS (server/package.json has no "type" field), so this file imports across
 * that boundary — Node handles the interop.
 */
import app from './server/index.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Anna Kitchen listening on port ${PORT}`);
});

// Hostinger restarts the app by signalling the process; close connections cleanly
// so an in-flight request is not cut off mid-response.
for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, () => {
        console.log(`${signal} received — shutting down`);
        server.close(() => process.exit(0));
    });
}
