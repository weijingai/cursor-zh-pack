import "../lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const jsSafe = {
  "Take Screenshot": "截取屏幕截图",
  "Capture Area Screenshot": "截取区域截图",
  "Hard Reload": "强制重新加载",
  "Copy Current URL": "复制当前网址",
  "Copy current URL": "复制当前网址",
  "Show Bookmark Bar": "显示书签栏",
  "Clear Browsing History": "清除浏览历史",
  "Clear Cookies": "清除 Cookie",
  "Clear cookies": "清除 Cookie",
  "Clear Cache": "清除缓存",
  "Clear Accepted Certificates": "清除已接受的证书",
  "Hide Favorites & History": "隐藏收藏与历史",
  "Show Favorites & History": "显示收藏与历史",
  "Hide favorites and history": "隐藏收藏与历史",
  "Show favorites and history": "显示收藏与历史",
  "Hide favorites & History": "隐藏收藏与历史",
  "Mark as Read": "标为已读",
  "Mark chat as read": "将聊天标为已读",
  Fork: "派生",
  "Move to": "移动到",
  "Move to folder": "移动到文件夹",
  "Move to this machine": "移到此计算机",
  Archive: "归档",
  Unarchive: "取消归档",
  "Archive All Below": "归档下方全部",
  Favorites: "收藏",
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
  ['children:"Take Screenshot"', 'children:"截取屏幕截图"'],
  ['children:"Capture Area Screenshot"', 'children:"截取区域截图"'],
  ['children:"Hard Reload"', 'children:"强制重新加载"'],
  ['children:"Copy Current URL"', 'children:"复制当前网址"'],
  ['children:"Show Bookmark Bar"', 'children:"显示书签栏"'],
  ['children:"Clear Browsing History"', 'children:"清除浏览历史"'],
  ['children:"Clear Cookies"', 'children:"清除 Cookie"'],
  ['children:"Clear Cache"', 'children:"清除缓存"'],
  ['children:"Clear Accepted Certificates"', 'children:"清除已接受的证书"'],
  ['title:xt?"Hide Favorites & History":"Show Favorites & History"', 'title:xt?"隐藏收藏与历史":"显示收藏与历史"'],
  ['xt?"Hide favorites and history":"Show favorites and history"', 'xt?"隐藏收藏与历史":"显示收藏与历史"'],
  ['label:"Mark as Read"', 'label:"标为已读"'],
  ['tooltip:"Mark chat as read"', 'tooltip:"将聊天标为已读"'],
  ['label:"Fork"', 'label:"派生"'],
  ['label:"Move to"', 'label:"移动到"'],
  ['children:"Move to"', 'children:"移动到"'],
  ['"aria-label":"Move to folder"', '"aria-label":"移动到文件夹"'],
  ['label:"Archive"', 'label:"归档"'],
  ['children:"Archive"', 'children:"归档"'],
  ['label:"Unarchive"', 'label:"取消归档"'],
  ['label:"Archive All Below"', 'label:"归档下方全部"'],
  ['children:"Favorites"', 'children:"收藏"'],
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
Object.assign(glass, jsSafe);
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(glass, null, 2) + "\n");
console.log(`map +${mapAdded} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length} glass=${Object.keys(glass).length}`);
