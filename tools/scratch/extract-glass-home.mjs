import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig", "utf8");
const desktop = fs.readFileSync("C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig", "utf8");

for (const needle of [
  "On Home",
  "onHome",
  "On home",
  'children:"Files"',
  'children:"Browser"',
  'children:"Terminal"',
  'children:"Search"',
  "New Project",
  "Open Folder",
  "New Terminal",
  "Open IDE",
  "View License",
  "Zoom In",
  "Reset Zoom",
  "Select All",
  "Command Palette",
  "CURRENT PLAN",
  "currentPlan",
  "Upgrade Available",
  "upgrade available",
  "Included in Pro",
  "includedInPro",
  "Adjust Plan",
  "Copy Domains",
  "Show\"",
  "Disabled",
  'label:"Default"',
  "Last Used",
  "Inside Cursor",
  "Default Browser",
  "Ctrl+Enter submits",
  "Enter inserts a newline",
]) {
  const i = glass.indexOf(needle);
  const j = desktop.indexOf(needle);
  if (i < 0 && j < 0) {
    console.log("MISS", needle);
    continue;
  }
  const src = i >= 0 ? glass : desktop;
  const pos = Math.max(i, j);
  console.log("HIT", needle, src.slice(pos, pos + 90).replace(/\s+/g, " "));
}
