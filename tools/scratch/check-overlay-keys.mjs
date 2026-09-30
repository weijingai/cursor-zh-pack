import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const { sources } = loadCursorNls();
for (const id of [
  "vs/workbench/browser/parts/titlebar/menubarControl",
  "vs/workbench/electron-sandbox/desktop.contribution",
  "vs/workbench/contrib/workspace/browser/workspace.contribution",
]) {
  const keys = overlay[id] || {};
  for (const key of Object.keys(keys)) {
    console.log(id, key, sources[id]?.[key] === undefined ? "UNKNOWN" : "OK");
  }
}
