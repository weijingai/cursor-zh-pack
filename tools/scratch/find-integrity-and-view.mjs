import "./lib/win-console.mjs";
import fs from "node:fs";
import path from "node:path";

const appOut = "C:/Program Files/Cursor/resources/app/out";
const keys = JSON.parse(fs.readFileSync(path.join(appOut, "nls.keys.json"), "utf8"));
const messages = JSON.parse(fs.readFileSync(path.join(appOut, "nls.messages.json"), "utf8"));
let index = 0;
const hits = [];
for (const [moduleId, moduleKeys] of keys) {
  for (const key of moduleKeys) {
    const source = messages[index++];
    if (typeof source === "string" && /corrupt|reinstall|integrity/i.test(source)) {
      hits.push({ moduleId, key, source, index: index - 1 });
    }
  }
}
console.log("NLS integrity");
console.log(JSON.stringify(hits, null, 2));

const orig = path.join(appOut, "vs/workbench/workbench.desktop.main.js.zhpack-orig");
const text = fs.readFileSync(fs.existsSync(orig) ? orig : orig.replace(".zhpack-orig", ""), "utf8");
for (const needle of ["appears corrupt", "reinstall", "integrityService", "Checksums", "checksumService"]) {
  let from = 0;
  let n = 0;
  while ((from = text.indexOf(needle, from)) !== -1 && n < 3) {
    console.log("\nJS", needle, text.slice(from, from + 220).replace(/\s+/g, " "));
    from += needle.length;
    n += 1;
  }
}

const viewIdx = [];
let i = 0;
while ((i = text.indexOf("MenubarViewMenu", i)) !== -1 && viewIdx.length < 30) {
  viewIdx.push(i);
  i += 10;
}
const snippets = viewIdx.map((pos) => text.slice(Math.max(0, pos - 180), pos + 80));
fs.writeFileSync("catalog/view-menu-snips.json", JSON.stringify(snippets, null, 2) + "\n");
console.log("\nview snips", snippets.length);
for (const s of snippets.slice(0, 15)) console.log("---", s.replace(/\s+/g, " ").slice(0, 240));
