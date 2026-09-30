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

function dump(src, tag, needle, before = 80, after = 500) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(Math.max(0, i - before), i + after));
}

const needles = [
  "new repository",
  "New repository",
  "New Repository",
  "New Project",
  "Clone Repository",
  "Add Repository",
  "Open Repository",
  "Remove Repository",
  "Rename Project",
  "Delete Project",
  "Archive Project",
  "Indexing",
  "indexed",
  "Index codebase",
  "Indexing ",
  "codebase index",
  "Ln ",
  "Col ",
  "Spaces:",
  "UTF-8",
  "status bar",
  "Status Bar",
  "No Repo",
  "Show Chat History",
  "plus",
  "Add Project",
  "Create Project",
  "Create Repository",
  "Connect repository",
  "Connect a repository",
];

for (const needle of needles) {
  dump(glass, "G", needle, 60, 280);
}
