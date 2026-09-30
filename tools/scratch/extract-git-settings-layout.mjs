import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const gitNls = JSON.parse(
  fs.readFileSync(
    path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/extensions/git/package.nls.json"),
    "utf8",
  ),
);
console.log("==== git package.nls matching ====");
for (const [k, v] of Object.entries(gitNls)) {
  if (/learn more|git features|clone from a URL|read our docs|source control in VS/i.test(String(v))) {
    console.log(k, "=", JSON.stringify(v));
  }
}

const gitI18n = JSON.parse(
  fs.readFileSync(
    path.join(
      os.homedir(),
      ".cursor/extensions/ms-ceintl.vscode-language-pack-zh-hans-1.128.0-universal/translations/extensions/vscode.git.i18n.json",
    ),
    "utf8",
  ),
);
const contents = gitI18n.contents || gitI18n;
console.log("\n==== official git i18n matching ====");
function walk(obj, prefix = "") {
  if (!obj || typeof obj !== "object") return;
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") {
      if (/learn more|git features|clone from a URL|read our docs|source control in VS| mor /i.test(v) || /Git/.test(k)) {
        if (/learn more|git features|clone from|docs|repository/i.test(v) || /learn more|git features|clone from|docs|repository/i.test(k)) {
          console.log(key, "=", JSON.stringify(v));
        }
      }
    } else walk(v, key);
  }
}
walk(contents);

const keys = JSON.parse(
  fs.readFileSync(
    path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/nls.keys.json"),
    "utf8",
  ),
);
const messages = JSON.parse(
  fs.readFileSync(
    path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/nls.messages.json"),
    "utf8",
  ),
);
let idx = 0;
console.log("\n==== settingsLayout ====");
for (const [mod, ks] of keys) {
  for (const k of ks) {
    const msg = messages[idx++];
    if (mod.includes("settingsLayout") || mod.includes("settingsTree") || /settingsLayout/.test(mod)) {
      console.log(`${mod}#${k} = ${JSON.stringify(msg)}`);
    }
  }
}
