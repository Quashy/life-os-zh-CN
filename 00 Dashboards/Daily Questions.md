每天用 1–10 分回答「今天我是否尽力……」。方法来自 Marshall Goldsmith 的《Triggers》。评价的是投入程度，而非结果：即使结果不完美，只要已尽力，也可以给自己高分。

问题对应日记里的 `dq_*` 数值属性。在 [[Compass Config|配置]] 中编辑 `questions` 列表，新建日记和晚间问答会随之更新。

## 趋势
```dataviewjs
await dv.view("Meta/views/dailyquestions", { days: 90 });
```

## 评分记录
```dataviewjs
const cfg = dv.page("Meta/Compass Config") || {};
const folder = cfg.daily_folder || "01 Journal/Daily", pre = cfg.dq_prefix || "dq_";
const pages = dv.pages(`"${folder}"`).where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name)).sort(p => p.file.name, "desc").array();
const keys = [...new Set(pages.flatMap(p => Object.keys(p.file.frontmatter || {}).filter(k => k.startsWith(pre))))].sort();
const label = k => { const value = cfg.property_labels?.[k]; return typeof value === "string" && value.trim() ? value.trim() : k.slice(pre.length).replace(/[_-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()); };
const val = (p, k) => { const v = (p.file.frontmatter || {})[k]; return v === null || v === undefined || v === "" ? "" : String(v); };
const rows = pages.filter(p => keys.some(k => val(p, k) !== "")).slice(0, 30).map(p => [p.file.link, ...keys.map(k => val(p, k))]);
if (keys.length) dv.table(["日期", ...keys.map(label)], rows); else dv.paragraph(`尚未找到 ${pre}* 属性，请先完成每日问答。`);
```

## 询问助手
```agent
type: button
text: "分析问题与习惯趋势"
prompt: "Read Prompts/13 Trend Analysis.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```
