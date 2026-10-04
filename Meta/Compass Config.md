---
birthdate: 
life_expectancy: 80
daily_folder: 01 Journal/Daily
weekly_folder: 01 Journal/Weekly
quarterly_folder: 01 Journal/Quarterly
retreat_folder: 02 Retreats
projects_folder: 04 Projects
dq_prefix: dq_
habit_prefix: habit_
wheel_prefix: wheel_
board_done_lanes: Done,Published,Archive
questions:
  - key: dq_goals
    text: 今天我是否尽力设定了清晰目标？
  - key: dq_progress
    text: 今天我是否尽力推动了重要目标的进展？
  - key: dq_meaning
    text: 今天我是否尽力寻找了意义感？
  - key: dq_happy
    text: 今天我是否尽力保持积极和快乐？
  - key: dq_relationships
    text: 今天我是否尽力经营了积极关系？
  - key: dq_engaged
    text: 今天我是否尽力保持投入？
habits:
  - habit_journal
  - habit_exercise
  - habit_reading
wheel_areas:
  - wheel_health
  - wheel_relationships
  - wheel_family
  - wheel_career
  - wheel_finances
  - wheel_growth
  - wheel_fun
  - wheel_meaning
property_labels:
  dq_goals: 清晰目标
  dq_progress: 目标进展
  dq_meaning: 意义感
  dq_happy: 积极与快乐
  dq_relationships: 积极关系
  dq_engaged: 全心投入
  habit_journal: 写日记
  habit_exercise: 运动
  habit_reading: 阅读
  wheel_health: 健康
  wheel_relationships: 人际关系
  wheel_family: 家庭
  wheel_career: 事业
  wheel_finances: 财务
  wheel_growth: 成长
  wheel_fun: 乐趣
  wheel_meaning: 意义
---
# Compass 配置

这是系统的统一配置入口。`Meta/views/` 中的仪表盘组件和日记、季度复盘、每日问答模板都会读取此文件。

## 个人信息

| 属性 | 用途 | 填写方式 |
| --- | --- | --- |
| `birthdate` | 珍惜时间组件 | 出生日期，格式 `YYYY-MM-DD`；默认留空。 |
| `life_expectancy` | 珍惜时间组件 | 用于时间可视化的假设寿命，单位为年，不是预测。 |

## 每日问题（`questions`）

每天用 1–10 分回答「今天我是否尽力……」。评价投入，不评价结果。默认六题参考 Marshall Goldsmith 的《Triggers》。在 `text` 中修改问题文案；`key` 用于关联历史数据，请保留已有键及 `dq_` 前缀。新建日记会读取列表，晚间问答按列表顺序提问。

如需采用 Mike Schmitz 视频中的问题组合，可参考下列配置。它使用不同属性键，属于新增问题组，不会自动迁移已有评分。

```yaml
questions:
  - {key: dq_spiritual, text: 今天我是否尽力获得精神上的成长？}
  - {key: dq_spouse, text: 今天我是否尽力关爱伴侣？}
  - {key: dq_kids, text: 今天我是否尽力关爱孩子？}
  - {key: dq_friend, text: 今天我是否尽力成为好朋友？}
  - {key: dq_learn, text: 今天我是否尽力学习了新东西？}
  - {key: dq_create, text: 今天我是否尽力创造了些什么？}
  - {key: dq_exercise, text: 今天我是否尽力运动了？}
```

## 习惯（`habits`）

每个习惯会成为新日记中的复选框属性。每阶段保留 3–5 项，例如 `habit_journal`（写日记）、`habit_exercise`（运动）、`habit_reading`（阅读）。新增键需保留 `habit_` 前缀；移出列表不会删除旧日记中的记录。

## 生命之轮（`wheel_areas`）

每个领域会成为新季度复盘中的 1–10 分数值属性。保留已有 `wheel_` 属性键，在 `property_labels` 中设置中文名称。

## 中文显示名称（`property_labels`）

此映射只改变界面标签，不改变属性键或历史记录。仪表盘、Life OS 界面和习惯问答会优先显示这里的名称。自定义问题或习惯可按同样方式添加；没有映射时，系统回退为属性键生成的名称。

## 目录与前缀

| 属性 | 用途 |
| --- | --- |
| `daily_folder`、`weekly_folder`、`quarterly_folder`、`retreat_folder`、`projects_folder` | 组件和快捷链接的目录，必须与 Periodic Notes、QuickAdd、Templater 设置一致。 |
| `dq_prefix`、`habit_prefix`、`wheel_prefix` | 自动识别属性。 |
| `board_done_lanes` | 在看板统计中视为已完成的列名。 |

中文发行版保留上游目录、文件名、命令 ID 和数据键，以便持续同步。调整显示文案即可，无需重命名它们。
