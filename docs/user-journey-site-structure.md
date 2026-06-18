# User journey → site structure & CTAs

Date: 2026-06-18 · Backlog item: "Turn journey map into website structure and CTAs / decide which assets are essential now vs later / identify missing assets at each stage."

Maps the WSS buyer journey to existing pages, the right CTA at each stage, and the gaps. Stages follow awareness, not funnel position, because in an emerging category most buyers enter problem-aware, not solution-aware.

Legend: ✅ live · ◑ partial · ⬜ gap

---

## Stage 0 — Unaware / passive
**Buyer state:** Not looking. Growth feels busy but inconsistent; hasn't named the problem.
**Job of the site:** Be discoverable and reframe the problem when they do land (often via content or AI search).

| Asset | Status | CTA |
|---|---|---|
| Insight pillars (learning latency, random acts of growth, etc.) | ✅ | Read → take the score |
| AI discoverability / GEO presence | ◑ | — |
| Contrarian data posts (DoWhatWorks pattern) | ⬜ | — |

**Primary CTA:** soft — "Find your Learning Latency Score."
**Gaps:** more GEO-optimised, citable content; the contrarian/data angle.

---

## Stage 1 — Problem-aware
**Buyer state:** "Our growth isn't compounding and I don't know why." Looking for a frame, not a vendor.
**Job:** Name the enemy (Random Acts of Growth), name the cause (learning latency), offer a free way to self-diagnose.

| Asset | Status | CTA |
|---|---|---|
| `/ai-driven-growth` (manifesto/framework) | ✅ | Take the Learning Latency Score |
| `/insights/*` pillars | ✅ | Take the score / read framework |
| `/learning-latency-scorecard` (diagnostic) | ✅ | See my score |
| `/resources/growth-bottleneck-scorecard` | ✅ | Take the scorecard |
| `/diagnose` (5-layer diagnostic) | ✅ | Diagnose |

**Primary CTA:** "Find your biggest growth bottleneck" → a scorecard.
**This is the strongest stage of the site post-PRs #29–32.** Keep the diagnostic as the consistent secondary CTA sitewide.

---

## Stage 2 — Solution-aware
**Buyer state:** Has a score / named bottleneck. "What do I actually do about it?"
**Job:** Connect the diagnosis to a method and to WSS's offers.

| Asset | Status | CTA |
|---|---|---|
| Scorecard result → next moves + book | ✅ | Book a Growth Signal Audit |
| `/insights/growth-signal-loop` (the mechanism) | ✅ | Read → book |
| `/how-it-works` | ✅ | See how it works → book |
| `/services` overview | ✅ | Explore services |
| Drip email sequence (`docs/ai-driven-growth-drip.md`) | ◑ | Take the score / book |

**Primary CTA:** "Book a Growth Signal Audit."
**Gaps:** the drip needs loading into the ESP (Mautic — see `mautic-welcome-sequences.md`); a "first 90 days" timeline (ColdIQ pattern) to make the engagement concrete.

---

## Stage 3 — Evaluating
**Buyer state:** "Is WSS the right partner vs an agency / a full-time hire / doing nothing?"
**Job:** Differentiate, prove, de-risk.

| Asset | Status | CTA |
|---|---|---|
| `/services/[slug]` detail pages | ✅ | Book |
| `/pricing` | ✅ | Book |
| `/fractional-cmo-vs-agency`, `/fractional-cmo-vs-full-time-cmo` | ✅ | Book |
| `/case-studies`, `/proof`, `/testimonials` | ✅ | Book |
| Positioning FAQ ("how are we different?") on-page | ◑ | — |
| Quantified named testimonials everywhere | ◑ | — |
| "First 90 days" timeline w/ deliverables | ⬜ | — |
| Explicit risk-reversal ("you keep the artifacts") | ◑ | — |

**Primary CTA:** "Book a 20-minute Growth Audit."
**Gaps (highest impact):** the 90-day timeline, a positioning FAQ on `/services`, and tightening proof to ColdIQ-grade (number + name + company on every quote). See competitor teardown doc.

---

## Stage 4 — Decision
**Buyer state:** Ready to talk. Needs friction-free booking and reassurance.
**Job:** Make booking effortless and the call feel safe.

| Asset | Status | CTA |
|---|---|---|
| `/book` (Cal embed) | ✅ | Book |
| Booking reassurance copy (no-pitch, what happens) | ✅ | — |
| "Senior person, not a sales rep" framing | ◑ | — |

**Primary CTA:** Book. **Status: solid.** Minor: borrow Straw Hat's "senior strategist on the call, not a sales rep" line.

---

## Stage 5 — Customer → Advocate
**Buyer state:** Working with WSS / finished an engagement.
**Job:** Deliver, capture proof, and turn happy clients into referrals + case studies.

| Asset | Status | CTA |
|---|---|---|
| Case-study capture process | ◑ | — |
| **Refer-a-friend mechanism** | ⬜ | — |
| Client playbooks / leave-behind assets | ⬜ | — |

**Gaps:** this is the weakest stage. Refer-a-friend (separate backlog item — needs a mechanism; the site is static) and a productized referral ask are the opportunities. Playbooks are also a listed backlog item.

---

## Priority call: essential now vs later

**Essential now (mostly done or small):**
- ✅ Problem-aware → solution-aware path (manifesto + diagnostic + pillars + drip) — **complete after PRs #29–32**, pending drip load into Mautic.
- ⬜ "First 90 days" timeline on a service page (small, high trust impact).
- ◑ Positioning FAQ on `/services`; tighten testimonials.

**Later (bigger / needs decisions):**
- ⬜ Refer-a-friend functionality (needs ESP/backend mechanism).
- ⬜ Playbooks (content lift).
- ⬜ Contrarian data-content engine for GEO (ongoing).

**One-line summary:** the front half of the journey (unaware → book) is now strong; the **back half (customer → advocate / referral)** is the biggest structural gap.
