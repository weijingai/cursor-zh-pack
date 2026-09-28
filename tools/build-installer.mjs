import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const coverage = JSON.parse(fs.readFileSync("catalog/coverage.json", "utf8"));
const name = `cursor-zh-pack-v${pkg.version}`;
const outDir = path.join("dist", name);
const zipPath = path.join("dist", `${name}.zip`);

fs.mkdirSync(outDir, { recursive: true });
for (const entry of fs.readdirSync(outDir)) fs.rmSync(path.join(outDir, entry), { recursive: true, force: true });
fs.rmSync(zipPath, { force: true });
fs.mkdirSync(path.join(outDir, "lib"), { recursive: true });
fs.mkdirSync(path.join(outDir, "payload"), { recursive: true });

const toCrlf = (text) => text.replace(/\r?\n/g, "\r\n");
const copyCmd = (from, to) => {
  const text = toCrlf(fs.readFileSync(from, "utf8").replace(/^\uFEFF/, ""));
  if (/[^\x00-\x7F]/.test(text)) throw new Error(`CMD file must be ASCII-only to avoid GBK mojibake: ${from}`);
  fs.writeFileSync(to, text, "ascii");
};

copyCmd("installer/install.cmd", path.join(outDir, "install.cmd"));
copyCmd("installer/uninstall.cmd", path.join(outDir, "uninstall.cmd"));
copyCmd("installer/restart.cmd", path.join(outDir, "restart.cmd"));
copyCmd("installer/lib/find-cursor.cmd", path.join(outDir, "lib", "find-cursor.cmd"));
copyCmd("installer/lib/run-zh-pack.cmd", path.join(outDir, "lib", "run-zh-pack.cmd"));
fs.copyFileSync("installer/lib/zh-pack.cjs", path.join(outDir, "lib", "zh-pack.cjs"));
fs.copyFileSync("installer/lib/win-console.cjs", path.join(outDir, "lib", "win-console.cjs"));
fs.copyFileSync("installer/lib/patch-hardcoded.cjs", path.join(outDir, "lib", "patch-hardcoded.cjs"));
fs.copyFileSync("installer/lib/cursor-zh-ui.js", path.join(outDir, "lib", "cursor-zh-ui.js"));
fs.copyFileSync("translations/main.i18n.json", path.join(outDir, "payload", "cursor-overlay.i18n.json"));
fs.copyFileSync("payload/hardcoded-zh.json", path.join(outDir, "payload", "hardcoded-zh.json"));
fs.copyFileSync("payload/hardcoded-ui.json", path.join(outDir, "payload", "hardcoded-ui.json"));
fs.copyFileSync("payload/hardcoded-context.json", path.join(outDir, "payload", "hardcoded-context.json"));
fs.copyFileSync("payload/cursor-zh-ui.js", path.join(outDir, "payload", "cursor-zh-ui.js"));

const readme = fs
  .readFileSync("installer/README.txt", "utf8")
  .replaceAll("{version}", pkg.version)
  .replaceAll("{count}", String(coverage.translated));
const readmeOut = path.join(outDir, "使用说明.txt");
const psQuote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const gbk = spawnSync(
  "powershell",
  [
    "-NoProfile",
    "-Command",
    `$t = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${psQuote(Buffer.from(toCrlf(readme), "utf8").toString("base64"))})); [IO.File]::WriteAllText(${psQuote(path.resolve(readmeOut))}, $t, [Text.Encoding]::GetEncoding(936))`,
  ],
  { encoding: "utf8" },
);
if (gbk.status !== 0) {
  process.stderr.write(gbk.stderr || gbk.stdout || "failed to write GBK readme\n");
  fs.writeFileSync(readmeOut, "\uFEFF" + toCrlf(readme), "utf8");
}

const zip = spawnSync(
  "powershell",
  ["-NoProfile", "-Command", `Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPath}' -Force`],
  { stdio: "inherit" },
);
if (zip.status !== 0) process.exit(zip.status ?? 1);

console.log(`built ${zipPath} (${(fs.statSync(zipPath).size / 1024).toFixed(1)} KB, ${coverage.translated} strings)`);
