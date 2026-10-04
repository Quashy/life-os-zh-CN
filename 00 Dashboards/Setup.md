---
status: open
setup_claude_login: false
setup_mcp_registered: false
setup_vault_lens: false
setup_backup: false
tags:
  - setup
---
每天晚上，诚实回答一组问题。从这里开始，再逐步加入规划、习惯、任务、写作和 AI 助手。Compass 的工作流参考了 Mike Schmitz 的公开视频《How I Run My Whole Life Out of Obsidian》，与 Practical PKM 无从属或背书关系。本版本为社区汉化版。

## 步骤 A：启用插件（请先完成）
在 Obsidian 中打开这个文件夹时，选择关闭**安全模式（Restricted mode）**。如果已关闭提示框，进入「设置 → 第三方插件」，选择 **Turn off Restricted mode**。十个第三方插件和第一方 Life OS 插件已包含在文件夹内。按 Ctrl/Cmd+P，运行 **Reload app without saving**（不保存并重新加载应用）。重新加载后会自动打开 Life OS。

首次在本设备打开此笔记库，还需进入「设置 → Templater」，开启 **Trigger Templater on new file creation**（新建文件时运行 Templater），并确认 **Template matching mode** 为 **Folder templates**。自动触发开关仅保存在本设备，分发包不会代为开启；文件夹匹配模式已预设，但它本身不表示自动触发已开启。迁移到新设备后请重新检查。

**如果下方显示的是代码而非检查清单，请先完成步骤 A。**

## 设置进度
```dataviewjs
await dv.view("Meta/views/setup");
```
以下四项需要你自行确认：智能体登录、MCP 注册、浏览器扩展连接、备份。完成后，在本笔记的属性中勾选对应项目；脚本无法验证这些状态。

## 今天：用 20 分钟开始
1. 完成上面的步骤 A。
2. 打开 [[Compass Config|配置]]，填写 `birthdate`（出生日期）。
3. 打开 [[Life Theme|人生主题]]，在 `## Theme` 下写一句草稿。它会显示在每篇日记里，第一次季度复盘时再完善。
4. 打开 [[Compass Dashboard|Compass 仪表盘]]，先用示例数据熟悉页面。
5. 今晚按 Ctrl/Cmd+Shift+D 创建或打开今日笔记，按 Ctrl/Cmd+Shift+Q 回答每日问题。按 1–10 分评价自己的投入，再在 `## Journal` 下写一句日记。今天做到这里即可。

## 本周
- 每天早晨按 Ctrl/Cmd+Shift+D 打开今日笔记，晚上按 Ctrl/Cmd+Shift+Q 回答问题。
- 第 3 天：打开 [[Compass Config|配置]]，调整一个不贴合自己的问题，只保留 3–5 个习惯。
- 第 7 天：查看 [[Daily Questions|每日问题]]，先观察，不急着调整。粗略填写 [[Ideal Week|理想一周]]，完成后移除其 `example` 属性。阅读模块是可选的：可填写 [[Reading Plan|阅读计划]]；暂不使用时可先保留为空。

## 本月
- 第 8 天：用 `tag:#example` 搜索并检查示例笔记，确认不再需要后逐一删除。[[16 Onboarding Assistant|入门助手]]可协助逐个确认。
- 第 14 天：按 Ctrl/Cmd+Alt+W 打开本周笔记，先填写「What went well（做得好的地方）」。
- 第 21 天：如需 AI 助手，阅读 [[14 Agent Client and Claude Code|配置 AI 助手]]，再使用下方「协助设置笔记库」按钮。
- 第 30 天：如果已有至少 25 天完成评分（清单会统计），阅读 [[04 Workflow - Personal Retreat|季度复盘]]，预约第 60–90 天的复盘时间。任务、写作看板和浏览器扩展可稍后再加入，参见 [[11 Build Order|搭建顺序]]。

## 借助 AI 助手
```agent
type: button
text: "协助设置笔记库"
prompt: "Read Prompts/16 Onboarding Assistant.md with vault_read and follow its Prompt section from step 0."
viewType: right-pane
autoSend: false
```

## 中文使用说明
本版本已提供中文指南、问题文本与界面。请在 [[Compass Config|配置]] 中修改问题的 `text`，保留已有 `dq_*`、`habit_*`、`wheel_*` 属性键，避免历史数据被拆成不同序列。英文目录名和部分章节标题用于插件定位，不要随意更名。

## 完成设置
将本笔记的 `status` 属性设为 `done`，检查清单就会收起。需要重新检查时，改回 `open`。
