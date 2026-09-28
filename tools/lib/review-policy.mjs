const TOKEN_PATTERN =
  /\{\d+\}|&&|#([^#\s]+)#|`[^`]+`|https?:\/\/[^\s)）]+|\b[a-z0-9-]+\.(?:com|dev|io|ai)\b/gi;

export function extractPlaceholders(text) {
  const found = String(text).match(TOKEN_PATTERN) ?? [];
  return [...found].sort();
}

export function samePlaceholders(source, translation) {
  const a = extractPlaceholders(source);
  const b = extractPlaceholders(translation);
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

export function hasRoleBearingTokens(source) {
  return /\{\d+\}|#[^#\s]+#|`[^`]+`/.test(String(source));
}

export function isVerbatimProductName(source, translation, productTerms) {
  if (source !== translation) return false;
  const name = source.replace(/\{\d+\}/g, "").trim();
  return Object.entries(productTerms).some(([english, chinese]) => english === name && chinese === name);
}

export function decide(answers, deterministic) {
  if (!deterministic.placeholdersOk) return "reject";
  if (answers.placeholders_ok.noul < 0.3) return "reject";
  if (answers.quality.score < 1.2) return "human_review";
  if (answers.quality.score >= 2.15 && answers.placeholders_ok.noul >= 0.85 && answers.glossary_ok.noul >= 0.7) {
    return "accept";
  }
  return "human_review";
}
