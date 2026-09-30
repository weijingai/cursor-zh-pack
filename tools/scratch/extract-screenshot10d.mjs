import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf("const u=RY(),d=[{id:\"local\",name:n?`O");
console.log("A", i, glass.slice(i, i + 200));
const j = glass.indexOf("availableAutorunModes");
console.log("\nB", glass.slice(j, j + 400));
const k = glass.indexOf("label:\"Allowlist\"");
console.log("\nC allowlist label", k);
const k2 = glass.indexOf('"Allowlist"');
let n = 0, from = 0;
while (n < 8) {
  const x = glass.indexOf('"Allowlist"', from);
  if (x < 0) break;
  const ctx = glass.slice(x - 40, x + 50);
  if (/label|title|children|name:/.test(ctx)) console.log("AL", JSON.stringify(ctx));
  from = x + 10;
  n += 1;
}
const p = glass.indexOf("figma_to_ui");
console.log("\nfigma", p, p>=0?glass.slice(p-80,p+200):"");
const q = glass.indexOf("build_from_design");
console.log("\ndesign cta", glass.slice(glass.indexOf("cta:\"build"), glass.indexOf("cta:\"build")+300));
console.log("\nempty", glass.slice(glass.indexOf("title:\"Debug an issue\"")-600, glass.indexOf("title:\"Debug an issue\"")+80));
