import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
];
const patterns = [
  /title:\{value:"([^"]{3,80})",original:"\1"\}/g,
  /placeholder:"([A-Z][^"]{8,90})"/g,
  /"Add (?:Symbol|Directory|File) to [^"]+"/g,
  /"Create Rule"/g,
  /"New Agent"/g,
  /"Agents Window"/g,
  /"Cursor Settings"/g,
];
const found = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const re of patterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(text))) found.add(match[1] ?? match[0].slice(1, -1));
  }
}
console.log([...found].sort().join("\n"));
console.log("count", found.size);
