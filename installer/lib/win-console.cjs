"use strict";

function setupWindowsConsole() {
  if (process.platform !== "win32") return;
  try {
    if (typeof process.stdout.setDefaultEncoding === "function") process.stdout.setDefaultEncoding("utf8");
    if (typeof process.stderr.setDefaultEncoding === "function") process.stderr.setDefaultEncoding("utf8");
  } catch {
    /* ignore */
  }
}

setupWindowsConsole();

module.exports = { setupWindowsConsole };
