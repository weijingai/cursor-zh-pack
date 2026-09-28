@echo off
set "CURSOR_EXE="
if exist "%LOCALAPPDATA%\Programs\cursor\Cursor.exe" set "CURSOR_EXE=%LOCALAPPDATA%\Programs\cursor\Cursor.exe"
if not defined CURSOR_EXE if exist "%ProgramFiles%\Cursor\Cursor.exe" set "CURSOR_EXE=%ProgramFiles%\Cursor\Cursor.exe"
if defined CURSOR_EXE exit /b 0
for /f "delims=" %%C in ('where cursor.cmd 2^>nul') do (
  if not defined CURSOR_EXE if exist "%%~dpC..\..\..\Cursor.exe" set "CURSOR_EXE=%%~dpC..\..\..\Cursor.exe"
)
exit /b 0
