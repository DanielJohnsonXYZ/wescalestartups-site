import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { growthToolRoutes } from "../data/growthTools";
import { isFinalSitemapPath } from "../lib/sitemapCanonical";
import { absoluteUrl } from "../lib/utils";
import { staticPathLastModified } from "../lastmod";
import { indexableIndustrySlugs, leadMagnets, siteConfig } from "../site";

export const prerender = true;

const staticLastMod = siteConfig.siteLastModified;

type UrlOpts = {
  lastmod?: string;
  changefreq: string;
  priority: string;
};

function urlNode(path: string, opts: UrlOpts) {
  const lastmod = opts.lastmod ?? staticLastMod;
  return `<url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod><changefreq>${opts.changefreq}</changefreq><priority>${opts.priority}</priority></url>`;
}

function staticUrlMeta(path: string): Pick<UrlOpts, "changefreq" | "priority"> {
  if (path === "/") return { changefreq: "weekly", priority: "1.0" };
  if (path === "/privacy" || path === "/terms") return { changefreq: "yearly", priority: "0.35" };
  const weekly = new Set([
    "/start-here",
    "/services",
    "/pricing",
    "/proof",
    "/contact",
    "/book",
    "/how-it-works",
    "/diagnose",
    "/case-studies",
    "/resources",
    "/experimentation"
  ]);
  if (weekly.has(path)) return { changefreq: "weekly", priority: "0.9" };
  return { changefreq: "monthly", priority: "0.75" };
}

export const GET: APIRoute = async () => {
  const cases = await getCollection("cases");
  const services = await getCollection("services");
  const industries = await getCollection("industries");
  const insights = await getCollection("insights");
  const podcastEpisodes = await getCollection("podcastEpisodes");

  const staticPaths = [
    ...new Set([
      "/",
      "/start-here",
      "/services",
      "/proof",
      "/how-it-works",
      "/pricing",
      "/insights",
      "/diagnose",
      "/book",
      "/gtm-strategy",
      "/first-30-days",
      "/ai-growth-systems",
      "/ai-sameness-scorecard",
      "/learning-latency-scorecard",
      "/fractional-cmo-vs-agency",
      "/fractional-cmo-vs-full-time-cmo",
      "/when-growth-plateaus",
      "/case-studies",
      "/industries",
      "/about",
      "/team",
      "/about/daniel",
      "/speaking",
      "/workshops",
      "/before-you-hire-a-head-of-marketing",
      "/before-you-hire-another-agency",
      "/growth-dashboard-template",
      "/board-growth-report-template",
      "/contact",
      "/press",
      "/press-kit-download",
      "/resources",
      ...growthToolRoutes,
      "/reports",
      "/testimonials",
      "/build",
      "/transfer",
      "/experimentation",
      "/growth-course",
      "/newsletter",
      "/refer",
      "/wss-scale-score",
      "/wss-calendar",
      ...(siteConfig.podcastLive
        ? ["/podcast", "/podcast-guest-application"]
        : []),
      "/insights/glossary",
      "/seo-content-strategy",
      "/growth-operating-system",
      "/founder-led-growth",
      "/healthtech-buyer-confidence-matrix",
      "/hiring-readiness-scorecard",
      "/portfolio-growth-readiness",
      "/facts/daniel-johnson",
      "/facts/we-scale-startups",
      "/post-raise",
      "/ai-growth-audit",
      "/privacy",
      "/terms",
      ...leadMagnets.map((m) => m.href)
    ])
  ].filter(isFinalSitemapPath);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map((path) =>
    urlNode(path, { lastmod: staticPathLastModified[path] ?? staticLastMod, ...staticUrlMeta(path) })
  )
  .join("\n")}
${services
  .filter((s) => isFinalSitemapPath(`/services/${s.id}`))
  .map((s) =>
    urlNode(`/services/${s.id}`, {
      lastmod: staticPathLastModified[`/services/${s.id}`] ?? staticLastMod,
      changefreq: "weekly",
      priority: "0.85"
    })
  )
  .join("\n")}
${industries
  .filter((i) => indexableIndustrySlugs.includes(i.id as (typeof indexableIndustrySlugs)[number]))
  .filter((i) => isFinalSitemapPath(`/industries/${i.id}`))
  .map((i) =>
    urlNode(`/industries/${i.id}`, {
      lastmod: staticPathLastModified[`/industries/${i.id}`] ?? staticLastMod,
      changefreq: "monthly",
      priority: "0.7"
    })
  )
  .join("\n")}
${cases
  .filter((c) => isFinalSitemapPath(`/case-studies/${c.id}`))
  .map((c) =>
    urlNode(`/case-studies/${c.id}`, {
      lastmod: c.data.updatedAt?.toISOString().slice(0, 10) ?? c.data.publishedAt.toISOString().slice(0, 10),
      changefreq: "monthly",
      priority: "0.72"
    })
  )
  .join("\n")}
${insights
  .filter((i) => isFinalSitemapPath(`/insights/${i.id}`))
  .map((i) =>
    urlNode(`/insights/${i.id}`, {
      lastmod: i.data.updatedAt?.toISOString().slice(0, 10) ?? i.data.publishedAt.toISOString().slice(0, 10),
      changefreq: "monthly",
      priority: "0.72"
    })
  )
  .join("\n")}
${siteConfig.podcastLive
  ? podcastEpisodes
      .filter((ep) => !ep.data.draft && ep.id !== "how-startups-win-template")
      .map((ep) =>
        urlNode(`/podcast/episodes/${ep.id}`, {
          lastmod: ep.data.publishedAt.toISOString().slice(0, 10),
          changefreq: "monthly",
          priority: "0.68"
        })
      )
      .join("\n")
  : ""}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
