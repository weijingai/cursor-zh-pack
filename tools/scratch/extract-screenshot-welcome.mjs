import "./lib/win-console.mjs";
import fs from "node:fs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 380) {
  const i = desktop.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `\n==== ${needle} ====\n` + desktop.slice(Math.max(0, i - 60), i + after));
}

const needles = [
  "You have not yet opened a folder",
  "Opening a folder will close all currently open editors",
  "You can clone a repository locally",
  "To learn more about how to use Git",
  "Allowed UNC Hosts",
  "allowedUNCHosts",
  "Restrict UNC",
  "promptForLocalFileProtocolHandling",
  "Trusted Banner",
  "untilDismissed",
  "untilClosed",
  "always",
  "never",
  "Applies to all profiles",
  "MenubarFileMenu",
  "label:\"File\"",
  "mnemonicTitle",
  "&&File",
  "Selection",
  "Go",
  "emptyWindow",
  "open a folder",
  "add a folder instead",
  "read our docs",
];

for (const n of needles) dump(n);
