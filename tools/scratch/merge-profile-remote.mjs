import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));
const pairs = JSON.parse(fs.readFileSync("catalog/settings-pairs.json", "utf8"));

const jsSafe = {
  "Remote Control": "远程控制",
  "Remote Control Agent": "远程控制 Agent",
  "Allow agents on this computer to be controlled remotely from mobile":
    "允许通过手机远程控制这台电脑上的 Agent",
  "Turn Remote Control on again to reset this computer": "再次开启远程控制以重置这台电脑",
  "Paired Devices": "已配对设备",
  "No devices are currently paired with this computer.": "当前没有设备与这台电脑配对。",
  "Unnamed device": "未命名设备",
  "Disconnect from All Computers": "断开所有电脑",
  "Approve": "批准",
  "Reject": "拒绝",
  "Remote Control runs on a cloud agent, which requires data storage that your current privacy mode disables":
    "远程控制运行在云端 Agent 上，需要数据存储，而你当前的隐私模式已禁用该能力",
  "Enable Remote Control for this computer": "为此电脑启用远程控制",
  "Allow agents on this computer to be controlled from your other devices":
    "允许从你的其他设备控制这台电脑上的 Agent",
  "Disable Remote Control on all of my computers": "在我的所有电脑上禁用远程控制",
  "Unregisters every computer on your account; you can register any of them again later":
    "将注销你账号下的所有电脑；之后可以重新注册其中任何一台",
  "Unregister All": "全部注销",
  "Disable Remote Control on all of your computers?": "要在你的所有电脑上禁用远程控制吗？",
  "This will turn off Remote Control on every computer associated with your account.":
    "这将关闭与你账号关联的每台电脑上的远程控制。",
  "Computer Name": "电脑名称",
  "Change how this computer appears on other devices": "更改这台电脑在其他设备上的显示名称",
  "Keep This Computer Awake": "保持此电脑唤醒",
  "Prevent sleep when this computer is plugged in and Remote Control is enabled":
    "当此电脑已接通电源并启用远程控制时，阻止休眠",
  "Turn on Remote Control or register this computer to keep it awake":
    "开启远程控制或注册此电脑以保持唤醒",
  "Self-Hosted Workers": "自托管 Worker",
  "Enable local self-hosted workers": "启用本地自托管 Worker",
  "Allow cloud agents to run in your local environment.": "允许云端 Agent 在你的本地环境中运行。",
  "Self-hosted Agent": "自托管 Agent",
  "Wait indefinitely to authenticate when prompted. When off, skip authentication prompts after 30 seconds.":
    "出现提示时无限期等待验证。关闭后，30 秒未响应则跳过验证提示。",
  "Automatically parse links when pasted into Quick Edit (": "自动解析粘贴到快速编辑（",
  "Cursor periodically removes old worktrees to free disk space. Tune how aggressively cleanup runs.":
    "Cursor 会定期删除旧工作树以释放磁盘空间。可在此调整清理的积极程度。",
  "Maximum number of Cursor-managed worktrees to retain across all workspaces. Older worktrees are removed first.":
    "所有工作区中保留的 Cursor 管理工作树数量上限。较旧的会先被删除。",
  "Maximum number of Cursor-managed worktrees to keep across all workspaces. Older worktrees are removed first. Default is 25.":
    "所有工作区中保留的 Cursor 管理工作树数量上限。较旧的会先被删除。默认 25。",
  "Create repository": "创建仓库",
  "Create Project": "创建项目",
  "Clone Repository": "克隆仓库",
  "Clone a Git repository and add it as a project.": "克隆 Git 仓库并将其添加为项目。",
  "Repository URL (https or SSH)": "仓库 URL（https 或 SSH）",
  "Open Folder": "打开文件夹",
  "Select Folder": "选择文件夹",
  "Connect via SSH": "通过 SSH 连接",
  "Connect via WSL": "通过 WSL 连接",
  "Connection Failed": "连接失败",
  "Connecting": "正在连接",
  "new repository": "新建仓库",
  "Claim a handle for your public profile page": "为公开资料页领取一个句柄",
  "Name shown on the public profile page": "显示在公开资料页上的名称",
  "Social and website links on the public profile page": "公开资料页上的社交和网站链接",
  "Account email shown on the profile page": "资料页上显示的账户邮箱",
  "Cursor-Managed Worktrees": "Cursor 管理的工作树",
  "Max Worktrees": "工作树数量上限",
  "Enable LSPs for Worktrees": "为工作树启用 LSP",
  "New Worktree": "新建工作树",
  "Open Terminal in Worktree": "在工作树中打开终端",
  "Maximum retained Cursor-managed worktrees": "保留的 Cursor 管理工作树数量上限",
  "Maximum aggregate worktree size": "工作树总大小上限",
  "Self-Hosted Worker": "自托管 Worker",
};

