import "./lib/win-console.mjs";
import fs from "node:fs";
import { parseArgs } from "node:util";
import { TypeSafeClient, noul, score } from "@typesafe-ai/sdk";
import {
  decide,
  extractPlaceholders,
  hasRoleBearingTokens,
  isVerbatimProductName,
  samePlaceholders,
} from "./lib/review-policy.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { values: args } = parseArgs({
  options: {
    limit: { type: "string" },
    module: { type: "string" },
    concurrency: { type: "string", default: "4" },
    force: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const REVIEW_PATH = "catalog/review.json";
const overlay = JSON.parse(fs.readFileSync("translations/zh-cn/overlay.json", "utf8"));
const glossary = JSON.parse(fs.readFileSync("glossary/zh-cn.json", "utf8"));
const previous = fs.existsSync(REVIEW_PATH)
  ? JSON.parse(fs.readFileSync(REVIEW_PATH, "utf8")).items
  : {};

const terms = { ...glossary.product, ...glossary.ui };

const termsLongestFirst = Object.entries(terms).sort(([a], [b]) => b.length - a.length);

function relevantTerms(source) {
  const found = {};
  let remaining = source;
  for (const [english, chinese] of termsLongestFirst) {
    const pattern = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    if (!pattern.test(remaining)) continue;
    found[english] = chinese;
    remaining = remaining.replace(pattern, " ");
  }
  return found;
}

function buildQuestions({ hasGlossaryTerms, hasTokens }) {
  const questions = {
    quality: score(
      {
        question:
          "How good is `translation` as the Simplified Chinese version of the English `source` UI string?",
        context:
          "`module` and `key` show where the string appears in the Cursor editor. Short labels should stay short; " +
          "descriptions of context keys and settings are read by developers.",
        conventions:
          "Text that `policy` or `glossary` keeps in Latin letters (product names such as Cursor Blame, " +
          "URLs, domains, placeholders) is correct as written and is not untranslated text.",
      },
      [
        "The Chinese changes or loses the meaning of the English source, or is unreadable.",
        "The main meaning survives, but there is a clear error, omission, or wording a Chinese user would stumble on.",
        "The meaning is accurate and understandable, with minor issues such as slightly unnatural phrasing.",
        "Accurate, complete, and natural Simplified Chinese that reads like professional software UI text.",
      ],
    ),
  };
  if (hasTokens) {
    questions.placeholders_ok = noul(
      {
        question:
          "Does each token listed in `tokens` refer to the same value and play the same role in `translation` " +
          "as it does in `source`?",
        note:
          "Code has already verified that every token appears exactly in both strings. Tokens may move to fit " +
          "Chinese word order; judge only whether each one still means the same thing, for example {0} is still " +
          "the count and {1} is still the path.",
      },
      {
        true: "Every token keeps its meaning and role.",
        false: "At least one token now refers to a different value, or two tokens have swapped roles.",
      },
    );
  }
  if (hasGlossaryTerms) {
    questions.glossary_ok = noul(
      "For each English term listed in `glossary` that appears in `source`, does `translation` render it " +
        "as the Chinese given in `glossary` (product names kept in Latin letters where the glossary says so)?",
      {
        true: "Every applicable glossary term uses the prescribed rendering.",
        false: "At least one applicable term uses a different rendering than `glossary` prescribes.",
      },
    );
  }
  return questions;
}

const { sources } = loadCursorNls();
const work = [];
for (const [moduleId, strings] of Object.entries(overlay)) {
  if (args.module && !moduleId.includes(args.module)) continue;
  for (const [key, translation] of Object.entries(strings)) {
    const source = sources[moduleId]?.[key];
    if (source === undefined || typeof translation !== "string" || !translation) continue;
    work.push({ id: `${moduleId}#${key}`, moduleId, key, source, translation });
  }
}
const selected = args.limit ? work.slice(0, Number(args.limit)) : work;

function requestFor(item) {
  const glossaryTerms = relevantTerms(item.source);
  const hasGlossaryTerms = Object.keys(glossaryTerms).length > 0;
  const hasTokens = hasRoleBearingTokens(item.source);
  return {
    hasGlossaryTerms,
    hasTokens,
    request: {
      state: {
        module: item.moduleId,
        key: item.key,
        source: item.source,
        translation: item.translation,
        ...(hasTokens ? { tokens: [...new Set(extractPlaceholders(item.source))] } : {}),
        ...(hasGlossaryTerms ? { glossary: glossaryTerms } : {}),
        policy: glossary.policy,
      },
      questions: buildQuestions({ hasGlossaryTerms, hasTokens }),
    },
  };
}

if (args["dry-run"]) {
  const sample = selected[0];
  console.log(sample ? JSON.stringify(requestFor(sample).request, null, 2) : "no entries selected");
  process.exit(0);
}

const client = new TypeSafeClient();
const items = {};
const usage = { input_tokens: 0, output_tokens: 0 };
let reused = 0;
let failed = 0;

async function reviewOne(item) {
  const prior = previous[item.id];
  if (!args.force && prior && prior.source === item.source && prior.translation === item.translation && prior.decision !== "error") {
    items[item.id] = prior;
    reused += 1;
    return;
  }

  const deterministic = { placeholdersOk: samePlaceholders(item.source, item.translation) };
  const base = { source: item.source, translation: item.translation, deterministic };
  if (!deterministic.placeholdersOk) {
    items[item.id] = { ...base, decision: "reject", answers: null };
    return;
  }
  if (isVerbatimProductName(item.source, item.translation, glossary.product)) {
    items[item.id] = { ...base, deterministic: { ...deterministic, productName: true }, decision: "accept", answers: null };
    return;
  }

  const { hasGlossaryTerms, hasTokens, request } = requestFor(item);
  try {
    const response = await client.systemOne(request);
    usage.input_tokens += response.usage?.input_tokens ?? 0;
    usage.output_tokens += response.usage?.output_tokens ?? 0;
    const answers = {
      placeholders_ok: hasTokens ? { noul: response.answers.placeholders_ok.noul } : null,
      glossary_ok: hasGlossaryTerms ? { noul: response.answers.glossary_ok.noul } : null,
      quality: {
        score: response.answers.quality.score,
        confidence: response.answers.quality.confidence,
      },
    };
    const decision = decide(
      {
        ...answers,
        placeholders_ok: answers.placeholders_ok ?? { noul: 1 },
        glossary_ok: answers.glossary_ok ?? { noul: 1 },
      },
      deterministic,
    );
    items[item.id] = { ...base, decision, model: response.model, answers };
  } catch (error) {
    failed += 1;
    items[item.id] = { ...base, decision: "error", error: String(error?.message ?? error) };
  }
}

const queue = [...selected];
const workers = Array.from({ length: Math.max(1, Number(args.concurrency)) }, async () => {
  while (queue.length) await reviewOne(queue.shift());
});
await Promise.all(workers);

const merged = { ...previous, ...items };
const counts = {};
for (const entry of Object.values(merged)) counts[entry.decision] = (counts[entry.decision] ?? 0) + 1;

fs.writeFileSync(
  REVIEW_PATH,
  JSON.stringify({ reviewedAt: new Date().toISOString(), counts, items: merged }, null, 2) + "\n",
);

console.log(
  `reviewed=${selected.length} reused=${reused} errors=${failed} ` +
    `tokens_in=${usage.input_tokens} tokens_out=${usage.output_tokens}`,
);
console.log(JSON.stringify(counts));
for (const [id, entry] of Object.entries(items)) {
  if (entry.decision === "accept") continue;
  const quality = entry.answers?.quality?.score?.toFixed(2) ?? "-";
  console.log(`${entry.decision.padEnd(12)} q=${quality} ${id}\n  ${entry.source}\n  ${entry.translation}`);
  if (entry.error) console.log(`  error: ${entry.error}`);
}
if (failed) process.exitCode = 1;
