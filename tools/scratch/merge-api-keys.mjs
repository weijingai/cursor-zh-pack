import "./lib/win-console.mjs";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("payload/hardcoded-zh.json", "utf8"));

const jsSafe = {
  "Copy Request ID": "复制请求 ID",
  "Copy Branch Name": "复制分支名称",
  "Refresh Github Authentication": "刷新 GitHub 身份验证",
  "No request ID found": "未找到请求 ID",
  "Request ID copied to clipboard": "请求 ID 已复制到剪贴板",
  "Play a sound when agents finish or need attention": "当 Agent 完成或需要注意时播放声音",
  "Play a sound when Agent finishes responding": "当 Agent 完成回复时播放声音",
  "Choose Custom Sound...": "选择自定义声音...",
  "Default Sound": "默认声音",
  "Reset to default sound": "重置为默认声音",
  "Log Out": "退出登录",
  "Share Data": "共享数据",
  "Improve Cursor for everyone": "帮助改进 Cursor，惠及所有人",
  "Help improve Cursor for everyone": "帮助改进 Cursor，惠及所有人",
  "Data Sharing": "数据共享",
  "Search Settings": "搜索设置",
  "API Keys": "API 密钥",
  "OpenAI API Key": "OpenAI API 密钥",
  "OpenAI API key": "OpenAI API 密钥",
  "Anthropic API Key": "Anthropic API 密钥",
  "Google API Key": "Google API 密钥",
  "Enter API key": "输入 API 密钥",
  "Secret saved": "密钥已保存",
  "Use OpenAI API Key": "使用 OpenAI API 密钥",
  "Change the base URL for OpenAI API requests.": "更改 OpenAI API 请求的基址 URL。",
  "Override OpenAI Base URL": "覆盖 OpenAI 基址 URL",
  "You can put in": "你可以填入",
  "your OpenAI key": "你的 OpenAI 密钥",
  "to use OpenAI models at cost.": "以按用量付费使用 OpenAI 模型。",
  "your Anthropic key": "你的 Anthropic 密钥",
  'to use Claude at cost. When enabled, this key will be used for all models beginning with "claude-".':
    "以按用量付费使用 Claude。启用后，所有以 “claude-” 开头的模型都会使用此密钥。",
  "your Google AI Studio key": "你的 Google AI Studio 密钥",
  "to use Google models at-cost.": "以按用量付费使用 Google 模型。",
  "Configure Azure OpenAI to use OpenAI models through your Azure account.":
    "配置 Azure OpenAI，通过你的 Azure 账户使用 OpenAI 模型。",
  "Configure AWS Bedrock to use Anthropic Claude models through your AWS account.":
    "配置 AWS Bedrock，通过你的 AWS 账户使用 Anthropic Claude 模型。",
  "Cursor Enterprise teams can configure IAM roles to access Bedrock without any Access Keys.":
    "Cursor 企业版团队可以配置 IAM 角色以访问 Bedrock，无需任何访问密钥。",
  "You can use your teams Bedrock instance without any additional configuration.":
    "你可以直接使用团队的 Bedrock 实例，无需额外配置。",
  "Use Azure OpenAI": "使用 Azure OpenAI",
  "Use AWS Bedrock": "使用 AWS Bedrock",
  "Deployment Name": "部署名称",
  "Access Key ID": "访问密钥 ID",
  "Secret Access Key": "私密访问密钥",
  "Test Model": "测试模型",
  "AWS Access Key ID": "AWS 访问密钥 ID",
  "AWS Secret Access Key": "AWS 私密访问密钥",
  "e.g. my-resource.openai.azure.com": "例如 my-resource.openai.azure.com",
  "e.g. gpt-35-turbo": "例如 gpt-35-turbo",
  "e.g. us-east-1": "例如 us-east-1",
  "e.g. anthropic.claude-3-sonnet-20240229-v1:0": "例如 anthropic.claude-3-sonnet-20240229-v1:0",
  "Are you sure you want to enable your own ": "确定要启用你自己的 ",
  " API key? Several of Cursor's features require custom models (Tab, Apply from Chat, Agent), which cannot be billed to an API key.":
    " API 密钥吗？Cursor 的部分功能需要自定义模型（Tab、从聊天应用、Agent），这些无法计费到 API 密钥。",
  "Base URL and API Key are required.": "必须填写基址 URL 和 API 密钥。",
  Worktrees: "工作树",
  "Worktree...": "工作树...",
  "Run locally in a Worktree": "在本地工作树中运行",
  "Configure Icon Visibility": "配置图标可见性",
};

const domOnly = {
  Add: "添加",
  Open: "打开",
  Documentation: "文档",
  Preview: "预览",
  Region: "区域",
  "API Key": "API 密钥",
  "Base URL": "基址 URL",
  "Azure OpenAI": "Azure OpenAI",
  "AWS Bedrock": "AWS Bedrock",
  Worktree: "工作树",
  Worktrees: "工作树",
  Cancel: "取消",
};

