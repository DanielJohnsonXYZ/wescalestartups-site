// Rasterize the OG SVG to PNG at build time (Facebook/LinkedIn/WhatsApp don't render SVG previews).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public/og/default.svg");
const out = join(root, "public/og/default.png");

await sharp(src, { density: 96 }).resize(1200, 630).png().toFile(out);
console.log("[og] generated public/og/default.png (1200x630)");
