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
  console.log(src.slice(Math.max(0, i - 40), i + after));
}

const needles = [
  ["G", glass, 'label:"File"'],
  ["G", glass, 'label:"Edit"'],
  ["G", glass, 'label:"View"'],
  ["G", glass, 'label:"Help"'],
  ["G", glass, 'label:"Search"'],
  ["G", glass, 'label:"Automations"'],
  ["G", glass, 'label:"Customize"'],
  ["G", glass, 'label:"Projects"'],
  ["G", glass, 'label:"Repositories"'],
  ["G", glass, "No Repo"],
  ["G", glass, "New Project"],
  ["G", glass, 'label:"Marketplace"'],
  ["G", glass, 'label:"Settings"'],
  ["G", glass, "No Automations Yet"],
  ["G", glass, "New Automation"],
  ["G", glass, "From Cursor"],
  ["G", glass, "Get Started"],
  ["G", glass, "All Runs"],
  ["G", glass, "Find critical bugs"],
  ["G", glass, "Generate docs"],
  ["G", glass, "Code Review"],
  ["G", glass, "Scan codebase"],
  ["G", glass, 'children:"Popular"'],
  ["G", glass, 'children:"Mine"'],
  ["G", glass, 'children:"Team"'],
  ["D", desktop, 'title:"Workbench"'],
  ["D", desktop, 'title:"Window"'],
  ["D", desktop, 'title:"Editor"'],
  ["D", desktop, 'title:"Features"'],
  ["D", desktop, 'title:"Extensions"'],
  ["D", desktop, 'title:"Application"'],
  ["D", desktop, "Approve this server"],
  ["D", desktop, "Approve this tool"],
  ["D", desktop, "Enable LSPs"],
  ["D", desktop, "GitHub Token"],
  ["D", desktop, "HTTP headers"],
  ["D", desktop, "Open Rule"],
  ["D", desktop, "Read MCP resource"],
];

for (const [tag, src, needle] of needles) dump(src, tag, needle);
