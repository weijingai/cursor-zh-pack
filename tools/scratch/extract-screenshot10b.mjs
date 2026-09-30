import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 400) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(glass.slice(Math.max(0, i - 30), i + after));
}

dump("Build from a design");
dump("from a design");
dump("Deploy my prototype");
dump("title:\"Build");
dump("cta:\"design\"");
dump("cta:\"prototype\"");
dump("frame into working");
dump("live link anyone");
dump("Recents");
dump("children:\"Repos\"");
dump('qAf="Model"');
dump('zAf="Workspace"');
dump("Link ${");
dump("`Link ");
dump("label:\"Queue\"");
dump("label:\"Submit\"");
dump("children:\"Queue\"");
dump("children:\"Submit\"");
dump("Queue Messages");
dump("value:\"queue\"");
dump("label:\"Allowlist\"");
dump("Allowlist\"");
dump("Minimize interface animations. System follows");
dump("K) input");
dump(") input`");
dump("High Contrast\"");
dump("label:\"High Contrast\"");
dump("title:\"High Contrast\"");
dump("label:\"Email\"");
dump("aria-label:\"Email\"");
dump("placeholder:\"x.com/handle\"");
dump("This Mac");
dump("This Computer");
dump("Repos\"");
dump("Cloud environments");
dump("label:\"On This PC\"");
dump("On This PC");
dump("label:\"Recents\"");
