import "./lib/win-console.mjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const roots = [
  "C:/Program Files/Cursor/resources/app/out",
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out"),
];
const checks = [
  'general:"常规"',
  'chat:"Agent"',
  '"套餐与用量"',
  '"规则、技能、子 Agent"',
  "认识新的 Agents 窗口",
  "Cursor 设置",
  "搜索设置",
  "还没有 Agent",
  "新建 Agent",
  "关闭设置",
];
for (const out of roots) {
  console.log("\n==", out);
  const files = {
    desktop: path.join(out, "vs/workbench/workbench.desktop.main.js"),
    glass: path.join(out, "vs/workbench/workbench.glass.main.js"),
    html: path.join(out, "vs/code/electron-sandbox/workbench/workbench.html"),
    ui: path.join(out, "vs/code/electron-sandbox/workbench/cursor-zh-ui.js"),
  };
  for (const [name, file] of Object.entries(files)) {
    if (!fs.existsSync(file)) {
      console.log(name, "MISSING");
      continue;
    }
    const text = fs.readFileSync(file, "utf8");
    const hits = checks.filter((item) => text.includes(item));
    console.log(name, "bytes=" + text.length, "hits=" + hits.length + "/" + checks.length, hits.slice(0, 8).join(" | "));
  }
}
