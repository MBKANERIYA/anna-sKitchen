# Changelog

## 2026-09-07 — Migrate from Vercel to Hostinger + optimise assets
**What**: Restructured the app to run as a single Hostinger Node.js process serving both
the API and the SPA, cut `public/` from 128.4 MB to 23.6 MB, and added a test suite.
**Why**: The project was staged on Vercel, whose `vercel.json` rewrites and serverless
model have no Hostinger equivalent. Hostinger runs a long-lived Node process instead.
**Impact**: Wide.
- Every static asset URL changed (WebP + slugified names). Old URLs are dead.
- `server/index.js` no longer calls `listen()`; `server.js` does. A second `listen()` will
  now cause `EADDRINUSE`.
- API route order is load-bearing: anything added after the `GET *` fallback is unreachable.
- `npm test` now runs a build first, so it takes ~9 s.
**Files Changed**:
- `server/index.js` — serves `dist/` with tiered cache headers, SPA fallback, JSON 404 for
  unknown `/api/*`, compression, `trust proxy`, fail-fast Mongoose; `listen()` removed;
  dotenv also reads the legacy `server/.env`
- `server.js` — **new**, production entry point with graceful shutdown
- `vite.config.js` — vendor chunk splitting, no sourcemaps, es2020 target
- `vitest.config.js`, `.env.example`, `deploy/htaccess-static-fallback` — **new**
- `eslint.config.js` — Node globals for `server/`, `api/`, root tooling and tests
- `package.json` — `start`/`test`/`pretest`/`optimize:images` scripts, `engines`,
  `compression` dependency, `sharp` + `vitest` devDependencies
- `index.html` — favicon path made absolute and `type` corrected
- `src/api/http.js` — **new**, 5 s read timeout helper
- `src/api/products.js`, `src/api/blogs.js` — reads use the timeout; writes unchanged
- `scripts/` — `slugify.mjs`, `optimize-assets.mjs`, `rewrite-asset-refs.mjs`,
  `audit-assets.mjs`, `asset-map.json` (**all new**)
- 12 source files — 96 asset references rewritten
- `public/` — 99 assets regenerated; originals moved to `public-original/`
- `.gitignore` — `.env`, `public-original`, `public-optimized`
- `knowledge-base/` — **new**, this documentation
**Tests**: Vitest introduced (21 tests, all passing) across `scripts/slugify.test.mjs`,
`src/api/http.test.js`, `server/server.test.js`. `npm run lint` goes from 66 problems to 6,
all pre-existing (ISSUE-004). Production build succeeds.
**Commit**: `79ec518` on branch `hostinger-migration`; PR #1 into `main`

- Images alone went from ~111 MB to ~6.9 MB (-94%); largest single file 3.9 MB -> 183 KB.
- Bundle split from one 403 KB chunk into react 192 KB / app 153 KB / router 36 KB /
  icons 22 KB, so a content edit no longer invalidates React for returning visitors.
- Filenames normalised to lowercase-hyphenated ASCII. This was a latent production bug:
  `clients/Logo.webp` resolves on Windows and 404s on Hostinger's Linux filesystem.
- Fixed the favicon: it used a relative `href`, so on `/collections/x` the browser
  requested `/collections/images/logo.png` and 404'd. Also declared `image/svg+xml` for
  a PNG.
- Fixed a bug where an unknown `/api/*` path returned `index.html` with a 200 instead of a
  JSON 404, which would surface as an opaque JSON parse error in the client.
- Cut degraded-mode latency from 10.1 s to 5.0 s when MongoDB is unreachable — the expected
  state on first deploy until Atlas allow-lists the Hostinger IP.
- Verified manually in-browser: home, collections list, collection detail, product detail
  and blogs all render with zero 404s across 96 asset requests, with the API deliberately
  failing so the fallback path was the one exercised.

### Fixed during the session
- **Case-insensitive filesystem collision.** The first optimiser converted in place and
  crashed writing `clients/logo.webp` while reading `clients/Logo.webp`. Recovered with no
  data loss (all 13 processed originals had been backed up first), then reworked to build
  into `public-optimized/` and swap. See decisions.md.
- **`mongoose.set('bufferTimeoutMS')` placed inside an `else`**, so it only applied when
  `MONGODB_URI` was set — exactly the case where it was not needed. Caught by measuring the
  timing rather than assuming; moved to run unconditionally.
- **`slugPath` mangled uppercase extensions** (`Photo.JPEG` -> `photo-jpeg.jpeg`) because
  `basename(file, ext)` matches case-sensitively. Found by the new unit test. No shipped
  asset was affected — every original extension was already lowercase.
