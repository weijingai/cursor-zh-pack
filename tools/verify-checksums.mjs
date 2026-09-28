import "./lib/win-console.mjs";
import fs from "node:fs";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";

function sha256Checksum(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const roots = [
  "C:/Program Files/Cursor/resources/app",
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app"),
];
const files = [
  "vs/workbench/workbench.desktop.main.js",
  "vs/code/electron-sandbox/workbench/workbench.html",
];
for (const root of roots) {
  const product = JSON.parse(fs.readFileSync(path.join(root, "product.json"), "utf8"));
  console.log("\n==", root);
  for (const key of files) {
    const buf = fs.readFileSync(path.join(root, "out", key));
    const got = sha256Checksum(buf);
    const stored = product.checksums[key];
    console.log(key, stored === got ? "MATCH" : "MISMATCH", "stored=" + stored, "got=" + got);
  }
}
