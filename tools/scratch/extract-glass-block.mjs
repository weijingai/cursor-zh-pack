import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 80, after = 400) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump("MenubarFileMenu,label:");
dump("MenubarEditMenu,label:");
dump("MenubarViewMenu,label:");
dump("MenubarHelpMenu,label:");
dump("Ize={back:{id:\"back\"");
dump("g0e=\"No Repo\"");
dump("Sdi=\"New Project\"");
dump("qon=\"New Agent\"");
dump("createButton:\"Add Automation\"");
dump("ctaLabel:s,isCtaLoading");
dump("Get Started");
dump("ZWv=");
dump("emptyTitle:");
dump("All Runs");
dump("Ship better code");
dump("filterTabs");
dump("Popular");
dump("Scheduled");
dump("Send Slack");
dump("nameColumn:");
