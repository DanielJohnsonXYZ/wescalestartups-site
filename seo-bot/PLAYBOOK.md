# SEO/GEO/AEO bot — playbook

Updated each run. Read this AND CHANGELOG.md at run start.

## Current understanding (2026-08-21)

- Site: ~121 pages, strong GEO scaffolding already in place (meta-ai:* tags, /facts pages, llms.txt, FAQ/breadcrumb schema, entity graph rooted on danieljohnson.xyz for Person + wescalestartups.com for Organization).
- GSC 28d baseline: 70 clicks / 5,330 impressions / CTR 1.3% / avg pos 27. Almost all clicks are branded ("we scale startups" @ pos 1). Non-brand rankings exist but sit pos 20–60: visibility without clicks.
- The constraint is therefore non-brand relevance + position, not indexing or technical health (sampled pages index fine, canonicals clean, rich results pass).
- Daniel works in the repo directly (big design-audit merged 2026-08-20, PR #83). Keep bot changes content-scoped and single-file where possible; never restructure layouts the day after his design passes.
- Repo facts: Astro static, push to main = deploy (Cloudflare Pages). site.ts is the single source of truth for pricing/proof/FAQ data — pricing claims in page copy MUST match pricingTiers.
- Task-folder note: the uploads folder holding SKILL.md is read-only to the bot; these state files live in the repo instead (seo-bot/).
- Connector notes: Bing MCP tools need self="bing" arg quirk; quota 100/day. GSC MCP is read/inspect only — no request-indexing endpoint. Cloudflare MCP has no Pages-deployment tools; verify deploys by fetching the live URL (web_fetch dedupes URLs for 1h — add a cache-busting query param to re-check, canonical stays clean).

## Ranked backlog

1. **Branded-query CTR ("we scale startups", 8.8% CTR @ pos 1 on homepage; /about, /about/daniel, /facts pages all 0-click at pos 1–4 on the same query).** Investigate SERP presentation: sitelinks quality, homepage title (currently long) and meta description. Possible fix: tighter homepage title/description; Organization schema siteNavigationElement review. Also possible that much of this query volume is non-navigational (other companies' taglines) — check with query-country breakdown first.
2. **/insights hub: 472 impressions, 0 clicks, pos 32.8.** Hub page likely ranking for article-intent queries; review its title/intro targeting vs the cluster pillars.
3. **"90 day growth sprint" (31 imps @ 12.6, 0 clicks) + service page 258 imps @ 14.2 with 0.4% CTR.** Title/description CTR pass on /services/90-day-growth-sprint; possibly add HowTo/FAQ coverage for "what is a 90-day growth sprint".
4. **"branding agency for scale-ups" (79 imps @ 62.9 on homepage).** Homepage is the wrong asset for this query; decide whether it's worth a dedicated positioning angle or ignore (adjacent intent).
5. **cal.wescalestartups.com/auth/login is indexed and earning impressions.** Login pages shouldn't be indexed; needs noindex/robots on the Cal.com subdomain (lives on Steve, not this repo) — flag to Daniel rather than ship.
6. **staticPathLastModified["/fractional-cmo-vs-agency"] still 2026-05-04** in site.ts (sitemap lastmod stale after run-1 edit). Tiny; batch into next run touching site.ts.
7. **GEO refresh cadence:** /facts pages carry lastUpdated 6 Aug; keep them fresh monthly (AI engines favour dated, verifiable facts pages).

## What worked / what didn't

- 2026-08-21: shipped query-family re-anchor of /fractional-cmo-vs-agency. Verdict due 2026-08-28.

## Standing decisions

- Prefer one-file, content-only commits; avoid layout/CSS the bot can't visually verify.
- Always fetch the live URL post-deploy with a cache-busting param before declaring success.
- Never state market statistics that aren't sourced; anchor cost claims on WSS's own published ranges.
