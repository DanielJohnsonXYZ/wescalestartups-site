import { absoluteUrl } from "./utils";
import { entityGraph, siteConfig } from "../site";

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
    "@id": entityGraph.danielPerson,
    name: siteConfig.founderName,
    givenName: "Daniel",
    familyName: "Johnson",
    jobTitle: "Founder and Fractional CMO",
    url: siteConfig.danielSite,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/daniel-headshot-960.webp"),
      width: 960,
      height: 1003
    },
    worksFor: {
      "@id": entityGraph.wssOrganization
    },
    knowsAbout: [...personKnowsAbout],
    sameAs: [
      siteConfig.founderLinkedin,
      siteConfig.founderTwitter,
      siteConfig.growthMentor,
      siteConfig.mentorCruise,
      siteConfig.danielSite,
      siteConfig.podcastUrl,
      siteConfig.linkedin,
      "https://www.youtube.com/@danieljohnson6000",
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
    "@id": entityGraph.wssOrganization,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: absoluteUrl("/images/logos/wss-logo.webp"),
    founder: {
      "@id": entityGraph.danielPerson
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
    "@id": entityGraph.wssWebsite,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: { "@id": entityGraph.wssOrganization },
    about: { "@id": entityGraph.wssOrganization },
    inLanguage: "en-US"
  };
}

export function buildServiceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": entityGraph.wssOrganization },
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
    author: { "@id": entityGraph.danielPerson, name: siteConfig.founderName },
    publisher: { "@id": entityGraph.wssOrganization },
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
    author: { "@id": entityGraph.danielPerson, name: siteConfig.founderName },
    publisher: { "@id": entityGraph.wssOrganization },
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
    author: { "@id": entityGraph.danielPerson, name: siteConfig.founderName },
    publisher: { "@id": entityGraph.wssOrganization },
    mainEntityOfPage: absoluteUrl(opts.path),
    keywords: opts.tags.join(", ")
  };
}
