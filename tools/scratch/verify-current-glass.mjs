import "./lib/win-console.mjs";
import fs from "node:fs";
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);
for (const n of [
  "Wait for MCP Authentication",
  "等待 MCP 验证",
  "Auto-Parse Links",
  "自动解析链接",
  'cRn="Remote Control"',
  "Remote Control",
  "Follow System Color Scheme",
  "跟随系统配色",
  "Choose which theme to use",
  "选择要使用的主题",
  "Public Profile",
  "公开资料",
  "Worktrees",
  "工作树",
]) console.log(glass.includes(n) ? "HIT" : "MISS", n);
