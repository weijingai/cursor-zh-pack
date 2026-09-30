import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCursorNls } from "./lib/nls.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file, fallback = {}) =>
  fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "")) : fallback;

const { sources } = loadCursorNls();
const overlay = readJson(path.join(root, "translations/zh-cn/overlay.json"));
const recovered = readJson(path.join(root, "translations/zh-cn/recovered.json"));
const extra = readJson(path.join(root, "payload/dom-extra-zh.json"));
const hard = readJson(path.join(root, "payload/hardcoded-zh.json"));
const glass = readJson(path.join(root, "payload/dom-glass-zh.json"));
const fallback = readJson(path.join(root, "language-pack/fallback-zh.json"));
const pkg = readJson(path.join(root, "package.json"), { version: "0.1.0" });

const maps = [extra, hard, glass, fallback];
const contents = {};
const counts = { overlay: 0, recovered: 0, extra: 0, fallback: 0, missing: 0 };

function lookupEnglish(source) {
  for (const map of maps) {
    const zh = map[source];
    if (typeof zh === "string" && zh) return zh;
  }
  return null;
}

for (const [moduleId, strings] of Object.entries(sources)) {
  for (const [key, source] of Object.entries(strings)) {
    let zh = overlay[moduleId]?.[key];
    if (typeof zh === "string" && zh) {
      counts.overlay += 1;
    } else {
      zh = recovered[moduleId]?.[key];
      if (typeof zh === "string" && zh) counts.recovered += 1;
      else {
        zh = lookupEnglish(source);
        if (zh) {
          if (fallback[source] && !extra[source] && !hard[source] && !glass[source]) counts.fallback += 1;
          else counts.extra += 1;
        }
      }
    }
    if (!zh) {
      counts.missing += 1;
      continue;
    }
    (contents[moduleId] ??= {})[key] = zh;
  }
}

const outDir = path.join(root, "language-pack/translations");
fs.mkdirSync(outDir, { recursive: true });
const pack = {
  "": [
    "Cursor Language for Chinese (Simplified)",
    "Standalone Cursor language pack. Does not require MS-CEINTL.vscode-language-pack-zh-hans.",
  ],
  version: pkg.version,
  contents,
};
fs.writeFileSync(path.join(outDir, "main.i18n.json"), JSON.stringify(pack) + "\n");

const translated = counts.overlay + counts.recovered + counts.extra + counts.fallback;
const total = translated + counts.missing;
fs.writeFileSync(
  path.join(root, "catalog/language-pack-coverage.json"),
  JSON.stringify({ ...counts, translated, total, percent: Number(((translated / total) * 100).toFixed(1)) }, null, 2) + "\n",
);
console.log(
  `language-pack translated=${translated}/${total} (${((translated / total) * 100).toFixed(1)}%) ` +
    `overlay=${counts.overlay} recovered=${counts.recovered} mapped=${counts.extra} fallback=${counts.fallback} missing=${counts.missing}`,
);
