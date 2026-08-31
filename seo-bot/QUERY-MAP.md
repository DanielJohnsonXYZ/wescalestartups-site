# Query → intent → page map

Seeded run 15, 2026-08-27. Refreshed run 16, 2026-08-27. Window: **2026-07-29 to 2026-08-25** (28 days), 346 named queries, 2,666 named-query impressions, 22 named-query clicks — all 22 from three branded queries.

**Read the reconciliation before using the table below.** The site total for the same window is **68 clicks / 5,248 impressions**. Named queries account for 22 clicks. **The other 46 — 68% — come from queries Google anonymised**, and ten non-homepage URLs took 21 clicks between them without appearing anywhere in the named-query data (`/about/daniel` 8, `/resources` 4, `/facts/we-scale-startups` 2, then `/book`, `/growth-operating-system`, `/industries/saas-growth`, `/insights/what-is-a-growth-operating-system`, `/pricing`, `/services/90-day-growth-sprint`, `/team` at 1 each). Prior window the same figures were 21 anonymised and 12 non-homepage. **This map covers the 32% of clicks Google will name. Never mistake it for the site.**

**Status key:** `MATCHED` page can satisfy the intent · `MISMATCH` wrong page type for the intent · `ABSENT` no page behind it · `AUTHORITY` right page, wrong neighbourhood (45+) · `NOISE` not our buyer.

**The column that matters is "can it satisfy?"** A commercial URL chosen for a `what is` / `how to` / `why` query is a defect, not a ranking. Sweep for it every run.

---

## Cluster: 90-day growth sprint — 116 impr

| Query | Impr | Pos | Page Google chose | Intent | Can it satisfy? | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 90 day growth sprint | 32 | 12.6 | /services/90-day-growth-sprint | mixed | partly | ADDRESSED r15 |
| how to run a 90 day growth sprint | 31 | 11.3 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |
| why 90 day growth sprint | 25 | 11.7 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |
| what is a 90 day growth sprint | 22 | 15.0 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |

Run 15 shipped `/insights/how-to-run-a-90-day-growth-sprint`. **Verdict 2026-09-17.** Watch whether the informational queries move to the new URL. A position drop on the service page for these four is the system working — do not confuse it with run 4's provider-intent verdict on 2026-09-01, which is a different intent on the same page.

Provider-intent queries on the same page (run 4, verdict 2026-09-01) are separate and holding at position 1.0–2.0.

## Cluster: fractional CMO vs agency — 196 impr at pos ≤30, 300+ overall

| Query | Impr | Pos | Status |
| --- | --- | --- | --- |
| fractional cmo vs marketing agency | 58 | 22.9 | AUTHORITY |
| fractional cmo vs agency | 39 | 28.3 | AUTHORITY |
| growth agency vs fractional cmo | 28 | 24.2 | AUTHORITY |
| embedded growth team vs agency | 27 | 36.5 | AUTHORITY |
| fractional cmo vs growth agency | 25 | 28.2 | AUTHORITY |
| marketing agency vs fractional cmo | 19 | 26.0 | AUTHORITY |
| fractional cmo vs branding agency | 23 | 56.4 | AUTHORITY |
| growth pod vs agency | 32 | 42.0 | AUTHORITY |

All land on `/fractional-cmo-vs-agency`, which is a good page — comprehensive, answer-first, FAQ-structured. Run 1 rewrote it. **Second negative verdict**: 740 named-query impressions at weighted position 46.2, zero clicks, against the 44.1 that motivated the change. Content is necessary but not sufficient here. **Do not rewrite again.** This cluster is the case for Workstream C, not for more copy.

## Cluster: growth operating system — 102 impr

`growth operating system` 89 @ 22.3. Run 14 (2026-08-27) added a definition and five FAQs to `/growth-operating-system`, which previously never defined the term. `/insights/what-is-a-growth-operating-system` sits at 10.6 on the same topic and is now linked from it. No review date was set — set one.

## Cluster: post-PMF — 75 impr

`post pmf saas scaling` 32 @ 14.2, `growth leader for post pmf startup` 31 @ 9.2. Strong ICP match, page 1–2, zero clicks. Run 13 rewrote the `/insights` hub for provider intent. **Verdict 2026-09-23.**

