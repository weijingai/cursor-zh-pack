import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

const needles = [
  'title:"File"',
  'title:"Edit"',
  'title:"View"',
  'title:"Help"',
  'label:"File"',
  'label:"Edit"',
  'label:"View"',
  'label:"Help"',
  '&&"File"',
  '&&"Edit"',
  '&&"View"',
  '&&"Help"',
  "New Window",
  "New Agent",
  "New Project",
  "Open Recent",
  "Close Window",
  "Exit",
  "Undo",
  "Redo",
  "Cut",
  "Copy",
  "Paste",
  "Select All",
  "Find",
  "Command Palette",
  "Appearance",
  "Editor Layout",
  "Toggle Full Screen",
  "About",
  "Documentation",
  "Keyboard Shortcuts",
  "Toggle Developer Tools",
  "Open Process Explorer",
  "Customize",
  "Repositories",
  "No Repo",
  "Support for Chinese",
  "New Automation",
  "emptyDescription",
  "beginButton",
  "ctaLabel",
  "ctaTitle",
  "开始使用",
];

for (const needle of needles) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    continue;
  }
  console.log("HIT", needle, JSON.stringify(glass.slice(Math.max(0, i - 40), i + needle.length + 80)));
}
