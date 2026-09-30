import "./lib/win-console.mjs";
import fs from "node:fs";

const keys = JSON.parse(
  fs.readFileSync(
    "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/nls.keys.json",
    "utf8",
  ),
);
const messages = JSON.parse(
  fs.readFileSync(
    "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/nls.messages.json",
    "utf8",
  ),
);

const wanted = new Set([
  "vs/platform/update/common/updateActionTitles",
  "vs/workbench/browser/windowQuitConfirmation",
  "vs/workbench/services/workingCopy/electron-sandbox/workingCopyBackupTracker",
  "vs/workbench/contrib/composer/browser/browserEditor.contribution",
  "vs/workbench/contrib/aiConfig/browser/aiconfig.contribution",
  "vs/workbench/contrib/update/browser/update",
]);

let idx = 0;
for (const [mod, ks] of keys) {
  for (const k of ks) {
    if (wanted.has(mod)) console.log(`${mod}#${k} = ${JSON.stringify(messages[idx])}`);
    idx += 1;
  }
}
