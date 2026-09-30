import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 240) {
  const i = glass.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `\n==== ${needle} ====\n` + glass.slice(Math.max(0, i - 30), i + after));
}

dump('label:"Projects"');
dump('children:"Projects"');
dump('title:"Projects"');
dump('label:"Repositories"');
dump('children:"Repositories"');
dump('title:"Repositories"');
dump('label:"Customize"');
dump('children:"Customize"');
dump("No repositories found");
dump("Repository scope");
dump("All Plugins");
dump("Find Critical");
dump("Generate Documentation");
dump("Scan for vulnerabilit");
dump("children:\"New Automation\"");
dump("emptyTitle:");
dump("pageTitle:\"Automations\"");
