# Website Feedback — April 2026

Source brief for the `feat/site-overhaul-apr26` PR. Captures the positioning,
CTA, service structure, pricing, testimonials, and SEO/GEO decisions the PR
implements. Mirrors the pattern established for `danieljohnsonxyz-site` PRs #5/#6.

## Target buyer (locked)

- **Who.** Post-PMF B2B SaaS and AI founders, $1M–$10M ARR
- **Where.** US-concentrated, also UK and Europe
- **Stage.** Founder-led or gap before first full-time VP Marketing / CMO
- **Problem.** Product works, acquisition is inconsistent, spend is hard to defend

## Positioning (locked)

> Senior growth operator — not an agency — who installs research, acquisition,
> and an operating cadence your team can keep running.

Explicitly operator-first. Explicitly anti-agency. Explicitly "system you can
run", not "deck you can keep".

## CTA (locked)

- **Primary site-wide:** "Book a growth call"
- **URL:** https://calendly.com/wescalestartups
- **No secondary conflicting CTAs.** "See the proof" is allowed as a nav-style
  secondary. "Start a sprint" removed.

## Services structure (locked)

**Three phases, sequenced, compounding:**

1. **Research** — Phase 1. ICP, customer language, buying triggers, message architecture.
2. **Acquisition** — Phase 2. Channels, campaigns, conversion points that turn
   the Research message into pipeline.
3. **Operating Cadence** — Phase 3. Weekly rhythm, experiment governance,
   documented playbooks for transfer.

**One delivery model:**

- **Fractional CMO** — the senior-operator engagement that runs all three
  phases as a single integrated system.

The old `growth-strategy.json` is retired (its content is now distributed
across Research and Operating Cadence). The old `customer-research.json`
becomes `research.json`. The old `acquisition-systems.json` becomes
`acquisition.json`. New file: `operating-cadence.json`.

## Pricing signal (locked)

- **Published band:** £5,000–£15,000 / month
- **Fractional CMO specifically:** £10,000–£15,000 / month, 3-month minimum
- **Fixed-scope sprints:** priced per engagement
- **Surface:** services page hero, services schema (`PriceSpecification`),
  llms.txt. Homepage shows the band in the hero-facts strip.

## Testimonials / social proof (locked)

**Published:** GrowthMentor aggregate — 388+ sessions, 4.93★ average.
**Not published in this PR:** named client quotes (deferred).

Existing `trustLogos` retained: Google, Cambridge, GrowthMentor, Newsflare, Peachy.

## "Who this is for / not for" (new)

New section on homepage. Both columns. Four bullets each. Lives above the
engine / services grid so buyers self-qualify before the deep content.

## SEO / GEO / LLM visibility

- **JSON-LD added:** Person (founder), FAQPage (homepage), Service with
  `PriceSpecification` (service detail pages). Organization already exists.
- **llms.txt added** at `/llms.txt` with the canonical summary, pricing,
  case studies, and booking URL — structured for AI search engines.
- **robots.txt updated** to explicitly allow GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended.
- **Sitemap** already correct; no change needed.
- **Meta titles + descriptions** rewritten on every page around the buyer
  profile (post-PMF B2B SaaS & AI, $1M–$10M ARR) and core services.

## Contact page

- Primary CTA moves to "Book a growth call" card with Calendly inline embed.
- Email and phone kept as secondary.
- Qualifying questions handled by Calendly's native intake form (no custom
  form fallback in this PR — revisit if Calendly intake proves insufficient).

## About page

- Rewritten around Daniel as the operator.
- Concrete receipts: £20M+ influenced, £6M+ managed, 388+ GrowthMentor /
  4.93★, 10+ years, UK-based currently operating from Asia.
- Clear "what I actually do" list (Fractional CMO, diagnosis, research →
  message → acquisition, mentor/speaker).

## Not in this PR (deferred)

- Named client testimonial quotes — needs legal sign-off from each client.
- Growth diagnosis quiz (djxyz pattern) — good follow-up once this ships.
- Blog / insights surface — separate workstream.
- New case study for a recent client — awaiting permission.
- Custom qualifying form on /contact — relying on Calendly intake for now.

## Open questions for review

1. Is £5k–£15k the right publishable band or should it be `$7k–$20k USD`
   given US-focused buyer? (Current PR uses GBP; schema uses GBP.)
2. The 4.93★ / 388+ session figures are current as of Apr 2026 — any
   expiry / refresh policy?
3. Confirm "currently operating from Asia" is still accurate copy to
   publish. If travel plans change, this is the one string that goes
   stale quickly.
