import "./lib/win-console.mjs";
import fs from "node:fs";
const glass = fs.readFileSync(
  "C:/Program Files/Cursor/resources/app/out/vs/workbench/workbench.glass.main.js",
  "utf8",
);
for (const n of [
  'cRn="远程控制"',
  "保持此电脑唤醒",
  "已配对设备",
  "电脑名称",
  "出现提示时无限期等待验证",
  "自动解析粘贴到快速编辑",
  "定期删除旧工作树",
  "创建仓库",
  "新建仓库",
  "克隆仓库",
  "领取一个句柄",
  'label:"头像"',
  'label:"浅色主题"',
  '["行 "',
]) console.log(glass.includes(n) ? "HIT" : "MISS", n);
