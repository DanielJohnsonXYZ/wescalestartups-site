import { absoluteUrl } from "./utils";
import { servicePriceRanges } from "../lastmod";
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
    // Middle name carried as additionalName, which is the schema.org property
    // for it. The display name stays "Daniel Johnson" everywhere - that is what
    // people search and what LinkedIn, X and GrowthMentor say - but the graph
    // gets the rarer token, which is the point when seven other Daniel Johnsons
    // compete for the same queries. Matches the Wikidata label.
    additionalName: "Cameron",
    familyName: "Johnson",
    jobTitle: "Founder and Fractional CMO",
    // Bing surfaces at least seven different Daniel Johnson LinkedIn profiles for
    // this site's queries, several at position 2. Pin the identifying attributes.
    disambiguatingDescription:
      "Daniel Johnson, founder of We Scale Startups, a London growth consultancy for post-PMF B2B SaaS and AI startups. Growth operator with 15+ years in SaaS, fintech, healthtech and EdTech, two operator-side exits, and a personal site at danieljohnson.xyz.",
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
    // Mentoring and guest lecturing are affiliations, NOT identity. These three
    // used to sit in sameAs, which asserts "this URL is another page about this
    // same entity" — so the graph was claiming Daniel and Techstars were one
    // thing, directly undermining the disambiguation above.
    // Not alumniOf: the site says guest lecturer / visiting lecturer at Cambridge
    // Judge, which is teaching there, not studying there.
    affiliation: [
      { "@type": "Organization", name: "Google for Startups", url: "https://startup.google.com/" },
      { "@type": "Organization", name: "Techstars", url: "https://www.techstars.com/" },
      { "@type": "CollegeOrUniversity", name: "Cambridge Judge Business School", url: "https://www.jbs.cam.ac.uk/" }
    ],
    // sameAs: only pages that unambiguously identify Daniel himself. The WSS
    // company LinkedIn page and the podcast hub belong on the Organization node.
    sameAs: [
      siteConfig.founderLinkedin,
      siteConfig.founderTwitter,
      siteConfig.growthMentor,
      siteConfig.mentorCruise,
      siteConfig.danielSite,
      "https://www.youtube.com/@danieljohnson6000",
      "https://www.wikidata.org/wiki/Q137046365"
    ]
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": entityGraph.wssOrganization,
    alternateName: "WSS",
    // Sourced from Daniel's LinkedIn experience entry (Aug 2016 - present),
    // now mirrored on the LinkedIn company page and the Google Business Profile.
    // A founding date is one of the strongest disambiguators against the other
    // WeScale entities.
    foundingDate: "2016",
    // Bing query data (16 months to 2026-08-21) shows this entity being confused
    // with at least three unrelated businesses using the WeScale/WeScaleUp name —
    // most heavily a European B2B e-procurement platform whose login page WSS
    // ranks 3-10 for. disambiguatingDescription exists for precisely this.
    disambiguatingDescription:
      "London-based growth consultancy and fractional CMO practice for post-PMF B2B SaaS and AI startups in the £1M–£10M ARR band, founded by Daniel Johnson and operating at wescalestartups.com. Not connected to similarly named procurement, e-commerce or accelerator businesses trading as WeScale or WeScaleUp.",
    areaServed: ["GB", "Europe", "US"],
    // ProfessionalService inherits LocalBusiness, where priceRange is first-class.
    // Spans the published engagement ranges (Diagnosis low → System Build high).
    priceRange: "£2,000–£25,000",
    currenciesAccepted: "GBP",
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
    // Every entry verified live (HTTP 200) on 2026-08-26. The three social
    // accounts were found listed on the Google Business Profile and were
    // missing here, so the graph knew about fewer WSS profiles than Google did.
    sameAs: [
      siteConfig.linkedin,
      siteConfig.danielSite,
      siteConfig.podcastUrl,
      siteConfig.podcastYoutubeUrl,
      siteConfig.growthMentor,
      siteConfig.mentorCruise,
      siteConfig.founderLinkedin,
      "https://x.com/wescalestartups",
      "https://www.instagram.com/wescalestartups/",
      "https://www.facebook.com/wescalestartups/"
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
    inLanguage: "en-GB"
  };
}

/**
 * Builds an AggregateOffer for a service slug from the canonical numeric ranges
 * in src/site.ts. Returns undefined for slugs with no published price, so
 * scoped-on-request engagements never carry an invented number.
 */
function buildServiceOffer(path: string) {
  const slug = path.split("/").filter(Boolean).at(-1);
  const range = slug ? servicePriceRanges[slug] : undefined;
  if (!range) return undefined;

  const offer: Record<string, unknown> = {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: range.lowPrice,
    highPrice: range.highPrice,
    offerCount: 1,
    availability: "https://schema.org/InStock",
    url: absoluteUrl(path),
    seller: { "@id": entityGraph.wssOrganization }
  };

  if (range.perMonth) {
    // Recurring engagement: state the unit so the figure is not read as a one-off fee.
    offer.priceSpecification = {
      "@type": "UnitPriceSpecification",
      priceCurrency: "GBP",
      minPrice: range.lowPrice,
      maxPrice: range.highPrice,
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: 1,
        unitCode: "MON"
      }
    };
  }

  return offer;
}

export function buildServiceSchema(name: string, description: string, path: string) {
  const offers = buildServiceOffer(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    areaServed: ["GB", "Europe", "US"],
    provider: { "@id": entityGraph.wssOrganization },
    url: absoluteUrl(path),
    ...(offers ? { offers } : {})
  };
}

/**
 * OfferCatalog for /pricing — the four engagements with their published ranges.
 * Callers pass the display name and description from `pricingTiers` so the
 * markup cannot drift from the copy rendered on the page.
 */
export function buildOfferCatalogSchema(items: Array<{ slug: string; name: string; description: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${siteConfig.name} engagements`,
    url: absoluteUrl("/pricing"),
    provider: { "@id": entityGraph.wssOrganization },
    itemListElement: items.map((item, index) => {
      const range = servicePriceRanges[item.slug];
      return {
        "@type": "Offer",
        position: index + 1,
        name: item.name,
        description: item.description,
        url: absoluteUrl(item.path),
        ...(range
          ? {
              priceCurrency: "GBP",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "GBP",
                minPrice: range.lowPrice,
                maxPrice: range.highPrice,
                ...(range.perMonth ? { unitText: "MONTH" } : {})
              }
            }
          : {}),
        itemOffered: {
          "@type": "Service",
          name: item.name,
          provider: { "@id": entityGraph.wssOrganization }
        }
      };
    })
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

/**
 * Article image, derived from the route so it cannot drift from the OG card
 * that scripts/generate-og-png.mjs writes for the same id:
 *   /insights/{id}      -> /og/insights/{id}.png
 *   /case-studies/{id}  -> /og/cases/{id}.png
 * Falls back to the default card for any other route.
 */
function articleImage(path: string) {
  const [, section, id] = path.split("/");
  if (section === "insights" && id) return absoluteUrl(`/og/insights/${id}.png`);
  if (section === "case-studies" && id) return absoluteUrl(`/og/cases/${id}.png`);
  return absoluteUrl(siteConfig.ogImage);
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
    image: articleImage(opts.path),
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
    image: articleImage(opts.path),
    keywords: opts.tags.join(", ")
  };
}