## Cluster: fractional CMO head terms — AUTHORITY

`fractional cmo for b2b saas` 45 @ 45.9, `saas fractional cmo` 43 @ 46.0, `startup fractional cmo` 20 @ 52.1. `/services/fractional-cmo` carries 453 impressions at position 46.7. Authority-bound. Prohibition 11 applies.

## Cluster: generic startup / scaling head terms — CLOSED as a target, run 18

**`scale startup` is a Scale AI brand collision. It is not demand and it is not winnable. Do not reopen it.**

2–29 Aug: **860 impressions, position 10.3, homepage, zero clicks** — up from 108 @ 10.0 when this cluster was written, and 1,040 over three months with 860 of them in the last 28 days. Page one, huge, accelerating, zero clicks: it reads as the best unclaimed opportunity on the site.

The live SERP settles it. `scale startup` returns scale.com, Wikipedia "Scale AI", **wescalestartups.com**, LinkedIn "Scale AI", Y Combinator "Scale AI", Index Ventures "Scale", Stripe "How to Scale a Startup". **Google reads the query as navigational intent for Scale AI, the company.** WSS ranks third in front of an audience looking for something else.

**Two consequences for every future run:**

1. **Discount 860 impressions from the 28-day figures.** Site CTR reads 1.3% → 1.1% and looks like a decline; ex-collision it is 67/5,290 = **1.27%**, i.e. flat. The +690 impression "growth" this window is substantially this one query.
2. **One SERP fetch turned the run's most attractive lead into a prohibition.** The fixed rule requiring a live SERP check before committing to a cluster earned its place here.

The rest of the cluster is unchanged: `marketing startups` 23 @ 5.7, `startup development agency` 21 @ 9.6 — low intent, and the fix would mean re-anchoring the homepage on "agency". Prohibition 14 stands.

## Cluster: brand and near-brand — 88 impr across 31 variants

`wescale` itself at 35.5. Many are other companies: `we scale creators`, `we scale trades`, `we scale ab`, `wescale uploader`, `wescale ai`, `wescale login`. Discount from every CTR calculation. `we scale` at 164 impr / pos 6.9 / 1.8% CTR is the one worth understanding — that CTR is far below expectation for position 7.

## Standing sweep: commercial page chosen for an informational query

Run 15 found this pattern and run 16 swept the whole `page,query` set for it. **The pattern is real and run 15 took the only instance worth having.** Full residue, current window:

| Query | Page | Impr | Pos | Verdict |
| --- | --- | --- | --- | --- |
| whats the best fractional cmo or fractional growth leader service for a venture-backed startup | /services/fractional-cmo | 19 | 44.6 | AUTHORITY — prohibition 12 |
| how does a post-pmf plg saas company scale acquisition without breaking unit economics | /insights (bare index) | 16 | 36.1 | **MISMATCH — real, queued to 2026-09-23** (run 13 verdict window) |
| how to scale b2b saas acquisition | /services/acquisition-system-build | 10 | 35.5 | MISMATCH — clean but too small to justify a page |
| growth pod vs hiring a fractional cmo vs full-service agency which model is best for a series a startup | /services/fractional-cmo | 7 | 94.3 | AUTHORITY |
| what are the best fractional cmo services for a fast-growing b2b startup? | /services/fractional-cmo | 1 | 12.0 | too small |

37 impressions in total against run 15's 110. `/pricing`, `/contact`, `/book`, `/services`, `/services/growth-diagnosis` returned **no** informational-shape rows at all — their traffic is brand-navigational or generic commercial.

**Keep the sweep — it costs one pull. Do not expect it to generate a shippable change every run.** Demoted in the playbook backlog accordingly.

## Open leads — unworked

| Query | Impr | Pos | Note |
| --- | --- | --- | --- |
| ~~agency collaboration template~~ | 67 | 34.9 | **CLOSED 2026-08-27 — DECOY. Investigated, not winnable, not worth winning.** See the decoy section below. |
| branding agency for scale-ups | 82 | 61.4 | AUTHORITY |
| growth readiness | 45 | 58.3 | AUTHORITY. New this window (0 → 45). |
| scaling beyond founder led gtm | 28 | 37.8 | ABSENT? check. New this window (0 → 28). |
| how does a post-pmf plg saas company scale acquisition without breaking unit economics | 16 | 36.1 | ABSENT — see sweep above. **2026-09-23.** |
| how to scale b2b saas acquisition | 10 | 35.5 | ABSENT — see sweep above. Too small alone. |

