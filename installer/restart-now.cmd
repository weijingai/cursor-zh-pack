@echo off
setlocal EnableExtensions
set /a n=0
ping -n 3 127.0.0.1 >nul
taskkill /IM Cursor.exe >nul 2>&1
:wait
set /a n+=1
if %n% GTR 45 goto launch
tasklist /FI "IMAGENAME eq Cursor.exe" 2>nul | find /I "Cursor.exe" >nul
if not errorlevel 1 (
  ping -n 2 127.0.0.1 >nul
  goto wait
)
:launch
if exist "%ProgramFiles%\Cursor\Cursor.exe" (
  start "" "%ProgramFiles%\Cursor\Cursor.exe"
) else if exist "%LOCALAPPDATA%\Programs\cursor\Cursor.exe" (
  start "" "%LOCALAPPDATA%\Programs\cursor\Cursor.exe"
)
endlocal
