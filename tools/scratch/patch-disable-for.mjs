import "./lib/win-console.mjs";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const replacements = [
  ['t?`Disable for ${t}`:"全局禁用"', 't?`针对 ${t} 禁用`:"全局禁用"'],
  ['e?`Disable for ${e}`:"全局禁用"', 'e?`针对 ${e} 禁用`:"全局禁用"'],
];

const roots = [
  "C:/Program Files/Cursor/resources/app",
  "C:/Users/Administrator/AppData/Local/Programs/cursor/resources/app",
];

for (const appRoot of roots) {
  const files = [
    path.join(appRoot, "out/vs/workbench/workbench.desktop.main.js"),
    path.join(appRoot, "out/vs/workbench/workbench.glass.main.js"),
  ].filter((file) => fs.existsSync(file));

  let hits = 0;
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    for (const [from, to] of replacements) {
      const count = text.split(from).length - 1;
      if (!count) continue;
      text = text.split(from).join(to);
      hits += count;
    }
    fs.writeFileSync(file, text);
  }

  const productPath = path.join(appRoot, "product.json");
  if (fs.existsSync(productPath)) {
    let text = fs.readFileSync(productPath, "utf8");
    for (const file of files) {
      const key = path.relative(path.join(appRoot, "out"), file).replaceAll("\\", "/");
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`("${escaped}"\\s*:\\s*")[^"]+(")`);
      if (!pattern.test(text)) continue;
      const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("base64").replace(/=+$/, "");
      text = text.replace(pattern, `$1${hash}$2`);
    }
    fs.writeFileSync(productPath, text);
  }
  console.log(appRoot, "hits", hits);
}
