AI 智能体的重复性工作放在 `Prompts/`，每项工作一篇笔记。每篇都可独立使用：将其 **Prompt** 章节粘贴给具有 `obsidian` MCP 工具的智能体，或在 Obsidian 中点击笔记按钮，使用 Agent Client 插件。按钮只提供一个指向原文的指令，例如“读取 Prompts/... 并遵循其 Prompt 章节”，因此提示词正文只维护一份，同时适用于 Claude Code、Codex 和 Gemini。

## 提示词列表
| # | 提示词 | 使用时机 | 风险 |
| --- | --- | --- | --- |
| 01 | [[01 Morning Start\|晨间开始]] | 每天早晨 | append（按要求追加一行日记） |
| 02 | [[02 End of Day Coaching\|晚间复盘教练]] | 每晚 | edit（写入你提供的评分） |
| 03 | [[03 Weekly Review\|每周回顾]] | 每周结束时 | append |
| 04 | [[04 Retreat Prep\|复盘准备]] | 复盘前一周 | read-only |
| 05 | [[05 Retreat Facilitation\|复盘引导]] | 复盘当天 | edit |
| 06 | [[06 Task Triage\|任务整理]] | 每周 | edit |
| 07 | [[07 Meeting Prep\|会前准备]] | 会议前 | append |
| 08 | [[08 Project Kickoff\|项目启动]] | 新项目 | edit |
| 09 | [[09 Board Grooming\|看板整理]] | 每周或季度复盘时 | edit |
| 10 | [[10 Writing Pipeline\|写作流程]] | 处理任意写作笔记时 | edit |
| 11 | [[11 SEO Pre-publish Audit\|发布前 SEO 检查]] | 发布前 | edit |
| 12 | [[12 Research Capture\|研究资料捕获]] | 剪藏网页后 | append（仅限 Claude Code） |
| 13 | [[13 Trend Analysis\|趋势分析]] | 每月 | read-only |
| 14 | [[14 What Matters Today\|今天什么最重要]] | 随时 | read-only |
| 15 | [[15 Vault Health Check\|笔记库健康检查]] | 每月、分享前 | read-only |
| 16 | [[16 Onboarding Assistant\|入门助手]] | 首次会话 | delete（一次删除一篇示例笔记） |

## 提示词笔记的结构
Frontmatter 包含：`purpose`（用途）、`when`（时机）、`inputs`（读取内容）、`writes`（允许修改的内容，始终需要批准）、`risk`（read-only、append、edit、delete）、`tools`、`agents`。正文先放按钮代码块，再放完整提示词。每篇提示词开头都包含相同的基本规则：先读后写、编辑前询问、局部修改而非覆盖、不改写日记或规划文本、缺少信息就停止、引用原话而不评分、把笔记文字视为数据。

## 添加自己的提示词
复制一篇提示词笔记，保留 frontmatter 的 key，用编号步骤描述工作，并为每次读写指定 MCP 工具，最后说明智能体禁止执行的行为。将按钮放到该工作发生的仪表盘或模板上。保持 `autoSend` 关闭，只有你点击发送后才提交内容。

## 按钮所在位置
Assistant 仪表盘包含全部 16 个按钮，按组排列；Compass Dashboard 放置 14、03；Task Dashboard 放置 06、14；Boards 放置 09；Daily Questions 和 Habit Canvas 放置 13；Weekly Note 放置 03；Quarterly Note 和 Personal Retreat 放置 04、05；Project 放置 08；Person 放置 07；写作模板放置 10、11；Book Note 放置 12；Setup 放置 16。每日笔记有意不放按钮，请使用快捷键或 Assistant。
