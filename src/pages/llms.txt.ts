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

## Core Offer

- Growth strategy sprints for teams that need a clear 90-day order of attack.
- Customer research that turns buyer language into positioning, offers, landing pages, and campaigns.
- Acquisition systems across paid, search, outbound, content, conversion points, and reporting.
- Fractional CMO support for founders who need senior growth leadership before hiring a full-time leader.

## Proof Signals

${headlineMetrics.map((item) => `- ${item.value}: ${item.label}`).join("\n")}
- Selected ecosystem proof includes Google Launchpad, Cambridge Judge, GrowthMentor, Newsflare, Peachy, Ned, eQuoo, and LessonsUp.

## Important Pages

- Home: ${siteConfig.siteUrl}/
- Services: ${siteConfig.siteUrl}/services
- Industries: ${siteConfig.siteUrl}/industries
- Case studies: ${siteConfig.siteUrl}/case-studies
- About: ${siteConfig.siteUrl}/about
- Contact: ${siteConfig.siteUrl}/contact
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
