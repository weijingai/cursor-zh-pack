import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));

const jsSafe = {
  Conversation: "对话",
  Import: "导入",
  Plugins: "插件",
  Privacy: "隐私",
  Rules: "规则",
  Skills: "技能",
  "Approve this tool": "批准此工具",
  "Enable Storage": "启用存储",
  "Automation name": "自动化名称",
  "Automation name must be non-empty": "自动化名称不能为空",
  "Generic Secret": "通用密钥",
  "CLI Credentials": "CLI 凭据",
  "Microsoft Entra ID": "Microsoft Entra ID",
  "Client ID": "客户端 ID",
  "Client Secret": "客户端密钥",
  "OAuth Client ID (optional)": "OAuth 客户端 ID（可选）",
  "OAuth Client Secret (optional)": "OAuth 客户端密钥（可选）",
  "Edit Form": "编辑表单",
  "Edit JSON": "编辑 JSON",
  "Open Commands": "打开命令",
  "Open Rule": "打开规则",
  "Maximum Local LSP Workspaces": "本地 LSP 工作区上限",
  "Enable language server by default to provide code intelligence in workspaces":
    "默认启用语言服务器，以便在工作区提供代码智能",
  "Enable language server by default to provide code intelligence in agent worktree workspaces":
    "默认启用语言服务器，以便在 Agent 工作树工作区提供代码智能",
  "Maximum local workspaces that can run language servers at the same time":
    "可同时运行语言服务器的本地工作区数量上限",
  "No repositories found": "未找到仓库",
  "Repository scope": "仓库范围",
  "All Plugins": "全部插件",
  "Number of times used by your team in the last 30 days.": "过去 30 天团队使用次数。",
  "Number of teammates using this plugin.": "正在使用此插件的团队成员数。",
  "Close Window": "关闭窗口",
  Projects: "项目",
  Repositories: "仓库",
  Customize: "自定义",
  "Code Review": "代码审查",
  "Find Critical Bugs": "查找严重缺陷",
  "Find critical bugs": "查找严重缺陷",
  "Scan for vulnerabilities": "扫描漏洞",
  "Scan codebase for vulnerabilities": "扫描代码库漏洞",
  "Generate Documentation": "生成文档",
  "Generate documentation": "生成文档",
  "Generate docs": "生成文档",
  "No automations": "还没有自动化",
  "No Automations": "还没有自动化",
};

