#!/usr/bin/env bash

# ==============================================================================
# 生成 src/last-updated.md
#
# 该脚本是 “最近更新” 页面生成器，输出结构固定为：
# - H1 标题
# - Prenote 提示
# - Summary（生成时间、基准提交、diff 来源、统计）
# - Index（文件索引 + +/-）
# - 每个文件一个可折叠 diff 区块
#
# 支持两种 diff 来源：
# 1) --staged（默认）
#    基于 git 暂存区，适合本地预览“即将提交”的变化。
# 2) --range "<A..B>"
#    基于提交范围，适合 CI（与 GitHub Actions 事件 before..after 对齐）。
#
# 关键约束：
# - 默认排除 src/last-updated.md（避免自引用递归膨胀）
# - 默认排除 src/sitemap.xml（该文件时间戳噪音大，几乎每次都变）
# - 保留 sitemap.txt（文章新增时具有信息价值）
#
# 依赖：
# - git、bash、sed、awk、cksum、mktemp
# ==============================================================================

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -d "${SCRIPT_DIR}/src" ]]; then
  PROOT="${SCRIPT_DIR}"
elif [[ -d "${SCRIPT_DIR}/../src" ]]; then
  PROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
else
  echo "Error: cannot locate project root with src/ directory." >&2
  exit 1
fi

OUTPUT_FILE="${PROOT}/src/last-updated.md"

TITLE="最近更新 | Last Updated"
NOTICE_CONTENT="NOTICE: This content is presented as \`git diff\`."
FENCE="~~~~~"

MODE="staged"
GIT_RANGE=""

# 默认排除 generated 文件自身和 sitemap.xml（仅时间戳噪音）
EXCLUDE_FILES=(
  "src/last-updated.md"
  "src/sitemap.xml"
)

usage() {
  # 打印脚本帮助信息。
  cat <<'EOF'
Usage:
  ./generate-last-updated-md.sh [--staged] [--range <git-range>] [--output <path>]

Options:
  --staged             Use staged diff (default).
  --range <range>      Use git range diff, e.g. abc123..def456.
  --output <path>      Output markdown file path.
  -h, --help           Show this help.
EOF
}

