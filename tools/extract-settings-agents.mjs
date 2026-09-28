import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const bundles = [
  path.join(appOut, "vs/workbench/workbench.desktop.main.js"),
  path.join(appOut, "vs/workbench/workbench.glass.main.js"),
];
const needles = [
  "Rules, Skills, Subagents",
  "Plan & Usage",
  "Browser & Network",
  "Tools & MCPs",
  "Self-Driving PRs",
  "Cloud Agents",
  "Code Intelligence",
  "Meet the new Agents Window",
  "Search Cursor Settings",
  "Search settings",
  "Search agents",
  "No matching settings",
  "No agents found",
  "No agents yet",
  "No matching agents",
  "Import Settings from VS Code",
  "Open Agents Window on Startup",
  "Switch to Agents Window",
  "Use in Agents Window",
  "Jump back to the Agents Window",
  "Run many agents in parallel",
  "Try it now",
  "Close Settings",
  "About Cursor",
  "Marketplace Settings",
  "Plugin Settings",
  "Network Access Settings",
  "Self-driving Settings",
  "Edit Privacy Settings",
  "New MCP Server",
  "Add a Custom MCP Server",
  "Loading settings",
  "Loading team agents",
  "Search agents, Canvas",
  "Open VS Code Settings",
  "Open Composer Settings",
  "Focus AI Settings Search",
  "Manage Settings",
  "Cursor Settings",
  "vscode-settings",
  "instantGrep",
  "newAgentShort",
  "openLayoutSettingsMenu",
  "firstSteerNoticeOpenSettings",
];

const hits = {};
for (const file of bundles) {
  const text = fs.readFileSync(file, "utf8");
  const name = path.basename(file);
  hits[name] = {};
  for (const needle of needles) {
    const idx = [];
    let from = 0;
    while (idx.length < 3) {
      const i = text.indexOf(needle, from);
      if (i < 0) break;
      idx.push(i);
      from = i + needle.length;
    }
    hits[name][needle] = idx.map((i) => text.slice(Math.max(0, i - 80), i + needle.length + 120).replace(/\s+/g, " "));
  }
}

const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));
let index = 0;
const nlsHits = [];
for (const [moduleId, moduleKeys] of keys) {
  for (const key of moduleKeys) {
    const source = messages[index++];
    const hay = `${moduleId} ${key} ${source}`;
    if (/instantGrep|newAgentShort|openLayoutSettingsMenu|minimizeChatSize|firstSteerNoticeOpenSettings|settingsEditorPane|Focus AI Settings|Open Settings/i.test(hay)) {
      nlsHits.push({ moduleId, key, source });
    }
  }
}

fs.mkdirSync("catalog", { recursive: true });
fs.writeFileSync(
  "catalog/settings-agents-scan.json",
  JSON.stringify({ extractedAt: new Date().toISOString(), hits, nlsHits }, null, 2) + "\n",
);
console.log("nlsHits", nlsHits.length);
console.log(nlsHits.map((e) => `${e.moduleId}#${e.key}: ${JSON.stringify(e.source)}`).join("\n"));
