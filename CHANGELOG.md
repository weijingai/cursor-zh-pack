# Changelog

All notable changes to this project are documented in this file.

逐次汉化与安装操作见 [docs/operations.md](docs/operations.md)。

## Unreleased

- 安装后登记当前用户启动钩子。Cursor 版本更新或官方语言包更新覆盖补丁后，下次启动前自动重新套用汉化
- 语言包文件被整文件替换时，以新的官方译文为底再合并补丁

## 0.2.1 — 2026-10-10

Browser 标签页菜单与 Agents 操作汉化，并发布到公开仓库。

- Take Screenshot / Capture Area Screenshot / Hard Reload / Copy Current URL
- Show Bookmark Bar / Clear Browsing History / Clear Cookies / Clear Cache
- Hide/Show Favorites & History
- Mark as Read
- Fork / Move to / Archive（含 Unarchive、Archive All Below）
- 已安装到本机两个 Cursor 根目录；需完全重启后生效

## 0.2.0 — 2026-09-30

First public release.

- Settings / Agents / menubar / welcome / Git empty-state / model picker strings
- DOM injector plus official-pack invert map for leftover VS Code setting titles
- Integrity checksum updates and Agents-window `_isPure` bypass so Cursor does not report a corrupt install
- Git extension `package.nls.json` overlay for SCM welcome copy
- Detached `restart-now.cmd` for a full Cursor relaunch
- Repository reorganized: pipeline tools vs `tools/scratch`, catalog vs `catalog/scratch`
- License changed to MIT; repository visibility set to public

## 0.1.0 — 2026-09-28

First private preview.

- Simplified Chinese overlay for Cursor-specific UI not covered by the official language pack
- Settings sidebar and Agents Window translations via NLS, workbench JS patches, and DOM injection
- Installer updates `product.json` checksums so Cursor does not report a corrupt installation
- ASCII-only `.cmd` launchers (no `chcp 65001`) to avoid the Windows `'sor' is not recognized` error
- Locale is written to `%USERPROFILE%\.cursor\argv.json` as `zh-cn`
- Windows installer: `install.cmd` / `uninstall.cmd` / `restart.cmd` (no Node.js required at runtime)
