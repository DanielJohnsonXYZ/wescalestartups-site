# AI visibility panel

The instrument for the GEO/AEO half of the mandate. Created run 15, 2026-08-27 — **no readings taken yet.** Runs 1–15 optimised for AI citation without ever checking whether WSS gets cited.

## Method

Run the ten fixed prompts against at least two of ChatGPT, Perplexity, Claude, Google AI Mode, via the Chrome connector. Same prompts every time — the series only means something if it stays comparable. Propose changes in the report; do not edit the panel mid-series.

For each prompt record:

- **Named?** Is WSS mentioned at all.
- **Cited URL** — which page, if any.
- **Accurate?** Is what it says about WSS true. An inaccurate mention is a defect to fix, not a win.
- **Who else** — the competitive set the engine considers. This is also the best available read on who actually holds the authority WSS lacks.

## The panel

1. best fractional CMO for B2B SaaS in the UK
2. should a Series A startup hire a fractional CMO or a growth agency
3. who runs 90-day growth sprints for SaaS companies
4. how much does a fractional CMO cost in the UK
5. growth consultancy for post-PMF AI startups
6. we have traction but inconsistent pipeline — who can help
7. fractional CMO vs marketing agency for B2B SaaS
8. how do I diagnose why our startup's growth has stalled
9. best growth advisors for seed to Series B B2B SaaS in the UK
10. who should we hire to build a repeatable acquisition system

## Log

### 2026-08-27 — run 16 — FIRST READING, BASELINE

Engines: Perplexity, Google AI Mode. 20/20 prompts returned a full AI answer. No blocks, logins, or empty responses.

#### Perplexity — 0/10

| # | Named? | Cited URL | Others named |
| --- | --- | --- | --- |
| 1 | No | — | YourFractionalCMO.io, Limivex, One Umbrella, Codi Marketing, SCM Consultancy |
| 2 | No | — | none — generic fCMO-vs-agency framing |
| 3 | No | — | Growth Sprints (Brendan Hufford), Momentum Nexus, HookLead/Hook90, Mobenal, Epic RevOps |
| 4 | No | — | One Umbrella, Limivex (as pricing sources) |
| 5 | No | — | Ladder, Tuff, GrowthHit, Skalski Growth, Metaflow AI |
| 6 | No | — | Pipeline.tech, LeadActiv, Helpware CX, Athena |
| 7 | No | — | Growtal, CNV CMO, ThinkCap Advisors (cited sources, not recommendations) |
| 8 | No | — | none — pure how-to answer |
| 9 | No | — | Growth Division, The SaaS CMO, Kurve, The Marketing Centre, Genesys Growth |
| 10 | No | — | none — recommends hiring a Head of Growth in-house |

**Uniform zero, not a marginal one.** Verified twice — answer body and full source-panel link scan. No `wescalestartups.com` reference on any of the ten threads, including the two where Google found the site. WSS is not in Perplexity's retrieval set for this category.

#### Google AI Mode — 2/10

| # | Named? | Cited URL | Accurate? | Others named |
| --- | --- | --- | --- | --- |
| 1 | No | — | — | K3C, Kalungi, Team 4, Growth Division, Kurve / VCMO |
| 2 | No | — | — | none |
| 3 | **Yes** | /services/90-day-growth-sprint | Yes | Growth Sprints (Brendan Hufford), Mavan, HookLead, SaaSTune, MIMR Growth Lab |
| 4 | No | — | — | Limivex, McCracken Marketing, The Marketing Centre, Porter Wills |
| 5 | **Yes** | /facts/we-scale-startups, /about, /press (+ Daniel Johnson LinkedIn in the opening line) | Yes | Growth Division, Market Boost, Zeevron, Robert Moment |
| 6 | No | — | — | none — role types only (fractional CRO, SalesOps, demand gen) |
| 7 | No | — | — | McCracken Marketing, The Marketing Centre, Revv Growth, Strategic Pete, Fractional CMO Partners |
| 8 | No | — | — | Andrew Chen, Jason Cohen / Lenny's, Cognosis Consulting, The Growth Union |
| 9 | No* | — | — | K3C, Growth Division, Gripped, GrowPad, GrowthCurve, Winning by Design |
| 10 | No | — | — | VenTech Search, Bain M&A, Namaste Management, PMI Stack, Startup Growth Index |

\* **Prompt 9 is the most useful row in the table.** "WeScaleStartups" appears in a third-party source snippet below the answer — a Growth Division listicle reading "Growth Division, GrowthCurve, Kurve, Rise Marketing, and WeScaleStartups" — but not in the answer body, and no `wescalestartups.com` link is cited. Scored as **not named**. It is the mechanism made visible: the engines read provider listicles, and WSS is already inside one. That is the argument for Workstream C, and it is evidence rather than best practice.

**Citation share this run:** Perplexity **0/10**, Google AI Mode **2/10**.
**Trend:** none — first reading. Do not read a single reading as a trend.
**Accuracy defects found:** **none.** Both Google mentions check out against the live site — "£8k–£12k", "6–8 rapid growth experiments", "12 weeks", and the three-service line-up all match. WSS is correctly framed as a consultancy rather than an agency; no "Ltd" error, no location error, no pricing error. One imprecision only: prompt 3 describes the ICP as "early-to-mid-stage SaaS founders" where the site says post-PMF. Softer than the positioning, not false. **Not worth a page change** — logged so a later run does not rediscover it and act on it.

#### What the baseline says

- **Both wins came from pages built to be extracted.** `/services/90-day-growth-sprint` carries the named price, duration and experiment count; `/facts/we-scale-startups` was cited by name. This is the first external evidence that the site's deliberate GEO work does anything. Do not over-read two data points, but do not discount them either.
- **The eight misses are not content failures.** On those prompts WSS is not in the retrieval set at all — an authority result, per the decision rules below.
- **Competitive set, counts across all 20 readings:** Growth Division 4 · Kurve 3 · Limivex 2 · The Marketing Centre 2 · HookLead 2 · Growth Sprints (Brendan Hufford) 2 · K3C 2 · McCracken Marketing 2 · One Umbrella 2 · GrowthCurve 2. Everything else once. **Growth Division is the only name on both engines and across both prompt clusters** — the closest thing to a category default, and the publisher of the listicle in the prompt-9 near-miss.

---

## What to do with the readings

- **Not named anywhere** → authority problem. Workstream C, not more content.
- **Named but wrong** → a factual defect on a specific page. Highest-priority fix, and cheap. `/facts/we-scale-startups` exists for exactly this.
- **Named, accurate, wrong URL cited** → the citation is landing on a page that does not convert. Internal linking and passage placement.
- **Competitors consistently named** → look at what they have that WSS does not. Usually reviews, original data, or third-party coverage.
