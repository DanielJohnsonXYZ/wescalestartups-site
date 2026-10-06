# SEO/GEO/AEO bot — playbook

**Read this, then the last three files in `changelog/`, at run start.** `seo-bot/CHANGELOG.md` holds runs 1–8 and is **frozen**; every run from 9 writes `seo-bot/changelog/YYYY-MM-DD-runN.md`. Runs 10–14 were one interactive session; **read 14 first, it corrects 13.**

**The verdict record and run history live in `seo-bot/VERDICTS.md`.** **This file must stay under 40KB. Compacted at runs 26, 28 and 30 (43.8KB → this), by scripted edits only.**

## Settled — do not re-open, do not re-diagnose

Each of these cost at least a run. They are closed; the reasoning is in the changelog.

- **The May 2026 cliff. Recovery complete** (`changelog/2026-08-26-run10-audit.md`). Two leftovers only: third-party pages researched ~7 May 2026 describe the OLD site, and the stale `www.` GSC property still exists.
- **The site-wide average position "decline" is composition, not decay** — queries in both windows *improved*; high-position legacy pages left the index and were replaced by new pages at 24–64. **Never read the site-wide position number as a ranking signal.**
- **Prompt 4 (fractional CMO cost) is a NO** (run 22). Soft SERP, no demand: 7 queries / 8 impressions at 31–92, zero clicks, absent from the panel throughout. **A soft SERP is a statement about competitors, not about demand — do the cheap demand check first.**
- **robots.txt `ai-train=yes` is correct and coherent** (GPTBot/ClaudeBot `Allow`ed). Run 4 invented a "Daniel reverted it" story that runs 5–7 repeated. Leave it because it is right.
- **`/resources` is not a conversion asset** (backlog 17) — 2.7% CTR was a `wescale.com` collision artefact; its named set converts at 0%.
- **The hygiene layer is clean and re-auditing it is waste** (run 5), and **the top AI-cited pages are already built for extraction.** But *do* check a fact page carries the facts — four defects, runs 19–21.
- **GBP is a retrieval surface and is fixed** — a GBP card renders inside AI Mode answers; category corrected to "Business management consultant", confirmed live run 24. Treat GBP as part of Workstream A.

## Current understanding (run 30, 2026-10-06)

- Site: **121 pages built, 11 noindexed, 110 in the sitemap.** Astro static, push to main = deploy (Cloudflare Pages), live in **under 2 minutes**. **Assert `built − noindexed == sitemap <loc>` after every structural change and as a standing check.**
- **THE SITEMAP STATIC-PATH LIST IS HAND-MAINTAINED.** `src/pages/sitemap.xml.ts` keeps top-level routes in a literal array, so **a new page Daniel adds will not add itself.** `/mentoring` shipped indexable and nav-linked but absent, and Google reported it *"unknown to Google"* after fourteen hours live — **the sitemap entry is the discovery route, not a redundant signal.** **Check the arithmetic whenever `git log` shows a new `src/pages/*.astro`.**
- **"ZERO NON-BRAND CLICKS" IS ABOUT THE NAMED-QUERY TABLE, NOT THE SITE (run 16).** **Four** queries site-wide have ever taken a click — `we scale startups`, `we scale`, `wescalestartups`, and `we scale ab`, **which is another company**. Precisely: **zero clicks from any named query that is neither WSS's brand nor someone else's.** Most clicks come from anonymised queries absent from the named data. **Anonymised proves *rare*, not *non-brand*.** **Read every run: total minus named clicks, and non-homepage clicks.** Detail: `changelog/2026-08-27-run16.md`.
  - **Clicks / anonymised / non-homepage: 36/21/12 → 72/50/21 → … → 56/29/17 (run 29) → 56/32/21 (run 30, 06 Sep – 03 Oct, fully independent of 09 Aug – 05 Sep: 61/36/18).** Named clicks: brand and collision only, plus `equoo` 1 (a client name → case study, navigational).
  - **MONEY-PAGE CLICKS on the first independent windows: 5 → 1.** Small n, direction down. Next independent window terminates **2026-10-31**. Always check the terminal date and shared days before comparing.
  - **CHECK THE TERMINAL DATE AND HOW MANY DAYS TWO WINDOWS SHARE BEFORE COMPARING ANYTHING.** The lag has settled at **3 days**. Two 28-day windows three days apart are ~90% the same data.
  - 60–89% of a page's impressions and ~68% of clicks are **anonymised**; sitewide ~35%, and the gap skews conversational. **`page` and `page,query` will disagree, and the gap is the finding** — unreconciled rows mean long, rare, conversational prompts: the AI-visibility signature. `/resources` 77%.
