import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const keepTools = new Set([
  "assemble.mjs",
  "sync-hardcoded.mjs",
  "build-installer.mjs",
  "build-language-pack.mjs",
  "extract-cursor-modules.mjs",
  "extract-cursor-strings.mjs",
  "extract-settings-agents.mjs",
  "recover-official.mjs",
  "review.mjs",
  "verify-nls.cjs",
  "verify-checksums.mjs",
  "verify-settings-agents.mjs",
  "coverage-gaps.cjs",
  "find-nls.cjs",
  "scan-hardcoded.mjs",
  "probe-menus.mjs",
  "snap-menus.mjs",
  "organize-public-repo.mjs",
]);

const keepCatalog = new Set([
  "coverage.json",
  "cursor-modules.json",
  "review.json",
  "cursor-hint-strings.json",
  "gaps.json",
  "menubar-overlay.json",
]);

function moveDir(fromDir, toDir, keep) {
  fs.mkdirSync(toDir, { recursive: true });
  let moved = 0;
  for (const name of fs.readdirSync(fromDir)) {
    const from = path.join(fromDir, name);
    if (!fs.statSync(from).isFile()) continue;
    if (keep.has(name)) continue;
    fs.renameSync(from, path.join(toDir, name));
    moved += 1;
  }
  return moved;
}

const toolsMoved = moveDir("tools", "tools/scratch", keepTools);
const catalogMoved = moveDir("catalog", "catalog/scratch", keepCatalog);
console.log(`moved tools=${toolsMoved} catalog=${catalogMoved}`);
