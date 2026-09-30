import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));

const jsSafe = {
  "New Automation": "新建自动化",
  "No Automations Yet": "还没有自动化",
  "From Cursor": "来自 Cursor",
  "Ship better code, faster": "更快交付更好的代码",
  "Review Code with Bugbot": "使用 Bugbot 审查代码",
  "Catch bugs and auto-fix before they ship.": "在发布前捕获缺陷并自动修复。",
  "Scan and Triage Security Vulnerabilities": "扫描并分诊安全漏洞",
  "Security checks on every change.": "每次更改都进行安全检查。",
  "Route PR Reviews and Auto-Approve": "分配 PR 审查并自动批准",
  "Assign reviewers and approve PRs.": "指派审查者并批准 PR。",
  "All Runs": "全部运行记录",
  "Stop All Runs": "停止全部运行",
  "Add Automation": "添加自动化",
  "Get Started": "开始使用",
  "Search runs...": "搜索运行记录...",
  "Successful · 24h": "成功 · 24 小时",
  "Failed · 24h": "失败 · 24 小时",
  "Successful · 7d": "成功 · 7 天",
  "Failed · 7d": "失败 · 7 天",
  "Automate repetitive tasks with always-on agents and configure Cursor's built-in agents for your team.":
    "用始终在线的 Agent 自动处理重复任务，并为团队配置 Cursor 内置 Agent。",
  "Automate repetitive tasks with always-on cloud agents that respond to environment triggers.":
    "用始终在线的云端 Agent 自动处理重复任务，它们会响应环境触发器。",
  "Upgrade for Automations, unlimited completions, MAX Mode, and more":
    "升级以使用自动化、无限补全、MAX 模式等功能",
  "Automations use Cloud Agents, which require us to give agents access to your codebase. This is not compatible with Legacy Privacy Mode.":
    "自动化使用云端 Agent，需要允许 Agent 访问你的代码库。这与旧版隐私模式不兼容。",
  " Ask a team admin to update your team's privacy setting to use automations.":
    "请让团队管理员更新团队隐私设置后再使用自动化。",
  "Find critical bugs": "查找严重缺陷",
  "Analyze recent commits for high-severity correctness bugs and submit safe fixes":
    "分析最近的提交，查找高严重性正确性缺陷并提交安全修复",
  "Scan codebase for vulnerabilities": "扫描代码库漏洞",
  "Review the full repository on a schedule and alert on validated high-impact security issues":
    "按计划审查整个仓库，并在确认高影响安全问题时发出警报",
  "Generate docs": "生成文档",
  "Create and update developer documentation for recently changed or undocumented code":
    "为最近更改或缺少文档的代码创建并更新开发者文档",
  "Incidents & Triage": "事件与分诊",
  "Data & Research": "数据与研究",
  "Send Slack": "发送到 Slack",
  "Fix in Cursor": "在 Cursor 中修复",
  "Fix in Web": "在网页中修复",
  "Open in Cursor": "在 Cursor 中打开",
  "Open in Web": "在网页中打开",
  "High - Security": "高 - 安全",
  "Medium - Security": "中 - 安全",
  "Cursor Marketplace": "Cursor 市场",
  "No Repo": "无仓库",
  "Support for Chinese": "中文支持",
  "New Window": "新建窗口",
  "Open Recent": "打开最近的文件",
  "Close Window": "关闭窗口",
  "Select All": "全选",
  "Command Palette...": "命令面板...",
  "Command Palette": "命令面板",
  "Toggle Full Screen": "切换全屏",
  "Toggle Developer Tools": "切换开发人员工具",
  "Open Process Explorer": "打开进程资源管理器",
  "Reload Window": "重新加载窗口",
  "Keyboard Shortcuts": "键盘快捷方式",
  "New Agent": "新建 Agent",
  "New Project": "新建项目",
  "Cursor Settings": "Cursor 设置",
  "Secrets written to plaintext logs": "密钥被写入明文日志",
  "Template injection in config render": "配置渲染中的模板注入",
  "Show Chat History": "显示聊天记录",
  "Show Chat History (Editor)": "显示聊天记录（编辑器）",
  "new repository": "新建仓库",
};

