# Original research — source material

Created 2026-08-27 (run 16, directed session). **This is the answer to backlog item 4**, which sat open across six runs as "requires real data from Daniel."

It turns out the data was already public.

## Why this file exists

The AI panel found WSS cited 0/10 on Perplexity and 2/10 on Google AI Mode. What the engines cite instead is disproportionately **listicles and pricing surveys — pages that exist because someone published a number.** Original data is one of the few documented drivers of AI citation, and it is the one asset a competitor cannot copy.

WSS has one: **226 public reviews across 406 mentoring sessions on GrowthMentor, 2019–2026, at a 4.94 average.** Nobody had ever analysed it.

## The corpus

**All 226 of 226 reviews were read** on 2026-08-27 — not a sample. The profile page renders only 5 featured video testimonials; the full set is served by `growthmentor.com/mentors/daniel-johnson/reviews`, which returns a JSON payload of `{results: [226], total: 226}` with comment text, rating and date. 42,384 characters, mean 188 per review.

**Ratings:** 5.0 ×208 · 4.875 ×3 · 4.75 ×4 · 4.5 ×5 · 4.25 ×1 · 4.0 ×2 · 3.5 ×1 · 2.0 ×1 · 1.75 ×1.
**By year:** 2019 ×6 · 2020 ×23 · 2021 ×76 · 2022 ×22 · 2023 ×49 · 2024 ×30 · 2025 ×11 · 2026 ×9.

## The five findings, strongest first

**1. Zero of 226 reviews mention a funding stage.** Not one "pre-seed", "seed", "Series A", "bootstrapped" or "pre-revenue". Stage is the default segmentation axis for every growth consultancy — including this one, whose own positioning says "Seed to Series B" — and it is **completely invisible in how founders describe their own problems.** Fully verifiable, cheap for anyone to fact-check, and genuinely counterintuitive. **This is the publishable one.**

**2. Founders book about a channel and leave having changed the diagnosis.** Paid acquisition is the single largest stated topic (24 of 226). But of the 16 reviews that explicitly describe a re-diagnosis during the call, a clear majority describe being moved *off* the channel question and onto messaging, offer, ICP or funnel basics. Founder wording: "the real bottleneck isn't more channels"; "the real, hidden issue"; "brought me back to reality". **A growth consultancy sells channel work; the demand in this corpus is for channel de-escalation.** Directly corroborates the site's own diagnosis-first positioning — with evidence rather than assertion.

**3. Nearly half state no problem at all.** Only **126 of 226 (55.8%)** name the problem the founder arrived with. 100 are praise with no problem named, and one reviewer says outright that his own problem statement was "pretty broad". **Founder inability to state the problem is itself the recurring problem** — which is the entire argument for a paid Growth Diagnosis.

**4. The outcome is subtraction, but nobody describes it that way.** 36 reviews mention leaving with a framework or resource and 11 name a concrete next step — but only **2 of 226** mention stopping or avoiding anything, despite the re-diagnosis pattern in finding 2. Founders describe being *given* things, not *relieved* of them, even when the substance was the latter.

**5. Almost no review describes a business outcome.** Only 6 of 226 contain any revenue, %, ROI or conversion language, and only 2 describe a result that had already happened. **This doubles as the honesty caveat**: reviewers describe the session, not the effect.

## Problem categories — hand-coded, 126 of 226 with an identifiable topic

Paid acquisition 24 · positioning/messaging/offer 14 · strategy and fundamentals 13 · prioritisation 10 · funnel and conversion 10 · SEO and content 9 · ICP/persona 7 · career (**not founders**) 7 · consultant/agency business model 6 · idea validation 6 · measurement and attribution 6 · lead gen 5 · sales 5 · experimentation 5 · founder mindset 4 · hiring 3 · outbound 3 · fundraising 3 · lifecycle 2 · retention 2 · founder ops 2 · pricing 1 · product launch 1.

Reviews can carry more than one tag. The category table is **judgement-based hand-coding of free text**; the outcome and phrase counts below are regex-reproducible.

## Outcome language — regex counts across all 226

Recommends him 38 · received a resource/framework/template 36 · returned or will rebook 21 · praised honesty or directness 20 · reframing language 12 · practical/tactical 13 · named a next step 11 · used "actionable" 11 · used "clarity" 10 · help continued after the call 10 · value in a very short call 9 · will implement something 9 · cited fundamentals 6 · **said they would stop doing something 2** · **any quantified outcome 6, of which only 2 already realised.**

## Recurring founder phrases

"straight to the point" / "no fluff" / "doesn't pull punches" — **20 reviews**, the most repeated compliment after "recommend" · "back to the basics" / "fundamentals" — 6 · "actionable" — 11 verbatim · "eye-opening" / "a whole new light" — 12 · "the real, hidden issue" / "hiding right under my nose" — the re-diagnosis idea, 16 · "not about hacks and tactics" / "shiny object syndrome" — at least 5 · "asked the right questions" — 4 · "15 minutes" as a unit of surprise — 9.

**These are the words buyers use.** Worth more than any keyword tool for both content and query targeting.

## Candidate published statistics — as they could be written

1. "Across 226 public reviews of my mentoring sessions, only 126 named the problem the founder arrived with at all — 44% described the session without ever stating what they came in to solve."
2. "Paid acquisition was the single most common stated problem across 226 public founder reviews. But of those describing a changed diagnosis during the call, most describe being moved off the channel question and onto messaging, offer or ICP."
3. "Of 226 public reviews, zero mention a funding stage. Founders do not describe their problems in the vocabulary the industry sells to them."
4. "Across 226 public reviews, 36 founders mentioned leaving with a framework and 11 named a concrete next step — but only 2 mentioned stopping anything."
5. "Only 6 of 226 public reviews contain any quantified business language, and only 2 describe a result that had already happened."

## Caveats — publish these alongside, they are not optional

- **Self-selected and heavily positive.** 208 of 226 are 5.0. People who had a bad session mostly do not write one. Any claim is a claim about *what satisfied reviewers say*.
- **226 reviews cover 406 sessions — a ~56% review rate.** The 180 unreviewed sessions are systematically absent.
- **Reviewers describe the session, not the outcome**, written within hours and before anything was implemented. **This corpus cannot support any causal claim about revenue, growth or survival.** Do not let it be framed as one.
- **Not everyone is a founder** — at least 7 are career conversations and ~10 are agency operators. Say "sessions", or sub-set explicitly.
- **Category coding is judgement.** Another coder lands within a few counts, not identically. The regex counts are reproducible; the category table is not.
- **Time span 2019–2026, skewed to 2021** (76 reviews). Channel-mix findings partly reflect what was fashionable each year.
- **Never quote a review verbatim without checking identifiability** — several name products, verticals or third parties.

## What would firm this up — needs Daniel's own records

Actual stage and vertical mix across all 406 sessions · realised outcomes · true repeat-booking rate (21 reviews state intent; the real figure is in the booking history) · whether the "arrived with X, left with Y" pattern holds in the 180 sessions that produced no review.

## What to do with it

Finding 1 is the strongest and the cheapest to publish. It is one honest sentence with a stated sample, it contradicts the industry's default framing, and it is verifiable by anyone in ten minutes. **That is the shape of a citable object.**

**Do not fabricate, round generously, or extrapolate to "founders" in general.** The value of this corpus is entirely that it is real and checkable — the moment a number is softened, it becomes the same undifferentiated content the panel showed the engines already ignoring.
