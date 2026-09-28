Cursor 汉化补丁 v{version}
==========================

为 Cursor 补充 {count} 条官方中文语言包没有覆盖的 Cursor 专属界面文字
（Agent、Blame、浏览器标签页、规则导入、登录策略等）。

安装
----
1. 解压整个文件夹（不要直接在压缩包里运行）。
2. 双击「install.cmd」。
3. 按提示选择 Y 自动重启 Cursor，或稍后双击「restart.cmd」。

安装程序会自动完成：
- 若未安装官方「简体中文语言包」，自动安装（需要联网）；
- 把补丁译文合并进语言包，原文件备份为 main.i18n.json.orig；
- 修补 Cursor 安装目录里写死英文的界面脚本（菜单、标题栏、Agent 输入框、Settings、Agents 窗口等），并备份原文件；
- 更新 product.json 完整性校验，避免出现「安装损坏」误报；
- 在 %USERPROFILE%\.cursor\argv.json 中加入 "locale": "zh-cn"，把显示语言设为简体中文；
- 清理旧的语言缓存。

若提示没有写入权限，请右键「install.cmd」选择以管理员身份运行。

卸载
----
双击「uninstall.cmd」，然后双击「restart.cmd」重启 Cursor。
会恢复为官方中文语言包原样，不会卸载语言包本身，也不会改回英文界面。

重启
----
汉化安装后必须完全重启才会生效。双击「restart.cmd」即可。
该命令只会关闭其他 Cursor 窗口，不会结束安装脚本自己。

注意
----
- 官方中文语言包更新后，补丁会被覆盖，重新双击「install.cmd」即可。
- Cursor 升级后会覆盖安装目录里的界面文件，请重新运行「install.cmd」。
- 登录页等少数未走菜单/文案常量的界面仍可能是英文。
- 需要 Windows 10 或更高版本，无需安装 Node.js。
