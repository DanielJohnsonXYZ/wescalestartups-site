import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

function urlNode(path: string) {
  return `<url><loc>${absoluteUrl(path)}</loc></url>`;
}

export const GET: APIRoute = async () => {
  const services = await getCollection("services");
  const industries = await getCollection("industries");
  const cases = await getCollection("cases");
  const insights = await getCollection("insights");
  const staticPaths = [
    "/",
    "/start-here",
    "/services",
    "/how-it-works",
    "/how-we-work",
    "/growth-engine",
    "/execution-model",
    "/engagement-models",
    "/ai-growth-systems",
    "/first-30-days",
    "/pricing",
    "/fractional-cmo-vs-agency",
    "/proof",
    "/insights",
    "/reports",
    "/diagnose",
    "/build",
    "/test",
    "/transfer",
    "/industries",
    "/case-studies",
    "/resources",
    "/press",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("")}
${services.map((item) => urlNode(`/services/${item.id}`)).join("")}
${industries.map((item) => urlNode(`/industries/${item.id}`)).join("")}
${cases.map((item) => urlNode(`/case-studies/${item.id}`)).join("")}
${insights.map((item) => urlNode(`/insights/${item.id}`)).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
