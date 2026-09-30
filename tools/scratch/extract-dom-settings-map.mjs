import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
const official = loadOfficialPack();
const extra = {};
let shortCount = 0;

function usableZh(zh) {
  return typeof zh === "string" && /[\u4e00-\u9fff]/.test(zh);
}

function usableEn(en) {
  return typeof en === "string" && /[A-Za-z]/.test(en) && !/^https?:|^\$\{|^%/.test(en);
}

for (const [moduleId, map] of Object.entries(official)) {
  const src = sources[moduleId];
  if (!src) continue;
  const isSettings = /configuration|contribution|preferences|settings|workbench|editor/i.test(moduleId);
  for (const [key, zh] of Object.entries(map)) {
    if (!usableZh(zh)) continue;
    const en = src[key];
    if (!usableEn(en) || en === zh) continue;
    if (en.length > 180) continue;
    const looksTitle =
      isSettings &&
      en.length >= 2 &&
      en.length <= 90 &&
      !en.includes("{") &&
      /^[A-Z0-9]/.test(en);
    if (en.length >= 6 || looksTitle) {
      extra[en] = zh;
      if (en.length < 6) shortCount += 1;
    }
  }
}

fs.writeFileSync("payload/dom-extra-zh.json", JSON.stringify(extra, null, 2) + "\n");
console.log("dom-extra", Object.keys(extra).length, "shorts", shortCount);