## Movers, 1–28 Jul → 29 Jul–25 Aug

**Gained:** `we scale startups` 53 → 237 (pos 1.0) · `agency collaboration template` 3 → 64 · `growth operating system` 28 → 88 · `growth readiness` 0 → 45 · `growth pod vs agency` 0 → 32 · the Series A three-way question 0 → 32 at **pos 8.0** · `growth leader for post pmf startup` 0 → 31 at **pos 9.2** · `how to run a 90 day growth sprint` 0 → 31 · `post pmf saas scaling` 1 → 31 · `scaling beyond founder led gtm` 0 → 28.

**Lost:** `b2b fractional cmo` 74 → **0** (was pos 50.0) · `fractional cmo for saas` 53 → **0** (was 43.4) · `scale-stage business consultant` 23 → **0** (was 73.5) · `startup fractional cmo` 65 → 17 · `marketing startups` 65 → 22 (but position improved 16.4 → 5.8) · `saas fractional cmo` 72 → 42.

Two head terms disappearing from the named set entirely is consistent with normal churn at positions 43–50, not with a penalty — but if a third goes in the next window, look at `/services/fractional-cmo` properly.

**Clicks:** all three prior-window non-brand clicks (`growth operating system`, `scale startup`, `small startups near me`) went to zero, and all click growth was brand. In the named table the site went backwards on non-brand. In the site total it nearly doubled. See the reconciliation note at the top — that contradiction is the most important thing on this page.

## Closed: `agency collaboration template` is a decoy — investigated 2026-08-27

3 → 67 impressions in one window at position 34.9 looked like the site's largest non-brand gain. It is not an opportunity. Three findings, in order of how much they matter:

**There is no cluster.** Sweeping the entire `page,query` set for `template|brief|checklist|framework|scorecard|example|collaboration` returns **four rows**. `agency collaboration template` is 67 of them; the rest are 3–5 impressions. **One query on one page moved and nothing else did.** Position went 38.7 → 34.9, so the impression jump is Google showing the page deeper for more of the same head term, not a ranking gain.

**The SERP is owned by a different artefact class.** Every result for `agency collaboration template` is a *shared workspace* — Jotform board, Asana template, Notion marketplace, Tracup, Storyflow. The searcher wants a **board to duplicate**, not a document to write. That is why four SaaS products own it and no consultancy does: the query resolves inside a product. Winning it would mean WSS shipping a project-management template to compete with project-management companies on their own surface.

**The audience is post-decision anyway.** Someone looking for a client↔agency task tracker **has already hired the agency.** WSS's entire commercial argument on `/fractional-cmo-vs-agency` is to diagnose the constraint *before* signing the retainer. Even won, this traffic is the wrong side of the decision.

**The one real finding underneath it:** `agency brief template` — the page's own exact title — has **zero impressions in either window.** The page does not rank for its own name, and it only surfaces for a term it was not written for. That SERP is soft (a LinkedIn post, Wikipedia, blog guides, no dominant incumbent) and it hits the genuine pre-hire buyer. The blocker is the deliverable: the download is an **83-word markdown skeleton**, no worked example, no copyable doc. **If this page is ever worth work, that is the work — and it is explicitly not "add collaboration".** Not queued; recorded so the next run does not re-derive it.

The page is in no verdict window — no seo-bot run has ever touched it.

## Anomalies

