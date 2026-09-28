import "./lib/win-console.mjs";
import fs from "node:fs";
import { TypeSafeClient, choice } from "@typesafe-ai/sdk";
import { loadCursorNls, loadOfficialPack } from "./lib/nls.mjs";
import { samePlaceholders } from "./lib/review-policy.mjs";

const OUT = "translations/zh-cn/recovered.json";
const MODULE_ALIASES = [
  [/\/electron-sandbox\//, "/electron-browser/"],
  [/\/electron-browser\//, "/electron-sandbox/"],
];

const { entries } = loadCursorNls();
const pack = loadOfficialPack();

const modulesByBasename = new Map();
for (const moduleId of Object.keys(pack)) {
  const base = moduleId.split("/").pop();
  if (!modulesByBasename.has(base)) modulesByBasename.set(base, []);
  modulesByBasename.get(base).push(moduleId);
}

function aliasModules(moduleId) {
  const out = [];
  for (const [pattern, replacement] of MODULE_ALIASES) {
    if (pattern.test(moduleId)) out.push(moduleId.replace(pattern, replacement));
  }
  out.push(...(modulesByBasename.get(moduleId.split("/").pop()) ?? []));
  return [...new Set(out)].filter((m) => m !== moduleId);
}

const memory = new Map();
for (const e of entries) {
  const zh = pack[e.moduleId]?.[e.key];
  if (!zh) continue;
  if (!memory.has(e.source)) memory.set(e.source, new Map());
  const bucket = memory.get(e.source);
  bucket.set(zh, (bucket.get(zh) ?? 0) + 1);
}

const recovered = {};
const ambiguous = [];
const counts = { alias: 0, memory: 0, choice: 0, choiceUncertain: 0 };
const put = (e, zh) => ((recovered[e.moduleId] ??= {})[e.key] = zh);

for (const e of entries) {
  if (pack[e.moduleId]?.[e.key]) continue;
  const aliasHit = aliasModules(e.moduleId).find(
    (m) => typeof pack[m]?.[e.key] === "string" && samePlaceholders(e.source, pack[m][e.key]),
  );
  if (aliasHit) {
    put(e, pack[aliasHit][e.key]);
    counts.alias++;
    continue;
  }
  const candidates = [...(memory.get(e.source)?.keys() ?? [])].filter((zh) => samePlaceholders(e.source, zh));
  if (candidates.length === 1) {
    put(e, candidates[0]);
    counts.memory++;
  } else if (candidates.length > 1) {
    ambiguous.push({ ...e, candidates });
  }
}

if (ambiguous.length) {
  const client = new TypeSafeClient();
  for (const e of ambiguous) {
    const options = Object.fromEntries(e.candidates.map((zh, i) => [`option_${i}`, zh]));
    const response = await client.systemOne({
      state: { module: e.moduleId, key: e.key, source: e.source },
      questions: {
        best: choice(
          {
            question:
              "Which Simplified Chinese rendering fits the English `source` UI string best, given where it appears " +
              "(`module` and `key`)?",
            note: "Each option is an official translation of the same English text used elsewhere in the editor.",
          },
          options,
        ),
      },
    });
    const answer = response.answers.best;
    put(e, options[answer.choice]);
    counts.choice++;
    if (answer.confidence < 0.5) {
      counts.choiceUncertain++;
      console.log(`uncertain (${answer.confidence.toFixed(2)}) ${e.moduleId}#${e.key}: ${JSON.stringify(e.source)} -> ${options[answer.choice]}`);
    }
  }
}

fs.writeFileSync(OUT, JSON.stringify(recovered, null, 2) + "\n");
console.log(JSON.stringify(counts));
