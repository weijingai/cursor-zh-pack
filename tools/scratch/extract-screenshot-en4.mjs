import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

const i = text.indexOf("warnings and tips that you");
console.log("desktop around warnings:\n", text.slice(i - 250, i + 80));

const j = glass.indexOf("warnings and tips that you");
console.log("\nglass around warnings:\n", glass.slice(j - 250, j + 80));

const k = text.indexOf('label:"Startup"');
console.log("\nstartup around:\n", text.slice(k - 200, k + 180));

for (const src of [text, glass]) {
  const m = src.indexOf("Configurable");
  console.log("\nConfigurable", m, m >= 0 ? src.slice(m - 60, m + 80) : "");
}

const o = text.indexOf("oFy=");
console.log("\noFy", text.slice(o, o + 120));
const p = glass.indexOf("eKg=");
console.log("\neKg", glass.slice(p, p + 120));

for (const needle of [
  "Reset “Don’t Ask Again”",
  "Reset \"Don't Ask Again\"",
  "Don't Ask Again Dialogs",
  "dont-ask-again",
  "dontAskAgain",
  "hidden dialogs",
]) {
  console.log(needle, "desktop", text.indexOf(needle), "glass", glass.indexOf(needle));
}
