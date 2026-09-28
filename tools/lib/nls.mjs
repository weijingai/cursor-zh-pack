import fs from "node:fs";
import path from "node:path";

export const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";

export function loadCursorNls() {
  const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
  const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));
  const sources = {};
  const entries = [];
  let index = 0;
  for (const [moduleId, moduleKeys] of keys) {
    for (const key of moduleKeys) {
      const source = messages[index++];
      sources[moduleId] ??= {};
      if (!(key in sources[moduleId])) entries.push({ moduleId, key, source });
      sources[moduleId][key] = source;
    }
  }
  return { sources, entries };
}

export function loadOfficialPack() {
  const packs = JSON.parse(fs.readFileSync(path.join(process.env.APPDATA, "Cursor", "languagepacks.json"), "utf8"));
  const packFile = packs["zh-cn"].translations.vscode;
  const file = fs.existsSync(`${packFile}.orig`) ? `${packFile}.orig` : packFile;
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "")).contents;
}
