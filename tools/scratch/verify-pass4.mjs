import "./lib/win-console.mjs";
import fs from "node:fs";

const t = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js", "utf8");
const g = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js", "utf8");
const both = t + g;
const checks = [
  "选择 Agent 如何运行命令执行",
  "阻止 Agent 自动删除文件",
  "在编辑器中显示内联差异装饰",
  "使用预览框，而不是把回复直接流式写入 shell",
  "请打开一个文件夹以使用后台 Agent",
  "在 Cursor 内或默认浏览器中打开拉取请求链接",
  "浏览器自动化",
  "这些域名必须可访问",
  "部分接受",
  "分层 Cursor Ignore",
  "提交聊天，Enter 插入新行",
  "打开视图",
  "源代码管理",
  "打开 IDE",
  "查看许可证",
  "获取 Pro+",
  "包含 Cursor Grok 和 Composer",
];
for (const s of checks) console.log(both.includes(s) ? "OK" : "MISS", s);
console.log("left Auto-Review quoted", /"Auto-Review"/.test(t));
console.log("left Applying Changes title", t.includes('title:"Applying Changes"'));
console.log("left Source Control", t.includes('"Source Control"'));
