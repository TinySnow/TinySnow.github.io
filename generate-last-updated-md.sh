#!/usr/bin/env bash

# ==============================================================================
# 生成 src/last-updated.md
#
# 该脚本是 “最近更新” 页面生成器，输出结构固定为：
# - H1 标题
# - Prenote 提示
# - 最近 N 次变更记录（默认 3 次，先进先出）
#
# 每条“变更记录”包含：
# - 记录标题（本次变更总标题）
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
# 历史保留策略：
# - 默认最多保留 3 条记录（可通过 --history-limit 调整）
# - 新记录始终在最上方
# - 超出数量时淘汰最旧记录（FIFO）
# - 前提：输出文件需要先包含“上一轮生成结果”（例如 CI 先恢复上一次 artifact）
#   若每次都从一个固定旧模板起步，历史自然无法累计
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
HISTORY_LIMIT=3

ENTRY_START_MARK="<!-- LAST_UPDATED_ENTRY_START -->"
ENTRY_END_MARK="<!-- LAST_UPDATED_ENTRY_END -->"

# 默认排除 generated 文件自身和 sitemap.xml（仅时间戳噪音）
EXCLUDE_FILES=(
  "src/last-updated.md"
  "src/sitemap.xml"
)

usage() {
  # 打印脚本帮助信息。
  cat <<'USAGE'
Usage:
  ./generate-last-updated-md.sh [--staged] [--range <git-range>] [--history-limit <n>] [--output <path>]

Options:
  --staged               Use staged diff (default).
  --range <range>        Use git range diff, e.g. abc123..def456.
  --history-limit <n>    Keep latest n records (FIFO), default: 3.
  --output <path>        Output markdown file path.
  -h, --help             Show this help.
USAGE
}

