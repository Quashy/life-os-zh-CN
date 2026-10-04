---
quarter: <% tp.file.title %>
retreat: "[[02 Retreats/<% tp.file.title %> Personal Retreat]]"
focus_area: 
tags:
  - quarterly
---
« [[01 Journal/Quarterly/<% moment(tp.file.title, "YYYY-[Q]Q").subtract(1, "quarter").format("YYYY-[Q]Q") %>|上季度]] · [[Compass Dashboard|Compass 仪表盘]] · [[01 Journal/Quarterly/<% moment(tp.file.title, "YYYY-[Q]Q").add(1, "quarter").format("YYYY-[Q]Q") %>|下季度]] »

<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("M[月]D[日]") %> 至 <% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY[年]M[月]D[日]") %> · 季度复盘： [[02 Retreats/<% tp.file.title %> Personal Retreat]]

> [!theme]- 人生主题与核心价值观
> ![[Life Theme#Theme]]
> ![[Core Values#Values]]

```agent
type: button
text: "准备季度复盘"
prompt: "Read Prompts/04 Retreat Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## Quarterly intentions
<!-- zh-CN heading -->
**季度意向**
在季度复盘时确定意向，复制到这里或嵌入复盘章节，供每周笔记引用。
![[<% tp.file.title %> Personal Retreat#5. Intentions for next quarter]]

## Focus area (from the wheel of life)
<!-- zh-CN heading -->
**重点领域（来自生命之轮）**
- 

## Projects this quarter
<!-- zh-CN heading -->
**本季度项目**
```dataview
TABLE WITHOUT ID file.link AS "项目", status AS "状态", area AS "领域", due AS "截止日期"
FROM "04 Projects"
WHERE quarter = "<% tp.file.title %>" AND status != "done"
SORT due ASC
```

## Weeks
<!-- zh-CN heading -->
**每周笔记**
```dataview
LIST
FROM "01 Journal/Weekly"
WHERE quarter = "<% tp.file.title %>"
SORT file.name ASC
```

## Daily questions this quarter
<!-- zh-CN heading -->
**本季度每日问题**
```dataviewjs
await dv.view("Meta/views/dailyquestions", { from: "<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>", to: "<% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>" });
```

## End of quarter notes
<!-- zh-CN heading -->
**季度末记录**
把这些记录带到下一次季度复盘中。
- 
