视频：18:36 至 20:46。所有内容都由 DataviewJS 读取属性生成，页面上的展示内容无需手动填写。

## 组件及其数据来源
| 组件（视频时间） | 视图 | 读取内容 |
| --- | --- | --- |
| 本季度复盘的生命之轮（19:18） | `Meta/views/wheel.js` | 根据今日日期定位 `02 Retreats/YYYY-QN Personal Retreat.md`，读取其中的 `wheel_*` 数值 |
| 合并的每日问题、开关和时间范围下拉框（19:39） | `Meta/views/dailyquestions.js` | 每日笔记中的所有 `dq_*` 数值 |
| 习惯：当前连续完成、最佳连续完成、最长中断、完成率、总数、近期记录（20:01） | `Meta/views/habits.js` | 每日笔记中的所有 `habit_*` 复选框 |
| 生活主题（20:19） | 嵌入 | `03 Planning/Life Theme.md#Theme` |
| 生命倒计时（20:21） | `Meta/views/memento.js` | `Meta/Compass Config.md` 中的 `birthdate`、`life_expectancy` |
| 捕获入口和规划笔记快捷链接（20:23） | `Meta/views/quicklinks.js` | QuickAdd 命令 id、今日日期 |

此外还有：`Projects Dashboard.md`（他的项目仪表盘，19:03）、`Daily Questions.md`（他的日记仪表盘，18:54）、`Habit Canvas.md`、`Task Dashboard.md`。

## 在任意位置使用视图
```dataviewjs
await dv.view("Meta/views/habits", { days: 28 });
await dv.view("Meta/views/dailyquestions", { from: "2026-07-01", to: "2026-09-30" });
await dv.view("Meta/views/wheel", { page: "02 Retreats/2026-Q2 Personal Retreat" });
await dv.view("Meta/views/week", { week: "2026-W35" });
```

## 配置
`Meta/Compass Config.md` 保存文件夹、前缀、出生日期和预期寿命。缺少配置时，视图会回退到合理默认值。

## 扩展
Mike 在 Claude 的帮助下搭建了自己的仪表盘。要添加组件，可复制 `Meta/views/habits.js`，保留前四行的配置、文件夹和前缀处理，修改收集与渲染逻辑，再通过 `dv.view` 调用。视图之间不能相互导入，因此每个视图都是独立的。
