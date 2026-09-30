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

dump(desktop, "D", "Disable globally");
dump(desktop, "D", "Snooze");
dump(desktop, "D", 'uar="auto (default)"');
dump(desktop, "D", "Tab Stats:");
dump(desktop, "D", "No commit scored");
dump(desktop, "D", "label:\"Snooze\"");
dump(desktop, "D", "children:\"Snooze\"");
dump(desktop, "D", "title:\"Snooze\"");
dump(glass, "G", "label:\"Snooze\"");
dump(glass, "G", "children:\"Snooze\"");
dump(glass, "G", "emptyStateTips");
dump(glass, "G", "EmptyStateTips");
dump(glass, "G", "label:\"Tips\"");
dump(glass, "G", "children:\"Tips\"");
dump(glass, "G", "title:\"Tips\"");
dump(glass, "G", "Show Empty State Tips");
dump(glass, "G", "Browse");
dump(glass, "G", "children:\"Browse\"");
dump(glass, "G", "label:\"Browse\"");
dump(glass, "G", "title:\"Hooks\"");
dump(glass, "G", "hooks:\"Hooks\"");
dump(desktop, "D", "fastest");
dump(desktop, "D", '"fastest"');
dump(desktop, "D", "label:\"fastest\"");
dump(desktop, "D", "Pause");
dump(desktop, "D", "Disable for ");
