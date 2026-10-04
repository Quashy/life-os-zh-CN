---
type: person
role: 
company: 
email: 
meets: 
tags:
  - person
---
Tag:（人物标签） `#p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>`

把「下次记得与此人讨论某事」记录为任务，并添加 `#discuss #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>` 标签，可放在笔记库任意位置。会面前打开这篇笔记查看。

```agent
type: button
text: "准备会议"
prompt: "Read Prompts/07 Meeting Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## To discuss
<!-- zh-CN heading -->
**待讨论**
```tasks
not done
tags include #discuss
tags include #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by created
```

## Open tasks involving them
<!-- zh-CN heading -->
**与此人相关的未完成任务**
```tasks
not done
tags include #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
tags do not include #discuss
sort by due
```

## Projects together
<!-- zh-CN heading -->
**共同项目**
```dataview
LIST
FROM "04 Projects"
WHERE contains(people, this.file.link) AND status != "done"
```

## Notes
<!-- zh-CN heading -->
**笔记**


## Meeting log
<!-- zh-CN heading -->
**会面记录**
- <% tp.date.now("YYYY-MM-DD") %> 
