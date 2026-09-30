import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const needles = [
  'worktrees:{',
  'id:"worktrees"',
  'tab:"worktrees"',
  '"worktrees",label',
  'label:"Worktrees"',
  'label:"Worktree"',
  'children:"Worktree"',
  'title:"Worktree"',
  'Worktree',
];
for (const needle of needles) {
  let from = 0;
  let n = 0;
  while (n < 5) {
    const i = glass.indexOf(needle, from);
    if (i < 0) {
      if (!n) console.log("MISS", needle);
      break;
    }
    const ctx = glass.slice(Math.max(0, i - 50), i + needle.length + 70).replace(/\s+/g, " ");
    if (/label|title|children|name:/.test(ctx) || needle.length > 12) {
      console.log("HIT", needle, JSON.stringify(ctx).slice(0, 220));
      n += 1;
    }
    from = i + needle.length;
    if (n === 0 && from > i + 500000) break;
  }
}
