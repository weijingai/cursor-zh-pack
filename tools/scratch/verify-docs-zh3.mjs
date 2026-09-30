import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);

const checks = [
  ["D 针对 t", desktop, "针对 ${t} 禁用"],
  ["G 针对 e", glass, "针对 ${e} 禁用"],
  ["D leftover Disable for t", desktop, "Disable for ${t}"],
  ["G leftover Disable for e", glass, "Disable for ${e}"],
  ["D 全局禁用", desktop, "全局禁用"],
  ["D 钩子 nav", desktop, 'hooks:"钩子"'],
  ["D 提示", desktop, 'label:"提示"'],
  ["D 浏览市场", desktop, "浏览市场"],
];
for (const [tag, src, needle] of checks) {
  console.log(src.includes(needle) ? "HIT" : "MISS", tag);
}
