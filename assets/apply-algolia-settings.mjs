#!/usr/bin/env node
/**
 * 把 assets/algolia-crawler-config.js 里的 initialIndexSettings 直接应用到线上索引。
 * ---------------------------------------------------------------------------
 * 为什么需要它：Algolia Dashboard 的索引设置页是分区表单，没有给索引设置用的
 * JSON 编辑器；而 initialIndexSettings 只在索引「第一次」爬取时生效，所以索引
 * 已存在时它不会自动应用。这个脚本用官方 REST 接口 PUT /1/indexes/{index}/settings
 * 把同一份设置写进去（设置以爬虫配置为唯一来源，不会两边不一致）。
 *
 * 用法：
 *   node assets/apply-algolia-settings.mjs --dry-run          # 只打印设置，不写入
 *   node assets/apply-algolia-settings.mjs --key <API_KEY>    # 实际写入
 *   ALGOLIA_API_KEY=<API_KEY> node assets/apply-algolia-settings.mjs
 *
 * 需要的 key 权限：editSettings（以及 settings 读权限会更方便排查）。
 * ⚠️ 不要把 key 写进这个文件或提交到仓库；用参数或环境变量传。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(here, 'algolia-crawler-config.js');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keyIndex = args.indexOf('--key');
const apiKey = keyIndex >= 0 ? args[keyIndex + 1] : process.env.ALGOLIA_API_KEY;

/* ---- 以爬虫配置为唯一来源，取出 initialIndexSettings ---- */
const source = fs.readFileSync(configPath, 'utf8');
let crawlerConfig = null;
globalThis.Crawler = function Crawler(config) { crawlerConfig = config; };
(0, eval)(source);

if (!crawlerConfig) {
  console.error('没能从 algolia-crawler-config.js 里读到配置');
  process.exit(1);
}

const appId = crawlerConfig.appId;
const indexNames = Object.keys(crawlerConfig.initialIndexSettings || {});
if (indexNames.length !== 1) {
  console.error('期望 initialIndexSettings 里只有一个索引，实际：' + JSON.stringify(indexNames));
  process.exit(1);
}
const indexName = indexNames[0];
const settings = crawlerConfig.initialIndexSettings[indexName];

if (dryRun) {
  console.log('# 索引：' + indexName + '  （appId: ' + appId + '）');
  console.log('# 下面这段就是会被写入的 JSON：');
  console.log(JSON.stringify(settings, null, 2));
  process.exit(0);
}

if (!apiKey) {
  console.error('缺少 API Key。用法：node assets/apply-algolia-settings.mjs --key <API_KEY>');
  console.error('（也可以设置环境变量 ALGOLIA_API_KEY；先用 --dry-run 可以不传 key）');
  process.exit(1);
}

// ⚠️ 写操作必须走 {appId}.algolia.net；{appId}-dsn.algolia.net 是只读主机
//    （用错会返回 "This host is read-only (ie. this is a DSN)"）
const base = 'https://' + appId + '.algolia.net/1/indexes/' + encodeURIComponent(indexName);
const headers = {
  'X-Algolia-Application-Id': appId,
  'X-Algolia-API-Key': apiKey,
  'Content-Type': 'application/json',
};

console.log('→ PUT ' + base + '/settings');
const res = await fetch(base + '/settings', {
  method: 'PUT',
  headers,
  body: JSON.stringify(settings),
});
const text = await res.text();
let payload = null;
try { payload = JSON.parse(text); } catch (e) { /* 保留原始文本 */ }

if (!res.ok) {
  console.error('✗ HTTP ' + res.status + '：' + text.slice(0, 500));
  if (res.status === 403 || /403|read-only|not authorized|not allowed|invalid api key/i.test(text)) {
    console.error('');
    console.error('  这个 key 没有 editSettings 权限（或不是写权限的 key）。两条路：');
    console.error('  A. 换一个带 editSettings 的 key：Algolia Dashboard → API Keys；');
    console.error('  B. 干脆走「删掉索引再重爬」：爬虫会在索引的第一次爬取时自动套用 initialIndexSettings，');
    console.error('     Dashboard → Search → 选索引 tinysnowio → Manage index > Delete（输入 DELETE）→ 然后 Restart crawl。');
  }
  process.exit(1);
}

console.log('✓ 设置已提交' + (payload && payload.taskID !== undefined ? '（taskID ' + payload.taskID + '）' : ''));

/* ---- 等任务完成，确认设置真的生效 ---- */
if (payload && payload.taskID !== undefined) {
  const taskUrl = base + '/task/' + payload.taskID;
  for (let i = 0; i < 30; i++) {
    const t = await fetch(taskUrl, { headers });
    const tj = await t.json().catch(() => null);
    if (tj && tj.status === 'published') {
      console.log('✓ 索引已更新（status: published）');
      break;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

/* ---- 回读核对 ---- */
const check = await fetch(base + '/settings', { headers });
if (check.ok) {
  const now = await check.json();
  const keys = ['indexLanguages', 'queryLanguages', 'distinct', 'attributeForDistinct'];
  console.log('\n回读核对：');
  for (const k of keys) {
    console.log('  ' + k + ' = ' + JSON.stringify(now[k]));
  }
  console.log('  searchableAttributes = ' + JSON.stringify(now.searchableAttributes));
}
