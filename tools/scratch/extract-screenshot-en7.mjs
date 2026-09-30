import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const i = text.indexOf("Your code data will not be trained");
console.log(text.slice(i, i + 400));
const j = text.indexOf("No training. Code may be stored");
console.log("\n", text.slice(j - 80, j + 250));
const k = text.indexOf("No training and no storage");
console.log("\n", text.slice(k - 80, k + 250));

let from = 0;
let n = 0;
while ((from = text.indexOf("Configure", from)) !== -1 && n < 15) {
  const slice = text.slice(from, from + 40);
  if (/Configure["']/.test(slice) || /"Configure"/.test(text.slice(from - 2, from + 12))) {
    console.log("\nCFG", text.slice(from - 30, from + 50).replace(/\s+/g, " "));
    n += 1;
  }
  from += 9;
}
console.log("found", n);
