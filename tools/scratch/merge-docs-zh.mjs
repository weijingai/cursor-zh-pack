import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));

const jsSafe = {
  Hooks: "钩子",
  Tips: "提示",
  Commands: "命令",
  Snooze: "暂停",
  Unsnooze: "取消暂停",
  "Disable globally": "全局禁用",
  "Snooze Cursor Tab": "暂停 Tab",
  "Unsnooze Cursor Tab": "取消暂停 Tab",
  "Enable Cursor Tab": "启用 Cursor Tab",
  "Disable Cursor Tab": "禁用 Cursor Tab",
  "Select Cursor Tab snooze duration": "选择 Tab 暂停时长",
  "Temporarily disable Cursor Tab suggestions for a specified duration. You can unsnooze at any time.":
    "按指定时长暂停 Tab 建议。可随时取消暂停。",
  "Cursor Tab Preview": "Tab 预览",
  "Browse Marketplace": "浏览市场",
  "Manage plugins": "管理插件",
  "Open config": "打开配置",
  "Create Reusable Commands": "创建可复用命令",
  "1 minute": "1 分钟",
  "5 minutes": "5 分钟",
  "15 minutes": "15 分钟",
  "30 minutes": "30 分钟",
  "1 hour": "1 小时",
  "3 hours": "3 小时",
  "$(git-commit) No commit scored": "$(git-commit) 尚无已评分提交",
  "No commit has been scored yet": "尚无已评分的提交",
  "AI Code Tracking Stats - Tab": "AI 代码跟踪统计 - Tab",
  "AI Code Tracking Stats - Agent": "AI 代码跟踪统计 - 智能体",
  "AI Code Tracking - Recent Commit": "AI 代码跟踪 - 最近提交",
  "Disable Cursor Tab for these languages": "对这些语言禁用 Cursor Tab",
  "Enable partial accepts for Cursor Tab, using the editor.action.inlineSuggest.acceptNextWord keybinding":
    "启用 Cursor Tab 部分接受，使用 editor.action.inlineSuggest.acceptNextWord 快捷键",
  "Use preview box for terminal cmd-k. If turned off, responses are streamed directly into the shell.":
    "终端 Cmd+K 使用预览框。关闭后，回复会直接流入 shell。",
  "AI-based Terminal Completion Detection. ": "基于 AI 的终端补全检测。",
  "Use themed background colors for inline diffs": "为内联差异使用主题背景色",
  "Enable performance protection for inline diffs. When enabled, inline diff decorations will be suppressed if there are too many changes to prevent editor unresponsiveness.":
    "为内联差异启用性能保护。开启后，若更改过多会抑制内联差异装饰，以免编辑器卡顿。",
  "Show rotating tips on the empty screen": "在空白屏幕上轮换显示提示",
  "Rules give Agent persistent, system-level instructions for your coding standards and workflows.":
    "规则为 Agent 提供持久的系统级指令，用于你的编码标准和流程。",
  "Skills package domain-specific knowledge and workflows that Agent applies automatically when relevant.":
    "技能打包领域知识和工作流，Agent 会在相关时自动应用。",
  "Subagents are specialized assistants that run in their own context window so Agent can parallelize and stay focused.":
    "子 Agent 是运行在独立上下文窗口中的专用助手，便于 Agent 并行处理并保持专注。",
  "Approve this server": "批准此服务器",
  "Approve this tool": "批准此工具",
  "Automation name": "自动化名称",
  "Enable LSPs": "启用 LSP",
  "Enable Storage": "启用存储",
  "For Review": "待审查",
  "GitHub Token": "GitHub 令牌",
  "Go to Next Diff File": "转到下一个差异文件",
  "Go to Previous Diff File": "转到上一个差异文件",
  "HTTP headers": "HTTP 标头",
  "Importing": "正在导入",
  "Imports": "导入项",
  "Inline code": "行内代码",
  MCPs: "MCP",
  "On-Demand": "按需",
  "Open Rule": "打开规则",
  Plugin: "插件",
  "Read MCP resource": "读取 MCP 资源",
  Skill: "技能",
  Subagent: "子 Agent",
  Subagents: "子 Agent",
  "Automate with Hooks": "用钩子实现自动化",
  "Composer Session End Hooks": "Composer 会话结束钩子",
  "Open Hooks": "打开钩子",
  "View Hooks": "查看钩子",
  "Plugins bundle rules, skills, subagents, commands, MCP servers, and hooks into one installable package.":
    "插件把规则、技能、子 Agent、命令、MCP 服务器和钩子打包成一个可安装包。",
  "Hooks run custom scripts at lifecycle events to observe, control, and extend the agent loop.":
    "钩子在生命周期事件上运行自定义脚本，用于观察、控制和扩展智能体循环。",
};

