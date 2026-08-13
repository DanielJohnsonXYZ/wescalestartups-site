const BOOKING_CALL_DURATION_PHRASE = "20 minutes" as const;

export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Sustainable, High-Quality Growth for AI Startups & B2B SaaS",
  description:
    "We build the growth infrastructure AI startups and B2B SaaS teams need to hit the KPI that matters: customer research, experimentation and testing systems, built from first principles.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "/book",
  /** Public Cal.com booking page (self-hosted). */
  calUrl: "https://cal.wescalestartups.com/daniel/20min",
  /** Cal.com username/event path used by the inline embed (no leading slash). */
  calLink: "daniel/20min",
  calOrigin: "https://cal.wescalestartups.com",
  /**
   * Founder community offered after Growth Audit bookings (Cal event description,
   * reminder/follow-up emails, and /book/thanks). WhatsApp is the live join path.
   */
  growingPains: {
    name: "Growing Pains",
    blurb: "A community for founders to discuss actionable growth.",
    whatsappUrl: "https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn",
    whatsappLabel: "Join the WhatsApp group"
  },
  bookingLabel: "Book a Growth Audit",
  /** Inline copy: "In 20 minutes you'll…", "20 minutes. No deck." */
  bookingCallDurationPhrase: BOOKING_CALL_DURATION_PHRASE,
  bookingSubcopy: `Free · ${BOOKING_CALL_DURATION_PHRASE} · You'll leave with your biggest growth bottleneck named in plain English`,
  /** Hero, pricing, quiz, noun phrase (not the imperative CTA). Duration lives in microcopy, not the button. */
  bookingCallShort: "Growth Audit call",
  /** What happens on the 20-minute diagnostic (booking reassurance). */
  bookingCallPhases: [
    { phase: "First ~3 minutes", detail: "Context, stage, traction, channels, and what you think is blocking growth." },
    {
      phase: "Next ~8 minutes",
      detail: "Bottleneck read, is the constraint positioning, acquisition, conversion, reporting, or team ownership?"
    },
    {
      phase: "~6 minutes",
      detail: "Options, Growth Diagnosis, Sprint, System Build, Fractional CMO, or the right referral if we are not a fit."
    },
    { phase: "Last ~3 minutes", detail: "Clear next step. No pitch unless there is a genuine fit." }
  ],
  /** Short line near booking CTAs (header title, footer), Growth Hub: call reassurance. */
  bookingCallReassurance: `Bring your current bottleneck. In ${BOOKING_CALL_DURATION_PHRASE} we name whether the constraint is positioning, acquisition, conversion, reporting, or team ownership, no pitch unless there's a clear fit.`,
  /** Primary self-serve diagnostic, keep CTAs consistent sitewide. */
  scorecardName: "Growth Bottleneck Scorecard",
  scorecardTagline: "12 questions. 4 minutes. Find the commercial capability that still depends on the founder.",
  scorecardLabel: "Take the Growth Bottleneck Scorecard",
  scorecardLabelLong: "Take the Growth Bottleneck Scorecard",
  scorecardUrl: "/resources/growth-dependency",
  /** When true, PodcastSeries JSON-LD and feed links are enabled on /podcast. */
  podcastLive: false,
  /** Show name, YouTube channel, and copy for /podcast and guest surfaces. */
  podcastName: "Luck Doesn't Scale",
  podcastYoutubeHandle: "@wescalestartups",
  podcastYoutubeUrl: "https://www.youtube.com/@wescalestartups",
  podcastYoutubeChannelUrl: "https://www.youtube.com/channel/UCxJgt06e3L0Y5XOJyIB0iVw",
  podcastTagline: "AI is rewriting the startup growth playbook.",
  podcastDescription:
    "Luck Doesn't Scale explores what AI means for startup growth in practice: which old assumptions are breaking, what AI makes possible, what remains uniquely human, and what leaders should do differently. Hosted by Daniel Johnson, founder of We Scale Startups.",
  /** Newsletter, single name, description, and cadence sitewide. */
  newsletterName: "The Growth Bottleneck",
  newsletterDescription: "One practical note on SaaS pipeline, positioning, and founder-led growth systems.",
  newsletterFrequencyLine: "Biweekly, one note you can act on.",
  email: "daniel@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  growthMentor: "https://www.growthmentor.com/mentors/daniel-johnson",
  growthMentorReviews: "https://www.growthmentor.com/mentors/daniel-johnson#reviews-section",
  mentorCruise: "https://mentorcruise.com/mentor/danieljohnson/",
  danielSite: "https://danieljohnson.xyz",
  lastUpdated: "6 August 2026",
  /** ISO date for sitemap lastmod on static URLs (keep in sync when you refresh sitewide copy). */
  siteLastModified: "2026-08-06",
  ogImage: "/og/default.png",
  /**
   * Google Tag Manager, production container for wescalestartups.com only.
   * Do not use the personal-site container (GTM-5S892HK on danieljohnson.xyz).
   */
  gtmId: "GTM-TV6C7GS",
  /** Bing Webmaster verification token. Set PUBLIC_BING_SITE_VERIFICATION in the host env;
   *  the meta tag only renders when present (Bing index feeds ChatGPT Search + Copilot). */
  bingSiteVerification:
    (typeof import.meta.env.PUBLIC_BING_SITE_VERIFICATION === "string" &&
      import.meta.env.PUBLIC_BING_SITE_VERIFICATION.trim()) ||
    "",
  /** Public X (Twitter) profile, used in Person schema sameAs */
  founderTwitter: "https://x.com/djohnsonxyz",
  /** Podcast hub on WSS, entity graph / sameAs */
  podcastUrl: "https://wescalestartups.com/podcast"
} as const;