# 参数解析：将用户意图映射到 MODE + GIT_RANGE + OUTPUT_FILE。
while [[ $# -gt 0 ]]; do
  case "$1" in
    --staged)
      MODE="staged"
      GIT_RANGE=""
      shift
      ;;
    --range)
      if [[ $# -lt 2 ]]; then
        echo "Error: --range requires a value." >&2
        exit 1
      fi
      MODE="range"
      GIT_RANGE="$2"
      shift 2
      ;;
    --output)
      if [[ $# -lt 2 ]]; then
        echo "Error: --output requires a value." >&2
        exit 1
      fi
      OUTPUT_FILE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ "${MODE}" == "range" && -z "${GIT_RANGE}" ]]; then
  echo "Error: range mode requires a non-empty git range." >&2
  exit 1
fi

# 防御式检查：防止在错误目录下执行并误写文件。
if ! git -C "${PROOT}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: ${PROOT} is not a git repository." >&2
  exit 1
fi

if [[ ! -d "${PROOT}/src" ]]; then
  echo "Error: ${PROOT}/src does not exist." >&2
  exit 1
fi

TMP_ROOT="${TMPDIR:-/tmp}"
TMP_DIR="$(mktemp -d "${TMP_ROOT%/}/last-updated.XXXXXX")"
# 无论成功或失败都清理临时目录，避免残留 patch 文件。
cleanup() {
  # 删除用于缓存每个文件 patch 的临时目录。
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

in_excludes() {
  # 判断文件是否在默认排除列表中。
  # 目的：避免 last-updated 自引用、避免 sitemap.xml 时间戳噪音。
  local target="$1"
  local excluded
  for excluded in "${EXCLUDE_FILES[@]}"; do
    if [[ "${target}" == "${excluded}" ]]; then
      return 0
    fi
  done
  return 1
}

make_anchor() {
  # 为每个文件生成稳定且可跳转的锚点 id。
  # 规则：
  # 1) 先把路径做 slug 化（仅保留字母数字，其他字符压成 -）
  # 2) 再拼接 cksum，避免不同路径 slug 冲突
  local file_path="$1"
  local index="$2"
  local slug checksum

  # sed 正则说明：
  # - s/[^[:alnum:]]+/-/g: 将连续非字母数字字符压缩为一个 -
  # - s/^-+//: 去掉开头连续 -
  # - s/-+$//: 去掉结尾连续 -
  slug="$(printf '%s' "${file_path}" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^[:alnum:]]+/-/g; s/^-+//; s/-+$//')"
  checksum="$(printf '%s' "${file_path}" | cksum | awk '{print $1}')"

  if [[ -z "${slug}" ]]; then
    slug="file-${index}"
  fi

  printf 'f-%s-%s' "${slug}" "${checksum}"
}

stat_to_display() {
  # 将 numstat 的统计值转换为可展示文本。
  # numstat 对二进制文件会给 '-'，此处统一显示为 bin。
  local value="$1"
  # 正则 ^[0-9]+$ 用于区分普通文本行数与二进制占位符。
  if [[ "${value}" =~ ^[0-9]+$ ]]; then
    printf '%s' "${value}"
  else
    printf 'bin'
  fi
}

collect_numstat() {
  # 收集单文件的增删行数统计（added/deleted）。
  # staged 与 range 模式分别走不同 git 命令，但输出格式统一为:
  #   <added>\t<deleted>
  local file_path="$1"
  local line added deleted

  if [[ "${MODE}" == "staged" ]]; then
    line="$(git -C "${PROOT}" diff --cached --numstat -- "${file_path}" | head -n 1 || true)"
  else
    line="$(git -C "${PROOT}" diff --numstat "${GIT_RANGE}" -- "${file_path}" | head -n 1 || true)"
  fi

  added="$(printf '%s' "${line}" | awk '{print $1}')"
  deleted="$(printf '%s' "${line}" | awk '{print $2}')"

  if [[ -z "${added}" ]]; then
    added="0"
  fi
  if [[ -z "${deleted}" ]]; then
    deleted="0"
  fi

  printf '%s\t%s\n' "${added}" "${deleted}"
}

write_header() {
  # 写入文档固定头部：标题、提示、Summary 统计。
  local generated_at="$1"
  local base_ref="$2"
  local diff_source="$3"
  local file_count="$4"
  local total_added="$5"
  local total_deleted="$6"
  local binary_count="$7"

  cat > "${OUTPUT_FILE}" <<EOF
# ${TITLE}

## Prenote

> ${NOTICE_CONTENT}

## Summary

- Generated at: \`${generated_at}\`
- Base commit: \`${base_ref}\`
- Diff source: \`${diff_source}\`
- Changed files: \`${file_count}\`
- Total lines: \`+${total_added} / -${total_deleted}\`
EOF

  if [[ "${binary_count}" -gt 0 ]]; then
    printf -- '- Binary-like diffs: `%s`\n' "${binary_count}" >> "${OUTPUT_FILE}"
  fi

  printf '\n' >> "${OUTPUT_FILE}"
}

append_index() {
  # 写入 Index 目录，提供“文件 -> 锚点”跳转。
  local count="$1"
  local i
  printf '## Index\n\n' >> "${OUTPUT_FILE}"
  for ((i = 0; i < count; i++)); do
    printf '%s. [%s](#%s) `+%s / -%s`\n' \
      "$((i + 1))" \
      "${FILES[$i]}" \
      "${ANCHORS[$i]}" \
      "$(stat_to_display "${ADDED_STATS[$i]}")" \
      "$(stat_to_display "${DELETED_STATS[$i]}")" \
      >> "${OUTPUT_FILE}"
  done
  printf '\n' >> "${OUTPUT_FILE}"
}

append_no_changes_note() {
  # 没有匹配到变更文件时写入兜底提示。
  cat >> "${OUTPUT_FILE}" <<'EOF'
## No Changes

No file changes found for the selected diff source.

EOF
}

append_file_sections() {
  # 写入每个文件的正文区块：
  # - 文件标题
  # - 可折叠详情（details/summary）
  # - 原始 diff 内容
  local count="$1"
  local i
  local add_display del_display

  for ((i = 0; i < count; i++)); do
    add_display="$(stat_to_display "${ADDED_STATS[$i]}")"
    del_display="$(stat_to_display "${DELETED_STATS[$i]}")"

    {
      printf '<a id="%s"></a>\n' "${ANCHORS[$i]}"
      printf '## %s\n\n' "${FILES[$i]}"
      printf '<details>\n'
      printf '<summary><code>+%s / -%s</code> Click to expand diff</summary>\n\n' "${add_display}" "${del_display}"
      printf '%sdiff\n' "${FENCE}"
      cat "${DIFF_FILES[$i]}"
      printf '\n%s\n\n' "${FENCE}"
      printf '</details>\n\n'
    } >> "${OUTPUT_FILE}"
  done
}

BASE_REF="$(git -C "${PROOT}" rev-parse --short HEAD 2>/dev/null || true)"
if [[ -z "${BASE_REF}" ]]; then
  BASE_REF="(no commits yet)"
fi

if [[ "${MODE}" == "staged" ]]; then
  DIFF_SOURCE="staged"
else
  DIFF_SOURCE="${GIT_RANGE}"
fi

GENERATED_AT="$(date '+%Y-%m-%d %H:%M:%S %z')"

declare -a FILES
declare -a ADDED_STATS
declare -a DELETED_STATS
declare -a ANCHORS
declare -a DIFF_FILES

TOTAL_ADDED=0
TOTAL_DELETED=0
BINARY_COUNT=0
FILE_COUNT=0

# 统一文件源命令，避免在主循环里写两套 while 逻辑。
if [[ "${MODE}" == "staged" ]]; then
  FILE_SOURCE_CMD=(git -C "${PROOT}" diff --cached --name-only -z)
else
  FILE_SOURCE_CMD=(git -C "${PROOT}" diff --name-only -z "${GIT_RANGE}")
fi

while IFS= read -r -d '' changed_file; do
  local_diff_file="${TMP_DIR}/diff-${FILE_COUNT}.patch"

  changed_file="${changed_file//\\//}"

  if in_excludes "${changed_file}"; then
    continue
  fi

  # 按文件提取完整 diff，避免旧方案中基于文本替换/行号操作导致的定位脆弱。
  if [[ "${MODE}" == "staged" ]]; then
    git -C "${PROOT}" diff --cached --no-color -- "${changed_file}" > "${local_diff_file}"
  else
    git -C "${PROOT}" diff --no-color "${GIT_RANGE}" -- "${changed_file}" > "${local_diff_file}"
  fi

  if [[ ! -s "${local_diff_file}" ]]; then
    rm -f "${local_diff_file}"
    continue
  fi

  numstat="$(collect_numstat "${changed_file}")"
  added="$(printf '%s' "${numstat}" | cut -f 1)"
  deleted="$(printf '%s' "${numstat}" | cut -f 2)"

  FILES+=("${changed_file}")
  ADDED_STATS+=("${added}")
  DELETED_STATS+=("${deleted}")
  ANCHORS+=("$(make_anchor "${changed_file}" "${FILE_COUNT}")")
  DIFF_FILES+=("${local_diff_file}")

  file_has_binary_stat=false

  # 正则 ^[0-9]+$：仅当 added/deleted 是纯数字时才累计总行数。
  # 否则视为二进制/不可计数差异，计入 BINARY_COUNT。
  if [[ "${added}" =~ ^[0-9]+$ ]]; then
    TOTAL_ADDED=$((TOTAL_ADDED + added))
  else
    file_has_binary_stat=true
  fi

  if [[ "${deleted}" =~ ^[0-9]+$ ]]; then
    TOTAL_DELETED=$((TOTAL_DELETED + deleted))
  else
    file_has_binary_stat=true
  fi

  if [[ "${file_has_binary_stat}" == "true" ]]; then
    BINARY_COUNT=$((BINARY_COUNT + 1))
  fi

  FILE_COUNT=$((FILE_COUNT + 1))
done < <("${FILE_SOURCE_CMD[@]}")

# 先写头部再写正文，No Changes 场景也能保留固定框架与统计信息。
write_header "${GENERATED_AT}" "${BASE_REF}" "${DIFF_SOURCE}" "${FILE_COUNT}" "${TOTAL_ADDED}" "${TOTAL_DELETED}" "${BINARY_COUNT}"

if [[ "${FILE_COUNT}" -eq 0 ]]; then
  append_no_changes_note
  exit 0
fi

append_index "${FILE_COUNT}"
append_file_sections "${FILE_COUNT}"
