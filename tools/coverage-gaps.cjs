"use strict";

require("../installer/lib/win-console.cjs");
const fs = require("node:fs");
const path = require("node:path");

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const packs = JSON.parse(fs.readFileSync(path.join(process.env.APPDATA, "Cursor", "languagepacks.json"), "utf8"));
const packFile = packs["zh-cn"].translations.vscode;
const origFile = fs.existsSync(`${packFile}.orig`) ? `${packFile}.orig` : packFile;
const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));
const pack = JSON.parse(fs.readFileSync(origFile, "utf8").replace(/^\uFEFF/, "")).contents;

const ALIASES = [
  [/\/electron-sandbox\//, "/electron-browser/"],
  [/\/electron-browser\//, "/electron-sandbox/"],
];

function aliasModules(moduleId) {
  const out = [];
  for (const [pattern, replacement] of ALIASES) if (pattern.test(moduleId)) out.push(moduleId.replace(pattern, replacement));
  const base = moduleId.split("/").pop();
  for (const candidate of Object.keys(pack)) if (candidate !== moduleId && candidate.split("/").pop() === base) out.push(candidate);
  return [...new Set(out)];
}

const entries = [];
let index = 0;
for (const [moduleId, moduleKeys] of keys) {
  for (const key of moduleKeys) entries.push({ moduleId, key, source: messages[index++] });
}

const memory = new Map();
for (const e of entries) {
  const zh = pack[e.moduleId]?.[e.key];
  if (!zh) continue;
  if (!memory.has(e.source)) memory.set(e.source, new Map());
  const bucket = memory.get(e.source);
  bucket.set(zh, (bucket.get(zh) ?? 0) + 1);
}

const stats = { total: entries.length, translated: 0, alias: 0, memoryUnique: 0, memoryMultiple: 0, none: 0 };
const byModule = {};
const recovered = [];
for (const e of entries) {
  if (pack[e.moduleId]?.[e.key]) {
    stats.translated++;
    continue;
  }
  const aliasHit = aliasModules(e.moduleId).find((m) => pack[m]?.[e.key]);
  if (aliasHit) {
    stats.alias++;
    recovered.push({ ...e, via: "alias", from: aliasHit, zh: pack[aliasHit][e.key] });
    continue;
  }
  const candidates = memory.get(e.source);
  if (candidates?.size === 1) {
    stats.memoryUnique++;
    recovered.push({ ...e, via: "memory", zh: [...candidates.keys()][0] });
    continue;
  }
  if (candidates?.size > 1) {
    stats.memoryMultiple++;
    recovered.push({ ...e, via: "memory-choice", candidates: Object.fromEntries(candidates) });
    continue;
  }
  stats.none++;
  byModule[e.moduleId] = (byModule[e.moduleId] ?? 0) + 1;
}

fs.mkdirSync("catalog", { recursive: true });
fs.writeFileSync("catalog/gaps.json", JSON.stringify({ stats, recovered, untranslatedByModule: byModule }, null, 2) + "\n");
console.log(JSON.stringify(stats));
console.log("top untranslated modules:");
for (const [m, n] of Object.entries(byModule).sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(String(n).padStart(4), m);