/**
 * Canonical JSON-LD @id nodes, Person is rooted on danieljohnson.xyz; Organization on this domain.
 * Keeps Knowledge Graph / LLM entity resolution from splitting Daniel across two Person IDs.
 */
export const entityGraph = {
  danielPerson: "https://danieljohnson.xyz/#person",
  wssOrganization: `${siteConfig.siteUrl}/#organization`,
  wssWebsite: `${siteConfig.siteUrl}/#website`
} as const;

/** Named methodology, use on home, GTM, llms.txt, and press for consistent entity language. */
export const methodologyBrand = {
  shortName: "Growth Bottleneck System",
  tagline: "Diagnose the bottleneck, build the acquisition system, transfer the weekly cadence."
} as const;

/** Single source of truth for proof numbers, use everywhere (home, press, about, footer, llms). */
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

/** Short hero proof line (cold inbound), links to a case study. */
/**
 * Per-URL sitemap lastmod (ISO date), aligned to last git change on the backing page/content.
 * Unlisted paths fall back to siteLastModified. Refresh entries when you edit a route.
 */
export const staticPathLastModified: Partial<Record<string, string>> = {
  "/": "2026-07-26",
  "/about": "2026-07-26",
  "/ai-growth-systems": "2026-05-01",
  "/ai-sameness-scorecard": "2026-07-26",
  "/book": "2026-08-09",
  "/book/thanks": "2026-08-13",
  "/wss-calendar": "2026-08-09",
  "/build": "2026-05-03",
  "/case-studies": "2026-05-03",
  "/contact": "2026-05-03",
  "/diagnose": "2026-05-03",
  "/faq": "2026-07-26",
  "/alternatives": "2026-07-26",
  "/alternatives/marketing-agency": "2026-07-26",
  "/alternatives/full-time-cmo": "2026-07-26",
  "/alternatives/kalungi": "2026-07-26",
  "/alternatives/chief-outsiders": "2026-07-26",
  "/alternatives/nogood": "2026-07-26",
  "/compare/fractional-cmo-providers": "2026-07-26",
  "/locations": "2026-07-26",
  "/locations/london": "2026-07-26",
  "/evidence": "2026-07-26",
  "/research": "2026-07-26",
  "/research/founder-session-patterns": "2026-07-26",
  "/benchmarks": "2026-07-26",
  "/benchmarks/uk-fractional-cmo-pricing": "2026-07-26",
  "/experimentation": "2026-05-03",
  "/growth-course": "2026-05-04",
  "/wss-scale-score": "2026-05-04",
  "/first-30-days": "2026-05-03",
  "/fractional-cmo-vs-agency": "2026-05-04",
  "/gtm-strategy": "2026-05-03",
  "/how-it-works": "2026-05-04",
  "/industries": "2026-07-26",
  "/founder-led-growth": "2026-05-04",
  
  "/healthtech-buyer-confidence-matrix": "2026-07-26",
  "/hiring-readiness-scorecard": "2026-07-26",
  "/post-raise": "2026-07-13",
  "/ai-growth-audit": "2026-07-15",
  "/portfolio-growth-readiness": "2026-07-26",
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
  "/resources": "2026-08-06",
  "/services": "2026-07-26",
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
  "/facts/daniel-johnson": "2026-07-26",
  "/facts/we-scale-startups": "2026-07-26",
  "/team": "2026-05-12",
  "/speaking": "2026-05-11",
  "/workshops": "2026-05-11",
  "/fractional-cmo-vs-full-time-cmo": "2026-05-11",
  "/before-you-hire-a-head-of-marketing": "2026-05-11",
  "/before-you-hire-another-agency": "2026-05-11",
  "/growth-dashboard-template": "2026-05-11",
  "/board-growth-report-template": "2026-05-11",
  
  "/resources/growth-dependency": "2026-08-06",
  "/resources/customer-segment": "2026-08-06",
  "/resources/positioning": "2026-08-06",
  "/resources/gtm-leak": "2026-08-06",
  "/resources/weekly-focus": "2026-08-06",
  "/resources/90-day-growth-sprint-planner": "2026-08-06",
  "/resources/vc-portfolio-growth-diagnosis": "2026-05-11",
  "/resources/acquisition-channel-matrix": "2026-05-11",
  "/resources/fractional-cmo-hiring-checklist": "2026-05-11",
  "/resources/ai-native-gtm-stack-map": "2026-05-11",
  
  "/resources/agency-brief-template": "2026-05-11",
  "/resources/first-marketing-hire-scorecard": "2026-05-11",
  "/resources/ai-search-visibility-checklist": "2026-05-11"
};

