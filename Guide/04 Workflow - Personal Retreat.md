# 工作流 2：季度个人复盘

视频：5:52 至 7:53。“毫不夸张，这是我日历上最有价值的一天。”

## 流程（6:12），按 Mike 的实际顺序
1. 回顾**生活主题**和**核心价值观**：它们是否仍与你产生共鸣？
2. 回顾**日记条目**：结合查询与每日问题仪表盘，寻找趋势。
3. **生命之轮**：为各领域当前的幸福感评分，选出未来 90 天的一个重点领域。
4. **两部分回顾**：先回望本季度，再列出要**开始、停止、继续**的事情。
5. **确定下季度意向**。
6. 检查**理想的一周**，确保为这些意向真正安排了时间。

## 本笔记库的实现
- `Templates/Personal Retreat.md` 会自动应用到 `02 Retreats/` 下创建的笔记，由 Templater 文件夹模板处理。
- 文件名约定为 **`YYYY-QN Personal Retreat`**。Compass 仪表盘根据该名称与日期定位当季复盘（19:22），并从 `wheel_*` 数值属性绘制生命之轮。找不到时使用最近一次复盘。
- 模板链接到上次复盘和去年同季度复盘，方便并排对照（7:10）。
- 第 2、3 节实时显示本季度每日问题、习惯、收获列表，以及你填写的 `wheel_*` 数值雷达图。
- 第 5 节的意向会嵌入季度笔记，再由季度笔记嵌入每周笔记。只需写一次。

## 生命之轮领域（按需调整）
原工作流举例使用 `wheel_faith`、`wheel_family`、`wheel_marriage`、`wheel_friends`、`wheel_health`、`wheel_career`、`wheel_finances`、`wheel_growth`。本模板的实际列表以 `Meta/Compass Config.md` 中的 `wheel_areas` 为准，新复盘模板会读取它；图表会发现已有的 `wheel_*` 属性。中文版本通过 `property_labels` 修改显示名称，保留已有属性 key 和历史记录。

## 使用建议
- 留出完整一天，不必去小木屋（7:40）。
- 先读上季度复盘。如果本季度意向只是把上季度换了个说法，这本身就是一个发现。
- 最多三个意向，每个都要能落实为每周行动。
- 最后创建或更新项目笔记，并设置 `quarter:`，使季度笔记能列出这些项目。

相关资源：NeuYear Personal Retreat Planner（Mike 推荐的纸质方案）：https://www.neuyear.net/products/the-personal-retreat-planner
