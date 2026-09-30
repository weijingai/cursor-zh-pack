import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
];

const needles = [
  "Don't Ask",
  "Dont Ask",
  "hidden earlier",
  "you hid",
  "Reset",
  "Conversation Density",
  "tool calls show",
  "Startup",
  "which windows",
  "Continue Working",
  "follow-up",
  "follow up",
  "Configurable",
  "Data Sharing Enabled",
  "legacy stacked",
  "maximize chat",
  "menu bar icon",
  "system tray",
  "Play a sound when Agent",
  "needs attention",
  "Window Restoration",
  "On Home",
  "open automatically",
];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  console.log("\n====", file.includes("glass") ? "glass" : "desktop");
  for (const needle of needles) {
    let from = 0;
    let n = 0;
    while ((from = text.indexOf(needle, from)) !== -1 && n < 2) {
      console.log("\n", needle, "=>", text.slice(from - 40, from + 140).replace(/\s+/g, " "));
      from += needle.length;
      n += 1;
    }
    if (!n) console.log("MISS", needle);
  }
}
