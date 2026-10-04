## 视频中提到的插件
| 插件 | ID（社区插件） | 用途 | 配置位置 |
| --- | --- | --- | --- |
| **QuickAdd** | `quickadd` | 将日记、收获、感恩捕获到每日笔记，将任务捕获到总清单，将想法捕获到看板待办栏（4:40、17:51） | `.obsidian/plugins/quickadd/data.json`（8 个捕获选项，均注册为命令） |
| **Periodic Notes** | `periodic-notes` | 每日、每周、每季度笔记，分别使用各自模板和文件夹（9:16） | `.obsidian/plugins/periodic-notes/data.json` |
| **Obsidian Tasks** | `obsidian-tasks-plugin` | 行内任务，以及仪表盘、人物、项目和《圣经》阅读提示块中的 `tasks` 查询（14:37） | `.obsidian/plugins/obsidian-tasks-plugin/data.json` |
| **Dataview**（DataviewJS） | `dataview` | 习惯仪表盘、每日问题组件、生命之轮、项目仪表盘（10:47、18:49） | `.obsidian/plugins/dataview/data.json`，已启用 JS |
| **Kanban** | `obsidian-kanban` | 每种写作类型一个看板（17:44） | 看板位于 `06 Writing/*/… Board.md` |
| **Bases**（核心插件，Obsidian 1.9+） | 内置 | Mike 每日笔记中的“往年今日”查询（5:01） | 本笔记库用 DataviewJS 代码块实现“往年今日”，使每日笔记不依赖 Bases 版本；下文提供等效 Bases 配置 |

## 视频之外新增的插件（笔记库所有者的选择）
| 插件 | ID | 用途 | 指南 |
| --- | --- | --- | --- |
| **Agent Client** 0.12.1 | `agent-client` | 在 Obsidian 内使用 Claude Code；提供仪表盘按钮和嵌入式聊天 | [[14 Agent Client and Claude Code\|Agent Client 与 Claude Code]] |
| **SEO** 0.5.6 | `seo` | 发布前检查 `06 Writing` 中的笔记 | [[16 SEO, Web Viewer, and Vault Lens\|SEO、Web viewer 与 Vault Lens]] |
| **Omnisearch** 1.30.1 | `omnisearch` | 改善笔记库内搜索；作为 Vault Lens 浏览器扩展的搜索服务 | [[17 Search Providers\|搜索服务]] |
| **Local REST API** 5.1.0 | `obsidian-local-rest-api` | 为 Vault Lens 提供浏览器内笔记预览和编辑；也提供通用本地 API | [[17 Search Providers\|搜索服务]] |
| **Web viewer**（核心插件） | `webviewer` | 在 Obsidian 内浏览和剪藏网页 | [[16 SEO, Web Viewer, and Vault Lens\|SEO、Web viewer 与 Vault Lens]] |

## 为模板运行而补充的插件
| 插件 | ID | 原因 |
| --- | --- | --- |
| **Templater** | `templater-obsidian` | Mike 提到“模板文件”；Periodic Notes 需要模板引擎处理每周和季度笔记的日期计算。每日问题提示词也是 Templater 脚本，用于把 1 至 10 分写入属性，对应他在 4:29 提到的“自定义快捷操作”。文件夹模板会自动应用项目、人物、复盘和写作模板。 |

## 第一方应用
| 插件 | ID | 用途 |
| --- | --- | --- |
| **Life OS** | `life-os-app` | 提供原生应用界面、常驻导航、统一捕获、实时系统状态和保护隐私的工作流面板。它读取与仪表盘相同的 Markdown 和属性，不另建数据库。见 [[21 Life OS Application\|Life OS 应用]]。 |

链接：QuickAdd https://github.com/chhoumann/quickadd · Periodic Notes https://github.com/liamcain/obsidian-periodic-notes · Tasks https://github.com/obsidian-tasks-group/obsidian-tasks · Dataview https://github.com/blacksmithgu/obsidian-dataview · Kanban https://github.com/mgmeyers/obsidian-kanban · Templater https://github.com/SilentVoid13/Templater

