---
date: 2026-08-26
quarter: 2026-Q3
tags:
  - retreat
  - example
wheel_health: 6
wheel_relationships: 4
wheel_family: 8
wheel_career: 7
wheel_finances: 6
wheel_growth: 8
wheel_fun: 5
wheel_meaning: 7
---
> 这是一篇示例季度复盘，让 Compass 仪表盘能够绘制生命之轮。请将分数和文本替换为自己的内容；保持文件名格式 `YYYY-QN Personal Retreat`。

Previous retreat: [[2026-Q2 Personal Retreat]]（上次复盘） · Quarter note: [[2026-Q3]]（季度笔记） · Same quarter last year: [[2025-Q3 Personal Retreat]]（去年同季度）

## 1. Review life theme and core values

*1. 回顾人生主题与核心价值观*

![[Life Theme#Theme]]
![[Core Values#Values]]

Notes:
*备注*

- 仍然认同，暂不修改。

## 2. Review the journal

*2. 回顾日记*

```dataviewjs
const q = moment(dv.current().quarter, "YYYY-[Q]Q");
await dv.view("Meta/views/dailyquestions", { from: q.clone().startOf("quarter").format("YYYY-MM-DD"), to: q.clone().endOf("quarter").format("YYYY-MM-DD") });
```
```dataviewjs
await dv.view("Meta/views/habits", { days: 28 });
```
What stood out:
*印象深刻的事情*

- 在每日问题中，人际关系的得分一直最低。

## 3. Wheel of life

*3. 生命之轮*

```dataviewjs
await dv.view("Meta/views/wheel", { page: dv.current().file.path });
```
Focus area for the next 90 days:
*未来 90 天的聚焦领域*

- 人际关系

Why this one:
*选择这个领域的原因*

- 在生命之轮和每日问题中都是最低分。其他方面仍能维持。

## 4. Retrospective

*4. 回顾与反思*

### Part 1: Look back at last quarter

*第一部分：回顾上季度*

What went well:
*做得好的地方*

- 写日记坚持了 60 多天。

What did not go well:
*做得不好的地方*

- 习惯记录放在单独的应用里，到第三周就放弃了。

What I learned:
*我学到的*

- 只有把记录放在能够解释为什么没做到的反思旁边，才容易坚持。

### Part 2: Start / Stop / Keep

*第二部分：开始、停止、保持*

| Start | Stop | Keep |
| --- | --- | --- |
| 每周给一位朋友打电话 | 使用单独的习惯应用 | 每晚 21:00 回答每日问题 |

## 5. Intentions for next quarter

*5. 下季度意向*

1. 每周给一位朋友打电话或见面。
2. 在每日笔记中记录习惯，每周五回顾。
3. 每周完成一篇在仓库中创作的作品。

## 6. Review the ideal week

*6. 回顾理想一周*

![[Ideal Week#Grid]]

Changes to make:
*需要做的调整*

- 在星期四 20:00 加入“给朋友打电话”。

## 7. Projects to commit to

*7. 决定投入的项目*

- [[Example Project - Compass Vault]]

## Closing

*结束语*

- 这个季度，要切实关心身边的人，并如实记录。
