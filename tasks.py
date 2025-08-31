import os
import re
import sys
import subprocess
from datetime import datetime, timezone, timedelta 
from urllib.parse import unquote, quote
from pathlib import Path

from feedgen.feed import FeedGenerator
import markdown
from invoke import task


SROOT = os.path.dirname(os.path.abspath(__file__))
PROOT = os.path.abspath(os.path.join(SROOT, os.pardir))
print(f"SROOT:{SROOT}\nPROOT:{PROOT}\n")

from collections import namedtuple
from loguru import logger as LOG

# 移除默认的日志处理器
LOG.remove()
LOG.add(sys.stdout, level="DEBUG")

CONF = {
    "project": "RSS4mdBOOK",
    "desc": "base SUMMARY.md gen RSS feed->RSS.xml",
    "version": "24.11.9.2142",
    "author": "南国微雪",
    "feedback": "ancielin+blog@outlook.com",
    "license": "MIT",
    "rpath": "./src",
    "summ": "SUMMARY.md",
    "buri": "https://tinysnow.github.io",
    "follow":"feedId:69052357719365632+userId:68573755406424064",
    "last": 7,
}

Config = namedtuple("Config", CONF.keys())
CFG = Config(**CONF)

def safe_path_encode(path: str) -> str:
    """
    安全的路径编码，处理中文路径
    
    Args:
        path (str): 原始路径
        
    Returns:
        str: 编码后的路径
    """
    # 分割路径为各个部分
    parts = path.split('/')
    # 对每个部分进行编码，但保留路径分隔符
    encoded_parts = [quote(part, safe='') for part in parts if part]
    return '/'.join(encoded_parts)

def safe_path_decode(path: str) -> str:
    """
    安全的路径解码，处理中文路径
    
    Args:
        path (str): 编码的路径
        
    Returns:
        str: 解码后的路径
    """
    try:
        return unquote(path)
    except Exception as e:
        LOG.warning(f"路径解码失败，使用原路径: {path}, 错误: {e}")
        return path

def get_last_commit_files():
    """
    获取上次 commit 中涉及的文件列表，支持中文路径
    
    Returns:
        tuple: (新增文件列表, 修改文件列表, 删除文件列表)
    """
    try:
        # 使用 git diff-tree 获取变更，但使用 --full-index 和 -z 选项以避免路径编码问题
        result = subprocess.run(
            ['git', 'diff-tree', '--no-commit-id', '--name-status', '-r', '-z', '--full-index', 'HEAD'],
            capture_output=True,
            encoding='utf-8',  # 明确指定UTF-8编码
            check=True
        )
        
        added_files = []
        modified_files = []
        deleted_files = []
        
        # -z 选项使用 NULL 字节分割，需要特殊处理
        changes = result.stdout.split('\0')
        i = 0
        while i < len(changes) - 1:  # 最后一个元素是空字符串
            status = changes[i]
            file_path = changes[i + 1]
            
            if not file_path:
                i += 2
                continue
                
            # 规范化路径格式
            file_path = os.path.normpath(file_path).replace('\\', '/')
            
            # 只处理 src 目录下的 .md 文件，排除 README.md
            if (file_path.startswith('src/') and 
                file_path.lower().endswith('.md') and 
                not file_path.endswith('README.md')):
                
                # 确保文件路径是有效的UTF-8编码
                try:
                    if status == 'A':
                        if os.path.exists(file_path):  # 验证文件是否存在
                            added_files.append(file_path)
                        else:
                            LOG.warning(f"新增文件不存在: {file_path}")
                    elif status == 'M':
                        if os.path.exists(file_path):
                            modified_files.append(file_path)
                        else:
                            LOG.warning(f"修改文件不存在: {file_path}")
                    elif status == 'D':
                        deleted_files.append(file_path)
                except UnicodeError as e:
                    LOG.error(f"文件路径编码错误: {e}")
            
            i += 2  # 每次处理状态和路径两个元素
        
        # 输出详细日志
        LOG.info("Git变更文件列表:")
        for f in added_files:
            LOG.info(f"  新增: {f}")
        for f in modified_files:
            LOG.info(f"  修改: {f}")
        
        return added_files, modified_files, deleted_files
        
    except subprocess.CalledProcessError as e:
        LOG.error(f"执行Git命令失败: {e.stderr}")
        return [], [], []
    except Exception as e:
        LOG.error(f"获取Git变更失败: {e}")
        return [], [], []

