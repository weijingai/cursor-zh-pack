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

for (const root of roots) {
  if (!fs.existsSync(path.join(root, "product.json"))) {
    console.log("\n== missing", root);
    continue;
  }
  const product = JSON.parse(fs.readFileSync(path.join(root, "product.json"), "utf8"));
  const keys = Object.keys(product.checksums || {});
  console.log("\n==", root, "checksums", keys.length);
  const interesting = keys.filter((key) => /workbench|glass|html|product/i.test(key));
  console.log("interesting", interesting.join(" | "));
  const check = [
    "vs/workbench/workbench.desktop.main.js",
    "vs/workbench/workbench.glass.main.js",
    "vs/code/electron-sandbox/workbench/workbench.html",
    "vs/code/electron-sandbox/workbench/workbench.js",
  ];
  for (const key of check) {
    const file = path.join(root, "out", key);
    const stored = product.checksums?.[key];
    if (!stored) {
      console.log(key, "NO-KEY");
      continue;
    }
    if (!fs.existsSync(file)) {
      console.log(key, "NO-FILE stored=" + stored);
      continue;
    }
    const got = sha256Checksum(fs.readFileSync(file));
    console.log(key, stored === got ? "MATCH" : "MISMATCH", "stored=" + stored, "got=" + got);
  }
}
