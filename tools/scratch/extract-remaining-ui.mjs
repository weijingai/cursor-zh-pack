import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const glassOrig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig";
const desktop = fs.readFileSync(fs.existsSync(orig) ? orig : orig.replace(".zhpack-orig", ""), "utf8");
const glass = fs.existsSync(glassOrig)
  ? fs.readFileSync(glassOrig, "utf8")
  : fs.readFileSync(glassOrig.replace(".zhpack-orig", ""), "utf8");

const viewHits = [];
for (const re of [
  /MenubarViewMenu[^]{0,400}?title:\{value:"([^"]+)"/g,
  /MenubarViewMenu[^]{0,400}?title:Ce\(\d+,"([^"]+)"\)/g,
  /menu:\{id:Te\.MenubarViewMenu[^]{0,300}title:\{value:"([^"]+)"/g,
]) {
  for (const match of desktop.matchAll(re)) viewHits.push(match[1]);
}

const viewTitles = new Set();
const around = [];
let idx = 0;
while ((idx = desktop.indexOf("MenubarViewMenu", idx)) !== -1 && around.length < 80) {
  around.push(desktop.slice(idx, idx + 280));
  idx += 16;
}

const descriptions = new Set();
for (const match of desktop.matchAll(/description:"([^"]{12,180})"/g)) {
  const s = match[1];
  if (/[A-Za-z]/.test(s) && /[ .]/.test(s) && !/^https?:/.test(s) && !/^\w+\.\w+/.test(s)) descriptions.add(s);
}

const glassLabels = new Set();
for (const match of glass.matchAll(/(?:label|title|children):"([A-Z][^"]{2,70})"/g)) {
  glassLabels.add(match[1]);
}

const { sources } = loadCursorNls();
let official = {};
try {
  official = loadOfficialPack();
} catch (error) {
  console.log("official pack", error.message);
}

const viewNls = [];
for (const [moduleId, map] of Object.entries(sources)) {
  if (!/view|layout|menubar|appearance|sidebar|panel|zen|diff|agent/i.test(moduleId)) continue;
  for (const [key, source] of Object.entries(map)) {
    if (typeof source !== "string") continue;
    if (!/Toggle|Show|Hide|View|Appearance|Sidebar|Panel|Zen|Diff|Agent|Browser|Layout|Menu/i.test(source)) continue;
    const zh = official[moduleId]?.[key];
    if (!zh || zh === source) viewNls.push({ moduleId, key, source, zh: zh || null });
  }
}

const out = {
  viewAround: around.slice(0, 40),
  viewHits: [...new Set(viewHits)],
  descriptions: [...descriptions].sort(),
  glassLabels: [...glassLabels].filter((s) => /Agent|Setting|Chat|New |Open |Clone|Connect|Steer|Recent|Search|Canvas|Local|Cloud|Worktree|Rule|Skill|Plugin|MCP|Hook|Model|Mode|Privacy|Account|General|Appearance/i.test(s)).sort(),
  viewNls: viewNls.slice(0, 120),
};
fs.writeFileSync("catalog/remaining-ui.json", JSON.stringify(out, null, 2) + "\n");
console.log("viewAround", around.length, "viewHits", out.viewHits.length, "desc", out.descriptions.length, "glass", out.glassLabels.length, "viewNls", viewNls.length);
console.log("VIEW HITS\n", out.viewHits.join("\n"));
console.log("\nGLASS\n", out.glassLabels.slice(0, 80).join("\n"));
console.log("\nDESC sample\n", out.descriptions.slice(0, 60).join("\n"));
