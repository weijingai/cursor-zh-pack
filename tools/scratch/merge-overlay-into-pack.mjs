import "./lib/win-console.mjs";
import fs from "node:fs";

const overlay = JSON.parse(fs.readFileSync("translations/main.i18n.json", "utf8"));
const target =
  "C:/Users/Administrator/.cursor/extensions/ms-ceintl.vscode-language-pack-zh-hans-1.128.0-universal/translations/main.i18n.json";
const pack = JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, ""));
let count = 0;
for (const [moduleId, strings] of Object.entries(overlay.contents || {})) {
  Object.assign((pack.contents[moduleId] ??= {}), strings);
  count += Object.keys(strings).length;
}
fs.writeFileSync(target, JSON.stringify(pack, null, "\t") + "\n");
console.log(`merged ${count} overlay strings into official pack`);
