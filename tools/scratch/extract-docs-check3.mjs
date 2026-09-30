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

function dump(src, tag, needle, after = 400) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(Math.max(0, i - 60), i + after));
}

dump(desktop, "D", "Snooze for");
dump(desktop, "D", "Snooze 5");
dump(desktop, "D", '"Snooze"');
dump(desktop, "D", "snooze");
dump(glass, "G", 'uar="auto (default)"');
dump(glass, "G", "auto (default)");
dump(desktop, "D", "auto (default)");
dump(desktop, "D", "children:\"fastest\"");
dump(glass, "G", "children:\"fastest\"");
dump(glass, "G", "label:\"fastest\"");
dump(desktop, "D", "label:\"fastest\"");
dump(desktop, "D", "value:\"fastest\"");
dump(glass, "G", "value:\"fastest\"");
dump(desktop, "D", "Pause for");
dump(desktop, "D", "minutes");
dump(desktop, "D", "cpp-status-bar");
dump(glass, "G", "Show rotating tips");
dump(glass, "G", "Browse plugins");
dump(glass, "G", "children:\"Browse");
dump(desktop, "D", "hooks:\"");
dump(desktop, "D", "hooks:\"Hooks\"");
dump(desktop, "D", "No commit has been scored yet");
dump(desktop, "D", "Agent Stats:");
dump(desktop, "D", "Cursor Tab");
