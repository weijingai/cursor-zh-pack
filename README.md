# Cursor 简体中文补丁（cursor-zh-pack）

**版本：** v0.2.0  
**许可：** MIT  
**平台：** Windows 10 及以上  
**适用：** Cursor 桌面客户端（已验证 3.22.x）

为 Cursor 补充官方「简体中文语言包」没有覆盖的 Cursor 专属界面：Settings、Agents 窗口、标题栏、菜单、状态栏、欢迎页、Git 空仓库说明等。

仓库：https://github.com/weijingai/cursor-zh-pack

## 功能

- 把 Cursor 专属 NLS 译文合并进官方语言包 `MS-CEINTL.vscode-language-pack-zh-hans`
- 修补工作台里写死的英文（Settings、Agents Window、菜单、关闭确认等）
- 注入 DOM 汉化脚本，覆盖动态渲染的界面
- 同步更新 `product.json` 完整性校验，并绕过 Agents 窗口误报「安装似乎损坏」
- 写入 Git 扩展欢迎文案（`extensions/git/package.nls.json`）
- 安装脚本为纯 ASCII，避免 Windows `cmd` 把 `Cursor` 拆成 `'sor' is not recognized`

术语与 [Cursor 官方中文文档](https://cursor.com/cn/docs) 对齐：产品名保留 Agent / Tab / MCP，Hooks 译为「钩子」，Tab 状态使用「暂停 / 全局禁用」。

## 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 10 或更高版本 |
| Cursor | 已安装桌面版 |
| Node.js | **终端用户不需要**。从源码构建时需要 Node.js 20+ |
| 权限 | 写入 Cursor 安装目录时可能需要管理员权限 |

## 安装（终端用户）

1. 从 [Releases](https://github.com/weijingai/cursor-zh-pack/releases) 下载并解压整个文件夹（不要在压缩包内直接运行）。
2. 双击 `install.cmd`。
3. 按提示选择是否立即重启 Cursor；也可稍后双击 `restart.cmd`。

安装程序会：

- 若未安装官方简体中文语言包，则自动安装（需联网）
- 把补丁合并进语言包，原文件备份为 `main.i18n.json.orig`
- 修补 Cursor 安装目录中的界面脚本，并备份为 `*.zhpack-orig`
- 在 `%USERPROFILE%\.cursor\argv.json` 写入 `"locale": "zh-cn"`
- 更新 `product.json` 校验和
- 清理旧的语言缓存

没有写入权限时，请右键 `install.cmd` → 以管理员身份运行。

**必须完全退出再打开 Cursor** 才会生效（不要只重载窗口）。

## 卸载

1. 双击 `uninstall.cmd`
2. 双击 `restart.cmd`

会还原被修补的界面文件和语言包补丁，不会卸载官方中文语言包，也不会把界面改回英文。

## 从源码构建

```bat
npm install
npm run build
```

产物在 `dist/cursor-zh-pack-v0.2.0.zip`。

| 命令 | 作用 |
| --- | --- |
| `npm run assemble` | 组装 `translations/main.i18n.json` |
| `npm run sync-hardcoded` | 同步硬编码文案与注入脚本 |
| `npm run build` | 组装 + 同步 + 打包安装器 |
| `npm run deploy` | 安装到本机 Cursor |
| `npm run restore` | 卸载补丁 |
| `npm run restart` | 重启本机其他 Cursor 窗口 |

## 目录结构

```
installer/          安装、卸载、重启脚本
payload/            JS/DOM 译文与注入脚本
translations/       NLS 叠加层与组装结果
glossary/           产品名与用词约定
catalog/            模块目录与覆盖率（scratch/ 为扫描底稿）
tools/              组装与校验（scratch/ 为一次性脚本）
language-pack/      实验性独立语言包（当前安装方案不使用）
docs/               架构与开发说明
```

更细的原理见 [docs/architecture.md](docs/architecture.md)，扩写译文见 [docs/development.md](docs/development.md)。

## 已知限制

- Cursor 升级后会覆盖安装目录文件，需重新运行 `install.cmd`
- 官方语言包更新后也会覆盖补丁，同样重新安装即可
- 登录页等未走菜单/文案常量的界面仍可能是英文
- 本补丁会修改 Cursor 安装目录；卸载可还原备份
- 用户仓库名（例如本地项目文件夹名）不会被翻译

## 许可证

MIT。见 [LICENSE](LICENSE)。Cursor 与 VS Code 分别为其各自所有者的商标；本仓库只提供界面译文叠加，不附带官方客户端。
