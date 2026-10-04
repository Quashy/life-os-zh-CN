本笔记库从零实现了 Mike Schmitz 在 **《How I Run My Whole Life Out of Obsidian》**（Practical PKM，2026 年 6 月 26 日）中介绍的整套系统：https://www.youtube.com/watch?v=-h7ZAuuNDLE。这是独立实现，来源说明见 `CREDITS.md`。

第一次使用？先打开 [[Setup|设置向导]]，查看状态清单，以及第 1 天、第 1 周、第 1 个月的使用安排。本页用于了解整个系统。

七套工作流，一个笔记库，上层由仪表盘统一呈现：

| # | 工作流 | 所在位置 | 指南 |
| --- | --- | --- | --- |
| 1 | 日记与每日问题 | `01 Journal/Daily`、`Templates/Daily Note.md`、`Templates/Daily Questions Prompt.md`；问题在 `Meta/Compass Config.md` 中 | [[03 Workflow - Journaling and Daily Questions\|日记与每日问题]] |
| 2 | 季度个人复盘 | `02 Retreats`、`Templates/Personal Retreat.md` | [[04 Workflow - Personal Retreat\|季度个人复盘]] |
| 3 | 多尺度规划 | `01 Journal/{Daily,Weekly,Quarterly}`、`03 Planning` | [[05 Workflow - Multi-Scale Planning\|多尺度规划]] |
| 4 | 习惯追踪 | 每日笔记中的 `habit_*` 属性、`00 Dashboards/Habit Canvas.md` | [[06 Workflow - Habit Tracking\|习惯追踪]] |
| 5 | 每日阅读（以《圣经》为完整示例） | `09 Reading` | [[07 Workflow - Daily Reading\|每日阅读]] |
| 6 | 任务管理 | `08 Tasks/Tasks.md`、`04 Projects`、`05 People`、`00 Dashboards/Task Dashboard.md` | [[08 Workflow - Task Management\|任务管理]] |
| 7 | 写作 | `06 Writing/*` 下的各类写作看板 | [[09 Workflow - Writing\|写作]] |
| + | Compass 仪表盘 | `00 Dashboards/Compass Dashboard.md`、`Meta/views/*.js` | [[10 Compass Dashboard\|Compass 仪表盘]] |
| + | Kanban 看板 | `04 Projects/Projects Board.md`、`06 Writing/*/… Board.md`、`00 Dashboards/Boards.md` | [[13 Kanban Boards\|Kanban 看板]] |
| + | 笔记库内的 AI | `AGENTS.md`、`Prompts/`、`00 Dashboards/Assistant.md` | [[14 Agent Client and Claude Code\|Agent Client 与 Claude Code]]、[[20 Prompt Library\|提示词库]] |
| + | 知识层（claude-obsidian） | `wiki/`、`inbox/`、`wiki/routing-map.md` | [[15 claude-obsidian]] |
| + | 研究与发布 | Web viewer、SEO、Vault Lens | [[16 SEO, Web Viewer, and Vault Lens\|SEO、Web viewer 与 Vault Lens]]、[[17 Search Providers\|搜索服务]] |
| + | Obsidian MCP 桥接 | Local REST API `/mcp`、`.mcp.example.json` | [[19 Obsidian MCP Bridge\|Obsidian MCP 桥接]] |
| + | Life OS 应用 | 原生导航、快速捕获、实时今日状态，以及受规则约束的 AI 入口 | [[21 Life OS Application\|Life OS 应用]] |

接下来阅读：[[01 Principles|设计原则]]（系统背后的理念）、[[02 Plugins|插件]]（已安装内容及首次打开清单）、[[11 Build Order|搭建顺序]]（为什么要逐层添加）、[[12 Resources and Links|资源与链接]]。

## 逐层添加的原则
原作者用了五年搭建视频中展示的系统。先选一套工作流，通常是每日日记，连续使用 30 天，再添加下一层。[[Setup|设置向导]]按这个顺序引导你。

## 维护者
发行版通过 `scripts/build_template.py` 构建，并由 `scripts/verify_template.py` 检查；详见 `scripts/RELEASE.md`。
