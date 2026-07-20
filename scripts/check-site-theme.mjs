import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(path);
      return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
    })
  );
  return nested.flat();
}

const htmlFiles = await collectHtmlFiles(distDir);
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!/<body\s+class="[^"]*\btheme-wss-v9\b[^"]*"/i.test(html)) {
    failures.push(relative(distDir, file));
  }
}

if (failures.length > 0) {
  console.error("[theme] Routes missing the shared theme-wss-v9 body contract:");
  failures.forEach((file) => console.error(`- ${file}`));
  process.exitCode = 1;
} else {
  console.log(`[theme] ${htmlFiles.length}/${htmlFiles.length} HTML outputs use theme-wss-v9`);
}
