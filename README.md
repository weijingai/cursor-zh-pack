# Cursor 简体中文补丁（cursor-zh-pack）

**版本：** v0.1.0  
**状态：** 私人仓库，不对外公开  
**平台：** Windows 10 及以上  
**适用：** Cursor 桌面客户端（已验证 3.22.x）

为 Cursor 补充官方「简体中文语言包」没有覆盖的 Cursor 专属界面：Settings 侧栏、Agents 窗口、标题栏、菜单、聊天输入框等。

本仓库仅供所有者私人使用，禁止公开分发、转载或二次上架。仓库地址：https://github.com/weijingai/cursor-zh-pack （私有）。

## 功能

- 合并 Cursor 专属 NLS 译文到官方语言包 `MS-CEINTL.vscode-language-pack-zh-hans`
- 修补工作台里写死的英文（Settings 导航、Agents Window 文案等）
- 注入 DOM 汉化脚本，覆盖动态渲染的界面
- 同步更新 `product.json` 完整性校验，避免出现「安装似乎损坏，请重新安装」误报
- 安装脚本为纯 ASCII，避免 Windows `cmd` 把 `Cursor` 拆成 `'sor' is not recognized`

## 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 10 或更高版本 |
| Cursor | 已安装桌面版 |
| Node.js | **终端用户不需要**。从源码构建时需要 Node.js 20+ |
| 权限 | 写入 Cursor 安装目录时可能需要管理员权限 |

## 安装（终端用户）

1. 解压发布包整个文件夹（不要在压缩包内直接运行）。
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

产物在 `dist/cursor-zh-pack-v0.1.0.zip`。

常用脚本：

| 命令 | 作用 |
| --- | --- |
| `npm run assemble` | 组装 `translations/main.i18n.json` |
| `npm run sync-hardcoded` | 同步硬编码文案与注入脚本 |
| `npm run build` | 组装 + 同步 + 打包安装器 |
| `npm run deploy` | 安装到本机 Cursor |
| `npm run restore` | 卸载补丁 |
| `npm run restart` | 重启本机其他 Cursor 窗口 |

## 工作原理

1. **NLS 叠加：** `translations/zh-cn/overlay.json` 与官方译文回收结果合并后写入语言包。
2. **JS 补丁：** 替换 `workbench.desktop.main.js` / `workbench.glass.main.js` 中的写死英文字符串。
3. **DOM 注入：** 通过 `workbench.html` 加载 `cursor-zh-ui.js`，翻译动态节点。
4. **完整性：** 按 VS Code/Cursor 规则重算 SHA-256（Base64）并写回 `product.json` 的 `checksums`。

## 已知限制

- Cursor 升级后会覆盖安装目录文件，需重新运行 `install.cmd`
- 官方语言包更新后也会覆盖补丁，同样重新安装即可
- 登录页等未走菜单/文案常量的界面仍可能是英文
- 本补丁会修改 Cursor 安装目录；卸载可还原备份

## 版本

当前发布版本为 **v0.1.0**（首个私人预览版）。变更记录见 [CHANGELOG.md](CHANGELOG.md)。

## 许可证

未授权公开使用。版权与使用范围见 [LICENSE](LICENSE)。
