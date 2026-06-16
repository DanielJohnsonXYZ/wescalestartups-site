const BOOKING_CALL_DURATION_PHRASE = "20 minutes" as const;

export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Fractional CMO for Post-PMF B2B SaaS",
  description:
    "Fractional CMO for post-PMF B2B SaaS and AI startups: diagnose the bottleneck, build the acquisition system, transfer the weekly rhythm so pipeline compounds without founder heroics.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  calUrl: "https://cal.wescalestartups.com/daniel-wescalestartups.com/15min",
  calLink: "daniel-wescalestartups.com/15min",
  bookingLabel: "Book a 20-minute Growth Audit",
  /** Inline copy: "In 30 minutes you'll…", "30 minutes. No deck." */
  bookingCallDurationPhrase: BOOKING_CALL_DURATION_PHRASE,
  bookingSubcopy: `Free · ${BOOKING_CALL_DURATION_PHRASE} · You'll leave with your biggest growth bottleneck named in plain English`,
  /** Hero, pricing, quiz — noun phrase (not the imperative CTA). */
  bookingCallShort: "20-minute Growth Audit call",
  /** What happens on the 20-minute diagnostic (booking reassurance). */
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
  /** Primary self-serve diagnostic — keep CTAs consistent sitewide. */
  scorecardName: "Growth Bottleneck Scorecard",
  scorecardTagline: "10 questions. 5 minutes. Find the constraint stopping pipeline from becoming predictable.",
  scorecardLabel: "Take the Growth Bottleneck Scorecard",
  scorecardLabelLong: "Take the Growth Bottleneck Scorecard",
  scorecardUrl: "/resources/growth-bottleneck-scorecard",
  /** When true, PodcastSeries JSON-LD and feed links are enabled on /podcast. */
  podcastLive: false,
  /** Newsletter — single name, description, and cadence sitewide. */
  newsletterName: "The Growth Bottleneck",
  newsletterDescription: "One practical note on SaaS pipeline, positioning, and founder-led growth systems.",
  newsletterFrequencyLine: "Biweekly — one note you can act on.",
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
  lastUpdated: "4 May 2026",
  /** ISO date for sitemap lastmod on static URLs (keep in sync when you refresh sitewide copy). */
  siteLastModified: "2026-05-03",
  ogImage: "/og/default.png",
  /**
   * Google Tag Manager — production container for wescalestartups.com only.
   * Do not use the personal-site container (GTM-5S892HK on danieljohnson.xyz).
   */
  gtmId: "GTM-TV6C7GS",
  /** Public X (Twitter) profile — used in Person schema sameAs */
  founderTwitter: "https://x.com/djohnsonxyz",
  /** Podcast hub on WSS — entity graph / sameAs */
  podcastUrl: "https://wescalestartups.com/podcast"
} as const;

/**
 * Canonical JSON-LD @id nodes — Person is rooted on danieljohnson.xyz; Organization on this domain.
 * Keeps Knowledge Graph / LLM entity resolution from splitting Daniel across two Person IDs.
 */
export const entityGraph = {
  danielPerson: "https://danieljohnson.xyz/#person",
  wssOrganization: `${siteConfig.siteUrl}/#organization`,
  wssWebsite: `${siteConfig.siteUrl}/#website`
} as const;

/** Named methodology — use on home, GTM, llms.txt, and press for consistent entity language. */
export const methodologyBrand = {
  shortName: "Growth Bottleneck System",
  tagline: "Diagnose the bottleneck, build the acquisition system, transfer the weekly cadence."
} as const;

/** Single source of truth for proof numbers — use everywhere (home, press, about, footer, llms). */
export const revenueInfluencedNote =
  "Aggregate revenue generated or influenced across client and operator-side engagements." as const;

export const canonicalProofMetrics = [
  { value: "£18M+", label: "Revenue influenced", note: revenueInfluencedNote },
  { value: "£6M+", label: "Paid acquisition spend managed" },
  { value: "479+", label: "Founder sessions" },
  { value: "4.93/5", label: "GrowthMentor rating" },
  { value: "20+", label: "Startups supported" },
  { value: "2", label: "Operator-side exits" }
] as const;

