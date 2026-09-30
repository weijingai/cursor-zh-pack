import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const i = desktop.indexOf("pCe={plugins:");
console.log(desktop.slice(i, i + 2200));
console.log("\n==== RULES/HOOKS/COMMANDS DUMP ====");
const j = desktop.indexOf('rules:{title:"Guide Agent');
console.log(desktop.slice(j, j + 1400));
