import "./lib/win-console.mjs";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";

const { entries } = loadCursorNls();
const official = loadOfficialPack();
const needles = /icon visibility|configure icon|copy request id|log out|share data|documentation|completion sound/i;
for (const item of entries) {
  if (typeof item.source === "string" && needles.test(item.source)) {
    const zh = official[item.moduleId]?.[item.key];
    console.log(JSON.stringify({ moduleId: item.moduleId, key: item.key, source: item.source, zh: zh || null }));
  }
}
