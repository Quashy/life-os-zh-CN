---
week: <% tp.file.title %>
quarter: <% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>
tags:
  - weekly
---
« [[01 Journal/Weekly/<% moment(tp.file.title, "gggg-[W]ww").subtract(1, "week").format("gggg-[W]ww") %>|上周]] · [[01 Journal/Quarterly/<% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>|本季度]] · [[Compass Dashboard|Compass 仪表盘]] · [[01 Journal/Weekly/<% moment(tp.file.title, "gggg-[W]ww").add(1, "week").format("gggg-[W]ww") %>|下周]] »

# <% moment(tp.file.title, "gggg-[W]ww").format("gggg[年 第]w[周]") %>
<% moment(tp.file.title, "gggg-[W]ww").startOf("week").format("M[月]D[日]") %> 至 <% moment(tp.file.title, "gggg-[W]ww").endOf("week").format("M[月]D[日]") %>

Days:（每日笔记）<%* const s = moment(tp.file.title, "gggg-[W]ww").startOf("week"); const parts = []; for (let i = 0; i < 7; i++) parts.push(`[[01 Journal/Daily/${s.clone().add(i, "day").format("YYYY-MM-DD")}|${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][s.clone().add(i, "day").day()]}]]`); tR += parts.join(" · "); %>

> [!intention]- 季度意向
> ![[01 Journal/Quarterly/<% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>#Quarterly intentions]]

## Weekly intentions
<!-- zh-CN heading -->
**本周意向**
列出本周能推动季度意向的三件事。
1. 
2. 
3. 

## Ideal week check
<!-- zh-CN heading -->
**检查理想一周**
查看 [[Ideal Week|理想一周]]。本周为这些意向安排了哪些时段？现在就调整日程，不要等到临近周末。

- 

## Due this week
<!-- zh-CN heading -->
**本周到期**
```tasks
not done
due after <% moment(tp.file.title, "gggg-[W]ww").startOf("week").subtract(1, "day").format("YYYY-MM-DD") %>
due before <% moment(tp.file.title, "gggg-[W]ww").endOf("week").add(1, "day").format("YYYY-MM-DD") %>
sort by due
group by filename
```

```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## Weekly review
<!-- zh-CN heading -->
**每周复盘**
在周末完成复盘。下表从日记中汇总每日投入评分和习惯完成情况。
```dataviewjs
await dv.view("Meta/views/week", { week: dv.current().file.name });
```

### What went well
<!-- zh-CN heading -->
**做得好的地方**

### What did not
<!-- zh-CN heading -->
**不够理想的地方**

### Wins this week
<!-- zh-CN heading -->
**本周收获**
```dataview
LIST L.text
FROM "01 Journal/Daily"
FLATTEN file.lists AS L
WHERE L.section.subpath = "Wins" AND file.day >= date(<% moment(tp.file.title, "gggg-[W]ww").startOf("week").format("YYYY-MM-DD") %>) AND file.day <= date(<% moment(tp.file.title, "gggg-[W]ww").endOf("week").format("YYYY-MM-DD") %>)
SORT file.name ASC
```
