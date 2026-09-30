import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, after = 350) {
  const i = glass.indexOf(needle);
  console.log(i < 0 ? `MISS ${needle}` : `\n${needle}\n` + glass.slice(i, i + after));
}

dump("Create Project");
dump("title:\"Create Project\"");
dump("title:\"New Project\"");
dump("Clone a repository");
dump("Open a local");
dump("Add a repository");
dump("Create repository");
dump("GitHub");
dump("children:\"Clone\"");
dump("label:\"Clone\"");
dump("Open Folder");
dump("Select Folder");
dump("Indexing files");
dump("Indexing...");
dump("Not indexed");
dump("Codebase Index");
dump("isGlass?\"Code Intelligence\":\"Indexing\"");
dump("label:\"Indexing\"");
dump("title:\"Indexing\"");
dump("children:\"Ln \"");
dump("[\"Ln \"");
dump("Col ");
dump("Spaces: ");
dump("UTF-8");
dump("CRLF");
dump("LF");
dump("Go to Line");
dump("Problems");
dump("Syncing");
dump("settings.json");
dump("Open User Settings");
dump("Default Profile");
dump("Profiles");
