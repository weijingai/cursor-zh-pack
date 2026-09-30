import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 2500) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(i, i + after));
}

dump("Ize={back:{id:\"back\"}", 3500);
dump("children:\"Mine\"");
dump("children:\"Team\"");
dump("children:\"From Cursor\"");
dump("Hhn=");
dump("title:\"Review Code with Bugbot\"");
dump("Catch bugs and auto-fix");
dump("All Runs\"");
dump("Stop All Runs");
dump("label:\"Evals\"");
dump("Add Automation");
dump("Show Chat History");
dump("legacyNewAgentLabel");
dump("btT=");
dump("v_n=");
dump("pageTitle:\"Automations\"");
