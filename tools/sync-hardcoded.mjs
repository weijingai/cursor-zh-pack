import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const prefixes = [
  ["Search settings ", "搜索设置 "],
  ["Search Settings", "搜索设置"],
  ["Cursor Settings: ", "Cursor 设置："],
  ["Search Cursor settings", "搜索 Cursor 设置"],
  ["Copy Request ID: ", "复制请求 ID："],
  ["Automatically parse links when pasted into Quick Edit (", "自动解析粘贴到快速编辑（"],
  ["Ln ", "行 "],
  ["Tab Stats: ", "Tab 统计："],
  ["Agent Stats: ", "智能体统计："],
  ["Tab AI Stats: ", "Tab AI 统计："],
  ["Tab AI Stats (Today): ", "Tab AI 统计（今日）："],
  ["Agent AI Stats: ", "智能体 AI 统计："],
  ["Agent AI Stats (Today): ", "智能体 AI 统计（今日）："],
  ["Snooze for ", "暂停 "],
  ["Disable for ", "针对 "],
];
const shorts = {
  General: "常规",
  Profile: "个人资料",
  Appearance: "外观",
  Fun: "趣味",
  Agents: "Agent",
  Models: "模型",
  Plugins: "插件",
  Customize: "自定义",
  Indexing: "索引",
  Network: "网络",
  Developer: "开发人员",
  Beta: "测试版",
  Hooks: "钩子",
  Tips: "提示",
  Browse: "浏览",
  Commands: "命令",
  Snooze: "暂停",
  Unsnooze: "取消暂停",
  fastest: "最快",
  Fast: "快速",
  Faster: "更快",
  Fastest: "最快",
  Effort: "力度",
  Compact: "紧凑",
  Detailed: "详细",
  Balanced: "均衡",
  "Cursor Tab": "Tab 补全",
  "Hide Sidebar": "隐藏侧边栏",
  "Show Sidebar": "显示侧边栏",
  Fixed: "固定",
  Unlimited: "无上限",
  Small: "小",
  Large: "大",
  "Extra Large": "特大",
  Default: "默认",
  "Commonly Used": "常用设置",
  "Text Editor": "文本编辑器",
  "Diff Editor": "差异编辑器",
  "Multi-File Diff Editor": "多文件差异编辑器",
  "Editor Management": "编辑管理",
  "Settings Editor": "设置编辑器",
  "Zen Mode": "禅模式",
  "Screencast Mode": "屏幕录制模式",
  "New Window": "新建窗口",
  "Accessibility Signals": "辅助功能信号",
  "Source Control": "源代码管理",
  Task: "任务",
  Proxy: "代理服务器",
  Experimental: "实验性",
  Other: "其他",
  Workspace: "工作区",
  "Merge Editor": "合并编辑器",
  "Don't show again": "不再显示",
  "Don't Show Again": "不再显示",
  "auto (default)": "自动（默认）",
  Worktrees: "工作树",
  Worktree: "工作树",
  Settings: "设置",
  Privacy: "隐私",
  Import: "导入",
  Theme: "主题",
  Rules: "规则",
  Skills: "技能",
  Subagents: "子 Agent",
  Account: "账户",
  Editor: "编辑器",
  MCP: "MCP",
  "Grok Bot": "Grok 机器人",
  Preferences: "首选项",
  Layout: "布局",
  Notifications: "通知",
  Startup: "启动",
  Explorer: "资源管理器",
  Problems: "问题",
  Output: "输出",
  Terminal: "终端",
  Conversation: "对话",
  "Code Review": "代码审查",
  Files: "文件",
  Browser: "浏览器",
  Search: "搜索",
  Changes: "更改",
  Help: "帮助",
  Disabled: "已禁用",
  File: "文件",
  Edit: "编辑",
  Selection: "选择",
  View: "查看",
  Go: "转到",
  Run: "运行",
  Save: "保存",
  Undo: "撤消",
  Redo: "重做",
  Cut: "剪切",
  Copy: "复制",
  Paste: "粘贴",
  Find: "查找",
  Replace: "替换",
  Exit: "退出",
  About: "关于",
  Automations: "自动化",
  Projects: "项目",
  Repositories: "仓库",
  Marketplace: "市场",
  Mine: "我的",
  Team: "团队",
  Use: "使用",
  Name: "名称",
  Back: "返回",
  IDE: "IDE",
  Popular: "热门",
  Workbench: "工作台",
  Window: "窗口",
  Application: "应用程序",
  Features: "功能",
  Extensions: "扩展",
  Keyboard: "键盘",
  Telemetry: "遥测",
  Update: "更新",
  Security: "安全",
  Accessibility: "辅助功能",
  Chat: "聊天",
  Debug: "调试",
  Testing: "测试",
  Tasks: "任务",
  Remote: "远程",
  Timeline: "时间线",
  SCM: "源代码管理",
  Git: "Git",
  Diff: "差异",
  Merge: "合并",
  Notebook: "笔记本",
  Markdown: "Markdown",
  JSON: "JSON",
  CSS: "CSS",
  HTML: "HTML",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Python: "Python",
  Emmet: "Emmet",
  Comments: "注释",
  Breadcrumbs: "面包屑",
  Minimap: "缩略图",
  Scrollbar: "滚动条",
  Suggestions: "建议",
  IntelliSense: "智能感知",
  Formatting: "格式化",
  "Diff Editor": "差异编辑器",
  "Text Editor": "文本编辑器",
  Add: "添加",
  Open: "打开",
  Documentation: "文档",
  Preview: "预览",
  Region: "区域",
  "Remote Control": "远程控制",
  Clone: "克隆",
  Disconnect: "断开连接",
  Approve: "批准",
  Reject: "拒绝",
  Offline: "离线",
  Connected: "已连接",
  Queue: "排队",
  Submit: "提交",
  Allowlist: "允许列表",
  Recents: "最近",
  Email: "邮箱",
  On: "开",
  Off: "关",
  Cloud: "云端",
};

