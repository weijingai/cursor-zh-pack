import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const { entries } = loadCursorNls();
const needles = [
  "opened a folder",
  "clone a repository",
  "source control",
  "Allowed UNC",
  "Restrict UNC",
  "protocol handler",
  "Trusted Banner",
  "untilDismissed",
  "Applies to all profiles",
  "currently open editors",
  "add a folder",
  "read our docs",
  "not yet opened",
];
for (const n of needles) {
  const hits = entries.filter((e) => typeof e.source === "string" && e.source.includes(n));
  console.log(`\n==== ${n} (${hits.length}) ====`);
  for (const h of hits.slice(0, 8)) {
    console.log(`${h.moduleId}#${h.key}: ${JSON.stringify(h.source).slice(0, 180)}`);
  }
}
