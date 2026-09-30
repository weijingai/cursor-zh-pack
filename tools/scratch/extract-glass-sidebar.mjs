import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

const needles = [
  'label:"Projects"',
  'label:"Repositories"',
  'label:"Customize"',
  'children:"Projects"',
  'children:"Repositories"',
  'children:"Customize"',
  'title:"Projects"',
  'title:"Repositories"',
  'heading:"Projects"',
  '"Projects"',
  "sectionTitle",
  "No Repo",
  "Support for",
  "placeholder:\"Search",
  "Search runs",
  "Successful",
  "Failed \\xB7",
  "Stop All Runs",
  "Add Automation",
  "New Automation",
  "Get Started",
  "Upgrade for Automations",
  "Find critical bugs",
];

for (const needle of needles) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    continue;
  }
  console.log("HIT", needle, JSON.stringify(glass.slice(Math.max(0, i - 30), i + Math.min(needle.length + 70, 120))));
}
