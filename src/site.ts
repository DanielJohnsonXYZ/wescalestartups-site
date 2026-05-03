const BOOKING_CALL_DURATION_PHRASE = "30 minutes" as const;

export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Fractional CMO for Post-PMF B2B SaaS",
  description:
    "Fractional CMO for post-PMF B2B SaaS and AI startups: diagnose the bottleneck, build the acquisition system, transfer the weekly rhythm so pipeline compounds without founder heroics.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calendlyUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a 30-minute growth diagnostic",
  /** Inline copy: "In 30 minutes you'll…", "30 minutes. No deck." */
  bookingCallDurationPhrase: BOOKING_CALL_DURATION_PHRASE,
  bookingSubcopy: `Free · ${BOOKING_CALL_DURATION_PHRASE} · You'll leave with your biggest growth bottleneck named in plain English`,
  /** Hero, pricing, quiz — noun phrase (not the imperative CTA). */
  bookingCallShort: "30-minute diagnostic call",
  /** What happens on the 30-minute diagnostic (booking reassurance). */
  bookingCallPhases: [
    { phase: "First ~5 minutes", detail: "Context — stage, traction, channels, and what you think is blocking growth." },
    {
      phase: "Next ~10 minutes",
      detail: "Bottleneck read — is the constraint positioning, acquisition, conversion, reporting, or team ownership?"
    },
    {
      phase: "~10 minutes",
      detail: "Options — Growth Diagnosis, Sprint, System Build, Fractional CMO, or the right referral if we are not a fit."
    },
    { phase: "Last ~5 minutes", detail: "Clear next step. No pitch unless there is a genuine fit." }
  ],
  /** Short line near booking CTAs (header title, footer) — Growth Hub: call reassurance. */
  bookingCallReassurance: `Bring your current bottleneck. In ${BOOKING_CALL_DURATION_PHRASE} we name whether the constraint is positioning, acquisition, conversion, reporting, or team ownership — no pitch unless there's a clear fit.`,
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
  lastUpdated: "3 May 2026",
  /** ISO date for sitemap lastmod on static URLs (keep in sync when you refresh sitewide copy). */
  siteLastModified: "2026-05-03",
  ogImage: "/og/default.svg",
  /** Google Tag Manager container for wescalestartups.com (We Scale Startups account) */
  gtmId: "GTM-TV6C7GS"
} as const;

/** Named methodology — use on home, GTM, and press for consistent entity language. */
export const methodologyBrand = {
  shortName: "WSS Growth Operating System",
  tagline: "Diagnose the bottleneck, build the acquisition system, transfer the weekly cadence."
} as const;

/**
 * Per-URL sitemap lastmod (ISO date), aligned to last git change on the backing page/content.
 * Unlisted paths fall back to siteLastModified. Refresh entries when you edit a route.
 */
export const staticPathLastModified: Partial<Record<string, string>> = {
  "/": "2026-05-03",
  "/about": "2026-05-03",
  "/ai-growth-systems": "2026-05-01",
  "/book": "2026-05-03",
  "/build": "2026-05-03",
  "/case-studies": "2026-05-03",
  "/contact": "2026-05-03",
  "/diagnose": "2026-05-03",
  "/engagement-models": "2026-05-01",
  "/execution-model": "2026-05-01",
  "/experimentation": "2026-05-03",
  "/growth-course": "2026-05-04",
  "/wss-scale-score": "2026-05-04",
  "/first-30-days": "2026-05-03",
  "/fractional-cmo-vs-agency": "2026-05-03",
  "/growth-engine": "2026-05-01",
  "/gtm-strategy": "2026-05-03",
  "/how-it-works": "2026-05-03",
  "/how-we-work": "2026-05-01",
  "/industries": "2026-05-03",
  "/founder-led-growth": "2026-05-03",
  "/growth-operating-system": "2026-05-03",
  "/insights": "2026-05-03",
  "/llms.txt": "2026-05-03",
  "/llms-full.txt": "2026-05-03",
  "/markdown/home.md": "2026-05-03",
  "/press": "2026-05-03",
  "/pricing": "2026-05-03",
  "/podcast": "2026-05-03",
  "/privacy": "2026-05-03",
  "/proof": "2026-05-03",
  "/quiz": "2026-05-03",
  "/reports": "2026-05-01",
  "/resources": "2026-05-03",
  "/services": "2026-05-03",
  "/start-here": "2026-05-03",
  "/terms": "2026-05-03",
  "/testimonials": "2026-05-03",
  "/transfer": "2026-05-03",
  "/when-growth-plateaus": "2026-05-03",
  "/services/90-day-growth-sprint": "2026-05-03",
  "/services/acquisition-system-build": "2026-05-03",
  "/services/fractional-cmo": "2026-05-03",
  "/services/growth-diagnosis": "2026-05-03",
  "/industries/ai-genai": "2026-05-03",
  "/industries/b2b-growth": "2026-05-03",
  "/industries/b2b-saas": "2026-05-03",
  "/industries/ecommerce": "2026-05-03",
  "/industries/edtech": "2026-05-03",
  "/industries/fintech": "2026-05-03",
  "/industries/healthtech": "2026-05-03",
  "/industries/saas-growth": "2026-05-03",
  "/industries/seed-to-series-b": "2026-05-03",
  "/industries/vc-support": "2026-05-03"
};

