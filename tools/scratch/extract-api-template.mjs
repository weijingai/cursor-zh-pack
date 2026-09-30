import "./lib/win-console.mjs";
import fs from "node:fs";

for (const [name, file] of [
  ["D", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig"],
  ["G", "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig"],
]) {
  const src = fs.readFileSync(file, "utf8");
  for (const needle of [
    "} API Key`",
    "} API key`",
    "Use ${",
    "Enable ${",
    "children:\"API Keys\"",
    "tQv=\"Search Settings\"",
    "m8r=\"Copy Request ID\"",
    "rbo=\"Copy Request ID\"",
  ]) {
    const i = src.indexOf(needle);
    console.log(name, needle, i < 0 ? "MISS" : JSON.stringify(src.slice(Math.max(0, i - 30), i + needle.length + 40)));
  }
}
