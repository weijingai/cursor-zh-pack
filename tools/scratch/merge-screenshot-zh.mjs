import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const extra = {
  'Reset "Don’t Ask Again" Dialogs': "重置“不再询问”对话框",
  "Reset \"Don't Ask Again\" Dialogs": "重置“不再询问”对话框",
  "See warnings and tips that you’ve hidden": "查看你先前隐藏的警告和提示",
  "See warnings and tips that you've hidden": "查看你先前隐藏的警告和提示",
  "Window Layout": "窗口布局",
  "Switch between Agent and Editor default layouts": "在 Agent 与编辑器的默认布局之间切换",
  "Show status bar at the bottom of the window": "在窗口底部显示状态栏",
  "Show inline diff review controls in top level breadcrumbs or floating island": "在顶层痕迹导航或浮动岛中显示内联差异审查控件",
  "When all editors are closed, hide the editor area and maximize chat": "所有编辑器关闭时，隐藏编辑器区域并最大化聊天",
  "Show chats as editor tabs inside the chat area instead of the legacy stacked view": "在聊天区域内以编辑器标签页显示聊天，而不是旧版堆叠视图",
  "Show Cursor in system tray": "在系统托盘中显示 Cursor",
  "Data Sharing Enabled": "已启用数据共享",
  "Your prompts, edits and other usage data will be stored and trained on by Cursor to improve the product.": "你的提示、编辑和其他用量数据将被 Cursor 存储并用于训练，以改进产品。",
  "Your codebase, prompts, edits and other usage data will be stored and trained on by Cursor to improve the product.": "你的代码库、提示、编辑和其他用量数据将被 Cursor 存储并用于训练，以改进产品。",
  " Prompts and limited telemetry may also be shared with model providers when you explicitly select their models.": " 当你明确选择某模型时，提示和有限遥测也可能与模型提供方共享。",
  "Your code data will not be trained on or used to improve the product. Code may be stored to provide features such as Background Agent.": "你的代码数据不会被用于训练或改进产品。代码可能会被存储，以便提供后台 Agent 等功能。",
  "Your code data will not be trained on or used to improve the product. We will not store your code.": "你的代码数据不会被用于训练或改进产品。我们不会存储你的代码。",
  "No training. Code may be stored for Background Agent and other features.": "不训练。代码可能会被存储，以便提供后台 Agent 等功能。",
  "No training and no storage. Background Agent and other features that require code storage will be disabled.": "不训练也不存储。需要存储代码的后台 Agent 等功能将被禁用。",
  "Privacy Mode (Legacy)": "隐私模式（旧版）",
  "Continue Working": "继续工作",
  "Send follow-up": "发送跟进",
  "About Allowlist": "关于允许列表",
  "Last Used Windows": "上次使用的窗口",
  "Agent Window": "Agent 窗口",
  "Don't Ask Again": "不再询问",
  "Configure": "配置",
  "Startup": "启动",
};

let added = 0;
for (const [en, zh] of Object.entries(extra)) {
  if (!map[en]) {
    map[en] = zh;
    added += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['Reset "Don\\u2019t Ask Again" Dialogs', "重置“不再询问”对话框"],
  ["See warnings and tips that you\\u2019ve hidden", "查看你先前隐藏的警告和提示"],
  ['label:"Startup"', 'label:"启动"'],
  ['label:"Window Layout"', 'label:"窗口布局"'],
  ['"aria-label":"Window Layout"', '"aria-label":"窗口布局"'],
  ['label:"Status Bar"', 'label:"状态栏"'],
  ['label:"Compact"', 'label:"紧凑"'],
  ['label:"Balanced"', 'label:"均衡"'],
  ['label:"Detailed"', 'label:"详细"'],
  ['label:"Breadcrumb"', 'label:"痕迹导航"'],
  ['label:"Island"', 'label:"浮动岛"'],
  ['label:"Default"', 'label:"默认"'],
  ['label:"Agent Window"', 'label:"Agent 窗口"'],
  ['label:"Last Used Windows"', 'label:"上次使用的窗口"'],
  ['n?"Hide":"Show"', 'n?"隐藏":"显示"'],
  ['children:"Configure"', 'children:"配置"'],
  ['placeholder:"Configure"', 'placeholder:"配置"'],
  ['n?"Hide":"Show"', 'n?"隐藏":"显示"'],
  ['children:"Continue Working"', 'children:"继续工作"'],
  ['LWl="Send follow-up"', 'LWl="发送跟进"'],
  [',"Continue Working")', ',"继续工作")'],
];

let contextAdded = 0;
const seen = new Set(contexts.map((pair) => pair[0]));
for (const pair of extraContexts) {
  if (seen.has(pair[0]) || pair[0] === pair[1]) continue;
  contexts.push(pair);
  seen.add(pair[0]);
  contextAdded += 1;
}
fs.writeFileSync("payload/hardcoded-context.json", JSON.stringify(contexts, null, 2) + "\n");
console.log(`map +${added} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length}`);
