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
  ["D 批准此服务器", desktop, "批准此服务器"],
  ["D 批准此工具", desktop, "批准此工具"],
  ["D 启用 LSP", desktop, "启用 LSP"],
  ["D GitHub 令牌", desktop, "GitHub 令牌"],
  ["D HTTP 标头", desktop, "HTTP 标头"],
  ["D 打开规则", desktop, "打开规则"],
  ["D 读取 MCP 资源", desktop, "读取 MCP 资源"],
  ["D 自动化名称", desktop, "自动化名称"],
  ["D 客户端 ID", desktop, "客户端 ID"],
  ["G 还没有自动化", glass, "还没有自动化"],
  ["G 新建自动化", glass, "新建自动化"],
  ["G 来自 Cursor", glass, "来自 Cursor"],
  ["G 开始使用", glass, "开始使用"],
  ["G 全部运行记录", glass, "全部运行记录"],
  ["G 无仓库", glass, "无仓库"],
  ["G 新建项目", glass, "新建项目"],
  ["G 浏览市场 or 市场", glass, "市场"],
  ["G 查找严重缺陷", glass, "查找严重缺陷"],
  ["G 生成文档", glass, "生成文档"],
  ["G leftover Approve this server", desktop, "Approve this server"],
  ["G leftover No Automations Yet", glass, "No Automations Yet"],
];
for (const [tag, src, needle] of checks) {
  console.log(src.includes(needle) ? "HIT" : "MISS", tag);
}