/** Primary nav, same on every page (including homepage). */
export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/proof", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" }
] as const;

/** Strategic pillar pages → related insights (internal links + related reading section). */
export const strategicPageRelatedInsights: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "/how-it-works": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/growth-operating-system": [
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
    { href: "/insights/fractional-cmo-cost-uk", label: "Fractional CMO cost (UK)" },
    { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" }
  ],
  "/when-growth-plateaus": [
    { href: "/insights/pipeline-plateau-post-pmf", label: "Pipeline plateau after PMF" },
    { href: "/insights/systems-vs-activity-retainers", label: "Systems vs activity retainers" },
    { href: "/experimentation", label: "Experimentation discipline" },
    { href: "/resources/growth-dependency", label: "Growth Bottleneck Scorecard" },
    { href: "/services", label: "Services" }
  ]
};

/** /diagnose, related reports and insights (internal crawl). */
export const diagnoseRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
  { href: "/reports", label: "Report formats (bottleneck, system, AI visibility)" }
];

/** /resources, frameworks, quiz, reports (internal crawl). */
export const resourcesRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/resources/growth-dependency", label: "Growth Bottleneck Scorecard" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose the bottleneck before spend" },
  { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
  { href: "/insights/make-ai-search-visibility-citable", label: "Make AI search visibility citable" },
  { href: "/growth-course", label: "Free growth course" },
  { href: "/newsletter", label: siteConfig.newsletterName },
  { href: "/reports", label: "Report formats hub" }
];

/** /services/[slug], related insights and hubs. */
export const serviceRelatedInsights: Partial<Record<string, readonly { href: string; label: string }[]>> = {
  "growth-diagnosis": [
    { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
    { href: "/insights/what-a-growth-report-should-answer", label: "What a growth report should answer" },
    { href: "/resources/growth-dependency", label: "Growth Bottleneck Scorecard" },
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
    { href: "/how-it-works", label: "How engagements work" }
  ]
};

/** /pricing, decision context and self-serve paths. */
export const pricingRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/services", label: "Compare the four engagements" },
  { href: "/fractional-cmo-vs-agency", label: "Fractional CMO vs agency" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/start-here", label: "Start here" },
  { href: "/resources", label: "Resources and scorecard" }
];

/** /services hub, pricing, proof, diagnosis. */
export const servicesHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/pricing", label: "Pricing ranges" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/proof", label: "Proof hub" },
  { href: "/resources/growth-dependency", label: "Growth Bottleneck Scorecard" },
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/diagnose-growth-bottleneck-before-spend", label: "Diagnose before spend" },
  { href: "/insights/make-ai-search-visibility-citable", label: "AI search visibility" },
  { href: "/ai-growth-audit", label: "AI Growth Audit" },
  { href: "/before-you-hire-another-agency", label: "Before you hire another agency" },
  { href: "/industries/saas-growth", label: "SaaS growth industry notes" },
  { href: "/industries/fintech", label: "FinTech industry notes" },
  { href: "/industries/healthtech", label: "HealthTech industry notes" },
  { href: "/industries/edtech", label: "EdTech industry notes" }
];

