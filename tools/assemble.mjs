import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const readJson = (file, fallback) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback);

const { sources } = loadCursorNls();
const catalog = readJson("catalog/cursor-modules.json", { modules: {} });
const recovered = readJson("translations/zh-cn/recovered.json", {});
const overlay = readJson("translations/zh-cn/overlay.json", {});
const review = readJson("catalog/review.json", { items: {} }).items;

const contents = {};
const rejectedKeys = [];
const unknownKeys = [];
let fromRecovered = 0;
let fromOverlay = 0;

for (const [moduleId, strings] of Object.entries(recovered)) {
  for (const [key, zh] of Object.entries(strings)) {
    if (sources[moduleId]?.[key] === undefined) continue;
    (contents[moduleId] ??= {})[key] = zh;
    fromRecovered++;
  }
}

for (const [moduleId, strings] of Object.entries(overlay)) {
  for (const [key, zh] of Object.entries(strings)) {
    const source = sources[moduleId]?.[key];
    if (source === undefined) {
      unknownKeys.push(`${moduleId}#${key}`);
      continue;
    }
    const verdict = review[`${moduleId}#${key}`];
    if (verdict?.decision === "reject" && verdict.source === source && verdict.translation === zh) {
      rejectedKeys.push(`${moduleId}#${key}`);
      continue;
    }
    if (typeof zh === "string" && zh) {
      (contents[moduleId] ??= {})[key] = zh;
      fromOverlay++;
    }
  }
}

const missingKeys = [];
for (const [moduleId, strings] of Object.entries(catalog.modules)) {
  for (const key of Object.keys(strings)) if (!contents[moduleId]?.[key]) missingKeys.push(`${moduleId}#${key}`);
}

const pkg = readJson("package.json", { version: "0.1.0" });
const pack = {
  "": [
    "Private Simplified Chinese overlay for Cursor.",
    "Install together with MS-CEINTL.vscode-language-pack-zh-hans for VS Code UI.",
  ],
  version: pkg.version,
  contents,
};

fs.writeFileSync("translations/main.i18n.json", JSON.stringify(pack, null, 2) + "\n");
const translated = fromOverlay + fromRecovered;
fs.writeFileSync(
  "catalog/coverage.json",
  JSON.stringify(
    { translated, fromOverlay, fromRecovered, missing: missingKeys.length, rejected: rejectedKeys.length, missingKeys, rejectedKeys, unknownKeys },
    null,
    2,
  ) + "\n",
);
console.log(
  `assembled translated=${translated} (overlay=${fromOverlay} recovered=${fromRecovered}) ` +
    `missing=${missingKeys.length} rejected=${rejectedKeys.length} unknown=${unknownKeys.length}`,
);
