# Launch hook: reapply the zh-pack, then start the Cursor GUI.
# IFEO is removed before any Cursor.exe process is created, and restored
# only after Start-Process has created the GUI process.
$ErrorActionPreference = "Continue"
$packRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$debuggerFile = Join-Path $packRoot "debugger.txt"
$ifeo = "HKCU:\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Cursor.exe"

function Remove-CursorIfeo {
  if (Test-Path -Path $ifeo) {
    Remove-ItemProperty -Path $ifeo -Name Debugger -ErrorAction SilentlyContinue
  }
}

function Restore-CursorIfeo {
  if (-not (Test-Path -LiteralPath $debuggerFile)) { return }
  $value = Get-Content -LiteralPath $debuggerFile -Raw
  if (-not $value) { return }
  $value = $value.Trim()
  if (-not $value) { return }
  if (-not (Test-Path -Path $ifeo)) {
    New-Item -Path $ifeo -Force | Out-Null
  }
  New-ItemProperty -Path $ifeo -Name Debugger -Value $value -PropertyType String -Force | Out-Null
}

function Resolve-CursorLaunch {
  param([string[]]$ArgList)
  $items = @($ArgList)
  $count = $items.Count
  $joined = ""
  for ($i = 0; $i -lt $count; $i++) {
    if ($i -gt 0) { $joined += " " }
    $joined += $items[$i]
    if (Test-Path -LiteralPath $joined) {
      $rest = @()
      if ($i + 1 -lt $count) {
        $rest = @($items[($i + 1)..($count - 1)])
      }
      return @{ Exe = $joined; Rest = $rest }
    }
  }
  $candidates = @()
  if ($env:LOCALAPPDATA) {
    $candidates += (Join-Path $env:LOCALAPPDATA "Programs\cursor\Cursor.exe")
  }
  if ($env:ProgramFiles) {
    $candidates += (Join-Path $env:ProgramFiles "Cursor\Cursor.exe")
  }
  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
      return @{ Exe = $candidate; Rest = @($items) }
    }
  }
  return $null
}

function Test-ZhPackNodeArgs {
  param([string[]]$Rest)
  foreach ($arg in @($Rest)) {
    if ($arg -and ($arg -like "*zh-pack.cjs")) { return $true }
  }
  return $false
}

$launchFailed = $false
Remove-CursorIfeo
try {
  $resolved = Resolve-CursorLaunch -ArgList @($args)
  if (-not $resolved) {
    Write-Host "Cursor.exe was not found."
    $launchFailed = $true
  } else {
    $cursor = $resolved.Exe
    $rest = @($resolved.Rest)
    $env:ELECTRON_RUN_AS_NODE = "1"
    $env:CURSOR_ZH_PACK_GUARDING = "1"
    try {
      if (Test-ZhPackNodeArgs -Rest $rest) {
        # install.cmd / uninstall.cmd / restart.cmd already asked to run zh-pack.
        # Keep that command on node. Do not also open the GUI.
        & $cursor @rest
      } else {
        $nodeScript = Join-Path $packRoot "lib\zh-pack.cjs"
        try {
          & $cursor $nodeScript "ensure"
        } catch {
          Write-Host $_.Exception.Message
        }
        Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
        Remove-Item Env:CURSOR_ZH_PACK_GUARDING -ErrorAction SilentlyContinue
        if ($rest.Count -gt 0) {
          Start-Process -FilePath $cursor -ArgumentList $rest | Out-Null
        } else {
          Start-Process -FilePath $cursor | Out-Null
        }
      }
    } finally {
      Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
      Remove-Item Env:CURSOR_ZH_PACK_GUARDING -ErrorAction SilentlyContinue
    }
  }
} finally {
  Restore-CursorIfeo
}
if ($launchFailed) { exit 1 }
