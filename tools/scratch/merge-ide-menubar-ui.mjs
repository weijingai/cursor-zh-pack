import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const extra = {
  "New Text File": "新建文本文件",
  "New File": "新建文件",
  "New Window": "新建窗口",
  "Open File...": "打开文件...",
  "Open File": "打开文件",
  "Open Folder...": "打开文件夹...",
  "Open Workspace from File...": "从文件打开工作区...",
  "Open Recent": "打开最近的文件",
  "Add Folder to Workspace...": "将文件夹添加到工作区...",
  "Save As...": "另存为...",
  "Save All": "全部保存",
  "Close Editor": "关闭编辑器",
  "Close Folder": "关闭文件夹",
  "Close Window": "关闭窗口",
  Exit: "退出",
  Undo: "撤消",
  Redo: "重做",
  Cut: "剪切",
  Copy: "复制",
  Paste: "粘贴",
  Find: "查找",
  Replace: "替换",
  "Find in Files": "在文件中查找",
  "Replace in Files": "在文件中替换",
  "Command Palette...": "命令面板...",
  "Toggle Full Screen": "切换全屏",
  Appearance: "外观",
  "Source Control": "源代码管理",
  "Go to File...": "转到文件...",
  "Go to Line/Column...": "转到行/列...",
  "Go to Symbol in Editor...": "转到编辑器中的符号...",
  "Go to Definition": "转到定义",
  "Start Debugging": "启动调试",
  "Run Without Debugging": "以非调试模式运行",
  "Stop Debugging": "停止调试",
  "New Terminal": "新建终端",
  "Split Terminal": "拆分终端",
  "Toggle Developer Tools": "切换开发人员工具",
  "Open Process Explorer": "打开进程资源管理器",
  "Check for Updates...": "检查更新...",
  "About": "关于",
  Selection: "选择",
  Go: "转到",
  Run: "运行",
};

let added = 0;
const skipJs = new Set(["Go", "Run", "Find", "Copy", "Cut", "Paste", "Exit", "About", "Undo", "Redo"]);
for (const [en, zh] of Object.entries(extra)) {
  if (skipJs.has(en)) continue;
  if (map[en] !== zh) {
    map[en] = zh;
    added += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const dom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(dom, extra, {
  File: "文件",
  Edit: "编辑",
  View: "查看",
  Terminal: "终端",
  Help: "帮助",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(dom, null, 2) + "\n");
console.log("map +", added, "total", Object.keys(map).length);
