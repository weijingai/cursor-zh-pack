import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const file = process.env.CURSOR_APP_OUT
  ? path.join(process.env.CURSOR_APP_OUT, "vs/workbench/workbench.desktop.main.js")
  : "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js";
const text = fs.readFileSync(file, "utf8");
const labels = new Set();
const titles = new Set();
const htmlDivs = new Set();

for (const match of text.matchAll(/label:"([^"]{3,80})"/g)) labels.add(match[1]);
for (const match of text.matchAll(/title:"([^"]{3,80})"/g)) titles.add(match[1]);
for (const match of text.matchAll(/<div>([A-Z][^<]{2,40})<\/div>/g)) htmlDivs.add(match[1]);
for (const match of text.matchAll(/<span>([A-Z][^<]{2,40})<\/span>/g)) htmlDivs.add(match[1]);

const keep = (s) =>
  /[A-Za-z]/.test(s) &&
  !/^https?:/.test(s) &&
  !/^[\w./-]+\.(js|tsx|css|json)$/.test(s) &&
  !/^[a-z]+[A-Z]/.test(s) === false;

const settingsHints =
  /settings|privacy|appearance|model|agent|tab |hook|plugin|index|network|usage|account|import|theme|editor|inline|context|mode|rule|skill|mcp|worktree|beta|developer|keymap|font|auto/i;

const labelHits = [...labels].filter((s) => settingsHints.test(s) || /^(General|Privacy|Account|Models|Agents|Appearance|Editor|Theme)/.test(s)).sort();
const titleHits = [...titles].filter((s) => settingsHints.test(s)).sort();
const emptyScreen = [...htmlDivs].sort();

const out = { labels: labelHits, titles: titleHits.slice(0, 250), emptyScreen };
fs.writeFileSync("catalog/settings-tree-scan.json", JSON.stringify(out, null, 2) + "\n");
console.log("labels", labelHits.length, "titles", titleHits.length, "html", emptyScreen.length);
console.log("empty", emptyScreen.join(" | "));
console.log("labels sample\n", labelHits.slice(0, 80).join("\n"));
