import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
const hits = [];
for (const [moduleId, map] of Object.entries(sources)) {
  for (const [key, source] of Object.entries(map)) {
    if (/continueWorking|follow-up|Don't Ask|Startup|Window Layout/i.test(`${key} ${source}`)) {
      hits.push({ moduleId, key, source });
    }
  }
}
console.log(JSON.stringify(hits, null, 2));
