@echo off
call "%~dp0lib\run-zh-pack.cmd" restart --interactive
exit /b %ERRORLEVEL%
