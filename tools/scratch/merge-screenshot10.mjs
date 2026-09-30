import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));

const jsSafe = {
  "Connect Repo": "连接仓库",
  "Connect repo": "连接仓库",
  "Connect GitHub": "连接 GitHub",
  "Import your Claude Code conversations": "导入你的 Claude Code 对话",
  "Sync your chats and continue them in Cursor": "同步聊天记录并在 Cursor 中继续",
  "Create a focused chat where Agents coordinate work": "创建一个聚焦的聊天，让 Agent 在此协作",
  "Select Repository": "选择仓库",
  "Select Workspace": "选择工作区",
  "Search remote repos, cloud environments...": "搜索远程仓库、云端环境...",
  "Search repos, cloud environments...": "搜索仓库、云端环境...",
  "Search repositories, environments...": "搜索仓库、环境...",
  "Search workspaces...": "搜索工作区...",
  "Run Cursor anywhere...": "在任意位置运行 Cursor...",
  "Select Multiple": "多选",
  "Start from scratch": "从零开始",
  "Use Existing...": "使用现有...",
  "Use Existing": "使用现有",
  "New Folder": "新建文件夹",
  Recents: "最近",
  Repos: "仓库",
  "Plan New Idea": "规划新想法",
  Multitask: "多任务",
  "Start with a plan": "先制定计划",
  "Align on implementation before writing code": "在写代码前先对齐实现方案",
  "Debug an issue": "调试问题",
  "Find root causes and fix tricky bugs": "查找根因并修复棘手缺陷",
  "Create a dashboard": "创建仪表盘",
  "Visualize information in a custom interface": "在自定义界面中可视化信息",
  "Build from a design": "从设计稿构建",
  "Turn a frame into working UI in this repo": "把设计稿变成这个仓库里可运行的界面",
  "Deploy my prototype": "部署我的原型",
  "Put it on a live link anyone can open": "放到任何人都能打开的在线链接上",
  "Upload image": "上传图片",
  "Change image": "更换图片",
  "Claim handle": "领取句柄",
  "Add link": "添加链接",
  "When enabled, your cursor.com profile page is visible to anyone with the link.":
    "启用后，任何有链接的人都可以看到你的 cursor.com 资料页。",
  "Public profiles are disabled by your team admin.": "团队管理员已禁用公开资料。",
  "PNG, JPEG, or WebP up to 2 MB.": "PNG、JPEG 或 WebP，最大 2 MB。",
  "Profile image must be a PNG, JPEG, or WebP file.": "头像必须是 PNG、JPEG 或 WebP 文件。",
  "Choose between light, dark, or high contrast themes": "在浅色、深色或高对比度主题之间选择",
  "Tool Call Density": "工具调用密度",
  "Reduce Motion": "减少动效",
  "Minimize interface animations": "减少界面动画",
  "Minimize interface animations. System follows your OS preference.":
    "减少界面动画。系统选项会跟随操作系统偏好。",
  "Hide Email Address": "隐藏邮箱地址",
  "High Contrast": "高对比度",
  "Skip approval dialog; Agent may run web searches automatically":
    "跳过批准对话框；Agent 可以自动进行网页搜索",
  Allowlist: "允许列表",
  "Inherit from parent": "继承自父级",
  "Add or search model": "添加或搜索模型",
  "Search models": "搜索模型",
  "Choose a model or use the cost- and availability-aware default":
    "选择一个模型，或使用兼顾成本与可用性的默认项",
  "No Cursor-managed worktrees on this machine.": "这台电脑上没有 Cursor 管理的工作树。",
  "Maximum total size in GB across all Cursor-managed worktrees. Set to 0 to disable the size limit.":
    "所有 Cursor 管理工作树的总大小上限（GB）。设为 0 可禁用此限制。",
  "This PC": "本机",
  "This Mac": "本机",
  "This Computer": "本机",
  Queue: "排队",
  Submit: "提交",
  "Queue Messages": "消息排队",
  "Send after Agent finishes": "等 Agent 完成后再发送",
  "New Agent with Model": "使用指定模型新建 Agent",
  "Create a namespace at cursor.com/codebase to start a new project.":
    "在 cursor.com/codebase 创建命名空间以开始新项目。",
  "Set Up Origin": "设置 Origin",
  "Create an Origin namespace to start a new project": "创建 Origin 命名空间以开始新项目",
  "Project name": "项目名称",
  Model: "模型",
  "Create Project": "创建项目",
  Done: "完成",
};

