import type { APIRoute } from "astro";
import { headlineMetrics, siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `# We Scale Startups

> We Scale Startups is a growth consultancy founded by Daniel Johnson. The studio helps post-PMF SaaS, fintech, healthtech, and EdTech teams turn customer evidence, positioning, acquisition, and reporting into a repeatable growth system.

**Website:** ${siteConfig.siteUrl}
**Contact:** ${siteConfig.email}
**Booking:** ${siteConfig.siteUrl}${siteConfig.bookingUrl}
**Location:** London-based, serving global clients with US-friendly overlap.

## Core Offers

- Growth Diagnosis: audit positioning, funnel, acquisition, reporting, and team cadence to find the real bottleneck.
- 90-Day Growth Sprint: sharpen positioning, launch focused experiments, improve reporting, and create a weekly growth rhythm.
- Acquisition System Build: connect paid, SEO, outbound, content, CRO, and reporting around the buyer journey.
- Fractional CMO: senior growth leadership for teams that need clearer GTM and acquisition decisions.

## Proof Signals

${headlineMetrics.map((item) => `- ${item.value}: ${item.label}`).join("\n")}
- Selected client work and proof includes Ned, eQuoo, LessonsUp, Nevly, Google Launchpad, Cambridge Judge, and GrowthMentor.

## Important Pages

- Home: ${siteConfig.siteUrl}/
- Services: ${siteConfig.siteUrl}/services
- Fractional CMO: ${siteConfig.siteUrl}/services/fractional-cmo
- Growth Diagnosis: ${siteConfig.siteUrl}/services/growth-diagnosis
- Acquisition Systems: ${siteConfig.siteUrl}/services/acquisition-system-build
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
