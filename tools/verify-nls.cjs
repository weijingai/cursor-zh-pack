"use strict";

require("../installer/lib/win-console.cjs");
const fs = require("node:fs");
const path = require("node:path");

const [
  userDataPath = path.join(process.env.APPDATA ?? "", "Cursor"),
  appOut = "C:/Program Files/Cursor/resources/app/out",
  locale = "zh-cn",
] = process.argv.slice(2);

const step = (label, fn) => {
  try {
    const value = fn();
    console.log(`ok   ${label}`);
    return value;
  } catch (error) {
    console.log(`FAIL ${label}: ${error.message}`);
    process.exit(1);
  }
};

const packs = step("read languagepacks.json", () =>
  JSON.parse(fs.readFileSync(path.join(userDataPath, "languagepacks.json"), "utf-8")),
);
const pack = step(`find pack for ${locale}`, () => {
  if (!packs[locale]) throw new Error(`no entry; available: ${Object.keys(packs).join(", ")}`);
  return packs[locale];
});
const translationsFile = pack.translations.vscode;
step(`access ${translationsFile}`, () => fs.accessSync(translationsFile));
const keys = step("parse nls.keys.json", () => JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf-8")));
const messages = step("parse nls.messages.json", () =>
  JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf-8")),
);
const translations = step("parse translations (no BOM strip, like Cursor)", () =>
  JSON.parse(fs.readFileSync(translationsFile, "utf-8")),
);

let index = 0;
let translated = 0;
const samples = {};
for (const [moduleId, moduleKeys] of keys) {
  const bucket = translations.contents[moduleId];
  for (const key of moduleKeys) {
    const value = bucket?.[key];
    if (value) translated += 1;
    if (moduleId.includes("cursorBlame.contribution") && key === "toggleFileBlame") samples.cursor = value ?? messages[index];
    if (moduleId === "vs/workbench/browser/parts/editor/editorActions" && !samples.vscode && value) samples.vscode = value;
    index += 1;
  }
}
console.log(`translated ${translated}/${messages.length} messages`);
console.log(`sample cursor: ${samples.cursor}`);
console.log(`sample vscode: ${samples.vscode}`);