## 首次打开清单
十个社区插件及第一方 Life OS 插件都**已安装**在 `.obsidian/plugins/` 中，并在 `community-plugins.json` 中列为启用状态。

1. 设置（Settings）→ 第三方插件（Community plugins）→ **关闭安全模式（Turn off Restricted mode）**。Obsidian 会针对每个笔记库询问一次，这个选择不会保存在笔记库文件中。如果插件没有立即启用，执行 **Reload app without saving**（不保存并重新加载应用）。笔记库布局就绪后，Life OS 会自动打开。之后可通过侧边栏的指南针图标或 **Life OS: Open Life OS home** 重新打开。
2. 设置 → 外观（Appearance）→ CSS 代码片段（CSS snippets），确认 `lifeos` 已开启；它提供 `reading`、`intention`、`memento`、`theme` 自定义提示块。
3. Templater：首次在本设备打开此笔记库时，自行开启 **Trigger Templater on new file creation**（新建文件时运行 Templater），并确认 **Template matching mode** 为 **Folder templates**（文件夹模板）。随附版本将自动触发开关保存在设备本地，默认关闭，不随笔记库文件分发；已预设的文件夹匹配方式不代表开关已开启。换设备后需重新检查，Setup 清单会读取本设备的开关状态。
4. Periodic Notes：确认每日 `YYYY-MM-DD` → `01 Journal/Daily`、每周 `gggg-[W]ww` → `01 Journal/Weekly`、每季度 `YYYY-[Q]Q` → `01 Journal/Quarterly`，并各自关联模板。核心 Daily Notes 插件处于关闭状态。创建笔记使用 QuickAdd 模板命令（快捷键见下表），由它对新笔记运行 Templater；Periodic Notes 和 Calendar 用于导航。如果从链接打开的笔记为空，或仍显示 `<%` 代码，按 `Alt+E`（Templater: Insert template）并选择相应模板。
5. QuickAdd：确认能看到二十个选项，且每项的闪电形“command”开关都已开启。其中八项捕获到现有笔记，四项打开周期笔记，另八项从标准模板创建项目、人物、创作、读书或学习笔记。
6. Dataview：确认 **Enable JavaScript queries**（启用 JavaScript 查询）已开启，模板已预设。
7. 打开 `00 Dashboards/Compass Dashboard.md`。如果组件显示“No … found”（未找到……），那是空状态提示，并非错误。

## 快捷键（已预设在 `.obsidian/hotkeys.json`）
| 按键 | 操作 |
| --- | --- |
| Ctrl/Cmd+Shift+L | 打开 Life OS 应用 |
| Ctrl/Cmd+Shift+C | 打开统一捕获 |
| Ctrl/Cmd+Shift+D | 创建或打开今日笔记，QuickAdd 会通过 Templater 运行模板 |
| Ctrl/Cmd+Alt+W | 创建或打开本周笔记 |
| Ctrl/Cmd+Alt+Q | 创建或打开本季度笔记 |
| Ctrl/Cmd+Shift+J | 向今日笔记添加带时间戳的日记条目 |
| Ctrl/Cmd+Shift+W | 记录一项收获 |
| Ctrl/Cmd+Shift+G | 记录感恩 |
| Ctrl/Cmd+Shift+T | 向任务总清单添加任务 |
| Ctrl/Cmd+Shift+Q | 运行 Daily Questions Prompt，需先打开今日笔记 |

可在设置 → 快捷键（Hotkeys）中修改，重新加载后生效。

以后更新插件，照常使用设置 → 第三方插件 → 检查更新（Check for updates）。