let added = 0;
for (const [en, zh] of Object.entries(jsSafe)) {
  if (!map[en]) {
    map[en] = zh;
    added += 1;
  } else if (en === "Worktrees") {
    map[en] = zh;
  }
}

const existingDom = fs.existsSync("payload/dom-glass-zh.json")
  ? JSON.parse(fs.readFileSync("payload/dom-glass-zh.json", "utf8"))
  : {};
Object.assign(existingDom, domOnly);
fs.writeFileSync("payload/dom-glass-zh.json", JSON.stringify(existingDom, null, 2) + "\n");

let stripped = 0;
for (const key of Object.keys(domOnly)) {
  if (key in map && !(key in jsSafe)) {
    delete map[key];
    stripped += 1;
  }
}
fs.writeFileSync("payload/hardcoded-zh.json", JSON.stringify(map, null, 2) + "\n");

const contexts = JSON.parse(fs.readFileSync("payload/hardcoded-context.json", "utf8"));
const extraContexts = [
  ['children:"API Keys"', 'children:"API 密钥"'],
  ['title:"OpenAI API Key"', 'title:"OpenAI API 密钥"'],
  ['title:"Azure OpenAI"', 'title:"Azure OpenAI"'],
  ['title:"AWS Bedrock"', 'title:"AWS Bedrock"'],
  ['title:"Data Sharing"', 'title:"数据共享"'],
  ['subtitle:"Help improve Cursor for everyone"', 'subtitle:"帮助改进 Cursor，惠及所有人"'],
  ['label:"API Key"', 'label:"API 密钥"'],
  ['label:"Base URL"', 'label:"基址 URL"'],
  ['label:"Deployment Name"', 'label:"部署名称"'],
  ['label:"Use Azure OpenAI"', 'label:"使用 Azure OpenAI"'],
  ['label:"Use AWS Bedrock"', 'label:"使用 AWS Bedrock"'],
  ['label:"Access Key ID"', 'label:"访问密钥 ID"'],
  ['label:"Secret Access Key"', 'label:"私密访问密钥"'],
  ['label:"Region"', 'label:"区域"'],
  ['label:"Test Model"', 'label:"测试模型"'],
  ['label:"Log Out"', 'label:"退出登录"'],
  ['label:"Copy Request ID"', 'label:"复制请求 ID"'],
  ['placeholder:"Enter API key"', 'placeholder:"输入 API 密钥"'],
  ['placeholder:"Search Settings"', 'placeholder:"搜索设置"'],
  ['tQv="Search Settings"', 'tQv="搜索设置"'],
  ['m8r="Copy Request ID"', 'm8r="复制请求 ID"'],
  ['rbo="Copy Request ID"', 'rbo="复制请求 ID"'],
  ['worktrees:"Worktrees"', 'worktrees:"工作树"'],
  ['title:"Worktrees"', 'title:"工作树"'],
  ['children:"Worktree"', 'children:"工作树"'],
  ['children:"Add"', 'children:"添加"'],
  ['children:"Documentation"', 'children:"文档"'],
  ['children:"Choose Custom Sound..."', 'children:"选择自定义声音..."'],
  ['children:"Preview"', 'children:"预览"'],
  ["`${n} API Key`", "`${n} API 密钥`"],
  ["`${n} API key`", "`${n} API 密钥`"],
  ["`Use ${n} API Key`", "`使用 ${n} API 密钥`"],
  ["`Enable ${n} API Key`", "`启用 ${n} API 密钥`"],
  ['description:"Play a sound when agents finish or need attention"', 'description:"当 Agent 完成或需要注意时播放声音"'],
  ['description:"Change the base URL for OpenAI API requests."', 'description:"更改 OpenAI API 请求的基址 URL。"'],
  ['children:"your OpenAI key"', 'children:"你的 OpenAI 密钥"'],
  ['children:"your Anthropic key"', 'children:"你的 Anthropic 密钥"'],
  ['children:"your Google AI Studio key"', 'children:"你的 Google AI Studio 密钥"'],
  ['"to use OpenAI models at cost."', '"以按用量付费使用 OpenAI 模型。"'],
  ['"to use Google models at-cost."', '"以按用量付费使用 Google 模型。"'],
  ['"You can put in"', '"你可以填入"'],
  ['accessibleLabel:"OpenAI API Key"', 'accessibleLabel:"OpenAI API 密钥"'],
  ['accessibleLabel:"AWS Bedrock"', 'accessibleLabel:"AWS Bedrock"'],
  ['accessibleLabel:"Azure OpenAI"', 'accessibleLabel:"Azure OpenAI"'],
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
console.log(`map +${added} -${stripped} total=${Object.keys(map).length} contexts +${contextAdded} total=${contexts.length}`);
