import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);

const needles = [
  "Automate repetitive tasks",
  "New Automation",
  "No Automations Yet",
  "From Cursor",
  "Ship better code, faster",
  "Review Code with Bugbot",
  "Catch bugs and auto-fix",
  "Scan and Triage Security",
  "Security checks on every change",
  "Route PR Reviews",
  "Assign reviewers",
  "All Runs",
  "Find critical bugs",
  "Analyze recent commits",
  "Scan codebase for vulnerabilities",
  "Generate docs",
  "Code Review",
  "Incidents & Triage",
  "Data & Research",
  "Popular",
  "Send Slack",
  "Fix in Cursor",
  "Fix in Web",
  "High - Security",
  "Medium - Security",
  "Secrets written",
  "Template injection",
  "always-on agents",
  "built-in agents",
  "Search...",
  "Mine",
  "Use",
];

function hit(src, needle) {
  const i = src.indexOf(needle);
  if (i < 0) return null;
  return src.slice(i, i + 160).replace(/\s+/g, " ");
}

for (const needle of needles) {
  const a = hit(glass, needle);
  const b = hit(desktop, needle);
  console.log(a || b ? "HIT" : "MISS", needle);
  if (a) console.log(" G", a.slice(0, 150));
  else if (b) console.log(" D", b.slice(0, 150));
}
