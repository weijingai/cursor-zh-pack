import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

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

const needles = [
  "In order to use git",
  "in order to use Git",
  "To learn more about how to use Git",
  "Click to import all local",
  "import all local",
  "Don't show again",
  "explore model",
  "availability and cost",
  "Hide Sidebar",
  "Show Sidebar",
  "Files to exclude from indexing",
  "planTextSizeScale",
  "Extra Large",
];

console.log("==== nls messages hits ====");
for (const needle of needles) {
  const i = nls.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `HIT ${needle} ${JSON.stringify(nls.slice(Math.max(0, i - 20), i + 160)).slice(0, 280)}`);
}

console.log("\n==== nls keyed ====");
let idx = 0;
for (const [mod, ks] of keys) {
  for (const k of ks) {
    const msg = messages[idx++];
    if (
      typeof msg === "string" &&
      /In order to use git|import all local|explore model|Hide Sidebar|Don't show again|Files to exclude|availability and cost|planTextSizeScale\.(small|large)/i.test(
        msg,
      )
    ) {
      console.log(`${mod}#${k} = ${JSON.stringify(msg)}`);
    }
  }
}

const desktop = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"),
  "utf8",
);
const extra = [
  "In order to use Git features",
  "open a folder containing a Git",
  "clone from a URL",
  "Click to import",
  "import all local {0}",
  "CLICK TO IMPORT",
  "children:\"Small\"",
  "children:\"Large\"",
  "children:\"Extra Large\"",
  "label:\"small\"",
  "planTextSizeScale",
  "Default chooses",
  "based on availability",
  "Explore",
  "\"(don't show again)\"",
  "Got It",
];
console.log("\n==== desktop extras ====");
for (const needle of extra) {
  const i = desktop.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `HIT ${needle} ${JSON.stringify(desktop.slice(Math.max(0, i - 30), i + 180)).slice(0, 320)}`);
}

const pf = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js";
const pfSrc = fs.readFileSync(pf, "utf8");
console.log("\n==== Program Files _isPure ====");
console.log("bypass", pfSrc.includes("async _isPure(){return{isPure:!0,proof:[]};"));
console.log("notify-return", pfSrc.includes("_showNotification(){return;"));
