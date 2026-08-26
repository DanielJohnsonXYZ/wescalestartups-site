/**
 * Converts oversized PNG/JPEG files in public/images to WebP at build time.
 *
 * Why this exists rather than committing the .webp files: the team photos were
 * 308 KB and 157 KB PNGs while the rest of the site uses WebP, and the tooling
 * that maintains this repo writes text, not binary, so it cannot commit an
 * image. Generating them during the build gets the same result, keeps the
 * source PNG as the editable original, and means any future oversized raster
 * dropped into public/images is optimised automatically.
 *
 * Behaviour:
 *   - scans public/images recursively for .png/.jpg/.jpeg above THRESHOLD_BYTES
 *   - writes a sibling .webp, preserving alpha (sharp does this by default —
 *     madiha-shahid.png is a cut-out and flattening it to RGB puts it on black)
 *   - skips when an up-to-date .webp already exists, so repeat builds are cheap
 *   - exits non-zero if a conversion fails, so a broken build fails loudly
 *     rather than deploying a page whose <img> src does not exist
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { readdirSync, statSync, existsSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public/images");
const THRESHOLD_BYTES = 60 * 1024;
const QUALITY = 82;
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (SOURCE_EXT.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

if (!existsSync(imagesDir)) {
  console.log("[images] no public/images directory, nothing to do");
  process.exit(0);
}

const candidates = walk(imagesDir).filter((f) => statSync(f).size > THRESHOLD_BYTES);
let converted = 0;
let skipped = 0;
let savedBytes = 0;

for (const src of candidates) {
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const srcStat = statSync(src);

  if (existsSync(out) && statSync(out).mtimeMs >= srcStat.mtimeMs) {
    skipped += 1;
    continue;
  }

  try {
    await sharp(src).webp({ quality: QUALITY, effort: 6 }).toFile(out);
  } catch (error) {
    console.error(`[images] FAILED to convert ${src}:`, error.message);
    process.exit(1);
  }

  const outSize = statSync(out).size;
  savedBytes += srcStat.size - outSize;
  converted += 1;
  const rel = src.slice(root.length + 1);
  console.log(
    `[images] ${rel} ${(srcStat.size / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB webp`
  );
}

console.log(
  `[images] ${converted} converted, ${skipped} already current, ${(savedBytes / 1024).toFixed(0)}KB saved`
);
