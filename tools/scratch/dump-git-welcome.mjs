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
for (const key of Object.keys(gitNls).filter((k) => /workbench|learnMore|scm\./i.test(k))) {
  console.log(key, "=", JSON.stringify(gitNls[key]));
}
