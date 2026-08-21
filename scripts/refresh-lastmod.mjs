#!/usr/bin/env node
/**
 * Regenerates the `staticPathLastModified` map in src/lastmod.ts from git history.
 *
 * Why this exists: the map was hand-maintained in site.ts, and it drifted badly — by 2026-08-21
 * every one of its 55 resolvable entries was stale, so ~48% of sitemap URLs claimed
 * a lastmod three months older than the content. A wrong lastmod suppresses recrawl,
 * which is worse than no lastmod at all.
 *
 * Run this before a release (or any time you have shipped a batch of content):
 *   node scripts/refresh-lastmod.mjs        # rewrite src/lastmod.ts in place
 *   node scripts/refresh-lastmod.mjs --check # exit 1 if stale (for CI)
 *
 * Each route resolves to the source files that back it (page file, and for dynamic
 * routes the content-collection entry); the date is the most recent commit across them.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const TARGET = "src/lastmod.ts";
const check = process.argv.includes("--check");

const gitDate = (paths) => {
  const dates = paths
    .filter((p) => existsSync(p))
    .map((p) => execFileSync("git", ["log", "-1", "--format=%cs", "--", p], { encoding: "utf8" }).trim())
    .filter(Boolean);
  return dates.length ? dates.sort().at(-1) : null;
};

const COLLECTIONS = { services: "services", industries: "industries", insights: "insights", "case-studies": "cases" };

const candidates = (route) => {
  if (route === "/") return ["src/pages/index.astro"];
  if (route.startsWith("/markdown/")) return [`public${route}`];
  const seg = route.slice(1);
  const out = [`src/pages/${seg}.astro`, `src/pages/${seg}/index.astro`, `src/pages/${seg}.ts`, `public/${seg}`];
  const [coll, slug] = seg.split("/");
  if (slug && COLLECTIONS[coll]) {
    for (const ext of ["json", "mdx", "md"]) out.push(`src/content/${COLLECTIONS[coll]}/${slug}.${ext}`);
    out.push(`src/pages/${coll}/[slug].astro`);
  }
  if (coll === "resources" && slug) out.push("src/pages/resources/[slug].astro", "src/pages/resources/[tool].astro");
  return out;
};

const source = readFileSync(TARGET, "utf8");
const block = source.match(/export const staticPathLastModified: Partial<Record<string, string>> = \{(.*?)\n\};/s);
if (!block) throw new Error("staticPathLastModified block not found in " + TARGET);

const routes = [...block[1].matchAll(/"([^"]+)":\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => [m[1], m[2]]);
const kept = [];
const dropped = [];
const stale = [];

for (const [route, current] of routes) {
  const date = gitDate(candidates(route));
  if (!date) {
    dropped.push(route);
    continue;
  }
  if (date !== current) stale.push(`${route}: ${current} -> ${date}`);
  kept.push([route, date]);
}

if (check) {
  if (stale.length || dropped.length) {
    console.error(`stale: ${stale.length}, dead: ${dropped.length}`);
    for (const s of stale) console.error("  " + s);
    for (const d of dropped) console.error("  dead route: " + d);
    process.exit(1);
  }
  console.log("staticPathLastModified is current.");
  process.exit(0);
}

const body = kept.map(([r, d]) => `  "${r}": "${d}"`).join(",\n");
writeFileSync(TARGET, source.replace(block[0], `export const staticPathLastModified: Partial<Record<string, string>> = {\n${body}\n};`));
console.log(`updated ${stale.length} route(s), removed ${dropped.length} dead entr(ies), ${kept.length} total.`);
if (dropped.length) console.log("removed:", dropped.join(", "));
