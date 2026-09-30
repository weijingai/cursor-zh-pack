import "./lib/win-console.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources, entries } = loadCursorNls();
const interesting = [];
for (const e of entries) {
  const text = String(e.source || "");
  if (
    /menubar|Menubar|mnemonicTitle|&&[A-Z]|mi[A-Z]/.test(e.moduleId + e.key + text) ||
    /^&&/.test(text) ||
    /^(File|Edit|Selection|View|Go|Run|Terminal|Help|New Window|Open Recent|Save As|Close Editor)$/.test(text)
  ) {
    interesting.push(e);
  }
}

const byMod = new Map();
for (const e of interesting) {
  if (!byMod.has(e.moduleId)) byMod.set(e.moduleId, []);
  byMod.get(e.moduleId).push(e);
}

for (const [moduleId, items] of [...byMod.entries()].sort()) {
  if (!/menubar|titlebar|files\.contribution|editor\.contribution|debug\.contribution|terminal|window/i.test(moduleId)) continue;
  console.log(`\n==== ${moduleId} ====`);
  for (const e of items.slice(0, 40)) {
    console.log(`  ${e.key}: ${JSON.stringify(e.source)}`);
  }
}
