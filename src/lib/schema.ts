import { absoluteUrl } from "./utils";
import { siteConfig } from "../site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: absoluteUrl("/images/logos/wss-logo.webp"),
    description: siteConfig.description,
    founder: {
      "@type": "Person",
      name: siteConfig.founderName,
      sameAs: [siteConfig.founderLinkedin]
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "81 Curtain Road",
      addressLocality: "London",
      postalCode: "EC2A 3AG",
      addressCountry: "GB"
    },
    areaServed: ["GB", "EU", "US"],
    sameAs: [siteConfig.linkedin, siteConfig.founderLinkedin]
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    inLanguage: "en-GB"
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#founder`,
    name: siteConfig.founderName,
    jobTitle: siteConfig.founderRole,
    worksFor: { "@id": `${siteConfig.siteUrl}/#organization` },
    url: siteConfig.siteUrl,
    sameAs: [
      siteConfig.founderLinkedin,
      `https://twitter.com/${siteConfig.twitterHandle.replace("@", "")}`,
      "https://danieljohnson.xyz"
    ],
    description:
      "Daniel Johnson is a fractional CMO and senior growth operator for post-PMF B2B SaaS and AI startups ($1M–$10M ARR). Google for Startups and Techstars mentor. £20M+ revenue influenced, £6M+ managed across paid acquisition, 388+ GrowthMentor sessions at 4.93★.",
    knowsAbout: [
      "Fractional CMO",
      "B2B SaaS growth",
      "AI startup go-to-market",
      "Paid acquisition",
      "SEO",
      "Conversion rate optimisation",
      "Positioning",
      "Demand generation",
      "Startup growth strategy",
      "Customer research",
      "Operating cadence"
    ]
  };
}

export function buildServiceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
    areaServed: ["GB", "EU", "US"],
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        minPrice: 5000,
        maxPrice: 15000,
        unitText: "MONTH"
      }
    }
  };
}

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.siteUrl}/#professional-service`,
    name: `${siteConfig.name} — Fractional CMO & Growth Systems`,
    description: siteConfig.description,
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
    areaServed: ["GB", "EU", "US"],
    serviceType: [
      "Fractional CMO",
      "Growth Research",
      "Acquisition Systems",
      "Operating Cadence"
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Post-PMF B2B SaaS and AI startups, $1M–$10M ARR"
    },
    priceRange: "£5,000–£15,000 / month"
  };
}

export function buildFAQSchema(qas: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer
      }
    }))
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildCaseStudySchema(data: {
  title: string;
  client: string;
  sector: string;
  summary: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(data.path),
    headline: data.title,
    about: data.sector,
    description: data.summary,
    publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    author: { "@id": `${siteConfig.siteUrl}/#founder` },
    mainEntityOfPage: absoluteUrl(data.path)
  };
}
