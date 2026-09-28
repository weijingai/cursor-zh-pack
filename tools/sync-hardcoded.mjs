import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const prefixes = [
  ["Search settings ", "搜索设置 "],
  ["Cursor Settings: ", "Cursor 设置："],
  ["Search Cursor settings", "搜索 Cursor 设置"],
];
const shorts = {
  General: "常规",
  Profile: "个人资料",
  Appearance: "外观",
  Fun: "趣味",
  Agents: "Agent",
  Models: "模型",
  Plugins: "插件",
  Customize: "自定义",
  Indexing: "索引",
  Network: "网络",
  Developer: "开发人员",
  Beta: "测试版",
  Hooks: "Hooks",
  Worktrees: "Worktree",
  Settings: "设置",
};

const pairs = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
fs.writeFileSync("payload/hardcoded-ui.json", JSON.stringify(pairs, null, 2) + "\n");

const js = `"use strict";

(() => {
  const MAP = ${JSON.stringify(map, null, 2)};
  const PREFIXES = ${JSON.stringify(prefixes)};
  const SHORT = ${JSON.stringify(shorts)};
  const SKIP = /(^| )(view-lines|monaco-editor|xterm|native-edit-context|overflow-guard|minimap)( |$)/;
  const SETTINGS = /settings|Settings|aiSettings|preferences|plan-usage|mcp/i;
  const ATTRS = ["aria-label", "title", "placeholder", "data-label", "alt", "aria-description"];

  function skip(node) {
    for (let el = node.nodeType === 3 ? node.parentElement : node; el; el = el.parentElement) {
      const cls = typeof el.className === "string" ? el.className : "";
      if (SKIP.test(cls)) return true;
      if (el.tagName === "TEXTAREA" && /inputarea|monaco/.test(cls)) return true;
    }
    return false;
  }

  function inSettings(node) {
    for (let el = node.nodeType === 3 ? node.parentElement : node; el; el = el.parentElement) {
      const cls = typeof el.className === "string" ? el.className : "";
      const id = typeof el.id === "string" ? el.id : "";
      if (SETTINGS.test(cls) || SETTINGS.test(id)) return true;
    }
    return false;
  }

  function translate(value, allowShort) {
    if (!value) return value;
    const lead = value.match(/^\\s*/)[0];
    const trail = value.match(/\\s*$/)[0];
    const trimmed = value.trim();
    if (MAP[trimmed]) return lead + MAP[trimmed] + trail;
    for (const [english, chinese] of PREFIXES) {
      if (trimmed.startsWith(english)) return lead + chinese + trimmed.slice(english.length) + trail;
    }
    if (allowShort && SHORT[trimmed]) return lead + SHORT[trimmed] + trail;
    return value;
  }

  function patchNode(node) {
    if (skip(node)) return;
    const allowShort = inSettings(node);
    if (node.nodeType === 3) {
      const next = translate(node.nodeValue, allowShort);
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== 1) return;
    for (const name of ATTRS) {
      const current = node.getAttribute?.(name);
      if (!current) continue;
      const next = translate(current, allowShort);
      if (next !== current) node.setAttribute(name, next);
    }
  }

  function walk(root) {
    const tree = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let current = tree.currentNode;
    while (current) {
      patchNode(current);
      current = tree.nextNode();
    }
  }

  function start() {
    walk(document.body || document.documentElement);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") patchNode(record.target);
        else if (record.type === "attributes") patchNode(record.target);
        else for (const added of record.addedNodes) {
          patchNode(added);
          if (added.nodeType === 1) walk(added);
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
`;

fs.writeFileSync("payload/cursor-zh-ui.js", js);
fs.copyFileSync("payload/cursor-zh-ui.js", "installer/lib/cursor-zh-ui.js");
console.log(`synced hardcoded map=${pairs.length} prefixes=${prefixes.length} shorts=${Object.keys(shorts).length}`);
