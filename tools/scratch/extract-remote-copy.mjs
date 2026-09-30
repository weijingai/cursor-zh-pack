import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 20, after = 1800) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log(`\n==== ${needle} ====`);
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump('{"remote-control-copy.js"', 0, 2200);
dump("authenticate when prompted");
dump("label:\"Keep This Computer Awake\"");
dump("label:\"Computer Name\"");
dump("label:\"Paired Devices\"");
dump("Allow agents on this computer");
dump("label:\"Email\"");
dump("label:\"Handle\"");
dump("label:\"Last Name\"");
dump("label:\"Links\"");
dump("label:\"Follow System Color Scheme\"");
dump("label:\"Dark Theme\"");
dump("label:\"High Contrast Dark Theme\"");
dump("label:\"Hue\"");
dump("label:\"Reduce Transparency\"");
dump("Automatically parse links when pasted");
dump("new repository");
dump("Create a new");
dump("Open Local Folder");
dump("Open folder");
dump("Add existing");
dump("Connect via SSH");