const fromPairs = {};
if (Array.isArray(pairs)) {
  for (const item of pairs) {
    if (item.label && item.label.length >= 4) fromPairs[item.label] = fromPairs[item.label];
    if (item.description && item.description.length >= 12) fromPairs[item.description] = fromPairs[item.description];
  }
}

const pairZh = {
  "Profile Image": "头像",
  "First Name": "名",
  "Last Name": "姓",
  Handle: "句柄",
  Links: "链接",
  "Public Profile": "公开资料",
  "Follow System Color Scheme": "跟随系统配色",
  Theme: "主题",
  "Light Theme": "浅色主题",
  "Dark Theme": "深色主题",
  "Follow System High Contrast": "跟随系统高对比度",
  "High Contrast Light Theme": "高对比度浅色主题",
  "High Contrast Dark Theme": "高对比度深色主题",
  "Manage Themes": "管理主题",
  Colors: "颜色",
  Intensity: "强度",
  Hue: "色相",
  "Reduce Transparency": "降低透明度",
  "Agent Conversations": "Agent 对话",
  Typography: "字体排印",
  "Code Font Size": "代码字体大小",
  "UI Font Family": "界面字体",
  "Code Font Family": "代码字体",
  "Font Smoothing": "字体平滑",
  Motion: "动效",
  "Wait for MCP Authentication": "等待 MCP 验证",
  "Auto-Parse Links": "自动解析链接",
  "Context and Tools": "上下文与工具",
  "Terminal and Editing": "终端与编辑",
  "Web Fetch Tool": "网页抓取工具",
  Cleanup: "清理",
  "Max Total Size (GB)": "总大小上限（GB）",
  "Keep This Computer Awake": "保持此电脑唤醒",
  "Status Bar": "状态栏",
  "Upload or remove the profile photo": "上传或移除头像",
  "Make the cursor.com profile page visible to anyone with the link": "让任何人只要有链接就能看到 cursor.com 资料页",
  "Choose the theme used when your system is in light mode": "选择系统处于浅色模式时使用的主题",
  "Choose the theme used when your system is in dark mode": "选择系统处于深色模式时使用的主题",
  "Switch to a high contrast theme when your OS is in a high contrast mode": "操作系统处于高对比度模式时切换到高对比度主题",
  "Choose the theme used when your system is in light high contrast mode": "选择系统处于浅色高对比度模式时使用的主题",
  "Choose the theme used when your system is in dark high contrast mode": "选择系统处于深色高对比度模式时使用的主题",
  "Create your own themes, tweak the vibe, and import your favorites": "创建自己的主题、调整风格，并导入你喜欢的主题",
  "Choose a tint color": "选择一种着色",
  "Control how strongly the tint is applied": "控制着色强度",
  "Replace translucent surfaces with opaque backgrounds": "将半透明表面替换为不透明背景",
  "Adjust how much detail is shown for tool calls": "调整工具调用显示的详细程度",
  "Font size for the Cursor user interface": "Cursor 用户界面的字体大小",
  "Font size for code editors and diffs": "代码编辑器和差异视图的字体大小",
  "Override the Cursor user interface typeface": "覆盖 Cursor 用户界面字体",
  "Override the font for code editors and diffs": "覆盖代码编辑器和差异视图的字体",
  "Use native macOS font anti-aliasing": "使用 macOS 原生字体抗锯齿",
  "Minimize interface animations": "减少界面动画",
  "Wait indefinitely; otherwise skip prompts after 30 seconds": "无限期等待；否则 30 秒后跳过提示",
  "Automatically parse links pasted into Quick Edit": "自动解析粘贴到快速编辑中的链接",
  "Show status bar at the bottom of the window": "在窗口底部显示状态栏",
  "Allow Agent to search the web for relevant information": "允许 Agent 搜索网络以获取相关信息",
  "Allow Agent to fetch content from URLs": "允许 Agent 从 URL 获取内容",
};

Object.assign(jsSafe, pairZh);

let added = 0;
const skipJs = new Set(["Approve", "Reject", "Handle", "Links", "Theme", "Hue", "Colors", "Cleanup", "Intensity", "Motion"]);
for (const [en, zh] of Object.entries(jsSafe)) {
  if (skipJs.has(en) || (en.length <= 8 && !en.includes(" "))) continue;
  if (map[en] !== zh) {
    map[en] = zh;
    added += 1;
  }
}

for (const key of Object.keys(map)) {
  if (typeof map[key] === "string" && map[key].includes("Worktree") && !map[key].includes("工作树")) {
    map[key] = map[key].replaceAll("Worktree", "工作树").replaceAll("worktree", "工作树");
  }
}

fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const existingDom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(existingDom, {
  Indexing: "索引",
  Clone: "克隆",
  Connecting: "正在连接",
  Offline: "离线",
  Connected: "已连接",
  Disconnect: "断开连接",
  Approve: "批准",
  Reject: "拒绝",
  "Remote Control": "远程控制",
  "Computer Name": "电脑名称",
  "Paired Devices": "已配对设备",
  Cleanup: "清理",
  Handle: "句柄",
  Links: "链接",
  Theme: "主题",
  Hue: "色相",
  Intensity: "强度",
  Colors: "颜色",
  Motion: "动效",
});
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['cRn="Remote Control"', 'cRn="远程控制"'],
  ['Uqg="Allow agents on this computer to be controlled remotely from mobile"', 'Uqg="允许通过手机远程控制这台电脑上的 Agent"'],
  ['jqg="Turn Remote Control on again to reset this computer"', 'jqg="再次开启远程控制以重置这台电脑"'],
  ['d0l="Paired Devices"', 'd0l="已配对设备"'],
  ['$qg="No devices are currently paired with this computer."', '$qg="当前没有设备与这台电脑配对。"'],
  ['h0l="Unnamed device"', 'h0l="未命名设备"'],
  ['g0l="Computer Name"', 'g0l="电脑名称"'],
  ['rVg="Change how this computer appears on other devices"', 'rVg="更改这台电脑在其他设备上的显示名称"'],
  ['Xqg="Enable Remote Control for this computer"', 'Xqg="为此电脑启用远程控制"'],
  ['m0l="Allow agents on this computer to be controlled from your other devices"', 'm0l="允许从你的其他设备控制这台电脑上的 Agent"'],
  ['Qqg="Disable Remote Control on all of my computers"', 'Qqg="在我的所有电脑上禁用远程控制"'],
  ['Jqg="Unregister All"', 'Jqg="全部注销"'],
  ['inlineLabel:"Remote Control"', 'inlineLabel:"远程控制"'],
  ['tooltip:"Remote Control Agent"', 'tooltip:"远程控制 Agent"'],
  ['qualifierSuffix:"Remote Control"', 'qualifierSuffix:"远程控制"'],
  ['label:"Remote Control"', 'label:"远程控制"'],
  ['label:"Keep This Computer Awake"', 'label:"保持此电脑唤醒"'],
  ['label:"Wait for MCP Authentication"', 'label:"等待 MCP 验证"'],
  ['label:"Auto-Parse Links"', 'label:"自动解析链接"'],
  ['label:"Profile Image"', 'label:"头像"'],
  ['label:"First Name"', 'label:"名"'],
  ['label:"Last Name"', 'label:"姓"'],
  ['label:"Handle"', 'label:"句柄"'],
  ['label:"Public Profile"', 'label:"公开资料"'],
  ['label:"Follow System Color Scheme"', 'label:"跟随系统配色"'],
  ['label:"Light Theme"', 'label:"浅色主题"'],
  ['label:"Dark Theme"', 'label:"深色主题"'],
  ['label:"Manage Themes"', 'label:"管理主题"'],
  ['label:"Reduce Transparency"', 'label:"降低透明度"'],
  ['title:"Context and Tools"', 'title:"上下文与工具"'],
  ['title:"Terminal and Editing"', 'title:"终端与编辑"'],
  ['title:"Cleanup"', 'title:"清理"'],
  ['title:"Create Project"', 'title:"创建项目"'],
  ['title:"Clone Repository"', 'title:"克隆仓库"'],
  ['children:"Create repository"', 'children:"创建仓库"'],
  ['children:"Clone"', 'children:"克隆"'],
  ['CEg=["new repository"]', 'CEg=["新建仓库"]'],
  ['isGlass?"Code Intelligence":"Indexing"', 'isGlass?"代码智能":"索引"'],
  ['["Ln "', '["行 "'],
  [
    "Wait indefinitely to authenticate when prompted. When off, skip authentication prompts after 30 seconds.",
    "出现提示时无限期等待验证。关闭后，30 秒未响应则跳过验证提示。",
  ],
  [
    "Automatically parse links when pasted into Quick Edit (",
    "自动解析粘贴到快速编辑（",
  ],
  [
    "Cursor periodically removes old worktrees to free disk space. Tune how aggressively cleanup runs.",
    "Cursor 会定期删除旧工作树以释放磁盘空间。可在此调整清理的积极程度。",
  ],
  [
    "Maximum number of Cursor-managed worktrees to retain across all workspaces. Older worktrees are removed first.",
    "所有工作区中保留的 Cursor 管理工作树数量上限。较旧的会先被删除。",
  ],
  [
    'description:"Prevent sleep when this computer is plugged in and Remote Control is enabled"',
    'description:"当此电脑已接通电源并启用远程控制时，阻止休眠"',
  ],
  [
    'sectionTitle:"Self-Hosted Workers"',
    'sectionTitle:"自托管 Worker"',
  ],
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