- **THE CONSTRAINT IS AUTHORITY. 29 referring domains / 41 referring pages / 16 anchor texts** (Bing UI, 2026-08-25). Commercial head terms sit at 40–72. **The listicle route in is closed (backlog 16); what remains is directories and original research.** Best single illustration: run 27's Perplexity prompt 9 — **~25 UK advisors named from 24 sources, `growth-division` cited six times, WSS absent, no content defect visible.** Quote it when the backlog is challenged.
- **Where this site ranks, it ranks for questions, not keywords — qualified: it matters whether a HUMAN asked the question.** The run 1 / 4 / 5 set in `VERDICTS.md` is the most load-bearing thing this bot has established. **Head terms are authority-bound; question-shaped queries are not — but only the human ones are worth winning.**
  - **Working rule:** find the queries phrased as questions or decisions, check which page Google chose, and make that page answer it in one extractable passage. Do not fight for the head term.
  - **Corollary (run 9):** where the question has *no* page behind it the constraint is **absence**, not authority, and writing the page is the cheapest win.
  - **Counter-corollary (run 28):** but writing it can also produce a **self-competing pair** rather than a reallocation — see backlog 15. **Check whether an existing page already holds the query before writing a new one.**
- **THE ENTITY IS CONTESTED, AND ORDINARY SERVICE NOUNS COLLIDE TOO.** The `wescale.com` e-procurement platform, two further WeScale businesses, seven Daniel Johnson LinkedIn profiles, and **`scale startup` (855 impr at 10.3, zero clicks) is Scale AI.** Run 26 generalised it: `/services/acquisition-system-build` is **71% `scalable land acquisition teams`** (property development), so its "94 impr at 41.4" is one query dragging the mean — real demand is 13 impressions at 27.0. **Before reading any page's position, CTR or clicks, sum its named set and ask what share is a collision.** Bad nouns: `acquisition`, `scale`, `sprint`, `pod`, `resources`.
- **Agents, not just humans, do vendor research here.** ~23% of Bing impressions are conversational or machine-issued and extract **fit criteria, price band and contact** — state those plainly on `/facts/*` and every service page. **But they do not click. Serve them for citation, never traffic, and NEVER let a fanout ranking justify a content change.**
- **Bing is a diagnostic mirror, not a channel** (3,310 impr / 30 clicks over 16 months). **Never spend a run optimising for it;** skipping it is deliberate, not a gap.
- **"Don't optimise titles/meta at 45+" implies its inverse:** at 1–10 the snippet and first extractable passage are the whole lever — **but check the query shape first; a 1–10 position on a fanout string is not a human's position.**
- **Profile-page impressions are largely brand sitelink artefacts — do not chase them** (`/proof`, `/press`, `/start-here`, `/podcast`, `/speaking`: mostly `we scale startups` at 1.0, zero clicks). **Tell: the same query at the same position across many pages.** Not a licence to ignore real clicks — `/about/daniel` 5 clicks / 408 impr at 3.3, and `/facts/we-scale-startups` is **not** in this class.
- **The site has AI visibility it does not have classic search visibility**, measured not inferred. Optimise for passage extraction: direct-answer paragraph under a heading, named facts, prices, durations, tables. **Put the direct answer in the first 30% of the page, measured in dist.** Entity graph roots on danieljohnson.xyz for Person, wescalestartups.com for Organization.
- **THE PERSON ENTITY IS REAL TO GOOGLE AND THE SITE IS NOT YET ITS SOURCE (run 21).** Reading #6 named Daniel Johnson beside WSS on prompt 5 but cited **LinkedIn, not `/facts/daniel-johnson`**.
- **THE RUN CADENCE EXCEEDS THE EVIDENCE CADENCE EVEN AT MON/WED/FRI.** **A run that ships nothing and records why is a successful run** — but **build-verifiable work survives an evidence blackout (runs 21, 26, 28), so a blacked-out run is not automatically a REPORT run.** Ask what you can *verify*, not only what you can *measure*.
- **ALL DATED VERDICTS CLOSED AT RUN 30 (see `VERDICTS.md`): six FAIL, one retrieval PASS. Content is not the lever on classic search. Do not write new pages unless a verdict or Daniel reopens content.**
- Daniel works in the repo directly, and so does this bot. **Check `list_commits` before choosing a file**; never touch a page committed in the last 24 hours.

