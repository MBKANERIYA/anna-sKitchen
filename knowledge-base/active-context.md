## Current Status
**Last Updated**: 2026-09-07
**Last Agent Session**: Migrated the app from Vercel staging to Hostinger Node.js hosting,
optimised `public/` from 128.4 MB to 23.6 MB, and introduced Vitest.
**Test Suite Status**: 21/21 passing. `npm run lint` reports 6 pre-existing problems
(ISSUE-004). Production build succeeds.

## In Progress
Nothing in flight. The code is ready to deploy; the deploy itself has not been performed.

## Blocked On
- **Confirming the hosting plan** (ISSUE-005) — Hostinger documents in-panel Node.js apps
  for Business and Cloud plans, not Premium. The plan was described as "Premium Node.js
  hosting", which is not a documented tier name. Both paths are prepared: the Node.js app
  is the primary target, and `deploy/htaccess-static-fallback` covers static-only hosting.

## Decisions Needed
- **ISSUE-001 (Critical) — the admin area has no real authentication.** Credentials are
  hardcoded in client-side JS, `/admin/dashboard` has no route guard, and every mutating
  API route is unauthenticated, so anyone can delete the catalogue with curl. This was
  flagged rather than fixed, because it is a security redesign and not part of a hosting
  migration. It should be resolved before the site is on a public domain.
- Whether to compress the 16.7 MB brochure PDF (ISSUE-003) — it is 70% of `public/`.

## Next Steps (for the next agent session)
1. Confirm in hPanel whether the plan offers a Node.js app. Follow deployment.md.
2. Set the four environment variables in hPanel (see `.env.example`).
3. Allow-list the Hostinger server IP in MongoDB Atlas -> Network Access.
4. After deploying, check `https://<domain>/api/health` — expect `"db":"connected"`.
   `"disconnected"` means step 3 is incomplete.
5. Address ISSUE-001 before announcing the site.

## Do Not Touch
- `public/` — generated output. Edit originals in `public-original/` and re-run the
  pipeline (assets.md).
- `public-original/` — the only copy of the pre-optimisation originals (~129 MB) and
  gitignored, so it exists on this machine only. Back it up before wiping the machine.
- The `listen()` in `server.js` — do not add another one in `server/index.js`.
- `src/data/productsData.js` / `blogsData.js` — load-bearing fallback data, not dead code.
