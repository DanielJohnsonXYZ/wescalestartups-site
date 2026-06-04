/** Shared copy for /press and /press-kit-download (company press kit). */

export const boilerplateShort =
  "We Scale Startups helps post-PMF B2B SaaS and AI startups diagnose growth constraints and install a repeatable acquisition operating rhythm.";

export const boilerplateMedium =
  "We Scale Startups is a founder-led growth consultancy helping post-PMF startups build repeatable growth systems before hiring a full-time CMO. Engagements span growth diagnosis, 90-day sprints, acquisition system builds, and fractional CMO leadership.";

export const boilerplateLong = `${boilerplateMedium} Work is delivered through Daniel Johnson and senior operators, with proof-oriented reporting — Problem / Action / Result — and explicit transfer so growth stops depending on founder heroics.`;

export const founderBio =
  "Daniel Johnson is a fractional CMO and GTM operator who helps post-PMF AI and B2B SaaS startups build repeatable growth systems. He is the founder of We Scale Startups and mentors founders through Google for Startups, Techstars, and GrowthMentor. He moderates Online Geniuses, a 53,000+ member marketing community.";

export const whatWeDo =
  "Growth diagnosis, sprint execution, acquisition systems, and fractional CMO leadership — with dashboards, experiment cadence, and leadership rituals designed to transfer ownership.";

/** Best-fit profile for journalists (company press kit). */
export const whoWeHelpBestFit = [
  "Seed to Series B startups",
  "Post-PMF companies with paying customers",
  "Founder-led AI and B2B SaaS teams",
  "Companies where growth still depends too heavily on the founder",
  "Teams with traction but unclear repeatable pipeline"
] as const;

export const whoWeHelpNotFit = [
  "Pre-revenue companies",
  "Teams still searching for a problem",
  "Businesses looking only for cheap ad execution",
  "Companies that want vanity metrics instead of revenue impact"
] as const;

export const pressAngles = [
  "Why founder-led growth breaks after early traction.",
  "Why post-PMF startups struggle to build repeatable pipeline.",
  "Why agencies often fail Seed to Series B startups.",
  "Why AI startups need sharper positioning, not just more content.",
  "Why fractional CMO support is becoming more common.",
  "Why senior growth judgment matters more as AI makes tactics cheaper.",
  "Why startup growth systems beat one-off campaign spikes."
] as const;

export const brandAssets = [
  { label: "WSS logo (colour, WebP)", href: "/images/logos/wss-logo.webp" },
  {
    label: "WSS logo on dark backgrounds (use white / inverted treatment from the colour master)",
    href: "/images/logos/wss-logo.webp"
  },
  { label: "Default social / Open Graph image (PNG)", href: "/og/default.png" },
  { label: "Favicon", href: "/favicon.svg" },
  { label: "Founder headshot (WebP, high resolution)", href: "/images/daniel-headshot-960.webp" },
  { label: "Founder contextual photo — informal / in-environment (WebP)", href: "/images/daniel-aircraft-960.webp" },
  { label: "Example deliverable diagram (anonymised)", href: "/images/deliverables/system-preview.svg" },
  { label: "Approved company boilerplates (this page)", href: "/press#press-boilerplate-heading" },
  { label: "Approved founder bio (this page)", href: "/press#press-founder-heading" }
] as const;

/** Short usage note shown under the brand asset list on /press */
export const brandUsageGuidance =
  "Do not stretch, skew, or add effects to the wordmark. Maintain clear space at least equal to the cap height of “We”. On dark layouts, use a monochrome white version derived from the colour logo. For colour reference, match the live site: violet accent #6657ff, ink #14121a, cream background #fffefa.";

export type PressClientWorkRow = {
  company: string;
  type: string;
  work: string;
  outcome: string;
};

/** Scannable examples for journalists — names anonymised where required. */
export const pressClientWorkRows: readonly PressClientWorkRow[] = [
  {
    company: "B2B fintech",
    type: "Acquisition",
    work: "Paid search and landing-page campaign",
    outcome: "500+ qualified sign-ups (see proof hub)"
  },
  {
    company: "AI / health",
    type: "GTM build",
    work: "Marketing function and acquisition narrative from a thin base",
    outcome: "Foundation for repeatable pipeline"
  },
  {
    company: "HealthTech / mental health",
    type: "Positioning",
    work: "Offer narrative and message-market alignment",
    outcome: "Clearer GTM story for buyers and investors"
  },
  {
    company: "EdTech",
    type: "Acquisition",
    work: "Channel and messaging sequencing",
    outcome: "Sharper message-market fit"
  },
  {
    company: "Financial wellness",
    type: "Trust-led GTM",
    work: "Positioning and acquisition foundations",
    outcome: "Stronger trust narrative in a regulated category"
  }
];
