import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const htmlPath = (route) => {
  if (route === "/") return "dist/index.html";
  if (/.(xml|txt)$/.test(route)) return "dist/" + route.replace(/^//, "");
  return "dist/" + route.replace(/^//, "") + ".html";
};
const loadHtml = (route) => {
  const file = htmlPath(route);
  check(exists(file), `Missing generated page: ${route} (${file})`);
  return exists(file) ? read(file) : "";
};
const canonical = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || "";
const robots = (html) => html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || "";

check(exists("src/data/growthTools.ts"), "Missing central growthTools data");
const source = read("src/data/growthTools.ts");
const routeMatches = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => `/resources/${match[1]}`);
check(routeMatches.length === 5, `Expected 5 growth tools, found ${routeMatches.length}`);

const hub = loadHtml("/resources");
check(canonical(hub) === "https://wescalestartups.com/resources", "Resources canonical is incorrect");
check(robots(hub).includes("index") && robots(hub).includes("follow"), "Resources hub is not index,follow");
check((hub.match(/<h1[\s>]/g) || []).length === 1, "Resources hub must have one H1");
check(hub.includes('"@type":"CollectionPage"'), "Resources hub is missing CollectionPage schema");
check(hub.includes('"@type":"ItemList"'), "Resources hub is missing ItemList schema");

for (const route of routeMatches) {
  const html = loadHtml(route);
  check(canonical(html) === `https://wescalestartups.com${route}`, `${route} canonical is incorrect`);
  check(robots(html).includes("index") && robots(html).includes("follow"), `${route} is not index,follow`);
  check((html.match(/<h1[\s>]/g) || []).length === 1, `${route} must have one H1`);
  check(html.includes('"@type":"WebApplication"'), `${route} is missing WebApplication schema`);
  check(html.includes("What it assesses"), `${route} is missing crawlable assessment copy`);
  check(html.includes("What you leave with"), `${route} is missing crawlable result copy`);
}

const sitemap = loadHtml("/sitemap.xml");
for (const route of routeMatches) {
  check(sitemap.includes(`<loc>https://wescalestartups.com${route}</loc>`), `Sitemap missing ${route}`);
}
const deprecatedRoutes = [
  "/resources/growth-bottleneck-scorecard",
  "/resources/founder-led-growth-diagnostic",
  "/founder-led-growth-bottleneck-map"
];
for (const route of deprecatedRoutes) {
  check(!sitemap.includes(`<loc>https://wescalestartups.com${route}</loc>`), `Deprecated URL remains in sitemap: ${route}`);
}

const sourceFiles = [];
const collect = (directory) => {
  if (!exists(directory)) return;
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const rel = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(rel);
    else if (/\.(astro|ts|js|mjs|md|mdx|html|json)$/.test(entry.name)) sourceFiles.push(rel);
  }
};
collect("src");
collect("public");
for (const file of sourceFiles) {
  const text = read(file);
  check(!/wss-(growth-tools|founder-bottleneck|ideal-customer|positioning-builder|gtm-leak|weekly-constraint)[^\s"'<>]*\.vercel\.app/i.test(text), `Legacy Vercel tool URL in ${file}`);
}
const allowedRedirectFiles = new Set(["functions/_middleware.js", "public/_redirects", "src/lib/sitemapCanonical.ts"]);
for (const file of sourceFiles) {
  if (allowedRedirectFiles.has(file)) continue;
  const text = read(file);
  for (const route of deprecatedRoutes) {
    check(!text.includes(route), `Deprecated resource URL referenced in ${file}: ${route}`);
  }
}
check(!exists("src/pages/founder-led-growth-bottleneck-map.astro"), "Duplicate standalone bottleneck page still exists");

const siteSource = read("src/site.ts");
const downloadMatches = [...siteSource.matchAll(/downloadPath:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const href of downloadMatches) {
  check(exists(path.join("public", href.replace(/^\//, ""))), `Missing resource download: ${href}`);
}

const thanks = loadHtml("/resources/90-day-growth-sprint-planner/thanks");
check(robots(thanks).includes("noindex") && robots(thanks).includes("follow"), "Planner thanks page must be noindex,follow");
for (const href of [
  "/downloads/90-day-growth-experiment-planner.xlsx",
  "/downloads/90-day-growth-experiment-planner-guide.pdf"
]) {
  check(exists(path.join("public", href.replace(/^\//, ""))), `Planner delivery file missing: ${href}`);
  check(thanks.includes(href), `Planner thanks page is missing delivery link: ${href}`);
}

if (failures.length) {
  console.error("[resources] audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`[resources] OK: hub, ${routeMatches.length} tools, sitemap, redirects, downloads and legacy-link guard verified.`);
