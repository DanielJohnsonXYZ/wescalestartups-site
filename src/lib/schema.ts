import { absoluteUrl } from "./utils";
import { siteConfig } from "../site";

const personKnowsAbout = [
  "Fractional CMO",
  "B2B SaaS go-to-market",
  "AI startup growth",
  "Seed to Series B",
  "Growth diagnosis",
  "Acquisition systems"
] as const;

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#person`,
    name: siteConfig.founderName,
    jobTitle: "Founder and Fractional CMO",
    url: siteConfig.danielSite,
    email: siteConfig.email,
    worksFor: {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    knowsAbout: [...personKnowsAbout],
    sameAs: [
      siteConfig.founderLinkedin,
      siteConfig.founderTwitter,
      siteConfig.growthMentor,
      siteConfig.mentorCruise,
      siteConfig.danielSite,
      siteConfig.siteUrl,
      siteConfig.podcastUrl,
      "https://www.jbs.cam.ac.uk/",
      "https://startup.google.com/",
      "https://www.techstars.com/"
    ]
  };
}

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
    founder: {
      "@id": `${siteConfig.siteUrl}/#person`
    },
    knowsAbout: [...personKnowsAbout],
    address: {
      "@type": "PostalAddress",
      streetAddress: "81 Curtain Road",
      addressLocality: "London",
      postalCode: "EC2A 3AG",
      addressCountry: "GB"
    },
    sameAs: [
      siteConfig.linkedin,
      siteConfig.danielSite,
      siteConfig.podcastUrl,
      siteConfig.growthMentor,
      siteConfig.mentorCruise,
      siteConfig.founderLinkedin
    ]
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
    about: { "@id": `${siteConfig.siteUrl}/#organization` },
    inLanguage: "en-US"
  };
}

export function buildServiceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
    url: absoluteUrl(path)
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

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildCaseStudySchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    description,
    url: absoluteUrl(path),
    author: { "@id": `${siteConfig.siteUrl}/#person`, name: siteConfig.founderName },
    publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    mainEntityOfPage: absoluteUrl(path)
  };
}

export function buildCaseStudyArticleSchema(opts: {
  name: string;
  description: string;
  path: string;
  publishedAt: Date;
  updatedAt?: Date;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.publishedAt.toISOString(),
    dateModified: (opts.updatedAt ?? opts.publishedAt).toISOString(),
    author: { "@id": `${siteConfig.siteUrl}/#person`, name: siteConfig.founderName },
    publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
    keywords: opts.keywords?.join(", ")
  };
}

export function buildInsightArticleSchema(opts: {
  title: string;
  description: string;
  path: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.publishedAt.toISOString(),
    dateModified: (opts.updatedAt ?? opts.publishedAt).toISOString(),
    author: { "@id": `${siteConfig.siteUrl}/#person`, name: siteConfig.founderName },
    publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
    keywords: opts.tags.join(", ")
  };
}
