@echo off
call "%~dp0lib\run-zh-pack.cmd" install --interactive
exit /b %ERRORLEVEL%
