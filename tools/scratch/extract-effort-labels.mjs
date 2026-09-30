import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const i = glass.indexOf('i.includes("-xhigh")');
console.log(JSON.stringify(glass.slice(i - 400, i + 900)));
console.log("\n---- extra ----");
for (const needle of [
  'label:"extra-high"',
  'label:"high"',
  'label:"medium"',
  'label:"low"',
  'label:"max"',
  'label:"fast"',
  'children:"extra-high"',
  'children:"High"',
  'children:"Max"',
  ':"Extra High"',
  ':"extra high"',
  "Extra-high",
  "extra high",
  'title:"Fast"',
  "displayName",
]) {
  const j = glass.indexOf(needle);
  console.log(j < 0 ? `MISS ${needle}` : `HIT ${needle} ${JSON.stringify(glass.slice(j, j + 80))}`);
}
