插件：Agent Client 0.12.1（`agent-client`，https://github.com/RAIT-09/obsidian-agent-client，Apache 2.0，仅限桌面端）。它通过 Agent Client Protocol 运行本地 AI 智能体，包括 Claude Code、Codex、Gemini CLI 等，并把聊天放在侧边栏、标签页、浮动窗口或笔记内。

## 它为 Compass 增加了什么
- 与配置好的智能体对话，并明确提及你准备分享的笔记。嵌入在 Assistant 中的聊天使用承载它的笔记作为上下文；是否包含当前笔记及关联笔记，取决于客户端设置。
- 保持自动批准关闭。编辑前询问是一项操作规则，不代表每个外部客户端或智能体都能强制执行。
- [[Assistant|助手]]和 [[Compass Dashboard|Compass 仪表盘]]提供准备好的提示词按钮：每周回顾、复盘准备、“今天什么最重要”、写作辅助。
- 每次会话开始都会读取笔记库根目录的 `AGENTS.md`，`CLAUDE.md` 与 `GEMINI.md` 均指向它。该文件说明文件夹分工、属性约定和禁止修改的内容；系统发生改变时，应同步更新。重复性工作放在 `Prompts/`，见 [[20 Prompt Library|提示词库]]。
- 随附的 `.claude/settings.json` 包含只读 MCP 允许列表。实际权限还取决于客户端及其其他设置。可选的 claude-obsidian 集成提供知识工作流，见 [[15 claude-obsidian]]。
- 通过 Obsidian MCP 桥接（见 [[19 Obsidian MCP Bridge|Obsidian MCP 桥接]]），智能体可以在聊天内打开笔记和看板、运行任意 Obsidian 命令、搜索及局部修改笔记。

## 设置（每台机器一次）
这是可选功能，完全不用 AI 也能使用笔记库。需要终端、Node.js（https://nodejs.org，LTS 版本），以及 Claude 账号或 API key。如果不使用终端，可以跳过本页。
1. 安装 Claude Code 并登录：`curl -fsSL https://claude.ai/install.sh | bash`，之后运行一次 `claude`。也可使用保存在 Obsidian Keychain 中的 Anthropic API key，详见插件文档。
2. 安装适配器：`npm install -g @agentclientprotocol/claude-agent-acp`。
3. 在 Obsidian 中打开设置 → Agent Client → Preset agents → Claude Code。点击 **Auto-detect**（自动检测），或粘贴 `which claude-agent-acp` 返回的路径。
4. 点击侧边栏机器人图标，发送“hello”，应当收到回复。

### Linux Flatpak 版 Obsidian
Flatpak 沙箱看不到 `/usr/local/bin`，其 `PATH` 只有 `/usr/bin:/app/bin`，所以适配器的 `#!/usr/bin/env node` shebang 会失败。主目录已挂载到沙箱内，可以在 `~/.local/bin` 中创建包装脚本：
```sh
#!/bin/sh
exec "$HOME/.local/bin/node" "/path/to/lib/node_modules/@agentclientprotocol/claude-agent-acp/dist/index.js" "$@"
```
把 `/path/to/lib/node_modules/...` 替换为 `npm root -g` 的输出加上 `/@agentclientprotocol/claude-agent-acp/dist/index.js`。赋予文件可执行权限（`chmod +x`），在插件设置的 Claude Code 路径中填写它的完整路径，例如将 `~/.local/bin/claude-agent-acp` 展开为绝对路径。无需执行 `flatpak override`。维护者记录的另一种方式是 `flatpak override --user --filesystem=host-os:ro md.obsidian.Obsidian`，再将插件指向 `/var/run/host/usr/...`；这会扩大沙箱可访问范围，并非必需。

验证方法：打开 Agent Client 聊天并发送“hello”；收到回复说明包装脚本可用。

## 在笔记中嵌入聊天和按钮
使用语言标记为 `agent-client` 或 `agent` 的围栏代码块，正文采用 YAML。文档：https://rait-09.github.io/obsidian-agent-client/usage/embeddable-blocks.html。
- 聊天：`type: chat`、`agent`、`model`、`height`、`id`；设置 `persist: true` 可在重启后保留聊天，`noteContext: hosting` 将笔记上下文固定为承载聊天的笔记。
- 按钮：`type: button`、`text`、`prompt`、`viewType: right-pane | floating | editor-tab | embedded`。使用 `autoSend: false`，先准备提示词供检查，再由独立的发送操作提交。

## 建议检查的设置
- 导出：文件夹 `Meta/Agent Chats`（已预设），标签 `agent-client`，关闭自动导出。导出的聊天包含曾提及的笔记内容，会像普通笔记一样出现在笔记库搜索中。
- Prompt injection：保持开启，用于注入 Obsidian 风格的 wikilink、`$math$` 和表格语法提示。
- 权限：保持 auto-allow 关闭。

## 社区模板的安全说明
- 仅支持桌面端。智能体拥有与你的终端用户相同的访问能力，插件只负责呈现批准请求。
- 机器专属路径和 API key 放在 Obsidian 设置及 Keychain 中，绝不能随笔记库分发。模板仅包含最小化的 `agent-client/data.json`，预设关闭 auto-allow、默认智能体和导出文件夹，不含会话、路径或 key；`build_template.py` 会剔除其余信息。
- 离开本机的内容就是你发送的内容：消息、明确提及的笔记和附件。聊天中提及的日记笔记会发送给模型服务商。
