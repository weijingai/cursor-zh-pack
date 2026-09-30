import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const jsSafe = {
  "You have not yet opened a folder.": "尚未打开文件夹。",
  "You have not yet opened a folder.\n{0}": "尚未打开文件夹。\n{0}",
  "You have not yet opened a folder.\n{0}\n{1}": "尚未打开文件夹。\n{0}\n{1}",
  "Opening a folder will close all currently open editors. To keep them open, add a folder instead.":
    "打开文件夹将关闭所有当前打开的编辑器。若要保持打开，请改为添加文件夹。",
  "You can clone a repository locally.": "可以在本地克隆仓库。",
  "To learn more about how to use Git and source control in VS Code, read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
  "Allowed UNC Hosts": "允许的 UNC 主机",
  "Restrict UNC Access": "限制 UNC 访问",
  "Restrict UNCAccess": "限制 UNC 访问",
  "Applies to all profiles": "适用于所有配置文件",
  "Trusted Banner": "信任横幅",
  untilDismissed: "直到关闭",
  "add a folder": "添加文件夹",
  Selection: "选择",
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
  File: "文件",
  Edit: "编辑",
  Selection: "选择",
  View: "查看",
  Go: "转到",
  Run: "运行",
  Terminal: "终端",
  Help: "帮助",
  "Allowed UNC Hosts": "允许的 UNC 主机",
  "Restrict UNC Access": "限制 UNC 访问",
  "Applies to all profiles": "适用于所有配置文件",
  "Trusted Banner": "信任横幅",
  untilDismissed: "直到关闭",
  "You have not yet opened a folder.": "尚未打开文件夹。",
  "You can clone a repository locally.": "可以在本地克隆仓库。",
  "To learn more about how to use Git and source control in VS Code, read our docs.":
    "若要详细了解如何在 VS Code 中使用 Git 和源代码管理，请参阅我们的文档。",
  "Opening a folder will close all currently open editors. To keep them open, add a folder instead.":
    "打开文件夹将关闭所有当前打开的编辑器。若要保持打开，请改为添加文件夹。",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");
console.log(`map +${added} total=${Object.keys(map).length} dom=${Object.keys(existingDom).length}`);
