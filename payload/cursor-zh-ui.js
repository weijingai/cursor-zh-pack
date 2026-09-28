"use strict";

(() => {
  const MAP = {
  "Agents Window": "Agents 窗口",
  "Open Agents Window": "打开 Agents 窗口",
  "Close Agents window": "关闭 Agents 窗口",
  "Maximize Agents window": "最大化 Agents 窗口",
  "Minimize Agents window": "最小化 Agents 窗口",
  "Restore Agents window": "还原 Agents 窗口",
  "Meet the new Agents Window": "认识新的 Agents 窗口",
  "Run many agents in parallel — across repos, locally, on remote SSH, and in the cloud.": "并行运行多个 Agent —— 跨仓库，可在本地、远程 SSH 和云端进行。",
  "Run many agents in parallel \\u2014 across repos, locally, on remote SSH, and in the cloud.": "并行运行多个 Agent —— 跨仓库，可在本地、远程 SSH 和云端进行。",
  "Jump back to the Agents Window to keep working across repos.": "返回 Agents 窗口，继续跨仓库工作。",
  "Switch to Agents Window": "切换到 Agents 窗口",
  "Switch to Agents Window (Glass)": "切换到 Agents 窗口 (Glass)",
  "Use in Agents Window": "在 Agents 窗口中使用",
  "Try it now": "立即试用",
  "Open Agents Window on Startup": "启动时打开 Agents 窗口",
  "New Agents Window (Glass)": "新建 Agents 窗口 (Glass)",
  "Open or Focus Agents Window (Glass)": "打开或聚焦 Agents 窗口 (Glass)",
  "No agents yet": "还没有 Agent",
  "No agents found": "未找到 Agent",
  "No matching agents": "没有匹配的 Agent",
  "Create an agent to start working on tasks": "创建一个 Agent 开始处理任务",
  "Loading team agents...": "正在加载团队 Agent…",
  "Search Agents...": "搜索 Agent...",
  "Search agents": "搜索 Agent",
  "Search agents...": "搜索 Agent...",
  "Search agents, Canvas, files, actions...": "搜索 Agent、Canvas、文件、操作...",
  "Search files...": "搜索文件...",
  "Search actions...": "搜索操作...",
  "New Agent": "新建 Agent",
  "Open New Agent Chat": "打开新的 Agent 聊天",
  "Open Agent as Pane": "在窗格中打开 Agent",
  "Open Agent Changes": "打开 Agent 更改",
  "Close Agent Changes": "关闭 Agent 更改",
  "Focus Agent": "聚焦 Agent",
  "Configure Local Agent": "配置本地 Agent",
  "Create Rule": "创建规则",
  "Add Symbol to Current Chat...": "将符号添加到当前聊天...",
  "Add Symbol to New Chat...": "将符号添加到新聊天...",
  "Add Symbol to Current Chat": "将符号添加到当前聊天",
  "Add Symbol to New Chat": "将符号添加到新聊天",
  "Add Directory to New Cursor Chat": "将目录添加到新的 Cursor 聊天",
  "Add Directory to Cursor Chat": "将目录添加到 Cursor 聊天",
  "Add File to New Cursor Chat": "将文件添加到新的 Cursor 聊天",
  "Add File to Cursor Chat": "将文件添加到 Cursor 聊天",
  "Add Files to New Chat": "将文件添加到新聊天",
  "Add Files to Chat": "将文件添加到聊天",
  "Cursor Settings": "Cursor 设置",
  "Open Cursor Settings": "打开 Cursor 设置",
  "Search Cursor Settings": "搜索 Cursor 设置",
  "Search Cursor settings…": "搜索 Cursor 设置…",
  "Search Cursor settings...": "搜索 Cursor 设置...",
  "Close Settings": "关闭设置",
  "No matching settings": "没有匹配的设置",
  "Loading settings...": "正在加载设置…",
  "Focus AI Settings Search": "聚焦 AI 设置搜索",
  "Open Account Settings": "打开账户设置",
  "Open MCP Settings": "打开 MCP 设置",
  "Open VS Code Settings": "打开 VS Code 设置",
  "Open Composer Settings": "打开 Composer 设置",
  "Agent Settings": "Agent 设置",
  "Import Settings from VS Code": "从 VS Code 导入设置",
  "Import settings, extensions, and keybindings from VS Code": "从 VS Code 导入设置、扩展和键盘快捷方式",
  "Manage Settings": "管理设置",
  "Marketplace Settings": "市场设置",
  "Marketplace Access": "市场访问",
  "Plugin Settings": "插件设置",
  "Network Access Settings": "网络访问设置",
  "Self-driving Settings": "自动驾驶设置",
  "Edit Privacy Settings": "编辑隐私设置",
  "About Cursor": "关于 Cursor",
  "VS Code Settings": "VS Code 设置",
  "Plan & Usage": "套餐与用量",
  "Browser & Network": "浏览器与网络",
  "Git & PRs": "Git 与 PR",
  "Rules, Skills, Subagents": "规则、技能、子 Agent",
  "Tools & MCPs": "工具与 MCP",
  "Cloud Agents": "云端 Agent",
  "Code Intelligence": "代码智能",
  "Self-Driving PRs": "自动驾驶 PR",
  "New MCP Server": "新建 MCP 服务器",
  "Add a Custom MCP Server": "添加自定义 MCP 服务器",
  "Locked by admin": "已由管理员锁定",
  "New Chat Tab": "新聊天标签页",
  "New Chat with Selections": "用选区新建聊天",
  "New Chat": "新聊天",
  "Hide Chat": "隐藏聊天",
  "Open Chat": "打开聊天",
  "Cancel Chat (Input Focused)": "取消聊天（输入框已聚焦）",
  "Cancel Chat": "取消聊天",
  "Find Next in Chat": "查找下一个（聊天）",
  "Find Previous in Chat": "查找上一个（聊天）",
  "Find in Chat": "在聊天中查找",
  "Close Find in Chat": "关闭聊天查找",
  "Fork Shared Chat": "派生共享聊天",
  "Fork Chat": "派生聊天",
  "Rename Chat": "重命名聊天",
  "Resume Current Chat": "继续当前聊天",
  "Swap Agent Sidebar Location": "切换 Agent 侧栏位置",
  "Plan, Build, / for skills, @ for context": "计划、构建、/ 技能、@ 上下文",
  "Ask, learn, brainstorm": "提问、学习、头脑风暴",
  "Work on explicitly added files (no tools)": "只处理显式添加的文件（不使用工具）",
  "Plan, search, build anything": "计划、搜索、构建任何内容",
  "Add a follow-up": "添加跟进",
  "Add follow-ups in the worktree": "在 worktree 中添加跟进",
  "Ask follow-ups in the worktree": "在 worktree 中追问",
  "Continue locally": "在本地继续",
  "Reject, suggest, follow up?": "拒绝、建议，还是跟进？",
  "Write your instructions for the agent here...": "在这里写下给 Agent 的指令…",
  "Start writing your plan...": "开始写计划…",
  "Start writing...": "开始输入…",
  "Add agents, context, tools...": "添加 Agent、上下文、工具…",
  "Open chat mode menu": "打开聊天模式菜单",
  "Open add context menu": "打开添加上下文菜单",
  "Give Feedback": "提供反馈",
  "Share Transcript": "分享对话记录",
  "Export Transcript": "导出对话记录",
  "Generate Commit Message": "生成提交说明",
  "Open Browser": "打开浏览器",
  "Open Composer": "打开 Composer",
  "Create New Composer": "新建 Composer",
  "More Actions": "更多操作",
  "Share Feedback": "分享反馈",
  "Generate in Terminal": "在终端中生成",
  "Toggle Voice Mode": "切换语音模式",
  "Cancel Voice Mode": "取消语音模式",
  "Accept Generated Command": "接受生成的命令",
  "Reject Generated Command": "拒绝生成的命令",
  "Accept & Run Generated Command": "接受并运行生成的命令",
  "Enable auto-keep": "启用自动保留",
  "Please open a workspace folder first.": "请先打开一个工作区文件夹。",
  "Import Project Rules from GitHub/GitLab": "从 GitHub/GitLab 导入项目规则",
  "Open Dashboard": "打开控制台",
  "Cannot create project rules without a workspace. Please open a folder first.": "未打开工作区时无法创建项目规则。请先打开一个文件夹。",
  "Failed to create rule. Please try again.": "创建规则失败，请重试。"
};
  const PREFIXES = [["Search settings ","搜索设置 "],["Cursor Settings: ","Cursor 设置："],["Search Cursor settings","搜索 Cursor 设置"]];
  const SHORT = {"General":"常规","Profile":"个人资料","Appearance":"外观","Fun":"趣味","Agents":"Agent","Models":"模型","Plugins":"插件","Customize":"自定义","Indexing":"索引","Network":"网络","Developer":"开发人员","Beta":"测试版","Hooks":"Hooks","Worktrees":"Worktree","Settings":"设置"};
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
    const lead = value.match(/^\s*/)[0];
    const trail = value.match(/\s*$/)[0];
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
