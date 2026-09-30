import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  ["Dorig", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"],
  ["Gorig", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"],
  ["Dloc", `${process.env.LOCALAPPDATA}/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig`],
  ["Gloc", `${process.env.LOCALAPPDATA}/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig`],
  ["Djs", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js"],
  ["Gjs", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js"],
];

const needles = [
  "Agent is still working",
  "Stopping now will cancel the current task",
  "Resume agent automatically",
  "resume agent automatically",
  "Close Anyway",
  "close anyway",
  "Close anyway",
  "View all models",
  "view all models",
  "Browser Tab",
  "Browser tab",
  "Install Update",
  "Install update",
  "dailysync",
  "Daily Sync",
  "label:\"Compact\"",
  "children:\"Compact\"",
  "value:\"Compact\"",
  "label:\"Detailed\"",
  "children:\"Detailed\"",
  "label:\"Fast\"",
  "children:\"Fast\"",
  "label:\"Effort\"",
  "children:\"Effort\"",
  "title:\"Effort\"",
  "Effort\"",
  "fastest",
  "shutdownForceClose",
  "shutdownChatStreamingTitle",
];

function dump(src, tag, needle, after = 220) {
  let from = 0;
  let n = 0;
  while (n < 4) {
    const i = src.indexOf(needle, from);
    if (i < 0) {
      if (n === 0) console.log("MISS", tag, needle);
      return;
    }
    n += 1;
    console.log(`\n==== ${tag}#${n} ${needle} @${i} ====`);
    console.log(JSON.stringify(src.slice(Math.max(0, i - 50), i + after)).slice(0, 420));
    from = i + needle.length;
  }
}

for (const [tag, file] of files) {
  if (!fs.existsSync(file)) {
    console.log("NOFILE", tag, file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  console.log("\n########", tag, src.length, file.includes("zhpack-orig") ? "orig" : "current");
  for (const needle of needles) dump(src, tag, needle);
}