const extra = fs.existsSync("payload/dom-extra-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-extra-zh.json", "utf8"))
  : {};
const glass = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
const injectorMap = { ...extra, ...glass, ...map };

const pairs = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
fs.writeFileSync("payload/hardcoded-ui.json", JSON.stringify(pairs, null, 2) + "\n");

const js = `"use strict";

(() => {
  const MAP = ${JSON.stringify(injectorMap, null, 2)};
  const PREFIXES = ${JSON.stringify(prefixes)};
  const SHORT = ${JSON.stringify(shorts)};
  const SKIP = /(^| )(view-lines|monaco-editor|xterm|native-edit-context|overflow-guard|minimap)( |$)/;
  const SETTINGS = /settings|Settings|aiSettings|preferences|plan-usage|mcp|menubar|monaco-menu|context-view|submenu|action-item|quick-input|titlebar|sidebar|glass-|filter-tab|tab-bar|setting-item|setting-title|settings-editor|statusbar|status-bar|cpp-status|menubar|menu-item|menuitem/i;
  const ATTRS = ["aria-label", "title", "placeholder", "data-label", "alt", "aria-description"];

  function skip(node) {
    for (let el = node.nodeType === 3 ? node.parentElement : node; el; el = el.parentElement) {
      const cls = typeof el.className === "string" ? el.className : "";
      if (SKIP.test(cls)) return true;
      if (el.tagName === "TEXTAREA" && /inputarea|monaco/.test(cls)) return true;
    }
    return false;
  }

  function inSettings(node) {
    for (let el = node.nodeType === 3 ? node.parentElement : node; el; el = el.parentElement) {
      const cls = typeof el.className === "string" ? el.className : "";
      const id = typeof el.id === "string" ? el.id : "";
      if (SETTINGS.test(cls) || SETTINGS.test(id)) return true;
    }
    return false;
  }

  function lookup(text, allowShort) {
    if (MAP[text]) return MAP[text];
    if (allowShort && SHORT[text]) return SHORT[text];
    return null;
  }

  function translate(value, allowShort) {
    if (!value) return value;
    const lead = value.match(/^\\s*/)[0];
    const trail = value.match(/\\s*$/)[0];
    const trimmed = value.trim();
    const exact = lookup(trimmed, allowShort);
    if (exact) return lead + exact + trail;
    for (const [english, chinese] of PREFIXES) {
      if (trimmed.startsWith(english)) return lead + chinese + trimmed.slice(english.length) + trail;
    }
    const split = trimmed.indexOf(": ");
    if (allowShort && split > 0) {
      const left = trimmed.slice(0, split);
      const right = trimmed.slice(split + 2);
      const leftZh = lookup(left, true);
      const rightZh = lookup(right, true) || MAP[right];
      if (leftZh && rightZh) return lead + leftZh + ": " + rightZh + trail;
    }
    return value;
  }

  function patchNode(node) {
    if (skip(node)) return;
    const allowShort = inSettings(node);
    if (node.nodeType === 3) {
      const next = translate(node.nodeValue, allowShort);
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== 1) return;
    for (const name of ATTRS) {
      const current = node.getAttribute?.(name);
      if (!current) continue;
      const next = translate(current, allowShort);
      if (next !== current) node.setAttribute(name, next);
    }
  }

  function walk(root) {
    const tree = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let current = tree.currentNode;
    while (current) {
      patchNode(current);
      current = tree.nextNode();
    }
  }

  function start() {
    walk(document.body || document.documentElement);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") patchNode(record.target);
        else if (record.type === "attributes") patchNode(record.target);
        else for (const added of record.addedNodes) {
          patchNode(added);
          if (added.nodeType === 1) walk(added);
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
`;

fs.writeFileSync("payload/cursor-zh-ui.js", js);
fs.copyFileSync("payload/cursor-zh-ui.js", "installer/lib/cursor-zh-ui.js");
console.log(`synced hardcoded map=${pairs.length} extra=${Object.keys(extra).length} glass=${Object.keys(glass).length} injector=${Object.keys(injectorMap).length} prefixes=${prefixes.length} shorts=${Object.keys(shorts).length}`);
