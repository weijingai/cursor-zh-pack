import "./lib/win-console.mjs";
import fs from "node:fs";

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extra = [
  [" submits chat, Enter inserts a newline, and primary actions move to ", " 提交聊天，Enter 插入新行，主要操作改为 "],
  ["Submit with ${Ei?\"\\u2318 + \":\"Ctrl + \"}Enter", "使用 ${Ei?\"\\u2318 + \":\"Ctrl + \"}Enter 提交"],
  ["Included in ${f}", "包含于 ${f}"],
  ["Mark Agent commits as 'Made with Cursor'", "将 Agent 提交标记为“Made with Cursor”"],
  ["Mark pull requests as made with Cursor", "将拉取请求标记为使用 Cursor 完成"],
  ["Get Pro+", "获取 Pro+"],
  ["Get Ultra", "获取 Ultra"],
  ['"aria-label":"Loading usage"', '"aria-label":"正在加载用量"'],
  ["Includes Cursor Grok and Composer", "包含 Cursor Grok 和 Composer"],
  ["Consumed by named models.", "由具名模型消耗。"],
];
const seen = new Set(contexts.map((p) => p[0]));
let n = 0;
for (const pair of extra) {
  if (seen.has(pair[0])) continue;
  contexts.push(pair);
  seen.add(pair[0]);
  n += 1;
}
fs.writeFileSync("payload/hardcoded-context.json", JSON.stringify(contexts, null, 2) + "\n");
console.log("added", n, "total", contexts.length);
