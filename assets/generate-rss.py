#!/usr/bin/env python3
"""根据 Git 变更生成 TinySnowBlog 的 RSS 2.0 订阅源。

脚本仅使用 Python 标准库。默认读取环境变量 RSS_GIT_RANGE；未提供时，
读取 HEAD 最近一次提交。输出文件默认为仓库根目录下的 rss.xml。
"""

from __future__ import annotations

import argparse
import html
import logging
import os
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from email.utils import format_datetime
from pathlib import Path
from urllib.parse import quote, unquote


VERSION = "26.9.22"
BASE_URL = "https://tinysnow.github.io"
FEED_URL = f"{BASE_URL}/rss.xml"
CONTENT_NAMESPACE = "http://purl.org/rss/1.0/modules/content/"
ATOM_NAMESPACE = "http://www.w3.org/2005/Atom"

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
SOURCE_ROOT = PROJECT_ROOT / "src"
SUMMARY_PATH = SOURCE_ROOT / "SUMMARY.md"

LOG = logging.getLogger("generate-rss")


@dataclass(frozen=True)
class FeedEntry:
    identifier: str
    title: str
    link: str
    published: datetime
    description: str
    content_html: str


def run_git(*args: str) -> bytes:
    """在仓库根目录运行 Git，并返回原始标准输出。"""
    result = subprocess.run(
        ["git", *args],
        cwd=PROJECT_ROOT,
        check=True,
        capture_output=True,
    )
    return result.stdout


def iter_name_status_z(output: bytes):
    """解析 git --name-status -z，兼容普通、重命名与复制状态。"""
    fields = [part.decode("utf-8", errors="replace") for part in output.split(b"\0")]
    index = 0
    while index < len(fields) - 1:
        status_token = fields[index]
        if not status_token:
            index += 1
            continue

        status_code = status_token[0]
        if status_code in {"R", "C"}:
            if index + 2 >= len(fields):
                break
            yield status_code, fields[index + 1], fields[index + 2]
            index += 3
        else:
            if index + 1 >= len(fields):
                break
            yield status_code, fields[index + 1], None
            index += 2


def collect_changed_markdown(git_range: str | None) -> tuple[list[str], list[str]]:
    """返回指定范围内新增和修改的 src Markdown 文件。"""
    if git_range:
        LOG.info("使用 Git 范围生成 RSS：%s", git_range)
        output = run_git("diff", "--name-status", "-z", git_range)
    else:
        LOG.info("使用 HEAD 最近一次提交生成 RSS")
        output = run_git(
            "diff-tree",
            "--no-commit-id",
            "--name-status",
            "-r",
            "-z",
            "HEAD",
        )

    added: list[str] = []
    modified: list[str] = []

    for status_code, old_path, new_path in iter_name_status_z(output):
        relative_path = (new_path or old_path).replace("\\", "/")
        if (
            not relative_path.startswith("src/")
            or not relative_path.lower().endswith(".md")
            or relative_path.endswith("README.md")
        ):
            continue

        absolute_path = PROJECT_ROOT / relative_path
        if status_code == "A" and absolute_path.is_file():
            added.append(relative_path)
        elif status_code in {"M", "R", "C", "T"} and absolute_path.is_file():
            modified.append(relative_path)

    return added, modified


def parse_summary() -> dict[str, str]:
    """建立 src 相对路径到 SUMMARY 展示标题的映射。"""
    content = SUMMARY_PATH.read_text(encoding="utf-8")
    mapping: dict[str, str] = {}
    for title, relative_path in re.findall(r"\[(.*?)\]\((.*?)\)", content):
        decoded_path = unquote(relative_path.strip()).replace("\\", "/")
        if not decoded_path.startswith("src/"):
            decoded_path = f"src/{decoded_path}"
        mapping[decoded_path] = title.strip()
    return mapping


def file_git_time(relative_path: str) -> datetime:
    """取得文件最近一次提交时间；取不到时使用当前东八区时间。"""
    try:
        value = run_git("log", "-1", "--format=%aI", "--", relative_path)
        timestamp = value.decode("utf-8", errors="replace").strip()
        if timestamp:
            return datetime.fromisoformat(timestamp)
    except (subprocess.CalledProcessError, ValueError):
        LOG.warning("无法读取文件提交时间：%s", relative_path)
    return datetime.now(timezone(timedelta(hours=8)))


