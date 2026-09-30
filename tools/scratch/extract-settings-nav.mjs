import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf("worktrees:");
console.log("first", i, JSON.stringify(glass.slice(i, i + 80)));
let from = 0;
let n = 0;
while (n < 15) {
  const x = glass.indexOf("worktrees:", from);
  if (x < 0) break;
  const ctx = glass.slice(Math.max(0, x - 80), x + 60);
  if (/Worktree|"[A-Z]/.test(ctx)) {
    console.log(n, JSON.stringify(ctx));
    n += 1;
  }
  from = x + 10;
}
const j = glass.indexOf("general:\"General\"");
console.log("\nNAV", j < 0 ? "no general" : glass.slice(j, j + 500));
