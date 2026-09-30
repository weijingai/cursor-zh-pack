import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

const i = text.indexOf('oFy=\'Reset "Don');
console.log("oFy block\n", text.slice(i, i + 700));

const j = text.indexOf("VOy=");
console.log("\nVOy review options\n", text.slice(j, j + 250));
const k = text.indexOf("GOy=");
console.log("\nGOy density\n", text.slice(k, k + 250));
const l = text.indexOf("CFy=");
console.log("\nCFy restore\n", text.slice(l, l + 350));
const m = text.indexOf("BOy=");
console.log("\nBOy layout\n", text.slice(m, m + 200));

const n = text.indexOf("Data Sharing Enabled");
console.log("\ndata sharing\n", text.slice(n - 100, n + 500));

const o = glass.indexOf('"Send follow-up"');
console.log("\nsend follow\n", glass.slice(o - 80, o + 80));

const p = glass.indexOf("Continue Working");
console.log("\ncontinue\n", glass.slice(p - 80, p + 120));

for (const needle of ['"Configurable"', "Configurable'", ">Configurable", "children:\"Configurable\""]) {
  console.log(needle, text.indexOf(needle), glass.indexOf(needle));
}

const q = text.indexOf("Privacy Mode");
console.log("\nnear privacy footer", text.slice(text.indexOf("Data Sharing Enabled") - 400, text.indexOf("Data Sharing Enabled") + 80));
