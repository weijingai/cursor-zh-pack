import "./lib/win-console.mjs";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

function sha256Checksum(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const root = "C:/Program Files/Cursor/resources/app";
const productPath = path.join(root, "product.json");
const product = JSON.parse(fs.readFileSync(productPath, "utf8"));
console.log("checksum keys", Object.keys(product.checksums));
for (const [key, stored] of Object.entries(product.checksums)) {
  const file = path.join(root, "out", key);
  const exists = fs.existsSync(file);
  const got = exists ? sha256Checksum(fs.readFileSync(file)) : null;
  console.log((got === stored ? "MATCH" : "MISMATCH"), key, exists ? "" : "NOFILE");
  if (got && got !== stored) console.log("  stored", stored, "got", got);
}

const orig = productPath + ".zhpack-orig";
if (fs.existsSync(orig)) {
  const origProduct = JSON.parse(fs.readFileSync(orig, "utf8"));
  console.log("\nproduct.json changed", fs.readFileSync(productPath).length, "vs orig", fs.readFileSync(orig).length);
  for (const key of Object.keys(origProduct.checksums || {})) {
    if (origProduct.checksums[key] !== product.checksums[key]) {
      console.log("checksum updated", key);
    }
  }
}

const desktop = fs.readFileSync(path.join(root, "out/vs/workbench/workbench.desktop.main.js"), "utf8");
const needles = [
  "installation appears corrupt",
  "please reinstall",
  "Integrity",
  "checksums",
  "isCorrupt",
];
for (const needle of needles) {
  const i = desktop.toLowerCase().indexOf(needle.toLowerCase());
  console.log("js", needle, i >= 0 ? desktop.slice(Math.max(0, i - 80), i + 160).replace(/\s+/g, " ") : "no");
}
