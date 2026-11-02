# 架构

本补丁不替换 Cursor，只在官方简体中文语言包之上叠加 Cursor 专属译文，并修补工作台里写死的英文。

## 四层

1. **NLS 叠加**  
   `translations/zh-cn/overlay.json` 与从官方语言包回收的 `recovered.json` 由 `tools/assemble.mjs` 合并为 `translations/main.i18n.json`。安装时写入  
   `%USERPROFILE%\.cursor\extensions\ms-ceintl.vscode-language-pack-zh-hans-*\translations\main.i18n.json`。

2. **JS 补丁**  
   `payload/hardcoded-zh.json` 按完整 JSON 字符串替换 `workbench.desktop.main.js` / `workbench.glass.main.js`。  
   `payload/hardcoded-context.json` 做上下文替换（`label:"…"`、`children:"…"`、完整性函数等），避免短词误伤。

3. **DOM 注入**  
   `payload/cursor-zh-ui.js` 挂到 `workbench.html`。`dom-extra-zh.json` 来自官方语言包反转，只改可见文本；`dom-glass-zh.json` 覆盖 Agents 窗口短标签。短词只在设置/标题栏/菜单等 chrome 区域生效。

4. **完整性**  
   按 SHA-256 Base64（无 padding）重写 `product.json` 的 `checksums`。Agents 窗口另有一套 `_isPure`，安装时一并短路，避免误报「安装似乎损坏」。

## 安装时还会写

- `%USERPROFILE%\.cursor\argv.json` 的 `"locale": "zh-cn"`（`locale.json` 不生效）
- 两个 Cursor 根目录：`%ProgramFiles%\Cursor` 与 `%LOCALAPPDATA%\Programs\cursor`
- `extensions/git/package.nls.json` 的欢迎页文案（`payload/git-nls-zh.json`）
- 把安装器和 `payload/` 复制到 `%USERPROFILE%\.cursor\zh-pack\`，并在当前用户的 Image File Execution Options 中登记 `Cursor.exe` 启动钩子（`installer/lib/guard.ps1`）

## 更新后自动恢复

Cursor 升级会换掉安装目录里的界面脚本，官方语言包更新会换掉 `main.i18n.json`。这两件事都发生在主进程生成语言缓存之前，所以要在下次启动前重新打补丁。

钩子先去掉 IFEO，再用 `ELECTRON_RUN_AS_NODE=1` 运行 `zh-pack.cjs ensure`，确认界面进程已经创建后才把钩子登记回去。`install.cmd`、`uninstall.cmd` 和 `restart.cmd` 本身就是通过 `Cursor.exe` 启动的，钩子认出参数里的 `zh-pack.cjs` 后原样执行，不再额外打开界面。`ensure` 在 HTML 标记、`main.i18n.json` 里的 `zhPack` 标记，以及已记录的 commit / 版本都一致时什么都不改。标记丢失或版本变化时会重新合并译文、修补界面并清掉 `clp` 里的 `zh-cn` 缓存。

## 不翻译

- 产品名：Cursor、Agent、Tab、MCP、Composer、Blame
- 占位符：`{0}`、`#setting#`、`.cursor/` 路径
- 用户仓库/项目名（例如本地文件夹名）
- 存储用英文 ID（如 `fastest`、`auto (default)` 只在 DOM 层显示中文）
