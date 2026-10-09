# 操作与版本记录

按时间记录每次汉化需求、安装与发布。版本号以 `package.json` / Git tag / GitHub Release 为准。

## v0.2.1 — 2026-10-10

**Git：** 待发布 tag `v0.2.1`  
**操作：** 新增浏览器与 Agents 菜单汉化 → 安装到本机 → 提交并公开发布。

| 原文 | 中文 |
| --- | --- |
| Take Screenshot | 截取屏幕截图 |
| Capture Area Screenshot | 截取区域截图 |
| Hard Reload | 强制重新加载 |
| Copy Current URL | 复制当前网址 |
| Show Bookmark Bar | 显示书签栏 |
| Clear Browsing History | 清除浏览历史 |
| Clear Cookies | 清除 Cookie |
| Clear Cache | 清除缓存 |
| Hide Favorites & History | 隐藏收藏与历史 |
| Show Favorites & History | 显示收藏与历史 |
| Mark as Read | 标为已读 |
| Fork | 派生 |
| Move to | 移动到 |
| Archive | 归档 |
| Unarchive | 取消归档 |
| Archive All Below | 归档下方全部 |

涉及：`payload/hardcoded-zh.json`、`hardcoded-context.json`、`dom-glass-zh.json`、`tools/sync-hardcoded.mjs`、`tools/scratch/merge-browser-agent-ui.mjs`。

## v0.2.0 — 2026-09-30

**Git：** `cc39119` / tag `v0.2.0`  
**操作：** 整理仓库结构、改为 MIT、公开 GitHub、发布安装包。此前私有预览之后、公开前的本机汉化批次一并纳入该版本：

- IDE 菜单栏（含二级及以下）、欢迎页、UNC/安全设置
- VS Code 设置逐层标题与说明、Agents 首页/侧栏/自动化/模板
- 关闭确认：Agent is still working、Resume agent automatically、Close anyway
- Compact / Detailed、View all models、Browser Tab、Install update、Fast、Effort
- Hide Sidebar、Cursor Tab（Tab 补全）、Git 空仓库说明、导入本地扩展
- VS Code 设置左侧栏折叠项；修复 Agents 窗口「安装似乎损坏」
- 官方语言包 + overlay 方案（曾试独立语言包后改回）

## v0.1.0 — 2026-09-28

**Git：** `56e97b0` / tag `v0.1.0`（当时为私有仓库）  
**操作：** 首个安装器与 NLS/JS/DOM 三层汉化框架。

- 叠加官方 `MS-CEINTL.vscode-language-pack-zh-hans`
- 修补 `workbench.desktop.main.js` / `workbench.glass.main.js`
- 写入 `argv.json` locale `zh-cn`
- 更新 `product.json` checksums
- ASCII `.cmd`，避免 `'sor' is not recognized`
