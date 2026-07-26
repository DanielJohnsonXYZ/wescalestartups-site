import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const siteOrigin = "https://wescalestartups.com";

const fail = (message) => {
  console.error(`[integrity] ${message}`);
  process.exitCode = 1;
};

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });

const normalizeRoute = (route) => {
  if (!route || route === "/") return "/";
  return route.replace(/\/+$/, "") || "/";
};

const routeFromHtml = (file) => {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  return normalizeRoute(`/${relative.replace(/\.html$/, "").replace(/\/index$/, "")}`);
};

const outputForRoute = (route) => {
  if (route === "/") return path.join(root, "index.html");
  const relative = route.replace(/^\//, "");
  const flat = path.join(root, `${relative}.html`);
  return fs.existsSync(flat) ? flat : path.join(root, relative, "index.html");
};

if (!fs.existsSync(root)) {
  fail("dist/ is missing; run npm run build first.");
  process.exit();
}

const redirectSources = new Set();
for (const rawLine of fs.readFileSync("public/_redirects", "utf8").split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;
  const [source, , status] = line.split(/\s+/);
  if (!source?.startsWith("/") || source.includes("*") || !/^30[1278]$/.test(status || "")) continue;
  redirectSources.add(normalizeRoute(source));
}

const sitemapXml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapRoutes = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    if (url.origin !== siteOrigin) fail(`Sitemap contains a non-canonical origin: ${match[1]}`);
    return normalizeRoute(url.pathname);
  })
);

for (const machineRoute of ["/llms.txt", "/llms-full.txt", "/markdown/home.md"]) {
  if (sitemapRoutes.has(machineRoute)) fail(`Machine mirror must not be in the human sitemap: ${machineRoute}`);
}