export const navigation = [
  { href: "/start-here", label: "Start here" },
  { href: "/services", label: "Services" },
  { href: "/proof", label: "Proof" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/quiz", label: "Quiz" },
  { href: "/insights", label: "Insights" },
  { href: "/growth-operating-system", label: "Growth OS" },
  { href: "/founder-led-growth", label: "Founder-led" }
] as const;

/** Strategic pillar pages → related insights (internal links + related reading section). */
export const strategicPageRelatedInsights: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "/engagement-models": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
    { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" }
  ],
  "/how-we-work": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/execution-model": [
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" }
  ],
  "/growth-engine": [
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" }
  ],
  "/ai-growth-systems": [
    { href: "/insights/make-ai-search-visibility-citable", label: "Make AI search visibility citable" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/reports": [
    { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
    { href: "/insights/make-ai-search-visibility-citable", label: "Make AI search visibility citable" },
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" }
  ],
  "/gtm-strategy": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/fractional-cmo-vs-agency": [
    { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/quiz": [
    { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/diagnose", label: "Manual 5-layer diagnostic framework" }
  ],
  "/when-growth-plateaus": [
    { href: "/insights/pipeline-plateau-post-pmf", label: "Pipeline plateau after PMF" },
    { href: "/insights/systems-vs-activity-retainers", label: "Systems vs activity retainers" },
    { href: "/experimentation", label: "Experimentation discipline" },
    { href: "/diagnose", label: "5-layer diagnostic framework" },
    { href: "/services", label: "Services" }
  ]
};

/** /diagnose — related reports and insights (internal crawl). */
export const diagnoseRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
  { href: "/reports", label: "Report formats (bottleneck, system, AI visibility)" }
];

/** /resources — frameworks, quiz, reports (internal crawl). */
export const resourcesRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
  { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
  { href: "/insights/make-ai-search-visibility-citable", label: "Make AI search visibility citable" },
  { href: "/diagnose", label: "5-layer diagnostic framework" },
  { href: "/quiz", label: "Growth bottleneck quiz" },
  { href: "/reports", label: "Report formats hub" }
];

/** /book — pre-call context. */
export const bookRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/diagnose", label: "5-layer diagnostic framework" },
  { href: "/quiz", label: "Growth bottleneck quiz" },
  { href: "/resources", label: "Resources and scorecard" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/proof", label: "Proof hub" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" }
];

/** /services/[slug] — related insights and hubs. */
export const serviceRelatedInsights: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "growth-diagnosis": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
    { href: "/diagnose", label: "Free 5-layer framework" },
    { href: "/reports", label: "Report formats" }
  ],
  "90-day-growth-sprint": [
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
    { href: "/first-30-days", label: "First 30 days with WSS" },
    { href: "/how-it-works", label: "How it works" }
  ],
  "acquisition-system-build": [
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
    { href: "/build", label: "Build · execution framing" },
    { href: "/transfer", label: "Transfer · handoff framing" }
  ],
  "fractional-cmo": [
    { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
    { href: "/fractional-cmo-vs-agency", label: "Fractional CMO vs agency" },
    { href: "/first-30-days", label: "First 30 days with WSS" },
    { href: "/engagement-models", label: "Engagement models" }
  ]
};

/** /pricing — decision context and self-serve paths. */
export const pricingRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/services", label: "Compare the four engagements" },
  { href: "/fractional-cmo-vs-agency", label: "Fractional CMO vs agency" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/start-here", label: "Start here" },
  { href: "/resources", label: "Resources and scorecard" }
];

/** /services hub — pricing, proof, diagnosis. */
export const servicesHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/pricing", label: "Pricing ranges" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/proof", label: "Proof hub" },
  { href: "/diagnose", label: "5-layer diagnostic" },
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" }
];

/** /insights hub — frameworks and proof. */
export const insightsHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/reports", label: "Report formats" },
  { href: "/diagnose", label: "5-layer framework" },
  { href: "/quiz", label: "Growth bottleneck quiz" },
  { href: "/proof", label: "Proof hub" },
  { href: "/resources", label: "Resources" }
];

/**
 * Strategic groupings for /insights (commercial authority + navigation).
 * IDs are content collection entries under src/content/insights/.
 */
