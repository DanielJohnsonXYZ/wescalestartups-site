# AGENTS.md — rules of engagement for AI assistants working on this repo

This file is read by any AI coding assistant that operates on this repo (Claude Code, Cursor agents, Codex, ChatGPT Code, custom tooling). Follow it before starting.

## Repo in one paragraph

Astro 5 static site for [wescalestartups.com](https://wescalestartups.com). Deployed via Cloudflare Pages (auto-builds from `main`). **Not** deployed via Coolify/Docker any more — those files have been removed. Content lives in `src/content/` (services, industries, cases). Central config in `src/site.ts`. Schema helpers in `src/lib/schema.ts`. Global styles in `src/styles/global.css` plus `src/styles/additions.css`.

## Rules before you branch

1. **Always list open PRs first.** Run `gh pr list --state open` or check [github.com/DanielJohnsonXYZ/wescalestartups-site/pulls](https://github.com/DanielJohnsonXYZ/wescalestartups-site/pulls). If a PR already touches the area you're about to edit, **rebase onto that branch** or add commits to it. Do not open a parallel PR that will need reconciliation later.
2. **One active feature branch at a time.** If another feature branch is open and unmerged, close it (or merge it) before starting new work that touches the same files.
3. **Branch naming:** `copy/*` for copy changes, `feat/*` for features, `chore/*` for cleanup, `fix/*` for bug fixes. Always include a date suffix (e.g. `copy/hero-tighten-2026-04-24`).
4. **Before editing `src/site.ts`, `src/pages/index.astro`, or any page copy, read this file and `src/site.ts`** so you stay inside the established positioning.

## Canonical positioning (do not drift)

- **What we are:** Senior growth operator — not an agency — for post-PMF B2B SaaS and AI founders.
- **ICP:** Post-PMF B2B SaaS or AI startups, $1M–$10M ARR. Secondary: Fintech, HealthTech.
- **Price signal:** Retainers £5,000–£15,000/month. Fractional CMO £10k–£15k/mo, 3-month minimum.
- **Primary CTA site-wide:** "Book a growth call" → `https://calendly.com/wescalestartups` (external).
- **Engine:** Three phases (Research → Acquisition → Operating Cadence) + Fractional CMO as delivery model.
- **Tagline:** "Agencies pitch. Operators install."

If you think the positioning should change, open an issue first — don't silently drift copy inside an unrelated PR.

## Structural conventions

- **Nav label for `/case-studies`:** "Results" (not "Proof").
- **Email:** `hello@wescalestartups.com` (not `daniel@`).
- **Currency:** ARR quoted in USD ($1M–$10M), retainers quoted in GBP (£).
- **Language tag:** `en-GB` everywhere.
- **Service slugs:** `research`, `acquisition`, `operating-cadence`, `fractional-cmo`. Legacy slugs (`growth-diagnosis`, `90-day-growth-sprint`, `acquisition-system-build`) are permanently 301-redirected — do not re-introduce them.
- **Images:** Founder headshots at `/images/daniel-headshot-640.webp` and `/images/daniel-headshot-960.webp` (use the `<picture>` element for responsive).
- **Booking link:** always external Calendly, `rel="noreferrer" target="_blank"`, with `data-cta="<location>-book"` for analytics.

## Quality gate before push

1. `npm install && npm run build` must succeed with zero errors.
2. If you touched copy, re-read the hero, engine section, and FAQ in this file to make sure tone hasn't drifted ("senior operator", "installs", no buzzwords like "synergy"/"leverage"/"holistic").
3. Update `src/pages/llms.txt.ts` whenever you change: ICP, offers, pricing, or canonical page list. That file feeds LLM retrieval and must stay truthful.
4. If you add or rename a page, update `public/_redirects` (for the old slug) and `src/pages/sitemap.xml.ts`.

## Files you should almost never touch

- `astro.config.mjs`, `tsconfig.json`, `package.json` — touch only with explicit request.
- `public/_redirects` — append, don't rewrite. Existing redirects protect SEO equity.
- `src/content.config.ts` — schema changes need Daniel's sign-off.

## How to prove this wasn't a wasted PR

Every PR body should answer:

1. What user-visible thing changed?
2. Which audit item, issue, or conversation triggered this?
3. Did you check `gh pr list --state open` before starting? Which open PRs did you look at?
4. Did `npm run build` pass locally?

If any answer is "no" or "didn't check," close the PR and start over.
