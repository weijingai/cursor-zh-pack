import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 80, after = 900) {
  let from = 0;
  let n = 0;
  while (n < 3) {
    const i = glass.indexOf(needle, from);
    if (i < 0) {
      if (!n) console.log("MISS", needle);
      return;
    }
    console.log(`\n==== ${needle} #${n} ====`);
    console.log(glass.slice(Math.max(0, i - before), i + after));
    from = i + needle.length;
    n += 1;
  }
}

const needles = [
  "children:\"API Keys\"",
  "label:\"OpenAI API Key\"",
  "label:\"OpenAI API key\"",
  "label:\"Anthropic API Key\"",
  "label:\"API Key\"",
  "label:\"Base URL\"",
  "label:\"Deployment Name\"",
  "label:\"AWS Bedrock\"",
  "label:\"Azure OpenAI\"",
  "your OpenAI key",
  "your Anthropic key",
  "your Google AI Studio key",
  "Configure Azure OpenAI",
  "Configure AWS Bedrock",
  "e.g. my-resource.openai",
  "e.g. gpt-35-turbo",
  "Search Settings",
  "Completion Sound",
  "Data Sharing",
  "Help improve Cursor",
  "Improve Cursor for everyone",
  "Share Data",
  "Log Out",
  "Copy Request ID",
  "Icon Visibility",
  "Configure Icon",
  "visibility",
  "children:\"Add\"",
  "label:\"Add\"",
  "children:\"Open\"",
  "label:\"Open\"",
  "children:\"Documentation\"",
  "title:\"Documentation\"",
  "title:\"Open\"",
  "Worktrees",
  "label:\"Worktree\"",
  "children:\"Worktree\"",
];

for (const needle of needles) dump(needle, 50, 420);
