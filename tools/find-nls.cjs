"use strict";

require("../installer/lib/win-console.cjs");
const fs = require("node:fs");
const path = require("node:path");

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const packs = JSON.parse(fs.readFileSync(path.join(process.env.APPDATA, "Cursor", "languagepacks.json"), "utf8"));
const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));
const translations = JSON.parse(fs.readFileSync(packs["zh-cn"].translations.vscode, "utf8").replace(/^\uFEFF/, ""));

const wanted = process.argv.slice(2).map((s) => s.toLowerCase());
const normalize = (s) => String(s).replace(/&&/g, "").replace(/\s+/g, " ").trim().toLowerCase();

let index = 0;
for (const [moduleId, moduleKeys] of keys) {
  for (const key of moduleKeys) {
    const source = messages[index++];
    if (!wanted.includes(normalize(source))) continue;
    const zh = translations.contents[moduleId]?.[key];
    console.log(`${zh ? "zh  " : "MISS"} ${JSON.stringify(source)} -> ${zh ? JSON.stringify(zh) : "-"}  [${moduleId}#${key}]`);
  }
}
