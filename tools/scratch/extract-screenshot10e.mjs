import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf("var JaT=[");
console.log(glass.slice(i, i + 1800));
const j = glass.indexOf("autorunModes");
console.log("\n==== autorun ====");
console.log(glass.slice(j, j + 800));
let from = 0, n = 0;
while (n < 10) {
  const x = glass.indexOf("Allowlist", from);
  if (x < 0) break;
  const ctx = glass.slice(Math.max(0, x - 30), x + 40);
  if (/label|title|children|name:"Allow/.test(ctx)) console.log("HIT", JSON.stringify(ctx));
  from = x + 8;
  n += 1;
}
