export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Fractional growth leadership for post-PMF B2B SaaS & AI",
  description:
    "Founder-led growth strategy, customer research, and acquisition systems for post-PMF B2B SaaS and AI startups between $1M and $10M ARR. Senior operator, not an agency.",
  tagline: "Senior growth operator for post-PMF B2B SaaS & AI founders.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  // External booking URL — tracked via GTM on click. /book is a 301 alias for legacy links.
  bookingUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a growth call",
  scorecardLabel: "Take the Growth Bottleneck Scorecard",
  scorecardUrl: "/resources#growth-bottleneck-scorecard",
  email: "hello@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderRole: "Founder & Fractional CMO",
  ogImage: "/og/default.svg",
  priceBand: "£5,000–£15,000 / month",
  priceBandNote: "Retainer ranges by scope. Fractional CMO £10k–£15k/mo, 3-month minimum. Fixed-scope phase sprints priced per engagement.",
  videoUrl: "" // paste Loom/Wistia/YouTube embed URL once the 60s founder video is recorded
} as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Results" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

// Bold credibility strip under the hero.
export const trustStripItems = [
  "Worked with Google for Startups & Techstars founders",
  "Managed £6M+ in paid acquisition budgets",
  "£20M+ revenue influenced across client work",
  "Trusted by B2B SaaS, AI, and Fintech founders"
] as const;

export const trustLogos = [
  { src: "/images/logos/google.webp", alt: "Google", label: "Google Launchpad" },
  { src: "/images/logos/cambridge.webp", alt: "University of Cambridge", label: "Cambridge Judge" },
  { src: "/images/logos/growthmentor.png", alt: "GrowthMentor", label: "GrowthMentor" },
  { src: "/images/logos/newsflare.webp", alt: "Newsflare", label: "Newsflare" },
  { src: "/images/logos/peachy.png", alt: "Peachy", label: "Peachy" }
] as const;

export const headlineMetrics = [
  { value: "£20M+", label: "Revenue influenced through client growth work" },
  { value: "£6M+", label: "Managed across paid acquisition channels" },
  { value: "388+", label: "GrowthMentor sessions · 4.93★ average rating" },
  { value: "20+", label: "Post-PMF startups advised across SaaS, AI, Fintech, HealthTech" }
] as const;

export const whoThisIsFor = {
  forYou: [
    "Post-PMF B2B SaaS or AI startup, $1M–$10M ARR",
    "Founder-led or VP Marketing gap, need senior operator guidance",
    "Product works, pipeline is inconsistent or mis-targeted",
    "Want a system your team can run, not a deck"
  ],
  notForYou: [
    "Pre-PMF teams still proving the product works",
    "Enterprise companies with large in-house growth teams",
    "Agencies looking for white-label execution",
    "Projects that need brand design, PR, or pure creative"
  ]
} as const;

// Founder-to-founder pain language. Used in the homepage pain section.
export const painSignals = [
  "Leads come in, but growth feels random",
  "You have dashboards, but no clear answers",
  "Paid ads burn money without compounding",
  "The team is busy, but nothing feels like it's moving",
  "No one owns pipeline — so the founder does",
  "Revenue is unpredictable quarter to quarter"
] as const;

// Merged FAQ / objections. Emitted as FAQPage JSON-LD from the homepage.
export const objections = [
  {
    question: "Who is We Scale Startups actually for?",
    answer:
      "Post-PMF B2B SaaS and AI teams between $1M and $10M ARR where the product works but acquisition is inconsistent. Typically founder-led or with a gap before the first full-time growth leader."
  },
  {
    question: "Why not just hire a full-time CMO?",
    answer:
      "A full-time CMO between £120k–£180k + equity makes sense when you have a repeatable pipeline to scale. Before that, hiring in adds cost, slows hiring velocity, and locks the wrong person in. We build the system first so your eventual CMO inherits something that works."
  },
  {
    question: "How is this different from an agency?",
    answer:
      "An agency sells execution hours. We Scale Startups sells a senior operator who decides what gets executed, measures the learning, and leaves behind a system your team can keep running. Agencies pitch. Operators install."
  },
  {
    question: "What does it cost?",
    answer:
      "Retainers sit between £5,000 and £15,000 per month depending on scope, phase, and involvement. Fractional CMO engagements run £10k–£15k/mo with a 3-month minimum. Fixed-scope phase sprints are priced per engagement."
  },
  {
    question: "What do the three phases mean?",
    answer:
      "Phase one is Research — turning scattered signals into a clear ICP, message, and market thesis. Phase two is Acquisition — building the channels and conversion points that produce pipeline. Phase three is Operating Cadence — a weekly rhythm that compounds learning. Fractional CMO is the delivery model that runs all three."
  },
  {
    question: "How long until we see results?",
    answer:
      "Research phase delivers clarity in 2–4 weeks. Acquisition shows pipeline signal inside the first 6 weeks and measurable commercial change by 90 days. Most engagements run six to twelve months, long enough to move through at least one full phase and transfer the system."
  },
  {
    question: "Do you just advise, or actually execute?",
    answer:
      "Both. Daniel sits in weekly growth syncs, writes the briefs, reviews the ads, owns the reporting, and holds the team accountable to outcomes. We hand execution to your team or agencies — but the operator judgement stays senior."
  },
  {
    question: "How much founder time does this need?",
    answer:
      "Roughly 60–90 minutes a week in a structured growth sync, plus async Slack. The goal is to free founder time, not consume it. Within the first 30 days, most founders report they're spending less time firefighting growth — not more."
  },
  {
    question: "Where are you based?",
    answer:
      "Founder Daniel Johnson is UK-based, currently operating from Asia. Clients are global, with a particular concentration of US-based post-PMF teams."
  }
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

export const proofStandards = [
  "We separate before, work done, and result so visitors can see what changed.",
  "We avoid anonymous miracle claims where there is no permissioned proof.",
  "We connect results to the system built, not a single tactic taken out of context."
] as const;
