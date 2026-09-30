import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const desktop = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig", "utf8");
const glass = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig", "utf8");

const extra = [
  "CURRENT PLAN",
  "UPGRADE AVAILABLE",
  "Included in Pro",
  "Open View",
  "On Home",
  "Show a hint for",
  "Agents Window Button",
  "Ask Chat Location",
  "Enable Natural Language Search",
  "Suggest Commands",
  "Preserve Input",
  "Editor Associations",
  "Large File Confirmation",
  "Enable Experiments",
  "External Browser",
  "External Uri Openers",
  "Layout Control",
  "Fast Scroll Sensitivity",
  "Horizontal Scrolling",
  "Multi Select Modifier",
  "Startup Editor",
  "Trusted Domains",
  "Walkthroughs",
  "Activity Bar",
  "Color Customizations",
  "Color Theme",
  "Auto Detect Color Scheme",
  "Close When Empty",
  "Command Center",
  "Confirm Before Close",
  "Controls Style",
  "Dialog Style",
  "Debounce Position Changes",
  "Chat Edit Modified File",
  "Chat Request Sent",
  "Prompt For Local File Protocol",
  "Restrict UNCAccess",
  "Trust: Banner",
  "Experimental: Serialization",
  "Paste Images As Attachments",
  "Auto Navigate Next Conflict",
  "Diff View Position",
  "Complete Property With Semicolon",
  "Get Started",
  "Inside Cursor",
  "Browser Tab",
  "Cursor Default",
  "Auto-Review (with Sandbox)",
  "Run Everything",
  "Usage limits reset on",
];

for (const needle of extra) {
  const i = desktop.indexOf(needle);
  const j = glass.indexOf(needle);
  if (i < 0 && j < 0) {
    console.log("MISS", needle);
    continue;
  }
  const src = i >= 0 ? desktop : glass;
  const pos = i >= 0 ? i : j;
  console.log("HIT", needle, (i >= 0 ? "D " : "G ") + src.slice(pos, pos + 110).replace(/\s+/g, " "));
}

const { sources } = loadCursorNls();
const hits = [];
for (const [moduleId, map] of Object.entries(sources)) {
  for (const [key, source] of Object.entries(map)) {
    if (typeof source !== "string") continue;
    if (/Agents Window Button|Ask Chat Location|Natural Language Search|Suggest Commands|Command Palette/.test(source)) {
      hits.push({ moduleId, key, source });
    }
  }
}
console.log("\nNLS", JSON.stringify(hits, null, 2));
