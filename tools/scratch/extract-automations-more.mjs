import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
for (const needle of [
  "ZWv=",
  "Ize=",
  "pageTitle:\"Automations\"",
  "emptyTitle:",
  "newAutomationButtonLabel",
  "All Runs",
  "No Automations",
  "Ship better code",
  "Find critical bugs",
  "Scheduled",
  "Send Slack",
]) {
  const i = glass.indexOf(needle);
  console.log("\n====", needle, i);
  if (i >= 0) console.log(glass.slice(i, i + 280).replace(/\s+/g, " "));
}
