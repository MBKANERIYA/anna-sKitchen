## Current Status
**Last Updated**: 2026-09-07
**Last Agent Session**: Migrated the app from Vercel staging to Hostinger Node.js hosting,
optimised `public/` from 128.4 MB to 23.6 MB, introduced Vitest, and opened the migration PR.
**Test Suite Status**: 21/21 passing. `npm run lint` reports 6 pre-existing problems
(ISSUE-004). Production build succeeds.

## In Progress
- **PR #1 is open and awaiting merge**: https://github.com/MBKANERIYA/anna-sKitchen/pull/1
  (branch `hostinger-migration` -> `main`). Hostinger's Git import deploys the **default
  branch**, so nothing reaches production until this is merged into `main`.

## Blocked On
Nothing. ISSUE-005 is resolved — hPanel reaches **Deploy Your Web App** with Git import, so
the plan does support Node.js apps.

## Decisions Needed
- **ISSUE-001 (Critical) — the admin area has no real authentication.** Credentials are
  hardcoded in client-side JS, `/admin/dashboard` has no route guard, and every mutating
  API route is unauthenticated, so anyone can delete the catalogue with curl. Flagged, not
  fixed: it is a security redesign, not hosting work. Resolve before the site is public.
- Whether to compress the 16.7 MB brochure PDF (ISSUE-003) — 70% of `public/`.
- Whether to drop `vercel.json` and `api/`. They are harmless, but if Hostinger's framework
  autodetect misreads the project as a static Vite app, `vercel.json` is the first suspect.

## Next Steps (for the next agent session)
1. Merge PR #1 into `main`.
2. hPanel -> Deploy Web App -> import `MBKANERIYA/anna-sKitchen`. Set Node 20 or 22,
   build `npm run build`, **entry file `server.js`**, output `dist`. If the preset is
   detected as a static React/Vite app, change it — this is a *server* app, or `/api/*`
   will not exist.
3. Set the four environment variables from `.env.example` in hPanel. Do not set `PORT`.
4. Allow-list the Hostinger server IP in MongoDB Atlas -> Network Access.
5. Check `https://<domain>/api/health` — expect `"db":"connected"`.
   `"disconnected"` means step 4 is incomplete.
6. Address ISSUE-001 before announcing the site.

## Do Not Touch
- `public/` — generated output. Edit originals in `public-original/` and re-run the
  pipeline (assets.md).
- `public-original/` — the only copy of the pre-optimisation originals (~129 MB), gitignored
  and therefore **not on GitHub**. It exists on this machine only; back it up before wiping.
- The `listen()` in `server.js` — do not add another one in `server/index.js`.
- `src/data/productsData.js` / `blogsData.js` — load-bearing fallback data, not dead code.
