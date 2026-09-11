# Verdict record — what worked, what didn't

**Split out of `PLAYBOOK.md` at run 26**, which had reached 40,874 bytes. The playbook is the working document and must stay small enough to re-emit safely every run; this is the history it kept growing on. **Read `PLAYBOOK.md` first, then this. Detail beyond what is here lives in `changelog/`.**

## Verdicts due, in order

| Date | What | Judge it on |
| --- | --- | --- |
| **2026-09-16** | run 9 — `/insights/what-is-a-fractional-cmo` to pillar depth | clicks; baseline to beat is **zero impressions** |
| **2026-09-17** | run 15 — `/insights/how-to-run-a-90-day-growth-sprint` | clicks, and whether the new URL takes the queries off the £8k–£12k service page. **Unblocks backlog 15** |
| **2026-09-22** | run 19 — `/facts/we-scale-startups` | **AI impressions and panel prompt 5 — not rank** |
| **2026-09-23** | runs 10–13 (migration recovery, three pillars, `/insights` hub, orphans); backlog 10's queued lead | clicks. **If the pillars are still at zero, the pillar thesis is authority-bound too, and that changes the backlog** |
| **2026-09-24** | original research — `/insights/what-226-founder-reviews-reveal` | **CITATION, not ranking** — panel prompts 6 and 8, the Generative AI report; classic clicks last and possibly never. **A null result is a real finding** |
| **2026-09-29** | the first genuinely **independent** money-page window | money-page clicks. Nothing before this date confirms anything |
| **2026-10-03** | run 3 — fractional-CMO consolidation (301 check was 09-19) | clicks |

**The next several runs are mostly judging, not shipping. Plan for that rather than hunting for something to change.**

---

## Closed verdicts

### The run 1 / run 4 / run 5 set — complete, and it says one thing

**On this site, every examined case of "we rank well for question-shaped queries" has been a statement about machine-issued strings.**

- **run 1 — FAILED, twice read.** Query-family re-anchor of `/fractional-cmo-vs-agency`: 740 named impressions, weighted position 46.2, **zero clicks**. **Content is necessary but not sufficient at position 45.** Do not rewrite this page again.
- **run 4 — CLOSED 2026-09-01: FAILED.** **Position 1 on provider-fanout queries produces no clicks** — 51 → 41 → 2 impressions at 1.0–9.0, zero throughout. Do not re-optimise the sprint page for provider intent; do not read the disappearance as a regression.
- **run 5 — CLOSED 2026-09-07: FAILED, and RECLASSIFIED. The most load-bearing verdict here.** `/insights/when-to-hire-fractional-cmo`: 85 impr / pos 7.7 / **zero clicks**. **73 of its 77 named 90-day impressions (95%) are two variants of ONE seventeen-word fanout string; the human phrasings drew THREE impressions in ninety days, at positions 22.0 and 30.0.** The verdict is not "content at position 8 does not convert" — it is **"there was no human demand here, and the position that looked like 8 was never a human's position."** Judge on AI citation. Detail: `changelog/2026-09-07-run24.md` §1.

**Operative rule: before writing or rewriting a page for a question, check that HUMANS ask it, IN THAT PHRASING, in measurable volume.** Position on the long conversational string is not evidence the short one is winnable — run 5 holds both at once, fifteen to twenty-two places apart.

### run 2 — CLOSED 2026-09-04: SPLIT VERDICT

**Recrawl PASSED** — Google recrawled `/pricing` ~2h after the commit; clearing the stale lastmod worked. **The Offer rich result FAILED and was never eligible** — `OfferCatalog` on a **Service** is not rich-result-eligible; Google detects Breadcrumbs only, Search Appearance empty at 28d and 90d.

**RULE, PROHIBITION-STRENGTH: VALID ≠ ELIGIBLE.** Check Google's rich-results gallery for the type in that context before shipping schema to obtain a SERP feature — otherwise ship it for entity understanding and passage extraction only, and say so. Not reverted: the price bands ARE being extracted. Detail: `changelog/2026-09-04-run23.md` §3.

### Open-but-trending

- **run 19** — `/facts/we-scale-startups` completed as a fact source. Four instruments agree it is in the retrieval set: **AI impressions 7 → 17 → 19 → 23**, panel prompt 5 in readings #1–3, #5, #7–#10, and 559 classic impressions at 6.4 **with zero clicks**. Verdict 09-22, on AI impressions — not rank.
- **run 15** — `/insights/how-to-run-a-90-day-growth-sprint`. **AI impressions 20 → 34.** Baseline: four queries, 110 impressions at 11.3–15.0, zero clicks, all on the £8k–£12k service page. **Cited by AI Mode four days after publication while classic search reallocated nothing — the two channels need different review horizons.**
- **runs 10–13** — one interactive session with Daniel, ~4x unattended scope, **only because Daniel supplied the GTM guide body**. It worked because 4,000 words of unsourced advice produces filler. **Do not reproduce unattended.**

