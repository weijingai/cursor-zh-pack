import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 200, after = 500) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump('children:"Repositories"', 400, 200);
dump('projects:"Projects"', 200, 200);
dump('id:"customize",label:"Customize"', 250, 80);
dump('placeholder:"Search runs..."');
dump('label:"Successful');
dump('createButton:"Add Automation"');
dump('s===void 0?"Get Started"');
dump('ytT="Upgrade for Automations');
dump('iGv="Automations use Cloud Agents');
dump('children:"All Runs"');
dump('placeholder:"Search..."');
dump('aria-label:"Search"');
dump('vIn="More"');
dump('CEg=["new repository"]');
dump('name:"Home"');