def get_file_git_time(file_path: str) -> datetime:
    """
    获取文件的最后 Git 提交时间
    
    Args:
        file_path (str): 文件路径
        
    Returns:
        datetime: 带时区信息的时间对象
    """
    try:
        # 确保使用正确的文件路径格式
        normalized_path = file_path.replace('\\', '/')
        
        result = subprocess.run(
            ['git', 'log', '-1', '--format=%ai', '--', normalized_path],
            capture_output=True,
            text=True,
            check=True
        )
        
        if not result.stdout.strip():
            LOG.warning(f"无法获取文件 Git 时间: {file_path}")
            return datetime.now(timezone(timedelta(hours=8)))
            
        timestamp_str = result.stdout.strip()
        # Git 时间戳格式: YYYY-MM-DD HH:MM:SS +TIMEZONE
        file_time = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S %z')
        
        LOG.debug(f"文件 {file_path} Git 时间: {file_time}")
        return file_time
        
    except subprocess.CalledProcessError as e:
        LOG.error(f"获取 Git 时间失败: {file_path}, 错误: {e}")
        return datetime.now(timezone(timedelta(hours=8)))
    except Exception as e:
        LOG.error(f"处理 Git 时间时出错: {file_path}, 错误: {e}")
        return datetime.now(timezone(timedelta(hours=8)))

def parse_summary_md(summary_path: str) -> dict:
    """
    解析 SUMMARY.md 文件，建立文件路径到标题的映射
    
    Args:
        summary_path (str): SUMMARY.md 文件路径
        
    Returns:
        dict: {文件路径: 标题} 的映射字典
    """
    file_title_map = {}
    
    try:
        with open(summary_path, 'r', encoding='utf-8') as f:
            summary_content = f.read()
        
        # 使用正则表达式解析 markdown 链接
        link_pattern = re.compile(r'\[(.*?)\]\((.*?)\)')
        
        for match in link_pattern.findall(summary_content):
            title = match[0].strip()
            relative_path = match[1].strip()
            
            # 安全解码路径
            decoded_path = safe_path_decode(relative_path)
            
            # 标准化路径格式
            normalized_path = decoded_path.replace('\\', '/')
            if not normalized_path.startswith('src/'):
                normalized_path = f"src/{normalized_path}"
            
            file_title_map[normalized_path] = title
            # LOG.debug(f"映射: {normalized_path} -> {title}")
    
    except Exception as e:
        LOG.error(f"解析 SUMMARY.md 失败: {e}")
    
    return file_title_map

