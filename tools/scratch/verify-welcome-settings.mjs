import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
  "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
];

const checks = [
  "<div>打开项目",
  "<div>克隆仓库",
  "<div>通过 SSH 连接",
  "<div>从 iOS 操控",
  "<div>新建项目",
  "<span>最近的项目</span>",
  "empty-screen-view-all>查看全部",
  "general:\"常规\"",
  "chat:\"Agent\"",
  "tab:\"Tab 补全\"",
  "\"grok-bot\":\"Grok 机器人\"",
  "label:\"默认模型\"",
  "label:\"默认模式\"",
  "label:\"上下文与工具\"",
  "label:\"自动运行\"",
  "label:\"编辑器设置\"",
  "label:\"Cursor 账户\"",
  "label:\"隐私\"",
  "label:\"导入\"",
  "title:\"隐私模式\"",
  "将符号添加到当前聊天",
  "将符号添加到新聊天",
  "切换 Agents 侧栏",
  "切换内联差异",
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log("missing", file);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  console.log("\n" + file);
  for (const needle of checks) {
    console.log(`  ${text.includes(needle) ? "OK" : "MISS"}  ${needle}`);
  }
  const leftover = [
    "<div>Open project",
    "<div>Clone repo",
    "<div>Steer from iOS",
    "label:\"Default Model\"",
    "tab:\"Tab\"",
  ];
  for (const needle of leftover) {
    if (text.includes(needle)) console.log(`  LEFT  ${needle}`);
  }
}