/** Short hero proof line (cold inbound) — links to a case study. */
export const homeHeroProofLine = {
  text: "Ned: 500+ sign-ups from paid search, 8.6% CTR — clear channel hierarchy.",
  href: "/case-studies/ned"
} as const;

/**
 * Per-URL sitemap lastmod (ISO date), aligned to last git change on the backing page/content.
 * Unlisted paths fall back to siteLastModified. Refresh entries when you edit a route.
 */
export const staticPathLastModified: Partial<Record<string, string>> = {
  "/": "2026-05-07",
  "/about": "2026-05-05",
  "/ai-growth-systems": "2026-05-01",
  "/book": "2026-05-04",
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
  "/fractional-cmo-vs-agency": "2026-05-04",
  "/growth-engine": "2026-05-01",
  "/gtm-strategy": "2026-05-03",
  "/how-it-works": "2026-05-04",
  "/how-we-work": "2026-05-01",
  "/industries": "2026-05-03",
  "/founder-led-growth": "2026-05-04",
  "/growth-operating-system": "2026-05-04",
  "/insights": "2026-05-04",
  "/llms.txt": "2026-05-03",
  "/llms-full.txt": "2026-05-03",
  "/markdown/home.md": "2026-05-03",
  "/press": "2026-05-04",
  "/pricing": "2026-05-03",
  "/podcast": "2026-05-04",
  "/insights/glossary": "2026-05-05",
  "/seo-content-strategy": "2026-05-05",
  "/privacy": "2026-05-03",
  "/proof": "2026-05-04",
  "/reports": "2026-05-01",
  "/resources": "2026-05-03",
  "/services": "2026-05-04",
  "/start-here": "2026-05-04",
  "/terms": "2026-05-03",
  "/testimonials": "2026-05-03",
  "/transfer": "2026-05-03",
  "/when-growth-plateaus": "2026-05-03",
  "/services/90-day-growth-sprint": "2026-05-04",
  "/services/acquisition-system-build": "2026-05-04",
  "/services/fractional-cmo": "2026-05-05",
  "/insights/what-is-a-fractional-cmo": "2026-05-05",
  "/insights/b2b-saas-gtm-strategy": "2026-05-05",
  "/insights/ai-native-gtm": "2026-05-05",
  "/insights/startup-growth-bottlenecks": "2026-05-05",
  "/services/growth-diagnosis": "2026-05-04",
  "/industries/ai-genai": "2026-05-03",
  "/industries/b2b-growth": "2026-05-03",
  "/industries/b2b-saas": "2026-05-03",
  "/industries/ecommerce": "2026-05-03",
  "/industries/edtech": "2026-05-03",
  "/industries/fintech": "2026-05-03",
  "/industries/healthtech": "2026-05-03",
  "/industries/saas-growth": "2026-05-03",
  "/industries/seed-to-series-b": "2026-05-03",
  "/industries/vc-support": "2026-05-04",
  "/about/daniel": "2026-05-11",
  "/team": "2026-05-12",
  "/speaking": "2026-05-11",
  "/workshops": "2026-05-11",
  "/fractional-cmo-vs-full-time-cmo": "2026-05-11",
  "/before-you-hire-a-head-of-marketing": "2026-05-11",
  "/before-you-hire-another-agency": "2026-05-11",
  "/growth-dashboard-template": "2026-05-11",
  "/board-growth-report-template": "2026-05-11",
  "/resources/growth-bottleneck-scorecard": "2026-05-11",
  "/resources/90-day-growth-sprint-planner": "2026-05-11",
  "/resources/vc-portfolio-growth-diagnosis": "2026-05-11",
  "/resources/acquisition-channel-matrix": "2026-05-11",
  "/resources/fractional-cmo-hiring-checklist": "2026-05-11",
  "/resources/ai-native-gtm-stack-map": "2026-05-11",
  "/resources/founder-led-growth-diagnostic": "2026-05-11",
  "/resources/agency-brief-template": "2026-05-11",
  "/resources/first-marketing-hire-scorecard": "2026-05-11",
  "/resources/ai-search-visibility-checklist": "2026-05-11"
};

