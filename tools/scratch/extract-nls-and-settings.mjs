import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = "C:/Program Files/Cursor/resources/app/out";
const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));

const wanted = /Add Symbol|Create Rule|Cursor Settings|Open project|Clone repo|Steer from|Connect via SSH|Find in Chat|Agents Window|Toggle Agent/i;
const hits = [];
let index = 0;
for (const [moduleId, moduleKeys] of keys) {
  for (const key of moduleKeys) {
    const source = messages[index++];
    if (typeof source === "string" && wanted.test(source)) {
      hits.push({ moduleId, key, source, index: index - 1 });
    }
  }
}
fs.writeFileSync("catalog/nls-menu-hits.json", JSON.stringify(hits, null, 2) + "\n");
console.log("nls hits", hits.length);
for (const hit of hits) console.log(`${hit.index}\t${hit.moduleId}#${hit.key}\t${hit.source}`);

const orig = path.join(appOut, "vs/workbench/workbench.desktop.main.js.zhpack-orig");
const file = fs.existsSync(orig) ? orig : path.join(appOut, "vs/workbench/workbench.desktop.main.js");
const text = fs.readFileSync(file, "utf8");

const start = text.indexOf('general:"General"');
const slice = start >= 0 ? text.slice(Math.max(0, start - 200), start + 2500) : "";
fs.writeFileSync("catalog/settings-l1-slice.txt", slice);

const sectionRe = /(?:title|label|name|heading):"(Editor Settings|Cursor Account|Privacy Mode|Default Model|Default Mode|Context and Tools|Auto-Run|Inline Diffs|Import|Privacy|Theme|Models|On-Demand Usage|Personal Usage|Usage Summary|MAX Mode|Hooks|Rules|Skills|Subagents|Plugins|MCP|Indexing|Network|Worktrees|Beta|Developer|Code Font Size|UI Font Size)"/g;
const sections = new Set();
for (const match of text.matchAll(sectionRe)) sections.add(match[0]);
console.log("\nsection contexts");
console.log([...sections].sort().join("\n"));

const around = [];
for (const needle of [
  'title:"Editor Settings"',
  'title:"Cursor Account"',
  'title:"Privacy"',
  'label:"Default Model"',
  'title:"Context and Tools"',
  'title:"Inline Diffs"',
  'title:"Auto-Run"',
]) {
  const i = text.indexOf(needle);
  around.push({ needle, found: i >= 0, snippet: i >= 0 ? text.slice(i, i + 180) : "" });
}
fs.writeFileSync("catalog/settings-section-around.json", JSON.stringify(around, null, 2) + "\n");
console.log("\naround");
for (const item of around) console.log(item.found ? `${item.needle} => ${item.snippet}` : `MISSING ${item.needle}`);
