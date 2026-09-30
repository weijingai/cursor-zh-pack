import "./lib/win-console.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
const mod = sources["vs/workbench/contrib/files/browser/files.view.contribution"] || {};
for (const [k, v] of Object.entries(mod)) {
  if (/folder|clone|git|docs|open/i.test(k) || /folder|clone|git|docs/i.test(v)) {
    console.log(`${k}: ${JSON.stringify(v)}`);
  }
}

console.log("\n==== SECURITY / TRUST ====");
for (const [moduleId, map] of Object.entries(sources)) {
  for (const [k, v] of Object.entries(map)) {
    if (
      /allowedUNC|restrictUNC|promptForLocalFile|promptForRemoteFile|trust\.banner|untilDismissed|applicationSetting|Applies to all/i.test(k) ||
      /Allowed UNC|Restrict UNC|Trusted Banner|Applies to all profiles|until dismissed/i.test(v)
    ) {
      console.log(`${moduleId}#${k}: ${JSON.stringify(v).slice(0, 200)}`);
    }
  }
}
