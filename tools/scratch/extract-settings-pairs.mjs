import "./lib/win-console.mjs";
import fs from "node:fs";

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const text = fs.readFileSync(fs.existsSync(orig) ? orig : orig.replace(".zhpack-orig", ""), "utf8");

const pairs = [];
for (const match of text.matchAll(/label:"([^"]{2,80})"[^]{0,240}?description:"([^"]{10,240})"/g)) {
  pairs.push({ label: match[1], description: match[2] });
}
for (const match of text.matchAll(/description:"([^"]{10,240})"[^]{0,240}?label:"([^"]{2,80})"/g)) {
  pairs.push({ label: match[2], description: match[1] });
}

const seen = new Set();
const uniq = [];
for (const item of pairs) {
  const key = `${item.label}||${item.description}`;
  if (seen.has(key)) continue;
  if (!/[A-Za-z]/.test(item.label) || !/[A-Za-z]/.test(item.description)) continue;
  if (/^\$\{|https?:|^\w+\.\w+/.test(item.description)) continue;
  seen.add(key);
  uniq.push(item);
}

const viewCmds = [];
let from = 0;
while ((from = text.indexOf("Te.MenubarViewMenu", from)) !== -1) {
  viewCmds.push(text.slice(from, from + 350));
  from += 18;
}

const i = text.indexOf("_showNotification(){const e");
const integrity = i >= 0 ? text.slice(i, i + 900) : "";
const j = text.indexOf("integrityService.isPure()");
const adminWarn = j >= 0 ? text.slice(j - 200, j + 280) : "";

fs.writeFileSync(
  "catalog/settings-pairs.json",
  JSON.stringify({ count: uniq.length, pairs: uniq, viewCmds, integrity, adminWarn }, null, 2) + "\n",
);
console.log("pairs", uniq.length);
console.log(uniq.map((p) => `${p.label} :: ${p.description}`).join("\n"));
console.log("\n--- integrity ---\n", integrity);
console.log("\n--- admin ---\n", adminWarn);
console.log("\n--- view cmds", viewCmds.length);