let added = 0;
const skip = new Set(["Queue", "Submit", "Done", "Model", "Recents", "Repos", "Allowlist", "Multitask"]);
for (const [en, zh] of Object.entries(jsSafe)) {
  if (skip.has(en)) continue;
  if (map[en] !== zh) {
    map[en] = zh;
    added += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const existingDom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(existingDom, {
  Queue: "排队",
  Submit: "提交",
  Allowlist: "允许列表",
  Recents: "最近",
  Repos: "仓库",
  Multitask: "多任务",
  Email: "邮箱",
  On: "开",
  Off: "关",
  Model: "模型",
  Cloud: "云端",
  Tab: "Tab",
  "This PC": "本机",
  "On This PC": "在本机",
  "Link 1": "链接 1",
  "High Contrast": "高对比度",
  "Cursor Light": "Cursor 浅色",
  "Cursor Dark": "Cursor 深色",
  "Cursor Light Colorblind (Beta)": "Cursor 浅色色盲友好（测试版）",
  "Cursor Dark High Contrast": "Cursor 深色高对比度",
  "Build from a design": "从设计稿构建",
  "Turn a frame into working UI in this repo": "把设计稿变成这个仓库里可运行的界面",
  "Deploy my prototype": "部署我的原型",
  "Put it on a live link anyone can open": "放到任何人都能打开的在线链接上",
  "Start with a plan": "先制定计划",
  "Align on implementation before writing code": "在写代码前先对齐实现方案",
  "Debug an issue": "调试问题",
  "Find root causes and fix tricky bugs": "查找根因并修复棘手缺陷",
  "Plan New Idea": "规划新想法",
  "Connect Repo": "连接仓库",
  "Inherit from parent": "继承自父级",
  "Add or search model": "添加或搜索模型",
  "Search models": "搜索模型",
  "Upload image": "上传图片",
  "Claim handle": "领取句柄",
  "Add link": "添加链接",
  "Select Multiple": "多选",
  "Start from scratch": "从零开始",
  "Use Existing...": "使用现有...",
  "New Folder": "新建文件夹",
  "Reduce Motion": "减少动效",
  "Tool Call Density": "工具调用密度",
  "Hide Email Address": "隐藏邮箱地址",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['pillLabel:"Connect Repo"', 'pillLabel:"连接仓库"'],
  ['connectLabel:"Connect Repo"', 'connectLabel:"连接仓库"'],
  ['title:"Connect repo"', 'title:"连接仓库"'],
  ['children:"Import your Claude Code conversations"', 'children:"导入你的 Claude Code 对话"'],
  ['children:"Sync your chats and continue them in Cursor"', 'children:"同步聊天记录并在 Cursor 中继续"'],
  ['HAf="Create a focused chat where Agents coordinate work"', 'HAf="创建一个聚焦的聊天，让 Agent 在此协作"'],
  ['qAf="Model"', 'qAf="模型"'],
  ['zAf="Workspace"', 'zAf="工作区"'],
  ['GAf="Project name"', 'GAf="项目名称"'],
  ['ebe="Start from scratch"', 'ebe="从零开始"'],
  ['placeholder:V?"Search remote repos, cloud environments...":B==="workspace"?"Search workspaces...":"Search repos, cloud environments..."', 'placeholder:V?"搜索远程仓库、云端环境...":B==="workspace"?"搜索工作区...":"搜索仓库、云端环境..."'],
  ['children:"Select Multiple"', 'children:"多选"'],
  ['label:"Use Existing..."', 'label:"使用现有..."'],
  ['children:"Use Existing..."', 'children:"使用现有..."'],
  ['children:"New Folder"', 'children:"新建文件夹"'],
  ['heading:"Recents"', 'heading:"最近"'],
  ['groupLabel:"Repos"', 'groupLabel:"仓库"'],
  ['label:"Plan New Idea"', 'label:"规划新想法"'],
  ['label:"Multitask"', 'label:"多任务"'],
  ['title:"Start with a plan"', 'title:"先制定计划"'],
  ['subtitle:"Align on implementation before writing code"', 'subtitle:"在写代码前先对齐实现方案"'],
  ['title:"Debug an issue"', 'title:"调试问题"'],
  ['subtitle:"Find root causes and fix tricky bugs"', 'subtitle:"查找根因并修复棘手缺陷"'],
  ['children:"Upload image"', 'children:"上传图片"'],
  ['children:"Claim handle"', 'children:"领取句柄"'],
  ['children:"Add link"', 'children:"添加链接"'],
  ['label:"Email"', 'label:"邮箱"'],
  ['label:"Tool Call Density"', 'label:"工具调用密度"'],
  ['label:"Reduce Motion"', 'label:"减少动效"'],
  ['label:"Hide Email Address"', 'label:"隐藏邮箱地址"'],
  ['title:"High Contrast"', 'title:"高对比度"'],
  ['label:"High Contrast"', 'label:"高对比度"'],
  ['label:"Inherit from parent"', 'label:"继承自父级"'],
  ['placeholder:"Add or search model"', 'placeholder:"添加或搜索模型"'],
  ['searchPlaceholder:"Search models"', 'searchPlaceholder:"搜索模型"'],
  ['label:"Queue"', 'label:"排队"'],
  ['children:"Submit"', 'children:"提交"'],
  ['label:"On"', 'label:"开"'],
  ['label:"Off"', 'label:"关"'],
  ['ba?"This PC":lr?"This Mac":"This Computer"', 'ba?"本机":lr?"本机":"本机"'],
  ["name:n?`On ${u}`:u", "name:n?`${u}`:u"],
  ["`New Agent in ${rs}`", "`在 ${rs} 中新建 Agent`"],
  ["`New Agent in ${or.name}`", "`在 ${or.name} 中新建 Agent`"],
  ["`Link ${he+1}`", "`链接 ${he+1}`"],
  ["K) input`", "K）输入框`"],
  [
    'description:"Choose between light, dark, or high contrast themes"',
    'description:"在浅色、深色或高对比度主题之间选择"',
  ],
  [
    'description:"Minimize interface animations. System follows your OS preference."',
    'description:"减少界面动画。系统选项会跟随操作系统偏好。"',
  ],
  [
    'description:"Maximum total size in GB across all Cursor-managed worktrees. Set to 0 to disable the size limit."',
    'description:"所有 Cursor 管理工作树的总大小上限（GB）。设为 0 可禁用此限制。"',
  ],
  [
    'children:"No Cursor-managed worktrees on this machine."',
    'children:"这台电脑上没有 Cursor 管理的工作树。"',
  ],
  [
    'children:"Choose a model or use the cost- and availability-aware default"',
    'children:"选择一个模型，或使用兼顾成本与可用性的默认项"',
  ],
  [
    '"Skip approval dialog; Agent may run web searches automatically"',
    '"跳过批准对话框；Agent 可以自动进行网页搜索"',
  ],
  [
    'd?"When enabled, your cursor.com profile page is visible to anyone with the link.":"Public profiles are disabled by your team admin."',
    'd?"启用后，任何有链接的人都可以看到你的 cursor.com 资料页。":"团队管理员已禁用公开资料。"',
  ],
  ['projectName:E?"Select Repository":"Select Workspace"', 'projectName:E?"选择仓库":"选择工作区"'],
  ['description:"Send after Agent finishes"', 'description:"等 Agent 完成后再发送"'],
];

const seen = new Set(contexts.map((pair) => pair[0]));
let contextAdded = 0;
for (const pair of extraContexts) {
  if (seen.has(pair[0]) || pair[0] === pair[1]) continue;
  contexts.push(pair);
  seen.add(pair[0]);
  contextAdded += 1;
}
fs.writeFileSync("payload/hardcoded-context.json", JSON.stringify(contexts, null, 2) + "\n");
console.log(`map +${added} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length}`);
