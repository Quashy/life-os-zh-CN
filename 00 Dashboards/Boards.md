此页实时读取笔记库里的 Kanban 看板。卡片从左向右推进，`Done` 或 `Published` 列视为完成。看板是普通 Markdown 文件，QuickAdd 的灵感捕获命令会写入指定列。

```agent
type: button
text: "整理看板"
prompt: "Read Prompts/09 Board Grooming.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```

## 概览
```dataviewjs
await dv.view("Meta/views/boards", { compact: true });
```

## 项目
```dataviewjs
await dv.view("Meta/views/boards", { folder: "04 Projects" });
```

## 写作
```dataviewjs
await dv.view("Meta/views/boards", { folder: "06 Writing" });
```

## 添加看板
1. 创建笔记，在命令面板运行 **Kanban: Create new board**，或添加 `kanban-plugin: board` 属性。
2. 为各列命名，将完成列放在最后并命名为 `Done` 或 `Published`。如需自定义完成列名称，请同步修改 [[Compass Config|配置]] 中的 `board_done_lanes`。
3. 可在看板设置中配置 **New note folder** 和 **Note template**，让从卡片创建的笔记使用正确的目录与模板。
