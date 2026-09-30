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

function dump(src, tag, needle, after = 900) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(i, i + after));
}

dump(glass, "G", "automations:{id:\"automations\"");
dump(glass, "G", "Hhn=[{id:\"bugbot\"");
dump(glass, "G", "g0e=\"No Repo\"");
dump(desktop, "D", "Enable language server by default");
dump(desktop, "D", "in agent worktree workspaces");
dump(desktop, "D", "label:\"Client Secret\"");
dump(desktop, "D", "OAuth Client ID");
dump(glass, "G", "Number of times used by your team");
dump(glass, "G", "children:\"in\"");
dump(glass, "G", "no repositories");
dump(glass, "G", "No repositories");
dump(glass, "G", "New repository");
dump(glass, "G", "new repository");