### Source-of-truth files

- `site.ts` is canonical for pricing/proof/FAQ copy; page copy MUST match `pricingTiers`. **Numeric** ranges for structured data live in `src/lastmod.ts` (`servicePriceRanges`). `/insights/fractional-cmo-cost-uk` is canonical for the agency (£6k–£20k/mo) and full-time (£120k–£180k) bands — reuse, do not mint new ones. **`pricingTiers` also carries durations** — Growth Diagnosis `"1 week"` (`site.ts:957`). **Check there before calling an engine's duration or count claim invented (run 27) — and before "correcting" one (run 28).**
- **Founding year 2016 lives in `src/lib/schema.ts:81`**, not `src/site.ts`.
- **Both `/facts/*` pages derive their visible freshness date from the generated `staticPathLastModified` map**, so rendered date and sitemap `lastmod` cannot drift. **Nothing to refresh monthly.** Never switch either to `siteConfig.lastUpdated` (stale).
- **`src/data/growthTools.ts` is canonical for what the free tools do** — not any page describing them. The Scorecard is **12 questions, ~4 min**, scoring **founder dependency**, not the five-layer framework on `/diagnose`. Never describe either in terms of the other.

## AI panel — Workstream A

- **THIRTEEN readings. Google AI Mode 2, 2, ~~2~~, ~~1~~, 3, 2, 2, 3, 3, 2, 2, 2, 2/10.** A range (2–3), not a level.
- **Reading #13 (run 30): mention 2/10, own-domain citation 2/10, cited URLs 5, accuracy 2/2, surface 9/10.** `/services/growth-diagnosis` (gained at #12) dropped; `/press` appeared. **Report all three numbers, always.** Completion tell changed: `AI Mode response is ready` is gone — use `Skip to previous prompt` + `Show all` after scrolling; wait with `computer wait`, not `setTimeout` (froze the renderer twice).
- **Prompts 3 and 5 carry the whole panel.** Prompt 3: named, `/services/90-day-growth-sprint` cited, correct 12-week / 6–8 ICE-scored detail (source-verified run 28, including the week breakdown). Prompt 5: leads the list, **three own-domain URLs** (`/facts/we-scale-startups`, `/insights`, `/about`), stage and price band correct in every reading that named WSS.
- **Seventh consecutive absences: prompts 4 (settled NO), 7, 8, 9.** Prompt 8 held by `lennysnewsletter.com` — the original-research surface. Prompt 9 reaches WSS only via Growth Division's source card, misnamed. **Prompt 2 ungrounded three readings running.**
- **THE PANEL INFLATES THE GENERATIVE AI REPORT ON THE DAYS IT RUNS — LIKELY (run 30).** Natural experiment: no panel 09-16 → 10-05. Gen-AI dailies: panel days mean **20.7** (n=3), non-panel weekdays **12.5** (n=4) before and **11.8** (n=13) after. ~8–9 extra impressions per panel day. Most of the report is not the panel (347 with 18 panel-free days). **Never judge a verdict on a Gen-AI window without subtracting panel days; take panels fortnightly, not every run.**
- **RECORD THE BROWSER'S SIGNED-IN GOOGLE ACCOUNT WITH EVERY READING.** Eleven readings recorded none; #11 and the run-28 probe were `admindjohnson@gmail.com`. **AI Mode personalises on the signed-in account, so absences stay valid and namings sit on a personalisable surface.**
- **PERPLEXITY: contaminated when signed in (namings unscoreable, absences valid); at run 30 the session was SIGNED OUT and hit a visitor login wall (`hardVisitorGate`) after one prompt — 9/10 UNAVAILABLE.** Signing in is prohibited for this bot. Awaiting Daniel: sign back in or drop the engine. The contamination tell is semantic (WSS in the second person, as the reader's own organisation) — read every naming, never regex.
- **COMPLETION TELLS ARE MANDATORY.** Google AI Mode (run 30): `Skip to previous prompt` present, sources block (`Show all`) rendered, **read after scrolling to the bottom**. The old `AI Mode response is ready` string is gone. Perplexity: `Finished · N steps` button or the `N sources` block. **Keep any in-page wait under ~20s (CDP times out at 45s); prefer `computer wait` between navigate and read. One prompt per call.**
- **NEVER TAKE TWO PANEL READINGS IN ONE DAY — tested, not assumed (run 28).** Five prompts re-issued 90 minutes later reproduced **5/5 exactly**, same URLs in the same order. **A same-day re-read cannot refresh anything.** **This is NOT evidence the panel is stable** — caching explains 5/5 equally well, and the identical ordering leans that way. **Settling 2-versus-3 needs same-day readings from DIFFERENT sessions**, i.e. the signed-out decision. Probe: `ai-visibility/2026-09-14-run28-variance-probe.md` — **not reading #12; the series stays at eleven.**
- **PROMPT 6 USES AN EM DASH AND MUST BE URL-ENCODED `%E2%80%94` ON EVERY ENGINE.** Prompt 10's replacement wording works — no M&A content in #9–#11; **do not trend across the #8/#9 break.**
- **A single reading of one prompt is a sample. Report a share across ten, never a result on one.** **Readings #3 and #4 are floors (premature reads) — no trend through them.** **A reading that could not be taken is NULL, never a low share.** **Always state the winnable surface alongside the share.** **Groundedness is volatile per reading, not a property of the prompt.**
- Tables: `AI-VISIBILITY.md` for #1–#9 (FROZEN), then `seo-bot/ai-visibility/YYYY-MM-DD-readingN.md`.

## Connector and environment notes

- **USE THE `WSS Search Analytics` CONNECTOR FIRST (verified 2026-10-06 after run 30).** Tools `mcp__WSS_Search_Analytics__wss-search-analytics_*`, loaded via ToolSearch — it connects late, so **search for it before falling back to Chrome; it was missing for the whole of run 30 and appeared only afterwards.** Accounts: `google` (Search Console, GA4, PageSpeed) and `bing` (Bing WMT). **Clarity and Cloudflare are NOT configured in it** — read Clarity in Chrome. Check: `google_search_analytics_summary` (`account_id: google`, `site_url: sc-domain:wescalestartups.com`, 2026-09-06 → 10-03) returned **56 clicks / 3,424 impr / pos 16.27, identical to the UI read**. GA4 property `259840282` works through `google_analytics_*`. **GA4 counts `chatgpt.com / ai-assistant` 14 sessions in that window where Clarity counts 3. Name the instrument whenever you quote AI arrivals.**
- **GSC UI FALLBACK if the connector is missing:** Claude in Chrome. **`/u/1/` now says "not verified"; `/u/2/` loads the property.**
  - Read the **visible** table: `[...document.querySelectorAll('table')].find(t => t.offsetParent !== null && t.getBoundingClientRect().height > 0)`, after `window.scrollTo(0,900)`. Return compact rows — long outputs truncate. `document.body.innerText` on `search.google.com` is refused; `get_page_text` shows only 10 rows.
  - If the connector returns: pull `["page"]` and read row one; a `www.` URL means the wrong property and condemns every dimension. No known remedy; do not reinstall.
- **THE GENERATIVE AI REPORT IS UI-ONLY.** Impressions only, pages only, no queries. **Run 30 URL (account index moved — `/u/1/` now says "not verified"):**
  `https://search.google.com/u/2/search-console/performance/search-analytics/ai?resource_id=sc-domain:wescalestartups.com&num_of_days=28`
  - **METHOD RULE: when a Google property refuses, try `/u/0/1/2/` BEFORE reporting an access blocker.**
  - **`&num_of_days=28` IS MANDATORY** (defaults to 3 months). **It does not refresh daily** — a next-day re-read is NULL; space readings to the report.
  - **28d series: 217 → 228 → 258 → 337 → 305 → 347** (run 30, to ~10-03).
  - **Page-level 28d (run 30):** `/` 96, sprint service page 61, `/fractional-cmo-vs-agency` 55, `/growth-operating-system` 33, `/insights` 31, `/facts/we-scale-startups` 27, `/insights/venture-capital-marketing` 23. Run 15's insight page and the 226-reviews page are **absent**.
- **The phantom `legacy_*` accounts were fixed by Daniel's manifest edit at run 28;** a connector reinstall brings them back. Root cause in `changelog/2026-09-02-run21.md` §B.
- **`genai_query_insights` is NOT an AI-citation report** — heuristic pattern-matching on ordinary query data, by its own caveat. **Never quote it as citation evidence.**
- **`inspection_inspect` is working-but-PARTIAL:** a full result for `/pricing` and a false "you do not own this site" for `/resources`, same call, same property. **A success is trustworthy; a failure is not evidence about the URL.** `sitemaps_list` returns `[]` for a live submitted sitemap. Recrawl comes via the sitemap. **Bing `submit_url` returns `{"result": null}` — treat as unconfirmed, do not chase.**
- **BROWSERS: there are two and they are not interchangeable for the panel.** Claude in Chrome is the signed-in profile the series was taken on. The built-in pane is a **separate, signed-out profile** — fine for the live site, competitor pages and `sitemap.xml`, **but a panel reading there is a series break needing sign-off.** A "not connected" extension is an **outage**, not a refusal (Trap 12) — report it and take no reading. **Chrome drops mid-session under load; re-take affected prompts.**
- **The sandbox can clone, install and build the repo** (`git clone` + `npm ci` + `npm run build`); the GitHub connector pushes. **Verify every change this way.** Costly traps: **2**, **5**, **8**. **THE SANDBOX IS NOT PERSISTENT** — do clone → edit → build → push in one stretch, and **keep repo edits as a replayable script against the pristine file.**
- **`staticPathLastModified` covers 84 routes including SOME `/insights/*`** — the four pillars (`what-is-a-fractional-cmo`, `b2b-saas-gtm-strategy`, `ai-native-gtm`, `startup-growth-bottlenecks`), `/insights`, `/insights/glossary`; every other insight falls back to `siteConfig.siteLastModified`. **So the two-step DOES apply to the pillars, static pages, and service/case content. Do not guess: `grep` the route.** **The script only refreshes routes already in the map — insert a placeholder key and let `refresh:lastmod` write the date.**
- **Bing quirks:** weekly buckets dated to Fridays — never compare to GSC dailies. Backlinks from the UI (`GetLinkCounts` empty). Tools need `self="bing"`. Quota 100/day. Site URL `https://wescalestartups.com` — a `sc-domain:` value returns `InvalidUrl`, a parameter error, not an outage.
- Cloudflare MCP has no Pages-deploy tools; verify deploys by fetching the live URL with a cache-buster. **curl status codes beat `web_fetch` bodies for redirects.**

## Backlog

**Numbers are stable IDs, not priority; never reassign them.** Order within each list is the ranking.

### Open

12. **`agency brief template` — the page does not rank for its own name** (90 impr @ 34.2); its download is an 83-word skeleton. Soft SERP, real pre-hire buyer. If worked, thicken the deliverable; do **not** chase `agency collaboration template`, a closed decoy.

3. **Off-site authority — WORKSTREAM C** lives in `seo-bot/OUTREACH.md` (frozen) plus `seo-bot/outreach/`. Entity hygiene settled runs 11–13. **Daniel's standing decisions: no Companies House registration; display name stays "Daniel Johnson"; NO client review requests on any platform; NO cold outreach to competitors (closes C-1).** **WORKSTREAM C IS A LIST OF ONE: be the source these pages cite — original research.** Every third-party-dependent route is closed. Run 24 got the data (backlog 4); Wikidata Q137046365 closed.

6. **Homepage non-brand category cluster — deferred since run 5.** ~630 impr at 7–13, one click. The fix means re-anchoring on "agency" (prohibition 15). Revisit only if another page picks these up.

### Closed — one line each, kept only for the reasoning

- **19, 15, 10. Closed at run 30.** 19: `/insights/what-is-a-growth-operating-system` took a click again — not a redirect candidate. 15: dropped (run 15's reallocation FAILED, target is a collision). 10: sweep run 30 found only fanout strings; residue below any intervention threshold.
- **18. Run 28 — SHIPPED.** Sprint page said 3–5 experiments against 6–8 in eight other places; fixed to 6–8 (`d9908f3` + lastmod `d0abbbf`), verified live. `first-30-days`' 3–5 left alone (month one). **Prohibition 19 deliberately overridden — reasoning in `changelog/2026-09-14-run28-addendum.md` §4; if 09-17 looks contaminated, make prohibition 19 absolute.**
- **13. Closed on Daniel's standing** — no relationship with Growth Division, will not cold-email a competitor. **DO NOT RE-PROPOSE OR RE-DRAFT.** Their comparison row gets WSS's stage, pricing, Clutch status, channels and clients wrong, and run 25 proved the chain: Perplexity renders WSS pricing as "Custom (three tiers)" from it. **The counter-move is to be the better source, not to correct the worse one.**
- **16. Closed — the retrieval layer is competitor-owned on both engines.** All three cited listicles (Growth Division, K3C, dimartec) are competitor self-rankings headed by their own authors, none including WSS. **Being excluded is the point of the page.** **METHOD RULE: citation proves retrievability, NOT reachability — open the page and read the headings.**
- **17. Closed run 23.** `/resources` is a false lead — 0% conversion, 76% collision, all clicks anonymised.
- **14. Closed run 21.** `/facts/daniel-johnson` freshness signal shipped; no rank verdict.
- **11. Closed run 17.** `/gtm-strategy` below any intervention threshold. Rule earned: **never diagnose a page's intent from its own content — pull its query set.**
- **4. Closed 2026-08-27.** `/insights/what-226-founder-reviews-reveal` shipped from 226 PUBLIC GrowthMentor reviews. **Run 24 added a second, PRIVATE corpus — 28 advisory transcripts — which independently reproduces the public corpus's finding 2: in 27 of 28 sessions the presenting problem was not the actual constraint.** Two corpora, opposite methods, same result — **the strongest evidential position WSS has.** **THE TRANSCRIPT CORPUS IS UNPUBLISHABLE; anonymisation is not consent. Publish from the PUBLIC corpus only.** **Verdict 2026-09-24 on CITATION, not ranking.**
- **1, 2, 5, 9. Closed** — migration recovery, four pillars, `/insights` hub, housekeeping. See `VERDICTS.md`. Still open, config not content: HTML is never edge-cached (`cf-cache-status: DYNAMIC`).
- **Also closed:** `cal…/auth/login` (noindexed); legacy `/portfolio/*` (301 chains clean); run 4's fractional-CMO pattern (remainder at 45+, authority-bound).

### Do not do — playbook-specific, ON TOP OF the task file's FIXED RULES

*(The FIXED RULES already cover framework vocabulary, the meta descriptions, Companies House/Ltd, llms.txt and `ai:*`, FAQPage-for-rich-results, `/alternatives/*`, Review/AggregateRating, titles at 45+, brand-sitelink CTR, robots `ai-train`, homepage-as-agency, and merging the changelogs. Not restated.)*

- **Target `scale startup`** — a Scale AI collision, not demand (run 18, SERP-verified).
- **Score a personalised Perplexity mention as a win** (run 18, reinstated 25, fifth mutation 27).
- **Quote `genai_query_insights` as citation evidence** (run 18).
- **Re-optimise `/services/90-day-growth-sprint` for provider intent, or read the collapse of its provider queries as a regression** (run 19 verdict).
- **Call an `analytics_query` without an explicit `siteUrl`** (run 19).
- **Compare a raw panel share between readings without also stating the winnable surface** (run 19) — **or without own-domain citation and URL count, which moved opposite to the headline at #11** (run 27).
- **Classify an off-site target from the fact that an engine cited it** (run 23) — open the page and read the headings.
- **Compare two GSC windows without first checking the terminal date and how many days they share** (runs 23, 25).
- **Describe the money-page sequence as stable** (run 27).
- **Ship schema to obtain a rich result without checking the type is eligible in that context** (run 23).
- **Believe a page-level position, CTR or click figure without summing its named query set and checking for a collision** (runs 23, 26).
- **Log a panel reading taken in a different browser profile as part of the existing series** (run 26) — **or take one without recording the signed-in account** (run 27).
- **Re-diagnose the browser extension when Search Console refuses** (run 27) — check the account, and try `&authuser=` (run 28).
- **Call `analytics_query` "repaired", or fall back to `["date"]` when the discriminator fails** (run 28).
- **Read the Generative AI report without setting `&num_of_days=28`** (run 28) — it defaults to 3 months.
- **Assert that an AI citation is self-justifying** (run 28) — run 15's page won its citations, held them at 34, and produced nothing on either channel. **Ask what the citation produced.**
- **Take a second panel reading in the same day, or read a same-day reproduction as stability** (run 28).
- **Re-read the Generative AI report the next day and log it as a new series point** (run 29) — it does not refresh daily.
- **Call a page dead from its NAMED query set** (run 29) — pull the page total; "12 impressions, zero clicks" was a 60-impression page with a click.
- **Quote a Gen-AI page figure in a verdict without asking whether the PANEL cites that page** (run 29).
- **Diagnose a DEFECT from a query table without opening the page** (run 28) — the table said cannibalisation; the page said competent.
- **Harmonise a number across pages without checking each page's SCOPE** (run 28) — the sprint's 6–8 and `first-30-days`' 3–5 are both correct, for different periods.

## Standing decisions

- **Verify claims about the site against the site — and claims about WSS's OFF-SITE presence against the PLATFORM, not against whoever described it. FOURTEEN false facts, same shape every time:** a claim taken from a secondary source and never re-checked. Ledger in `VERDICTS.md`. **`grep` the repo, fetch the live URL, or open the page before acting — and when you correct one, DELETE the wrong line.** **This applies to the bot's own tooling too:** "`analytics_query` is unusable" survived five runs because nobody re-ran the one-call discriminator (run 26); "the browser is unavailable" was two different faults (run 27); "removing the phantoms clears it" lasted hours (run 28).
- **Mark confidence explicitly** (verified / inferred / vendor-sourced). Most GEO research is published by firms selling GEO tools.
- **KEEP FILES SMALL AND CHECK THE RETURNED BLOB SHA.** The connector's `content` is a string literal, so *someone* must regenerate every byte — a subagent only moves that risk. **What works: `git hash-object` on the sandbox, push, verify the returned SHA matches.** **The real defence is keeping each file small enough to emit in one call** — why `changelog/`, `ai-visibility/`, `outreach/`, `query-map/` and `VERDICTS.md` are split out. **`AI-VISIBILITY.md` (64KB) and `OUTREACH.md` (52KB) are FROZEN — do not append.** **`QUERY-MAP.md` is at 28KB and is next.**
- **TRAP 7 IS NARROWER THAN WRITTEN (run 28): it fires only on the SHARED `src/pages/services/[slug].astro` route, NOT on a single slug's file under `src/content/services/`.** Run 28 edited the content file and `refresh:lastmod` bumped only the sprint. **Per-service content fixes are cheap and cleanly attributable.**
- **The verification protocol, the lastmod two-step and the noindex two-file rule are in the task file's FIXED RULES. Not restated.** The two that have cost time: `check:lastmod` cannot fail before the content commit exists (Trap 5), so only the post-push pass means anything; and **pages built − noindexed = sitemap `<loc>` count**.
- **Never state unsourced market statistics.** Anchor cost claims on WSS's published ranges; reuse `/insights/fractional-cmo-cost-uk`'s bands.
- **Keep the "point them somewhere better" voice.** Every comparison should name the case where a competitor or a different model is the right buy — brand voice *and* what makes a passage worth citing.
- **Sweep the connectors before writing anything implying WSS expertise or client work.** The real position is accelerator-side (Google for Startups, DeepMind, Techstars, GrowthMentor, several hundred founder sessions) — **a mentoring relationship, not client work.** Run 20 found a third party collapsing that distinction off-site; run 21 found the site doing it on `/facts/daniel-johnson`. **Check every time.**
- **A hub page must not restate its spokes.** Run 3 spent a run undoing a self-competing cluster — **and run 15 recreated one (backlog 15).**
- **When a change is defensible under two competing readings of the data, prefer it** over one needing the ambiguity resolved first.

## From growth-bot

Evidence from the daily Growth/CRO operator. Its state is in `growth-bot/`; locks are shared both ways.

- **GA4 `259840282` (account `161039443`)** — URL shape `https://analytics.google.com/analytics/web/?authuser=1#/a161039443p259840282/reports/explorer?...`; `?authuser=1` alone lands on the wrong property (*Baboodle Universal*). Assert the property name. Has an **"AI Assistant" channel** (arrivals, not surfacing) and an `ai_referral` event. **GSC and GA4 disagree on organic ~2x** (sessions ≠ clicks): name the instrument. **Never read GA4 session totals as health** (Direct ~80% at 8s; Clarity strips ~1/3 as bots).
- **Clarity referrer card** (`clarity.microsoft.com/projects/view/wkannkoxst/dashboard`, Referrer card) is the human AI-arrival count: 9 AI-referred sessions/28d at growth run 3; **~5/30d at run 30** (`chatgpt.com` 3, copilot 1, askaichat 1).
- **Commercial reality for ranking anything here:** the site produced **zero ICP bookings** across September; most booked calls come from channels Daniel works by hand. **A click target is not a commercial target.** Growth-bot owns conversion.
- **`/contact` is NOT a CTR opportunity** (growth run 6): its impressions are `we scale startups` at 1.0, brand stacking. Pull a page's queries before calling high-impression/low-CTR a defect.
- **Closed, IGNORE (run 30):** legacy 404s `/did-you-know-that-you-can-get-money-from-tiktok` and `/customer-onboarding-process` (0s-engagement sessions, no evidence of a live inbound link); `wescalestartups-site.pages.dev` (canonical points at production; no duplicate observed).
- Full growth-bot evidence history: `growth-bot/changelog/`.
