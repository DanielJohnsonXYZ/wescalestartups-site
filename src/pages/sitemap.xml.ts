import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";
import { siteConfig, staticPathLastModified } from "../site";

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
    "/quiz",
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

  const staticPaths = [
    "/",
    "/start-here",
    "/services",
    "/proof",
    "/how-it-works",
    "/how-we-work",
    "/pricing",
    "/insights",
    "/diagnose",
    "/quiz",
    "/book",
    "/gtm-strategy",
    "/first-30-days",
    "/engagement-models",
    "/execution-model",
    "/growth-engine",
    "/ai-growth-systems",
    "/fractional-cmo-vs-agency",
    "/when-growth-plateaus",
    "/case-studies",
    "/industries",
    "/about",
    "/contact",
    "/press",
    "/resources",
    "/reports",
    "/testimonials",
    "/build",
    "/transfer",
    "/experimentation",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map((path) =>
    urlNode(path, { lastmod: staticPathLastModified[path] ?? staticLastMod, ...staticUrlMeta(path) })
  )
  .join("\n")}
${services
  .map((s) =>
    urlNode(`/services/${s.id}`, {
      lastmod: staticPathLastModified[`/services/${s.id}`] ?? staticLastMod,
      changefreq: "weekly",
      priority: "0.85"
    })
  )
  .join("\n")}
${industries
  .map((i) =>
    urlNode(`/industries/${i.id}`, {
      lastmod: staticPathLastModified[`/industries/${i.id}`] ?? staticLastMod,
      changefreq: "monthly",
      priority: "0.7"
    })
  )
  .join("\n")}
${cases
  .map((c) =>
    urlNode(`/case-studies/${c.id}`, {
      lastmod: c.data.updatedAt?.toISOString().slice(0, 10) ?? c.data.publishedAt.toISOString().slice(0, 10),
      changefreq: "monthly",
      priority: "0.72"
    })
  )
  .join("\n")}
${insights
  .map((i) =>
    urlNode(`/insights/${i.id}`, {
      lastmod: i.data.updatedAt?.toISOString().slice(0, 10) ?? i.data.publishedAt.toISOString().slice(0, 10),
      changefreq: "monthly",
      priority: "0.72"
    })
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
