import "./lib/win-console.mjs";
import fs from "node:fs";

const t = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig", "utf8");
const i = t.indexOf("inserts a newline");
console.log(t.slice(i - 80, i + 200));
const j = t.indexOf("Included in $");
console.log("\nINCLUDED", t.slice(j - 20, j + 60));
const k = t.indexOf("Unlock 3x more usage");
console.log("\nUNLOCK", t.slice(k - 60, k + 90));
const m = t.indexOf("Mark Agent commits as");
console.log("\nMARK", t.slice(m, m + 80));
