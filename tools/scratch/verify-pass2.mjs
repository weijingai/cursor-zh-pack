import "./lib/win-console.mjs";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

function sha256Checksum(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

const file = "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js";
const text = fs.readFileSync(file, "utf8");
const checks = [
  "return{isPure:!0,proof:[]}",
  "_showNotification(){return;",
  "if(true||e||await this._isExplainedByPendingUpdate())",
  "切换主侧边栏的显示",
  "在编辑器中显示内联差异装饰",
  "登录以开始使用 Cursor 的 AI 功能",
  "选择要使用的主题",
  "允许 Agent 在网上搜索相关信息",
  "生成实现计划",
  "title:{value:\"查看\",original:\"View\"",
];
console.log("desktop");
for (const needle of checks) console.log(text.includes(needle) ? "OK" : "MISS", needle);

const root = "C:/Program Files/Cursor/resources/app";
const product = JSON.parse(fs.readFileSync(path.join(root, "product.json"), "utf8"));
console.log("\nchecksums");
for (const [key, stored] of Object.entries(product.checksums)) {
  const got = sha256Checksum(fs.readFileSync(path.join(root, "out", key)));
  console.log(got === stored ? "MATCH" : "MISMATCH", key);
}
