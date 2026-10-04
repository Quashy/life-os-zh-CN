---
type: project
status: active
area: 
quarter: <% tp.date.now("YYYY-[Q]Q") %>
started: <% tp.date.now("YYYY-MM-DD") %>
due: 
people: []
tags:
  - project
---
为笔记库中任何位置的任务添加标签 `#project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>` ，它们就会汇总到这里。每个任务都保留通往其背景的链接。

```agent
type: button
text: "启动项目"
prompt: "Read Prompts/08 Project Kickoff.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## Outcome
<!-- zh-CN heading -->
**预期结果**
完成时应达到的状态：
- 

## Next actions
<!-- zh-CN heading -->
**下一步行动**
```tasks
not done
tags include #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by due
```

## Inline tasks
<!-- zh-CN heading -->
**项目任务**
- [ ] First step（第一步） #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>

## Notes
<!-- zh-CN heading -->
**笔记**


## Log
<!-- zh-CN heading -->
**记录**
- <% tp.date.now("YYYY-MM-DD") %> 已创建。

## Done
<!-- zh-CN heading -->
**已完成**
```tasks
done
tags include #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by done reverse
limit 20
```
