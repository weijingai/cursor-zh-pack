import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 100, after = 500) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log(`\n==== ${needle} ====`);
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump("Wait for MCP Authentication");
dump("MCP Authentication");
dump("Automatically parse");
dump("Auto-parse");
dump("parse links");
dump("Parse links");
dump("linkify");
dump("Resolve Links");
dump("inlineLabel:\"Remote Control\"");
dump("Turn on Remote Control");
dump("Prevent sleep when this computer");
dump("g0l");
dump("rVg");
dump("Public Profile");
dump("Profile Image");
dump("Match the active theme");
dump("Choose which theme");
dump("Create your own themes");
dump("Cursor periodically removes");
dump("label:\"Remote Control\"");
dump("title:\"Remote Control\"");
dump("title:\"Worktrees\"");
dump("Settings Profile");
dump("Application Profile");
dump("Profiles");
dump("profile.json");
dump("Open Profile");
dump("Export Profile");
dump("Import Profile");
dump("New Profile");
