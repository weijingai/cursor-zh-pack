import "./lib/win-console.mjs";
import fs from "node:fs";

const files = [
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
];

const needles = [
  "Copy Request ID",
  "Configure Icon Visibility",
  "Icon Visibility",
  "Play a sound when agents finish",
  "Log Out",
  "Share Data",
  "improve Cursor for everyone",
  "OpenAI API Key",
  "Override OpenAI Base URL",
  "Enter API key",
  "Anthropic API Key",
  "Google API Key",
  "Azure OpenAI",
  "Use Azure OpenAI",
  "AWS Bedrock",
  "API Keys",
  "Search Settings",
  "Deployment Name",
  "Base URL",
  "OpenAI Base URL",
  "Google AI Studio",
  "models at-cost",
  "at cost",
  "Documentation",
  "Worktree",
  "Worktrees",
];

function dump(src, name, needle) {
  const i = src.indexOf(needle);
  if (i < 0) return false;
  console.log("\nHIT", name, needle);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 60), i + Math.min(needle.length + 180, 280))));
  return true;
}

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log("missing", file);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  console.log("\n====", file.includes("glass") ? "GLASS" : "DESKTOP", src.length);
  for (const needle of needles) dump(src, file.includes("glass") ? "G" : "D", needle);
}
