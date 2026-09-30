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
  ["D 全局禁用", desktop, "全局禁用"],
  ["D 针对 ${t} 禁用", desktop, "针对 ${t} 禁用"],
  ["D 暂停 Tab", desktop, "暂停 Tab"],
  ["D 取消暂停", desktop, "取消暂停"],
  ["D Tab 统计", desktop, "Tab 统计"],
  ["D 智能体统计", desktop, "智能体统计"],
  ["D 尚无已评分提交", desktop, "尚无已评分提交"],
  ["D hooks 钩子", desktop, 'hooks:"钩子"'],
  ["D label 钩子", desktop, 'label:"钩子"'],
  ["D label 提示", desktop, 'label:"提示"'],
  ["D 浏览市场", desktop, "浏览市场"],
  ["D 管理插件", desktop, "管理插件"],
  ["D 用钩子实现自动化", desktop, "用钩子实现自动化"],
  ["G hooks 钩子", glass, 'hooks:"钩子"'],
  ["G label 提示", glass, 'label:"提示"'],
  ["G 浏览市场", glass, "浏览市场"],
  ["G 用钩子实现自动化", glass, "用钩子实现自动化"],
  ["D leftover Disable globally", desktop, "Disable globally"],
  ["D leftover Snooze Cursor Tab", desktop, "Snooze Cursor Tab"],
  ["D leftover Browse Marketplace", desktop, "Browse Marketplace"],
  ["G leftover label Tips", glass, 'label:"Tips"'],
  ["G leftover hooks Hooks", glass, 'hooks:"Hooks"'],
];

for (const [tag, src, needle] of checks) {
  console.log(src.includes(needle) ? "HIT" : "MISS", tag);
}