/** /insights hub, frameworks and proof. */
export const insightsHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/reports", label: "Report formats" },
  { href: "/resources/growth-dependency", label: "Growth Bottleneck Scorecard" },
  { href: "/diagnose", label: "5-layer framework" },
  { href: "/proof", label: "Proof hub" },
  { href: "/resources", label: "Resources" },
  { href: "/industries/saas-growth", label: "SaaS growth market notes" },
  { href: "/industries/fintech", label: "FinTech market notes" },
  { href: "/industries/healthtech", label: "HealthTech market notes" },
  { href: "/industries/edtech", label: "EdTech market notes" },
  { href: "/industries/vc-support", label: "VC & portfolio marketing" }
];

/**
 * Content clusters for /insights: pillar insight id + spoke ids (src/content/insights/).
 * Aligns with Growth Hub strategy, four pillars, 6–8 articles per cluster over time.
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
    spokeInsightIds: ["when-to-hire-fractional-cmo", "fractional-cmo-cost-uk"]
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
    description: "AI in research, content, outbound, and measurement, without losing citable expertise.",
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

/** /testimonials, proof and next steps. */
export const testimonialsRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/book", label: siteConfig.bookingLabel },
  { href: "/resources", label: "Resources" }
];

/** Case study detail pages, standard crawl paths. */
export const caseStudyRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "All case studies" },
  { href: "/services", label: "Compare services" },
  { href: "/book", label: siteConfig.bookingLabel }
];

/** /proof, cases, services, press. */
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
  { href: "/facts/daniel-johnson", label: "Verified Daniel Johnson facts" },
  { href: "https://danieljohnson.xyz/", label: "Daniel Johnson, personal site" }
];

/** /contact. */
export const contactRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/book", label: siteConfig.bookingLabel },
  { href: "/start-here", label: "Start here" },
  { href: "/resources", label: "Resources" },
  { href: "/proof", label: "Proof hub" },
  { href: "/press", label: "Press kit" }
];

export const industriesHubRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/services", label: "Services" },
  { href: "/fractional-cmo-vs-agency", label: "WSS vs agency" },
  { href: "/insights/acquisition-system-beats-channel-sprawl", label: "Acquisition system vs channel sprawl" },
  { href: "/insights/when-to-hire-fractional-cmo", label: "When to hire a fractional CMO" },
  { href: "/industries/vc-support", label: "VC & portfolio marketing support" }
];

/** /industries/[slug], same links every sector. */
/**
 * Industry slugs that stay indexable (each backed by a named case study + unique proof).
 * The rest are noindexed in `industries/[slug].astro` and must be EXCLUDED from the
 * sitemap to avoid "noindex URL submitted in sitemap" warnings, keep both in sync here.
 */
export const indexableIndustrySlugs = ["saas-growth", "fintech", "healthtech", "edtech", "vc-support"] as const;

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
  { href: "/how-it-works", label: "How it works" }
];

