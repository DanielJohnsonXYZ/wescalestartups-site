# SEO/GEO/AEO bot — playbook

Updated each run. Read this AND CHANGELOG.md at run start.

## Current understanding (2026-08-25, run 4)

- Site: 116 pages, Astro static, push to main = deploy (Cloudflare Pages).
- **GSC 90d baseline (2026-05-25 → 2026-08-22): 42 clicks / 9,500 impressions / 0.44% CTR.** Use 90d windows. 819 query×page rows total, so the full dataset is small enough to pull whole.
- **The constraint is authority.** Unchanged from run 2 and reconfirmed: the technical foundation is good, and the commercial head terms sit at position 40–72 because nothing points at this site. Bing still reports **zero tracked inbound links** (re-checked 2026-08-25, `get_link_counts` and `get_url_links` both empty). 🟡 Bing's link data is unreliable; confirm in the UI before treating as fact.
- **But there is one exception, and it is the most valuable thing on the site.** `/services/90-day-growth-sprint` holds **position 1.0–5.6 on a cluster of provider-selection prompts** ("who offers / top providers of / which agencies provide / get a quote for" 90-day sprint engagements). Eight of the ten non-brand queries the entire site holds at position ≤5 land on that one page. Where the site ranks, it ranks for *conversational vendor-shortlist intent*, not head terms. That is the asset. Build on it.
- **The rule "don't optimise titles/meta at position 45+" still holds — and implies its inverse.** At position 1–5 the snippet and the first extractable passage are the whole lever. Run 4 acted on that; do not let the authority thesis talk you out of on-page work on the handful of pages that actually rank.
- **Profile-page impressions are brand sitelink artefacts. Do not chase them.** `/press` (376 imp), `/proof` (361), `/start-here` (114), `/podcast` (87), `/speaking` (54) and `/team` (26) are almost entirely the single query `we scale startups` at **position 1.0 with zero clicks** — Google logs one impression per sitelink URL at the parent result's position, and the homepage absorbs the clicks (32 of the site's 42). Page-level "position 4.5 with 885 impressions and no clicks" is not a CTR failure and no title rewrite fixes it. Run 4 nearly spent a day on this; check the query mix before believing a page-level position.
- **A second chunk of homepage impressions is brand-name collision**, not demand: `we scale` (543 imp), `start and scale` (135), `wescale` (32), `we scale ab` (Swedish company), `we scale creators`, `calconnect login`, `google for startups in shoreditch` (39 imp at pos 3.1). ~800+ impressions of people looking for someone else. Discount them from every CTR calculation.
- **The site has AI visibility it does not have classic search visibility.** 130 rows / 577 impressions of conversational prompts, all zero-click. Optimise for passage extraction — a direct-answer paragraph under a heading, named facts, prices, durations, comparison tables — not for titles the user may never see.
- Entity graph is rooted on danieljohnson.xyz for Person, wescalestartups.com for Organization. `/facts/*` pages carry `lastUpdated` — keep them monthly-fresh.
- The repo emits six `ai:*` meta tags on all pages, five hardcoded and identical sitewide. No crawler consumes those names. Harmless, inert, **do not expand**. Note `meta-ai:summary` is derived from the page description, so improving a description improves it for free.
- `site.ts` is the single source of truth for pricing/proof/FAQ copy; page copy MUST match `pricingTiers`. The **numeric** ranges for structured data live in `src/lastmod.ts` (`servicePriceRanges`).
- **robots.txt says `ai-train=no` as of 2026-08-25.** Run 2 changed this to `yes`; Daniel reverted it and added an explicit comment ("do not signal opt-in to model training here"). That is his call and it is now coherent — GPTBot/ClaudeBot are still `Allow`ed for retrieval. **Do not re-flip it.**
- Daniel works in the repo directly. Keep bot changes scoped; never restructure layouts the day after one of his design passes.

## Connector notes

- **GSC MCP `row_limit` is yours to set and the default (100) silently truncates.** Rows come back clicks-desc first, then **zero-click rows sorted alphabetically by (page, query)** — so a low limit guillotines everything after roughly `/f…` and hides your best pages. Always pass `row_limit: 25000`. (Run 2's playbook blamed the API for a 400-row cap; it was the caller's parameter.)
- Large GSC pulls exceed the tool output limit and get written to a file — analyse them in a **subagent** with jq/python so the dump stays out of main context.
- 60–89% of a page's impressions can be **anonymised** by Google (rare, personally-phrased queries). Named-query impressions will not reconcile to page-level totals. That gap is itself a signal: it skews heavily conversational.
- GSC MCP is read/inspect only — no request-indexing endpoint. Recrawl comes via the sitemap.
- Bing MCP tools need the `self="bing"` arg quirk. Quota 100/day, 700/month. **Bing query/page/rank-stats endpoints are broken** (schema validation error on returned dates); crawl issues, quota, link counts and URL submission work.
- **Bing crawl-issue data is historical, not current.** It still lists URLs fixed weeks ago. Always re-check live before acting on it.
- Cloudflare MCP has no Pages-deployment tools; verify deploys by fetching the live URL.
- **`mcp__workspace__bash` curl works fine against the site** for status codes and redirect chains, despite the SKILL note about bot challenges. `web_fetch` sometimes returns a stale cached body (it served old WordPress content for a URL that actually 301s) — **trust curl status codes over web_fetch bodies when checking redirects.**
- **The local clone at `/Users/daniel/Documents/wescalestartups-site` has push credentials. The sandbox clone does not.** Work there for anything that needs pushing. Its `npm run build` takes ~60–90s and will time out a Desktop Commander call — redirect to a log file and poll.

