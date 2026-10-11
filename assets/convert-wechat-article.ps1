[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$InputPath = "assets/wechat-origin.md",

    [string]$OutputDirectory = "src/生活碎笔/文章与写作",

    [string]$Title,

    [switch]$Force,

    [switch]$NoPause
)

$ErrorActionPreference = "Stop"

# A shell-launched script gets a console window of its own, and that window
# closes the moment the script ends. Keep all default paths rooted at the
# repository, and keep such a window open so the result stays readable.
$projectRoot = Split-Path -Parent $PSScriptRoot

function Test-ShellLaunched {
    # Walk up the process tree: a double-click, "Open with" or "Run with
    # PowerShell" launch ends at a shell host, an ordinary console run does not.
    $shellHosts = @(
        'explorer.exe'
        'dllhost.exe'
        'shellexperiencehost.exe'
        'startmenuexperiencehost.exe'
        'runtimebroker.exe'
        'applicationframehost.exe'
    )

    $currentProcessId = $PID
    for ($depth = 0; $depth -lt 6; $depth++) {
        $process = Get-CimInstance Win32_Process -Filter "ProcessId=$currentProcessId" -ErrorAction SilentlyContinue
        if (-not $process) { return $false }

        $parentProcessId = [int]$process.ParentProcessId
        if ($parentProcessId -le 0 -or $parentProcessId -eq $currentProcessId) { return $false }

        $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$parentProcessId" -ErrorAction SilentlyContinue
        if (-not $parent) { return $false }

        if ($shellHosts -contains $parent.Name.ToLowerInvariant()) { return $true }

        $currentProcessId = $parentProcessId
    }

    return $false
}

function Test-InteractiveConsole {
    # A windowed console (double-click, "Run with PowerShell", a terminal tab)
    # redirects neither stdin nor stdout; a piped run does.
    if ($Host.Name -ne 'ConsoleHost') { return $false }
    if ([Console]::IsInputRedirected) { return $false }
    if ([Console]::IsOutputRedirected) { return $false }

    return $true
}

$shellLaunched = $false
try { $shellLaunched = Test-ShellLaunched } catch { }

# Pause rules, most explicit first:
#   1. -NoPause              never pause;
#   2. CONVERT_WECHAT_PAUSE  0 = never, 1 = always;
#   3. redirected stdin      never pause, so a piped or agent-driven run cannot
#      block on Read-Host even if the process tree ends at a shell host;
#   4. shell launch, or an interactive console  pause, because a human is
#      looking at this window (double-click, "Open with", terminal tab).
$pauseBeforeExit = $false
if (-not $NoPause) {
    if ($env:CONVERT_WECHAT_PAUSE -eq '0') {
        $pauseBeforeExit = $false
    }
    elseif ($env:CONVERT_WECHAT_PAUSE -eq '1') {
        $pauseBeforeExit = $true
    }
    elseif ([Console]::IsInputRedirected) {
        $pauseBeforeExit = $false
    }
    elseif ($shellLaunched -or (Test-InteractiveConsole)) {
        $pauseBeforeExit = $true
    }
}

function Wait-BeforeExit {
    if (-not $pauseBeforeExit) { return }

    Read-Host '按 Enter 关闭此窗口' | Out-Null
}

trap {
    Write-Host "转换失败：$($_.Exception.Message)" -ForegroundColor Red
    Wait-BeforeExit
    exit 1
}

function Resolve-ProjectPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }

    return [System.IO.Path]::GetFullPath((Join-Path $projectRoot $Path))
}

function Normalize-Body {
    param([Parameter(Mandatory = $true)][string]$Body)

    $normalized = $Body.Trim("`n")

    # A normal Markdown paragraph has one blank line. Two or more consecutive
    # blank lines in the WeChat export represent a deliberate section break.
    $normalized = [regex]::Replace(
        $normalized,
        "`n(?:[ `t]*`n){2,}",
        "`n`n<br />`n`n"
    )

    # Existing articles always put a visual break before the author signature.
    $signature = [regex]::Match(
        $normalized,
        '(?m)^　　南国微雪 Miyuki[ \t]*$'
    )
    if ($signature.Success) {
        $beforeSignature = $normalized.Substring(0, $signature.Index).TrimEnd()
        if (-not $beforeSignature.EndsWith('<br />')) {
            $afterSignature = $normalized.Substring($signature.Index)
            $normalized = "$beforeSignature`n`n<br />`n`n$afterSignature"
        }
    }

    return $normalized.Trim("`n")
}

function Test-UsableTitle {
    param([Parameter(Mandatory = $true)][string]$Candidate)

    if ([string]::IsNullOrWhiteSpace($Candidate)) { return $false }
    if ($Candidate -match "`r|`n") { return $false }

    foreach ($invalidCharacter in [System.IO.Path]::GetInvalidFileNameChars()) {
        if ($Candidate.Contains([string]$invalidCharacter)) { return $false }
    }

    return $true
}

