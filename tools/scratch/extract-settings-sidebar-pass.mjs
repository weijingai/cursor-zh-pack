import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";

function sha(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const roots = [
  "C:/Program Files/Cursor/resources/app",
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app"),
];

for (const root of roots) {
  const productPath = path.join(root, "product.json");
  if (!fs.existsSync(productPath)) {
    console.log("NO PRODUCT", root);
    continue;
  }
  const product = JSON.parse(fs.readFileSync(productPath, "utf8"));
  console.log("\n== checksums", root, Object.keys(product.checksums || {}).length);
  for (const key of [
    "vs/workbench/workbench.desktop.main.js",
    "vs/workbench/workbench.glass.main.js",
    "vs/code/electron-sandbox/workbench/workbench.html",
  ]) {
    const file = path.join(root, "out", key);
    const stored = product.checksums?.[key];
    if (!stored) {
      console.log("NO-KEY", key);
      continue;
    }
    if (!fs.existsSync(file)) {
      console.log("NO-FILE", key);
      continue;
    }
    const got = sha(fs.readFileSync(file));
    console.log(stored === got ? "MATCH" : "MISMATCH", key);
  }
}

const files = [
  ["Dorig", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig")],
  ["Gorig", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig")],
  ["Djs", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.desktop.main.js")],
  ["Gjs", path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app/out/vs/workbench/workbench.glass.main.js")],
];

const needles = [
  "Hide Sidebar",
  "hide sidebar",
  "Hide Side Bar",
  "Show Sidebar",
  "Cursor Tab",
  "To learn more about how to use Git",
  "In order to use git features",
  "in order to use git",
  "containing a git repository",
  "Click to import all local",
  "CLICK TO IMPORT",
  "import all local Cursor",
  "Don't show again",
  "don't show again",
  "Don't Show Again",
  "explore model based on availability",
  "Files to exclude from indexing",
  "label:\"Fixed\"",
  "label:\"Unlimited\"",
  "label:\"Small\"",
  "label:\"Large\"",
  "label:\"Extra Large\"",
  "label:\"Default\"",
  "async _isPure(){const e=this.productService.checksums||{};",
  "async _isPure(){return{isPure:!0,proof:[]};",
  "_showNotification(){return;",
  "_showNotification(){const e=this.productService.checksumFailMoreInfoUrl",
];

function dump(src, tag, needle, after = 200) {
  const i = src.indexOf(needle);
  if (i < 0) {
    console.log("MISS", tag, needle.slice(0, 70));
    return;
  }
  console.log(`\n==== ${tag} ${needle.slice(0, 70)} @${i} ====`);
  console.log(JSON.stringify(src.slice(Math.max(0, i - 40), i + after)).slice(0, 420));
}

for (const [tag, file] of files) {
  if (!fs.existsSync(file)) {
    console.log("NOFILE", tag);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  console.log("\n########", tag, src.length);
  for (const needle of needles) dump(src, tag, needle);
}
