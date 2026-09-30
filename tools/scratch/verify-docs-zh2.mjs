import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
  "utf8",
);

function dump(needle) {
  const i = desktop.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `\n==== ${needle} ====\n` + desktop.slice(Math.max(0, i - 80), i + 220));
}

dump("针对");
dump("Disable for");
dump("全局禁用");
dump("cpp-status-bar-toggle");
