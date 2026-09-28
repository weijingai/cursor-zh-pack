import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const keysPath = path.join(appOut, "nls.keys.json");
const messagesPath = path.join(appOut, "nls.messages.json");

const CURSOR_HINT =
  /cursor|composer|agent|tab complete|apply|checkpoint|bugbot|\.cursor|anysphere|cmd\+k|ctrl\+k|inline edit|background agent|plan mode|ask mode|agent mode|yolo|mcp|memories|rules\.md|notepads/i;

const keys = JSON.parse(fs.readFileSync(keysPath, "utf8"));
const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));

let index = 0;
const entries = [];
const modules = new Map();

for (const pair of keys) {
  const moduleId = pair[0];
  const moduleKeys = pair[1];
  const bucket = {};
  for (const key of moduleKeys) {
    const source = messages[index++];
    bucket[key] = source;
    const hay = `${moduleId} ${key} ${source}`;
    if (CURSOR_HINT.test(hay) || /vs\/workbench\/contrib\/(chat|ai|composer|agent)/i.test(moduleId)) {
      entries.push({ moduleId, key, source });
    }
  }
  modules.set(moduleId, bucket);
}

const uniqueModules = [...new Set(entries.map((e) => e.moduleId))].sort();

fs.mkdirSync(path.resolve("catalog"), { recursive: true });
fs.writeFileSync(
  path.resolve("catalog/cursor-hint-strings.json"),
  JSON.stringify(
    {
      extractedAt: new Date().toISOString(),
      sourceApp: appOut,
      messageCount: messages.length,
      hintedCount: entries.length,
      moduleCount: uniqueModules.length,
      modules: uniqueModules,
      entries,
    },
    null,
    2,
  ),
);

console.log(
  JSON.stringify(
    {
      messageCount: messages.length,
      hintedCount: entries.length,
      moduleCount: uniqueModules.length,
      sampleModules: uniqueModules.slice(0, 40),
    },
    null,
    2,
  ),
);
