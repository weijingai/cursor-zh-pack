import "./lib/win-console.mjs";
import fs from "node:fs";

const text = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.desktop.main.js.zhpack-orig",
  "utf8",
);
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js.zhpack-orig",
  "utf8",
);

function dump(name, src, needle, extra = 200) {
  const i = src.indexOf(needle);
  console.log("\n[" + name + "]", i < 0 ? "MISS" : src.slice(i, i + extra).replace(/\s+/g, " "));
}

dump("dontAsk label", text, "Don't Ask Again Dialog");
dump("dontAsk desc", text, "warnings and tips");
dump("dontAsk reset", text, "Reset");
dump("startup label", text, 'label:"Startup"');
dump("startup desc", text, "Control which windows");
dump("startup auto", text, "auto-open");
dump("openAgents", text, "Open Agents Window on Startup");
dump("share1", text, "Your prompts, edits and other usage data");
dump("share2", text, "Your codebase, prompts, edits and other usage data");
dump("share3", text, "Prompts and limited telemetry");
dump("config", text, ">Configurable");
dump("config2", text, '"Configurable"');
dump("tray1", text, "Show Cursor in system tray");
dump("tray2", text, "Show Cursor in the system tray");
dump("sound", text, "Play a sound when Agent finishes");
dump("chat tabs", text, "inside the chat area instead of the legacy");
dump("layout", text, "Switch between Agent and Editor");
dump("status", text, "Show status bar at the bottom");
dump("review", text, "Show inline diff review controls");
dump("hide empty", text, "When all editors are closed");
dump("density", text, "Choose how much detail Agent tool calls");
dump("sysnotif", text, "Show system notifications when Agent completes");

dump("continue", glass, "Continue Working");
dump("follow", glass, "Send follow-up");
dump("follow2", glass, "Send follow-up");
dump("follow3", glass, "follow-up");
dump("sendFollow", glass, "Send follow");
dump("placeholder", glass, "Send a follow");
dump("dontAskG", glass, "Don't Ask Again Dialog");
dump("warningsG", glass, "warnings and tips");
dump("startupG", glass, 'label:"Startup"');
dump("configG", glass, '"Configurable"');
dump("configG2", glass, "Configurable");
