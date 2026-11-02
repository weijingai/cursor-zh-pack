"use strict";

require("./win-console.cjs");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync, spawn } = require("node:child_process");

const PACK_ID = "MS-CEINTL.vscode-language-pack-zh-hans";
const PACK_PREFIX = "ms-ceintl.vscode-language-pack-zh-hans-";
const CUSTOM_PACK_PREFIX = "cursor-zh.cursor-language-zh-cn-";
const LOCALE = "zh-cn";
const IFEO_KEY = "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Cursor.exe";

function cursorHome() {
  return path.join(os.homedir(), ".cursor");
}

function extensionsDir() {
  return path.join(cursorHome(), "extensions");
}

function homePackDir() {
  return path.join(cursorHome(), "zh-pack");
}

function userDataDirs() {
  const dirs = [];
  const add = (dir) => {
    if (!dir) return;
    const resolved = path.resolve(dir);
    if (!dirs.includes(resolved)) dirs.push(resolved);
  };
  if (process.env.APPDATA) add(path.join(process.env.APPDATA, "Cursor"));
  add(path.join(os.homedir(), ".config", "Cursor"));
  add(cursorHome());
  return dirs;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
}

function versionOf(dirName) {
  const match = dirName.match(/-(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : [0, 0, 0];
}

function findPackDir() {
  const root = extensionsDir();
  if (!fs.existsSync(root)) return null;
  const dirs = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(PACK_PREFIX))
    .map((entry) => entry.name)
    .sort((a, b) => {
      const [va, vb] = [versionOf(a), versionOf(b)];
      return va[0] - vb[0] || va[1] - vb[1] || va[2] - vb[2];
    });
  return dirs.length ? path.join(root, dirs[dirs.length - 1]) : null;
}

function findCursorCli() {
  const candidates = [
    path.join(path.dirname(process.execPath), "resources", "app", "bin", "cursor.cmd"),
    path.join(process.env.LOCALAPPDATA || "", "Programs", "cursor", "resources", "app", "bin", "cursor.cmd"),
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Cursor", "resources", "app", "bin", "cursor.cmd"),
  ];
  return candidates.find((file) => fs.existsSync(file)) || null;
}

function removeCustomLanguagePack() {
  const root = extensionsDir();
  if (!fs.existsSync(root)) return 0;
  let removed = 0;
  for (const name of fs.readdirSync(root)) {
    if (!name.startsWith(CUSTOM_PACK_PREFIX)) continue;
    fs.rmSync(path.join(root, name), { recursive: true, force: true });
    removed += 1;
  }
  for (const dir of userDataDirs()) {
    const languagePacks = path.join(dir, "languagepacks.json");
    if (fs.existsSync(languagePacks)) fs.rmSync(languagePacks);
  }
  return removed;
}

function ensureLanguagePack() {
  const removedCustom = removeCustomLanguagePack();
  if (removedCustom) console.log(`已移除 ${removedCustom} 个自制语言包，改回官方简体中文语言包方案。`);

  const existing = findPackDir();
  if (existing) return existing;

  const cli = findCursorCli();
  if (!cli) throw new Error("未找到 Cursor 命令行工具，无法自动安装中文语言包。");
  console.log("正在安装官方简体中文语言包……");
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  const result = spawnSync(`"${cli}" --install-extension ${PACK_ID}`, { shell: true, stdio: "inherit", env });
  const installed = findPackDir();
  if (result.status !== 0 || !installed) throw new Error("中文语言包安装失败，请检查网络后重试。");
  return installed;
}

function setLocale() {
  const file = path.join(os.homedir(), ".cursor", "argv.json");
  const text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "{\n}\n";
  const existing = /^(\s*)"locale"\s*:\s*"([^"]*)"/m;
  const match = text.match(existing);
  if (match && match[2] === LOCALE) return false;

  let updated;
  if (match) {
    updated = text.replace(existing, `$1"locale": "${LOCALE}"`);
  } else {
    const open = text.indexOf("{");
    if (open < 0) throw new Error(`无法解析 ${file}，请手动在其中加入 "locale": "${LOCALE}"。`);
    const rest = text.slice(open + 1);
    const comma = /^\s*"[^"]+"\s*:/m.test(rest) ? "," : "";
    updated = `${text.slice(0, open + 1)}\n\t"locale": "${LOCALE}"${comma}${rest}`;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, updated);
  return true;
}

