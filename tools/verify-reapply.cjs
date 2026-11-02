"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");

const root = fs.mkdtempSync(path.join("/tmp", "zh-pack-reapply-"));
process.env.HOME = root;
process.env.USERPROFILE = root;
process.env.APPDATA = path.join(root, "AppData", "Roaming");
process.env.LOCALAPPDATA = path.join(root, "AppData", "Local");
process.env.ProgramFiles = path.join(root, "Program Files");
process.env.SystemRoot = "C:\\Windows";
delete process.env.CURSOR_ZH_PACK_GUARDING;
process.env.CURSOR_ZH_PACK_APP_ROOT = path.join(root, "missing-app");

const os = require("node:os");
const { spawnSync } = require("node:child_process");
const zh = require("../installer/lib/zh-pack.cjs");

assert.equal(os.homedir(), root, "os.homedir() must follow the temp HOME");
assert.equal(zh.installationNeedsPatch(), false);

const command = zh.debuggerCommand("C:\\Users\\a b\\guard.ps1");
assert.match(
  command,
  /^C:\\Windows\\System32\\WindowsPowerShell\\v1\.0\\powershell\.exe -NoProfile -ExecutionPolicy Bypass -File "C:\\Users\\a b\\guard.ps1"$/,
);

const appRoot = path.join(root, "Cursor", "resources", "app");
const htmlFile = path.join(appRoot, "out", "vs", "code", "electron-sandbox", "workbench", "workbench.html");
const desktopFile = path.join(appRoot, "out", "vs", "workbench", "workbench.desktop.main.js");
const gitFile = path.join(appRoot, "extensions", "git", "package.nls.json");
const productFile = path.join(appRoot, "product.json");
const packDir = path.join(root, ".cursor", "extensions", "ms-ceintl.vscode-language-pack-zh-hans-1.0.0");
const translationFile = path.join(packDir, "translations", "main.i18n.json");
const overlayFile = path.join(root, "overlay.i18n.json");
const marker = "<!-- cursor-zh-pack-ui -->";

const originalHtml = "<!DOCTYPE html>\n<html>\n<body>\n\t<script src=\"./workbench.js\" type=\"module\"></script>\n</body>\n</html>\n";
const originalJs = [
  'title:"Take Screenshot"',
  "async _isPure(){const e=this.productService.checksums||{};",
  "async _isPure(){const t=this.productService.checksums||{};",
  "",
].join("\n");
const originalGit = {
  "view.workbench.scm.empty": "The folder currently open doesn't have a Git repository.",
};

function checksum(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("base64").replace(/=+$/, "");
}

function writeProduct(commit, version) {
  const product = {
    commit,
    version,
    checksums: {
      "vs/workbench/workbench.desktop.main.js": "OLD",
      "vs/code/electron-sandbox/workbench/workbench.html": "OLD",
    },
  };
  fs.writeFileSync(productFile, `${JSON.stringify(product, null, 2)}\n`);
}

function writeOriginalApp(commit, version) {
  fs.mkdirSync(path.dirname(htmlFile), { recursive: true });
  fs.mkdirSync(path.dirname(desktopFile), { recursive: true });
  fs.mkdirSync(path.dirname(gitFile), { recursive: true });
  fs.writeFileSync(htmlFile, originalHtml);
  fs.writeFileSync(desktopFile, originalJs);
  fs.writeFileSync(gitFile, `${JSON.stringify(originalGit, null, 2)}\n`);
  writeProduct(commit, version);
  for (const file of [htmlFile, desktopFile, gitFile, productFile]) {
    fs.rmSync(`${file}.zhpack-orig`, { force: true });
  }
  const injected = path.join(path.dirname(htmlFile), "cursor-zh-ui.js");
  fs.rmSync(injected, { force: true });
}

function readTranslation() {
  return JSON.parse(fs.readFileSync(translationFile, "utf8"));
}

