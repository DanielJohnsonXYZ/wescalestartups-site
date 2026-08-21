# SEO/GEO/AEO bot — playbook

Updated each run. Read this AND CHANGELOG.md at run start.

## Current understanding (2026-08-21, run 2 — full audit)

- Site: ~121 pages, Astro static, push to main = deploy (Cloudflare Pages).
- **GSC 90d baseline: 137 clicks / 15,617 impressions / 0.88% CTR / avg pos 25.7.** Use 90d, not 28d — run 1's conclusions were distorted by the shorter window.
- **The constraint is authority and consolidation, not on-page hygiene.** The technical foundation is genuinely good: zero duplicate titles or descriptions, one `<h1>` per page, canonicals correct, 10/10 noindexed pages excluded from the sitemap, zero broken sitemap URLs. Continuing to polish titles and meta on pages sitting at position 45+ is not the work.
- **Bing Webmaster returns zero tracked inbound links.** If accurate, that alone explains positions of 45–65 on competitive commercial terms regardless of page quality. Needs confirming in the Bing UI before being treated as fact.
- **The site has AI visibility it does not have classic search visibility.** It is cited in AI Mode for high-intent founder prompts while ranking 45+ for the matching commercial keywords. Optimise for passage extraction (first paragraph under a heading, tables, named facts), not for titles the user never sees.
- Entity graph is rooted on danieljohnson.xyz for Person, wescalestartups.com for Organization. `/facts/*` pages carry `lastUpdated` — keep them monthly-fresh.
- The repo emits six `ai:*` meta tags on all 121 pages, five hardcoded and identical sitewide. **Note: a previous version of this playbook called them `meta-ai:*`, which was wrong about the site's own implementation.** No crawler consumes those names. Harmless, inert, do not expand.
- `site.ts` is the single source of truth for pricing/proof/FAQ copy — pricing claims in page copy MUST match `pricingTiers`. The **numeric** ranges for structured data live in `src/lastmod.ts` (`servicePriceRanges`) and must match the display strings.
- Daniel works in the repo directly. Keep bot changes scoped; never restructure layouts the day after one of his design passes.
- Connector notes: Bing MCP tools need the `self="bing"` arg quirk; quota 100/day. **Bing query/page/rank-stats endpoints are broken** (schema validation error on returned dates) — crawl issues, quota, link counts and URL submission still work. GSC MCP is read/inspect only, no request-indexing endpoint, and its query export **truncates at 400 rows alphabetically** (queries starting q–z are missing). Cloudflare MCP has no Pages-deployment tools; verify deploys by fetching the live URL.
- **The local clone at `/Users/daniel/Documents/wescalestartups-site` has push credentials. The sandbox clone does not.** Work there for anything that needs pushing.

## Ranked backlog

