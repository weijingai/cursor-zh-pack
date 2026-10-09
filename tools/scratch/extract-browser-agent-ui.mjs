import "../lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const files = [
  ["D", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig")],
  ["G", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig")],
  ["Djs", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js")],
  ["Gjs", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js")],
];

const needles = [
  "Take Screenshot",
  "Hard Reload",
  "Copy current URL",
  "Copy Current URL",
  "Show Bookmark Bar",
  "Hide Bookmark Bar",
  "Clear Browsing History",
  "Clear cookies",
  "Clear Cookies",
  "Clear Cache",
  "Hide favorites",
  "Hide Favorites",
  "Hide favorites & History",
  "Hide Favorites & History",
  "Mark as Read",
  "Mark as read",
  'children:"Fork"',
  'label:"Fork"',
  'children:"fork"',
  'label:"fork"',
  '"Fork"',
  "Move to",
  'children:"Move to"',
  'label:"Move to"',
  'children:"Archive"',
  'label:"Archive"',
  "archiveRunningAgentConfirm",
];

function dump(src, tag, needle) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} @${i} ====`);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 60), i + 200)).slice(0, 480));
}

for (const [tag, file] of files) {
  if (!fs.existsSync(file)) {
    console.log("NOFILE", tag, file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  console.log("\n########", tag, src.length);
  for (const needle of needles) dump(src, tag, needle);
}