let added = 0;
for (const [en, zh] of Object.entries(jsSafe)) {
  if (map[en] !== zh) {
    map[en] = zh;
    added += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const existingDom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(existingDom, {
  Workbench: "工作台",
  Window: "窗口",
  Editor: "编辑器",
  Features: "功能",
  Extensions: "扩展",
  Application: "应用程序",
  Conversation: "对话",
  Import: "导入",
  Plugins: "插件",
  Privacy: "隐私",
  Rules: "规则",
  Skills: "技能",
  Customize: "自定义",
  Projects: "项目",
  Repositories: "仓库",
  Search: "搜索",
  Automations: "自动化",
  Marketplace: "市场",
  Settings: "设置",
  File: "文件",
  Edit: "编辑",
  View: "查看",
  Help: "帮助",
  Mine: "我的",
  Team: "团队",
  Popular: "热门",
  "Code Review": "代码审查",
  "Find Critical Bugs": "查找严重缺陷",
  "Find critical bugs": "查找严重缺陷",
  "Scan for vulnerabilities": "扫描漏洞",
  "Scan codebase for vulnerabilities": "扫描代码库漏洞",
  "Generate Documentation": "生成文档",
  "Generate documentation": "生成文档",
  "Generate docs": "生成文档",
  "Get Started": "开始使用",
  "Get started": "开始使用",
  "From Cursor": "来自 Cursor",
  "All Runs": "全部运行记录",
  "No Automations Yet": "还没有自动化",
  "No automations": "还没有自动化",
  "New Automation": "新建自动化",
  "New Project": "新建项目",
  "No Repo": "无仓库",
  "No repositories found": "未找到仓库",
  "Approve this server": "批准此服务器",
  "Approve this tool": "批准此工具",
  "Enable LSPs": "启用 LSP",
  "GitHub Token": "GitHub 令牌",
  "HTTP headers": "HTTP 标头",
  "Open Rule": "打开规则",
  "Read MCP resource": "读取 MCP 资源",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['projects:"Projects"', 'projects:"项目"'],
  ['label:"Projects"', 'label:"项目"'],
  ['children:"Projects"', 'children:"项目"'],
  ['children:"Repositories"', 'children:"仓库"'],
  ['label:"Repositories"', 'label:"仓库"'],
  ['label:"Customize"', 'label:"自定义"'],
  ['label:"Enable LSPs"', 'label:"启用 LSP"'],
  ['label:"Enable LSPs for Worktrees"', 'label:"为工作树启用 LSP"'],
  ['label:"Enable Storage"', 'label:"启用存储"'],
  ['label:"Automation name"', 'label:"自动化名称"'],
  ['label:"Approve this server"', 'label:"批准此服务器"'],
  ['label:"Approve this tool"', 'label:"批准此工具"'],
  ['label:"GitHub Token"', 'label:"GitHub 令牌"'],
  ['label:"HTTP headers"', 'label:"HTTP 标头"'],
  ['label:"Open Rule"', 'label:"打开规则"'],
  ['label:"Open Rules"', 'label:"打开规则"'],
  ['label:"Open Commands"', 'label:"打开命令"'],
  ['label:"Read MCP resource"', 'label:"读取 MCP 资源"'],
  ['label:"Client ID"', 'label:"客户端 ID"'],
  ['label:"Client Secret"', 'label:"客户端密钥"'],
  ['label:"Generic Secret"', 'label:"通用密钥"'],
  ['label:"CLI Credentials"', 'label:"CLI 凭据"'],
  ['children:"Edit Form"', 'children:"编辑表单"'],
  ['children:"Edit JSON"', 'children:"编辑 JSON"'],
  ['placeholder:"OAuth Client ID (optional)"', 'placeholder:"OAuth 客户端 ID（可选）"'],
  ['placeholder:"OAuth Client Secret (optional)"', 'placeholder:"OAuth 客户端密钥（可选）"'],
  ['children:"No repositories found"', 'children:"未找到仓库"'],
  ['"aria-label":"Repository scope"', '"aria-label":"仓库范围"'],
  ['title:"All Plugins"', 'title:"全部插件"'],
  ['emptyTitle:"No Automations Yet"', 'emptyTitle:"还没有自动化"'],
  ['pageTitle:"Automations"', 'pageTitle:"自动化"'],
  ['newAutomationButtonLabel:"New Automation"', 'newAutomationButtonLabel:"新建自动化"'],
  ['label:"New Project"', 'label:"新建项目"'],
  ['label:"Search"', 'label:"搜索"'],
  ['label:"Automations"', 'label:"自动化"'],
  ['label:"Marketplace"', 'label:"市场"'],
  ['label:"Settings"', 'label:"设置"'],
  ['g0e="No Repo"', 'g0e="无仓库"'],
  [
    'description:"Enable language server by default to provide code intelligence in workspaces"',
    'description:"默认启用语言服务器，以便在工作区提供代码智能"',
  ],
  [
    'description:"Enable language server by default to provide code intelligence in agent worktree workspaces"',
    'description:"默认启用语言服务器，以便在 Agent 工作树工作区提供代码智能"',
  ],
  [
    'description:"Maximum local workspaces that can run language servers at the same time"',
    'description:"可同时运行语言服务器的本地工作区数量上限"',
  ],
  ['title:"Review Code with Bugbot"', 'title:"使用 Bugbot 审查代码"'],
  ['description:"Catch bugs and auto-fix before they ship."', 'description:"在发布前捕获缺陷并自动修复。"'],
  ['title:"Scan and Triage Security Vulnerabilities"', 'title:"扫描并分诊安全漏洞"'],
  ['description:"Security checks on every change."', 'description:"每次更改都进行安全检查。"'],
  ['title:"Route PR Reviews and Auto-Approve"', 'title:"分配 PR 审查并自动批准"'],
  ['description:"Assign reviewers and approve PRs."', 'description:"指派审查者并批准 PR。"'],
  ['children:"Ship better code, faster"', 'children:"更快交付更好的代码"'],
  ['children:"From Cursor"', 'children:"来自 Cursor"'],
  ['children:"Popular"', 'children:"热门"'],
  ['children:"Mine"', 'children:"我的"'],
  ['children:"Team"', 'children:"团队"'],
  ['children:"Get Started"', 'children:"开始使用"'],
];

const seen = new Set(contexts.map((pair) => pair[0]));
let contextAdded = 0;
for (const pair of extraContexts) {
  if (seen.has(pair[0]) || pair[0] === pair[1]) continue;
  contexts.push(pair);
  seen.add(pair[0]);
  contextAdded += 1;
}
fs.writeFileSync("payload/hardcoded-context.json", JSON.stringify(contexts, null, 2) + "\n");
console.log(`map +${added} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length} dom=${Object.keys(existingDom).length}`);
