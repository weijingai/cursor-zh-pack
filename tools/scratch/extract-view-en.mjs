import "./lib/win-console.mjs";
import fs from "node:fs";

const file = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js";
const text = fs.readFileSync(file, "utf8");
const leftover = new Set();
for (const match of text.matchAll(/title:\{value:"([^"]{3,80})",original:"\1"\}/g)) leftover.add(match[1]);
for (const match of text.matchAll(/mnemonicTitle:"([^"]{3,80})"/g)) leftover.add(match[1]);

const viewish = [...leftover]
  .filter((s) => /View|Toggle|Show|Hide|Sidebar|Side Bar|Panel|Zen|Layout|Browser|Agent|Chat|Diff|Menu|Appearance|Editor|Terminal|Wrap|Zoom|Minimap|Breadcrumb|Sticky|Whitespace|Render/i.test(s))
  .sort();
console.log(viewish.join("\n"));
console.log("count", viewish.length, "all leftover", leftover.size);
fs.writeFileSync(
  "catalog/view-en-leftover.json",
  JSON.stringify({ viewish, leftover: [...leftover].sort() }, null, 2) + "\n",
);
