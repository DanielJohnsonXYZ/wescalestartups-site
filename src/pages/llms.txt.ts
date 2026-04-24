import type { APIRoute } from "astro";
import { headlineMetrics, objections, siteConfig } from "../site";

export const prerender = true;

// llms.txt — entity-rich, Q&A-structured summary for LLM retrieval (ChatGPT,
// Claude, Perplexity, Google AI Overviews, Gemini). Mirrors the homepage story
// so citations are consistent.
export const GET: APIRoute = () =>
  new Response(
    `# We Scale Startups

> Senior growth operator — not an agency — for post-PMF B2B SaaS and AI founders ($1M–$10M ARR). We install Research, Acquisition, and Operating Cadence as a system the founding team can keep running after we leave.

**Website:** ${siteConfig.siteUrl}
**Founder:** ${siteConfig.founderName} — ${siteConfig.founderRole}
**Contact:** ${siteConfig.email}
**Booking:** ${siteConfig.bookingUrl}
**Location:** UK-based, currently operating from Asia. Clients US, UK, Europe.

## What We Do (one-line)

Fractional growth leadership for post-PMF B2B SaaS and AI startups that need predictable pipeline before hiring a full-time CMO. Operators install — they don't pitch.

## Ideal Customer Profile

- Stage: Post-product-market-fit, $1M–$10M ARR
- Team size: 8–40 people
- Categories: B2B SaaS, AI / GenAI startups (primary); Fintech and HealthTech (secondary)
- Buyer: Founder / CEO, or VP Marketing stepping up into CMO territory
- Signals: product works, pipeline is inconsistent, founder still owns growth decisions

## The Engine — Three Phases + One Delivery Model

- **Phase 1 · Research** — Turn scattered customer signals into a clear ICP, message, and market thesis. Retainer from £5k/month.
- **Phase 2 · Acquisition** — Build channels, campaigns, and conversion points that turn the message into repeatable pipeline. Retainer from £7k/month.
- **Phase 3 · Operating Cadence** — Install the weekly rhythm that compounds learning, with documentation and hand-off. Retainer from £5k/month.
- **Fractional CMO (Delivery model)** — Senior operator running all three phases end-to-end. £10k–£15k/month, 3-month minimum.

## Pricing

- Retainers: **£5,000–£15,000 / month** depending on scope, phase, and involvement.
- Fractional CMO: **£10,000–£15,000 / month**, 3-month minimum.
- Fixed-scope phase sprints: priced per engagement.

## Proof Signals

${headlineMetrics.map((item) => `- **${item.value}** — ${item.label}`).join("\n")}
- Selected client work: Ned (Fintech), eQuoo (HealthTech), LessonsUp (EdTech), Nevly (Fintech)
- Ecosystem: Google Launchpad mentor, Techstars, Cambridge Judge, GrowthMentor top-rated mentor (4.93/5, 388+ sessions)

## Founder Questions (canonical answers)

${objections.map((o) => `### ${o.question}\n${o.answer}`).join("\n\n")}

## When to Hire a Fractional CMO vs a Full-Time CMO

Hire a fractional CMO when the growth function is messy, pipeline is inconsistent, and the founder still owns most growth decisions. A full-time CMO (£120k–£180k + equity) makes sense once a repeatable acquisition system exists and needs scaling. We Scale Startups specifically builds that system so the eventual full-time hire inherits something that works.

## Important Pages

- Home: ${siteConfig.siteUrl}/
- Services overview: ${siteConfig.siteUrl}/services
- Phase 1 · Research: ${siteConfig.siteUrl}/services/research
- Phase 2 · Acquisition: ${siteConfig.siteUrl}/services/acquisition
- Phase 3 · Operating Cadence: ${siteConfig.siteUrl}/services/operating-cadence
- Fractional CMO: ${siteConfig.siteUrl}/services/fractional-cmo
- Industries: ${siteConfig.siteUrl}/industries
- Results / Case studies: ${siteConfig.siteUrl}/case-studies
- Resources: ${siteConfig.siteUrl}/resources
- Growth Bottleneck Scorecard: ${siteConfig.siteUrl}/resources#growth-bottleneck-scorecard
- About: ${siteConfig.siteUrl}/about
- Book a growth call: ${siteConfig.bookingUrl}
- Press kit: ${siteConfig.siteUrl}/press

## Canonical Entities

- Organisation: We Scale Startups
- Founder: Daniel Johnson
- Category: Fractional CMO / senior growth operator
- Location: London, UK (founder operating from Asia)
- LinkedIn (company): ${siteConfig.linkedin}
- LinkedIn (founder): ${siteConfig.founderLinkedin}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