export const insightsThemeGroups: readonly {
  title: string;
  description: string;
  insightIds: readonly string[];
}[] = [
  {
    title: "Diagnosis & bottleneck clarity",
    description: "Name the constraint before you add spend, channels, or headcount.",
    insightIds: [
      "diagnose-growth-bottleneck-before-spend",
      "what-a-growth-report-should-answer",
      "pipeline-plateau-post-pmf"
    ]
  },
  {
    title: "Acquisition systems & retainers",
    description: "Replace channel sprawl and activity retainers with one operating rhythm.",
    insightIds: ["acquisition-system-beats-channel-sprawl", "systems-vs-activity-retainers"]
  },
  {
    title: "Fractional CMO & org design",
    description: "When senior marketing leadership is the right move — and what “good” looks like.",
    insightIds: ["when-to-hire-fractional-cmo"]
  },
  {
    title: "AI search & LLM visibility",
    description: "Make expertise easy for buyers and answer engines to cite.",
    insightIds: ["make-ai-search-visibility-citable"]
  }
] as const;

/** /testimonials — proof and next steps. */
export const testimonialsRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/book", label: siteConfig.bookingLabel },
  { href: "/resources", label: "Resources" }
];

/** Case study detail pages — standard crawl paths. */
export const caseStudyRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "All case studies" },
  { href: "/services", label: "Compare services" },
  { href: "/book", label: siteConfig.bookingLabel }
];

/** /proof — cases, services, press. */
export const proofHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/services", label: "Services" },
  { href: "/press", label: "Press kit" },
  { href: "/book", label: siteConfig.bookingLabel }
];

/** /case-studies index. */
export const caseStudiesIndexRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/book", label: siteConfig.bookingLabel }
];

/** /about. */
export const aboutRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" }
];

/** /contact. */
export const contactRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/book", label: siteConfig.bookingLabel },
  { href: "/start-here", label: "Start here" },
  { href: "/resources", label: "Resources" },
  { href: "/proof", label: "Proof hub" },
  { href: "/press", label: "Press kit" }
];

/** Cornerstone pages — strategic content hubs. */
export const cornerstoneRelatedReading: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "/growth-operating-system": [
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
    { href: "/diagnose", label: "5-layer diagnostic framework" },
    { href: "/build", label: "Acquisition System Build" },
    { href: "/transfer", label: "Transfer · handoff" },
    { href: "/first-30-days", label: "First 30 days with WSS" }
  ],
  "/founder-led-growth": [
    { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/start-here", label: "Start here" },
    { href: "/services/fractional-cmo", label: "Fractional CMO" }
  ]
};
export const industriesHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/services", label: "Services" },
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" }
];

/** /industries/[slug] — same links every sector. */
export const industryDetailRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/industries", label: "All industries" },
  { href: "/proof", label: "Proof hub" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" }
];

/** /build. */
export const buildPageRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/transfer", label: "Transfer · handoff" },
  { href: "/services/90-day-growth-sprint", label: "90-Day Growth Sprint" },
  { href: "/services/acquisition-system-build", label: "Acquisition System Build" },
  { href: "/how-it-works", label: "How it works" }
];

/** /transfer. */
export const transferPageRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/build", label: "Build · execution" },
  { href: "/services/fractional-cmo", label: "Fractional CMO" },
  { href: "/first-30-days", label: "First 30 days" },
  { href: "/how-we-work", label: "How we work" }
];

/** /press — internal verification paths. */
export const pressRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About WSS" },
  { href: "/contact", label: "Contact" }
];

/** Home — crawl shortcuts at the bottom of the page. */
export const homeRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/start-here", label: "Start here" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/proof", label: "Proof hub" },
  { href: "/insights", label: "Insights" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/experimentation", label: "Experimentation" },
  { href: "/when-growth-plateaus", label: "When growth plateaus" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: siteConfig.bookingLabel }
];

/** Legal pages — useful internal links (exclude self on each page). */
export const privacyPageRelatedLinks: readonly { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of use" },
  { href: "/book", label: siteConfig.bookingLabel }
];

export const termsPageRelatedLinks: readonly { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/book", label: siteConfig.bookingLabel }
];

export const proofClients = [
  { label: "Ned", caseSlug: "ned", context: "Fintech client · Fractional CMO engagement", proof: "500+ sign-ups from paid search" },
  { label: "Diadia Health", caseSlug: "diadia-health", context: "AI precision medicine client · Growth Diagnosis + Sprint", proof: "Marketing function built from zero" },
  { label: "eQuoo", caseSlug: "equoo", context: "Healthtech client · Fractional CMO engagement", proof: "Clearer acquisition narrative" },
  { label: "LessonsUp", caseSlug: "lessonsup", context: "EdTech client · Acquisition System Build", proof: "Sharper message-market fit" },
  { label: "Nevly", caseSlug: "nevly", context: "Financial wellness client · Sprint + CMO support", proof: "Trust-led GTM foundations" },
  { label: "Madiha Shahid", caseSlug: "madiha", context: "Operations & Strategy · WSS team", proof: "Ongoing operational support and strategy execution" }
] as const;