def encode_page_url(relative_path: str) -> str:
    """把 src 下的 Markdown 路径转换为博客页面 URL。"""
    path_without_src = relative_path.removeprefix("src/")
    encoded = "/".join(quote(part, safe="") for part in path_without_src.split("/") if part)
    if encoded.endswith(".md"):
        encoded = f"{encoded[:-3]}.html"
    return f"{BASE_URL}/{encoded}"


def markdown_as_safe_html(markdown_content: str) -> str:
    """将可信 Markdown 作为可换行的安全预格式文本嵌入 RSS。"""
    escaped = html.escape(markdown_content, quote=False)
    return f'<pre style="white-space:pre-wrap;word-wrap:break-word">{escaped}</pre>'


def build_entry(relative_path: str, title: str, change_type: str) -> FeedEntry:
    published = file_git_time(relative_path)
    content = (PROJECT_ROOT / relative_path).read_text(encoding="utf-8")
    type_text = "新增" if change_type == "added" else "更新"
    link = encode_page_url(relative_path)
    return FeedEntry(
        identifier=f"{relative_path}#{change_type}#{published.isoformat()}",
        title=f"[{type_text}] {title}",
        link=link,
        published=published,
        description=f"{type_text}: {title} - {published:%Y-%m-%d %H:%M:%S}",
        content_html=markdown_as_safe_html(content),
    )


def write_feed(entries: list[FeedEntry], output_path: Path) -> None:
    """生成 RSS 2.0 XML。"""
    ET.register_namespace("atom", ATOM_NAMESPACE)
    ET.register_namespace("content", CONTENT_NAMESPACE)

    rss = ET.Element("rss", {"version": "2.0"})
    channel = ET.SubElement(rss, "channel")
    ET.SubElement(channel, "title").text = "微雪博客 RSS"
    ET.SubElement(channel, "link").text = BASE_URL
    ET.SubElement(channel, "description").text = "包含本次 Git 提交中的所有文章更新"
    ET.SubElement(channel, "language").text = "zh-CN"
    ET.SubElement(
        channel,
        f"{{{ATOM_NAMESPACE}}}link",
        {"href": FEED_URL, "rel": "self", "type": "application/rss+xml"},
    )

    for entry in sorted(entries, key=lambda item: item.published, reverse=True):
        item = ET.SubElement(channel, "item")
        ET.SubElement(item, "title").text = entry.title
        ET.SubElement(item, "link").text = entry.link
        ET.SubElement(item, "guid", {"isPermaLink": "false"}).text = entry.identifier
        ET.SubElement(item, "pubDate").text = format_datetime(entry.published)
        ET.SubElement(item, "description").text = entry.description
        ET.SubElement(item, f"{{{CONTENT_NAMESPACE}}}encoded").text = entry.content_html

    output_path.parent.mkdir(parents=True, exist_ok=True)
    tree = ET.ElementTree(rss)
    ET.indent(tree, space="  ")
    tree.write(output_path, encoding="utf-8", xml_declaration=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--git-range",
        default=os.getenv("RSS_GIT_RANGE", "").strip() or None,
        help="Git 提交范围，例如 abc123..def456；默认读取 RSS_GIT_RANGE 或 HEAD。",
    )
    parser.add_argument(
        "--output",
        default=str(PROJECT_ROOT / "rss.xml"),
        help="RSS 输出路径，默认是仓库根目录下的 rss.xml。",
    )
    parser.add_argument("--version", action="version", version=f"%(prog)s {VERSION}")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

    try:
        added, modified = collect_changed_markdown(args.git_range)
        title_map = parse_summary()
        entries = [
            build_entry(path, title_map.get(path, Path(path).name), "added")
            for path in added
        ]
        entries.extend(
            build_entry(path, title_map.get(path, Path(path).name), "modified")
            for path in modified
        )
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = PROJECT_ROOT / output_path
        write_feed(entries, output_path)
    except (OSError, subprocess.CalledProcessError) as error:
        LOG.error("RSS 生成失败：%s", error)
        return 1

    LOG.info("RSS 生成完成：%s", output_path)
    LOG.info("新增文章 %d 篇，更新文章 %d 篇", len(added), len(modified))
    return 0


if __name__ == "__main__":
    sys.exit(main())