/** /press, internal verification paths. */
export const pressRelatedReading: readonly { href: string; label: string }[] = [
  { href: "/proof", label: "Proof hub" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About WSS" },
  { href: "/contact", label: "Contact" }
];

/** Legal pages, useful internal links (exclude self on each page). */
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
    label: "Healthtech (anonymous)",
    caseSlug: "healthtech-precision-medicine",
    logoSrc: "/images/logos/healthtech-anon.svg",
    relationship: "Paid client engagement",
    context: "Precision medicine · Fractional CMO",
    proof: "Marketing function built from zero · CEO on weekly review"
  },
  {
    label: "Ned",
    caseSlug: "ned",
    logoSrc: "/images/logos/ned-icon.png",
    relationship: "Paid client engagement",
    context: "Fintech · Paid acquisition + SEO",
    proof: "500+ sign-ups from paid search"
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

/** Non-client marks on /proof, each logo paired with how the relationship should be read. */
export const proofEcosystemLogos = [
  {
    src: "/images/logos/google.webp",
    width: 544,
    height: 184,
    alt: "Google for Startups",
    name: "Google for Startups",
    relationship: "Mentor · startup programmes"
  },
  {
    src: "/images/logos/cambridge.webp",
    width: 544,
    height: 184,
    alt: "Cambridge Judge Business School",
    name: "Cambridge Judge",
    relationship: "Guest lecturing · entrepreneurship"
  },
  {
    src: "/images/logos/imperial.webp",
    width: 520,
    height: 57,
    alt: "Imperial College London",
    name: "Imperial College",
    relationship: "Invited growth teaching · startup support"
  },
  {
    src: "/images/logos/techstars.webp",
    width: 260,
    height: 104,
    alt: "Techstars",
    name: "Techstars",
    relationship: "Mentor · startup programmes"
  },
  {
    src: "/images/logos/uksa.webp",
    width: 360,
    height: 101,
    alt: "UK Space Agency",
    name: "UK Space Agency",
    relationship: "Startup ecosystem support"
  },
  {
    src: "/images/logos/general-assembly.webp",
    width: 219,
    height: 230,
    alt: "General Assembly",
    name: "General Assembly",
    relationship: "Growth teaching · startup education"
  },
  {
    src: "/images/logos/growthmentor-v2.jpg",
    width: 225,
    height: 225,
    alt: "GrowthMentor",
    name: "GrowthMentor",
    relationship: "External reviews · 479+ mentor sessions"
  }
] as const;

/** Pricing / services, short reassurance lines (Growth Hub: trust near price). */
export const pricingTrustBullets = [
  "Scope is agreed after the diagnostic call, no surprise lock-in on diagnosis or sprint.",
  "No pitch unless there's a genuine fit; the first job is naming the bottleneck.",
  "Deliverables and weekly cadence transfer to your team, not a slide deck handoff.",
  "Works alongside existing agencies or internal marketers when execution is already in motion."
] as const;

/** Proof page, scan results by commercial outcome type (links to case studies). */
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
    summary: "First structured marketing operation for a complex B2B offer, not a deck, a running function.",
    caseId: "healthtech-precision-medicine"
  }
] as const;

/** Compact list for proof/press grids (same numbers as canonicalProofMetrics). */
export const headlineMetrics = canonicalProofMetrics.map(({ value, label }) => ({ value, label }));

// Decision layer, ladder: diagnose → sprint → system → embed
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
    condition: "You've tried channels in isolation, now you need one rhythm",
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
      "Activity across channels without a shared read on the binding constraint, so every bet feels political.",
    get: "A constraint map, evidence review, quick wins, and a 90-day recommendation.",
    keyDeliverables: ["Constraint map and evidence pack", "Quick-win shortlist", "Sequenced 90-day recommendation"],
    timeline: "1 week",
    price: "£2k–£4k",
    cta: "Diagnose the bottleneck"
  },
  {
    title: "90-Day Growth Sprint",
    shortTitle: "Sprint",
    href: "/services/90-day-growth-sprint",
    badge: "Best for fast signal",
    bestFor: "Teams that need focused tests this quarter, not another broad strategy deck.",
    problem: "Lots of motion but too little learning, experiments aren't tied to one bottleneck.",
    get: "Experiment roadmap, weekly decisions, campaign/page iterations, transfer notes.",
    keyDeliverables: ["ICE-scored experiment backlog", "Weekly decision log", "Shipped tests + learnings pack"],
    timeline: "12 weeks",
    price: "£8k–£12k",
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
    price: "£15k–£25k",
    cta: "Build the acquisition system"
  },
  {
    title: "Fractional CMO",
    shortTitle: "Lead",
    href: "/services/fractional-cmo",
    badge: "Highest-touch engagement",
    bestFor: "Teams that need senior growth judgement before a full-time CMO hire.",
    problem: "The founder still owns every growth decision, there's no senior owner inside the team.",
    get: "Priorities, cadence, decision rules, team/agency direction, founder clarity.",
    keyDeliverables: ["Weekly growth cadence", "Board-ready reporting rhythm", "Agency/hire direction"],
    timeline: "3+ months",
    price: "£5k–£8k/mo",
    cta: "Add fractional leadership"
  }
] as const;

