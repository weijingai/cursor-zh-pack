import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

const i = glass.indexOf('id:"search",iconName:"magnifying-glass"');
console.log("search idx", i);
console.log(glass.slice(Math.max(0, i - 800), i + 200));

const j = glass.indexOf("customize:{id:");
console.log("\ncustomize idx", j);
if (j >= 0) console.log(glass.slice(j, j + 400));

const k = glass.indexOf("projects:{id:");
console.log("\nprojects idx", k);
if (k >= 0) console.log(glass.slice(k, k + 400));

const n = glass.indexOf("Ize=");
console.log("\nIze idx", n);
if (n >= 0) console.log(glass.slice(n, n + 900));
