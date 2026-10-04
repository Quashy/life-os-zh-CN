---
type: book
author: 
year: 
rating: 
status: reading
started: <% tp.date.now("YYYY-MM-DD") %>
finished: 
tags:
  - book
---
## Summary in three sentences
<!-- zh-CN heading -->
**三句话概括**


## Key ideas
<!-- zh-CN heading -->
**核心观点**
- 

## Quotes
<!-- zh-CN heading -->
**引文**
为每段引文添加块 ID，方便在写作时直接嵌入。

> "" ^quote-1

## How this changes what I do
<!-- zh-CN heading -->
**对行动的启发**
- 

```agent
type: button
text: "将页面整理到知识库"
prompt: "Read Prompts/12 Research Capture.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## Linked writing
<!-- zh-CN heading -->
**相关写作**
```dataview
LIST
FROM "06 Writing"
WHERE contains(file.outlinks, this.file.link)
```
