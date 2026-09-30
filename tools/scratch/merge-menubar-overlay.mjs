import "./lib/win-console.mjs";
import fs from "node:fs";

const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const menu = JSON.parse(fs.readFileSync("catalog/menubar-overlay.json", "utf8"));

const extra = {
  "vs/platform/tray/electron-main/dockMenuMain": {
    miNewWindow: "新建窗口(&&W)",
  },
  "vs/workbench/contrib/debug/browser/debugEditorActions": {
    mitogglesource: "切换源(&&T)",
  },
  "vs/workbench/contrib/extensions/electron-sandbox/extensionMonitor.contribution": {
    miOpenExtensionMonitorer: "打开扩展监视器(&&E)",
  },
  "vs/workbench/contrib/issue/electron-sandbox/process.contribution": {
    "stopTracing.button": "重新启动并启用跟踪(&&R)",
  },
  "vs/workbench/contrib/remote/electron-sandbox/remote.cursor.contribution": {
    "windowsWslPathWarning.install": "安装 WSL 扩展(&&I)",
  },
  "vs/workbench/contrib/url/browser/trustedDomainsValidator": {
    alwaysTrustDomain: "始终打开此域(&&A)",
  },
  "vs/workbench/browser/parts/editor/editor.contribution": {},
  "vs/workbench/contrib/files/browser/files.view.contribution": {
    miViewExplorer: "资源管理器(&&E)",
  },
  "vs/workbench/contrib/markers/browser/markers.view.contribution": {
    miMarker: "问题(&&P)",
  },
  "vs/workbench/contrib/output/browser/output.view.contribution": {
    miToggleOutput: "输出(&&O)",
  },
  "vs/workbench/contrib/quickaccess/browser/quickAccess.view.contribution": {
    miOpenView: "打开视图(&&O)...",
  },
  "vs/workbench/contrib/scm/browser/scm.view.contribution": {
    miViewSCM: "源代码管理(&&C)",
  },
  "vs/workbench/contrib/terminal/browser/terminal.view.contribution": {
    miToggleIntegratedTerminal: "终端(&&T)",
  },
  "vs/workbench/electron-sandbox/actions/windowActions": {
    miSetZoomLevel: "设置缩放级别(&&S)",
  },
  "vs/workbench/contrib/workspace/browser/workspace.view.contribution": {
    open: "打开(&&O)",
    grantWorkspaceTrustButton: "信任工作区并继续(&&T)",
    grantFolderTrustButton: "信任文件夹并继续(&&T)",
    manageWorkspaceTrustButton: "管理(&&M)",
    trustOption: "是，我信任作者(&&Y)",
    dontTrustOption: "不，我不信任作者(&&N)",
  },
};

let added = 0;
for (const src of [menu, extra]) {
  for (const [moduleId, strings] of Object.entries(src)) {
    overlay[moduleId] ??= {};
    for (const [key, zh] of Object.entries(strings)) {
      if (overlay[moduleId][key] !== zh) {
        overlay[moduleId][key] = zh;
        added += 1;
      }
    }
  }
}
fs.writeFileSync("translations/zh-cn/overlay.json", JSON.stringify(overlay, null, 2) + "\n");
console.log("overlay modules", Object.keys(overlay).length, "updated", added);