function Resolve-ArticleTitle {
    param([string]$ExplicitTitle, [string]$TrailingTitle)

    $candidates = @()
    if (-not [string]::IsNullOrWhiteSpace($ExplicitTitle)) {
        $candidates += [pscustomobject]@{ Source = '-Title 参数'; Value = $ExplicitTitle.Trim() }
    }
    if (-not [string]::IsNullOrWhiteSpace($TrailingTitle)) {
        $candidates += [pscustomobject]@{ Source = '输入末尾的标题行'; Value = $TrailingTitle.Trim() }
    }

    try {
        $clipboardText = ([string](Get-Clipboard -Raw -ErrorAction Stop)).Trim()
        if (-not [string]::IsNullOrWhiteSpace($clipboardText)) {
            $candidates += [pscustomobject]@{ Source = '剪贴板'; Value = $clipboardText }
        }
    }
    catch {
    }

    # A stale clipboard (a copied path, a whole paragraph) must not abort the
    # run: report why the candidate was skipped and keep looking.
    foreach ($candidate in $candidates) {
        if (Test-UsableTitle -Candidate $candidate.Value) { return $candidate.Value }

        $preview = $candidate.Value -replace "`r?`n", ' / '
        Write-Host "已忽略$($candidate.Source)中的标题（含换行或 Windows 文件名非法字符）：$preview" -ForegroundColor Yellow
    }

    if (Test-InteractiveConsole) {
        Write-Host '输入里没有一级标题，剪贴板里也没有可用的单行标题。' -ForegroundColor Yellow
        for ($attempt = 0; $attempt -lt 5; $attempt++) {
            $answer = [string](Read-Host '请输入文章标题（直接回车取消）')
            if ([string]::IsNullOrWhiteSpace($answer)) { break }

            $answer = $answer.Trim()
            if (Test-UsableTitle -Candidate $answer) { return $answer }

            Write-Host '标题不能含换行，也不能含 \ / : * ? " < > | 等字符，请重试。' -ForegroundColor Yellow
        }
    }

    throw '输入没有一级标题，且未能从 -Title、末尾标题行、剪贴板或手动输入得到可用标题。请复制标题后重试，或把标题粘成输入的最后一行，或使用 -Title "文章标题"。'
}

$inputFullPath = Resolve-ProjectPath -Path $InputPath
if (-not (Test-Path -LiteralPath $inputFullPath -PathType Leaf)) {
    throw "Input file does not exist: $inputFullPath"
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$content = [System.IO.File]::ReadAllText($inputFullPath, $utf8NoBom)
$content = $content.TrimStart([char]0xFEFF) -replace "`r`n?", "`n"

$titleMatch = [regex]::Match($content, '(?m)^# (?!#)(.+?)[ \t]*$')
if ($titleMatch.Success) {
    $title = $titleMatch.Groups[1].Value.Trim()
}
else {
    # A plain title may optionally be pasted as the last standalone line after
    # the cover credit. Remove it from there before adding the canonical H1.
    $trailingTitleMatch = [regex]::Match(
        $content,
        '(?ms)(^> 图源 \| [^\n]+[ \t]*\n+)([^#>!<\n][^\n]*?)[ \t]*\n*\z'
    )
    $trailingTitle = ''
    if ($trailingTitleMatch.Success) {
        $trailingTitle = $trailingTitleMatch.Groups[2].Value.Trim()
        $content = $content.Substring(0, $trailingTitleMatch.Groups[2].Index).TrimEnd() + "`n"
    }

    $title = Resolve-ArticleTitle -ExplicitTitle ([string]$Title) -TrailingTitle $trailingTitle

    # The rest of the converter can now use one canonical input shape.
    $content = "# $title`n`n" + $content.TrimStart("`n")
}

$invalidCharacters = [System.IO.Path]::GetInvalidFileNameChars() |
    Where-Object { $title.Contains([string]$_) }
if ($invalidCharacters.Count -gt 0) {
    $displayCharacters = ($invalidCharacters | ForEach-Object { "[$_]" }) -join ' '
    throw "The article title contains characters that Windows cannot use in a filename: $displayCharacters"
}

# Convert the word-count/tag line under 写在前面 from a WeChat-style quote
# into the exact centered HTML used by the existing blog articles.
$metadataPattern = '(?m)^>?[ \t]*(\d+[ \t]*字(?:[ \t]*\|[ \t]*[^\r\n]+)*)[ \t]*$'
$metadataMatch = [regex]::Match($content, $metadataPattern)
if (-not $metadataMatch.Success) {
    throw 'No word-count/tag line was found (expected a line such as "> 935 字 | 标签").'
}

$metadata = $metadataMatch.Groups[1].Value.Trim()
$metadataHtml = '<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">' +
    $metadata + '</p>'
$content = $content.Substring(0, $metadataMatch.Index) +
    $metadataHtml +
    $content.Substring($metadataMatch.Index + $metadataMatch.Length)

$bodyMatch = [regex]::Match(
    $content,
    '(?ms)(^## 正文[ \t]*\n+)(.*?)(?=^## |\z)'
)
if (-not $bodyMatch.Success) {
    throw 'No "## 正文" section was found.'
}

$normalizedBody = Normalize-Body -Body $bodyMatch.Groups[2].Value
$content = $content.Substring(0, $bodyMatch.Groups[2].Index) +
    $normalizedBody + "`n`n" +
    $content.Substring($bodyMatch.Groups[2].Index + $bodyMatch.Groups[2].Length).TrimStart("`n")

# The copied WeChat Markdown uses a generic alt label. Existing cover images use
# an intentionally empty alt label, so only normalize this exact generic form.
$content = [regex]::Replace($content, '(?m)^!\[img\](\([^\r\n]+\))[ \t]*$', '![]$1')

# Normalize excessive whitespace introduced by reconstruction while preserving
# single blank lines between Markdown blocks.
$content = $content.Trim() + "`n"

$outputFullDirectory = Resolve-ProjectPath -Path $OutputDirectory
[System.IO.Directory]::CreateDirectory($outputFullDirectory) | Out-Null
$outputPath = Join-Path $outputFullDirectory ($title + '.md')

if ((Test-Path -LiteralPath $outputPath) -and -not $Force) {
    throw "Output already exists: $outputPath`nRun again with -Force only if replacing it is intentional."
}

[System.IO.File]::WriteAllText($outputPath, $content, $utf8NoBom)
Write-Output $outputPath
Wait-BeforeExit
