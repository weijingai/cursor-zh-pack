import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 280) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log("\n====", needle, "====");
  console.log(JSON.stringify(glass.slice(Math.max(0, i - 40), i + after)).slice(0, 420));
}

const needles = [
  "New Agent in ",
  "Connect Repo",
  "Import your Claude Code conversations",
  "Sync your chats and continue them in Cursor",
  "Create a focused chat where Agents coordinate work",
  "Select Repository",
  "Search remote repos, cloud environments",
  "Select Multiple",
  "Start from scratch",
  "Search repos, cloud environments",
  "On This PC",
  "Use Existing",
  "New Folder",
  "Plan New Idea",
  "Build from a design",
  "Deploy my prototype",
  "Start with a plan",
  "Debug an issue",
  "Turn a frame into working UI",
  "Put it on a live link",
  "Align on implementation",
  "Find root causes",
  "Upload image",
  "Claim handle",
  "Add link",
  "When enabled, your cursor.com profile page",
  "PNG, JPEG, or WebP",
  "Choose between light, dark, or high contrast",
  "Tool Call Density",
  "Reduce Motion",
  "Minimize interface animations",
  "Hide Email Address",
  "Skip approval dialog",
  "Allowlist",
  "Inherit from parent",
  "Add or search model",
  "Search models",
  "cost- and availability-aware",
  "No Cursor-managed worktrees",
  "Maximum total size in GB across all Cursor-managed",
  "queue",
  "submit",
  "Queue",
  "Submit",
  "This PC",
  "Multitask",
  "Link 1",
  "High Contrast",
];

for (const needle of needles) dump(needle);