/** Pricing / services — short reassurance lines (Growth Hub: trust near price). */
export const pricingTrustBullets = [
  "Scope is agreed after the diagnostic call — no surprise lock-in on diagnosis or sprint.",
  "No pitch unless there's a genuine fit; the first job is naming the bottleneck.",
  "Deliverables and weekly cadence transfer to your team — not a slide deck handoff.",
  "Works alongside existing agencies or internal marketers when execution is already in motion."
] as const;

/** Proof page — scan results by commercial outcome type (links to case studies). */
export const proofResultsByType = [
  {
    label: "Positioning & narrative",
    summary: "Clearer category story and acquisition messaging before scaling spend.",
    caseId: "equoo"
  },
  {
    label: "Paid acquisition & landing",
    summary: "Search structure, landing foundations, and sign-up volume from one coherent system.",
    caseId: "ned"
  },
  {
    label: "Trust-led GTM foundations",
    summary: "Financial product narrative where credibility and clarity drive the next growth tests.",
    caseId: "nevly"
  },
  {
    label: "Message–market fit & channel fit",
    summary: "EdTech offer and channel story aligned so pipeline stops arriving in random bursts.",
    caseId: "lessonsup"
  },
  {
    label: "Marketing function from zero",
    summary: "First structured marketing operation for a complex B2B offer — not a deck, a running function.",
    caseId: "diadia-health"
  }
] as const;

export const credentialLogos = [
  { src: "/images/logos/google.webp", alt: "Google", label: "Google for Startups" },
  { src: "/images/logos/cambridge.webp", alt: "University of Cambridge", label: "Cambridge Judge" },
  { src: "/images/logos/growthmentor.png", alt: "GrowthMentor", label: "GrowthMentor" },
  { src: "/images/logos/newsflare.webp", alt: "Newsflare", label: "Newsflare" },
  { src: "/images/logos/peachy.png", alt: "Peachy", label: "Peachy" },
  { src: "/images/logos/techstars.webp", alt: "Techstars", label: "Techstars" },
  { src: "/images/logos/uk-space-agency.webp", alt: "UK Space Agency", label: "UK Space Agency" }
] as const;

export const headlineMetrics = [
  { value: "£6M+", label: "Paid acquisition spend managed" },
  { value: "500+", label: "Sign-ups from a single paid campaign" },
  { value: "479+", label: "Founder sessions · ★ 4.93" },
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
  "We connect results to the system built, not a single tactic taken out of context.",
  "Deliverables are practical working assets — playbooks, dashboards, and decision logs — not theatre or slides."
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
    answer: `Start with the Growth Bottleneck Scorecard or ${siteConfig.bookingLabel.replace(/^Book /, "book ")}. The first job is to identify the constraint before adding more activity.`
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
    quote: "The WSS diagnosis named the exact bottleneck we had been debating for months. The 90-day sprint that followed shipped 6 experiments and gave us a weekly cadence that still runs without Daniel today.",
    name: "James Madia",
    role: "Founder",
    company: "Madia (marketing agency partner)",
    result: "Acquisition system built, running without founder"
  },
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
    "£6M+ paid acquisition spend managed across SaaS, fintech, healthtech, EdTech"
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Mautic — email signup forms (replaces placeholder ConvertKit). Configure in
// Cloudflare Pages: PUBLIC_MAUTIC_BASE_URL, PUBLIC_MAUTIC_NEWSLETTER_FORM_ID
// Default form id "1" is a guess — set PUBLIC_MAUTIC_NEWSLETTER_FORM_ID in production to your real form.
// ──────────────────────────────────────────────────────────────────────────
const mauticBaseRaw =
  (typeof import.meta.env.PUBLIC_MAUTIC_BASE_URL === "string" && import.meta.env.PUBLIC_MAUTIC_BASE_URL.trim()) ||
  "https://comms.wescalestartups.com";
const mauticBase = mauticBaseRaw.replace(/\/$/, "");
const mauticNewsletterFormId =
  (typeof import.meta.env.PUBLIC_MAUTIC_NEWSLETTER_FORM_ID === "string" &&
    import.meta.env.PUBLIC_MAUTIC_NEWSLETTER_FORM_ID.trim()) ||
  "1";

export const mauticNewsletter = {
  baseUrl: mauticBase,
  formId: mauticNewsletterFormId,
  /** This Mautic host 404s on `/form/submit/{id}`; use `?formId=` (matches Mautic 7 embed docs). */
  submitUrl: `${mauticBase}/form/submit?formId=${encodeURIComponent(mauticNewsletterFormId)}`
} as const;
