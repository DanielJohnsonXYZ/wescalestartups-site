export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Repeatable Growth Systems for Post-PMF Startups",
  description:
    "Growth leadership for startups that need predictable acquisition. We diagnose the bottleneck, build the growth system, and transfer it so founders are no longer stuck in every loop.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calendlyUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a call",
  bookingSubcopy: "Find your biggest growth bottleneck in 30 minutes",
  scorecardLabel: "Take the scorecard",
  scorecardLabelLong: "Take the 5-min Growth Bottleneck Scorecard",
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
  { href: "/start-here", label: "Start here" },
  { href: "/services", label: "Services" },
  { href: "/proof", label: "Proof" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" }
] as const;

export const proofClients = [
  { label: "Ned", context: "Fintech acquisition", proof: "500+ sign-ups from paid search" },
  { label: "Diadia Health", context: "AI precision medicine", proof: "Marketing function built from zero" },
  { label: "eQuoo", context: "Healthtech positioning", proof: "Clearer acquisition narrative" },
  { label: "LessonsUp", context: "EdTech acquisition", proof: "Sharper message-market fit" },
  { label: "Nevly", context: "Financial wellness", proof: "Trust-led GTM foundations" }
] as const;

export const credentialLogos = [
  { src: "/images/logos/google.webp", alt: "Google", label: "Google for Startups" },
  { src: "/images/logos/cambridge.webp", alt: "University of Cambridge", label: "Cambridge Judge" },
  { src: "/images/logos/growthmentor.png", alt: "GrowthMentor", label: "GrowthMentor" },
  { src: "/images/logos/newsflare.webp", alt: "Newsflare", label: "Newsflare" },
  { src: "/images/logos/peachy.png", alt: "Peachy", label: "Peachy" }
] as const;

export const headlineMetrics = [
  { value: "£10M+", label: "Paid acquisition spend managed" },
  { value: "20+", label: "Startups advised" },
  { value: "2", label: "Operator-side startup exits" },
  { value: "4.93/5", label: "Founder review average" }
] as const;

// Pain-led signals — these now drive the hero subhead
export const painSignals = [
  "Growth still depends on you",
  "Pipeline is inconsistent",
  "You're spending, but don't know what to scale"
] as const;

// Decision layer for the services section
export const serviceDecision = [
  {
    condition: "You don't know the bottleneck yet",
    recommendation: "Start with Growth Diagnosis",
    href: "/services/growth-diagnosis",
    duration: "1 week"
  },
  {
    condition: "You've tried channels in isolation",
    recommendation: "Acquisition System Build",
    href: "/services/acquisition-system-build",
    duration: "8–12 weeks"
  },
  {
    condition: "You know growth matters this quarter",
    recommendation: "90-Day Growth Sprint",
    href: "/services/90-day-growth-sprint",
    duration: "12 weeks"
  },
  {
    condition: "You need senior leadership in-house",
    recommendation: "Fractional CMO",
    href: "/services/fractional-cmo",
    duration: "3+ months"
  }
] as const;

export const serviceSnapshots = [
  {
    title: "Growth Diagnosis",
    shortTitle: "Diagnose",
    href: "/services/growth-diagnosis",
    bestFor: "You have activity, but no one can agree what is blocking pipeline.",
    get: "A constraint map, evidence review, quick wins, and a 90-day recommendation.",
    timeline: "1 week",
    price: "from £4k",
    cta: "Diagnose the bottleneck"
  },
  {
    title: "90-Day Growth Sprint",
    shortTitle: "Sprint",
    href: "/services/90-day-growth-sprint",
    bestFor: "You need focused tests this quarter, not another broad strategy deck.",
    get: "Experiment roadmap, weekly decisions, campaign/page iterations, transfer notes.",
    timeline: "12 weeks",
    price: "from £15k",
    cta: "Run a growth sprint"
  },
  {
    title: "Acquisition System Build",
    shortTitle: "Build",
    href: "/services/acquisition-system-build",
    bestFor: "Channels have been tried in isolation and now need to work as one system.",
    get: "Channel strategy, offer map, landing/campaign briefs, reporting and handoff.",
    timeline: "8-12 weeks",
    price: "from £30k",
    cta: "Build the system"
  },
  {
    title: "Fractional CMO",
    shortTitle: "Lead",
    href: "/services/fractional-cmo",
    bestFor: "The team needs senior growth judgement before a full-time CMO hire.",
    get: "Priorities, cadence, decision rules, team/agency direction, founder clarity.",
    timeline: "3+ months",
    price: "from £8k/mo",
    cta: "Add senior leadership"
  }
] as const;

