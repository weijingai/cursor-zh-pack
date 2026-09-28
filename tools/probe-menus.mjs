import "./lib/win-console.mjs";
import fs from "node:fs";

const port = Number(process.argv[2] ?? 9339);
const outFile = process.argv[3] ?? "catalog/menu-probe.json";
const ALLOWED_LATIN =
  /^(Cursor|Agents?|Blame|MCP|Git|GitHub|GitLab|Emmet|JSON|Markdown|IDE|Glass|Composer|Tab|URL|Zen|Origin|AI|CLI|SSH|WSL|VS Code|Chrome|DevTools|CSS|HTML|Jupyter|Notebook|Ctrl|Shift|Alt|F\d+|[A-Z])$/;

const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const page = targets.find((t) => t.type === "page" && / - Cursor/.test(t.title)) ?? targets.find((t) => t.type === "page");

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => ((ws.onopen = resolve), (ws.onerror = reject)));
let nextId = 1;
const pending = new Map();
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (pending.has(msg.id)) pending.get(msg.id)(msg), pending.delete(msg.id);
};
const evaluate = (expression, timeoutMs = 30000) =>
  new Promise((resolve) => {
    const id = nextId++;
    const timer = setTimeout(() => (pending.delete(id), resolve({ error: "timeout" })), timeoutMs);
    pending.set(id, (msg) => {
      clearTimeout(timer);
      resolve(msg.result?.result?.value ?? { error: msg.result?.exceptionDetails ?? msg });
    });
    ws.send(JSON.stringify({ id, method: "Runtime.evaluate", params: { expression, awaitPromise: true, returnByValue: true } }));
  });

const PRELUDE = `
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const text = (el) => (el?.textContent || "").replace(/\\s+/g, " ").trim();
  const menuRoots = () => {
    const bar = document.querySelector(".menubar") || document;
    const hosts = [bar, ...bar.querySelectorAll(".menubar-menu-items-holder, .menubar-menu-button, .menubar-menu-button *")];
    const roots = [document, ...hosts.map((e) => e.shadowRoot).filter(Boolean)];
    return roots.flatMap((root) => [...root.querySelectorAll(".monaco-menu")]);
  };`;

const titles = await evaluate(`(() => [...document.querySelectorAll(".menubar .menubar-menu-button")]
  .map((b) => (b.querySelector(".menubar-menu-title")?.textContent || b.getAttribute("aria-label") || "").trim()))()`);
if (!Array.isArray(titles)) {
  console.log("menubar not readable:", JSON.stringify(titles).slice(0, 300));
  process.exit(1);
}

