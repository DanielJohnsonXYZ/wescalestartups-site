export const siteConfig = {
  name: "We Scale Startups",
  title: "We Scale Startups | Growth Systems for AI and SaaS Teams",
  description:
    "AI-native growth strategy, customer research, and acquisition systems for post-PMF AI, SaaS, fintech, healthtech, and product-led teams.",
  siteUrl: "https://wescalestartups.com",
  canonicalHost: "wescalestartups.com",
  bookingUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a growth diagnosis",
  email: "hello@wescalestartups.com",
  phone: "+44 20 3886 0931",
  address: "81 Curtain Road, London EC2A 3AG, United Kingdom",
  linkedin: "https://www.linkedin.com/company/wescalestartups",
  twitterHandle: "@djohnsonxyz",
  founderName: "Daniel Johnson",
  founderLinkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  ogImage: "/og/default.svg"
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
  { value: "£20M+", label: "Revenue influenced across global client work" },
  { value: "£6M+", label: "Managed across paid acquisition channels" },
  { value: "10+", label: "Years building startup growth systems" }
] as const;