function assertPatched(label) {
  const html = fs.readFileSync(htmlFile, "utf8");
  assert.equal(html.split(marker).length - 1, 1, `${label}: HTML marker count`);
  assert.equal(html.split("./cursor-zh-ui.js").length - 1, 1, `${label}: injected script count`);
  const js = fs.readFileSync(desktopFile, "utf8");
  assert.equal(js.includes('"Take Screenshot"'), false, `${label}: English screenshot label remains`);
  assert.equal(js.includes('"截取屏幕截图"'), true, `${label}: screenshot translation`);
  assert.equal(
    js.includes("async _isPure(){return{isPure:!0,proof:[]};const e=this.productService.checksums||{};"),
    true,
    `${label}: e _isPure bypass`,
  );
  assert.equal(
    js.includes("async _isPure(){return{isPure:!0,proof:[]};const t=this.productService.checksums||{};"),
    true,
    `${label}: t _isPure bypass`,
  );
  const git = JSON.parse(fs.readFileSync(gitFile, "utf8"));
  assert.equal(git["view.workbench.scm.empty"].includes("为了使用 Git 功能"), true, `${label}: git nls`);
  const product = JSON.parse(fs.readFileSync(productFile, "utf8"));
  assert.equal(product.checksums["vs/workbench/workbench.desktop.main.js"], checksum(desktopFile), `${label}: js checksum`);
  assert.equal(
    product.checksums["vs/code/electron-sandbox/workbench/workbench.html"],
    checksum(htmlFile),
    `${label}: html checksum`,
  );
  const translation = readTranslation();
  assert.equal(translation.zhPack, "0.2.1", `${label}: sentinel`);
  assert.equal(translation.contents["cursor-zh-pack/probe"].probe, "探针译文", `${label}: overlay`);
  assert.equal(zh.installationNeedsPatch(), false, `${label}: still needs patch`);
  assert.equal(fs.existsSync(path.join(root, ".cursor", "zh-pack", "guard.ps1")), true, `${label}: persisted guard`);
  assert.equal(fs.existsSync(path.join(root, ".cursor", "zh-pack", "debugger.txt")), false, `${label}: Linux must not write IFEO`);
  assert.equal(fs.existsSync(path.join(process.env.APPDATA, "Cursor", "clp", "cache.zh-cn")), false, `${label}: zh-cn cache cleared`);
  assert.equal(fs.existsSync(path.join(process.env.APPDATA, "Cursor", "clp", "cache.en")), true, `${label}: other locale cache kept`);
}

fs.mkdirSync(path.join(packDir, "translations"), { recursive: true });
fs.writeFileSync(
  translationFile,
  `${JSON.stringify({ contents: { "vs/base/test": { ok: "确定" } } }, null, 2)}\n`,
);
fs.writeFileSync(
  overlayFile,
  `${JSON.stringify({ version: "0.2.1", contents: { "cursor-zh-pack/probe": { probe: "探针译文" } } }, null, 2)}\n`,
);
fs.mkdirSync(path.join(process.env.APPDATA, "Cursor", "clp", "cache.zh-cn"), { recursive: true });
fs.mkdirSync(path.join(process.env.APPDATA, "Cursor", "clp", "cache.en"), { recursive: true });
writeOriginalApp("commit-1", "1.0.0");
process.env.CURSOR_ZH_PACK_APP_ROOT = appRoot;

zh.install(overlayFile);
assertPatched("install");

const htmlAfterInstall = fs.readFileSync(htmlFile);
const jsAfterInstall = fs.readFileSync(desktopFile);
assert.equal(zh.ensureInstalled(overlayFile), false, "second ensure should be a no-op");
assert.deepEqual(fs.readFileSync(htmlFile), htmlAfterInstall, "no-op ensure rewrote HTML");
assert.deepEqual(fs.readFileSync(desktopFile), jsAfterInstall, "no-op ensure rewrote JS");
assert.equal(fs.readFileSync(htmlFile, "utf8").split(marker).length - 1, 1);

writeOriginalApp("commit-2", "2.0.0");
fs.mkdirSync(path.join(process.env.APPDATA, "Cursor", "clp", "cache.zh-cn"), { recursive: true });
assert.equal(zh.installationNeedsPatch(), true, "updated install should need a patch");
assert.equal(zh.ensureInstalled(overlayFile), true, "ensure should reapply after a Cursor update");
assertPatched("cursor update");
assert.equal(JSON.parse(fs.readFileSync(productFile, "utf8")).commit, "commit-2");

fs.writeFileSync(
  translationFile,
  `${JSON.stringify({ contents: { "vs/base/test": { fresh: "新官方" } } }, null, 2)}\n`,
);
assert.equal(zh.installationNeedsPatch(), true, "replaced language pack should need a patch");
assert.equal(zh.ensureInstalled(overlayFile), true, "ensure should reapply after a language-pack update");
assertPatched("language pack");
const merged = readTranslation();
assert.equal(merged.contents["vs/base/test"].fresh, "新官方", "new official strings should be kept");
assert.equal(merged.contents["vs/base/test"].ok, undefined, "stale backup should not replace the new pack");
assert.equal(zh.ensureInstalled(overlayFile), false, "ensure after recovery should be a no-op");