const HTML_MARKER = "<!-- cursor-zh-pack-ui -->";
const JS_BACKUP_SUFFIX = ".zhpack-orig";

function findCursorExe() {
  if (path.basename(process.execPath).toLowerCase() === "cursor.exe") return process.execPath;
  const candidates = [
    path.join(process.env.ProgramFiles || "", "Cursor", "Cursor.exe"),
    path.join(process.env.LOCALAPPDATA || "", "Programs", "cursor", "Cursor.exe"),
  ];
  return candidates.find((file) => fs.existsSync(file)) || null;
}

function findAppRoots() {
  const override = process.env.CURSOR_ZH_PACK_APP_ROOT;
  if (override) {
    return override
      .split(path.delimiter)
      .map((dir) => path.resolve(dir))
      .filter((dir) => fs.existsSync(path.join(dir, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html")));
  }
  const exe = findCursorExe() || process.execPath;
  const fromExe =
    path.basename(exe).toLowerCase() === "cursor.exe"
      ? path.join(path.dirname(exe), "resources", "app")
      : null;
  const candidates = [
    fromExe,
    path.join(process.env.ProgramFiles || "", "Cursor", "resources", "app"),
    path.join(process.env.LOCALAPPDATA || "", "Programs", "cursor", "resources", "app"),
  ].filter(Boolean);
  const seen = new Set();
  const roots = [];
  for (const dir of candidates) {
    const resolved = path.resolve(dir);
    if (seen.has(resolved)) continue;
    seen.add(resolved);
    if (fs.existsSync(path.join(resolved, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html"))) {
      roots.push(resolved);
    }
  }
  return roots;
}

function findAppRoot() {
  return findAppRoots()[0] || null;
}

function writeFile(file, contents) {
  try {
    fs.writeFileSync(file, contents);
  } catch (error) {
    if (error.code === "EPERM" || error.code === "EACCES") {
      throw new Error(`没有权限写入 ${file}。请右键「安装.cmd」选择以管理员身份运行。`);
    }
    throw error;
  }
}

function ensureBackup(file) {
  const backup = file + JS_BACKUP_SUFFIX;
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
  return backup;
}

function restoreBackup(file) {
  const backup = file + JS_BACKUP_SUFFIX;
  if (!fs.existsSync(backup)) return false;
  fs.copyFileSync(backup, file);
  fs.rmSync(backup);
  return true;
}

function sha256Checksum(buf) {
  return crypto.createHash("sha256").update(buf).digest("base64").replace(/=+$/, "");
}

function updateIntegrityChecksums(appRoot, files) {
  const productPath = path.join(appRoot, "product.json");
  if (!fs.existsSync(productPath)) return 0;
  ensureBackup(productPath);
  let text = fs.readFileSync(productPath, "utf8");
  let changed = 0;
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const key = path.relative(path.join(appRoot, "out"), file).replaceAll("\\", "/");
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`("${escaped}"\\s*:\\s*")[^"]+(")`);
    if (!pattern.test(text)) continue;
    const hash = sha256Checksum(fs.readFileSync(file));
    text = text.replace(pattern, `$1${hash}$2`);
    changed += 1;
  }
  if (changed) writeFile(productPath, text);
  return changed;
}

function payloadFile(name) {
  const candidates = [
    path.join(__dirname, "..", "payload", name),
    path.join(__dirname, "..", "..", "payload", name),
  ];
  const hit = candidates.find((file) => fs.existsSync(file));
  if (!hit) throw new Error(`找不到 payload/${name}`);
  return hit;
}

function patchHardcodedUiAt(appRoot) {
  const replacements = readJson(payloadFile("hardcoded-ui.json"));
  let contexts = [];
  try {
    contexts = readJson(payloadFile("hardcoded-context.json"));
  } catch {
    contexts = [];
  }
  const uiScript = fs.readFileSync(payloadFile("cursor-zh-ui.js"));
  const htmlFile = path.join(appRoot, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html");
  const uiFile = path.join(path.dirname(htmlFile), "cursor-zh-ui.js");
  const bundles = [
    path.join(appRoot, "out", "vs", "workbench", "workbench.desktop.main.js"),
    path.join(appRoot, "out", "vs", "workbench", "workbench.glass.main.js"),
  ].filter((file) => fs.existsSync(file));

  writeFile(uiFile, uiScript);

  const htmlBackup = ensureBackup(htmlFile);
  let html = fs.readFileSync(htmlBackup, "utf8");
  if (!html.includes(HTML_MARKER)) {
    html = html.replace(
      '<script src="./workbench.js" type="module"></script>',
      `${HTML_MARKER}\n\t<script src="./cursor-zh-ui.js"></script>\n\t<script src="./workbench.js" type="module"></script>`,
    );
  }
  writeFile(htmlFile, html);

  let hits = 0;
  for (const file of bundles) {
    const backup = ensureBackup(file);
    let source = fs.readFileSync(backup, "utf8");
    for (const [english, chinese] of replacements) {
      const from = JSON.stringify(english);
      const to = JSON.stringify(chinese);
      const token = `\0ZH${Buffer.from(english, "utf8").toString("hex")}\0`;
      source = source.split(`original:${from}`).join(token);
      const count = source.split(from).length - 1;
      if (count) {
        source = source.split(from).join(to);
        hits += count;
      }
      source = source.split(token).join(`original:${from}`);
    }
    for (const [from, to] of contexts) {
      const count = source.split(from).length - 1;
      if (!count) continue;
      source = source.split(from).join(to);
      hits += count;
    }
    writeFile(file, source);
  }
  const checksumFiles = [htmlFile, ...bundles];
  const checksums = updateIntegrityChecksums(appRoot, checksumFiles);
  return { hits, files: bundles.length, appRoot, checksums };
}

function patchHardcodedUi() {
  const roots = findAppRoots();
  if (!roots.length) throw new Error("未找到 Cursor 安装目录，无法修补写死在界面里的英文。");
  let hits = 0;
  let files = 0;
  const patched = [];
  for (const appRoot of roots) {
    const result = patchHardcodedUiAt(appRoot);
    hits += result.hits;
    files += result.files;
    patched.push(appRoot);
  }
  return { hits, files, patched };
}

function applyGitNls(value, zh) {
  if (value && typeof value === "object" && typeof value.message === "string") {
    return { ...value, message: zh };
  }
  return zh;
}

function patchGitNlsAt(appRoot) {
  const file = path.join(appRoot, "extensions", "git", "package.nls.json");
  if (!fs.existsSync(file)) return 0;
  const zh = readJson(payloadFile("git-nls-zh.json"));
  const backup = ensureBackup(file);
  const source = readJson(backup);
  let hits = 0;
  for (const [key, translation] of Object.entries(zh)) {
    if (source[key] === undefined) continue;
    source[key] = applyGitNls(source[key], translation);
    hits += 1;
  }
  writeFile(file, `${JSON.stringify(source)}\n`);
  return hits;
}

function patchGitNls() {
  let hits = 0;
  let roots = 0;
  for (const appRoot of findAppRoots()) {
    const count = patchGitNlsAt(appRoot);
    if (count) {
      hits += count;
      roots += 1;
    }
  }
  return { hits, roots };
}

function unpatchHardcodedUi() {
  let restored = 0;
  for (const appRoot of findAppRoots()) {
    const htmlFile = path.join(appRoot, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html");
    const uiFile = path.join(path.dirname(htmlFile), "cursor-zh-ui.js");
    const files = [
      htmlFile,
      path.join(appRoot, "out", "vs", "workbench", "workbench.desktop.main.js"),
      path.join(appRoot, "out", "vs", "workbench", "workbench.glass.main.js"),
      path.join(appRoot, "product.json"),
      path.join(appRoot, "extensions", "git", "package.nls.json"),
    ];
    for (const file of files) if (fs.existsSync(file) && restoreBackup(file)) restored += 1;
    if (fs.existsSync(uiFile)) fs.rmSync(uiFile);
  }
  return restored;
}

function clearLanguageCache() {
  let cleared = 0;
  for (const dir of userDataDirs()) {
    const clpDir = path.join(dir, "clp");
    if (!fs.existsSync(clpDir)) continue;
    for (const entry of fs.readdirSync(clpDir)) {
      if (!entry.endsWith(`.${LOCALE}`)) continue;
      fs.rmSync(path.join(clpDir, entry), { recursive: true, force: true });
      cleared += 1;
    }
  }
  return cleared;
}

function install(payloadPath) {
  const overlay = readJson(payloadPath);
  const packDir = ensureLanguagePack();
  const target = path.join(packDir, "translations", "main.i18n.json");
  const backup = `${target}.orig`;
  if (!fs.existsSync(backup)) fs.copyFileSync(target, backup);
  // A file without the sentinel is an official pack (first install or a language-pack
  // update that replaced main.i18n.json). Adopt it as the new baseline. A file that
  // still has the sentinel is re-merged from the untouched official backup.
  try {
    const current = readJson(target);
    if (typeof current.zhPack !== "string" || !current.zhPack) fs.copyFileSync(target, backup);
  } catch {
    /* keep the last known official backup */
  }

  const base = readJson(backup);
  let count = 0;
  for (const [moduleId, strings] of Object.entries(overlay.contents || {})) {
    Object.assign((base.contents[moduleId] ??= {}), strings);
    count += Object.keys(strings).length;
  }
  base.zhPack = overlay.version || readPackVersion();
  fs.writeFileSync(target, JSON.stringify(base, null, "\t") + "\n");

  const localeChanged = setLocale();
  const cleared = clearLanguageCache();
  const patched = patchHardcodedUi();
  const gitNls = patchGitNls();
  console.log(`已写入 ${count} 条 Cursor 专属中文译文。`);
  console.log(`语言包位置：${packDir}`);
  console.log(`已修补 ${patched.files} 个界面文件中的 ${patched.hits} 处写死英文。`);
  for (const appRoot of patched.patched || []) console.log(`界面补丁位置：${appRoot}`);
  if (gitNls.hits) console.log(`已写入 Git 扩展欢迎文案 ${gitNls.hits} 条（${gitNls.roots} 个安装目录）。`);
  console.log("已更新 Cursor 完整性校验，避免出现“安装损坏”提示。");
  if (localeChanged) console.log("已将 Cursor 显示语言设为简体中文。");
  if (cleared) console.log(`已清理 ${cleared} 个旧的语言缓存。`);
  persistPackFiles(payloadPath);
  registerLaunchGuard();
  writePatchState();
}

function uninstall() {
  const packDir = findPackDir();
  const target = packDir && path.join(packDir, "translations", "main.i18n.json");
  const backup = target && `${target}.orig`;
  const restored = unpatchHardcodedUi();
  if (backup && fs.existsSync(backup)) {
    fs.copyFileSync(backup, target);
    fs.rmSync(backup);
  } else if (!restored) {
    removeLaunchGuard();
    console.log("未发现已安装的汉化补丁，无需卸载。");
    return;
  }
  clearLanguageCache();
  removeLaunchGuard();
  console.log("已移除 Cursor 汉化补丁，恢复为官方中文语言包。");
  if (restored) console.log(`已还原 ${restored} 个 Cursor 界面文件。`);
}

function copyIfDifferent(src, dest) {
  if (!fs.existsSync(src)) return;
  if (path.resolve(src) === path.resolve(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function readPackVersion() {
  for (const file of [path.join(__dirname, "..", "..", "package.json"), path.join(__dirname, "..", "package.json")]) {
    if (!fs.existsSync(file)) continue;
    try {
      const version = readJson(file).version;
      if (version) return version;
    } catch {
      /* ignore */
    }
  }
  return "0.0.0";
}

function readProduct(appRoot) {
  try {
    return readJson(path.join(appRoot, "product.json"));
  } catch {
    return {};
  }
}

function readState() {
  const file = path.join(homePackDir(), "state.json");
  if (!fs.existsSync(file)) return {};
  try {
    return readJson(file);
  } catch {
    return {};
  }
}

function translationHasSentinel(packDir) {
  try {
    const json = readJson(path.join(packDir, "translations", "main.i18n.json"));
    return typeof json.zhPack === "string" && json.zhPack.length > 0;
  } catch {
    return false;
  }
}

function writePatchState() {
  const roots = findAppRoots().map((root) => {
    const product = readProduct(root);
    return { root, commit: product.commit || "", version: product.version || "" };
  });
  let packVersion = "";
  const packDir = findPackDir();
  if (packDir) {
    try {
      packVersion = readJson(path.join(packDir, "translations", "main.i18n.json")).zhPack || "";
    } catch {
      /* ignore */
    }
  }
  fs.mkdirSync(homePackDir(), { recursive: true });
  fs.writeFileSync(
    path.join(homePackDir(), "state.json"),
    `${JSON.stringify({ packVersion, roots, updatedAt: new Date().toISOString() }, null, 2)}\n`,
  );
}

function installationNeedsPatch() {
  const roots = findAppRoots();
  const packDir = findPackDir();
  if (!roots.length && !packDir) return false;
  if (!packDir || !translationHasSentinel(packDir)) return true;
  const state = readState();
  for (const root of roots) {
    const htmlFile = path.join(root, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html");
    let html = "";
    try {
      html = fs.readFileSync(htmlFile, "utf8");
    } catch {
      return true;
    }
    if (!html.includes(HTML_MARKER)) return true;
    const product = readProduct(root);
    const saved = (state.roots || []).find((item) => path.resolve(item.root) === path.resolve(root));
    if (!saved || saved.commit !== (product.commit || "") || saved.version !== (product.version || "")) return true;
  }
  return false;
}

function persistPackFiles(payloadPath) {
  const dest = homePackDir();
  fs.mkdirSync(path.join(dest, "lib"), { recursive: true });
  fs.mkdirSync(path.join(dest, "payload"), { recursive: true });
  for (const name of ["zh-pack.cjs", "win-console.cjs", "patch-hardcoded.cjs", "cursor-zh-ui.js"]) {
    copyIfDifferent(path.join(__dirname, name), path.join(dest, "lib", name));
  }
  copyIfDifferent(path.join(__dirname, "guard.ps1"), path.join(dest, "guard.ps1"));
  for (const name of ["hardcoded-zh.json", "hardcoded-ui.json", "hardcoded-context.json", "git-nls-zh.json", "cursor-zh-ui.js"]) {
    copyIfDifferent(payloadFile(name), path.join(dest, "payload", name));
  }
  if (payloadPath && fs.existsSync(payloadPath)) {
    copyIfDifferent(payloadPath, path.join(dest, "payload", "cursor-overlay.i18n.json"));
  }
}

function debuggerCommand(scriptPath) {
  const ps = path.win32.join(
    process.env.SystemRoot || "C:\\Windows",
    "System32",
    "WindowsPowerShell",
    "v1.0",
    "powershell.exe",
  );
  return `${ps} -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`;
}

function registerLaunchGuard() {
  if (process.platform !== "win32" || process.env.CURSOR_ZH_PACK_GUARDING === "1") return false;
  const script = path.join(homePackDir(), "guard.ps1");
  if (!fs.existsSync(script)) return false;
  const value = debuggerCommand(script);
  fs.writeFileSync(path.join(homePackDir(), "debugger.txt"), `${value}\n`);
  const result = spawnSync("reg", ["add", IFEO_KEY, "/v", "Debugger", "/t", "REG_SZ", "/d", value, "/f"], {
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.status !== 0) {
    console.log("未能登记启动保护。Cursor 更新后请重新运行 install.cmd。");
    return false;
  }
  console.log("已登记启动保护：Cursor 更新或语言包更新后会自动重新打上汉化。");
  return true;
}

function removeLaunchGuard() {
  if (process.platform === "win32") {
    spawnSync("reg", ["delete", IFEO_KEY, "/v", "Debugger", "/f"], { stdio: "ignore", windowsHide: true });
  }
  fs.rmSync(homePackDir(), { recursive: true, force: true });
}

function defaultPayload() {
  const persisted = path.join(homePackDir(), "payload", "cursor-overlay.i18n.json");
  if (fs.existsSync(persisted)) return persisted;
  return path.join(__dirname, "..", "payload", "cursor-overlay.i18n.json");
}

function ensureInstalled(payloadPath) {
  const payload = path.resolve(payloadPath);
  persistPackFiles(payload);
  registerLaunchGuard();
  if (!installationNeedsPatch()) return false;
  console.log("检测到 Cursor 更新或汉化被还原，正在重新应用补丁……");
  install(payload);
  return true;
}

function ask(question) {
  const rl = require("node:readline").createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => (rl.close(), resolve(answer.trim()))));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function otherCursorPids() {
  const result = spawnSync("tasklist", ["/fi", "imagename eq Cursor.exe", "/fo", "csv", "/nh"], { encoding: "utf8" });
  return (result.stdout || "")
    .split(/\r?\n/)
    .map((line) => Number(line.split('","')[1]))
    .filter((pid) => pid && pid !== process.pid);
}

async function restartCursor() {
  try {
    ensureInstalled(defaultPayload());
  } catch (error) {
    console.log(`重新应用汉化失败，仍会尝试重启：${error.message}`);
  }
  const exe = findCursorExe();
  if (!exe) {
    console.log("未找到 Cursor.exe，请手动关闭所有窗口后再打开。");
    return;
  }
  for (const pid of otherCursorPids()) {
    spawnSync("taskkill", ["/pid", String(pid)], { stdio: "ignore" });
  }
  for (let waited = 0; otherCursorPids().length; waited += 1) {
    if (waited >= 30) {
      console.log("Cursor 仍在运行，请手动关闭所有 Cursor 窗口后再打开。");
      return;
    }
    await sleep(1000);
  }
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  delete env.CURSOR_ZH_PACK_GUARDING;
  spawn(exe, [], { detached: true, stdio: "ignore", env, windowsHide: false }).unref();
  console.log("已重新启动 Cursor。");
}

async function main(argv) {
  const [command, ...rest] = argv;
  const interactive = rest.includes("--interactive");
  const payloadFlag = rest.indexOf("--payload");
  const payload = payloadFlag >= 0 ? rest[payloadFlag + 1] : path.join(__dirname, "..", "payload", "cursor-overlay.i18n.json");

  if (command === "install") {
    if (interactive) console.log("正在安装 Cursor 汉化补丁……");
    install(path.resolve(payload));
  } else if (command === "uninstall") {
    uninstall();
  } else if (command === "ensure") {
    ensureInstalled(path.resolve(payload));
  } else if (command === "restart") {
    await restartCursor();
  } else {
    throw new Error("用法：zh-pack.cjs install | uninstall | ensure | restart  [--interactive] [--payload 文件]");
  }
  if (!interactive || command === "restart") return;

  console.log("\n需要完全重启 Cursor 才能生效。");
  const answer = await ask("现在关闭并重启 Cursor 吗？未保存的文件会提示你保存。(Y/N) ");
  if (/^y/i.test(answer)) await restartCursor();
  else console.log("请稍后手动关闭所有 Cursor 窗口，再重新打开。也可以双击 restart.cmd。");
}

if (require.main === module) {
  main(process.argv.slice(2))
    .catch((error) => {
      console.error(`错误：${error.message}`);
      process.exitCode = 1;
    })
    .finally(async () => {
      if (process.argv.includes("--interactive")) await ask("\n按回车键退出……");
    });
}

module.exports = {
  debuggerCommand,
  ensureInstalled,
  installationNeedsPatch,
  install,
  uninstall,
};
