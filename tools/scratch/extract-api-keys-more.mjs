import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(needle, before = 80, after = 500) {
  const i = glass.indexOf(needle);
  if (i < 0) {
    console.log("MISS", needle);
    return;
  }
  console.log(`\n==== ${needle} ====`);
  console.log(glass.slice(Math.max(0, i - before), i + after));
}

dump("You can put in");
dump("title:\"OpenAI API Key\"");
dump("\"OpenAI API Key\"");
dump("apiName:\"OpenAI\"");
dump("apiName:\"Anthropic\"");
dump("apiName:\"Google\"");
dump("title:\"AWS Bedrock\"");
dump("Use AWS Bedrock");
dump("tQv=\"Search Settings\"");
dump("Choose Custom Sound");
dump("Help improve Cursor for everyone");
dump("Improve Cursor for everyone");
dump("title:\"Data Sharing\"");
dump("label:\"Share Data\"");
dump("label:\"Log Out\"");
dump("m8r=\"Copy Request ID\"");
dump("rbo=\"Copy Request ID\"");
dump("No request ID found");
dump("Request ID copied");
dump("Configure Icon Visibility");
dump("Icon visibility");
dump("icon visibility");
dump("hide icons");
dump("Show Icons");
dump("titlebar icon");
dump("Visibility of");
dump("workbench.activityBar");
