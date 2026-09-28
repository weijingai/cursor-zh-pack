import "./lib/win-console.mjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const port = Number(process.argv[2] ?? 9448);
const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const page = targets.find((t) => t.type === "page" && / - Cursor/.test(t.title));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => ((ws.onopen = resolve), (ws.onerror = reject)));
let nextId = 1;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (pending.has(msg.id)) pending.get(msg.id)(msg), pending.delete(msg.id);
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = nextId++;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const snap = async (name) => {
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const file = path.join(os.tmpdir(), `zhpack-${name}.png`);
  fs.writeFileSync(file, Buffer.from(shot.result.data, "base64"));
  console.log(file);
};
const escape = () =>
  evaluate(`(async () => {
    for (const el of [document.activeElement, document.body])
      el?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true }));
    await new Promise((r) => setTimeout(r, 400));
  })()`);

await evaluate(`(async () => {
  const b = document.querySelectorAll(".menubar .menubar-menu-button")[0];
  for (const t of ["mousedown", "mouseup"]) b.dispatchEvent(new MouseEvent(t, { bubbles: true, button: 0, view: window }));
  await new Promise((r) => setTimeout(r, 800));
})()`);
await snap("file-menu");
await escape();

const explorer = await evaluate(`(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  if (!document.querySelector(".explorer-folders-view .monaco-list-row")) {
    const header = [...document.querySelectorAll(".pane-header")].find((h) => /cursor-zh-pack/i.test(h.textContent || ""));
    if (!header) return "explorer header not found";
    header.click();
    await sleep(1500);
  }
  const row = document.querySelector(".explorer-folders-view .monaco-list-row");
  if (!row) return "explorer rows not found";
  const r = row.getBoundingClientRect();
  const init = { bubbles: true, cancelable: true, button: 2, buttons: 2, view: window, clientX: r.left + 30, clientY: r.top + 8 };
  row.dispatchEvent(new MouseEvent("mousedown", init));
  row.dispatchEvent(new MouseEvent("contextmenu", init));
  await sleep(900);
  return "opened";
})()`);
console.log("explorer:", explorer);
await snap("explorer-context");
await escape();
ws.close();
