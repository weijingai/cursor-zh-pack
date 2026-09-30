import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 80, after = 420) {
  let from = 0;
  let n = 0;
  while (n < 2) {
    const i = glass.indexOf(needle, from);
    if (i < 0) {
      if (!n) console.log("MISS", needle);
      return;
    }
    console.log(`\n==== ${needle} #${n} ====`);
    console.log(glass.slice(Math.max(0, i - before), i + after));
    from = i + needle.length;
    n += 1;
  }
}

const needles = [
  "Remote Control",
  "remote control",
  "Waiting for MCP",
  "MCP verification",
  "Auto-resolve",
  "Auto resolve",
  "Automatically resolve",
  "resolve links",
  "Configuration Profile",
  "Config Profile",
  "User Profile",
  "Settings Profile",
  "Profile",
  "theme",
  "Color Theme",
  "Preferred Dark",
  "Preferred Light",
  "Auto Detect",
  "Worktree",
  "Worktrees",
  "new repository",
  "Repository URL",
  "Clone Repository",
  "Indexing",
  "Index New Files",
  "Codebase Indexing",
  "Ln ",
  "Waiting",
];

for (const needle of needles) dump(needle, 50, 360);
