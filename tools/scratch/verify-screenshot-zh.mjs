import "./lib/win-console.mjs";
import fs from "node:fs";

const t = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js", "utf8");
const g = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js", "utf8");
const checks = [
  "重置“不再询问”对话框",
  "查看你先前隐藏的警告和提示",
  "窗口布局",
  "在 Agent 与编辑器的默认布局之间切换",
  "在窗口底部显示状态栏",
  "浮动岛",
  "所有编辑器关闭时",
  "旧版堆叠视图",
  "已启用数据共享",
  "代码库、提示、编辑",
  'label:"启动"',
  'label:"紧凑"',
  'n?"隐藏":"显示"',
  'children:"配置"',
  "继续工作",
  "发送跟进",
  "在系统托盘中显示 Cursor",
];
for (const s of checks) console.log(t.includes(s) || g.includes(s) ? "OK" : "MISS", s);
console.log("left Don't Ask", t.includes("Don't Ask Again") || t.includes("Don\\u2019t Ask Again"));
console.log("left Window Layout label", t.includes('label:"Window Layout"'));
console.log("left Data Sharing Enabled", t.includes("Data Sharing Enabled"));
