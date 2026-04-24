export const siteConfig = {
  name: "We Scale Startups",
  title: "Fractional CMO for B2B SaaS & AI Startups | We Scale Startups",
  description:
    "Fractional CMO and growth systems for post-PMF B2B SaaS and AI startups (£1M–£10M ARR). Build predictable pipeline before you hire a £150k CMO.",
  tagline: "Build predictable pipeline before you hire a £150k CMO.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calendlyUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a Growth Audit",
  bookingLabelAlt: "Book a Free Strategy Call",
  scorecardLabel: "Take the Growth Bottleneck Scorecard",
  scorecardUrl: "/resources#growth-bottleneck-scorecard",
  email: "daniel@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderRole: "Founder & Fractional CMO",
  ogImage: "/og/default.svg",
  videoUrl: "" // optional: paste a Loom/Wistia/YouTube embed URL when Daniel's founder video is ready
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Results" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book Call" }
] as const;

// Bold, readable credibility strip under the hero.
export const trustStripItems = [
  "Worked with Google for Startups & Techstars founders",
  "Managed £10M+ in paid media budgets",
  "Helped startups scale from £1M to £10M+ ARR",
  "Trusted by B2B SaaS, AI, and Fintech founders"
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
  { value: "£10M+", label: "Paid media budgets managed across SaaS, AI, and Fintech" },
  { value: "£1M → £10M", label: "ARR range clients have scaled through with our systems" },
  { value: "20+", label: "Post-PMF startups advised across SaaS, AI, Fintech, and HealthTech" },
  { value: "4.93/5", label: "Founder mentor rating across 219 GrowthMentor reviews" }
] as const;

export const leadMagnets = [
  {
    title: "Growth Bottleneck Scorecard",
    audience: "Post-PMF founders",
    description: "Score the five constraints that block repeatable pipeline: positioning, acquisition, conversion, reporting, and team ownership. 5 minutes.",
    href: "/resources#growth-bottleneck-scorecard"
  },
  {
    title: "5 Mistakes Post-PMF Startups Make",
    audience: "Founders hitting the post-PMF wall",
    description: "The five patterns we see in every growth audit — and how to fix them before you waste another quarter on scattered activity.",
    href: "/resources#five-mistakes-post-pmf"
  },
  {
    title: "90-Day Growth Sprint Planner",
    audience: "Startup leadership teams",
    description: "Map a quarter of tests, owners, decision rules, and reporting so the team stops running disconnected activity.",
    href: "/resources#90-day-growth-sprint-planner"
  }
] as const;

// Founder-led pain language — sharper, simpler, founder-to-founder.
export const painSignals = [
  "Leads come in, but growth feels random",
  "You have dashboards, but no clear answers",
  "Paid ads burn money without compounding",
  "The team is busy, but nothing feels like it's moving",
  "No one owns pipeline — so the founder does",
  "Revenue is unpredictable quarter to quarter"
] as const;

// Founder objections handled directly (drives both trust + FAQPage schema).
export const objections = [
  {
    question: "Why not just hire a full-time CMO?",
    answer: "A full-time CMO between £120k–£180k + equity makes sense when you have a repeatable pipeline to scale. Before that, hiring in adds cost, slows hiring velocity, and locks the wrong person in. We build the system first so your eventual CMO inherits something that works."
  },
  {
    question: "Why not use a marketing agency?",
    answer: "Agencies run campaigns. We build the system the campaigns plug into. That includes positioning, ICP definition, offer, reporting cadence, and experimentation rhythm. Once that's in place, agency work compounds instead of burning budget."
  },
  {
    question: "How long until we see results?",
    answer: "The Growth Audit delivers clarity in 2 weeks. A 90-Day Sprint shows pipeline signal inside the first month and measurable commercial change by day 90. Fractional CMO engagements are structured in quarterly commercial checkpoints."
  },
  {
    question: "Do you just advise, or actually execute?",
    answer: "Both. Daniel sits in weekly growth syncs, writes the briefs, reviews the ads, owns the reporting, and holds the team accountable to outcomes. We hand execution to your team or agencies — but the operator judgement stays senior."
  },
  {
    question: "What size company is the best fit?",
    answer: "B2B SaaS and AI founders between £1M and £10M ARR, typically 8–40 people, post-PMF, pre-full-time-CMO. Also strong fits in Fintech and HealthTech where trust and clarity drive conversion."
  },
  {
    question: "How much founder time does this need?",
    answer: "Roughly 60–90 minutes a week in a structured growth sync, plus async Slack. The goal is to free founder time, not consume it. Within the first 30 days, most founders report they're spending less time firefighting growth — not more."
  }
] as const;

// Simple pricing guidance to qualify leads before they book.
export const pricingGuide = [
  {
    tier: "Growth Audit",
    range: "£3,500 fixed",
    summary: "2-week diagnostic. Commercial bottleneck, prioritised fixes, and the right next engagement — or none at all.",
    fit: "Best when the path is unclear."
  },
  {
    tier: "90-Day Growth Sprint",
    range: "From £6k / month",
    summary: "Senior operator inside the team for one focused quarter. Positioning, experiments, reporting, weekly rhythm.",
    fit: "Best when you know the constraint and need structure around the work."
  },
  {
    tier: "Fractional CMO",
    range: "From £8k / month",
    summary: "Ongoing senior growth leadership. Strategy, prioritisation, team direction, acquisition system ownership.",
    fit: "Best for Seed–Series B teams before the full-time hire."
  }
] as const;

export const proofStandards = [
  "We separate before, work done, and result so visitors can see what changed.",
  "We avoid anonymous miracle claims where there is no permissioned proof.",
  "We connect results to the system built, not a single tactic taken out of context."
] as const;
