# Changelog

All notable changes to this project are documented in this file.

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
