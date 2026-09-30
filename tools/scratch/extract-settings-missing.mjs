import "./lib/win-console.mjs";
import fs from "node:fs";

const labels = JSON.parse(fs.readFileSync("catalog/settings-l23-labels.json", "utf8"));
const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const extra = fs.existsSync("payload/dom-extra-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-extra-zh.json", "utf8"))
  : {};
const glass = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
const shorts = {
  General: 1, Profile: 1, Appearance: 1, Agents: 1, Models: 1, Plugins: 1,
  Customize: 1, Indexing: 1, Network: 1, Developer: 1, Beta: 1, Hooks: 1,
  Settings: 1, Privacy: 1, Import: 1, Theme: 1, Rules: 1, Skills: 1,
  MCP: 1, Account: 1, Editor: 1, Notifications: 1, Browser: 1, Search: 1,
};

const missing = [];
for (const label of labels) {
  if (map[label] || extra[label] || glass[label] || shorts[label]) continue;
  if (/^[a-z]/.test(label) && !label.includes(" ")) continue;
  missing.push(label);
}
console.log("missing L2/L3", missing.length);
for (const item of missing) console.log("-", item);
