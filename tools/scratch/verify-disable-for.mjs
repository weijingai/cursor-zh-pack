import "./lib/win-console.mjs";
import fs from "node:fs";

const roots = [
  "C:/Program Files/Cursor/resources/app",
  "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app",
];
const files = [
  "out/vs/workbench/workbench.desktop.main.js",
  "out/vs/workbench/workbench.glass.main.js",
];

for (const root of roots) {
  for (const rel of files) {
    const file = `${root}/${rel}`;
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const hits = [];
    for (const needle of ["Disable for ${", "Disable for ${t}", "Disable for ${e}", "针对"]) {
      if (src.includes(needle)) hits.push(needle);
    }
    console.log(file, hits.join(" | ") || "none");
  }
}
