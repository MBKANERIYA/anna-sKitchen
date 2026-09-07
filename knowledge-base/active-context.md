## Current Status
**Last Updated**: 2026-09-07
**Last Agent Session**: Replaced the fake admin login with server-side authentication
(ISSUE-001) and made all six public forms send enquiries to WhatsApp (ISSUE-006). Both
resolved.
**Test Suite Status**: 74/74 passing. `npm run lint` reports 6 pre-existing problems
(ISSUE-004). Production build succeeds.

## In Progress
Nothing in flight.

## Blocked On
Nothing.

## Decisions Needed
- Whether to compress the 16.7 MB brochure PDF (ISSUE-003) — 70% of `public/`.
- Whether to drop `vercel.json` and `api/` now that Hostinger is the deployment target.

## Deploying this change — REQUIRED
The admin API **fails closed**. After deploying, the dashboard will refuse every login
until these exist in hPanel → your app → Environment variables:

1. Run `npm run admin:password` locally.
2. Copy `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` into hPanel.
3. Restart the app.
4. Check `/api/auth/me` returns 401 (not 503). 503 means the variables are missing.

The public site is unaffected either way — only the admin area depends on them.

## Next Steps (for the next agent session)
1. Set the three admin variables in hPanel (above) — otherwise the dashboard is unusable.
2. Consider ISSUE-002 (three duplicate `/api/products` fetches per page).

## Do Not Touch
- `public/` — generated output. Edit originals in `public-original/` and re-run the
  pipeline (assets.md).
- `public-original/` — the only copy of the pre-optimisation originals (~129 MB), gitignored
  and therefore **not on GitHub**. It exists on this machine only; back it up.
- The `listen()` in `server.js` — do not add another one in `server/index.js`.
- Route order in `server/index.js` — anything registered after the `GET *` SPA fallback is
  unreachable, and `requireAuth` must stay ahead of multer on upload routes.
- `src/data/productsData.js` / `blogsData.js` — load-bearing fallback data, not dead code.
