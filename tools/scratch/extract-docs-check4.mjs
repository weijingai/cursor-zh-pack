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

function dump(src, tag, needle, after = 500) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(Math.max(0, i - 80), i + after));
}

dump(desktop, "D", "cppModelsState.cppModels].forEach");
dump(desktop, "D", "textContent=\"Model\"");
dump(desktop, "D", "Cursor Tab");
dump(desktop, "D", "LABEL=\"Snooze Cursor Tab\"");
dump(desktop, "D", "editor.cpp.snooze");
dump(desktop, "D", "Temporarily disable Cursor Tab");
dump(desktop, "D", "Tab AI Stats");
dump(desktop, "D", "Agent AI Stats");
dump(desktop, "D", "accepted out of");
dump(glass, "G", "Browse Marketplace");
dump(glass, "G", "Manage plugins");
dump(glass, "G", "title:\"Hooks\"");
dump(glass, "G", "hooks:\"Hooks\"");
dump(glass, "G", "label:\"Browse\"");
dump(glass, "G", "Browse files");
dump(glass, "G", "children:\"Browse\"");
dump(desktop, "D", "children:\"Browse");
dump(desktop, "D", "label:\"Browse");
dump(glass, "G", "Plugins");
dump(glass, "G", "label:\"Hooks\"");
dump(desktop, "D", "label:\"Hooks\"");
dump(desktop, "D", "title:{value:\"Hooks\"");
dump(glass, "G", "title:{value:\"Hooks\"");
