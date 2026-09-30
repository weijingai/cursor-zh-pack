import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 500) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(Math.max(0, i - 50), i + after));
}

dump("On This PC");
dump("`On ${");
dump("On \"+");
dump(':"Recents"');
dump('children:"Recents"');
dump("groupLabel:\"Repos\"");
dump("label:\"Allow List\"");
dump("label:\"allowlist\"");
dump("Allowlist");
dump("auto-run");
dump("Auto-Run");
dump("Run Everything");
dump("cta:\"figma\"");
dump("working UI");
dump("prototype");
dump("title:\"Email\"");
dump("label:\"Email\",surface");
dump("tu(\"profile\",\"email\"");
dump("value:\"on\"");
dump("label:\"On\"");
dump("label:\"Off\"");
dump("options:LCf");
dump("LCf=");
dump("Nqg=[{value:\"queue\"");
dump("Send after Agent finishes");
dump("pillLabel:\"Connect Repo\"");
dump("`New Agent in ${");
dump("HAf=");
dump("v5l=");
dump("Iis=");
dump("ebe=");
dump("Search repositories, environments");
dump("Run Cursor an");
