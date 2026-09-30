import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources, entries } = loadCursorNls();
const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const recovered = JSON.parse(fs.readFileSync("translations/zh-cn/recovered.json", "utf8"));
const extra = JSON.parse(fs.readFileSync("payload/dom-extra-zh.json", "utf8"));
const hard = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const glass = JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"));

let overlayHits = 0;
let recoveredHits = 0;
let extraHits = 0;
let hardHits = 0;
let glassHits = 0;
let missing = 0;
for (const { moduleId, key, source } of entries) {
  if (overlay[moduleId]?.[key]) overlayHits += 1;
  else if (recovered[moduleId]?.[key]) recoveredHits += 1;
  else if (extra[source]) extraHits += 1;
  else if (hard[source]) hardHits += 1;
  else if (glass[source]) glassHits += 1;
  else missing += 1;
}
console.log({
  entries: entries.length,
  modules: Object.keys(sources).length,
  overlayHits,
  recoveredHits,
  extraHits,
  hardHits,
  glassHits,
  missing,
  coverage: (((entries.length - missing) / entries.length) * 100).toFixed(1) + "%",
});
