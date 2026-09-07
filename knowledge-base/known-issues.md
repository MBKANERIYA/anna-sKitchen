# Known Issues

## ISSUE-001: Admin area has no real authentication
**Status**: Resolved
**Severity**: Critical
**Discovered**: 2026-09-07
**Resolved**: 2026-09-07
**Symptom**: Anyone could open `/admin/dashboard` directly and manage content, and anyone
with curl could delete the entire catalogue.
**Root Cause**: Three gaps: credentials compared in client-side JavaScript and shipped in
the bundle; no route guard on `/admin/dashboard`; and no authentication at all on the
mutating API routes.
**Workaround**: None was possible — gap 3 was reachable regardless of the front-end.
**Fix**: Server-side sessions. scrypt-hashed password in `ADMIN_PASSWORD_HASH`, an
HMAC-signed httpOnly `SameSite=Strict` session cookie, `requireAuth` on all four mutating
routes, a server-checked route guard, per-IP login rate limiting, and fail-closed behaviour
when unconfigured. See [security.md](security.md).
**Regression Test**: `server/auth.test.js` and `server/auth-routes.test.js` — 39 tests,
including forged-cookie and unconfigured-server cases.

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
**Status**: Resolved
**Severity**: High
**Discovered**: 2026-09-07
**Resolved**: 2026-09-07
**Symptom**: Hostinger documents in-panel Node.js apps for Business and Cloud plans, not
Premium, and the plan was described as "Premium Node.js hosting".
**Root Cause**: Documentation tier names did not match how the plan was described.
**Workaround**: The static fallback (`deploy/htaccess-static-fallback`) was prepared in case
Node.js was unavailable.
**Fix**: Confirmed directly in hPanel — the account reaches
**Deploy Your Web App**, offering "Import your Git repository" (recommended) and file
upload. Node.js app hosting is available; the Node path in deployment.md applies. The
static fallback is retained but is not the deployment route.
**Regression Test**: N/A — verify each deploy with `GET /api/health`.

## ISSUE-006: Every contact and quote form on the public site is inert
**Status**: Open
**Severity**: High
**Discovered**: 2026-09-07
**Symptom**: A visitor fills in a contact or "Get Quote" form, clicks submit, and the page
reloads with the fields cleared. Nothing is sent, nothing is stored, and no one is
notified. To the visitor it looks like the enquiry was submitted.
**Root Cause**: Six `<form>` elements have no `onSubmit`, no `action`, no `method`, and no
React state on their inputs, but their buttons are `type="submit"`. The browser therefore
performs a native GET submission to the current URL, which reloads the SPA and discards the
input. Affected: `ContactPage.jsx` (two forms), and the "Get Quote" bar duplicated in
`AboutPage.jsx`, `ProductDetailPage.jsx`, `ProjectsPage.jsx` and `ServicesPage.jsx`.
**Workaround**: The phone number, WhatsApp link and `mailto:` address elsewhere on the page
do work, so enquiries can still arrive by those routes.
**Fix**: Not done — needs a decision on where submissions should go (email via an SMTP or
transactional provider, a MongoDB collection surfaced in the admin dashboard, or a
third-party form service). The five duplicated quote bars should become one shared
component rather than being fixed five times.
**Regression Test**: None yet. When fixed, assert a submission reaches its destination and
that a failed submission surfaces an error rather than silently clearing the form.
