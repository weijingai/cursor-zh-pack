import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);

function dump(src, tag, needle, after = 280) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 40), i + after)).slice(0, 400));
}

const needles = [
  "Disable globally",
  "Snooze",
  "auto (default)",
  "Tab Stats",
  "Agent Stats",
  "No commit scored",
  "Cursor Tab",
  "fastest",
  "hooks",
  "Hooks",
  "Browse",
  "Tips",
  "dailysync",
  "Daily Sync",
];

for (const needle of needles) {
  dump(glass, "G", needle);
  if (needle === "dailysync" || needle === "Daily Sync") dump(desktop, "D", needle);
}
