---
date: <% tp.date.now("YYYY-MM-DD") %>
quarter: <% tp.file.title.slice(0, 7) %>
tags:
  - retreat
<%* const _cf = app.vault.getAbstractFileByPath("Meta/Compass Config.md"); const _cfg = _cf ? (app.metadataCache.getFileCache(_cf)?.frontmatter ?? {}) : {}; const _ws = Array.isArray(_cfg.wheel_areas) && _cfg.wheel_areas.length ? _cfg.wheel_areas : ["wheel_health","wheel_relationships","wheel_family","wheel_career","wheel_finances","wheel_growth","wheel_fun","wheel_meaning"]; tR += _ws.map(k => k + ": ").join("\n"); %>
---
> 将本笔记命名为 `YYYY-QN Personal Retreat`，例如 `2026-Q3 Personal Retreat`。Compass 根据该格式找到季度复盘，并用上方 `wheel_*` 属性绘制生命之轮，无需修改代码。

Previous retreat:（上次复盘） [[02 Retreats/<% moment(tp.file.title.slice(0, 7), "YYYY-[Q]Q").subtract(1, "quarter").format("YYYY-[Q]Q") %> Personal Retreat]] · 季度笔记： [[01 Journal/Quarterly/<% tp.file.title.slice(0, 7) %>]] · 去年同季度： [[02 Retreats/<% moment(tp.file.title.slice(0, 7), "YYYY-[Q]Q").subtract(1, "year").format("YYYY-[Q]Q") %> Personal Retreat]]

为自己预留一整天。不必远行；安静的几个小时、这份笔记，以及认真面对问题的意愿，就足以开始。

```agent
type: button
text: "准备季度复盘"
prompt: "Read Prompts/04 Retreat Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```
```agent
type: button
text: "引导季度复盘"
prompt: "Read Prompts/05 Retreat Facilitation.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## 1. Review life theme and core values
<!-- zh-CN heading -->
**1. 回顾人生主题与核心价值观**
它们还贴合现在的你吗？如有变化，请修改对应的源笔记。
![[Life Theme#Theme]]
![[Core Values#Values]]

Notes:
*笔记*
- 

## 2. Review the journal
<!-- zh-CN heading -->
**2. 回顾日记**
阅读过去 90 天的日记，观察投入评分的变化，以及你反复提到的事情。
```dataviewjs
const q = moment(dv.current().quarter, "YYYY-[Q]Q");
await dv.view("Meta/views/dailyquestions", { from: q.clone().startOf("quarter").format("YYYY-MM-DD"), to: q.clone().endOf("quarter").format("YYYY-MM-DD") });
```
```dataviewjs
await dv.view("Meta/views/habits", { days: 28 });
```
本季度的收获：
```dataviewjs
const q = moment(dv.current().quarter, "YYYY-[Q]Q");
const from = q.clone().startOf("quarter"), to = q.clone().endOf("quarter");
const cfg = dv.page("Meta/Compass Config") || {};
const pages = dv.pages(`"${cfg.daily_folder || "01 Journal/Daily"}"`).where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name) && moment(p.file.name).isBetween(from, to, "day", "[]")).sort(p => p.file.name);
const wins = [];
for (const p of pages) for (const L of p.file.lists) if (L.section && L.section.subpath === "Wins") wins.push(`${p.file.link}: ${L.text}`);
if (wins.length) dv.list(wins); else dv.paragraph("*本季度尚未记录收获。*");
```
What stood out:
*印象最深的事情*
- 

## 3. Wheel of life
<!-- zh-CN heading -->
**3. 生命之轮**
在顶部属性中，用 1–10 分评价对各个生活领域的满意程度。然后只选一个领域，作为未来 90 天的重点。
```dataviewjs
await dv.view("Meta/views/wheel", { page: dv.current().file.path });
```
Focus area for the next 90 days:
*未来 90 天的重点领域*
- 

Why this one:
*选择它的原因*
- 

## 4. Retrospective
<!-- zh-CN heading -->
**4. 回顾与反思**
### Part 1: Look back at last quarter
<!-- zh-CN heading -->
**第一部分：回顾上季度**
并排打开上季度复盘。意向落实了吗？你正在发生变化，还是只是用不同措辞重写相同目标？

做得好的地方：
- 

不够理想的地方：
- 

我的收获与理解：
- 

### Part 2: Start / Stop / Keep
<!-- zh-CN heading -->
**第二部分：开始、停止、保持**
| 开始 | 停止 | 保持 |
| --- | --- | --- |
|  |  |  |

## 5. Intentions for next quarter
<!-- zh-CN heading -->
**5. 下季度意向**
最多三项，每项都应能落实为每周的行动。
1. 
2. 
3. 

## 6. Review the ideal week
<!-- zh-CN heading -->
**6. 回顾理想一周**
[[Ideal Week|理想一周]]为以上意向留出了时间吗？现在就更新。
![[Ideal Week#Grid]]

Changes to make:
*需要调整的地方*
- 

## 7. Projects to commit to
<!-- zh-CN heading -->
**7. 确定要投入的项目**
在 `04 Projects/` 中创建或更新项目笔记，将 `quarter:` 设为本季度，让项目出现在季度笔记中。
- 

## Closing
<!-- zh-CN heading -->
**结束语**
用一句话概括本季度的方向：
- 
