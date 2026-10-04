Claude 如何从 Obsidian 聊天面板或终端操作 Obsidian：打开笔记、切换看板、运行命令、搜索和编辑。无需额外插件，Local REST API 5.x 已在 `http://127.0.0.1:27123/mcp` 提供 MCP 服务器，使用与本次安装相同的 API key 认证。

## 智能体可以通过它做什么（16 个工具）
| 工具 | 用途 |
| --- | --- |
| `open_file` | 在界面中打开任意笔记，例如看板、仪表盘、今日笔记 |
| `command_list`、`command_execute` | 按 id 运行 Obsidian 命令：QuickAdd 捕获（`quickadd:choice:lifeos-journal`）、Kanban（`obsidian-kanban:create-new-kanban-board`、归档已完成卡片）、周期笔记（`quickadd:choice:lifeos-daily`，创建或打开今日笔记）、Templater、SEO 检查、`app:reload`，以及工作区和视图切换 |
| `active_file_get_path` | 确定你正在查看哪个文件 |
| `vault_list`、`vault_read`、`vault_get_document_map` | 浏览文件夹、读取笔记或单个章节 |
| `vault_write`、`vault_append`、`vault_patch`、`vault_move`、`vault_copy`、`vault_delete` | 编辑，例如在标题下追加、局部修改章节、移动笔记 |
| `search_simple`、`search_query`、`tag_list` | Obsidian 搜索、JsonLogic 元数据查询、标签列表 |

看板是 Markdown，因此“把这张卡片移到 Drafting”对应对看板文件执行 `vault_patch`；Obsidian 会实时重新渲染 Kanban 视图。

## 其他智能体
- Codex（`~/.codex/config.toml`）：设置 `[mcp_servers.obsidian]`，使用 `url = "http://127.0.0.1:27123/mcp"`，并从环境变量读取 bearer token。具体 key 名请核对当前 Codex 文档。
- Gemini CLI（`~/.gemini/settings.json`）：`"mcpServers": {"obsidian": {"httpUrl": "http://127.0.0.1:27123/mcp", "headers": {"Authorization": "Bearer <key>"}}}`。请核对当前 Gemini CLI 文档。
- 在本笔记库中使用 Codex 默认批准模式，Gemini CLI 不启用自动批准；`AGENTS.md` 第 2 条规则“编辑前询问”是最低行为要求。
- `.claude/settings.json` 为 Claude Code 预先批准只读工具：`vault_read`、`vault_list`、`vault_get_document_map`、`search_*`、`tag_list`、`active_file_get_path`、`command_list`、`open_file`；所有写入或执行操作仍需询问。

## 每台机器的设置（一次）
这是通过终端配置的可选功能。不使用终端可以跳过；Agent Client 聊天仍可运行，只是不能自行打开笔记或运行命令。
1. Local REST API 已启用，随附配置的 HTTP 服务器端口为 27123。
2. 在用户级作用域为 Claude Code 注册服务器，将 key 保存在笔记库之外：
   ```bash
   claude mcp add --scope user --transport http obsidian http://127.0.0.1:27123/mcp \
     --header "Authorization: Bearer <key from Settings → Local REST API>"
   claude mcp list   # obsidian: ... ✔ Connected
   ```
   根目录的 `.mcp.example.json` 为其他 MCP 客户端展示同样的配置。不要在笔记库中创建含真实 key 的 `.mcp.json`，否则可能随模板分发；`.gitignore` 已将其排除。
3. 在 Obsidian → Agent Client 聊天菜单中选择 **Restart agent**（重启智能体），或开启新聊天，使 Claude Code 会话加载服务器。ACP 适配器读取与 CLI 相同的用户、项目和本地设置。
4. 在聊天中测试：“打开 Projects Board”或“运行 Daily Questions Prompt 命令”。首次会看到 `obsidian` 工具调用和权限提示。

## 两个 Claude，一个笔记库
[[Assistant|助手]]中的聊天面板与终端 `claude` 会话是独立进程。它们无需相互通信，因为两者都通过此 MCP 服务器操作同一个 Obsidian，也能访问磁盘上的同一组文件。若希望把工作从一个交给另一个，可写入一篇笔记，例如 `wiki/hot.md` 或每日笔记，另一个会话再读取。只有需要进程之间实时传递消息时，才需要 Claude Code 的 Remote Control 或自定义 MCP 中继；Compass 不要求这些能力。

## 安全
- 只允许回环地址访问；key 赋予笔记库访问权限。保持 Agent Client 自动批准关闭，并检查其他每个客户端的权限。API 本身不会强制执行笔记库“先询问、后写入”的规则，外部客户端也可能在 Agent Client 的批准界面之外采取行动。
- `vault_delete` 默认将文件移入回收站。`vault_write` 会替换整篇文件，应优先使用 `vault_patch` 或 `vault_append`。
- 根目录的 `AGENTS.md` 告诉智能体：哪些文件夹只能在收到明确请求时编辑。
