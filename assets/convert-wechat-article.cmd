@echo off
rem ===========================================================================
rem  Double-click launcher for convert-wechat-article.ps1
rem
rem  Why this file exists:
rem    * This machine has no "Microsoft.PowerShellScript.1" registration, so
rem      Explorer offers no "Run with PowerShell" entry for .ps1 files
rem      (HKLM\SOFTWARE\Classes\.ps1 does not exist either).
rem    * The .ps1 extension may be associated with Notepad, in which case a
rem      double-click only opens the source instead of running it.
rem    * A bare "& .\convert-wechat-article.ps1" call can be rejected by the
rem      machine execution policy ("... is not digitally signed").
rem
rem  This launcher starts Windows PowerShell 5.1 with a process-scope Bypass
rem  and forwards every argument. Whether the window stays open is decided by
rem  the .ps1 itself (see Wait-BeforeExit there): a double-click keeps the
rem  result readable, while a piped or automated run never blocks.
rem
rem  Keep this file ASCII-only: cmd.exe reads batch files with the OEM code
rem  page, so non-ASCII text here turns into mojibake. The .ps1 owns all
rem  Chinese output and stays UTF-8 with BOM.
rem ===========================================================================
setlocal

set "SCRIPT=%~dp0convert-wechat-article.ps1"
if not exist "%SCRIPT%" (
    echo [ERROR] Missing: "%SCRIPT%"
    pause
    exit /b 1
)

set "PSEXE=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"
if not exist "%PSEXE%" set "PSEXE=powershell.exe"

"%PSEXE%" -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%" %*
set "RC=%ERRORLEVEL%"

endlocal & exit /b %RC%
