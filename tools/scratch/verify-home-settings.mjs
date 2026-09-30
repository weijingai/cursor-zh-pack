import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const roots = [
  "C:/Program Files/Cursor/resources/app",
  path.join(process.env.LOCALAPPDATA, "Programs/cursor/resources/app"),
];

function sha256Checksum(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const needles = [
  "还没有自动化",
  "新建自动化",
  "用始终在线的 Agent",
  'label:"文件"',
  'label:"自动化"',
  "更快交付更好的代码",
  "使用 Bugbot 审查代码",
  "无仓库",
  "开始使用",
  "全部运行记录",
];

for (const root of roots) {
  console.log("\nROOT", root, fs.existsSync(root));
  const glass = path.join(root, "out/vs/workbench/workbench.glass.main.js");
  const html = path.join(root, "out/vs/code/electron-sandbox/workbench/workbench.html");
  const ui = path.join(root, "out/vs/code/electron-sandbox/workbench/cursor-zh-ui.js");
  const product = path.join(root, "product.json");
  if (!fs.existsSync(glass)) continue;
  const text = fs.readFileSync(glass, "utf8");
  for (const needle of needles) console.log(text.includes(needle) ? "HIT" : "MISS", needle);
  console.log("ui", fs.existsSync(ui), fs.existsSync(ui) ? fs.statSync(ui).size : 0);
  console.log("html injector", fs.readFileSync(html, "utf8").includes("cursor-zh-ui.js"));
  const prod = JSON.parse(fs.readFileSync(product, "utf8"));
  const checksums = prod.checksums || prod.checksum || {};
  const files = [
    "vs/workbench/workbench.desktop.main.js",
    "vs/workbench/workbench.glass.main.js",
    "vs/code/electron-sandbox/workbench/workbench.html",
  ];
  for (const rel of files) {
    const file = path.join(root, "out", rel);
    if (!fs.existsSync(file)) {
      console.log("missing", rel);
      continue;
    }
    const actual = sha256Checksum(fs.readFileSync(file));
    const expected = checksums[rel];
    console.log(actual === expected ? "MATCH" : "DIFF", rel, expected ? "has" : "no-expected");
  }
}

const ui = fs.readFileSync("payload/cursor-zh-ui.js", "utf8");
for (const sample of ["Activity Bar: Location", "Controls the location of the Activity Bar", "Find critical bugs", "Automations"]) {
  console.log("injector", sample, ui.includes(JSON.stringify(sample)));
}
