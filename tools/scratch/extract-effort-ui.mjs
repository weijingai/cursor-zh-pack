import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  ["G", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"],
  ["D", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"],
];

const needles = [
  "children:\"Effort\"",
  "title:\"Effort\"",
  "aria-label\":\"Effort",
  "ariaLabel:\"Effort",
  "label:\"Effort\"",
  "\"Effort\":",
  "Effort:",
  "effort:",
  "Max Effort",
  "High Effort",
  "Low Effort",
  "Medium Effort",
  "xhigh",
  "extra-high",
  "extraHigh",
  "thinkingEffort",
  "Thinking Effort",
  "Model Effort",
  "children:\"Auto\"",
  "label:\"Auto\"",
  "children:\"Default\"",
  "CLOUD_AGENT_EFFORT",
  "effort_first",
  "Show effort",
  "effort picker",
];

function dump(src, tag, needle) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} @${i} ====`);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 70), i + 220)).slice(0, 520));
}

for (const [tag, file] of files) {
  const src = fs.readFileSync(file, "utf8");
  console.log("\n########", tag);
  for (const n of needles) dump(src, tag, n);
}
