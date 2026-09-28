import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));

function isCursorModule(moduleId) {
  if (/cursorUndo|multicursor|mainThreadCursor/i.test(moduleId)) return false;
  return (
    /\/cursor/i.test(moduleId) ||
    /contrib\/(composer|agents|aiSettings|aiConfig|cursor|appLayout)/i.test(moduleId) ||
    /AgentsWindowButton|IdeTitlebarUpdateButton/i.test(moduleId) ||
    /agentLayoutQuickMenu|windowQuitConfirmation/i.test(moduleId) ||
    /agentsWindowOrFocusMenu|titlebarActions/i.test(moduleId) ||
    /exportNotepads|exportCustomModes|glassMode/i.test(moduleId)
  );
}

let index = 0;
const byModule = {};
for (const [moduleId, moduleKeys] of keys) {
  const keep = isCursorModule(moduleId);
  for (const key of moduleKeys) {
    const source = messages[index++];
    if (!keep) continue;
    byModule[moduleId] ??= {};
    byModule[moduleId][key] = source;
  }
}

const entries = Object.entries(byModule).flatMap(([moduleId, map]) =>
  Object.entries(map).map(([key, source]) => ({ moduleId, key, source })),
);

fs.mkdirSync("catalog", { recursive: true });
fs.writeFileSync(
  "catalog/cursor-modules.json",
  JSON.stringify(
    {
      extractedAt: new Date().toISOString(),
      moduleCount: Object.keys(byModule).length,
      stringCount: entries.length,
      modules: byModule,
    },
    null,
    2,
  ),
);

console.log(`modules=${Object.keys(byModule).length} strings=${entries.length}`);
console.log(Object.keys(byModule).sort().join("\n"));
