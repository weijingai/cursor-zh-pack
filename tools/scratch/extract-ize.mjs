import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf('Ize={back:{id:"back"');
console.log(glass.slice(i, i + 1800));
const j = glass.indexOf("always-on cloud agents");
console.log("\nCLOUD", glass.slice(j - 20, j + 120));