const menus = [];
for (let index = 0; index < titles.length; index++) {
  const entry = await evaluate(`(async () => {${PRELUDE}
  const itemsOf = (menu) =>
    [...menu.querySelectorAll(":scope .actions-container > .action-item")].map((li) => ({
      li,
      label: text(li.querySelector(".action-label")),
      hasSubmenu: !!li.querySelector(".submenu-indicator"),
    })).filter((i) => i.label);
  const mouse = (el, type) => el.dispatchEvent(new MouseEvent(type, { bubbles: true, button: 0, view: window }));
  const button = document.querySelectorAll(".menubar .menubar-menu-button")[${index}];
  const title = ${JSON.stringify(titles[index])};
  let top = null;
  for (let attempt = 0; attempt < 3 && !top; attempt++) {
    mouse(button, "mousedown");
    mouse(button, "mouseup");
    await sleep(500);
    top = menuRoots().find((m) => itemsOf(m).length);
  }
  const entry = { title, items: [] };
  if (top) {
    for (const item of itemsOf(top)) {
      const node = { label: item.label };
      if (item.hasSubmenu) {
        const before = new Set(menuRoots());
        mouse(item.li.querySelector(".action-menu-item") || item.li, "mouseover");
        await sleep(600);
        const sub = menuRoots().find((m) => !before.has(m) && itemsOf(m).length);
        node.submenu = sub ? itemsOf(sub).map((i) => i.label) : [];
      }
      entry.items.push(node);
    }
  }
  (top?.querySelector(".action-item") || document.body).dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true }));
  await sleep(300);
  return entry;
})()`, 45000);
  console.log(`read ${titles[index]}: ${entry.items?.length ?? entry.error}`);
  menus.push(entry.items ? entry : { title: titles[index], items: [], error: entry.error });
}
const CONTEXT_TARGETS = {
  "右键·编辑器": { selector: ".monaco-editor .view-lines" },
  "右键·资源管理器": { selector: ".explorer-folders-view .monaco-list-row", open: { key: "E", code: "KeyE", keyCode: 69, ctrlKey: true, shiftKey: true } },
  "右键·编辑器标签": { selector: ".tabs-container .tab" },
  "右键·终端": { selector: ".terminal-wrapper .xterm-screen", open: { key: "`", code: "Backquote", keyCode: 192, ctrlKey: true } },
};
for (const [title, { selector, open }] of Object.entries(CONTEXT_TARGETS)) {
  if (open) {
    await evaluate(`(async () => {
      if (document.querySelector(${JSON.stringify(selector)})) return;
      const init = { bubbles: true, cancelable: true, ...${JSON.stringify(open)} };
      (document.activeElement || document.body).dispatchEvent(new KeyboardEvent("keydown", init));
      (document.activeElement || document.body).dispatchEvent(new KeyboardEvent("keyup", init));
      await new Promise((r) => setTimeout(r, 2500));
    })()`);
  }
  const entry = await evaluate(`(async () => {${PRELUDE}
  const allMenus = () => [...document.querySelectorAll("*")].map((e) => e.shadowRoot).filter(Boolean)
    .concat([document]).flatMap((root) => [...root.querySelectorAll(".context-view .monaco-menu, .monaco-menu")]);
  const itemsOf = (menu) =>
    [...menu.querySelectorAll(":scope .actions-container > .action-item")].map((li) => ({
      li,
      label: text(li.querySelector(".action-label")),
      hasSubmenu: !!li.querySelector(".submenu-indicator"),
    })).filter((i) => i.label);
  const target = document.querySelector(${JSON.stringify(selector)});
  if (!target) return { title: ${JSON.stringify(title)}, items: [], error: "target not found" };
  const rect = target.getBoundingClientRect();
  const init = { bubbles: true, cancelable: true, button: 2, buttons: 2, view: window,
    clientX: rect.left + Math.min(40, rect.width / 2), clientY: rect.top + Math.min(10, rect.height / 2) };
  const before = new Set(allMenus());
  target.dispatchEvent(new MouseEvent("mousedown", init));
  target.dispatchEvent(new MouseEvent("contextmenu", init));
  await sleep(700);
  const menu = allMenus().find((m) => !before.has(m) && itemsOf(m).length);
  const entry = { title: ${JSON.stringify(title)}, items: [] };
  if (!menu) entry.error = "no html menu (native or not opened)";
  for (const item of menu ? itemsOf(menu) : []) {
    const node = { label: item.label };
    if (item.hasSubmenu) {
      const seen = new Set(allMenus());
      item.li.querySelector(".action-menu-item")?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, view: window }));
      await sleep(600);
      const sub = allMenus().find((m) => !seen.has(m) && itemsOf(m).length);
      node.submenu = sub ? itemsOf(sub).map((i) => i.label) : [];
    }
    entry.items.push(node);
  }
  (menu?.querySelector(".action-item") || document.body).dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true }));
  await sleep(300);
  return entry;
})()`, 45000);
  console.log(`read ${title}: ${entry.items?.length ?? 0}${entry.error ? ` (${entry.error})` : ""}`);
  menus.push({ title, items: entry.items ?? [], error: entry.error });
}

const result = await evaluate(`({ title: document.title, lang: document.documentElement.lang })`);
result.menus = menus;

ws.close();

fs.writeFileSync(outFile, JSON.stringify(result, null, 2) + "\n");

const english = [];
const isEnglish = (label) =>
  label
    .replace(/\(&?\w\)|\.\.\.|…/g, " ")
    .split(/[^A-Za-z]+/)
    .filter((w) => w.length >= 2 && !ALLOWED_LATIN.test(w)).length > 0 && !/[\u4e00-\u9fff]/.test(label);
let total = 0;
for (const menu of result.menus ?? []) {
  total++;
  if (isEnglish(menu.title)) english.push(`[菜单栏] ${menu.title}`);
  for (const item of menu.items) {
    total++;
    if (isEnglish(item.label)) english.push(`${menu.title} > ${item.label}`);
    for (const sub of item.submenu ?? []) {
      total++;
      if (isEnglish(sub)) english.push(`${menu.title} > ${item.label} > ${sub}`);
    }
  }
}
console.log(`window="${result.title}" lang=${result.lang} menus=${result.menus?.length ?? 0} labels=${total} english=${english.length}`);
for (const line of english) console.log("  EN " + line);
if (result.error) console.log(JSON.stringify(result.error).slice(0, 500));