1. ~~**Consolidate the fractional-CMO cluster.**~~ **Shipped 2026-08-22** (`730416c`). Five pages merged into two, internal linking now points down rather than sideways. Do not re-open before the 2026-10-03 review — and do not read a flat position at that review as "the merge failed"; read it as confirmation that item 2 is the constraint.
2. **Off-site authority (§3). This is now the top item.** Wikidata items for WSS and Daniel; fact consistency across LinkedIn / Crunchbase / GrowthMentor / MentorCruise / Companies House; earned mentions over links. This is where position actually moves. Requires Daniel — the bot cannot create Wikidata items or edit third-party profiles.
3. **Original research from the 479+ founder sessions (§4.3).** The highest-leverage single asset available and the only one a competitor cannot copy. Feeds §2 and §3 simultaneously.
4. **Write to observed conversational buying prompts (§4.1)**, starting with the 90-day-sprint quote query.
5. **Finish the abandoned growth-system consolidation.** `/growth-engine`, `/ai-driven-growth`, `/how-we-work` are treated as consolidated in `sitemapCanonical.ts` but are still served and still collecting impressions. Find out whether the 301s are missing or not honoured.
6. **`/insights` hub: 991 impressions, 0 clicks, pos 28.3.** Hub ranking for article-intent queries.
7. **`/speaking` is 51 words and ranks pos 3.2.** Either write it properly or noindex it. Same call needed on `/insights/ai-native-gtm` (217w) and `/insights/startup-growth-bottlenecks` (224w), which are designated pillars in code without pillar depth.
8. ~~**`cal.wescalestartups.com/auth/login` is indexed.**~~ **Checked 2026-08-22 — already correctly noindexed.** A Traefik `noindex-headers` middleware has served `X-Robots-Tag: noindex, nofollow` since 12 July (10/10 requests, including as Googlebot). Residual: cal.com's HTML emits a contradicting `<meta name="robots" content="index, follow">`, and a duplicate Traefik router (`calcom`) matches the same host/entrypoint **without** the middleware — currently losing the tie-break, latent risk if it flips. **Never add a robots.txt `Disallow` for `/auth`** — that stops Google seeing the noindex and locks the URL in the index.
9. ~~**Two live 404s on the `www.` host.**~~ **Half wrong, corrected 2026-08-22.** `/partner-view/*` correctly returns **410 Gone** — deliberate, leave it. Only `/services-mobile-marketing/` genuinely 404'd; 301'd to `/services` in `edda7c8`. Bing's crawl data was reporting historical status, not current — **re-check live before acting on a Bing 404 report.**

**Demoted from run 1's backlog:** "branded-query CTR" was ranked #1 and shouldn't have been. On 90d data branded queries are 902 impressions / 36 clicks, and the brand name is a generic English phrase — much of that volume ("we scale creators", "we scale it", "we scale trades") was never looking for WSS. Much smaller than it appeared on 28 days.

**Do not do:** expand `llms.txt` or the `ai:*` meta tags (Google's May 2026 guidance lists llms.txt under "what you don't need"; ~97% of llms.txt files get zero AI-crawler requests). Add FAQPage schema expecting rich results (deprecated May–Aug 2026). Build the `/alternatives/*` page programme. Ship `Review`/`AggregateRating` — self-serving review markup on Organization/LocalBusiness is ineligible for star rich results, and WSS's ratings all live on third-party sites. Optimise titles/meta for queries at position 45+.

## What worked / what didn't

- 2026-08-21 run 1: query-family re-anchor of `/fractional-cmo-vs-agency`. Verdict due 2026-08-28. **Caveat found in run 2:** the FAQ schema half of the rationale was out of date — FAQPage rich results were deprecated between May and August 2026. The content still earns its place; the schema won't show in the SERP.
- 2026-08-21 run 2: shipped the §5 bug fixes, generated lastmod, Offer schema, CI guard, robots coherence. Verdict due 2026-09-04.
- **Run 2 broke `main` for ~20 minutes** by pushing `schema.ts` before the module it imported from. See standing decisions.

## Standing decisions

- **Every commit boundary must be a state that builds.** Run 2 pushed a partial file set because the full set was awkward to transmit, and shipped an import pointing at a symbol that didn't exist yet. If a change spans files, push the files together.
- **Verify the build against the tree you pushed, not the tree you have locally.** They diverged in run 2 and the local build passing hid a broken `main`.
- Prefer content-only commits; avoid layout/CSS the bot can't visually verify.
- Always fetch the live URL post-deploy before declaring success.
- Never state market statistics that aren't sourced; anchor cost claims on WSS's own published ranges.
- **Sitemap lastmod is generated, not hand-edited.** `npm run refresh:lastmod` rewrites `src/lastmod.ts`; `npm run check:lastmod` runs in CI and fails on drift. This implies a two-step on content changes: commit the content, then refresh and commit again.
- Mark confidence explicitly (🟢 verified / 🟡 inferred / 🔴 vendor-sourced) in anything reported to Daniel. Most GEO research is published by companies selling GEO tools.