- **Prompt-shaped queries ranking well.** Several rows read as verbatim assistant prompts with em-dashes, and rank at positions 1–7 — e.g. "our board set a 12-week deadline for a full brand refresh and site relaunch—who has a repeatable sprint process for high-growth saas?" at 7.3. Likely AI-surface traffic. This is what the GSC generative-AI report exists to measure — **and run 16 established it cannot be read through this connector.** `dimensions: "searchAppearance"` returns an empty array rather than an error, so it is not possible to distinguish "no AI rows" from "dimension dropped". Reading it needs the Search Console UI. Until then the AI panel in `AI-VISIBILITY.md` is the only instrument.
- **Third-party vendor questions landing on WSS pages.** "how does minoa compare to valueiq…" (12 impr, pos 88.7) on `/insights`, and a ~50-word Diaceutics precision-medicine question (5 impr, pos 64.4) on `/case-studies/healthtech-precision-medicine`. NOISE — someone else's vendor comparison. Do not build for these.
- **18 queries at position ≤3 with zero clicks**, including `startup accountants` and `google for startups in shoreditch`. Irrelevant matching, not opportunity.
- **Duplicate-punctuation splits:** the Series A fractional CMO question appears twice (32 @ 8.0 and 11 @ 7.6), combined 43 impressions. Combine before prioritising.

---

## Window 2026-08-02 → 2026-08-29 (run 18)

Site: 67 clicks / 6.15k impr / 1.1% / **pos 24.6**, against 72 / 5.46k / 1.3% / 26.7 the preceding window. Position improved two places. **Still zero non-brand named clicks — nineteen runs.** 338 query rows, 93 page rows. Named clicks 27 (`we scale startups` 19, `we scale` 4, `wescalestartups` 4); **anonymised 40 of 67 = 60%**, down from 69%.

**Top rows by impressions after discounting `scale startup`:**

| Query | Impr | Pos | Landing page | Intent | Can that page satisfy it? |
| --- | --- | --- | --- | --- | --- |
| branding agency for scale-ups | 93 | 60.7 | — | provider | Position 45+. Prohibition 12. |
| growth operating system | 71 | 23.9 | `/growth-operating-system` | informational | Yes. Run 14's page. |
| agency collaboration template | 71 | 34.7 | `/resources/agency-brief-template` | template | **Closed decoy** — see below. |
| growth readiness | 56 | 56.1 | — | informational | Position 45+. Prohibition 12. |
| embedded growth team vs agency | 47 | 26.1 | comparison cluster | comparison | Authority-bound. |
| fractional cmo vs marketing agency | 42 | 24.4 | `/fractional-cmo-vs-agency` | comparison | **Yes, and it does.** Run 1 failed twice. Judge it on AI impressions, not rank. |
| should a series a startup hire a fractional cmo a growth agency or wait to hire a full-time vp of growth | 40 | **7.6** | `/insights/when-to-hire-fractional-cmo` | decision | Yes. **Inside run 5's verdict window to 2026-09-08.** |
| why 90 day growth sprint | 37 | 10.7 | `/services/90-day-growth-sprint` | informational | **No — but run 15's insight exists now. Verdict 2026-09-17.** |
| fractional cmo vs agency | 37 | 33.1 | comparison cluster | comparison | Authority-bound. |
| growth leader for post pmf startup | 36 | **9.2** | provider pages | provider | Yes. No defect. |
| growth agency vs fractional cmo | 36 | 23.4 | comparison cluster | comparison | Authority-bound. |
| 90 day growth sprint | 35 | 11.8 | `/services/90-day-growth-sprint` | mixed | Verdict window. |
| how to run a 90 day growth sprint | 33 | 11.4 | `/services/90-day-growth-sprint` | informational | **Still 100% on the service page four days after the insight shipped.** Verdict 2026-09-17. |
| scaling beyond founder led gtm | 32 | 37.4 | — | informational | Marginal. |
| maven fractional cmo | 31 | 44.9 | — | competitor brand | No. |
| growth agency for scaleups | 31 | 52.1 | — | provider | Position 45+. |

### Standing sweep, run 18 — negative

No `/services/*`, `/pricing`, `/book` or `/contact` URL is the landing page for a `what is` / `how to` / `why` / `how do I` query **outside the sprint cluster**, which run 15 already addressed and which is inside its verdict window. The sweep cost one pull and found nothing new, which is the result worth logging. Keep running it.

### The asymmetry worth watching

`how to run a 90 day growth sprint` still lands **entirely** on the £8k–£12k service page, four days after `/insights/how-to-run-a-90-day-growth-sprint` shipped — while **Google AI Mode already cites the new insight** (panel reading #3, same day). Indexed and cited by the answer engine within four days; not one classic impression reallocated. **The two channels move at different speeds, and that argues for different review horizons.** Do not read the classic non-movement as a run-15 failure before 2026-09-17.
