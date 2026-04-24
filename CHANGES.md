# Unified site branch — ship/unified-2026-04-24

Reconciles **PR #1** (site overhaul — 3-phase services, About rewrite, pricing band, FAQ, schema/GEO), **PR #3** (copy audit rewrite — hero, trust strip, objections FAQ, sticky CTA, pricing, lead magnet, footer newsletter, rich schema, GEO-ready llms.txt/robots.txt), and **PR #2** (Docker stack cleanup).

Supersedes all three.

## Decisions locked in

| Dimension | Decision | Source |
|---|---|---|
| Service structure | 3 phases (Research / Acquisition / Operating Cadence) + Fractional CMO delivery model | PR #1 |
| Primary CTA | "Book a growth call" → external Calendly | PR #1 |
| ICP (positioning) | Post-PMF B2B SaaS + AI, **$1M–$10M ARR** | PR #1 |
| Pricing signal | **£5,000–£15,000/month** band; FCMO £10–15k/mo 3-month min | PR #1 |
| Nav label for /case-studies | "Results" | PR #3 / audit |
| Email | hello@wescalestartups.com | PR #1 |
| Language tag | en-GB | PR #3 |
| Homepage hero | "Senior growth operator for post-PMF B2B SaaS & AI founders." + 3-phase framing | PR #1 |
| Trust strip under hero | Yes (Google for Startups / £6M+ / £20M+ / SaaS+AI+Fintech) | PR #3 |
| Homepage FAQ | ObjectionsFAQ component (FAQPage schema) with **9 merged questions** covering PR #1 + PR #3 concerns | Both |
| Pricing card | No — single pricing band in hero + engine rows | PR #1 |
| Sticky CTA | Yes, fires after 600px scroll | PR #3 |
| Founder video | Placeholder with script in docs/founder-video-script.md | PR #3 |
| Lead magnet | Email capture form for Growth Bottleneck Scorecard | PR #3 |
| Footer | Newsletter band + LinkedIn (Daniel + WSS) + X | PR #3 |
| Schema | PR #1's Service PriceSpec + PR #3's Person/ProfessionalService/FAQPage/BreadcrumbList/CaseStudy | Merged |
| Deploy | Cloudflare Pages (Docker removed) | PR #2 |

## Files in this changeset

### Added

- `src/components/TrustStrip.astro`
- `src/components/StickyCTA.astro`
- `src/components/ObjectionsFAQ.astro`
- `src/components/FounderVideo.astro`
- `src/components/LeadMagnetForm.astro`
- `src/content/services/research.json`
- `src/content/services/acquisition.json`
- `src/content/services/operating-cadence.json`
- `src/styles/additions.css`
- `AGENTS.md`
- `.github/pull_request_template.md`

### Modified

- `src/site.ts` — unified config: trustStripItems, painSignals, objections (9 Qs merged from PR #1 and PR #3), leadMagnets, whoThisIsFor, priceBand, videoUrl, etc.
- `src/pages/index.astro` — 3-phase engine + trust strip + pain + statement + operator + FAQ + lead magnet + sticky CTA (via BaseLayout)
- `src/pages/about/index.astro` — PR #1's rewrite (receipts, operator-not-agency framing)
- `src/pages/contact/index.astro` — PR #1's version with Calendly inline embed
- `src/components/SiteHeader.astro` — nav label "Results", external booking URL with target=_blank
- `src/components/SiteFooter.astro` — newsletter band, LinkedIn, X, stronger CTA
- `src/layouts/BaseLayout.astro` — mounts StickyCTA, preconnect Calendly, en-GB locale
- `src/lib/schema.ts` — merged (PR #1's Service with PriceSpec + PR #3's Person/ProfessionalService/FAQPage/BreadcrumbList/CaseStudy)
- `src/pages/llms.txt.ts` — entity-rich, Q&A-structured, 3-phase model, explicit pricing, canonical entities
- `src/pages/robots.txt.ts` — explicit allow-list for 17 AI crawlers
- `src/pages/sitemap.xml.ts` — lastmod + priority + changefreq
- `src/content/services/fractional-cmo.json` — updated to "delivery model" framing with £10k–£15k/mo pricing
- `public/_redirects` — adds 301s from legacy slugs to new phase slugs + /book → external Calendly

### Removed (via `git rm`)

- `src/content/services/90-day-growth-sprint.json`
- `src/content/services/acquisition-system-build.json`
- `src/content/services/growth-diagnosis.json`
- `Dockerfile`
- `compose.production.yml`
- `nginx.conf`
- `.dockerignore`
- `src/components/PricingGuide.astro` (PR #3's tiered pricing card, superseded by PR #1's pricing band)

## Guardrails added to stop this fragmentation happening again

1. **`AGENTS.md`** at repo root — any AI agent working on this repo is told to `gh pr list --state open` first, to only run one active feature branch at a time, and to follow the canonical positioning.
2. **`.github/pull_request_template.md`** — every PR now asks whether it conflicts with open PRs and whether the author read AGENTS.md.

## Audit coverage still intact

All 20 items from the 2026-04-24 audit remain covered. See PR #3's original CHANGES.md for the mapping.

## Follow-ups not in this PR

- Case-study depth pass (template in `docs/case-study-template.md` if you pulled from the PR #3 delivery)
- Founder video recording (script in `docs/founder-video-script.md`)
- Replace formspree endpoints in footer + lead magnet with real ESP
- Interactive scorecard tool (currently just an anchor + form)
