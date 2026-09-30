import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const file = fs.existsSync(orig) ? orig : orig.replace(".zhpack-orig", "");
const text = fs.readFileSync(file, "utf8");

const labels = new Set();
for (const match of text.matchAll(/label:"([^"\\]{2,90})"/g)) {
  const s = match[1];
  if (/[A-Za-z]/.test(s) && !/[\\/]/.test(s) && !/^(on|id|type|name|class)$/.test(s)) labels.add(s);
}

const settingsKeep = [...labels]
  .filter((s) =>
    /Account|Privacy|Import|Theme|Font|Model|Mode|Auto-|Auto |Inline|Usage|Worktree|Hook|Skill|Rule|Plugin|MCP|Index|Network|Editor Settings|Context and|MAX |On-Demand|Personal Usage|Code Font|UI Font|Tab Suggestion|Web Search|Format on|Approve|Hide Editor|Parse Links|Confetti|Trace|Compatibility|Diagnostics|Allowlist|Notification|Protection|Embedding|Subagent|Conversation|Autocomplete|Diff|Smoothing|Family|Size|Managed|Register|Approval|Interrupted|Review|GitHub|VS Code|Claude|Third-Party|Untracked|Submodule|Instant Grep|Privacy Mode|Disable Privacy|Default |Cursor Account|Editor Settings|Markdown|Mermaid|Interactive Editor|Task Models|Use Multiple|Show all models|Add Models|New User|New Message|Run Mode|Dedicated|Continue Interrupted|Start Agent|Allow Agents|Allow CLI|Cloud Agent|HTTP |Local Trace|Themed Diff|Include |Index |Enable |Disable |Accept Cursor|Ask Agent|Fix with|Find with|Open Chat as|Give the Agent|Cmd\+K|Explore Subagent|Composer Session|Automatically register|Automation|Change run|Copy worktree|New Worktree|Max Worktrees|Enable LSP|Enable Auto|Get MCP|Authenticate|Wait for|Sync Skills|Import without|Importing|Manage Themes|High Contrast|Light Theme|Dark Theme|Magenta|Code Intelligence|Grok|Tab Suggestion|Usage-Based|Hard limit|Referral|Invite /.test(
      s,
    ),
  )
  .sort();

fs.writeFileSync("catalog/settings-l23-labels.json", JSON.stringify(settingsKeep, null, 2) + "\n");
console.log("settings labels", settingsKeep.length);
console.log(settingsKeep.join("\n"));

const { sources } = loadCursorNls();
let official = {};
try {
  official = loadOfficialPack();
} catch (error) {
  console.log("official pack error", error.message);
}

const menuMods = Object.keys(sources).filter((id) => /menubar|Menubar|titlebar|layoutActions|appLayout|preferences\.contribution|gotoSymbol|codeEditor/i.test(id));
const leftovers = [];
for (const moduleId of menuMods) {
  for (const [key, source] of Object.entries(sources[moduleId] || {})) {
    if (typeof source !== "string" || !/[A-Za-z]{3}/.test(source)) continue;
    const zh = official[moduleId]?.[key];
    if (!zh || zh === source) leftovers.push({ moduleId, key, source, zh: zh || null });
  }
}
fs.writeFileSync("catalog/menu-nls-leftovers.json", JSON.stringify(leftovers, null, 2) + "\n");
console.log("\nmenu nls leftovers", leftovers.length);
for (const item of leftovers.slice(0, 80)) console.log(`${item.moduleId}#${item.key}\t${JSON.stringify(item.source)}\t=> ${item.zh}`);

for (const needle of ["Add Symbol to Current Chat", "Create Rule", "<div>Open project"]) {
  const patched = file.replace(".zhpack-orig", "");
  const origHas = text.includes(needle);
  const patchHas = fs.existsSync(patched) && fs.readFileSync(patched, "utf8").includes(needle);
  console.log(`\n${needle}: orig=${origHas} patched=${patchHas}`);
}