// Lead magnets remain the secondary path
export const leadMagnets = [
  {
    title: "Growth Bottleneck Scorecard",
    audience: "Post-PMF founders · 5 minutes",
    description: "Score the five constraints that usually block repeatable pipeline: positioning, acquisition, conversion, reporting, and team ownership.",
    href: "/resources#growth-bottleneck-scorecard",
    primary: true
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

// Who this is NOT for — disqualifies bad-fit leads, increases trust
export const notFor = [
  {
    title: "Pre-PMF startups",
    body: "If you're still searching for product-market fit, growth marketing won't fix that. We work with teams that already have traction."
  },
  {
    title: "Founders looking for tactic-of-the-week",
    body: "We don't sell hacks. The work is diagnosis, system design, and a few sharp bets — not 14 channels at once."
  },
  {
    title: "Teams without execution capacity",
    body: "We build systems your team can run. If there's no operator on the inside to receive the system, we'll tell you."
  },
  {
    title: "\"Tell me what to do\" with no inside owner",
    body: "Strategy decks without a builder gather dust. We need at least one person internally to ship against."
  },
  {
    title: "Volume buyers",
    body: "If the goal is more activity instead of fewer, sharper decisions, an agency is a better fit than us."
  }
] as const;

// WSS vs agency — explicit positioning
export const vsAgency = [
  {
    label: "What gets delivered",
    agency: "Tactics in isolation (paid, SEO, content)",
    wss: "A repeatable system the team can run"
  },
  {
    label: "Strategy",
    agency: "You define it, they execute",
    wss: "We diagnose the constraint, then act on it"
  },
  {
    label: "Reporting",
    agency: "Activity, impressions, vanity metrics",
    wss: "What's working, what to scale, what to kill"
  },
  {
    label: "Decision rights",
    agency: "Theirs, on their channel",
    wss: "Shared, on the commercial outcome"
  },
  {
    label: "When the engagement ends",
    agency: "The work stops",
    wss: "The system continues without us"
  },
  {
    label: "Founder dependency",
    agency: "You stay in every loop",
    wss: "You step out — by design"
  }
] as const;

export const testimonials = [
  {
    quote: "Daniel offered sharp, practical advice with a clear focus on messaging and positioning. He helped me reframe the problem and target the right audience more effectively.",
    name: "Greg Weinstein",
    role: "Founder mentoring session",
    company: "MentorCruise review",
    result: "Messaging and positioning clarity"
  },
  {
    quote: "Daniel went above and beyond to share tactical feedback and help overhaul our approach to SEO.",
    name: "Dru Riley",
    role: "Growth mentoring session",
    company: "MentorCruise review",
    result: "SEO and content direction"
  },
  {
    quote: "Daniel helped me understand the importance of keyword research, building a Google Ads strategy, and targeting the right audience.",
    name: "Christian W K",
    role: "PPC mentoring session",
    company: "MentorCruise review",
    result: "Google Ads strategy"
  },
  {
    quote: "He asked insightful questions to understand my business goals and challenges. He came across as knowledgeable and experienced even in our short conversation.",
    name: "Joshua Pitzalis",
    role: "Founder mentoring session",
    company: "MentorCruise review",
    result: "Growth direction and next steps"
  },
  {
    quote: "Daniel brought me back to reality by underscoring the importance of fundamentals. He helped put growth marketing into perspective.",
    name: "Jawad Ahmed",
    role: "Marketing mentoring session",
    company: "MentorCruise review",
    result: "No-fluff growth fundamentals"
  },
  {
    quote: "Daniel's systematic approach to marketing is second-to-none.",
    name: "Ash Bailey",
    role: "Growth mentoring session",
    company: "MentorCruise review",
    result: "Systematic marketing support"
  }
] as const;

// First-30-days timeline — adapted from Daniel's existing one-pager
export const first30Days = [
  {
    week: "Week 1",
    title: "Audit",
    body: "Data, ICP, messaging, funnel, channels, analytics hygiene. By Friday you have a plain-English view of where pipeline actually breaks."
  },
  {
    week: "Week 2",
    title: "Plan",
    body: "90-day plan, experiment backlog (ICE-scored), creative and messaging map. Owners and decision rules attached to every test."
  },
  {
    week: "Week 3",
    title: "Ship",
    body: "3–5 tests live across the constraint we found in Week 1: paid acquisition, onboarding, pricing/offer, or landing/CRO."
  },
  {
    week: "Week 4",
    title: "Transfer",
    body: "Learnings, roll-outs, owner playbook, and dashboard handoff. The system is documented enough that the team can keep running it."
  }
] as const;

// Pricing — approved ranges for filtering bad-fit leads.
export const pricingTiers = [
  {
    name: "Growth Diagnosis",
    duration: "1 week",
    priceFrom: "from £4,000",
    description: "Plain-English view of the bottleneck and a sequenced plan. Best when you don't know the constraint yet.",
    href: "/services/growth-diagnosis"
  },
  {
    name: "90-Day Growth Sprint",
    duration: "12 weeks",
    priceFrom: "from £15,000",
    description: "Audit → plan → ship 3–5 tests → transfer. Best pre-fundraise or post-launch when you need signal fast.",
    href: "/services/90-day-growth-sprint"
  },
  {
    name: "Acquisition System Build",
    duration: "8–12 weeks",
    priceFrom: "from £30,000",
    description: "Channels, landing pages, offers, and reporting working as one system. Best after you've tested channels in isolation.",
    href: "/services/acquisition-system-build"
  },
  {
    name: "Fractional CMO",
    duration: "3 months minimum",
    priceFrom: "from £8,000 / month",
    description: "Senior growth leadership inside the team. Best for Seed–Series B teams not ready for a full-time CMO.",
    href: "/services/fractional-cmo"
  }
] as const;

// Daniel's "why I built this" — operator credibility, founder layer
export const founderStory = {
  intro: "I'm Daniel. After 15 years operating inside SaaS, fintech, healthtech and EdTech startups — including two exits — I kept seeing the same pattern: founders with great products who were stuck running marketing themselves because nobody else on the team could read the numbers and decide what to scale.",
  why: "I built WSS to be the operator I wished was there: senior judgement that diagnoses the real constraint, builds the system, and then transfers it so you don't need me forever.",
  credentials: [
    "Two operator-side startup exits",
    "Mentored hundreds of founders through Google for Startups, Techstars, GrowthMentor",
    "MentorCruise Top Mentor — 5.0/5 across 30+ reviews",
    "Speaker at Cambridge Judge, Imperial College, Techstars, Google Launchpad",
    "£10M+ paid acquisition spend managed across SaaS, fintech, healthtech, EdTech"
  ]
} as const;
