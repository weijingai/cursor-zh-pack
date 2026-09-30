import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 80, after = 700) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump("p0e=");
dump("wCt=");
dump("P61=");
dump("gIn=");
dump("templateGallery");
dump("buildSections");
dump("Popular");
dump("Code Review");
dump("Incidents");
dump("Data & Research");
dump("Find critical");
dump("Generate docs");
dump("Scheduled");
dump("Send Slack");
dump("children:\"Projects\"");
dump("Projects &");
dump("sectionLabel");
dump("groupLabel");
dump("sidebarSection");