const domOnly = {
  Automations: "自动化",
  Repositories: "仓库",
  Projects: "项目",
  Marketplace: "市场",
  Back: "返回",
  Name: "名称",
  IDE: "IDE",
  Use: "使用",
  Mine: "我的",
  Team: "团队",
  Popular: "热门",
  Scheduled: "已计划",
  Environment: "环境",
  "Code Review": "代码审查",
  Security: "安全",
  Search: "搜索",
  Customize: "自定义",
  Settings: "设置",
  File: "文件",
  Edit: "编辑",
  View: "查看",
  Help: "帮助",
  More: "更多",
  Home: "主页",
  Upgrade: "升级",
  Retry: "重试",
  Evals: "评测",
  "New Eval": "新建评测",
  Context: "上下文",
  Tasks: "任务",
  "Search...": "搜索...",
  Enabled: "已启用",
  Disabled: "已禁用",
  Location: "位置",
  Orientation: "方向",
  Visibility: "可见性",
  "Font Size": "字体大小",
  "Font Family": "字体",
  "Tab Size": "Tab 大小",
  "Word Wrap": "自动换行",
  "Auto Save": "自动保存",
  "Format On Save": "保存时格式化",
  "Title Bar Style": "标题栏样式",
  "Menu Bar Visibility": "菜单栏可见性",
  "Confirm Exit": "退出时确认",
  "Restore Windows": "还原窗口",
  "Close When Empty": "空闲时关闭",
  "Color Theme": "颜色主题",
  "Icon Theme": "图标主题",
  "Side Bar Location": "侧边栏位置",
  "Activity Bar": "活动栏",
  Workbench: "工作台",
  Window: "窗口",
  Application: "应用程序",
  Features: "功能",
  Extensions: "扩展",
  Keyboard: "键盘",
  Telemetry: "遥测",
  Update: "更新",
  Accessibility: "辅助功能",
  Chat: "聊天",
  Debug: "调试",
  Testing: "测试",
  Remote: "远程",
  Timeline: "时间线",
  Comments: "注释",
  Breadcrumbs: "面包屑",
  Minimap: "缩略图",
  Scrollbar: "滚动条",
  Suggestions: "建议",
  Formatting: "格式化",
  "Diff Editor": "差异编辑器",
  "Text Editor": "文本编辑器",
  "Insert Spaces": "插入空格",
  "Line Height": "行高",
  "Cursor Style": "光标样式",
  "Cursor Blinking": "光标闪烁",
  "Render Whitespace": "呈现空白字符",
  "Sticky Scroll": "粘滞滚动",
  "Startup Editor": "启动编辑器",
  "Product Icon Theme": "产品图标主题",
  "Open Files In New Window": "在新窗口中打开文件",
  "Open Folders In New Window": "在新窗口中打开文件夹",
  "Open Without Arguments in New Window": "无参数时在新窗口中打开",
  "New Window Dimensions": "新窗口尺寸",
  "Icon Click Behavior": "图标单击行为",
  "Enable Preview Features": "启用预览功能",
  "Auto Save Delay": "自动保存延迟",
};