## Ranked backlog

1. **Extend the run-4 pattern to the other prompt clusters.** The sprint page was the proof of concept. `/services/fractional-cmo` and `/fractional-cmo-vs-agency` pick up the same shape of decision prompt (`should a series a startup hire a fractional cmo a growth agency or wait to hire a full-time vp of growth` 29 imp @ pos 8.3; `is it better to hire a full-time growth team or use a fractional growth agency at our stage` 24 imp @ 46.5; `growth pod vs hiring a fractional cmo vs full-service agency` 12 imp @ 83.4). The ones already at pos 8 are worth answering directly now; the pos 45+ ones are authority-bound. **Start with `/insights/when-to-hire-fractional-cmo` (pos 8.3, 157 imp, 0 clicks) — nearest to the money.**
2. **Off-site authority (§3).** Wikidata items for WSS and Daniel; fact consistency across LinkedIn / Crunchbase / GrowthMentor / MentorCruise / Companies House; earned mentions over links. This is where position actually moves for the head terms. **Requires Daniel — the bot cannot create Wikidata items or edit third-party profiles.**
3. **Original research from the 479+ founder sessions (§4.3).** The highest-leverage single asset available and the only one a competitor cannot copy. Feeds §1 and §2 simultaneously. Requires real data from Daniel — never fabricate figures.
4. **`/insights` hub: 328 named-query impressions, 1,032 page-level, 0 clicks, pos 28.9.** 72 distinct queries, mostly post-PMF scaling language (`post pmf saas scaling` 30 @ 14.2, `growth leader for post pmf startup` 28 @ 9.3, `scaling beyond founder led gtm` 26 @ 38.0). The hub is absorbing article intent it does not answer. Either make it a real hub with extractable answers or route these queries to specific insights.
5. **Finish the abandoned growth-system consolidation.** `/growth-engine`, `/ai-driven-growth`, `/how-we-work` are treated as consolidated in `sitemapCanonical.ts` and have `_redirects` rules, yet still collect impressions (3, 5, — respectively). Confirm live whether the 301s resolve; the counts are now tiny, so this is low priority.
6. **`/speaking` is 51 words and ranks pos 3.1 on 102 impressions — but all of them are the brand sitelink.** Reclassified: this is NOT a content opportunity, it is sitelink noise. Either write it properly for its own sake or leave it. Same reclassification applies to the old backlog entry about `/press` and `/proof`.
7. **`scalable land acquisition teams` (60 imp) is hitting `/services/acquisition-system-build`** — real-estate intent, wrong market entirely. Harmless, but if the page ever needs a rewrite, tighten "acquisition" to "customer acquisition" in the visible copy.

**Closed:** `cal…/auth/login` (already correctly noindexed via Traefik, run 3). The `www.` legacy host (checked run 4: www 301s to apex correctly for all paths; only 7 rows / 26 impressions remain, and the three genuinely-broken legacy paths were fixed in `dc91ce1`).

**Do not do:** expand `llms.txt` or the `ai:*` meta tags. Add FAQPage schema *expecting rich results* (deprecated May–Aug 2026) — FAQ content is still worth writing for passage extraction, which is a different rationale. Build the `/alternatives/*` page programme. Ship `Review`/`AggregateRating`. Optimise titles/meta for queries at position 45+. Chase CTR on brand-sitelink impressions. Re-flip the robots.txt `ai-train` directive.

## What worked / what didn't

- **2026-08-21 run 1** — query-family re-anchor of `/fractional-cmo-vs-agency`. **Verdict due 2026-08-28, early read is negative:** 90d position 45.1, essentially unchanged from the 44.1 that motivated it, and still 0 clicks on 1,086 impressions. Consistent with the authority thesis: the page now says the right words and still cannot rank. Do not read this as "content doesn't matter" — read it as "content is necessary but not sufficient at position 45".
- **2026-08-21 run 2** — bug fixes, generated lastmod, Offer schema, CI guard. Verdict due 2026-09-04.
- **2026-08-22 run 3** — fractional-CMO consolidation. Verdict due 2026-10-03; 301s spot-check due 2026-09-19.
- **2026-08-25 run 4** — provider-answer passage + FAQs on the sprint page; three legacy 404s redirected. Verdict due 2026-09-01.
- **Run 2 broke `main` for ~20 minutes** by pushing `schema.ts` before the module it imported from. See standing decisions.
- **Run 4 spent significant effort on a false lead** — a cluster of pages showing "position 3–8, hundreds of impressions, zero clicks" that turned out to be brand sitelink stacking. The tell was that every one of those pages had the *same* query at the *same* position 1.0. Check the query mix before theorising about a page.

## Standing decisions

- **Every commit boundary must be a state that builds.** If a change spans files, push the files together.
- **Verify the build against the tree you pushed, not the tree you have locally.**
- **Sitemap lastmod is generated, not hand-edited.** Two-step on content changes: commit the content, then `npm run refresh:lastmod` and commit the result. `npm run check:lastmod` runs in CI and fails on drift.
- Prefer content-only commits; avoid layout/CSS the bot can't visually verify.
- Always fetch the live URL post-deploy before declaring success, and re-test that new redirect rules did not shadow existing specific ones.
- Never state market statistics that aren't sourced; anchor cost claims on WSS's own published ranges.
- **When a change is defensible under two competing readings of the data, prefer it** over one that requires the ambiguity to be resolved first. Run 4's TL;DR helps whether the impressions are blue-link or AI Mode citations.
- Mark confidence explicitly (🟢 verified / 🟡 inferred / 🔴 vendor-sourced). Most GEO research is published by companies selling GEO tools.
