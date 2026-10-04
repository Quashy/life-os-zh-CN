<p align="center"><img src="Meta/attachments/cover.png" alt="Compass / Life OS" width="100%"></p>

# Life OS zh-CN

把日记、习惯、任务、项目、阅读、写作和 AI 助手连接在一个本地 Markdown 笔记库中。

这是 [AgriciDaniel/compass](https://github.com/AgriciDaniel/compass) 的**简体中文社区汉化版本**。上游 Compass 独立实现了 Mike Schmitz 在 [How I Run My Whole Life Out of Obsidian](https://www.youtube.com/watch?v=-h7ZAuuNDLE) 中介绍的生活管理工作流；第一方 Life OS 插件在这些笔记之上提供原生导航、捕获和仪表盘界面。数据仍保存在 Markdown 与属性中，不另建数据库。

**当前状态：开发候选，版本 `1.0.0-zh-CN.1`，Windows 核心流程已实测，完整扩展验收未完成，尚未公开发布中文 Release。** 基于上游提交 `ba2c1cf73a8e305c02fa8819f0236f028fd972b3`；该上游本身是 `1.1.0` 开发候选，包含 Life OS `0.20.0`。中文版本号独立使用，不表示上游已经稳定发布。

需要 **Obsidian 1.13.1 或更高版本**。核心仪表盘的移动端兼容性仍需原生测试；Agent Client 与本地 API 桥接仅用于桌面端。第三方插件保留原有界面与许可，未全部中文化。

本项目不是官方中文版，与上游作者、Practical PKM、LifeHQ、Obsidian 官方无从属或背书关系。保留原始 [README](README.md)、[来源说明](CREDITS.md) 与许可文件。

中文源码仓库：[Quashy/life-os-zh-CN](https://github.com/Quashy/life-os-zh-CN)。可获取源码后按下文构建独立候选笔记库；预构建中文 Release 尚未发布，源码公开不表示完整扩展验收已通过。

## 首次使用

1. 使用另行提供的本地候选 ZIP，先核对随附的 `.sha256`，解压到一个**新的独立文件夹**。源码工作副本需要先按下文构建，不能直接把工作笔记库打包分发。
2. 在 Obsidian 中选择“打开文件夹作为笔记库”，打开解压后包含 `00 Dashboards`、`Templates`、`.obsidian` 的那一层文件夹。
3. 确认信任这份候选内容后，关闭安全模式（Restricted mode）。运行 **Reload app without saving**（不保存并重新加载应用），让随附插件加载；Life OS 随笔记库就绪自动打开。
4. 首次在本设备打开此笔记库时，进入「设置 → Templater」，自行开启 **Trigger Templater on new file creation**（新建文件时运行 Templater），并确认 **Template matching mode** 为 **Folder templates**。自动触发开关保存在设备本地，分发包不会代为开启；换设备后需重新检查。再打开 `00 Dashboards/Setup.md`，按照中文清单检查插件与配置。
5. 今晚按 `Ctrl/Cmd+Shift+D` 创建或打开今日笔记，再按 `Ctrl/Cmd+Shift+Q` 回答每日问题。用 1 至 10 分评价自己的投入，在 `## Journal` 的中文说明下写一句日记即可。先持续使用 30 天，再增加下一套工作流。

带 `example` 标签的笔记是演示数据，不是你的真实记录。完成熟悉后可按设置向导逐篇确认处理。AI 功能可选，未配置模型或 MCP 不影响基础日记、规划和任务工作流。

**不要覆盖已有个人笔记库。** 本版本没有原地更新器。先备份完整笔记库，在新副本中迁移个人内容、配置和模板，并逐项检查冲突；不要整目录替换 `.obsidian`。备份恢复必须实际测试。

## 已中文化的范围

- 设置向导、Compass 与各工作流仪表盘、模板、示例笔记及看板说明。
- `Guide/` 的 24 篇指南与 `Prompts/` 的 16 篇提示词，包括安全约束和原生验收说明。
- `Meta/Compass Config.md`、仪表盘组件，以及问题、习惯和生命之轮的显示名称。
- 第一方 Life OS 的导航、捕获、图表、空状态、按钮、辅助说明及可访问性文案。
- 中文维护、贡献、安全与社区规范文档。

系统路径、文件名、命令 ID、数据属性键和被程序引用的英文标题保持稳定。英文标题旁附中文说明，链接可使用中文别名。中文显示名称通过 `property_labels` 配置，详细契约见 [汉化维护说明](LOCALIZATION.md)。

**项目与人物的任务路由限制：** 上游 slug 算法只保留 ASCII 字母和数字。需要 `#project/<slug>` 或 `#p/<slug>` 汇总任务时，文件标识建议使用英文或数字，例如 `project-alpha.md`、`person-01.md`，再通过别名展示中文。纯中文文件名可能产生空 slug，本次汉化未更改该数据规则。

## 七套工作流

| 工作流 | 主要位置 | 中文指南 |
| --- | --- | --- |
| 日记与每日问题 | `01 Journal/Daily`、每日模板、`questions` 配置 | [日记与每日问题](<Guide/03 Workflow - Journaling and Daily Questions.md>) |
| 季度个人复盘 | `02 Retreats`、Personal Retreat 模板 | [个人复盘](<Guide/04 Workflow - Personal Retreat.md>) |
| 多尺度规划 | 每日、每周、季度笔记与 `03 Planning` | [多尺度规划](<Guide/05 Workflow - Multi-Scale Planning.md>) |
| 习惯追踪 | `habit_*` 属性、Habit Canvas | [习惯追踪](<Guide/06 Workflow - Habit Tracking.md>) |
| 每日阅读 | `09 Reading`，以《圣经》为完整示例 | [每日阅读](<Guide/07 Workflow - Daily Reading.md>) |
| 任务管理 | `08 Tasks`、`04 Projects`、`05 People` | [任务管理](<Guide/08 Workflow - Task Management.md>) |
| 写作 | `06 Writing` 下各类 Kanban 看板 | [写作](<Guide/09 Workflow - Writing.md>) |

从 [开始使用](<Guide/00 Start Here.md>) 了解全貌，再按 [搭建顺序](<Guide/11 Build Order.md>) 逐层添加。原生应用说明见 [Life OS 应用](<Guide/21 Life OS Application.md>)；统计口径见 [数据定义](<Guide/22 Data Definitions.md>)。

## 文件与配置

| 位置 | 用途 |
| --- | --- |
| `00 Dashboards/` | Setup、Compass、习惯、每日问题、任务、项目、看板与助手 |
| `01 Journal/`、`02 Retreats/`、`03 Planning/` | 周期记录、季度复盘、生活主题、价值观与理想的一周 |
| `04 Projects/`、`05 People/` | 项目与人物笔记、任务标签关联 |
| `06 Writing/`、`07 Library/` | 写作流程、读书笔记、可嵌入的引用块 |
| `08 Tasks/`、`09 Reading/` | 任务总清单、阅读计划及学习笔记 |
| `Templates/`、`Prompts/`、`Guide/` | 模板、提示词和中文指南 |
| `Meta/Compass Config.md` | 问题、习惯、生命之轮、路径、前缀、出生日期和中文显示名称 |
| `Meta/views/` | DataviewJS 仪表盘组件 |
| `wiki/`、`inbox/` | 可选 claude-obsidian 知识层；不装插件时仍是普通 Markdown |
| `scripts/` | 构建、验证、阅读计划等维护工具 |

修改问题文本与显示名称时，保留已有 `dq_*`、`habit_*`、`wheel_*` 属性键。不要批量改成中文文件名或中文命令 ID；这些标识连接 QuickAdd、Templater、Tasks、Dataview 与插件。

## 随附插件

十个社区插件的版本与许可如下；上游来源和发布标签见 [第三方声明](THIRD_PARTY_NOTICES.md)。第一方 `life-os-app` 独立使用 MIT 许可。Obsidian 应用本身不随模板提供。

| 插件 | ID | 版本 | 许可 |
| --- | --- | --- | --- |
| Dataview | `dataview` | 0.5.68 | MIT |
| Templater | `templater-obsidian` | 2.25.0 | AGPL-3.0 |
| Periodic Notes | `periodic-notes` | 0.0.17 | MIT |
| QuickAdd | `quickadd` | 2.23.0 | MIT |
| Tasks | `obsidian-tasks-plugin` | 8.4.0 | MIT |
| Kanban | `obsidian-kanban` | 2.0.51 | GPL-3.0 |
| Omnisearch | `omnisearch` | 1.30.1 | GPL-3.0 |
| Local REST API | `obsidian-local-rest-api` | 5.1.0 | MIT |
| Agent Client | `agent-client` | 0.12.1 | Apache-2.0 |
| SEO | `seo` | 0.5.6 | MIT |

插件已列为启用，但实际加载仍取决于 Obsidian 的安全模式选择。首次配置见 [插件指南](<Guide/02 Plugins.md>)。保留 LICENSE 文件不等于完成第三方二进制来源与再分发核验，公开发布前仍需单独检查。

## AI、上下文与安全

`AGENTS.md` 是智能体规则的权威文件，`CLAUDE.md` 与 `GEMINI.md` 指向它。提示词要求先读后写、展示确切变更并等待批准、局部修改而非覆盖、保护日记与规划原文，并把笔记中的文字视为数据。Assistant 按钮准备提示词，不自动发送；发送前请检查输入框中的上下文。

Life OS 第一方界面不直接调用网络或模型服务。可选智能体、Web viewer、外部链接检查及第三方插件有各自的联网行为。聊天中分享的笔记和附件可能发送到模型服务商。人工批准是操作规则，不能保证所有外部客户端都会强制执行。

Local REST API 默认在本机回环地址的 HTTP 27123 端口监听，并在首次加载时生成 API key；Omnisearch HTTP 服务关闭，Agent Client 自动批准关闭，QuickAdd 在线功能关闭，SEO 外部链接检查关闭。不得把 API key、证书、真实 `.mcp.json` 或会话带入分发包。完整说明见 [安全说明](SECURITY.zh-CN.md) 与 [MCP 桥接指南](<Guide/19 Obsidian MCP Bridge.md>)。

## 构建本地候选

需要 Python 3 与 Node.js。以下命令从源码根目录运行，输出目录必须位于工作笔记库之外，并且候选目录与压缩包不能已经存在。Windows 如只有 `python` 命令，可将 `python3` 替换为 `python`。

```bash
node scripts/verify_life_os_app.mjs .
node scripts/verify_assistant_contracts.mjs .
node scripts/verify_localized_views.mjs .
python3 scripts/verify_release_safety.py
python3 scripts/build_template.py --out ../life-os-zh-releases --name LifeOS-zh-CN-candidate --version 1.0.0-zh-CN.1 --zip
python3 scripts/verify_template.py ../life-os-zh-releases/LifeOS-zh-CN-candidate
python3 scripts/verify_archive_restore.py ../life-os-zh-releases/LifeOS-zh-CN-candidate-template-v1.0.0-zh-CN.1.zip
```

构建器按排除规则复制内容，仅保留用户目录中带 `example` 的笔记，以经过检查的 `scripts/template/defaults/` 重建默认数据，清理机器状态，生成版本信息、工作区、文件清单、ZIP 和校验文件。完整模板验证针对生成的候选目录，不直接对含个人资料的工作笔记库运行。不要修改打包产物后继续沿用旧校验和。

五张空中文看板属于必需默认文件，保留 `Ideas`、`In progress`、`Done` 三列，不暂存源笔记库的卡片。样式片段只打包第一方 `lifeos.css`，外观设置净化为 `{"enabledCssSnippets":["lifeos"]}`。中文视图与模板检查、样式白名单检查已接入构建门禁。

本次开发验证：应用 69 项通过、0 项失败；中文视图与模板 243 项通过、0 项失败；Assistant 契约覆盖 16 个流程。发布安全测试共 15 项，13 项通过，2 项因 Windows 符号链接权限不足跳过。2026-10-04 的交付记录确认 Windows Obsidian 1.13.7 核心流程及周记模板展开通过，rc5 构建门禁 166 项通过，解压还原 217 个文件匹配清单；完整扩展验收未完成。每次重新构建的 ZIP 都须独立记录校验和与验证结果。

自动验证通过只代表对应开发检查通过。必须用最终 ZIP 的准确校验和完成 [原生验收](<Guide/23 Native Acceptance.md>)，单独记录桌面、移动端、MCP 和服务商认证情况。未执行的项目保持“未测试”。提交、推送、创建 Release 和公开发布需单独授权，构建命令不会替你完成这些操作。

## 维护、来源与许可

- [汉化范围与上游同步约定](LOCALIZATION.md)
- [中文变更记录](CHANGELOG.zh-CN.md)
- [贡献指南](CONTRIBUTING.zh-CN.md)
- [社区行为规范](CODE_OF_CONDUCT.zh-CN.md)

工作流来源为 Mike Schmitz 的公开视频；每日问题参考 Marshall Goldsmith 与 Mark Reiter 的 *Triggers*（2015）；多尺度规划参考 Cal Newport。完整署名保留在 [CREDITS.md](CREDITS.md)。[上游演示](https://www.youtube.com/watch?v=0mUx4z6M5AU)展示原项目，不代表本中文候选包已通过验收。

代码、模板、仪表盘、脚本、配置与提示词沿用 [MIT](LICENSE)。`Guide/` 正文及其中文翻译沿用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，范围见 [LICENSE-GUIDE.md](LICENSE-GUIDE.md)。中文翻译与适配由中文社区版本维护者于 **2026-09-25** 基于上述上游提交制作，已修改展示文本并保留技术契约；本说明用于标明翻译与修改，不表示原作者背书。第三方插件分别保留其原许可。英文许可文件未经替换。