let added = 0;
const skipJs = new Set(["Conversation", "GitHub", "Claude Code", "Magenta"]);
for (const [en, zh] of Object.entries(jsSafe)) {
  if (skipJs.has(en)) continue;
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
  Hooks: "钩子",
  Tips: "提示",
  Browse: "浏览",
  Commands: "命令",
  Snooze: "暂停",
  Unsnooze: "取消暂停",
  fastest: "最快",
  "auto (default)": "自动（默认）",
  "Disable globally": "全局禁用",
  "Cursor Tab": "Cursor Tab",
  "Browse Marketplace": "浏览市场",
  "Manage plugins": "管理插件",
  "Open config": "打开配置",
  "No commit scored": "尚无已评分提交",
  Model: "模型",
  Marketplace: "市场",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['hooks:"Hooks"', 'hooks:"钩子"'],
  ['title:"Hooks"', 'title:"钩子"'],
  ['label:"Hooks"', 'label:"钩子"'],
  ['label:"Tips"', 'label:"提示"'],
  ['label:"Commands"', 'label:"命令"'],
  ['label:"Browser"', 'label:"浏览器"'],
  ['children:"Browse Marketplace"', 'children:"浏览市场"'],
  ['children:"Manage plugins"', 'children:"管理插件"'],
  ['children:"Open config"', 'children:"打开配置"'],
  ['title:"Automate with Hooks"', 'title:"用钩子实现自动化"'],
  ['title:"Create Reusable Commands"', 'title:"创建可复用命令"'],
  ['description:"Show rotating tips on the empty screen"', 'description:"在空白屏幕上轮换显示提示"'],
  [
    'description:"Hooks run custom scripts at lifecycle events to observe, control, and extend the agent loop."',
    'description:"钩子在生命周期事件上运行自定义脚本，用于观察、控制和扩展智能体循环。"',
  ],
  [
    'description:"Rules give Agent persistent, system-level instructions for your coding standards and workflows."',
    'description:"规则为 Agent 提供持久的系统级指令，用于你的编码标准和流程。"',
  ],
  [
    'description:"Skills package domain-specific knowledge and workflows that Agent applies automatically when relevant."',
    'description:"技能打包领域知识和工作流，Agent 会在相关时自动应用。"',
  ],
  [
    'description:"Subagents are specialized assistants that run in their own context window so Agent can parallelize and stay focused."',
    'description:"子 Agent 是运行在独立上下文窗口中的专用助手，便于 Agent 并行处理并保持专注。"',
  ],
  ['textContent=n?"Unsnooze":"Snooze"', 'textContent=n?"取消暂停":"暂停"'],
  ['textContent="Model"', 'textContent="模型"'],
  ['textContent="Cursor Tab Preview"', 'textContent="Tab 预览"'],
  ['placeholder="Select Cursor Tab snooze duration"', 'placeholder="选择 Tab 暂停时长"'],
  ['aNp.LABEL="Snooze Cursor Tab"', 'aNp.LABEL="暂停 Tab"'],
  ['cNp.LABEL="Unsnooze Cursor Tab"', 'cNp.LABEL="取消暂停 Tab"'],
  ['iNp.LABEL="Enable Cursor Tab"', 'iNp.LABEL="启用 Cursor Tab"'],
  ['rNp.LABEL="Disable Cursor Tab"', 'rNp.LABEL="禁用 Cursor Tab"'],
  ['label:"1 minute"', 'label:"1 分钟"'],
  ['label:"5 minutes"', 'label:"5 分钟"'],
  ['label:"15 minutes"', 'label:"15 分钟"'],
  ['label:"30 minutes"', 'label:"30 分钟"'],
  ['label:"1 hour"', 'label:"1 小时"'],
  ['label:"3 hours"', 'label:"3 小时"'],
  ['title:"Cursor Tab"', 'title:"Cursor Tab"'],
  [
    't?`Disable for ${t}`:"Disable globally"',
    't?`针对 ${t} 禁用`:"全局禁用"',
  ],
  [
    't?`Disable for ${t}`:"全局禁用"',
    't?`针对 ${t} 禁用`:"全局禁用"',
  ],
  [
    'e?`Disable for ${e}`:"Disable globally"',
    'e?`针对 ${e} 禁用`:"全局禁用"',
  ],
  [
    'e?`Disable for ${e}`:"全局禁用"',
    'e?`针对 ${e} 禁用`:"全局禁用"',
  ],
  ["`Snooze for ${c.label}`", "`暂停 ${c.label}`"],
  ["`(${l} remaining)`", "`（剩余 ${l}）`"],
  ["`No hooks match \"${r}\".`", "`没有与“${r}”匹配的钩子。`"],
  [
    "`$(tab) Tab Stats: ${this.todayStats.tabAcceptedLines}/${this.todayStats.tabSuggestedLines} (${e}%)`",
    "`$(tab) Tab 统计：${this.todayStats.tabAcceptedLines}/${this.todayStats.tabSuggestedLines} (${e}%)`",
  ],
  [
    "`Tab AI Stats: ${this.todayStats.tabAcceptedLines} accepted out of ${this.todayStats.tabSuggestedLines} suggested, ${e} percent acceptance rate`",
    "`Tab AI 统计：已接受 ${this.todayStats.tabAcceptedLines} / 建议 ${this.todayStats.tabSuggestedLines}，接受率 ${e}%`",
  ],
  [
    "`Tab AI Stats (Today): ${this.todayStats.tabAcceptedLines}/${this.todayStats.tabSuggestedLines} lines (${e}%)`",
    "`Tab AI 统计（今日）：${this.todayStats.tabAcceptedLines}/${this.todayStats.tabSuggestedLines} 行（${e}%）`",
  ],
  [
    "`$(comment-discussion) Agent Stats: ${this.todayStats.composerAcceptedLines}/${this.todayStats.composerSuggestedLines} (${e}%)`",
    "`$(comment-discussion) 智能体统计：${this.todayStats.composerAcceptedLines}/${this.todayStats.composerSuggestedLines} (${e}%)`",
  ],
  [
    "`Agent AI Stats: ${this.todayStats.composerAcceptedLines} accepted out of ${this.todayStats.composerSuggestedLines} suggested, ${e} percent acceptance rate`",
    "`智能体 AI 统计：已接受 ${this.todayStats.composerAcceptedLines} / 建议 ${this.todayStats.composerSuggestedLines}，接受率 ${e}%`",
  ],
  [
    "`Agent AI Stats (Today): ${this.todayStats.composerAcceptedLines}/${this.todayStats.composerSuggestedLines} lines (${e}%)`",
    "`智能体 AI 统计（今日）：${this.todayStats.composerAcceptedLines}/${this.todayStats.composerSuggestedLines} 行（${e}%）`",
  ],
  [
    'description:"Disable Cursor Tab for these languages"',
    'description:"对这些语言禁用 Cursor Tab"',
  ],
  [
    'description:"Enable partial accepts for Cursor Tab, using the editor.action.inlineSuggest.acceptNextWord keybinding"',
    'description:"启用 Cursor Tab 部分接受，使用 editor.action.inlineSuggest.acceptNextWord 快捷键"',
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
console.log(`map +${added} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length}`);
