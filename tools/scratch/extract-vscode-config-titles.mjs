import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);

const titles = new Set();
const re = /registerConfiguration\(\{id:"([^"]+)",title:(?:"([^"]+)"|S\()/g;
let m;
while ((m = re.exec(desktop))) {
  if (m[2]) titles.add(`${m[1]} | ${m[2]}`);
}
console.log("literal config titles", titles.size);
for (const t of [...titles].sort()) console.log(t);
