此页帮助你筛选值得行动的任务。选出今天要做的事，再安排到纸质笔记或日历中，让任务真正进入日程。

```agent
type: button
text: "整理任务收件箱"
prompt: "Read Prompts/06 Task Triage.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```
```agent
type: button
text: "梳理今日重点"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

使用 QuickAdd 的 **Add task** 命令，把待办事项收集到 [[Tasks|任务总表]]。添加 `#project/<slug>` 或 `#p/<person>` 标签后，任务也会出现在相关项目或人物笔记中。下方查询会按时间与情境整理任务。

## 已逾期
```tasks
not done
path does not include wiki/
due before today
sort by due
group by filename
```

## 今日
```tasks
not done
path does not include wiki/
(due on today) OR (scheduled on today)
path does not include 09 Reading/Reading Plan
sort by priority
group by filename
```

## 未来 7 天
```tasks
not done
path does not include wiki/
due after today
due before in 8 days
sort by due
group by due
```

## 待讨论：按人物
```tasks
not done
path does not include wiki/
tags include #discuss
group by tags
sort by created
```

## 未设日期的高优先级任务
```tasks
not done
path does not include wiki/
no due date
(priority is high) OR (priority is highest)
group by filename
```

## 收件箱：待分类任务
```tasks
not done
path does not include wiki/
path includes 08 Tasks/Tasks
no due date
tags do not include #project
tags do not include #p/
limit 25
```

## 本周已完成
```tasks
done after 7 days ago
path does not include wiki/
group by done
```
