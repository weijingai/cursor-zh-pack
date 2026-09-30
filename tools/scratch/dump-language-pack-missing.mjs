import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const { entries } = loadCursorNls();
const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const recovered = JSON.parse(fs.readFileSync("translations/zh-cn/recovered.json", "utf8"));
const extra = JSON.parse(fs.readFileSync("payload/dom-extra-zh.json", "utf8"));
const hard = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const glass = JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"));

const missing = [];
for (const { moduleId, key, source } of entries) {
  if (overlay[moduleId]?.[key] || recovered[moduleId]?.[key] || extra[source] || hard[source] || glass[source]) continue;
  missing.push({ moduleId, key, source });
}
missing.sort((a, b) => a.source.length - b.source.length);
console.log("missing", missing.length);
for (const item of missing.slice(0, 80)) {
  console.log(`${item.source.length}\t${item.source}`);
}
fs.writeFileSync("catalog/language-pack-missing.json", JSON.stringify(missing, null, 2) + "\n");
