import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const i = text.indexOf("Data Sharing Enabled");
console.log(text.slice(i, i + 900));

const j = text.indexOf("USAGE_CODEBASE_TRAINING_ALLOWED");
console.log("\n--- train ---\n", text.slice(j - 200, j + 200));

const k = text.indexOf("default-agent");
console.log("\n--- layout labels ---\n", text.slice(k - 150, k + 250));

const l = text.indexOf('n?"Hide":"Show"');
console.log("\n--- hide/show ---\n", text.slice(l - 40, l + 80));
