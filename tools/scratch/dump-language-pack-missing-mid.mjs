import "./lib/win-console.mjs";
import fs from "node:fs";

const missing = JSON.parse(fs.readFileSync("catalog/language-pack-missing.json", "utf8"));
const unique = [...new Set(missing.map((item) => item.source))].sort((a, b) => a.length - b.length);
const mid = unique.filter((s) => s.length >= 6 && s.length <= 60);
console.log("unique missing", unique.length, "mid", mid.length);
for (const s of mid.slice(0, 120)) console.log(s);
