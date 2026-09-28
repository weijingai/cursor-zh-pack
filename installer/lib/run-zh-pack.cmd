@echo off
setlocal EnableExtensions
call "%~dp0find-cursor.cmd"
if not defined CURSOR_EXE goto notfound

set "ELECTRON_RUN_AS_NODE=1"
"%CURSOR_EXE%" "%~dp0zh-pack.cjs" %*
endlocal & exit /b %ERRORLEVEL%

:notfound
echo Cursor.exe was not found. Please install Cursor first.
pause
exit /b 1
