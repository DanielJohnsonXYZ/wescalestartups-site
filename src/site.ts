export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Repeatable Growth Systems for Post-PMF Startups",
  description:
    "Fractional CMO, growth diagnosis, and acquisition system builds for post-PMF startups that need clearer positioning, sharper acquisition, and repeatable pipeline.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calendlyUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a Growth Audit",
  scorecardLabel: "Take the Growth Bottleneck Scorecard",
  scorecardUrl: "/resources#growth-bottleneck-scorecard",
  email: "daniel@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  ogImage: "/og/default.svg"
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Results" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book Call" }
] as const;

export const trustLogos = [
  { label: "Ned" },
  { label: "eQuoo" },
  { label: "LessonsUp" },
  { label: "Nevly" }
] as const;

export const credentialLogos = [
  { src: "/images/logos/google.webp", alt: "Google", label: "Google Launchpad" },
  { src: "/images/logos/cambridge.webp", alt: "University of Cambridge", label: "Cambridge Judge" },
  { src: "/images/logos/growthmentor.png", alt: "GrowthMentor", label: "GrowthMentor" },
  { src: "/images/logos/newsflare.webp", alt: "Newsflare", label: "Newsflare" },
  { src: "/images/logos/peachy.png", alt: "Peachy", label: "Peachy" }
] as const;

export const headlineMetrics = [
  { value: "£10M+", label: "Budgets and paid acquisition spend managed" },
  { value: "2", label: "Startup exits across operator and founder-side work" },
  { value: "20+", label: "Startups advised across SaaS, fintech, healthtech, and EdTech" },
  { value: "4.93/5", label: "Founder mentoring rating across 219 reviews" }
] as const;

export const leadMagnets = [
  {
    title: "Growth Bottleneck Scorecard",
    audience: "Post-PMF founders",
    description: "Score the five constraints that usually block repeatable pipeline: positioning, acquisition, conversion, reporting, and team ownership.",
    href: "/resources#growth-bottleneck-scorecard"
  },
  {
    title: "90-Day Growth Sprint Planner",
    audience: "Startup leadership teams",
    description: "Map a quarter of tests, owners, decision rules, and reporting so the team stops running disconnected activity.",
    href: "/resources#90-day-growth-sprint-planner"
  },
  {
    title: "VC Portfolio Growth Diagnosis Template",
    audience: "VCs and accelerator teams",
    description: "A portfolio workshop format for spotting whether a founder needs positioning, acquisition, team, or reporting help first.",
    href: "/resources#vc-portfolio-growth-diagnosis"
  }
] as const;

export const proofStandards = [
  "We separate before, work done, and result so visitors can see what changed.",
  "We avoid anonymous miracle claims where there is no permissioned proof.",
  "We connect results to the system built, not a single tactic taken out of context."
] as const;