zh.uninstall();
assert.equal(fs.readFileSync(htmlFile, "utf8").includes(marker), false, "uninstall should restore HTML");
assert.equal(fs.readFileSync(desktopFile, "utf8").includes('"Take Screenshot"'), true, "uninstall should restore JS");
assert.equal(readTranslation().zhPack, undefined, "uninstall should restore the official translation");
assert.equal(readTranslation().contents["vs/base/test"].fresh, "新官方");
assert.equal(fs.existsSync(path.join(root, ".cursor", "zh-pack")), false, "uninstall should remove the launch hook files");

const guardPath = path.join(__dirname, "..", "installer", "lib", "guard.ps1");
const guardText = fs.readFileSync(guardPath, "utf8");
assert.equal(/[^\x00-\x7F]/.test(guardText), false, "guard.ps1 must stay ASCII");
const parsed = spawnSync(
  "pwsh",
  [
    "-NoProfile",
    "-Command",
    `$errs = $null; [void][System.Management.Automation.Language.Parser]::ParseFile('${guardPath}', [ref]$null, [ref]$errs); if ($errs) { $errs | ForEach-Object { $_.ToString() }; exit 1 }`,
  ],
  { encoding: "utf8" },
);
assert.equal(parsed.status, 0, parsed.stdout || parsed.stderr || "guard.ps1 failed to parse");

if (process.platform === "win32") {
  console.log("reapply ok (launch-hook process check skipped on Windows)");
  process.exit(0);
}

const guardHome = path.join(root, "guard-home");
const cursorExe = path.join(guardHome, "app with space", "Cursor.exe");
const guardPack = path.join(guardHome, "pack");
const guardLog = path.join(guardHome, "log");
fs.mkdirSync(path.join(guardPack, "lib"), { recursive: true });
fs.mkdirSync(path.dirname(cursorExe), { recursive: true });
fs.copyFileSync(guardPath, path.join(guardPack, "guard.ps1"));
fs.writeFileSync(path.join(guardPack, "debugger.txt"), "hook\n");
fs.writeFileSync(
  cursorExe,
  "#!/bin/sh\nprintf 'node=%s guarding=%s args=%s\\n' \"$ELECTRON_RUN_AS_NODE\" \"$CURSOR_ZH_PACK_GUARDING\" \"$*\" >> \"$GUARD_LOG\"\nexit 0\n",
);
fs.chmodSync(cursorExe, 0o755);
const guardRun = spawnSync(
  "pwsh",
  ["-NoProfile", "-File", path.join(guardPack, "guard.ps1"), path.join(guardHome, "app"), "with", "space/Cursor.exe", "--reuse-window"],
  { encoding: "utf8", env: { ...process.env, GUARD_LOG: guardLog } },
);
assert.equal(guardRun.status, 0, guardRun.stderr || guardRun.stdout || "guard.ps1 failed");
const guardLines = fs.readFileSync(guardLog, "utf8").trim().split(/\n/);
assert.deepEqual(guardLines, [
  `node=1 guarding=1 args=${path.join(guardPack, "lib", "zh-pack.cjs")} ensure`,
  "node= guarding= args=--reuse-window",
]);
fs.rmSync(guardLog, { force: true });
const nodeHook = spawnSync(
  "pwsh",
  [
    "-NoProfile",
    "-File",
    path.join(guardPack, "guard.ps1"),
    path.join(guardHome, "app"),
    "with",
    "space/Cursor.exe",
    path.join(guardPack, "lib", "zh-pack.cjs"),
    "install",
    "--interactive",
  ],
  { encoding: "utf8", env: { ...process.env, GUARD_LOG: guardLog } },
);
assert.equal(nodeHook.status, 0, nodeHook.stderr || nodeHook.stdout || "guard.ps1 node hook failed");
assert.deepEqual(fs.readFileSync(guardLog, "utf8").trim().split(/\n/), [
  `node=1 guarding=1 args=${path.join(guardPack, "lib", "zh-pack.cjs")} install --interactive`,
]);
const missing = spawnSync("pwsh", ["-NoProfile", "-File", path.join(guardPack, "guard.ps1")], {
  encoding: "utf8",
  env: {
    ...process.env,
    LOCALAPPDATA: path.join(guardHome, "empty-local"),
    ProgramFiles: path.join(guardHome, "empty-program"),
    GUARD_LOG: guardLog,
  },
});
assert.equal(missing.status, 1, "guard should fail when Cursor.exe is missing");

console.log(`reapply ok (${root})`);
