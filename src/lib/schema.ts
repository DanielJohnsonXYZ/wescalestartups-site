import { absoluteUrl } from "./utils";
import { siteConfig, faqs } from "../site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: absoluteUrl("/images/logos/wss-logo.png"),
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
    sameAs: [siteConfig.linkedin]
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#founder`,
    name: siteConfig.founderName,
    jobTitle: "Founder & Fractional CMO",
    worksFor: { "@id": `${siteConfig.siteUrl}/#organization` },
    url: siteConfig.siteUrl,
    sameAs: [siteConfig.founderLinkedin, "https://danieljohnson.xyz"]
  };
}

export function buildServiceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
    areaServed: ["United Kingdom", "United States", "Europe"],
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

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };
}