// Lead magnets remain the secondary path. Each one has its own standalone
// landing page at /resources/{id} for SEO-crawlable, paid-ad-ready
// surfaces (rendered by /src/pages/resources/[slug].astro).
export const leadMagnets = [
  {
    id: "90-day-growth-sprint-planner",
    title: "90-Day Growth Experiment Planner",
    audience: "Post-PMF startup leadership teams",
    description: "Turn one commercial priority into a 13-week sequence of experiments, owners, decision rules, and reusable learning.",
    href: "/resources/90-day-growth-sprint-planner",
    downloadPath: undefined
  },
  {
    id: "vc-portfolio-growth-diagnosis",
    title: "VC Portfolio Growth Diagnosis Template",
    audience: "VCs and accelerator teams",
    description: "A portfolio workshop format for spotting whether a founder needs positioning, acquisition, team, or reporting help first.",
    href: "/resources/vc-portfolio-growth-diagnosis",
    downloadPath: "/downloads/guides/vc-portfolio-growth-diagnosis.md"
  },
  {
    id: "acquisition-channel-matrix",
    title: "Acquisition Channel Decision Matrix",
    audience: "Growth teams · 10 minutes",
    description: "Score paid, organic, partnerships, outbound, and content against your current stage, team capacity, and ICP clarity.",
    href: "/resources/acquisition-channel-matrix",
    downloadPath: "/downloads/guides/acquisition-channel-matrix.md"
  },
  {
    id: "fractional-cmo-hiring-checklist",
    title: "Fractional CMO Hiring Checklist",
    audience: "Founders hiring senior GTM leadership",
    description: "The questions to ask, the artefacts to expect in week 1, and the red flags that mean the operator can't build a system.",
    href: "/resources/fractional-cmo-hiring-checklist",
    downloadPath: "/downloads/guides/fractional-cmo-hiring-checklist.md"
  },
  {
    id: "ai-native-gtm-stack-map",
    title: "AI-Native GTM Stack Map",
    audience: "Teams adopting AI for GTM",
    description: "Map where generative and agentic AI accelerate research, messaging, experiments, and reporting in your current stack.",
    href: "/resources/ai-native-gtm-stack-map",
    downloadPath: "/downloads/guides/ai-native-gtm-stack-map.md"
  },
  {
    id: "agency-brief-template",
    title: "Agency Brief Template",
    audience: "Founders briefing agencies or freelancers",
    description: "A one-page agency brief that gives channel partners the goals, constraints, proof, decision rules, and success metrics they need in one pass.",
    href: "/resources/agency-brief-template",
    downloadPath: "/downloads/guides/agency-brief-template.md"
  },
  {
    id: "first-marketing-hire-scorecard",
    title: "First Marketing Hire Scorecard",
    audience: "Founders hiring marketing",
    description: "Score whether your next marketing hire should be a generalist, growth marketer, or leader, and define what they need to test first.",
    href: "/resources/first-marketing-hire-scorecard",
    downloadPath: "/downloads/guides/first-marketing-hire-scorecard.md"
  },
  {
    id: "ai-search-visibility-checklist",
    title: "AI Search Visibility Checklist",
    audience: "Teams cited in AI answers",
    description: "Make your claims citable with clear sources, structured answers, entity signals, and proof pages that search engines and AI assistants can quote.",
    href: "/resources/ai-search-visibility-checklist",
    downloadPath: "/downloads/guides/ai-search-visibility-checklist.md"
  }
] as const;

export const proofStandards = [
  "We separate before, work done, and result so you can see what changed.",
  "We avoid anonymous claims where there is no permissioned proof.",
  "We connect results to the system built, not a single tactic taken out of context.",
  "Deliverables are practical working assets, playbooks, dashboards, and decision logs, not theatre or slides."
] as const;

