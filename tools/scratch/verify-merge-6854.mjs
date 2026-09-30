import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const desktopOrig = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const desktopNow = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js",
  "utf8",
);
const glassOrig = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);
const glassNow = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);

function countHits(orig, now, pairs, contexts) {
  let mapHits = 0;
  let mapKeys = 0;
  let contextHits = 0;
  let contextKeys = 0;
  const missing = [];
  for (const [en, zh] of pairs) {
    const from = JSON.stringify(en);
    const to = JSON.stringify(zh);
    const inOrig = orig.split(from).length - 1;
    if (!inOrig) continue;
    mapKeys += 1;
    const inNowEn = now.split(from).length - 1;
    const inNowZh = now.split(to).length - 1;
    mapHits += inOrig;
    if (inNowEn > 0 && en !== zh) missing.push({ en, left: inNowEn, expected: inOrig, zhHits: inNowZh });
  }
  for (const [from, to] of contexts) {
    const inOrig = orig.split(from).length - 1;
    if (!inOrig) continue;
    contextKeys += 1;
    contextHits += inOrig;
    if (now.includes(from) && from !== to) missing.push({ en: from.slice(0, 60), left: 1, expected: inOrig, zhHits: now.includes(to) ? 1 : 0 });
  }
  return { mapHits, mapKeys, contextHits, contextKeys, missing };
}

const pairs = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
const d = countHits(desktopOrig, desktopNow, pairs, contexts);
const g = countHits(glassOrig, glassNow, pairs, contexts);

const era6854 = [
  "批准此服务器",
  "批准此工具",
  "启用 LSP",
  "GitHub 令牌",
  "HTTP 标头",
  "打开规则",
  "读取 MCP 资源",
  "自动化名称",
  "客户端 ID",
  "还没有自动化",
  "新建自动化",
  "来自 Cursor",
  "开始使用",
  "全部运行记录",
  "无仓库",
  "新建项目",
  "全局禁用",
  "暂停 Tab",
  "钩子",
  "浏览市场",
];
const later = [
  "尚未打开文件夹。",
  "允许的 UNC 主机",
  "适用于所有配置文件",
  "选择(&&S)",
  "转到(&&G)",
  "新建窗口",
  "打开最近的文件",
];

console.log(
  JSON.stringify(
    {
      mapSize: Object.keys(map).length,
      contexts: contexts.length,
      desktop: { mapHits: d.mapHits, mapKeys: d.mapKeys, contextHits: d.contextHits, leftovers: d.missing.length },
      glass: { mapHits: g.mapHits, mapKeys: g.mapKeys, contextHits: g.contextHits, leftovers: g.missing.length },
      combinedHits: d.mapHits + d.contextHits + g.mapHits + g.contextHits,
      leftoverSamples: [...d.missing, ...g.missing].slice(0, 15),
    },
    null,
    2,
  ),
);

console.log("\n==== 6854 批次关键译文 ====");
for (const zh of era6854) {
  const ok = desktopNow.includes(zh) || glassNow.includes(zh);
  console.log(ok ? "HIT" : "MISS", zh);
}
console.log("\n==== 6854 之后新增 ====");
for (const zh of later) {
  const ok = desktopNow.includes(zh) || glassNow.includes(zh);
  console.log(ok ? "HIT" : "MISS", zh);
}
