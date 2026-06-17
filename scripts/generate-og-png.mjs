// Rasterize OG SVGs to PNG at build time (Facebook/LinkedIn/WhatsApp don't render SVG previews).
// Generates the default card plus per-item cards for the article collections
// (insights, case studies) so each article gets its own social/AI-search preview.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// --- Default card (static brand SVG) ---
await sharp(join(root, "public/og/default.svg"), { density: 96 })
  .resize(1200, 630)
  .png()
  .toFile(join(root, "public/og/default.png"));
console.log("[og] generated public/og/default.png (1200x630)");

// --- Per-item cards ---
function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapTitle(text, maxChars = 22, maxLines = 4) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/\s*\S*$/, "")}…`;
    return kept;
  }
  return lines;
}

function ogSvg(category, title) {
  const lines = wrapTitle(title);
  const titleEls = lines
    .map(
      (line, i) =>
        `<text x="96" y="${248 + i * 84}" fill="#f7f7f2" font-family="Arial, sans-serif" font-size="68" font-weight="800">${escapeXml(line)}</text>`
    )
    .join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)}">
  <rect width="1200" height="630" fill="#0d0e12"/>
  <rect x="56" y="56" width="1088" height="518" rx="20" fill="none" stroke="#2a2c34" stroke-width="2"/>
  <text x="96" y="138" fill="#6657ff" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4">${escapeXml(category)}</text>
  ${titleEls}
  <text x="96" y="556" fill="#9aa0ad" font-family="Arial, sans-serif" font-size="28">We Scale Startups · wescalestartups.com</text>
</svg>`;
}

function mdxTitle(raw) {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return null;
  const match = frontmatter[1].match(/^title:\s*(.+)$/m);
  if (!match) return null;
  let title = match[1].trim();
  if (
    (title.startsWith('"') && title.endsWith('"')) ||
    (title.startsWith("'") && title.endsWith("'"))
  ) {
    title = title.slice(1, -1);
  }
  return title;
}

async function generateCollection({ dir, ext, outDir, category, getTitle }) {
  const srcDir = join(root, dir);
  if (!existsSync(srcDir)) return;
  const outPath = join(root, outDir);
  mkdirSync(outPath, { recursive: true });
  const files = readdirSync(srcDir).filter((f) => f.endsWith(ext) && !f.startsWith("_"));
  let count = 0;
  for (const file of files) {
    const slug = file.slice(0, -ext.length);
    const title = getTitle(readFileSync(join(srcDir, file), "utf8"));
    if (!title) {
      console.warn(`[og] skipped ${file} — no title found`);
      continue;
    }
    await sharp(Buffer.from(ogSvg(category, title)), { density: 96 })
      .resize(1200, 630)
      .png()
      .toFile(join(outPath, `${slug}.png`));
    count += 1;
  }
  console.log(`[og] generated ${count} "${category}" card(s) -> ${outDir}`);
}

await generateCollection({
  dir: "src/content/insights",
  ext: ".mdx",
  outDir: "public/og/insights",
  category: "INSIGHT",
  getTitle: mdxTitle
});

await generateCollection({
  dir: "src/content/cases",
  ext: ".json",
  outDir: "public/og/cases",
  category: "CASE STUDY",
  getTitle: (raw) => JSON.parse(raw).title
});