## QuickAdd 捕获选项（预设配置无法使用时可手动重建）
| 名称 | 捕获位置 | 格式 | 插入到哪个标题之后 |
| --- | --- | --- | --- |
| 📝 Journal entry（日记条目） | `01 Journal/Daily/{{DATE:YYYY-MM-DD}}.md`，使用 Daily Note 模板创建 | `- {{DATE:HH:mm}} {{VALUE}}` | `## Journal` |
| 🏆 Log a win（记录收获） | 同上 | `- {{VALUE}}` | `## Wins` |
| 🙏 Gratitude（感恩） | 同上 | `- {{VALUE}}` | `## Gratitude` |
| ✅ Add task（添加任务） | `08 Tasks/Tasks.md` | `- [ ] {{VALUE}} ➕ {{DATE:YYYY-MM-DD}}` | `## Inbox` |
| ✉️ Newsletter idea（邮件通讯想法） | `06 Writing/Newsletters/Newsletter Board.md` | `- [ ] {{VALUE}}` | `## Backlog` |
| 🎬 Video idea（视频想法） | `06 Writing/YouTube Scripts/YouTube Board.md` | `- [ ] {{VALUE}}` | `## Backlog` |
| 📰 Article idea（文章想法） | `06 Writing/Articles/Article Board.md` | `- [ ] {{VALUE}}` | `## Backlog` |
| 💡 Project idea（项目想法） | `04 Projects/Projects Board.md` | `- [ ] {{VALUE}}` | `## Ideas` |
| 📅 Open today's note、🗓️ this week's、🧭 this quarter's、🏕️ New personal retreat（打开今日、本周、本季度笔记，新建个人复盘） | 模板选项：在正确文件夹中按日期命名创建笔记，运行 Templater 并打开；如果已存在则只打开 | | |
| 📁 New project（新建项目） | 用 `Templates/Project.md` 创建 `04 Projects/{{VALUE}}.md` | 询问项目名称，创建并打开笔记；绝不覆盖已有笔记 | |
| 👤 New person（新建人物） | 用 `Templates/Person.md` 创建 `05 People/{{VALUE}}.md` | 询问人物姓名，创建并打开笔记；绝不覆盖已有笔记 | |
| ✉️ New newsletter（新建邮件通讯） | 用 `Templates/Newsletter.md` 创建 `06 Writing/Newsletters/{{VALUE}}.md` | 询问标题，创建并打开草稿；绝不覆盖已有笔记 | |
| 🎬 New video script（新建视频脚本） | 用 `Templates/YouTube Script.md` 创建 `06 Writing/YouTube Scripts/{{VALUE}}.md` | 询问标题，创建并打开脚本；绝不覆盖已有笔记 | |
| 📰 New article（新建文章） | 用 `Templates/Article.md` 创建 `06 Writing/Articles/{{VALUE}}.md` | 询问标题，创建并打开草稿；绝不覆盖已有笔记 | |
| 🎓 New course lesson（新建课程课时） | 用 `Templates/Course Lesson.md` 创建 `06 Writing/Course Content/{{VALUE}}.md` | 询问标题，创建并打开课时；绝不覆盖已有笔记 | |
| 📚 New book note（新建读书笔记） | 用 `Templates/Book Note.md` 创建 `07 Library/Book Notes/{{VALUE}}.md` | 询问标题，创建并打开读书笔记；绝不覆盖已有笔记 | |
| 📖 New study note（新建学习笔记） | 用 `Templates/Study Note.md` 创建 `09 Reading/Study Notes/{{VALUE}}.md` | 询问标题，创建并打开学习笔记；绝不覆盖已有笔记 | |

仪表盘的捕获按钮会在点击时查找这些选项。中文版本保留既有选项名称、命令 id 和目标标题，中文只用于展示与说明，避免破坏快捷键、插件或提示词中的引用。

## 使用 Bases 实现“往年今日”（可选替换）
创建 `Meta/On This Day.base`，并通过 `![[On This Day.base]]` 嵌入每日模板：
```yaml
filters:
  and:
    - file.inFolder("01 Journal/Daily")
    - file.name != this.file.name
    - file.name.endsWith(this.file.name.slice(4))
views:
  - type: table
    name: On this day
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC
```
Bases 公式语法仍在演进，请根据所用 Obsidian 版本核对 https://help.obsidian.md/bases/functions。
