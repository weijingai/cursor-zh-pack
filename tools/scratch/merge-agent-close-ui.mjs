import "./lib/win-console.mjs";
import fs from "node:fs";

const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const extraOverlay = {
  "vs/platform/update/common/updateActionTitles": {
    checkForUpdates: "检查更新...",
    checkingForUpdates2: "正在检查更新...",
    downloadUpdate: "下载更新",
    DownloadingUpdate: "正在下载更新...",
    installUpdate: "安装更新",
    installingUpdate: "正在安装更新...",
    restartToUpdate: "重启以更新",
  },
  "vs/workbench/browser/windowQuitConfirmation": {
    shutdownChatStreamingTitle: "Agent 仍在工作",
    shutdownChatStreamingDetail: "现在停止会取消当前任务。",
    shutdownChatStreamingTitlePlural: "{0} 个 Agent 仍在工作",
    shutdownChatStreamingDetailPlural: "现在停止会取消它们当前的任务。",
    shutdownChatStreamingAutoContinueDetail: "重新打开后，Cursor 会继续这个 Agent。",
    shutdownChatStreamingAutoContinueDetailPlural: "重新打开后，Cursor 会继续这些 Agent。",
    shutdownChatStreamingAutoContinueToggle: "自动恢复 Agent",
    shutdownChatStreamingAutoContinueTogglePlural: "自动恢复 Agent",
    shutdownForceClose: "仍然关闭",
    shutdownForceQuit: "仍然退出",
    shutdownForceReload: "仍然重新加载",
    shutdownForceLoad: "仍然切换",
  },
  "vs/workbench/services/workingCopy/electron-sandbox/workingCopyBackupTracker": {
    shutdownForceClose: "仍然关闭",
    shutdownForceQuit: "仍然退出",
    shutdownForceReload: "仍然重新加载",
    ok: "确定(&&O)",
  },
};
for (const [mod, strings] of Object.entries(extraOverlay)) {
  overlay[mod] = { ...(overlay[mod] || {}), ...strings };
}
fs.writeFileSync("translations/zh-cn/overlay.json", JSON.stringify(overlay, null, 2) + "\n");

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const jsSafe = {
  "Agent is still working": "Agent 仍在工作",
  "Stopping now will cancel the current task.": "现在停止会取消当前任务。",
  "Stopping now will cancel the current task": "现在停止会取消当前任务",
  "Resume agent automatically": "自动恢复 Agent",
  "Resume agents automatically": "自动恢复 Agent",
  "Close Anyway": "仍然关闭",
  "Close anyway": "仍然关闭",
  "Quit Anyway": "仍然退出",
  "Reload Anyway": "仍然重新加载",
  "View All Models": "查看全部模型",
  "View all models": "查看全部模型",
  "Show all models…": "显示全部模型…",
  "Show all models\\u2026": "显示全部模型…",
  "Browser Tab": "浏览器标签页",
  "Browser tab": "浏览器标签页",
  "Browser tabs": "浏览器标签页",
  "New Browser Tab": "新建浏览器标签页",
  "Reload Browser Tab": "重新加载浏览器标签页",
  "Close Browser Tab": "关闭浏览器标签页",
  "Install Update": "安装更新",
  "Install Update...": "安装更新...",
  "Installing Update...": "正在安装更新...",
  "Downloading Update...": "正在下载更新...",
  "Download Update": "下载更新",
  "Restart to Update": "重启以更新",
  "Check for Updates...": "检查更新...",
  "Checking for Updates...": "正在检查更新...",
  "Browser tab not found": "未找到浏览器标签页",
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
  ['children:"Compact"', 'children:"紧凑"'],
  ['children:"Detailed"', 'children:"详细"'],
  ['label:"Compact"', 'label:"紧凑"'],
  ['label:"Detailed"', 'label:"详细"'],
  ['label:"Balanced"', 'label:"均衡"'],
  ['children:"View All Models"', 'children:"查看全部模型"'],
  ['this.pageTitle:this.pageTitle:"Browser Tab"', 'this.pageTitle:this.pageTitle:"浏览器标签页"'],
  ['label:"Fast"', 'label:"快速"'],
  ['label:"Faster"', 'label:"更快"'],
  ['label:"Fastest"', 'label:"最快"'],
  ['label:"Slower"', 'label:"更慢"'],
  ['label:"Normal"', 'label:"正常"'],
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

const glass = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(glass, {
  "Agent is still working": "Agent 仍在工作",
  "Stopping now will cancel the current task.": "现在停止会取消当前任务。",
  "Stopping now will cancel the current task": "现在停止会取消当前任务",
  "Resume agent automatically": "自动恢复 Agent",
  "Resume agents automatically": "自动恢复 Agent",
  "Close Anyway": "仍然关闭",
  "Close anyway": "仍然关闭",
  "close anyway": "仍然关闭",
  Compact: "紧凑",
  Detailed: "详细",
  Balanced: "均衡",
  "View All Models": "查看全部模型",
  "View all models": "查看全部模型",
  "Show all models…": "显示全部模型…",
  "Browser Tab": "浏览器标签页",
  "Browser tab": "浏览器标签页",
  "Install Update": "安装更新",
  "Install Update...": "安装更新...",
  Fast: "快速",
  Faster: "更快",
  Fastest: "最快",
  fastest: "最快",
  Effort: "力度",
  effort: "力度",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(glass, null, 2) + "\n");
console.log(`overlay ok map +${mapAdded} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length} glass=${Object.keys(glass).length}`);
