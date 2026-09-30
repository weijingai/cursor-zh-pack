import "./lib/win-console.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
for (const [moduleId, map] of Object.entries(sources)) {
  for (const [k, v] of Object.entries(map)) {
    if (v === "&&Go" || k === "mGo" || v === "Go") {
      console.log(`${moduleId}#${k}: ${JSON.stringify(v)}`);
    }
  }
}