/** Primary nav — same on every page (including homepage). */
export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/proof", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" }
] as const;

/** Footer and contextual links removed from top-level nav. */
export const footerContextualNav = [
  { href: "/growth-operating-system", label: "Growth Operating System" },
  { href: "/founder-led-growth", label: "Founder-led growth" },
  { href: "/podcast-guest-application", label: "Podcast guest application" },
  { href: "/contact", label: "Contact" }
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
  "/when-growth-plateaus": [
    { href: "/insights/pipeline-plateau-post-pmf", label: "Pipeline plateau after PMF" },
    { href: "/insights/systems-vs-activity-retainers", label: "Systems vs activity retainers" },
    { href: "/experimentation", label: "Experimentation discipline" },
    { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
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
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
  { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
  { href: "/insights/make-ai-search-visibility-citable", label: "Make AI search visibility citable" },
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/reports", label: "Report formats hub" }
];

/** /book — pre-call context. */
export const bookRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/resources", label: "Resources hub" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/proof", label: "Proof hub" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" }
];

/** /services/[slug] — related insights and hubs. */
export const serviceRelatedInsights: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "growth-diagnosis": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
    { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
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
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
  { href: "/insights/make-ai-search-visibility-citable", label: "AI search visibility" },
  { href: "/industries/b2b-saas", label: "B2B SaaS industry notes" },
  { href: "/industries/fintech", label: "FinTech industry notes" },
  { href: "/industries/healthtech", label: "HealthTech industry notes" },
  { href: "/industries/edtech", label: "EdTech industry notes" }
];

/** /insights hub — frameworks and proof. */
export const insightsHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/reports", label: "Report formats" },
  { href: "/resources/growth-bottleneck-scorecard", label: "Growth Bottleneck Scorecard" },
  { href: "/diagnose", label: "5-layer framework" },
  { href: "/proof", label: "Proof hub" },
  { href: "/resources", label: "Resources" },
  { href: "/industries/b2b-saas", label: "B2B SaaS market notes" },
  { href: "/industries/fintech", label: "FinTech market notes" },
  { href: "/industries/healthtech", label: "HealthTech market notes" },
  { href: "/industries/edtech", label: "EdTech market notes" },
  { href: "/industries/vc-support", label: "VC & portfolio marketing" }
];

/**
 * Content clusters for /insights: pillar insight id + spoke ids (src/content/insights/).
 * Aligns with Growth Hub strategy — four pillars, 6–8 articles per cluster over time.
 */
export const insightsThemeGroups: readonly {
  title: string;
  description: string;
  pillarId: string;
  spokeInsightIds: readonly string[];
}[] = [
  {
    title: "Fractional CMO",
    description:
      "When fractional leadership fits, how it differs from agencies and full-time hires, and what good looks like.",
    pillarId: "what-is-a-fractional-cmo",
    spokeInsightIds: ["when-to-hire-fractional-cmo"]
  },
  {
    title: "Startup GTM",
    description: "ICP, positioning, channel sequencing, and one acquisition rhythm instead of sprawl.",
    pillarId: "b2b-saas-gtm-strategy",
    spokeInsightIds: [
      "acquisition-system-beats-channel-sprawl",
      "systems-vs-activity-retainers",
      "pipeline-plateau-post-pmf"
    ]
  },
  {
    title: "AI-native marketing",
    description: "AI in research, content, outbound, and measurement — without losing citable expertise.",
    pillarId: "ai-native-gtm",
    spokeInsightIds: ["make-ai-search-visibility-citable"]
  },
  {
    title: "Growth diagnostics",
    description: "Name the bottleneck before spend: reporting, velocity, retention, and positioning drift.",
    pillarId: "startup-growth-bottlenecks",
    spokeInsightIds: ["diagnose-growth-bottleneck-before-spend", "what-a-growth-report-should-answer"]
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
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
  { href: "https://danieljohnson.xyz/", label: "Daniel Johnson — personal site" }
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
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
  { href: "/industries/vc-support", label: "VC & portfolio marketing support" }
];

/** /industries/[slug] — same links every sector. */
export const industryDetailRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/industries", label: "All industries" },
  { href: "/proof", label: "Proof hub" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
  { href: "/insights/make-ai-search-visibility-citable", label: "AI search visibility" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" }
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
  { href: "/testimonials", label: "Testimonials" },
  { href: "/diagnose", label: "5-layer diagnostic framework" },
  { href: "/ai-growth-systems", label: "AI growth systems" },
  { href: "/industries", label: "Industries" },
  { href: "/industries/b2b-saas", label: "B2B SaaS industry notes" },
  { href: "/industries/fintech", label: "FinTech industry notes" },
  { href: "/industries/healthtech", label: "HealthTech industry notes" },
  { href: "/industries/edtech", label: "EdTech industry notes" },
  { href: "/insights", label: "Insights" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
  { href: "/insights/make-ai-search-visibility-citable", label: "AI search visibility" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
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
  {
    label: "Ned",
    caseSlug: "ned",
    logoSrc: "/images/logos/ned-icon.png",
    relationship: "Paid client engagement",
    context: "Fintech · Fractional CMO",
    proof: "500+ sign-ups from paid search"
  },
  {
    label: "Healthtech (anonymous)",
    caseSlug: "healthtech-precision-medicine",
    logoSrc: "/images/logos/healthtech-anon.svg",
    relationship: "Paid client engagement",
    context: "Precision medicine · Fractional CMO",
    proof: "Marketing function built from zero"
  },
  {
    label: "eQuoo",
    caseSlug: "equoo",
    logoSrc: "/images/logos/equoo-logo.png",
    relationship: "Paid client engagement",
    context: "Healthtech · Fractional CMO",
    proof: "Clearer acquisition narrative"
  },
  {
    label: "LessonsUp",
    caseSlug: "lessonsup",
    logoSrc: "/images/logos/lessonsup-logo.svg",
    relationship: "Paid client engagement",
    context: "EdTech · Acquisition system build",
    proof: "Sharper message-market fit"
  },
  {
    label: "Nevly",
    caseSlug: "nevly",
    logoSrc: "/images/logos/nevly-logo.svg",
    relationship: "Paid client engagement",
    context: "Financial wellness · Sprint + CMO support",
    proof: "Trust-led GTM foundations"
  }
] as const;

/** Non-client marks on /proof — each logo paired with how the relationship should be read. */
export const proofEcosystemLogos = [
  {
    src: "/images/logos/google.webp",
    alt: "Google for Startups",
    name: "Google for Startups",
    relationship: "Mentor · startup programmes"
  },
  {
    src: "/images/logos/cambridge.webp",
    alt: "Cambridge Judge Business School",
    name: "Cambridge Judge",
    relationship: "Guest lecturing · entrepreneurship"
  },
  {
    src: "/images/logos/imperial.webp",
    alt: "Imperial College London",
    name: "Imperial College",
    relationship: "Invited growth teaching · startup support"
  },
  {
    src: "/images/logos/techstars.webp",
    alt: "Techstars",
    name: "Techstars",
    relationship: "Mentor · startup programmes"
  },
  {
    src: "/images/logos/uksa.webp",
    alt: "UK Space Agency",
    name: "UK Space Agency",
    relationship: "Startup ecosystem support"
  },
  {
    src: "/images/logos/general-assembly.webp",
    alt: "General Assembly",
    name: "General Assembly",
    relationship: "Growth teaching · startup education"
  },
  {
    src: "/images/logos/growthmentor-v2.jpg",
    alt: "GrowthMentor",
    name: "GrowthMentor",
    relationship: "External reviews · 479+ mentor sessions"
  }
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
    caseId: "healthtech-precision-medicine"
  }
] as const;

export const credentialLogos = [
  { src: "/images/logos/google.webp", alt: "Google", label: "Google for Startups" },
  { src: "/images/logos/cambridge.webp", alt: "University of Cambridge", label: "Cambridge Judge" },
  { src: "/images/logos/imperial.webp", alt: "Imperial College London", label: "Imperial College London" },
  { src: "/images/logos/techstars.webp", alt: "Techstars", label: "Techstars" },
  { src: "/images/logos/general-assembly.png", alt: "General Assembly", label: "General Assembly" },
  { src: "/images/logos/uksa.webp", alt: "UK Space Agency", label: "UK Space Agency" },
  { src: "/images/logos/growthmentor-v2.jpg", alt: "GrowthMentor", label: "GrowthMentor" },
  { src: "/images/logos/newsflare.webp", alt: "Newsflare", label: "Newsflare" },
  { src: "/images/logos/peachy.png", alt: "Peachy", label: "Peachy" }
] as const;

/** Compact list for proof/press grids (same numbers as canonicalProofMetrics). */
export const headlineMetrics = canonicalProofMetrics.map(({ value, label }) => ({ value, label }));

// Pain-led signals — these drive the hero subhead
export const painSignals = [
  "Growth still depends on you",
  "Pipeline is inconsistent",
  "You're spending, but don't know what to scale"
] as const;

// Decision layer — ladder: diagnose → sprint → system → embed
export const serviceDecision = [
  {
    condition: "You don't know the bottleneck yet",
    recommendation: "Start with Growth Diagnosis",
    href: "/services/growth-diagnosis",
    duration: "1 week"
  },
  {
    condition: "You need fast signal this quarter",
    recommendation: "90-Day Growth Sprint",
    href: "/services/90-day-growth-sprint",
    duration: "12 weeks"
  },
  {
    condition: "You've tried channels in isolation — now you need one rhythm",
    recommendation: "Acquisition System Build",
    href: "/services/acquisition-system-build",
    duration: "8–12 weeks"
  },
  {
    condition: "You need senior leadership inside the team",
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
    badge: "Best starting point",
    bestFor: "Post-PMF teams with traction but conflicting views on what blocks pipeline.",
    problem:
      "Activity across channels without a shared read on the binding constraint — so every bet feels political.",
    get: "A constraint map, evidence review, quick wins, and a 90-day recommendation.",
    keyDeliverables: ["Constraint map and evidence pack", "Quick-win shortlist", "Sequenced 90-day recommendation"],
    timeline: "1 week",
    price: "from £4k",
    cta: "Diagnose the bottleneck"
  },
  {
    title: "90-Day Growth Sprint",
    shortTitle: "Sprint",
    href: "/services/90-day-growth-sprint",
    badge: "Best for fast signal",
    bestFor: "Teams that need focused tests this quarter, not another broad strategy deck.",
    problem: "Lots of motion but too little learning — experiments aren't tied to one bottleneck.",
    get: "Experiment roadmap, weekly decisions, campaign/page iterations, transfer notes.",
    keyDeliverables: ["ICE-scored experiment backlog", "Weekly decision log", "Shipped tests + learnings pack"],
    timeline: "12 weeks",
    price: "from £15k",
    cta: "Run a growth sprint"
  },
  {
    title: "Acquisition System Build",
    shortTitle: "Build",
    href: "/services/acquisition-system-build",
    badge: "Flagship engagement",
    bestFor: "Post-PMF SaaS teams that have tried channels in isolation and need one repeatable pipeline rhythm.",
    problem: "Paid, content, outbound, and lifecycle don't roll up to one decision view or weekly cadence.",
    get: "Channel strategy, offer map, landing/campaign briefs, reporting and handoff.",
    keyDeliverables: ["Channel hierarchy & offer map", "Campaign/landing briefs", "Reporting rhythm + handoff pack"],
    timeline: "8–12 weeks",
    price: "from £30k",
    cta: "Build the acquisition system"
  },
  {
    title: "Fractional CMO",
    shortTitle: "Lead",
    href: "/services/fractional-cmo",
    badge: "Highest-touch engagement",
    bestFor: "Teams that need senior growth judgement before a full-time CMO hire.",
    problem: "The founder still owns every growth decision — there's no senior owner inside the team.",
    get: "Priorities, cadence, decision rules, team/agency direction, founder clarity.",
    keyDeliverables: ["Weekly growth cadence", "Board-ready reporting rhythm", "Agency/hire direction"],
    timeline: "3+ months",
    price: "from £8k/mo",
    cta: "Add fractional leadership"
  }
] as const;

// Lead magnets remain the secondary path. Each one has its own standalone
// landing page at /resources/{id} for SEO-crawlable, paid-ad-ready
// surfaces (rendered by /src/pages/resources/[slug].astro).
export const leadMagnets = [
  {
    id: "growth-bottleneck-scorecard",
    title: "Growth Bottleneck Scorecard",
    audience: "Post-PMF founders · ~5 minutes",
    description:
      "10 questions across the five constraints that usually block repeatable pipeline: positioning, acquisition, conversion, reporting, and team ownership.",
    href: "/resources/growth-bottleneck-scorecard",
    primary: true
  },
  {
    id: "90-day-growth-sprint-planner",
    title: "90-Day Growth Sprint Planner",
    audience: "Startup leadership teams",
    description: "Map a quarter of tests, owners, decision rules, and reporting so the team stops running disconnected activity.",
    href: "/resources/90-day-growth-sprint-planner"
  },
  {
    id: "vc-portfolio-growth-diagnosis",
    title: "VC Portfolio Growth Diagnosis Template",
    audience: "VCs and accelerator teams",
    description: "A portfolio workshop format for spotting whether a founder needs positioning, acquisition, team, or reporting help first.",
    href: "/resources/vc-portfolio-growth-diagnosis"
  },
  {
    id: "acquisition-channel-matrix",
    title: "Acquisition Channel Decision Matrix",
    audience: "Growth teams · 10 minutes",
    description: "Score paid, organic, partnerships, outbound, and content against your current stage, team capacity, and ICP clarity.",
    href: "/resources/acquisition-channel-matrix"
  },
  {
    id: "fractional-cmo-hiring-checklist",
    title: "Fractional CMO Hiring Checklist",
    audience: "Founders hiring senior GTM leadership",
    description: "The questions to ask, the artefacts to expect in week 1, and the red flags that mean the operator can't build a system.",
    href: "/resources/fractional-cmo-hiring-checklist"
  },
  {
    id: "ai-native-gtm-stack-map",
    title: "AI-Native GTM Stack Map",
    audience: "Teams adopting AI for GTM",
    description: "Map where generative and agentic AI accelerate research, messaging, experiments, and reporting in your current stack.",
    href: "/resources/ai-native-gtm-stack-map"
  },
  {
    id: "founder-led-growth-diagnostic",
    title: "Founder-led Growth Diagnostic",
    audience: "Founder-led GTM teams",
    description: "Structured prompts to see whether the bottleneck is positioning, channel fit, conversion, or team cadence.",
    href: "/resources/founder-led-growth-diagnostic"
  },
  {
    id: "agency-brief-template",
    title: "Agency Brief Template",
    audience: "Founders briefing agencies or freelancers",
    description: "One-page brief so channel partners get goals, constraints, proof, and success metrics in one pass.",
    href: "/resources/agency-brief-template"
  },
  {
    id: "first-marketing-hire-scorecard",
    title: "First Marketing Hire Scorecard",
    audience: "Founders hiring marketing",
    description: "Score whether you need a generalist, growth marketer, or leader — and what to test first.",
    href: "/resources/first-marketing-hire-scorecard"
  },
  {
    id: "ai-search-visibility-checklist",
    title: "AI Search Visibility Checklist",
    audience: "Teams cited in AI answers",
    description: "Make claims citable: sources, structure, and proof pages LLMs can quote.",
    href: "/resources/ai-search-visibility-checklist"
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

// WSS vs agency — explicit positioning (complementary to good agencies, not dismissive)
export const vsAgency = [
  {
    label: "What gets delivered",
    agency: "Channel execution (paid, SEO, content, creative)",
    wss: "A repeatable system the team (and partners) can run"
  },
  {
    label: "Strategy",
    agency: "You brief the channel; they ship",
    wss: "We diagnose the constraint, then align execution"
  },
  {
    label: "Reporting",
    agency: "Often channel metrics and delivery dashboards",
    wss: "Commercial signal — scale, stop, fix calls"
  },
  {
    label: "Decision rights",
    agency: "Strong on their remit",
    wss: "Shared on the outcome across channels"
  },
  {
    label: "When the engagement ends",
    agency: "Delivery pauses with the retainer",
    wss: "The operating rhythm continues without us"
  },
  {
    label: "Founder dependency",
    agency: "You may still own cross-channel calls",
    wss: "You step back as the system owns the cadence"
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
      "Agencies are the right choice when the channel plan is clear and you need production capacity. WSS works one level up: naming the bottleneck, aligning channels, installing weekly decision rules, and handing off a system your team or agency can run inside."
  },
  {
    question: "What is the first step?",
    answer: `Start with ${siteConfig.bookingLabel.toLowerCase()} or ${siteConfig.scorecardLabel.toLowerCase()} — ${siteConfig.scorecardTagline.toLowerCase()} The first job is to identify the constraint before adding more activity.`
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No. Anyone who guarantees marketing outcomes either doesn't understand the work or doesn't intend to do it. What we guarantee is the operating system — a constraint named, a plan to move it, and a weekly rhythm your team can run."
  },
  {
    question: "Who isn't this for?",
    answer:
      "Pre-PMF startups, founders looking for tactic-of-the-week, teams without internal execution capacity, and volume buyers who want more activity rather than fewer sharper decisions. If that's you, we'll say so on the call and point you somewhere better."
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
    category: "paid-client" as const,
    quote:
      "Daniel helped us move from scattered founder-led marketing to a clear weekly acquisition rhythm. Within 90 days we had a sharper ICP, cleaner reporting, and a campaign system the team could run without everything routing back to the founder.",
    name: "B2B SaaS founder",
    role: "CEO",
    company: "Paid engagement",
    result: "ICP, reporting, repeatable campaign rhythm"
  },
  {
    category: "paid-client" as const,
    quote:
      "The WSS diagnosis named the exact bottleneck we had been debating for months. The 90-day sprint that followed shipped 6 experiments and gave us a weekly cadence that still runs without Daniel today.",
    name: "James Madia",
    role: "Founder",
    company: "Madia (paid engagement)",
    result: "Acquisition system built, running without founder"
  },
  {
    category: "advisory" as const,
    quote: "Daniel offered sharp, practical advice with a clear focus on messaging and positioning. He helped me reframe the problem and target the right audience more effectively.",
    name: "Greg Weinstein",
    role: "Founder mentoring session",
    company: "MentorCruise review",
    result: "Messaging and positioning clarity"
  },
  {
    category: "advisory" as const,
    quote: "Daniel went above and beyond to share tactical feedback and help overhaul our approach to SEO.",
    name: "Dru Riley",
    role: "Growth mentoring session",
    company: "MentorCruise review",
    result: "SEO and content direction"
  },
  {
    category: "advisory" as const,
    quote: "Daniel helped me understand the importance of keyword research, building a Google Ads strategy, and targeting the right audience.",
    name: "Christian W K",
    role: "PPC mentoring session",
    company: "MentorCruise review",
    result: "Google Ads strategy"
  },
  {
    category: "advisory" as const,
    quote: "He asked insightful questions to understand my business goals and challenges. He came across as knowledgeable and experienced even in our short conversation.",
    name: "Joshua Pitzalis",
    role: "Founder mentoring session",
    company: "MentorCruise review",
    result: "Growth direction and next steps"
  },
  {
    category: "advisory" as const,
    quote: "Daniel brought me back to reality by underscoring the importance of fundamentals. He helped put growth marketing into perspective.",
    name: "Jawad Ahmed",
    role: "Marketing mentoring session",
    company: "MentorCruise review",
    result: "Growth fundamentals"
  },
  {
    category: "advisory" as const,
    quote: "Daniel's systematic approach to marketing is second-to-none.",
    name: "Ash Bailey",
    role: "Growth mentoring session",
    company: "MentorCruise review",
    result: "Systematic marketing support"
  },
  {
    category: "advisory" as const,
    quote: "Very helpful session. Daniel has a lot of experience and gives very concrete advice. Highly recommended.",
    name: "Tobias K",
    role: "Startup growth session",
    company: "GrowthMentor review",
    result: "Concrete growth direction"
  },
  {
    category: "advisory" as const,
    quote: "Daniel quickly identified the gaps in our acquisition funnel and gave me a clear prioritised action list. Saved us months of guesswork.",
    name: "Priya S",
    role: "B2B SaaS founder session",
    company: "GrowthMentor review",
    result: "Funnel clarity and prioritisation"
  },
  {
    category: "advisory" as const,
    quote: "Excellent session. Daniel cut through the noise and helped me focus on the one channel that actually made sense for our stage.",
    name: "Marco R",
    role: "Founder mentoring session",
    company: "GrowthMentor review",
    result: "Channel focus and clarity"
  }
] as const;

// First-30-days timeline (shared: home, how-it-works, fractional CMO)
export const first30Days = [
  {
    week: "Week 1",
    title: "Review growth evidence",
    body: "Funnel data, positioning, channels, team rhythm, and what's been tried. Plain-English view of where pipeline breaks."
  },
  {
    week: "Week 2",
    title: "Name the bottleneck",
    body: "Reset priorities around the binding constraint — positioning, acquisition, conversion, reporting, or ownership."
  },
  {
    week: "Week 3",
    title: "Build the first artefacts",
    body: "Channel hierarchy, reporting rhythm, campaign priorities — documented so the team can execute."
  },
  {
    week: "Week 4",
    title: "Install weekly cadence",
    body: "Weekly growth meeting format, owners, and decision log so momentum doesn't depend on the founder alone."
  }
] as const;

// Pricing — approved ranges for filtering bad-fit leads.
export const pricingTiers = [
  {
    name: "Growth Diagnosis",
    duration: "1 week",
    priceFrom: "from £4k",
    description: "Plain-English view of the bottleneck and a sequenced plan. Best when you don't know the constraint yet.",
    href: "/services/growth-diagnosis",
    tierBadge: "Best starting point"
  },
  {
    name: "90-Day Growth Sprint",
    duration: "12 weeks",
    priceFrom: "from £15k",
    description: "Audit → plan → ship 3–5 tests → transfer. Best pre-fundraise or post-launch when you need signal fast.",
    href: "/services/90-day-growth-sprint",
    tierBadge: "Most common paid step",
    mostPopular: true,
    popularRationale: "The usual bridge from the free Growth Audit — fast, scoped signal before a bigger commitment."
  },
  {
    name: "Acquisition System Build",
    duration: "8–12 weeks",
    priceFrom: "from £30k",
    description: "Channels, landing pages, offers, and reporting working as one system. Best after you've tested channels in isolation.",
    href: "/services/acquisition-system-build",
    tierBadge: "Flagship engagement"
  },
  {
    name: "Fractional CMO",
    duration: "3 months minimum",
    priceFrom: "from £8k/mo",
    description:
      "Senior growth leadership inside the team. Best for Seed–Series B teams not ready for a full-time CMO. Fractional CMO Plus from £12k/mo (~2 days/week) when you need deeper operating support.",
    href: "/services/fractional-cmo",
    tierBadge: "Highest-touch engagement",
    popularRationale: "Full strategic ownership with execution support when the team needs a senior growth seat."
  }
] as const;

// Daniel's "why I built this" — operator credibility, founder layer
export const founderStory = {
  intro: "I'm Daniel. After 15 years operating inside SaaS, fintech, healthtech and EdTech startups — including two exits — I kept seeing the same pattern: founders with great products who were stuck running marketing themselves because nobody else on the team could read the numbers and decide what to scale.",
  why: "I built WSS to be the operator I wished was there: senior judgement that diagnoses the real constraint, builds the system, and then transfers it so you don't need me forever.",
  credentials: [
    "Two operator-side startup exits",
    "£18M+ revenue influenced — aggregate across client and operator-side engagements",
    "£6M+ paid acquisition spend managed across SaaS, fintech, healthtech, EdTech",
    "479+ founder sessions · 4.93/5 on GrowthMentor",
    "MentorCruise Top Mentor — 5.0/5 across 30+ reviews",
    "Speaker at Cambridge Judge, Imperial College, Techstars, Google Launchpad"
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
