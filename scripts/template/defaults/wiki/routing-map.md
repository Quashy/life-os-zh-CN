---
type: meta
title: Routing Map
status: evergreen
created: 2026-08-26
updated: 2026-08-26
tags:
  - meta
  - routing
---

# 知识路由规则

以下规则规定 claude-obsidian 在 Compass 中的存储位置。知识笔记只写入 `wiki/`，导入载荷存入 `.raw/`。应链接已有内容，避免复制出多份。

| 操作 | 目标位置 | 规则 |
| --- | --- | --- |
| 用 `/save` 保存答案、决定或见解 | `wiki/concepts/<slug>.md` | 每个观点一页，链接到其来源笔记（日记、复盘或项目）。 |
| 用 `/save` 保存会话摘要 | `wiki/log.md` | 追加记录，最新内容在前。 |
| 导入书籍、文章、转录或剪藏页面 | `wiki/sources/<slug>.md` + 来源账本条目 | 手写读书笔记保留在 `07 Library/Book Notes`，沿用 Templater 模板和引文块 ID，不移动它们。 |
| 与人物有关的内容 | 链接到 `05 People/<Name>.md` | 已有对应人物笔记时，不再创建 `wiki/entities/<name>.md`。 |
| 与项目有关的内容 | 链接到 `04 Projects/<Name>.md` | 沿用相同规则。 |
| 日记、复盘、规划、习惯与任务内容 | 禁止导入 | 这些属于个人生活记录，不进入账本或来源模型。 |
| 待研究问题 | `wiki/index.md` → Questions | 仅在获得明确同意后运行 `autoresearch`，因为它涉及网络传输。 |

模式为 `generic`（没有 `.vault-meta/mode.json`）。不要切换为 PARA，以免在 `wiki/` 中重复创建 `04 Projects` 和 `03 Planning`。