def process_markdown_file(file_path: str, title: str, change_type: str) -> dict:
    """
    处理单个 Markdown 文件
    
    Args:
        file_path (str): 文件路径
        title (str): 文件标题
        change_type (str): 变更类型 ('added' 或 'modified')
        
    Returns:
        dict: 文件条目数据，如果处理失败返回 None
    """
    try:
        # 检查文件是否存在
        local_file_path = f"./{file_path}"
        if not os.path.exists(local_file_path):
            LOG.warning(f"文件不存在: {local_file_path}")
            return None
        
        # 获取文件的 Git 提交时间
        git_time = get_file_git_time(file_path)
        
        # 读取文件内容
        with open(local_file_path, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
        
        # 转换为 HTML
        html_content = markdown.markdown(markdown_content)
        
        # 生成 URL
        # 移除 src/ 前缀，并安全编码
        url_path = file_path[4:] if file_path.startswith('src/') else file_path
        encoded_url_path = safe_path_encode(url_path)
        page_url = f"{CFG.buri.rstrip('/')}/{encoded_url_path}"
        
        # 将 .md 扩展名替换为 .html
        if page_url.endswith('.md'):
            page_url = page_url[:-3] + '.html'
        
        # 生成描述
        type_text = "新增" if change_type == "added" else "更新"
        description = f"{type_text}: {title} - {git_time.strftime('%Y-%m-%d %H:%M:%S')}"
        
        entry_data = {
            'id': f"{file_path}#{change_type}",
            'title': f"[{type_text}] {title}",
            'link': page_url,
            'published': git_time,
            'description': description,
            'content': html_content,
            'change_type': change_type,
            'file_path': file_path
        }
        
        LOG.info(f"处理完成: {type_text} - {title}")
        return entry_data
        
    except Exception as e:
        LOG.error(f"处理文件失败 {file_path}: {e}")
        return None

@task
def ver(c):
    """echo crt. versions"""
    print(
        f"""{CFG.project}
    ~> {CFG.desc} <~
    ~> version   {CFG.version} <~
    ~> powered by {CFG.author} <~
    ~> feedback to {CFG.feedback} <~
    ~> all right reserved: {CFG.license} <~
    """
    )

@task 
def gen(c, limitmes: int = 14):
    """
    生成基于上次 Git commit 变更的 RSS 订阅源
    
    Args:
        c: Context对象
        limitmes (int): 限制条目数量，默认14条
    """
    
    LOG.info("开始生成 RSS 订阅源...")
    
    # 1. 获取上次 commit 的变更文件
    added_files, modified_files, deleted_files = get_last_commit_files()
    
    if not added_files and not modified_files:
        LOG.warning("上次 commit 没有新增或修改的 Markdown 文件")
        # 仍然生成一个空的 RSS 文件
        fg = FeedGenerator()
        fg.id(CFG.buri)
        fg.title('微雪博客 RSS')
        fg.subtitle('lasted updates from tinysnow.github.io')
        fg.link(href=CFG.buri, rel='self')
        fg.author({'name': 'tinysnow', 'email': 'ancielin+blog@outlook.com'})
        fg.language('zh-CN')
        fg.description('RSS feed contains the latest updates items.')
        fg.rss_file('rss.xml')
        LOG.info("生成空的 RSS 文件: rss.xml")
        return
    
    # 2. 解析 SUMMARY.md 文件
    summary_path = f'{CFG.rpath}/{CFG.summ}'
    file_title_map = parse_summary_md(summary_path)
    
    # 3. 初始化 RSS 生成器
    fg = FeedGenerator()
    fg.id(CFG.buri)
    fg.title('微雪博客 RSS')
    fg.subtitle('lasted updates from tinysnow.github.io')
    fg.link(href=CFG.buri, rel='self')
    fg.author({'name': 'tinysnow', 'email': 'ancielin+blog@outlook.com'})
    fg.language('zh-CN')
    fg.description(f'RSS feed contains the latest {CFG.last} updates items.')
    
    # 4. 处理变更的文件
    entries = []
    
    # 处理新增文件
    for file_path in added_files:
        title = file_title_map.get(file_path, os.path.basename(file_path))
        entry_data = process_markdown_file(file_path, title, 'added')
        if entry_data:
            entries.append(entry_data)
    
    # 处理修改文件
    for file_path in modified_files:
        title = file_title_map.get(file_path, os.path.basename(file_path))
        entry_data = process_markdown_file(file_path, title, 'modified')
        if entry_data:
            entries.append(entry_data)
    
    # 5. 按时间倒序排序并限制数量
    sorted_entries = sorted(entries, 
                          key=lambda x: x['published'], 
                          reverse=True)[:limitmes]
    
    # 6. 添加条目到 RSS feed
    for entry_data in sorted_entries:
        LOG.debug(f"添加条目: {entry_data['title']} - {entry_data['published']}")
        
        entry = fg.add_entry()
        entry.id(entry_data['id'])
        entry.title(entry_data['title'])
        entry.link(href=entry_data['link'])
        entry.published(entry_data['published'].isoformat())
        entry.description(entry_data['description'])
        entry.content(entry_data['content'], type='html')
    
    # 7. 生成 RSS 文件
    fg.rss_file('rss.xml')
    
    LOG.info(f'RSS feed 生成完成: rss.xml')
    LOG.info(f"总共 {len(sorted_entries)} 个条目")
    LOG.info(f"新增文章: {len([e for e in sorted_entries if e['change_type'] == 'added'])} 篇")
    LOG.info(f"更新文章: {len([e for e in sorted_entries if e['change_type'] == 'modified'])} 篇")
    
    # 显示处理的文件信息
    for entry in sorted_entries:
        LOG.info(f"  {entry['title']} - {entry['published'].strftime('%Y-%m-%d %H:%M:%S')}")

@task
def test_git(c):
    """测试 Git 变更检测功能"""
    LOG.info("测试 Git 变更检测...")
    
    added_files, modified_files, deleted_files = get_last_commit_files()
    
    print(f"\n=== Git 变更检测结果 ===")
    print(f"新增文件 ({len(added_files)} 个):")
    for f in added_files:
        print(f"  + {f}")
    
    print(f"\n修改文件 ({len(modified_files)} 个):")
    for f in modified_files:
        print(f"  M {f}")
    
    print(f"\n删除文件 ({len(deleted_files)} 个):")
    for f in deleted_files:
        print(f"  - {f}")