let added = 0;
for (const [en, zh] of Object.entries(jsSafe)) {
  if (!map[en]) {
    map[en] = zh;
    added += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const existingDom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(existingDom, domOnly);
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

let stripped = 0;
for (const key of Object.keys(domOnly)) {
  if (key in map && !(key in jsSafe)) {
    delete map[key];
    stripped += 1;
  }
}
if (stripped) fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['emptyTitle:"No Automations Yet"', 'emptyTitle:"还没有自动化"'],
  ['nameColumn:"Name"', 'nameColumn:"名称"'],
  ['newAutomationButtonLabel:"New Automation"', 'newAutomationButtonLabel:"新建自动化"'],
  ['pageTitle:"Automations"', 'pageTitle:"自动化"'],
  ['createButton:"Add Automation"', 'createButton:"添加自动化"'],
  ['label:"Automations"', 'label:"自动化"'],
  ['label:"New Project"', 'label:"新建项目"'],
  ['label:"New Agent"', 'label:"新建 Agent"'],
  ['label:"Search"', 'label:"搜索"'],
  ['label:"Marketplace"', 'label:"市场"'],
  ['label:"Settings"', 'label:"设置"'],
  ['label:"Back"', 'label:"返回"'],
  ['label:"File"', 'label:"文件"'],
  ['label:"Edit"', 'label:"编辑"'],
  ['label:"View"', 'label:"查看"'],
  ['label:"Help"', 'label:"帮助"'],
  ['placeholderContent:"Cursor Marketplace"', 'placeholderContent:"Cursor 市场"'],
  ['placeholderContent:"Cursor Settings"', 'placeholderContent:"Cursor 设置"'],
  ['children:"Mine"', 'children:"我的"'],
  ['children:"Team"', 'children:"团队"'],
  ['children:"From Cursor"', 'children:"来自 Cursor"'],
  ['children:"All Runs"', 'children:"全部运行记录"'],
  ['children:"Repositories"', 'children:"仓库"'],
  ['children:"Ship better code, faster"', 'children:"更快交付更好的代码"'],
  ['title:"Review Code with Bugbot"', 'title:"使用 Bugbot 审查代码"'],
  ['title:"Scan and Triage Security Vulnerabilities"', 'title:"扫描并分诊安全漏洞"'],
  ['title:"Route PR Reviews and Auto-Approve"', 'title:"分配 PR 审查并自动批准"'],
  ['title:"Command Palette"', 'title:"命令面板"'],
  ['title:"Toggle Developer Tools"', 'title:"切换开发人员工具"'],
  ['placeholder:"Search..."', 'placeholder:"搜索..."'],
  ['placeholder:"Search runs..."', 'placeholder:"搜索运行记录..."'],
  ['g0e="No Repo"', 'g0e="无仓库"'],
  ['Sdi="New Project"', 'Sdi="新建项目"'],
  ['qon="New Agent"', 'qon="新建 Agent"'],
  ['vIn="More"', 'vIn="更多"'],
  ['name:"Home"', 'name:"主页"'],
  ['s===void 0?"Get Started"', 's===void 0?"开始使用"'],
  ['children:"Get Started"', 'children:"开始使用"'],
  ['label:"Upgrade"', 'label:"升级"'],
  ['children:"Retry"', 'children:"重试"'],
  ['label:"Mine"', 'label:"我的"'],
  ['label:"Team"', 'label:"团队"'],
  ['label:"Evals"', 'label:"评测"'],
  ['children:"New Eval"', 'children:"新建评测"'],
  ['children:"Stop All Runs"', 'children:"停止全部运行"'],
  ['projects:"Projects"', 'projects:"项目"'],
  ['{menuId:Rt.MenubarFileMenu,label:"File",trigger:"text"}', '{menuId:Rt.MenubarFileMenu,label:"文件",trigger:"text"}'],
  ['{menuId:Rt.MenubarEditMenu,label:"Edit",trigger:"text"}', '{menuId:Rt.MenubarEditMenu,label:"编辑",trigger:"text"}'],
  ['{menuId:Rt.MenubarViewMenu,label:"View",trigger:"text"}', '{menuId:Rt.MenubarViewMenu,label:"查看",trigger:"text"}'],
  ['{menuId:Rt.MenubarHelpMenu,label:"Help",trigger:"text"}', '{menuId:Rt.MenubarHelpMenu,label:"帮助",trigger:"text"}'],
  [
    'ZWv="Automate repetitive tasks with always-on agents and configure Cursor\'s built-in agents for your team."',
    'ZWv="用始终在线的 Agent 自动处理重复任务，并为团队配置 Cursor 内置 Agent。"',
  ],
  [
    'btT="Automate repetitive tasks with always-on cloud agents that respond to environment triggers."',
    'btT="用始终在线的云端 Agent 自动处理重复任务，它们会响应环境触发器。"',
  ],
  [
    'ytT="Upgrade for Automations, unlimited completions, MAX Mode, and more"',
    'ytT="升级以使用自动化、无限补全、MAX 模式等功能"',
  ],
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
console.log(
  `map +${added} -${stripped} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length} dom=${Object.keys(existingDom).length}`,
);
