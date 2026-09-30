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

let idx = 0;
for (const [mod, ks] of keys) {
  for (const k of ks) {
    const msg = messages[idx];
    if (
      typeof msg === "string" &&
      /still working|Close Anyway|Resume agent|cancel the current|Install Update|Browser Tab|View All|all models|Effort|Compact|Detailed/i.test(
        msg,
      )
    ) {
      console.log(`${mod}#${k} = ${JSON.stringify(msg)}`);
    }
    idx += 1;
  }
}

const glass = fs.readFileSync(
  "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const extraNeedles = [
  "View All Models",
  "children:\"View All Models\"",
  "children:\"Effort\"",
  "label:\"Effort\"",
  "\"Effort\"",
  "Extra High",
  "children:\"High\"",
  "children:\"Max\"",
  "children:\"Low\"",
  "children:\"Medium\"",
  "label:\"Max\"",
  "label:\"High\"",
  "label:\"Medium\"",
  "label:\"Low\"",
  "effortLevel",
  "Thinking",
  "children:\"Fast\"",
  "label:\"Fastest\"",
  "label:\"Faster\"",
  "label:\"Normal\"",
];

function dump(src, needle) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log(`\n==== ${needle} @${i} ====`);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 80), i + 200)).slice(0, 500));
}

console.log("\n######## glass extras");
for (const n of extraNeedles) dump(glass, n);
