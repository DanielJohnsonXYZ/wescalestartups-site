export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Fractional CMO for Post-PMF B2B SaaS",
  description:
    "Fractional CMO and growth leadership for post-PMF B2B SaaS and AI startups. We diagnose the growth bottleneck, build the acquisition system, and transfer the operating rhythm so revenue stops depending on founder heroics.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calendlyUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a 30-minute growth diagnostic",
  bookingSubcopy: "Free · 30 minutes · You'll leave with your biggest growth bottleneck named in plain English",
  scorecardLabel: "Take the 5-minute scorecard",
  scorecardLabelLong: "Take the 5-minute Growth Bottleneck Scorecard",
  scorecardUrl: "/resources#growth-bottleneck-scorecard",
  email: "daniel@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  growthMentor: "https://app.growthmentor.com/mentors/daniel-johnson",
  growthMentorReviews: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section",
  mentorCruise: "https://mentorcruise.com/mentor/danieljohnson/",
  danielSite: "https://danieljohnson.xyz",
  lastUpdated: "1 May 2026",
  ogImage: "/og/default.svg",
  /** Google Tag Manager container for wescalestartups.com */
  gtmId: "GTM-5S892HK"
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
  { value: "500+", label: "Sign-ups from a single paid campaign" },
  { value: "2", label: "Operator-side startup exits" },
  { value: "20+", label: "Startups advised" }
] as const;

// Pain-led signals — these drive the hero subhead
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
  "We separate before, work done, and result so you can see what changed.",
  "We avoid anonymous claims where there is no permissioned proof.",
  "We connect results to the system built, not a single tactic taken out of context."
] as const;

// Who this is NOT for — disqualifies bad-fit leads, increases trust
export const notFor = [
  {
    title: "Pre-PMF startups",
    body: "If you're still searching for product-market fit, growth marketing won't fix that. We work with teams that already have traction."
  },
  {
    title: "Founders looking for a tactic of the week",
    body: "We don't sell hacks. The work is diagnosis, system design, and a few sharp bets — not 14 channels at once."
  },
  {
    title: "Teams without execution capacity",
    body: "We build systems your team can run. If there's no operator on the inside to receive the system, we'll tell you."
  },
  {
    title: "Strategy without an inside owner",
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

export const buyerFaqs = [
  {
    question: "What does We Scale Startups do?",
    answer:
      "We Scale Startups diagnoses the real growth bottleneck, builds the acquisition system around it, and transfers the operating rhythm so post-PMF founders are not stuck in every growth decision."
  },
  {
    question: "Who is WSS best for?",
    answer:
      "WSS is best for post-PMF startups with real traction, inconsistent acquisition, and a founder or small team that needs senior growth judgement before or alongside hiring, agencies, or more channel spend."
  },
  {
    question: "How is WSS different from a typical agency?",
    answer:
      "Agencies usually execute a defined channel. WSS works at the system level: diagnosis, positioning, acquisition design, reporting cadence, team direction, and handoff."
  },
  {
    question: "What is the first step?",
    answer:
      "Start with the Growth Bottleneck Scorecard or book a 30-minute call. The first job is to identify the constraint before adding more activity."
  }
] as const;

export const wssVsAgencyPage = {
  whenAgency: [
    "You already have senior GTM leadership and need extra execution capacity in one channel.",
    "The scope is fixed, well understood, and mostly production work.",
    "You need a specialist paid, SEO, design, or content team to execute an existing strategy.",
    "Your internal team already knows what to scale, stop, and measure."
  ],
  whenWss: [
    "The founder still owns growth decisions and the team is waiting for direction.",
    "Paid, SEO, outbound, content, CRO, and reporting have been tried in isolation.",
    "The company needs diagnosis, priority calls, and an operating rhythm before more activity.",
    "You want a system that internal people or agencies can keep running after the engagement."
  ],
  faqs: [
    {
      question: "Can WSS work with our existing agency?",
      answer:
        "Yes. WSS often sits above or alongside an agency: we set priorities, define what good looks like, review signal, and make sure channel execution connects to the commercial outcome."
    },
    {
      question: "Should we hire an agency or WSS first?",
      answer:
        "If you know the channel and only need execution, hire an agency. If you are unsure where growth is breaking, start with diagnosis or WSS fractional leadership before adding more delivery."
    },
    {
      question: "Is WSS a replacement for a full-time CMO?",
      answer:
        "Not forever. WSS is usually a bridge: senior growth leadership and system design now, then a cleaner handoff to internal hires or a full-time CMO when the role is clearer."
    }
  ]
} as const;

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
    result: "Growth fundamentals"
  },
  {
    quote: "Daniel's systematic approach to marketing is second-to-none.",
    name: "Ash Bailey",
    role: "Growth mentoring session",
    company: "MentorCruise review",
    result: "Systematic marketing support"
  },
  {
    quote: "Very helpful session. Daniel has a lot of experience and gives very concrete advice. Highly recommended.",
    name: "Tobias K",
    role: "Startup growth session",
    company: "GrowthMentor review",
    result: "Concrete growth direction"
  },
  {
    quote: "Daniel quickly identified the gaps in our acquisition funnel and gave me a clear prioritised action list. Saved us months of guesswork.",
    name: "Priya S",
    role: "B2B SaaS founder session",
    company: "GrowthMentor review",
    result: "Funnel clarity and prioritisation"
  },
  {
    quote: "Excellent session. Daniel cut through the noise and helped me focus on the one channel that actually made sense for our stage.",
    name: "Marco R",
    role: "Founder mentoring session",
    company: "GrowthMentor review",
    result: "Channel focus and clarity"
  }
] as const;

// First-30-days timeline
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
