import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before, after) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log(`\n==== ${needle} ====`);
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump("function pQg", 0, 1800);
dump("API Key`,", 80, 200);
dump("title:`", 40, 80);
dump(`${"API Key"}`, 0, 0);
dump("apiName:n", 200, 400);
dump("title:\"Anthropic API Key\"");
dump("title:`${n} API Key`");
dump("title:n+\" API Key\"");
dump("`${n} API Key`");
dump("n+\" API Key\"");
dump(" API Key\"", 80, 40);
dump("Worktree\"", 40, 80);
dump("label:\"Worktrees\"");
dump("children:\"Worktrees\"");
dump("id:\"worktree\"");
dump("worktrees:\"Worktrees\"");
dump("worktree:\"Worktree\"");
