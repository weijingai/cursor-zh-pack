import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const { entries } = loadCursorNls();
const official = JSON.parse(
  fs
    .readFileSync(
      "C:/Users/Administrator/.cursor/extensions/ms-ceintl.vscode-language-pack-zh-hans-1.128.0-universal/translations/main.i18n.json",
      "utf8",
    )
    .replace(/^\uFEFF/, ""),
).contents;

const officialByEn = new Map();
function walk(modMap) {
  for (const [moduleId, strings] of Object.entries(modMap)) {
    for (const [key, zh] of Object.entries(strings)) {
      if (typeof zh !== "string") continue;
      officialByEn.set(`${moduleId}#${key}`, zh);
    }
  }
}
walk(official);

const bySource = new Map();
for (const [moduleId, strings] of Object.entries(official)) {
  for (const zh of Object.values(strings)) {
    if (typeof zh !== "string") continue;
    // invert later using cursor english
  }
}

const overlay = {};
const unmatched = [];
let matched = 0;

for (const e of entries) {
  const en = e.source;
  if (typeof en !== "string") continue;
  const isMenu =
    /^&&/.test(en) ||
    /^mi[A-Z]/.test(e.key) ||
    /^m[A-Z]/.test(e.key) ||
    /Menubar|menubar|mnemonicTitle/.test(e.moduleId + e.key);
  if (!isMenu) continue;

  let zh = official[e.moduleId]?.[e.key];
  if (!zh) {
    const base = e.moduleId.split("/").pop();
    for (const [mod, strings] of Object.entries(official)) {
      if (mod.split("/").pop() === base && strings[e.key]) {
        zh = strings[e.key];
        break;
      }
    }
  }
  if (!zh && officialByEn.has(`${e.moduleId}#${e.key}`)) zh = officialByEn.get(`${e.moduleId}#${e.key}`);

  if (typeof zh === "string" && zh && zh !== en && /[\u4e00-\u9fff]/.test(zh)) {
    (overlay[e.moduleId] ??= {})[e.key] = zh;
    matched += 1;
  } else {
    unmatched.push({ moduleId: e.moduleId, key: e.key, source: en });
  }
}

fs.writeFileSync("catalog/menubar-unmatched.json", JSON.stringify(unmatched, null, 2) + "\n");
fs.writeFileSync("catalog/menubar-overlay.json", JSON.stringify(overlay, null, 2) + "\n");
console.log("matched", matched, "unmatched", unmatched.length, "modules", Object.keys(overlay).length);
for (const item of unmatched.slice(0, 80)) {
  console.log(`${item.key}\t${JSON.stringify(item.source)}\t${item.moduleId.split("/").slice(-1)}`);
}
