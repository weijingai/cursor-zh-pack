import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const i = text.indexOf("instead of the legacy stacked view");
console.log(text.slice(i - 80, i + 40));
