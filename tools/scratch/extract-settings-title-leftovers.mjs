import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
let official = {};
try {
  official = loadOfficialPack();
} catch (error) {
  console.log("official error", error.message);
}

const leftovers = [];
for (const [moduleId, map] of Object.entries(sources)) {
  if (!/configuration|contribution|preferences|settings/i.test(moduleId)) continue;
  for (const [key, source] of Object.entries(map)) {
    if (typeof source !== "string") continue;
    if (!/^[A-Z]/.test(source) && !source.includes(":")) continue;
    if (source.length < 8 || source.length > 90) continue;
    if (!/[A-Za-z]{4}/.test(source)) continue;
    const zh = official[moduleId]?.[key];
    if (!zh || zh === source) leftovers.push({ moduleId, key, source, zh: zh || null });
  }
}
leftovers.sort((a, b) => a.source.localeCompare(b.source));
fs.writeFileSync("catalog/settings-title-leftovers.json", JSON.stringify(leftovers, null, 2) + "\n");
console.log("leftovers", leftovers.length);
for (const item of leftovers.slice(0, 80)) console.log(item.source);
