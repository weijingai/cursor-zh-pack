import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";

function sha(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const roots = [
  "C:/Program Files/Cursor/resources/app",
  path.join(os.homedir(), "AppData/Local/Programs/cursor/resources/app"),
];

for (const root of roots) {
  const product = JSON.parse(fs.readFileSync(path.join(root, "product.json"), "utf8"));
  const desktop = fs.readFileSync(path.join(root, "out/vs/workbench/workbench.desktop.main.js"), "utf8");
  const glass = fs.readFileSync(path.join(root, "out/vs/workbench/workbench.glass.main.js"), "utf8");
  const git = JSON.parse(fs.readFileSync(path.join(root, "extensions/git/package.nls.json"), "utf8"));
  console.log("\n==", root);
  for (const key of ["vs/workbench/workbench.desktop.main.js", "vs/code/electron-sandbox/workbench/workbench.html"]) {
    const file = path.join(root, "out", key);
    const stored = product.checksums[key];
    const got = sha(fs.readFileSync(file));
    console.log(stored === got ? "MATCH" : "MISMATCH", key);
  }
  console.log("desktop bypass", desktop.includes("async _isPure(){return{isPure:!0,proof:[]};"));
  console.log("glass bypass", glass.includes("async _isPure(){return{isPure:!0,proof:[]};"));
  console.log("glass notify", glass.includes("_showNotification(){return;"));
  console.log("Hide Sidebar ZH", glass.includes('title:"隐藏侧边栏"'));
  console.log("exclude period ZH", desktop.includes("除 .gitignore 外还要从索引中排除的文件。") || glass.includes("除 .gitignore 外还要从索引中排除的文件。"));
  console.log("explore ZH", desktop.includes("默认会根据可用性和成本选择 Explore 模型") || glass.includes("默认会根据可用性和成本选择 Explore 模型"));
  console.log("size enum ZH", desktop.includes('return"特大"') || glass.includes('return"特大"'));
  const empty = git["view.workbench.scm.empty"];
  const msg = typeof empty === "object" ? empty.message : empty;
  console.log("git empty ZH", String(msg).includes("为了使用 Git 功能"));
}
