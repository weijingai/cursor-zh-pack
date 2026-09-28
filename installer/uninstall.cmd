@echo off
call "%~dp0lib\run-zh-pack.cmd" uninstall --interactive
exit /b %ERRORLEVEL%