for (const route of sitemapRoutes) {
  if (redirectSources.has(route)) fail(`Sitemap contains a redirect source: ${route}`);
  if (!fs.existsSync(outputForRoute(route))) fail(`Sitemap route has no generated output: ${route}`);
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const missingFromSitemap = [];
const unsizedImages = [];
const missingAssets = [];
const redirectLinks = [];
const missingInternalPages = [];
const indexableMetadata = [];
const titles = new Map();
const descriptions = new Map();
const metadataLengthWarnings = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFromHtml(file);
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const noindex = /<meta\b[^>]*\bname=(["'])robots\1[^>]*\bcontent=(["'])[^"']*\bnoindex\b[^"']*\2[^>]*>/i.test(
    html
  );
  const isIndexable = route !== "/404" && !noindex && !redirectSources.has(route);

  if (isIndexable && !sitemapRoutes.has(route)) {
    missingFromSitemap.push(route);
  }

  if (isIndexable) {
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
    const description =
      html.match(/<meta\b[^>]*\bname=(["'])description\1[^>]*\bcontent=(["'])([\s\S]*?)\2[^>]*>/i)?.[3]?.trim() ||
      "";
    const canonical = html.match(/<link\b[^>]*\brel=(["'])canonical\1[^>]*\bhref=(["'])([^"']+)\2[^>]*>/i)?.[3] || "";
    const h1Count = [...html.matchAll(/<h1\b/gi)].length;
    const expectedCanonical = `${siteOrigin}${route === "/" ? "" : route}`;
    const problems = [];

    if (!/<html\b[^>]*\blang=(["'])[^"']+\1/i.test(html)) problems.push("missing html lang");
    if (!title) problems.push("missing title");
    if (!description) problems.push("missing meta description");
    if (canonical !== expectedCanonical) problems.push(`canonical is ${canonical || "(missing)"}`);
    if (h1Count !== 1) problems.push(`expected one h1, found ${h1Count}`);
    if (!/<meta\b[^>]*\bproperty=(["'])og:title\1/i.test(html)) problems.push("missing og:title");
    if (!/<meta\b[^>]*\bname=(["'])twitter:card\1/i.test(html)) problems.push("missing twitter:card");

    for (const match of html.matchAll(/<script\b[^>]*\btype=(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(match[2]);
      } catch (error) {
        problems.push(`invalid JSON-LD: ${error.message}`);
      }
    }

    if (problems.length) indexableMetadata.push(`${route}: ${problems.join("; ")}`);
    if (title) {
      const routes = titles.get(title) || [];
      routes.push(route);
      titles.set(title, routes);
      if (title.length < 30 || title.length > 65) {
        metadataLengthWarnings.push(`${route}: title ${title.length} chars :: ${title}`);
      }
    }
    if (description) {
      const routes = descriptions.get(description) || [];
      routes.push(route);
      descriptions.set(description, routes);
      if (description.length < 100 || description.length > 170) {
        metadataLengthWarnings.push(`${route}: description ${description.length} chars :: ${description}`);
      }
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\bwidth=(["'])[^"']+\1/i.test(tag) || !/\bheight=(["'])[^"']+\1/i.test(tag)) {
      unsizedImages.push(`${relative}: ${tag.slice(0, 180)}`);
    }
  }

  for (const match of html.matchAll(/\b(?:src|href)=(["'])(\/(?:_astro|images|og)\/[^"'?#]+)[^"']*\1/gi)) {
    const assetPath = path.join(root, decodeURIComponent(match[2]).replace(/^\//, ""));
    if (!fs.existsSync(assetPath)) missingAssets.push(`${relative} -> ${match[2]}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref=(["'])([^"']+)\1/gi)) {
    const href = match[2];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const linkedRoute = normalizeRoute(new URL(href, siteOrigin).pathname);
    if (redirectSources.has(linkedRoute)) redirectLinks.push(`${relative} -> ${href}`);
    if (
      !redirectSources.has(linkedRoute) &&
      !path.posix.extname(linkedRoute) &&
      !linkedRoute.startsWith("/cdn-cgi/") &&
      !fs.existsSync(outputForRoute(linkedRoute))
    ) {
      missingInternalPages.push(`${relative} -> ${href}`);
    }
  }
}

if (missingFromSitemap.length) {
  fail(`Indexable generated routes missing from sitemap:\n${[...new Set(missingFromSitemap)].sort().join("\n")}`);
}
if (unsizedImages.length) {
  fail(`Images missing intrinsic width/height:\n${unsizedImages.join("\n")}`);
}
if (missingAssets.length) {
  fail(`First-party assets referenced but absent from dist:\n${[...new Set(missingAssets)].join("\n")}`);
}
if (redirectLinks.length) {
  fail(`Internal links still point at redirect aliases:\n${[...new Set(redirectLinks)].sort().join("\n")}`);
}
if (missingInternalPages.length) {
  fail(`Internal page links have no generated output:\n${[...new Set(missingInternalPages)].sort().join("\n")}`);
}
if (indexableMetadata.length) {
  fail(`Indexable page metadata/structure defects:\n${indexableMetadata.join("\n")}`);
}

const duplicateTitles = [...titles].filter(([, routes]) => routes.length > 1);
const duplicateDescriptions = [...descriptions].filter(([, routes]) => routes.length > 1);
if (duplicateTitles.length) {
  fail(`Duplicate titles:\n${duplicateTitles.map(([value, routes]) => `${routes.join(", ")}: ${value}`).join("\n")}`);
}
if (duplicateDescriptions.length) {
  fail(
    `Duplicate meta descriptions:\n${duplicateDescriptions
      .map(([value, routes]) => `${routes.join(", ")}: ${value}`)
      .join("\n")}`
  );
}

if (!process.exitCode) {
  console.log(
    `[integrity] OK: ${htmlFiles.length} HTML files, ${sitemapRoutes.size} sitemap URLs, no missing assets, unsized images, redirect links, or indexable sitemap gaps.`
  );
  if (metadataLengthWarnings.length) {
    console.warn(`[integrity] Advisory metadata-length opportunities: ${metadataLengthWarnings.length}`);
    if (process.env.INTEGRITY_VERBOSE === "1") console.warn(metadataLengthWarnings.join("\n"));
  }
}