// Who this is NOT for, disqualifies bad-fit leads, increases trust
export const notFor = [
  {
    title: "Pre-PMF startups",
    body: "If you're still searching for product-market fit, growth marketing won't fix that. We work with teams that already have traction."
  },
  {
    title: "Founders looking for a tactic of the week",
    body: "We don't sell hacks. The work is diagnosis, system design, and a few sharp bets, not 14 channels at once."
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

// WSS vs agency, explicit positioning (complementary to good agencies, not dismissive)
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
    wss: "Commercial signal, scale, stop, fix calls"
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
      "We build the infrastructure startups need to hit the growth KPI they actually care about, working from first principles instead of recycled playbooks. Customer research, an experiment engine and a testing rhythm, engineered around your number and handed to your team to run."
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
    question: "How much does We Scale Startups cost?",
    answer:
      "Public UK ranges: Growth Diagnosis £2k–£4k, 90-Day Growth Sprint £8k–£12k, Acquisition System Build £15k–£25k, Fractional CMO £5k–£8k/mo (Plus £7.5k–£10k/mo for ~2 days/week). Where you land in the range depends on team, channel mix, and execution depth."
  },
  {
    question: "What is the first step?",
    answer: `Get in touch for a free 20-minute call, or take the ${siteConfig.scorecardName}: 12 questions, 4 minutes. Either way, the first job is to understand the customer and name the constraint before adding more activity.`
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No. Anyone who guarantees marketing outcomes either doesn't understand the work or doesn't intend to do it. What we guarantee is the operating system, a constraint named, a plan to move it, and a weekly rhythm your team can run."
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

// Optional per-testimonial photo: add `image: "/images/testimonials/<name>.webp"`
// to any entry below (drop the file in public/images/testimonials/) and the
// homepage avatar automatically shows the photo instead of initials.
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
  // Verified against GrowthMentor reviews (danieljohnson.xyz/testimonials, 2026-07-13).
  // paid-advisory = paid advisory work (also left a public GrowthMentor review).
  // advisory = mentoring-platform sessions.
  {
    category: "paid-advisory" as const,
    quote:
      "Daniel offered sharp, practical advice during our session, with a clear focus on messaging and positioning. He helped me reframe the problem, pushing me to dig deeper into the why behind our customers' needs.",
    name: "Greg Weinstein",
    image: "/images/testimonials/greg-weinstein.webp",
    role: "Paid founder advisory",
    company: "GrowthMentor review",
    result: "Messaging and positioning clarity"
  },
  {
    category: "paid-advisory" as const,
    quote: "Daniel went above and beyond to share tactical feedback and help overhaul our approach to SEO.",
    name: "Dru Riley",
    image: "/images/testimonials/dru-riley.webp",
    role: "Paid growth advisory",
    company: "GrowthMentor review",
    result: "SEO and content direction"
  },
  {
    category: "advisory" as const,
    quote:
      "Spoke with Daniel on PPC and building a Google Ads strategy was an incredibly valuable experience. He helped me understand the importance of keyword research and targeting the right audience.",
    name: "Christian W K",
    image: "/images/testimonials/christian-w-k.webp",
    role: "PPC mentoring session",
    company: "GrowthMentor review",
    result: "Google Ads strategy"
  },
  {
    category: "advisory" as const,
    quote:
      "My initial call with Daniel was very promising. He asked insightful questions to understand my business goals and challenges. Came across as knowledgeable and experienced, even in our short conversation.",
    name: "Joshua Pitzalis",
    image: "/images/testimonials/joshua-pitzalis.webp",
    role: "Founder mentoring session",
    company: "GrowthMentor review",
    result: "Growth direction and next steps"
  },
  {
    category: "paid-advisory" as const,
    quote:
      "Daniel Johnson is the \"no fluff\", straight-to-the-point person to talk to for marketing. Daniel brought me back to reality by underscoring the importance of fundamentals.",
    name: "Jawad Ahmed",
    image: "/images/testimonials/jawad-ahmed.webp",
    role: "Paid marketing advisory",
    company: "GrowthMentor review",
    result: "Growth fundamentals"
  },
  {
    category: "paid-advisory" as const,
    quote: "Daniel helped me enormously (and I don't say that lightly!). Daniel's systematic approach to marketing is second-to-none.",
    name: "Ash Bailey",
    role: "Paid growth advisory",
    company: "GrowthMentor review",
    result: "Systematic marketing support"
  },
  {
    category: "advisory" as const,
    quote:
      "Daniel is a pro! Within 10 mins he identified the gaps in our funnel and actual problem that I oversaw. Looking forward to multiple follow-up calls!",
    name: "Egor Donde",
    image: "/images/testimonials/egor-donde.webp",
    role: "Founder mentoring session",
    company: "GrowthMentor review",
    result: "Funnel gap diagnosis"
  },
  {
    category: "paid-advisory" as const,
    quote:
      "In just a short space of time, Daniel provided insane value, covering exactly how to structure and develop a GTM strategy end-to-end and providing insights that would have taken much longer to figure out alone.",
    name: "Indie",
    role: "Paid founder advisory",
    company: "GrowthMentor review",
    result: "End-to-end GTM clarity"
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
    body: "Reset priorities around the binding constraint, positioning, acquisition, conversion, reporting, or ownership."
  },
  {
    week: "Week 3",
    title: "Build the first artefacts",
    body: "Channel hierarchy, reporting rhythm, campaign priorities, documented so the team can execute."
  },
  {
    week: "Week 4",
    title: "Install weekly cadence",
    body: "Weekly growth meeting format, owners, and decision log so momentum doesn't depend on the founder alone."
  }
] as const;

// Pricing, approved ranges for filtering bad-fit leads.
export const pricingTiers = [
  {
    name: "Growth Diagnosis",
    duration: "1 week",
    priceFrom: "£2k–£4k",
    description: "Plain-English view of the bottleneck and a sequenced plan. Best when you don't know the constraint yet.",
    href: "/services/growth-diagnosis",
    tierBadge: "Best starting point"
  },
  {
    name: "90-Day Growth Sprint",
    duration: "12 weeks",
    priceFrom: "£8k–£12k",
    description: "Audit → plan → ship 3–5 tests → transfer. Best pre-fundraise or post-launch when you need signal fast.",
    href: "/services/90-day-growth-sprint",
    tierBadge: "Most common paid step",
    mostPopular: true,
    popularRationale: "The usual bridge from the free Growth Audit, fast, scoped signal before a bigger commitment."
  },
  {
    name: "Acquisition System Build",
    duration: "8–12 weeks",
    priceFrom: "£15k–£25k",
    description: "Channels, landing pages, offers, and reporting working as one system. Best after you've tested channels in isolation.",
    href: "/services/acquisition-system-build",
    tierBadge: "Flagship engagement"
  },
  {
    name: "Fractional CMO",
    duration: "3 months minimum",
    priceFrom: "£5k–£8k/mo",
    description:
      "Senior growth leadership inside the team. Best for Seed–Series B teams not ready for a full-time CMO. Fractional CMO Plus £7.5k–£10k/mo (~2 days/week) when you need deeper operating support.",
    href: "/services/fractional-cmo",
    tierBadge: "Highest-touch engagement",
    popularRationale: "Full strategic ownership with execution support when the team needs a senior growth seat."
  }
] as const;

// Daniel's "why I built this", operator credibility, founder layer
export const founderStory = {
  intro: "I'm Daniel. After 15 years operating inside SaaS, fintech, healthtech and EdTech startups, including two exits, I kept seeing the same pattern: founders with great products who were stuck running marketing themselves because nobody else on the team could read the numbers and decide what to scale.",
  why: "I built WSS to be the operator I wished was there: senior judgement that diagnoses the real constraint, builds the system, and then transfers it so you don't need me forever.",
  credentials: [
    "Two operator-side startup exits",
    "£18M+ revenue influenced, aggregate across client and operator-side engagements",
    "£6M+ paid acquisition spend managed across SaaS, fintech, healthtech, EdTech",
    "479+ founder sessions · 4.93/5 on GrowthMentor",
    "MentorCruise Top Mentor, 5.0/5 across 30+ reviews",
    "Speaker at Cambridge Judge, Imperial College, Techstars, Google Launchpad"
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Customer.io email capture (replaces Mautic / comms.wescalestartups.com).
// Browser posts to same-origin /api/forms; Pages Function proxies to the
// Track Forms API with CUSTOMER_IO_SITE_ID + CUSTOMER_IO_TRACK_API_KEY.
// PUBLIC_CUSTOMER_IO_FORM_ID — arbitrary form id string (Integrations → Forms).
const customerIoFormId =
  (typeof import.meta.env.PUBLIC_CUSTOMER_IO_FORM_ID === "string" &&
    import.meta.env.PUBLIC_CUSTOMER_IO_FORM_ID.trim()) ||
  "wss-newsletter";

export const customerIoNewsletter = {
  formId: customerIoFormId,
  /** Same-origin Cloudflare Pages Function → Customer.io Forms API. */
  submitUrl: "/api/forms"
} as const;
