import "../lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const glass = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js"),
  "utf8",
);
const desktop = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js"),
  "utf8",
);
const checks = [
  "截取屏幕截图",
  "强制重新加载",
  "复制当前网址",
  "显示书签栏",
  "清除浏览历史",
  "清除 Cookie",
  "清除缓存",
  "隐藏收藏与历史",
  "标为已读",
  'label:"派生"',
  'label:"移动到"',
  'label:"归档"',
  'children:"归档"',
];
for (const [tag, src] of [
  ["G", glass],
  ["D", desktop],
]) {
  console.log("\n==", tag);
  for (const c of checks) console.log(src.includes(c) ? "HIT" : "MISS", c);
}
