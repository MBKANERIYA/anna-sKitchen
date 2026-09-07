# Known Issues

## ISSUE-001: Admin area has no real authentication
**Status**: Open
**Severity**: Critical
**Discovered**: 2026-09-07
**Symptom**: Anyone can open `/admin/dashboard` directly and manage content.
**Root Cause**: Three separate gaps:
1. `src/pages/AdminLoginPage.jsx` compares against the literal string `admin` / `admin123`
   in client-side code. The credentials ship to every visitor in the JS bundle.
2. There is no route guard. `/admin/dashboard` is a plain `<Route>` in `src/App.jsx`;
   navigating straight to the URL skips the login page entirely.
3. The API itself is unauthenticated. `POST /api/products`, `DELETE /api/products/:slug/:i`,
   `POST /api/blogs` and `DELETE /api/blogs/:slug` accept any caller. A stranger with curl
   can delete the whole catalogue.
**Workaround**: None that is real. Gap 3 is reachable regardless of the front-end.
**Fix**: Not done — out of scope for the hosting migration, and flagged rather than
silently patched. Needs a server-side session or token check on every mutating route,
plus a guard component around the admin routes.
**Regression Test**: None yet. When fixed, add allowed/denied tests per mutating route.

> This was equally true on the Vercel staging deployment. It becomes materially more
> dangerous the moment the site is on a public domain with real traffic.

## ISSUE-002: Collection pages fetch `/api/products` three times per render
**Status**: Open
**Severity**: Low
**Discovered**: 2026-09-07
**Symptom**: Network panel shows three concurrent `GET /api/products` on
`/collections/:category`, and a fourth on pages that also list blogs.
**Root Cause**: Several components call `fetchProducts()` independently with no shared
cache or context.
**Workaround**: None needed. Responses are small and the browser coalesces some of it.
**Fix**: Not done. A single provider or a small cache in `src/api/` would remove it.
**Regression Test**: None.

## ISSUE-003: Brochure PDF is 16.7 MB
**Status**: Accepted Risk
**Severity**: Low
**Discovered**: 2026-09-07
**Symptom**: `/anna-kitchen-broucher.pdf` is a 16.7 MB download and is 70% of `public/`.
**Root Cause**: Never compressed. No PDF tooling (Ghostscript/qpdf) on the dev machine.
**Workaround**: It is only fetched on click, so it does not affect page load.
**Fix**: Not done. Compressing it would cut `public/` from 23.6 MB to roughly 8 MB.
**Regression Test**: N/A.

## ISSUE-004: Pre-existing lint errors
**Status**: Open
**Severity**: Low
**Discovered**: 2026-09-07
**Symptom**: `npm run lint` reports 4 errors and 2 warnings.
**Root Cause**: Unused `index` parameters in `src/pages/AdminDashboard.jsx:320` and
`src/pages/Collections.jsx:101`; an unused `e` in `server/routes/blogs.js:57`; a
`set-state-in-effect` error and two `exhaustive-deps` warnings in
`src/components/Header.jsx` and `src/pages/AdminDashboard.jsx`.
**Workaround**: None needed; none block the build.
**Fix**: Not done — untouched by the hosting work and left alone deliberately. Note the
count was 66 before 2026-09-07 because ESLint applied browser globals to server code; the
config now lints Node files correctly, so these 6 are genuine.
**Regression Test**: `npm run lint`.

## ISSUE-005: Hosting plan may not support Node.js apps
**Status**: Open
**Severity**: High
**Discovered**: 2026-09-07
**Symptom**: hPanel may offer no Node.js application option.
**Root Cause**: Hostinger documents in-panel Node.js apps for **Business** and **Cloud**
plans. Premium is not listed. The owner described the plan as "Premium Node.js hosting",
which does not match a documented tier name.
**Workaround**: Deploy the static fallback — `dist/` into `public_html` plus
`deploy/htaccess-static-fallback` renamed to `.htaccess`. The site renders fully from its
bundled catalogue; only the admin dashboard's save function is lost.
**Fix**: Confirm the plan in hPanel. Upgrade to Business if a live API is required.
**Regression Test**: N/A — verify with `GET /api/health` after deploying.
