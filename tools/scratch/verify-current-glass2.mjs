import "./lib/win-console.mjs";
import fs from "node:fs";
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);
for (const n of [
  "Wait indefinitely to authenticate",
  "无限期",
  "Automatically parse links when pasted",
  "Match the active theme to your OS",
  "让当前主题跟随",
  "Create your own themes, tweak the vibe",
  "Choose the theme used when your system is in light mode",
  "Make the cursor.com profile page",
  "Upload or remove the profile photo",
  "Claim a handle",
  "Max Worktrees",
  "Cursor periodically removes old worktrees",
  "Keep This Computer Awake",
  "Prevent sleep when this computer",
  "label:\"Theme\"",
  "label:\"主题\"",
  "label:\"Indexing\"",
  "Code Intelligence",
  "索引",
  "Create repository",
  "Clone Repository",
  "new repository",
]) console.log(glass.includes(n) ? "HIT" : "MISS", n);
