import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  ["G", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"],
  ["D", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"],
  ["MAIN", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/main.js"],
  ["NLS", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/nls.messages.json"],
  ["KEYS", "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/nls.keys.json"],
];

const needles = [
  "still working",
  "Stopping now",
  "automatically",
  "Anyway",
  "all models",
  "All Models",
  "Install Update",
  "Downloading Update",
  "Restart to Update",
  "effort",
  "Effort",
  "efort",
  "label:\"Fast\"",
  "children:\"Fast\"",
  "children:\"Effort\"",
  "View all",
  "Show all models",
  "dailysync",
  "DailySync",
  "daily sync",
];

function dump(src, tag, needle, after = 180) {
  const hits = [];
  let from = 0;
  while (hits.length < 6) {
    const i = src.indexOf(needle, from);
    if (i < 0) break;
    hits.push(i);
    from = i + needle.length;
  }
  if (!hits.length) {
    console.log("MISS", tag, needle);
    return;
  }
  for (let n = 0; n < hits.length; n++) {
    const i = hits[n];
    console.log(`\n==== ${tag}#${n + 1}/${hits.length} ${needle} @${i} ====`);
    console.log(JSON.stringify(src.slice(Math.max(0, i - 60), i + after)).slice(0, 480));
  }
}

for (const [tag, file] of files) {
  if (!fs.existsSync(file)) {
    console.log("NOFILE", tag, file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  console.log("\n########", tag, src.length);
  for (const needle of needles) dump(src, tag, needle);
}
