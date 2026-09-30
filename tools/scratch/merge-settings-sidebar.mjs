import "./lib/win-console.mjs";
import fs from "node:fs";

const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
Object.assign((overlay["vs/workbench/contrib/preferences/browser/settingsLayout"] ??= {}), {
  commonlyUsed: "常用设置",
  textEditor: "文本编辑器",
  cursor: "光标",
  find: "查找",
  font: "字体",
  formatting: "格式化",
  diffEditor: "差异编辑器",
  multiDiffEditor: "多文件差异编辑器",
  minimap: "缩略图",
  suggestions: "建议",
  files: "文件",
  workbench: "工作台",
  appearance: "外观",
  breadcrumbs: "导航路径",
  editorManagement: "编辑管理",
  settings: "设置编辑器",
  zenMode: "禅模式",
  screencastMode: "屏幕录制模式",
  window: "窗口",
  newWindow: "新建窗口",
  features: "功能",
  "accessibility.signals": "辅助功能信号",
  accessibility: "辅助功能",
  fileExplorer: "资源管理器",
  search: "搜索",
  debug: "调试",
  testing: "测试",
  scm: "源代码管理",
  extensions: "扩展",
  terminal: "终端",
  task: "任务",
  problems: "问题",
  output: "输出",
  comments: "评论",
  remote: "远程",
  timeline: "时间线",
  notebook: "笔记本",
  mergeEditor: "合并编辑器",
  application: "应用程序",
  proxy: "代理服务器",
  keyboard: "键盘",
  update: "更新",
  telemetry: "遥测",
  experimental: "实验性",
  other: "其他",
  security: "安全性",
  workspace: "工作区",
});
Object.assign((overlay["vs/workbench/browser/actions/layoutActions"] ??= {}), {
  openAndCloseSidebar: "打开/显示并关闭/隐藏侧边栏",
});
Object.assign((overlay["vs/workbench/contrib/extensions/browser/extensionsViewlet"] ??= {}), {
  finalNote: "点击导入所有本地 {0} 扩展",
});
Object.assign((overlay["vs/workbench/services/integrity/electron-sandbox/integrityService"] ??= {}), {
  "integrity.dontShowAgain": "不再显示",
});
fs.writeFileSync("translations/zh-cn/overlay.json", JSON.stringify(overlay, null, 2) + "\n");

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const jsSafe = {
  "Hide Sidebar": "隐藏侧边栏",
  "Show Sidebar": "显示侧边栏",
  "Open/Show and Close/Hide Sidebar": "打开/显示并关闭/隐藏侧边栏",
  "Cursor Tab": "Tab 补全",
  "Files to exclude from indexing in addition to .gitignore.": "除 .gitignore 外还要从索引中排除的文件。",
  "Files to exclude from indexing in addition to .gitignore": "除 .gitignore 外还要从索引中排除的文件",
  "Default chooses an Explore model based on availability and cost": "默认会根据可用性和成本选择 Explore 模型",
  "Usage past your limit is billed later as on-demand.": "超出限额的用量稍后按需计费。",
  "Click to import all local {0} extensions": "点击导入所有本地 {0} 扩展",
  "Don't show again": "不再显示",
  "Don't Show Again": "不再显示",
  "(don't show again)": "（不再显示）",
  "Got It": "知道了",
  "In order to use Git features, you can open a folder containing a Git repository or clone from a URL.":
    "为了使用 Git 功能，可打开包含 Git 仓库的文件夹或从 URL 克隆。",
  "To learn more about how to use Git and source control in VS Code, read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
  "To learn more about how to use Git and source control in VS Code read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
};
let mapAdded = 0;
for (const [en, zh] of Object.entries(jsSafe)) {
  if (map[en] !== zh) {
    map[en] = zh;
    mapAdded += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  [
    "async _isPure(){const t=this.productService.checksums||{};",
    "async _isPure(){return{isPure:!0,proof:[]};const t=this.productService.checksums||{};",
  ],
  [
    "_showNotification(){const t=this.productService.checksumFailMoreInfoUrl",
    "_showNotification(){return;const t=this.productService.checksumFailMoreInfoUrl",
  ],
  [
    "if(t||await this._isExplainedByPendingUpdate())return;this.logService.warn(`",
    "if(true||t||await this._isExplainedByPendingUpdate())return;this.logService.warn(`",
  ],
  ['title:"Hide Sidebar"', 'title:"隐藏侧边栏"'],
  ['"aria-label":"Hide Sidebar"', '"aria-label":"隐藏侧边栏"'],
  ['title:"Show Sidebar"', 'title:"显示侧边栏"'],
  ['"aria-label":"Show Sidebar"', '"aria-label":"显示侧边栏"'],
  ['label:"Cursor Tab"', 'label:"Tab 补全"'],
  ['label:"Fixed"', 'label:"固定"'],
  ['label:"Unlimited"', 'label:"无上限"'],
  [
    'case .85:return"Small";case 1:return"Default";case 1.15:return"Large";case 1.3:return"Extra Large"',
    'case .85:return"小";case 1:return"默认";case 1.15:return"大";case 1.3:return"特大"',
  ],
  [
    'g8y="Default chooses an Explore model based on availability and cost"',
    'g8y="默认会根据可用性和成本选择 Explore 模型"',
  ],
  [
    'jxp="Usage past your limit is billed later as on-demand."',
    'jxp="超出限额的用量稍后按需计费。"',
  ],
  [
    'hTl="Usage past your limit is billed later as on-demand."',
    'hTl="超出限额的用量稍后按需计费。"',
  ],
  ['"(don\'t show again)"', '"(不再显示)"'],
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

const glass = JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"));
Object.assign(glass, {
  "Hide Sidebar": "隐藏侧边栏",
  "Show Sidebar": "显示侧边栏",
  "Cursor Tab": "Tab 补全",
  "Files to exclude from indexing in addition to .gitignore.": "除 .gitignore 外还要从索引中排除的文件。",
  "Files to exclude from indexing in addition to .gitignore": "除 .gitignore 外还要从索引中排除的文件",
  "Default chooses an Explore model based on availability and cost": "默认会根据可用性和成本选择 Explore 模型",
  Fixed: "固定",
  Unlimited: "无上限",
  Small: "小",
  Large: "大",
  "Extra Large": "特大",
  Default: "默认",
  "Don't show again": "不再显示",
  "Don't Show Again": "不再显示",
  "(don't show again)": "（不再显示）",
  "Got It": "知道了",
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
  Security: "安全性",
  Workspace: "工作区",
  "Merge Editor": "合并编辑器",
  "In order to use Git features, you can open a folder containing a Git repository or clone from a URL.":
    "为了使用 Git 功能，可打开包含 Git 仓库的文件夹或从 URL 克隆。",
  "To learn more about how to use Git and source control in VS Code, read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
  "To learn more about how to use Git and source control in VS Code read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(glass, null, 2) + "\n");
console.log(`map +${mapAdded} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length} glass=${Object.keys(glass).length}`);
