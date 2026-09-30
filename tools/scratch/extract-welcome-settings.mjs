import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = process.env.CURSOR_APP_OUT ?? "C:/Program Files/Cursor/resources/app/out";
const files = [
  path.join(appOut, "vs/workbench/workbench.desktop.main.js"),
  path.join(appOut, "vs/workbench/workbench.glass.main.js"),
];
const needles = [
  "Open project",
  "Open Project",
  "Clone repo",
  "Clone Repo",
  "Clone repository",
  "Connect via SSH",
  "Steer from iOS",
  "Steer from IOS",
  "Steer from iPhone",
  "Open folder",
  "Open Folder",
  "New window",
  "Recent projects",
  "Welcome to Cursor",
  "Get started",
];

const hits = {};
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  const name = path.basename(file);
  hits[name] = {};
  for (const needle of needles) {
    const slices = [];
    let from = 0;
    while (slices.length < 4) {
      const i = text.indexOf(needle, from);
      if (i < 0) break;
      slices.push(text.slice(Math.max(0, i - 90), i + needle.length + 140).replace(/\s+/g, " "));
      from = i + needle.length;
    }
    hits[name][needle] = slices;
  }
}

fs.mkdirSync("catalog", { recursive: true });
fs.writeFileSync("catalog/welcome-settings-scan.json", JSON.stringify({ extractedAt: new Date().toISOString(), hits }, null, 2) + "\n");
for (const [file, map] of Object.entries(hits)) {
  console.log("==", file);
  for (const [needle, slices] of Object.entries(map)) console.log(needle, slices.length);
}
