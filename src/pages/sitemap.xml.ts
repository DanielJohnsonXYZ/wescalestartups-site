import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

interface UrlEntry {
  path: string;
  priority?: string;
  changefreq?: string;
}

function urlNode({ path, priority = "0.6", changefreq = "monthly" }: UrlEntry, lastmod: string) {
  return `<url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const GET: APIRoute = async () => {
  const services = await getCollection("services");
  const industries = await getCollection("industries");
  const cases = await getCollection("cases");
  const lastmod = new Date().toISOString().slice(0, 10);

  const staticEntries: UrlEntry[] = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/services", priority: "0.9", changefreq: "monthly" },
    { path: "/industries", priority: "0.8", changefreq: "monthly" },
    { path: "/case-studies", priority: "0.9", changefreq: "monthly" },
    { path: "/resources", priority: "0.8", changefreq: "monthly" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.6", changefreq: "yearly" },
    { path: "/book", priority: "0.9", changefreq: "monthly" },
    { path: "/diagnose", priority: "0.6", changefreq: "yearly" },
    { path: "/build", priority: "0.6", changefreq: "yearly" },
    { path: "/test", priority: "0.6", changefreq: "yearly" },
    { path: "/transfer", priority: "0.6", changefreq: "yearly" },
    { path: "/press", priority: "0.5", changefreq: "yearly" },
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
    { path: "/terms", priority: "0.3", changefreq: "yearly" }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.map((entry) => urlNode(entry, lastmod)).join("")}
${services.map((item) => urlNode({ path: `/services/${item.id}`, priority: "0.8" }, lastmod)).join("")}
${industries.map((item) => urlNode({ path: `/industries/${item.id}`, priority: "0.7" }, lastmod)).join("")}
${cases.map((item) => urlNode({ path: `/case-studies/${item.id}`, priority: "0.7" }, lastmod)).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
