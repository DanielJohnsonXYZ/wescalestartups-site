# Run 14 — the site was describing its own tools wrongly

**27 August 2026.** Daniel, on the two items I left open at the end of run 13:
*"do whatever you recommend."* This covers the framework-naming one. The Wikidata
decision is at the bottom.

---

## What I expected to find, and what was actually there

I flagged this in run 13 as *"the five-layer framework is named five different ways,
including a six-layer version in Daniel's new GTM guide."* Two of those claims were
wrong, and I only found that out by opening the files.

**The GTM guide has no competing framework at all.** Its structure is its own — the
Growth Signal Loop, the one-page GTM table — and it *links to* `/diagnose` as "the
five-layer diagnostic". It was already consistent. I had recorded a conflict that
did not exist, which is the third time this file has caught me asserting something
about the site that I had not checked against the site.

What is actually there is worse and more useful: **the site was factually wrong
about what its own free tool does.**

---

## Two instruments, one name, three wrong descriptions

There are two distinct things here.

| | The five-layer framework | The Growth Bottleneck Scorecard |
|---|---|---|
| Where | `/diagnose` | `/resources/growth-dependency` |
| Shape | 5 layers | 12 questions, ~4 min |
| What it scores | positioning, acquisition, conversion, reporting, team ownership | founder-held sales knowledge, positioning clarity, pipeline consistency, customer proof, commercial learning rhythm, hiring readiness |
| Question it answers | which layer of the growth system is the constraint | what still depends on the founder personally |

Ground truth is `src/data/growthTools.ts`. It took one grep.

### `/start-here` — wrong on every count

> "Take the Growth Bottleneck Scorecard. **10 questions** across **the five layers**
> that block pipeline: **customer, offer, acquisition, evidence, and team
> ownership**." — **5 minutes**

Twelve questions, not ten. It does not score the five layers. And those five names
match *neither* list — not the framework, not the scorecard's six dimensions. They
look like a version of the tool that no longer exists.

This is the page we send first-time visitors to. It was the worst possible place on
the site to be wrong about our own free tool.

### `/diagnose` — a loose FAQ that implied the same thing

"How is this different from the quiz?" answered "the quiz auto-scores a primary
constraint", which reads as *the quiz scores the five layers*. It is in FAQPage
schema, so the wrong version was the machine-readable one too.

### `startup-growth-bottlenecks` — my own error, made yesterday

I wrote three passages presenting the Scorecard as a four-minute way to score the
five layers. I took that from `/start-here` instead of from the tool.

> **This is the failure mode the playbook already records twice.** Trusting a claim
> published on the site rather than the primary source. The rule exists; I did not
> follow it. `src/data/growthTools.ts` was one grep away.

### `/services/growth-diagnosis` — five versus six

Everywhere else the framework is five layers. This page alone said "which of **six**
layers", inserting **retention**, in three places including the tldr passage and a
FAQPage answer.

**Resolved in favour of keeping retention.** The paid diagnosis plausibly does score
it, and quietly deleting something from a paid engagement's described scope is not a
change a bot should make on its own judgement. The page now names the five-layer
framework explicitly and states retention as an addition on top. Nothing removed;
the site stops contradicting itself.

---

## The evidence that says none of this was an SEO job

Before changing wording I pulled 90 days of GSC at `dimensions: "page,query"`,
`row_limit: 25000`, and searched every query containing *layer*, *bottleneck*,
*scorecard*, *diagnos*, *constraint* or *framework*.

- **14 queries. 56 impressions. Zero clicks.** 0.6% of named-query impressions, 0%
  of the 43 clicks in the window.
- **No query containing "layer" as a growth term exists at all.** Not "five layer",
  not "growth layers", not "layer model".
- `/diagnose` — **2 impressions**, both anonymised.
- `/resources/growth-dependency` — **zero impressions.** The scorecard every page
  links to does not appear in GSC.
- `/start-here` — 220 impressions, and all four named queries are brand.

> **Rule for future runs: nobody searches this vocabulary. Do not optimise the
> framework pages for search.** Fix them because a founder deciding on a £2–4k
> engagement reads them, and because answer engines quote them. Not because they
> rank. They do not and will not.

---

## A false lead I chased and dropped

GSC shows `/resources/growth-bottleneck-scorecard` at **position 9.7** for "growth
bottleneck" and `/resources/founder-led-growth-diagnostic` at 26 impressions — both
consolidated URLs, both apparently outranking the live page they redirect to.

Checked live: all four legacy URLs 301 cleanly to `/resources/growth-dependency`,
which returns 200 and is in the sitemap. The rows are historical, exactly as the
playbook predicts for the `/portfolio/*` family. No bug. Dropped it.

Two related things found and deliberately **not** acted on:

- `magnetDetails["growth-bottleneck-scorecard"]` in `src/pages/resources/[slug].astro`
  describes a *third* instrument (10 questions, 5 sections: ICP clarity, channel
  signal, landing-page conversion, founder-led sales dependency, reporting cadence).
  Confirmed against `dist` — **that page is not built.** Dead code, renders nowhere,
  harms nobody. Left alone.
- `dist/downloads/guides/growth-bottleneck-scorecard.md` is a printable companion
  built on the **five layers**, and nothing on the site links to it. Internally
  consistent, unreachable. Left alone.

So "Growth Bottleneck Scorecard" currently names two different instruments — the
interactive founder-dependency tool and the printable five-layer sheet. **That is a
product-naming decision for Daniel, not a bot fix.**

---

## Verification

Live after deploy:

```
/start-here                  "12 questions on what still depends on you personally" ✓
/start-here                  "About half an hour" ✓  (4 + 10 + 20 is not 35)
/services/growth-diagnosis   "six layers" -> 0 matches ✓
/services/growth-diagnosis   "five-layer framework (…), plus retention" ✓
/diagnose                    "twelve questions on what still depends on you…" ✓
/insights/startup-growth-…   "fastest way into the team-ownership layer" ✓
build exit 0 · astro check 0 errors 0 warnings · sitemap 106 · check:lastmod current
```

**Trap 5 fired again, as designed.** `check:lastmod` was green locally and went red
against the pushed tree. Six routes updated in the second half of the two-step.

**New wrinkle worth knowing:** four of those six were `/services/*` but only
`growth-diagnosis` changed. All four services share `[slug].astro` and the script
traces the *page file*, so it cannot tell which slug's copy moved. Three lastmod
dates are now fresher than the content warrants. That invites a recrawl rather than
suppressing one, so it is the harmless direction — but **do not read a `/services/*`
lastmod as evidence that page changed.**

**On pushing the 49 KB service page:** did it through a subagent that read the file
from the sandbox and pushed it directly, verifying the returned blob SHA against
`git hash-object`. Keeps a large file out of main context entirely and the SHA check
makes corruption detectable rather than silent. Worth reusing — it is the practical
answer to Trap 4 for large files.

---

## The other open item: Wikidata Q137046365

**Recommendation: leave it, and do not expand it.** Not doing something is a real
recommendation here, so the reasoning:

- Requesting deletion produces a *public* "Requests for deletion: non-notable,
  self-promotional" thread attached to Daniel's name. That artefact is worse than
  the quiet unsourced stub it removes.
- The stub has zero sitelinks and zero backlinks. Nothing surfaces it.
- The site already links to it via `sameAs`, which is the correct direction and
  costs nothing.
- Run 11 established the evidence that answer engines use Wikidata at inference is
  thin to nonexistent, so there is little upside to fixing it either.

Add real references if press appears. Do not add unsourced claims — that is what
converts a quiet stub into an RfD magnet.
