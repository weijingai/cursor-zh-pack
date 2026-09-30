import "./lib/win-console.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { sources } = loadCursorNls();
const mods = [
  "vs/workbench/browser/actions/workspaceActions",
  "vs/workbench/contrib/files/browser/fileActions.contribution",
  "vs/workbench/contrib/files/browser/files.contribution",
  "vs/workbench/browser/actions/editActions",
  "vs/editor/contrib/clipboard/browser/clipboard",
  "vs/workbench/browser/parts/editor/editorActions",
];
for (const [moduleId, map] of Object.entries(sources)) {
  if (!/fileActions|files\.contribution|workspaceActions|quickaccess|save|menubar/i.test(moduleId)) continue;
  console.log(`\n==== ${moduleId} ====`);
  for (const [k, v] of Object.entries(map)) {
    if (/mi|&&|New File|Open|Save|Close|Folder|Workspace|Clone|Exit|Quit/i.test(k + v)) {
      console.log(`  ${k}: ${JSON.stringify(v)}`);
    }
  }
}
