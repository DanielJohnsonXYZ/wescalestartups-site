import fs from "node:fs";

const file = "scripts/apply-resources-audit.mjs";
let source = fs.readFileSync(file, "utf8");

const broken = '  if (/\\.(xml|txt)$/.test(route)) return `dist/${route.replace(/^\\//, "")}`;\n  return `dist/${route.replace(/^\\//, "")}.html`;';
const repaired = '  if (/\\.(xml|txt)$/.test(route)) return "dist/" + route.replace(/^\\//, "");\n  return "dist/" + route.replace(/^\\//, "") + ".html";';

if (source.includes(broken)) {
  source = source.replace(broken, repaired);
  fs.writeFileSync(file, source);
  console.log("Repaired nested template literals in Resources audit generator.");
} else if (source.includes(repaired)) {
  console.log("Resources audit generator already repaired.");
} else {
  throw new Error("Could not locate the Resources generator path helper.");
}
