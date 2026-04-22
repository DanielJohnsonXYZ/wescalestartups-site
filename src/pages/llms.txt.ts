import type { APIRoute } from "astro";
import { headlineMetrics, siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `# We Scale Startups

> We Scale Startups is an AI-native growth studio founded by Daniel Johnson. The studio helps post-PMF AI, SaaS, fintech, healthtech, and product-led teams turn customer evidence, positioning, acquisition, and operating cadence into a repeatable growth system.

**Website:** ${siteConfig.siteUrl}
**Contact:** ${siteConfig.email}
**Booking:** ${siteConfig.bookingUrl}
**Location:** London-based, serving global clients with US-friendly overlap.

## Core Offers

- Growth Diagnosis: audit positioning, funnel, acquisition, reporting, and team cadence to find the real bottleneck.
- 90-Day Growth Sprint: sharpen positioning, launch focused experiments, improve reporting, and create a weekly growth rhythm.
- Acquisition System Build: connect paid, SEO, outbound, content, CRO, and reporting around the buyer journey.
- Fractional CMO: senior growth leadership before a full-time CMO hire.

## Proof Signals

${headlineMetrics.map((item) => `- ${item.value}: ${item.label}`).join("\n")}
- Selected ecosystem proof includes Google Launchpad, Cambridge Judge, GrowthMentor, Newsflare, Peachy, Ned, eQuoo, and LessonsUp.

## Important Pages

- Home: ${siteConfig.siteUrl}/
- Services: ${siteConfig.siteUrl}/services
- Diagnose: ${siteConfig.siteUrl}/diagnose
- Build: ${siteConfig.siteUrl}/build
- Test: ${siteConfig.siteUrl}/test
- Transfer: ${siteConfig.siteUrl}/transfer
- Industries: ${siteConfig.siteUrl}/industries
- Case studies: ${siteConfig.siteUrl}/case-studies
- Resources: ${siteConfig.siteUrl}/resources
- Press kit: ${siteConfig.siteUrl}/press
- About: ${siteConfig.siteUrl}/about
- Contact: ${siteConfig.siteUrl}/contact
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
