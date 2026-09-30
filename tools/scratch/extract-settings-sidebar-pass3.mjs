import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const desktop = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"),
  "utf8",
);
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
  "source control in VS Code",
  "source control in VS",
  "clone a repository",
  "Git repository",
  "git repository",
  "Extra Large",
  "planTextSizeScale.small",
  "label:\"Extra Large\"",
  "value:\"extraLarge\"",
  "label:\"extra large\"",
  "\"Small\"",
  "integrityService",
  "checksumFail",
  "isPure",
  "import all local {0}",
  "finalNote",
];
console.log("==== desktop ====");
for (const needle of needles) {
  const i = desktop.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `HIT ${needle} ${JSON.stringify(desktop.slice(Math.max(0, i - 40), i + 160)).slice(0, 300)}`);
}

console.log("\n==== nls git/welcome ====");
let idx = 0;
for (const [mod, ks] of keys) {
  for (const k of ks) {
    const msg = messages[idx++];
    if (
      typeof msg === "string" &&
      /source control in VS|clone a repository|Git features|git repository or clone|import all local|Extra Large|Hide Sidebar|Don't [Ss]how [Aa]gain/i.test(
        msg,
      )
    ) {
      console.log(`${mod}#${k} = ${JSON.stringify(msg)}`);
    }
  }
}

const glass = fs.readFileSync(
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"),
  "utf8",
);
console.log("\n==== glass integrity ====");
for (const needle of ["_isPure", "checksums", "integrityService", "installation appears", "reinstall"]) {
  console.log(needle, glass.toLowerCase().includes(needle.toLowerCase()));
}

const around = desktop.indexOf('g8y="Default chooses');
console.log("\n==== explore around ====");
console.log(JSON.stringify(desktop.slice(around - 200, around + 400)).slice(0, 700));

const ext = desktop.indexOf("(don't show again)");
console.log("\n==== dont show around ====");
console.log(JSON.stringify(desktop.slice(ext - 250, ext + 80)).slice(0, 500));
