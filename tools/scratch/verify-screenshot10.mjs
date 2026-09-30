import "./lib/win-console.mjs";
import fs from "node:fs";
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);
for (const n of [
  "连接仓库",
  "在 ${rs} 中新建 Agent",
  "导入你的 Claude Code 对话",
  "创建一个聚焦的聊天",
  "选择仓库",
  "从零开始",
  "使用现有",
  "本机",
  "排队",
  "提交",
  "上传图片",
  "领取句柄",
  "添加链接",
  "工具调用密度",
  "减少动效",
  "隐藏邮箱地址",
  "允许列表",
  "继承自父级",
  "这台电脑上没有 Cursor 管理的工作树",
  "K）输入框",
  "label:\"邮箱\"",
  "label:\"开\"",
]) console.log(glass.includes(n) ? "HIT" : "MISS", n);
