import fs from "node:fs";

const file = "scripts/apply-resources-audit.mjs";
let source = fs.readFileSync(file, "utf8");
let changed = false;

const broken = '  if (/\\.(xml|txt)$/.test(route)) return `dist/${route.replace(/^\\//, "")}`;\n  return `dist/${route.replace(/^\\//, "")}.html`;';
const repaired = '  if (/\\.(xml|txt)$/.test(route)) return "dist/" + route.replace(/^\\//, "");\n  return "dist/" + route.replace(/^\\//, "") + ".html";';

if (source.includes(broken)) {
  source = source.replace(broken, repaired);
  changed = true;
}

const sweepMarker = "// Printable companion now points to the canonical interactive diagnostic.";
const sweepGuard = "const canonicalResourceReplacements = new Map([";
const sweepBlock = `// Replace every internal reference with the final canonical route.
const canonicalResourceReplacements = new Map([
  ["/resources/growth-bottleneck-scorecard", "/resources/growth-dependency"],
  ["/resources/founder-led-growth-diagnostic", "/resources/growth-dependency"],
  ["/founder-led-growth-bottleneck-map", "/resources/growth-dependency"],
  ["https://wss-growth-tools.vercel.app/customer", "/resources/customer-segment"]
]);
const canonicalSweepExtensions = /\\.(astro|ts|js|mjs|md|html|json)$/;
const canonicalSweepExcluded = new Set([
  "src/lib/sitemapCanonical.ts",
  "scripts/apply-resources-audit.mjs",
  "scripts/patch-resources-generator.mjs"
]);
const sweepCanonicalLinks = (directory) => {
  const absoluteDirectory = path.join(root, directory);
  if (!fs.existsSync(absoluteDirectory)) return;
  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    const relative = path.join(directory, entry.name).replaceAll(path.sep, "/");
    if (entry.isDirectory()) {
      sweepCanonicalLinks(relative);
      continue;
    }
    if (!canonicalSweepExtensions.test(entry.name) || canonicalSweepExcluded.has(relative)) continue;
    const content = read(relative);
    let updated = content;
    for (const [legacy, canonical] of canonicalResourceReplacements) {
      updated = updated.split(legacy).join(canonical);
    }
    if (updated !== content) write(relative, updated);
  }
};
sweepCanonicalLinks("src");
sweepCanonicalLinks("public");

`;

if (!source.includes(sweepGuard)) {
  if (!source.includes(sweepMarker)) throw new Error("Could not locate the canonical printable marker.");
  source = source.replace(sweepMarker, sweepBlock + sweepMarker);
  changed = true;
}

if (changed) {
  fs.writeFileSync(file, source);
  console.log("Repaired and extended the Resources audit generator.");
} else {
  console.log("Resources audit generator already repaired.");
}
