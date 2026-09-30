import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(src, tag, needle, after = 420) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle);
    return;
  }
  console.log(`\n==== ${tag} ${needle} ====`);
  console.log(src.slice(Math.max(0, i - 40), i + after));
}

const needles = [
  ["D", desktop, "remaining)"],
  ["D", desktop, "Enable Cursor Tab"],
  ["D", desktop, "Disable Cursor Tab"],
  ["D", desktop, "Cursor Tab is"],
  ["D", desktop, "cppEnabled"],
  ["D", desktop, "textContent=\"Cursor Tab\""],
  ["D", desktop, "\"Cursor Tab\""],
  ["D", desktop, "Enable globally"],
  ["D", desktop, "disabled for"],
  ["D", desktop, "Extend Cursor with Plugins"],
  ["D", desktop, "Connect External Tools with MCP"],
  ["D", desktop, "Teach Cursor New Skills"],
  ["G", glass, "Extend Cursor with Plugins"],
  ["G", glass, "label:\"Commands\""],
  ["G", glass, "Add a hook"],
  ["G", glass, "Add Hook"],
  ["G", glass, "hooks.json"],
  ["G", glass, "No hooks"],
  ["G", glass, "User hooks"],
  ["G", glass, "Project hooks"],
  ["G", glass, "description:\"Show rotating tips"],
  ["D", desktop, "label:\"Tips\""],
  ["D", desktop, "Browse Marketplace"],
  ["D", desktop, "Manage plugins"],
  ["D", desktop, "label:\"Browser\""],
  ["G", glass, "label:\"Browser\""],
  ["G", glass, "children:\"Browser\""],
  ["D", desktop, "children:\"Browser\""],
];

for (const [tag, src, needle] of needles) dump(src, tag, needle);
