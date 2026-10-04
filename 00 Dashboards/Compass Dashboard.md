---
cssclasses:
  - lifeos-dashboard
---
下方内容均来自你的笔记。日记、季度复盘或配置更新后，页面会随之刷新，无需编辑此处代码。

```dataviewjs
await dv.view("Meta/views/quicklinks");
```

> [!theme] 人生主题
> ![[Life Theme#Theme]]

## 生命之轮：本季度复盘
```dataviewjs
await dv.view("Meta/views/wheel");
```

## 每日问题
展示日记中各项 `dq_*` 属性的趋势与平均分。可以切换问题和时间范围。
```dataviewjs
await dv.view("Meta/views/dailyquestions", { days: 30 });
```

## 习惯
```dataviewjs
await dv.view("Meta/views/habits", { days: 21 });
```

## 看板
```dataviewjs
await dv.view("Meta/views/boards", { compact: true });
```

## 珍惜时间
```dataviewjs
await dv.view("Meta/views/memento");
```

## 询问助手
打开 [[Assistant|AI 助手]]查看完整提示词库，或使用下方工作流。需要先启用 Agent Client 并配置智能体。
```agent
type: button
text: "梳理今日重点"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```
```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## 相关页面
- [[Habit Canvas|习惯画布]]
- [[Daily Questions|每日问题]]
- [[Task Dashboard|任务仪表盘]]
- [[Projects Dashboard|项目仪表盘]]
- [[Boards|看板]]
- [[Assistant|AI 助手]]
- [[Setup|设置向导]]
- [[Ideal Week|理想一周]] · [[Core Values|核心价值观]] · [[Life Theme|人生主题]]
