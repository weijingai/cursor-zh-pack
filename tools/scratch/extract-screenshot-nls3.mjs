import "./lib/win-console.mjs";
import { loadCursorNls } from "./lib/nls.mjs";

const { entries } = loadCursorNls();
for (const e of entries) {
  if (
    /clone a repository locally|learn more about how to use Git|read our docs|You can clone|Allowed UNC Hosts|Restrict UNC Access|Trusted Banner|Local File Protocol|Remote File Protocol/i.test(
      e.source,
    )
  ) {
    console.log(`${e.moduleId}#${e.key}: ${JSON.stringify(e.source)}`);
  }
}
