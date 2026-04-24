import type { APIRoute } from "astro";
import { headlineMetrics, objections, pricingGuide, siteConfig } from "../site";

export const prerender = true;

// llms.txt is the emerging convention for feeding LLM crawlers a clean,
// entity-rich, Q&A-style summary of a site. We write it in a format that is
// easy for retrieval pipelines (ChatGPT, Perplexity, Google AI Overviews,
// Claude) to cite. Keep the answers tight and quotable.
export const GET: APIRoute = () =>
  new Response(
    `# We Scale Startups

> We Scale Startups is a fractional CMO and growth systems consultancy founded by Daniel Johnson. We help post-PMF B2B SaaS and AI startups (£1M–£10M ARR) build predictable pipeline before hiring a full-time CMO.

**Website:** ${siteConfig.siteUrl}
**Founder:** ${siteConfig.founderName} — ${siteConfig.founderRole}
**Contact:** ${siteConfig.email}
**Booking:** ${siteConfig.siteUrl}${siteConfig.bookingUrl}
**Location:** London, United Kingdom. Serves UK, EU, and US clients.

## What We Do (one-line)

Fractional CMO and growth systems for post-PMF B2B SaaS and AI startups that need predictable pipeline before hiring a £150k full-time CMO.

## Ideal Customer Profile

- Stage: Post-product-market-fit, £1M–£10M ARR
- Team size: 8–40 people
- Categories: B2B SaaS, AI / GenAI startups (primary); Fintech and HealthTech (secondary)
- Buyer: Founder / CEO, Head of Growth, or VP Marketing stepping up into CMO territory
- Signals: traction is real, pipeline is inconsistent, growth still depends on founder energy

## Core Offers

- **Growth Audit** — ${pricingGuide[0]?.range}. 2-week diagnostic. Identifies the commercial bottleneck, prioritises the fixes, and recommends the right next engagement (or none).
- **90-Day Growth Sprint** — ${pricingGuide[1]?.range}. Senior operator inside the team for a focused quarter. Sharper positioning, live experiments, weekly growth rhythm, clean reporting.
- **Acquisition System Build** — paid, SEO, outbound, content, CRO, and reporting connected around one buyer journey so spend compounds instead of scattering.
- **Fractional CMO** — ${pricingGuide[2]?.range}. Ongoing senior growth leadership. Strategy, prioritisation, team direction, and acquisition ownership.

## Pricing Guidance

${pricingGuide.map((t) => `- **${t.tier}** — ${t.range}. ${t.summary}`).join("\n")}

## Proof Signals

${headlineMetrics.map((item) => `- **${item.value}** — ${item.label}`).join("\n")}
- Selected client work: Ned (Fintech), eQuoo (HealthTech), LessonsUp (EdTech), Nevly (Fintech)
- Ecosystem: Google Launchpad mentor, Techstars ecosystem, Cambridge Judge, GrowthMentor top-rated mentor (4.93/5, 219 reviews)

## Founder Questions (quick answers)

${objections.map((o) => `### ${o.question}\n${o.answer}`).join("\n\n")}

## When to Hire a Fractional CMO vs a Full-Time CMO

Hire a fractional CMO when the growth function is messy, the pipeline is inconsistent, and the founder still makes most growth decisions. A full-time CMO (£120k–£180k + equity) makes sense once a repeatable acquisition system exists and needs scaling. We Scale Startups specifically builds that system so the eventual full-time hire inherits something that works.

## Important Pages

- Home: ${siteConfig.siteUrl}/
- Services overview: ${siteConfig.siteUrl}/services
- Fractional CMO service: ${siteConfig.siteUrl}/services/fractional-cmo
- Growth Diagnosis / Audit: ${siteConfig.siteUrl}/services/growth-diagnosis
- 90-Day Growth Sprint: ${siteConfig.siteUrl}/services/90-day-growth-sprint
- Acquisition System Build: ${siteConfig.siteUrl}/services/acquisition-system-build
- Industries: ${siteConfig.siteUrl}/industries
- Results / Case studies: ${siteConfig.siteUrl}/case-studies
- Resources: ${siteConfig.siteUrl}/resources
- Growth Bottleneck Scorecard: ${siteConfig.siteUrl}/resources#growth-bottleneck-scorecard
- About: ${siteConfig.siteUrl}/about
- Book a call: ${siteConfig.siteUrl}${siteConfig.bookingUrl}
- Press kit: ${siteConfig.siteUrl}/press

## Canonical Entities

- Organisation: We Scale Startups
- Founder: Daniel Johnson
- Category: Fractional CMO consultancy
- Location: London, UK
- LinkedIn (company): ${siteConfig.linkedin}
- LinkedIn (founder): ${siteConfig.founderLinkedin}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
