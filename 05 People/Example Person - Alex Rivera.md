---
type: person
role: Example
company: 
email: 
meets: weekly
tags:
  - person
  - example
---
Tag: `#p/example-person-alex-rivera`

## To discuss

*待讨论*

```tasks
not done
tags include #discuss
tags include #p/example-person-alex-rivera
sort by created
```

## Open tasks involving them

*与此人有关的未完成任务*

```tasks
not done
tags include #p/example-person-alex-rivera
tags do not include #discuss
sort by due
```

## Projects together

*共同项目*

```dataview
LIST
FROM "04 Projects"
WHERE contains(people, this.file.link) AND status != "done"
```

## Notes

*笔记*

- 这是一篇示例人物笔记。"To discuss" 查询会汇总仓库中所有带 `#discuss #p/example-person-alex-rivera` 标签的事项；会面前打开这篇笔记即可查看。

## Meeting log

*会面记录*

- 2026-08-26 创建。
