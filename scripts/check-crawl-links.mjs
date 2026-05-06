/**
 * Validate a crawl export for broken internal URLs and multi-hop redirects.
 *
 * Usage:
 *   node scripts/check-crawl-links.mjs --input=docs/crawls/wss-crawl.csv
 *   node scripts/check-crawl-links.mjs --input=docs/crawls/wss-crawl.csv --host=wescalestartups.com
 *
 * Expected CSV columns from Screaming Frog/Ahrefs exports:
 *   - Address (required)
 *   - Status Code (required)
 *   - Redirect URL (optional but recommended)
 */
import fs from "node:fs";
import path from "node:path";

const DEFAULT_INPUT = "docs/crawls/latest.csv";
const DEFAULT_HOST = "wescalestartups.com";

function parseArgs(argv) {
  const args = { input: DEFAULT_INPUT, host: DEFAULT_HOST };
  for (const item of argv) {
    if (item.startsWith("--input=")) args.input = item.slice("--input=".length);
    if (item.startsWith("--host=")) args.host = item.slice("--host=".length);
  }
  return args;
}

function parseCsvLine(line) {
  const out = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  out.push(current);
  return out.map((cell) => cell.trim());
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const lines = raw.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < 2) {
    throw new Error("CSV has no data rows.");
  }
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = cells[idx] ?? "";
    });
    return row;
  });
  return { headers, rows };
}

function toUrl(value, host) {
  if (!value) return null;
  try {
    if (value.startsWith("/")) return new URL(`https://${host}${value}`);
    return new URL(value);
  } catch {
    return null;
  }
}

function isInternal(urlObj, host) {
  if (!urlObj) return false;
  return urlObj.hostname === host || urlObj.hostname === `www.${host}`;
}

function normalizePath(urlObj) {
  if (!urlObj) return "/";
  if (!urlObj.pathname || urlObj.pathname === "") return "/";
  return urlObj.pathname.replace(/\/$/, "") || "/";
}

function main() {
  const { input, host } = parseArgs(process.argv.slice(2));
  const absoluteInput = path.resolve(process.cwd(), input);

  if (!fs.existsSync(absoluteInput)) {
    console.error(`Input CSV not found: ${absoluteInput}`);
    console.error("Export a crawl and re-run this checker.");
    process.exit(1);
  }

  const { rows } = readCsv(absoluteInput);
  const byPath = new Map();
  const brokenInternal = [];
  const redirectInternal = [];

  for (const row of rows) {
    const address = row["Address"] || row["URL"] || "";
    const codeStr = row["Status Code"] || row["Status"] || "";
    const redirectUrlRaw = row["Redirect URL"] || row["Final Address"] || "";
    const code = Number.parseInt(String(codeStr), 10);
    const urlObj = toUrl(address, host);
    if (!urlObj || !isInternal(urlObj, host)) continue;

    const pagePath = normalizePath(urlObj);
    byPath.set(pagePath, { code, address, redirectUrlRaw });

    if (Number.isFinite(code) && code >= 400) {
      brokenInternal.push({ address, code });
    } else if (Number.isFinite(code) && code >= 300 && code < 400) {
      redirectInternal.push({ address, code, redirectUrlRaw });
    }
  }

  const multiHop = [];
  for (const item of redirectInternal) {
    const target = toUrl(item.redirectUrlRaw, host);
    if (!target || !isInternal(target, host)) continue;
    const targetPath = normalizePath(target);
    const targetRow = byPath.get(targetPath);
    if (targetRow && Number.isFinite(targetRow.code) && targetRow.code >= 300 && targetRow.code < 400) {
      multiHop.push({
        from: item.address,
        via: item.redirectUrlRaw,
        viaCode: targetRow.code
      });
    }
  }

  console.log(`Checked ${rows.length} crawl rows for ${host}`);
  console.log(`Internal broken URLs: ${brokenInternal.length}`);
  console.log(`Internal redirects: ${redirectInternal.length}`);
  console.log(`Internal multi-hop redirects: ${multiHop.length}`);

  if (brokenInternal.length > 0) {
    console.log("\nBroken internal URLs:");
    brokenInternal.slice(0, 50).forEach((item) => {
      console.log(`- [${item.code}] ${item.address}`);
    });
  }

  if (multiHop.length > 0) {
    console.log("\nMulti-hop internal redirects (fix to single hop in repo redirects):");
    multiHop.slice(0, 50).forEach((item) => {
      console.log(`- ${item.from} -> ${item.via} -> (${item.viaCode}) ...`);
    });
  }

  if (brokenInternal.length > 0 || multiHop.length > 0) {
    process.exit(1);
  }
}

main();
