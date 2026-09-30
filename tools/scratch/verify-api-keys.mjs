import "./lib/win-console.mjs";
import fs from "node:fs";

const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);
const needles = [
  "复制请求 ID",
  "配置图标可见性",
  "当 Agent 完成或需要注意时播放声音",
  "退出登录",
  "共享数据",
  "帮助改进 Cursor，惠及所有人",
  "API 密钥",
  "搜索设置",
  "你可以填入",
  "输入 API 密钥",
  "使用 Azure OpenAI",
  "工作树",
  "${n} API 密钥",
  "children:\"添加\"",
];
for (const needle of needles) console.log(glass.includes(needle) ? "HIT" : "MISS", needle);

const pack = JSON.parse(
  fs.readFileSync(
    "C:/Users/Administrator/.cursor/extensions/ms-ceintl.vscode-language-pack-zh-hans-1.128.0-universal/translations/main.i18n.json",
    "utf8",
  ),
);
console.log(
  "nls",
  pack.contents?.["vs/platform/actions/browser/toolbar"]?.configureIconVisibility,
);
