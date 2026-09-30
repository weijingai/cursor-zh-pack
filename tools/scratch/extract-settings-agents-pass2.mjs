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

function dump(src, tag, needle, after = 360) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(Math.max(0, i - 50), i + after));
}

const needles = [
  ["G", glass, "projects:"],
  ["G", glass, "repositories:"],
  ["G", glass, 'id:"projects"'],
  ["G", glass, 'id:"repositories"'],
  ["G", glass, "Find critical"],
  ["G", glass, "Generate doc"],
  ["G", glass, "Scan codebase"],
  ["G", glass, "Code review"],
  ["G", glass, "Code Review"],
  ["G", glass, "Popular"],
  ["G", glass, "Ship better code"],
  ["G", glass, "Review Code with Bugbot"],
  ["G", glass, "Scan and Triage"],
  ["G", glass, "children:\"Customize\""],
  ["G", glass, "New Window"],
  ["G", glass, "Open Recent"],
  ["G", glass, "Close Window"],
  ["G", glass, "Select All"],
  ["G", glass, "Command Palette"],
  ["G", glass, "Toggle Full Screen"],
  ["G", glass, "Keyboard Shortcuts"],
  ["D", desktop, "code intelligence in workspaces"],
  ["D", desktop, "Enable LSPs for Worktrees"],
  ["D", desktop, "Enable Storage"],
  ["D", desktop, "Automation name"],
  ["D", desktop, "Approve this tool"],
  ["D", desktop, "Generic Secret"],
  ["D", desktop, "CLI Credentials"],
  ["D", desktop, "Client ID"],
  ["D", desktop, "Open Commands"],
  ["D", desktop, "Open Hooks"],
];

for (const [tag, src, needle] of needles) dump(src, tag, needle);
