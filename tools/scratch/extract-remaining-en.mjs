import "./lib/win-console.mjs";
import fs from "node:fs";

const file = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js";
const orig = file + ".zhpack-orig";
const text = fs.readFileSync(fs.existsSync(orig) ? orig : file, "utf8");
const titles = new Set();
for (const match of text.matchAll(/title:\{value:"([^"]{3,70})",original:"\1"\}/g)) titles.add(match[1]);
const menuish = [...titles]
  .filter((s) => /^(Toggle|Show|Hide|Open|Find|Replace|Go to|View|Edit|Zoom|Split|Focus|Move|Copy|Paste|Undo|Redo|Select)/.test(s) || /Sidebar|Panel|Menu|Editor|Chat|Agent|Browser|Terminal/.test(s))
  .sort();
console.log(menuish.join("\n"));
console.log("count", menuish.length);
