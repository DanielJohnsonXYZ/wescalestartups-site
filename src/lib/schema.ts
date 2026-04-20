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
