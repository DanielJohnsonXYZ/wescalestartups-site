import fs from "node:fs";

const messages = [];
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

console.error = (...args) => messages.push(args.map(String).join(" "));
console.warn = (...args) => messages.push(args.map(String).join(" "));
console.log = (...args) => messages.push(args.map(String).join(" "));
process.exitCode = 0;

await import(`./verify-build-integrity.mjs?capture=${Date.now()}`);
const checkerExitCode = process.exitCode || 0;

console.error = originalError;
console.warn = originalWarn;
console.log = originalLog;
process.exitCode = 0;

fs.writeFileSync(
  "dist/integrity-report.txt",
  [`checker_exit_code=${checkerExitCode}`, ...messages].join("\n") + "\n"
);
originalLog(`[integrity-capture] wrote ${messages.length} lines to dist/integrity-report.txt`);
