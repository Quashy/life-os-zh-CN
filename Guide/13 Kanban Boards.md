插件：Kanban 2.0.51（`obsidian-kanban`，仓库现位于 https://github.com/community-archive/obsidian-kanban，原为 mgmeyers）。看板是纯 Markdown：每个 `## Heading` 是一列，每个 `- [ ]` 行是一张卡片，因此即使没有插件，看板仍可搜索、链接和阅读。

## 本笔记库中的看板
| 看板 | 列 | 内容来源 |
| --- | --- | --- |
| `04 Projects/Projects Board` | Ideas（想法）→ This quarter（本季度）→ In progress（进行中）→ Waiting on someone（等待他人）→ Done（完成） | QuickAdd **Project idea**（项目想法）；卡片链接到项目笔记 |
| `06 Writing/Newsletters/Newsletter Board` | Backlog（待办）→ Outlining（提纲）→ Drafting（草稿）→ Editing（编辑）→ Ready to publish（待发布）→ Published（已发布） | QuickAdd **Newsletter idea**（邮件通讯想法） |
| `06 Writing/YouTube Scripts/YouTube Board` | 同上 | QuickAdd **Video idea**（视频想法） |
| `06 Writing/Articles/Article Board` | 同上 | QuickAdd **Article idea**（文章想法） |
| `06 Writing/Course Content/Course Board` | 同上 | 手动添加 |

## 配置如何连接
- 全局默认值位于 `.obsidian/plugins/obsidian-kanban/data.json`：用 `@` 输入的日期（如 `@{2026-09-30}`）会链接到每日笔记；显示相对日期；归档时写入日期。
- 每个看板自己的设置位于底部 `%% kanban:settings %%` 块，其中设置 **New note folder**（新笔记文件夹）和 **Note template**（笔记模板）。因此，在 Newsletter 看板上把卡片转换为笔记，会用 `Templates/Newsletter.md` 在 `06 Writing/Newsletters` 中创建笔记。
- `Meta/views/boards.js` 读取所有属性中带 `kanban-plugin` 的笔记，显示各列数量。[[Compass Dashboard|Compass 仪表盘]]上使用紧凑视图，[[Boards|看板总览]]显示完整视图。配置 `board_done_lanes` 列出的列名，统计为已完成。

## 使用建议（来自视频，17:42）
- 每种工作类型一个看板，放在对应类型的文件夹里。先捕获到待办栏，再从左向右拖动；只有作品真正发布后，卡片才进入 Published。
- 卡片是入口。实际工作放在卡片链接的笔记中，也就是任务笔记，而不是卡片文字里。
- 季度复盘时归档已完成卡片，使看板保持对当前状态的清晰呈现。

## 模板维护说明
该插件的 README 表示正在寻找新维护者。它能在当前 Obsidian 中运行，格式又是纯 Markdown，因此风险较低：即使将来插件失效，看板仍是可读的列表，可以迁移到其他看板插件，例如 Bases 看板视图，而不丢失数据。
