/** Shared copy for /press and /press-kit-download (company press kit). */

export const boilerplateShort =
  "We Scale Startups helps post-PMF B2B SaaS and AI startups diagnose growth constraints and install a repeatable acquisition operating rhythm.";

export const boilerplateMedium =
  "We Scale Startups is a founder-led growth consultancy helping post-PMF startups build repeatable growth systems before hiring a full-time CMO. Engagements span growth diagnosis, 90-day sprints, acquisition system builds, and fractional CMO leadership.";

export const boilerplateLong = `${boilerplateMedium} Work is delivered through Daniel Johnson and senior operators, with proof-oriented reporting — Problem / Action / Result — and explicit transfer so growth stops depending on founder heroics.`;

export const founderBio =
  "Daniel Johnson is a fractional CMO and GTM operator who helps post-PMF AI and B2B SaaS startups build repeatable growth systems. He is the founder of We Scale Startups and mentors founders through Google for Startups, Techstars, and GrowthMentor.";

export const whatWeDo =
  "Growth diagnosis, sprint execution, acquisition systems, and fractional CMO leadership — with dashboards, experiment cadence, and leadership rituals designed to transfer ownership.";

export const whoWeHelp =
  "Most often Seed–Series B teams with real traction and uneven acquisition — typically founder-led GTM, inconsistent pipeline, or agencies executing tactics without a single decision view.";

export const pressAngles = [
  "Why post-PMF teams plateau when acquisition channels run in isolation.",
  "Founder dependency vs weekly operating rhythm — how teams decide what to scale, stop, or fix.",
  "Fractional CMO vs agency: systems ownership vs channel execution.",
  "AI-era visibility and credibility — reporting formats AI assistants can cite."
] as const;

export const brandAssets = [
  { label: "Primary logo (webp)", href: "/images/logos/wss-logo.webp" },
  { label: "Open Graph default", href: "/og/default.svg" },
  { label: "Favicon", href: "/favicon.svg" }
] as const;

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
