import "./lib/win-console.mjs";
import fs from "node:fs";

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const text = fs.readFileSync(orig, "utf8");
const needles = [
  "Don't Ask Again",
  "Dont Ask Again",
  "hid earlier",
  "Window Layout",
  "default layouts",
  "status bar at the bottom",
  "floating island",
  "breadcrumbs",
  "maximize chat",
  "stacked list",
  "editor tabs",
  "Startup",
  "automatically open",
  "system tray",
  "Play a sound",
  "Data Sharing",
  "Continue Working",
  "Send follow-up",
  "trained on",
  "codebase, prompts",
  "On Home Page",
  "Review Control",
  "Auto-Hide Editor",
  "Open Chat as Editor",
];

for (const needle of needles) {
  const i = text.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    continue;
  }
  const slice = text.slice(Math.max(0, i - 80), i + 160).replace(/\s+/g, " ");
  console.log("\nHIT", needle);
  console.log(slice);
}
