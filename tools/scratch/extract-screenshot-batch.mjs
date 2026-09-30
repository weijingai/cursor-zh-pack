import "./lib/win-console.mjs";
import fs from "node:fs";

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const glass = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig";
const desktop = fs.readFileSync(orig, "utf8");
const g = fs.readFileSync(glass, "utf8");

const needles = [
  "Open View...",
  "Submit with Ctrl",
  "Ctrl+Enter submits chat",
  "Custom words that submit a voice prompt",
  "Choose how Agents run tools",
  "A classifier will run",
  "Learn more",
  "Auto-Review",
  "Prevent Agent from deleting files",
  "Prevent Agent from creating or modifying files",
  "You can configure Shell, MCP and Fetch",
  "Applying Changes",
  "Show inline diff decorations in the editor instead",
  "Automatically jump to the next diff",
  "Automatically format files when the agent finishes",
  "Use the legacy terminal tool in agent mode",
  "Automatically parse links when pasted",
  "Show a hint for Ctrl+K",
  "Preview Box for Terminal",
  "Use a preview box instead of streaming",
  "CURRENT PLAN",
  "Usage limits reset",
  "Adjust Plan",
  "UPGRADE AVAILABLE",
  "Unlock 3x more usage",
  "Included in Pro",
  "Cursor Models",
  "Additional usage beyond limits",
  "Open a Git repository",
  "Please open a folder to use background agents",
  "PR Link Destination",
  "Choose Origin",
  "Open pull request links inside Cursor",
  "Commit Attribution",
  "Made with Cursor",
  "PR Attribution",
  "Mark pull requests as made with Cursor",
  "Browser Automation",
  "Connected to Browser Tab",
  "Browser Protection",
  "Prevent Agent from automatically running Browser",
  "Open Local Links in Cursor Browser",
  "These domains must be accessible",
  "Copy Domains",
  "Run Diagnostic",
  "Partial Accepts",
  "Accept the next word of a suggestion",
  "Whitespace-Only Suggestions",
  "Automatically import necessary modules",
  "Ignored Files",
  "View included files",
  "Hierarchical Cursor Ignore",
  "Apply .cursorignore files to all subdirectories",
  "Use with caution. Skip symlinks",
  "By default, get notifications for stable updates",
  "On Home",
  "Open IDE",
  "New Browser",
  "View License",
  "Agents Window Button",
  "Command Palette \u203a Experimental",
  "Editor Large File Confirmation",
  "Activity Bar: Orientation",
];

function find(src, needle) {
  const i = src.indexOf(needle);
  if (i < 0) return null;
  return src.slice(i, i + 140).replace(/\s+/g, " ");
}

const out = [];
for (const needle of needles) {
  const d = find(desktop, needle);
  const gl = find(g, needle);
  out.push({ needle, desktop: d, glass: gl });
  console.log(d || gl ? "HIT" : "MISS", needle);
  if (d) console.log(" ", d.slice(0, 160));
  else if (gl) console.log("  G", gl.slice(0, 160));
}
fs.writeFileSync("catalog/screenshot-en-hits.json", JSON.stringify(out, null, 2) + "\n");
