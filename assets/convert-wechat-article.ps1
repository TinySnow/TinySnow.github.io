[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$InputPath = "assets/wechat-origin.md",

    [string]$OutputDirectory = "src/生活碎笔/文章与写作",

    [string]$Title,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

# "Run with PowerShell" starts the script from the assets directory (and closes
# the transient console immediately). Keep all default paths rooted at the
# repository, and leave Explorer-launched windows open so errors are visible.
$projectRoot = Split-Path -Parent $PSScriptRoot
$launchedFromExplorer = $false
try {
    $parentProcessId = (Get-CimInstance Win32_Process -Filter "ProcessId=$PID").ParentProcessId
    $launchedFromExplorer = (Get-Process -Id $parentProcessId).ProcessName -eq 'explorer'
}
catch {
}

function Wait-ForDirectLaunch {
    if ($launchedFromExplorer) {
        Read-Host '按 Enter 关闭此窗口' | Out-Null
    }
}

trap {
    Write-Host "转换失败：$($_.Exception.Message)" -ForegroundColor Red
    Wait-ForDirectLaunch
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

    $title = ([string]$Title).Trim()

    if ([string]::IsNullOrWhiteSpace($title) -and -not [string]::IsNullOrWhiteSpace($trailingTitle)) {
        $title = $trailingTitle
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
        try {
            $title = ([string](Get-Clipboard -Raw -ErrorAction Stop)).Trim()
        }
        catch {
        throw "The input has no level-one title and the clipboard could not be read. Copy the title before running, paste it as the final standalone line, or pass -Title '文章标题'."
        }
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
        throw "The input has no level-one title and the clipboard is empty. Copy the title before running, paste it as the final standalone line, or pass -Title '文章标题'."
    }

    if ($title -match "`r|`n") {
        throw "The input has no level-one title, but the clipboard contains multiple lines. Copy only the article title, or pass -Title '文章标题'."
    }

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
Wait-ForDirectLaunch
