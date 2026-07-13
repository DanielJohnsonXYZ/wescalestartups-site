# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **static Astro site** ("We Scale Startups"). There is no backend or
database; all pages are generated from structured content and served as static HTML.

- Node 22 is required (matches the `Dockerfile` and CI). It is already available.
- Dependencies are installed by the startup update script (`npm ci`), so you do not
  need to reinstall them at the start of a session.

Standard commands (see `package.json` scripts):

- Dev server: `npm run dev` — serves on `http://localhost:4321/` (Astro default). Use
  `-- --host` to expose on the network.
- Typecheck / lint: `npm run check` (`astro check`).
- Build: `npm run build` — runs `scripts/generate-og-png.mjs` first, then `astro build`,
  emitting static output to `dist/`.
- Preview built output: `npm run preview`.

Non-obvious notes:

- `npm run build` invokes `node scripts/generate-og-png.mjs` before `astro build`; this
  needs `sharp` (already a dependency) and runs offline — no external services required.
- `astro check` reports 1 pre-existing hint in `src/components/QuizScorecard.astro`
  (`window.selectOption` typing). It is not an error and does not fail CI.
- The interactive "Growth Bottleneck Check" quiz is embedded on the homepage (and the
  `/resources/growth-bottleneck-scorecard` page), not at a standalone `/quiz` route.
- Env vars (`PUBLIC_MAUTIC_*`, `SENTRY_AUTH_TOKEN`) are optional. Absent locally, the
  Sentry source-map upload is skipped and the Mautic newsletter form simply has no
  configured endpoint; dev/build still work without them.
