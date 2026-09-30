import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf("const O=`${n} API Key`");
console.log(glass.slice(i, i + 1200));
console.log("\n==== ENABLE ====");
const j = glass.indexOf("Are you sure you want to enable your own");
console.log(glass.slice(j - 80, j + 700));
console.log("\n==== BEDROCK FIELDS ====");
const k = glass.indexOf('label:"Access Key ID"');
console.log(glass.slice(k - 40, k + 1600));
console.log("\n==== WORKTREE SIDEBAR ====");
for (const needle of ['worktrees:"', 'label:"Worktree', 'title:"Worktree', "Worktrees", 'id:"worktrees"']) {
  const x = glass.indexOf(needle);
  console.log(needle, x < 0 ? "MISS" : JSON.stringify(glass.slice(Math.max(0, x - 40), x + 80)));
}
