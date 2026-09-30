import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const glassOrig = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"),
  "utf8",
);
const glass = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js"),
  "utf8",
);

for (const [tag, src] of [
  ["Gorig", glassOrig],
  ["Gjs", glass],
]) {
  const i = src.indexOf("async _isPure");
  const j = src.indexOf("_isPure(");
  const k = src.indexOf("_showNotification(){");
  console.log(`\n#### ${tag}`);
  console.log("async _isPure", i >= 0 ? JSON.stringify(src.slice(i, i + 220)) : "no");
  console.log("_isPure(", j >= 0 ? JSON.stringify(src.slice(j, j + 220)) : "no");
  console.log("_showNotification", k >= 0 ? JSON.stringify(src.slice(k, k + 180)) : "no");
}

const nls = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/nls.messages.json"),
  "utf8",
);
const keys = JSON.parse(
  fs.readFileSync(
    path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/nls.keys.json"),
    "utf8",
  ),
);
const messages = JSON.parse(nls);
let idx = 0;
console.log("\n==== git/scm welcome nls ====");
for (const [mod, ks] of keys) {
  for (const k of ks) {
    const msg = messages[idx++];
    if (
      typeof msg === "string" &&
      /learn more about how to use Git|Git features|clone from a URL|opened a folder|source control/i.test(
        msg,
      )
    ) {
      console.log(`${mod}#${k} = ${JSON.stringify(msg)}`);
    }
  }
}
