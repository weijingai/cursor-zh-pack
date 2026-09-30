# 开发

## 加一条译文

1. 能走 NLS 的：写进 `translations/zh-cn/overlay.json`，模块 ID 必须与 `nls.keys.json` 一致。
2. 工作台写死英文：加到 `payload/hardcoded-zh.json`（整句）或 `payload/hardcoded-context.json`（带上下文）。
3. 动态渲染：加到 `payload/dom-glass-zh.json`，或通过 `tools/sync-hardcoded.mjs` 的 `SHORT` / `PREFIXES`。
4. Git 欢迎页：改 `payload/git-nls-zh.json`。
5. 用词先看 `glossary/zh-cn.json`。

然后：

```bat
npm run assemble
npm run sync-hardcoded
npm run deploy
```

改完必须完全重启 Cursor。可双击 `installer/restart.cmd`，或在本仓库回复「执行重启」。

## 核心脚本

| 文件 | 作用 |
| --- | --- |
| `tools/assemble.mjs` | 组装 NLS |
| `tools/sync-hardcoded.mjs` | 生成 `hardcoded-ui.json` 与注入脚本 |
| `tools/build-installer.mjs` | 打 zip |
| `installer/lib/zh-pack.cjs` | 安装 / 卸载 / 重启 |
| `tools/recover-official.mjs` | 从官方语言包回收译文（可选，依赖 TypeSafe） |
| `tools/scratch/` | 历史一次性提取、合并、核对脚本 |

## 注意

- `.cmd` 保持 ASCII，不要写 `chcp`。
- 不要全局替换过短的词（`On`、`Fast`、`Compact`），用上下文或 DOM SHORT。
- 安装后核对 `product.json` checksums 与 `_isPure` 是否已打上。
