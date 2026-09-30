import "./lib/win-console.mjs";
import fs from "node:fs";
import { loadCursorNls } from "./lib/nls.mjs";

const desktop = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
for (const n of [
  "clone a repository locally",
  "clone a repository",
  "learn more about how to use Git",
  "read our docs",
  "source control in VS Code",
]) {
  const i = desktop.indexOf(n);
  console.log(n, i < 0 ? "MISS" : desktop.slice(Math.max(0, i - 80), i + 200));
}

const { sources } = loadCursorNls();
for (const [moduleId, map] of Object.entries(sources)) {
  for (const [k, v] of Object.entries(map)) {
    if (/^m(File|Edit|Selection|View|Go|Run|Terminal|Help)$/.test(k)) {
      console.log(`${moduleId}#${k}: ${JSON.stringify(v)}`);
    }
  }
}
