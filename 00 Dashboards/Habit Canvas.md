在日记的 `habit_*` 复选框属性中记录习惯。此页只展示已有记录，不推送提醒，也不因连续记录中断而给你压力。习惯和当天的日记放在一起，方便理解背后的原因。

## 最近 8 周
```dataviewjs
await dv.view("Meta/views/habits", { days: 56 });
```

## 最近 2 周
```dataviewjs
await dv.view("Meta/views/habits", { days: 14 });
```

## 调整跟踪的习惯
1. 打开 [[Compass Config|配置]]。
2. 在 `habits` 列表中添加或移除条目，保留 `habit_` 前缀和已有属性键。
3. 新建日记会带上新的复选框，仪表盘会自动识别。

每个阶段只跟踪 3–5 个习惯。诚实记录，比追求完美更有帮助。

## 询问助手
```agent
type: button
text: "分析问题与习惯趋势"
prompt: "Read Prompts/13 Trend Analysis.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
autoSend: false
```
