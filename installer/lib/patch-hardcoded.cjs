"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const MARKER = "/*cursor-zh-pack:ui*/";
const HTML_MARK = "<!-- cursor-zh-pack-ui -->";
const ORIG = ".zhpack-orig";

function findAppRoot() {
  const exe = process.execPath;
  if (path.basename(exe).toLowerCase() === "cursor.exe") {
    return path.join(path.dirname(exe), "resources", "app");
  }
  const candidates = [
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Cursor", "resources", "app"),
    path.join(process.env.LOCALAPPDATA || "", "Programs", "cursor", "resources", "app"),
  ];
  return candidates.find((dir) => fs.existsSync(path.join(dir, "out", "vs", "workbench"))) || null;
}

function workbenchFiles(appRoot) {
  const out = path.join(appRoot, "out", "vs");
  return [
    path.join(out, "workbench", "workbench.desktop.main.js"),
    path.join(out, "workbench", "workbench.glass.main.js"),
    path.join(out, "code", "electron-sandbox", "workbench", "workbench.html"),
  ].filter((file) => fs.existsSync(file));
}

function loadPairs(file) {
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return Array.isArray(raw) ? raw : Object.entries(raw).sort((a, b) => b[0].length - a[0].length);
}

function patchJs(source, pairs, contexts) {
  let text = source;
  let hits = 0;
  for (const [english, chinese] of pairs) {
    const en = JSON.stringify(english);
    const zh = JSON.stringify(chinese);
    const pairFrom = `value:${en},original:${en}`;
    const pairTo = `value:${zh},original:${en}`;
    if (text.includes(pairFrom)) {
      text = text.split(pairFrom).join(pairTo);
      hits += 1;
    }
    const token = `\0ZH${Buffer.from(english, "utf8").toString("hex")}\0`;
    text = text.split(`original:${en}`).join(token);
    const next = text.split(en).join(zh);
    if (next !== text) hits += 1;
    text = next.split(token).join(`original:${en}`);
  }
  for (const [from, to] of contexts) {
    const count = text.split(from).length - 1;
    if (!count) continue;
    text = text.split(from).join(to);
    hits += count;
  }
  if (!text.startsWith(MARKER)) text = MARKER + text;
  return { text, hits };
}

function sha(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function backupPath(file) {
  return file + ORIG;
}

function ensureBackup(file) {
  const orig = backupPath(file);
  const current = fs.readFileSync(file, "utf8");
  if (current.includes(MARKER) || current.includes(HTML_MARK)) {
    if (!fs.existsSync(orig)) throw new Error(`已打补丁但找不到备份：${orig}`);
    return orig;
  }
  fs.copyFileSync(file, orig);
  return orig;
}

function patchHtml(source, scriptName) {
  if (source.includes(HTML_MARK)) return source;
  const tag = `\n\t${HTML_MARK}\n\t<script src="./${scriptName}"></script>`;
  if (source.includes('<script src="./workbench.js"')) {
    return source.replace('<script src="./workbench.js" type="module"></script>', `${tag}\n\t<script src="./workbench.js" type="module"></script>`);
  }
  return source.replace("</body>", `${tag}\n\t</body>`);
}

function apply(mapPath, uiScriptPath) {
  const appRoot = findAppRoot();
  if (!appRoot) throw new Error("未找到 Cursor 安装目录，无法给界面注入中文补丁。");
  const pairs = loadPairs(mapPath);
  const contexts = loadPairs(path.join(path.dirname(mapPath), "hardcoded-context.json"));
  const files = workbenchFiles(appRoot);
  if (!files.length) throw new Error("未找到 Cursor 工作台文件。");

  const htmlDir = path.dirname(files.find((file) => file.endsWith("workbench.html")));
  const scriptDest = path.join(htmlDir, "cursor-zh-ui.js");
  fs.copyFileSync(uiScriptPath, scriptDest);

  const result = [];
  for (const file of files) {
    try {
      const orig = ensureBackup(file);
      const base = fs.readFileSync(orig, "utf8");
      const patched = file.endsWith(".html")
        ? patchHtml(base, "cursor-zh-ui.js")
        : patchJs(base, pairs, contexts).text;
      fs.writeFileSync(file, patched);
      result.push(path.basename(file));
    } catch (error) {
      if (error.code === "EPERM" || error.code === "EACCES") {
        throw new Error(
          `没有权限写入 ${file}。请右键「install.cmd」选择以管理员身份运行。`,
        );
      }
      throw error;
    }
  }
  const productPath = path.join(appRoot, "product.json");
  if (fs.existsSync(productPath)) {
    const orig = productPath + ORIG;
    if (!fs.existsSync(orig)) fs.copyFileSync(productPath, orig);
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
  return { appRoot, files: result };
}

function remove() {
  const appRoot = findAppRoot();
  if (!appRoot) return { restored: 0 };
  const files = workbenchFiles(appRoot);
  const htmlDir = files.find((file) => file.endsWith("workbench.html"));
  let restored = 0;
  const product = path.join(appRoot, "product.json");
  for (const file of [...files, product]) {
    const orig = backupPath(file);
    if (!fs.existsSync(orig)) continue;
    fs.copyFileSync(orig, file);
    fs.rmSync(orig);
    restored += 1;
  }
  if (htmlDir) {
    const script = path.join(path.dirname(htmlDir), "cursor-zh-ui.js");
    if (fs.existsSync(script)) fs.rmSync(script);
  }
  return { restored };
}

module.exports = { apply, remove, findAppRoot, MARKER };
