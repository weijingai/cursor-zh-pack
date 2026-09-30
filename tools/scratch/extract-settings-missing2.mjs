import "./lib/win-console.mjs";
import fs from "node:fs";

const labels = JSON.parse(fs.readFileSync("catalog/settings-l23-labels.json", "utf8"));
const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const extra = JSON.parse(fs.readFileSync("payload/dom-extra-zh.json", "utf8"));
const glass = JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"));

const skip = new Set([
  "Claude Code", "GitHub", "MCP", "MCPs", "MAX Mode", "Magenta",
  "onLanguageModelTool", "searchResultModel",
  "Mode Control - Debug (control variant)",
  "Mode Control - Plan (control variant)",
  "Mode Nudge - Debug (nudge variant)",
  "Mode Nudge - Plan (nudge variant)",
  "Conversation switch scroll gate is active",
]);

const missing = [];
for (const label of labels) {
  if (skip.has(label)) continue;
  if (map[label] || extra[label] || glass[label]) continue;
  missing.push(label);
}
console.log("missing settings labels", missing.length);
for (const item of missing) console.log("-", item);
