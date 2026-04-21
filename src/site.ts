export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Fractional growth leadership for post-PMF B2B SaaS & AI teams",
  description:
    "Founder-led growth strategy, customer research, and acquisition systems for post-PMF B2B SaaS and AI startups between $1M and $10M ARR. Senior operator, not an agency.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a growth call",
  email: "hello@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  ogImage: "/og/default.svg",
  priceBand: "£5,000–£15,000 / month",
  priceBandNote: "Retainer ranges by scope. Fixed-scope sprints priced per engagement."
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Proof" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
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
  { value: "388+", label: "GrowthMentor sessions · 4.93★ average rating" }
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

export const faqs = [
  {
    q: "Who is We Scale Startups actually for?",
    a: "Post-PMF B2B SaaS and AI teams between $1M and $10M ARR where the product works but acquisition is inconsistent. Typically founder-led or with a gap before the first full-time growth leader."
  },
  {
    q: "What does it cost?",
    a: "Retainers sit between £5,000 and £15,000 per month depending on scope, phase, and involvement. Fixed-scope sprints are priced per engagement. Pricing is transparent on the services page."
  },
  {
    q: "How is this different from an agency?",
    a: "An agency sells execution hours. We Scale Startups sells a senior operator who decides what gets executed, measures the learning, and leaves behind a system your team can keep running."
  },
  {
    q: "What do the three phases mean?",
    a: "Phase one is Research — turning scattered signals into a clear ICP, message, and market thesis. Phase two is Acquisition — building the channels and conversion points that produce pipeline. Phase three is Operating Cadence — a weekly rhythm that compounds learning. Fractional CMO is the delivery model that runs all three."
  },
  {
    q: "How long does an engagement run?",
    a: "Minimum three months. Most engagements run six to twelve months, long enough to move through at least one full phase and hand the system to the team."
  },
  {
    q: "Where are you based?",
    a: "Founder Daniel Johnson is UK-based, currently operating from Asia. Clients are global, with a particular concentration of US-based post-PMF teams."
  }
] as const;
