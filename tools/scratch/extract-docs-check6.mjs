import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
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

dump(desktop, "D", "pCe={plugins:");
dump(glass, "G", "Q5e={plugins:");
dump(desktop, "D", 'oNp=[{label:"1 minute"');
dump(desktop, "D", "formatSnoozedTimeRemaining");
dump(desktop, "D", "Disable Cursor Tab for these languages");
dump(desktop, "D", "Enable partial accepts for Cursor Tab");
dump(desktop, "D", "No hooks match");
dump(glass, "G", "No hooks match");
dump(desktop, "D", "Open hooks.json");
dump(glass, "G", "Open hooks.json");
dump(glass, "G", "hooks:{title:");
dump(desktop, "D", "hooks:{title:");