---

## Run log — one line each

- **run 26 (2026-09-11) — SHIP.** `/mentoring` was absent from the hand-maintained sitemap path list; arithmetic restored 109 → 110. **And the run's larger output: `analytics_query` is REPAIRED** — page, query, date and filters all answer about the correct property, verified four-for-four against run 25's hand-read UI table. Fourteenth false fact. **Panel NULL — Claude in Chrome not connected.** Backlog 15's page found to be **71% a land-acquisition collision**.
- **run 25 (2026-09-09) — MEASURE.** Whole yield is instruments. Panel **#10 broke the 3/10 story: 2/10**. Found Perplexity's search-history memory ON and self-poisoning; found the Perplexity `Finished` completion tell; proved the old personalisation regex both false-positives and misses. **Generative AI impressions 258 → 337.** State files frozen and split.
- **run 24 (2026-09-07) — VERDICT.** Closed run 5. Money pages 5. Panel #9. GBP category confirmed live. **Eighth and ninth false facts** (Clutch is live and claimed; `pricingTiers` already fixed). Both SHIP candidates evaporated on inspection — the correct outcome.
- **run 23 (2026-09-04) — VERDICT.** Closed run 2 and backlog 17. **Retracted run 22's two off-site targets** — both competitor self-rankings. Panel #8. Surfaced the GBP "Marketing agency" category.
- **run 22 (2026-09-03) — MEASURE.** Repaired page/query measurement via the GSC UI through the DOM; proved the API bug was **not** the phantom accounts; found the AI Mode completion tell; settled **prompt 4 as a NO**.
- **run 21 (2026-09-02) — SHIP under an instrument blackout**, then an addendum that overturned half its own diagnosis. Fixed a 2.5x self-contradiction on `/facts/daniel-johnson`. **Build-verifiable work is the one class that survives an evidence blackout: a blacked-out run is not automatically a REPORT run.**
- **run 20 — MEASURE then OFF-SITE.** Sixth false fact (the panel's reading method). Established that Google names WSS on a buying prompt **solely from a competitor's page that gets the stage wrong**.
- **run 19 (2026-09-01) — VERDICT then SHIP.** Judged run 4; shipped `/facts/we-scale-startups`.
- **run 18 — OFF-SITE.** Downgraded a recorded Perplexity win to zero on the personalisation tell; turned `scale startup` into a prohibition on **one SERP fetch**.
- **runs 10–13 (2026-08-26) — interactive session with Daniel.** Audit, entity/schema, off-site profiles, three pillars, `/insights` hub, four orphans. **Read run 14 first; it corrects run 13.**
- **run 9 — SHIP.** `/insights/what-is-a-fractional-cmo` to pillar depth, definition/scope only.

---

## Standing lessons that came out of failures

- **Five false leads chased, five different tells** — brand sitelink stacking (run 4), `scale startup` (18), a subagent reading WordPress paths on an Astro site (19), Bing's `InvalidApiKey` (21), `/resources`' 2.7% CTR (23). **The data looked internally consistent every time. Check the thing the data is about.**
- **FOURTEEN false facts found, and the shape is identical every time:** a claim recorded from a secondary source and never re-checked against the primary one. The three that still matter as warnings: **"WSS is not listed on Clutch"** (taken from a competitor's page — the profile is live, claimed, accurate, 5.0, page one), **"the LAST table is the live view"** (it is the VISIBLE one), and **"Perplexity's free tier has no memory"** (falsified by opening the settings page). **Run 26 adds the first one this bot wrote about its own tooling: "`analytics_query` is unusable".** `grep` the repo, fetch the live URL, or open the page before acting — **and when you correct one, DELETE the wrong line.**
- **The hygiene layer is clean and re-auditing it is waste** (run 5: no missing `alt`, links resolve, JSON-LD parses, legacy 404s redirect).
- **SETTLED: the top AI-cited pages are already built for extraction. Stop re-auditing this layer** — but *do* check a fact page actually carries the facts (four defects, runs 19–21).
- **A page rendering canonical metrics AND hand-written prose can contradict itself, and the JSON-LD half is the half that gets extracted** (run 21). Canonical reconciliation: **50+ startups supported, 20+ paid client engagements**. Diff hand-written figures against `canonicalProofMetrics` before trusting either.
- **THE GSC GENERATIVE-AI REPORT IS UI-ONLY**, at `/performance/search-analytics/ai?resource_id=…`; the connector returns empty `searchAppearance` (**re-confirmed run 26, after the rest of the API was repaired — these were always two separate faults**). **Impressions only, no QUERIES tab: it names surfaced PAGES, never the prompt.** **217 → 228 → 258 → 337 (28d) — and 337 is ONE reading, not yet confirmed.** **Judge each open verdict on the channel the change was made for.**
