import "./lib/win-console.mjs";
import fs from "node:fs";

const messages = JSON.parse(fs.readFileSync("C:/Program Files/Cursor/resources/app/out/nls.messages.json", "utf8"));
for (const i of [12059, 12841, 12842, 12843]) {
  console.log(i, messages[i]);
}

const orig = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig";
const text = fs.readFileSync(orig, "utf8");
const idx = text.indexOf("async _isPure(");
const idx2 = text.indexOf("_isPure()");
console.log("\n_isPure", text.slice(idx2, idx2 + 700));
console.log("\nasync _isPure", idx >= 0 ? text.slice(idx, idx + 800) : "no");