# 参数解析：将用户意图映射到 MODE + GIT_RANGE + HISTORY_LIMIT + OUTPUT_FILE。
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
    --history-limit)
      if [[ $# -lt 2 ]]; then
        echo "Error: --history-limit requires a value." >&2
        exit 1
      fi
      HISTORY_LIMIT="$2"
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

# 正则 ^[1-9][0-9]*$：history limit 必须是正整数。
if ! [[ "${HISTORY_LIMIT}" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: --history-limit must be a positive integer." >&2
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
  # 删除用于缓存每个文件 patch 与历史记录切片的临时目录。
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
  # 3) 再拼接 entry_key，避免不同“历史记录块”之间锚点冲突
  local file_path="$1"
  local index="$2"
  local entry_key="$3"
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

  printf 'f-%s-%s-%s' "${entry_key}" "${slug}" "${checksum}"
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

write_document_header() {
  # 写入文档固定头部：H1 + Prenote。
  local target_file="$1"
  cat > "${target_file}" <<EOF_HEADER
# ${TITLE}

## Prenote

> ${NOTICE_CONTENT}

EOF_HEADER
}

write_current_entry() {
  # 写入“本次变更记录块”，包含标题、Summary、Index 与 diff 详情。
  local target_file="$1"
  local entry_title="$2"
  local generated_at="$3"
  local base_ref="$4"
  local diff_source="$5"
  local file_count="$6"
  local total_added="$7"
  local total_deleted="$8"
  local binary_count="$9"

  local i add_display del_display

  {
    printf '%s\n' "${ENTRY_START_MARK}"
    printf '## %s\n\n' "${entry_title}"

    printf '### Summary\n\n'
    printf -- '- Generated at: `%s`\n' "${generated_at}"
    printf -- '- Base commit: `%s`\n' "${base_ref}"
    printf -- '- Diff source: `%s`\n' "${diff_source}"
    printf -- '- Changed files: `%s`\n' "${file_count}"
    printf -- '- Total lines: `+%s / -%s`\n' "${total_added}" "${total_deleted}"
    if [[ "${binary_count}" -gt 0 ]]; then
      printf -- '- Binary-like diffs: `%s`\n' "${binary_count}"
    fi
    printf '\n'

    if [[ "${file_count}" -eq 0 ]]; then
      printf '### No Changes\n\n'
      printf 'No file changes found for the selected diff source.\n\n'
    else
      printf '### Index\n\n'
      for ((i = 0; i < file_count; i++)); do
        printf '%s. [%s](#%s) `+%s / -%s`\n' \
          "$((i + 1))" \
          "${FILES[$i]}" \
          "${ANCHORS[$i]}" \
          "$(stat_to_display "${ADDED_STATS[$i]}")" \
          "$(stat_to_display "${DELETED_STATS[$i]}")"
      done
      printf '\n'

      printf '### Diffs\n\n'
      for ((i = 0; i < file_count; i++)); do
        add_display="$(stat_to_display "${ADDED_STATS[$i]}")"
        del_display="$(stat_to_display "${DELETED_STATS[$i]}")"

        printf '<a id="%s"></a>\n' "${ANCHORS[$i]}"
        printf '#### %s\n\n' "${FILES[$i]}"
        printf '<details>\n'
        printf '<summary><code>+%s / -%s</code> Click to expand diff</summary>\n\n' "${add_display}" "${del_display}"
        printf '%sdiff\n' "${FENCE}"
        cat "${DIFF_FILES[$i]}"
        printf '\n%s\n\n' "${FENCE}"
        printf '</details>\n\n'
      done
    fi

    printf '%s\n\n' "${ENTRY_END_MARK}"
  } > "${target_file}"
}

extract_old_entries() {
  # 从旧版 last-updated.md 中提取历史记录块（按出现顺序：新 -> 旧）。
  # 仅识别被 ENTRY_START/ENTRY_END 包裹的块，旧格式（无标记）会被自动忽略。
  # 这意味着调用方需要提供“上一轮已生成文件”作为输入基线。
  local source_file="$1"
  local line in_entry=0 entry_file="" idx=0

  OLD_ENTRY_FILES=()

  if [[ ! -f "${source_file}" ]]; then
    return 0
  fi

  while IFS= read -r line || [[ -n "${line}" ]]; do
    if [[ "${line}" == "${ENTRY_START_MARK}" ]]; then
      in_entry=1
      entry_file="${TMP_DIR}/entry-old-${idx}.md"
      : > "${entry_file}"
      printf '%s\n' "${line}" >> "${entry_file}"
      continue
    fi

    if [[ "${in_entry}" -eq 1 ]]; then
      printf '%s\n' "${line}" >> "${entry_file}"
      if [[ "${line}" == "${ENTRY_END_MARK}" ]]; then
        OLD_ENTRY_FILES+=("${entry_file}")
        idx=$((idx + 1))
        in_entry=0
      fi
    fi
  done < "${source_file}"
}

append_old_entries() {
  # 将旧记录按顺序追加到目标文件，最多追加 keep_count 条。
  local target_file="$1"
  local keep_count="$2"
  local i

  for ((i = 0; i < keep_count && i < ${#OLD_ENTRY_FILES[@]}; i++)); do
    cat "${OLD_ENTRY_FILES[$i]}" >> "${target_file}"
    printf '\n' >> "${target_file}"
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
ENTRY_KEY="$(printf '%s|%s|%s' "${GENERATED_AT}" "${BASE_REF}" "${DIFF_SOURCE}" | cksum | awk '{print $1}')"
ENTRY_TITLE="更新记录（${GENERATED_AT} | ${BASE_REF}）"

declare -a FILES
declare -a ADDED_STATS
declare -a DELETED_STATS
declare -a ANCHORS
declare -a DIFF_FILES
declare -a OLD_ENTRY_FILES

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
  ANCHORS+=("$(make_anchor "${changed_file}" "${FILE_COUNT}" "${ENTRY_KEY}")")
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

CURRENT_ENTRY_FILE="${TMP_DIR}/entry-current.md"

# 先生成本次记录，再抽取旧记录，最后按“新 + 旧(最多 N-1 条)”重建文件。
write_current_entry \
  "${CURRENT_ENTRY_FILE}" \
  "${ENTRY_TITLE}" \
  "${GENERATED_AT}" \
  "${BASE_REF}" \
  "${DIFF_SOURCE}" \
  "${FILE_COUNT}" \
  "${TOTAL_ADDED}" \
  "${TOTAL_DELETED}" \
  "${BINARY_COUNT}"

extract_old_entries "${OUTPUT_FILE}"

write_document_header "${OUTPUT_FILE}"
cat "${CURRENT_ENTRY_FILE}" >> "${OUTPUT_FILE}"
printf '\n' >> "${OUTPUT_FILE}"

if (( HISTORY_LIMIT > 1 )); then
  append_old_entries "${OUTPUT_FILE}" "$((HISTORY_LIMIT - 1))"
fi
