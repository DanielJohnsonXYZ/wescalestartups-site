import fs from "node:fs";
import { spawnSync } from "node:child_process";

const checks = [
  ["site_integrity", "scripts/verify-build-integrity.mjs"],
  ["resources_integrity", "scripts/verify-resources.mjs"]
];
const output = [];

for (const [name, script] of checks) {
  const result = spawnSync(process.execPath, [script], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
  output.push(`[${name}] exit_code=${result.status ?? 1}`);
  if (result.stdout?.trim()) output.push(result.stdout.trim());
  if (result.stderr?.trim()) output.push(result.stderr.trim());
}

fs.writeFileSync("dist/integrity-report.txt", output.join("\n") + "\n");
console.log(`[integrity-capture] wrote ${output.length} sections to dist/integrity-report.txt`);
