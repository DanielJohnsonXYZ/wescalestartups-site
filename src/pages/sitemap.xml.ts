import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

const today = () => new Date().toISOString().slice(0, 10);

function urlNode(path: string, lastmod: string = today()) {
  return `<url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod></url>`;
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
    "/case-studies",
    "/industries",
    "/about",
    "/contact",
    "/press",
    "/resources",
    "/reports",
    "/testimonials",
    "/test",
    "/build",
    "/transfer",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("\n")}
${services.map((s) => urlNode(`/services/${s.id}`)).join("\n")}
${industries.map((i) => urlNode(`/industries/${i.id}`)).join("\n")}
${cases.map((c) => urlNode(`/case-studies/${c.id}`, c.data.updatedAt?.toISOString().slice(0, 10) ?? c.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
${insights.map((i) => urlNode(`/insights/${i.id}`, i.data.updatedAt?.toISOString().slice(0, 10) ?? i.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
