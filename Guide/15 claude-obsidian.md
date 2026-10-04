claude-obsidian（https://github.com/AgriciDaniel/claude-obsidian，由模板作者开发的 Claude Code 插件）是**知识与来源追踪层**。它为 Claude Code 提供笔记库技能：`/save`、`/wiki-query`、`/wiki-ingest`、`/wiki-lint`、`/autoresearch`、`/think`、`/canvas`，以及 Bases 和 Markdown 参考。它还提供事务核心，先制定计划、展示哈希，再在获得批准后写入。

## 它不负责什么
它并不是 Compass 的运行引擎。其事务核心只写入 `wiki/` 和 `.raw/`。每日笔记、复盘、任务、人物和写作，通过 Obsidian 中的 QuickAdd、Templater、Tasks、Kanban 编辑，或通过 Agent Client 聊天逐次批准后编辑，见 [[14 Agent Client and Claude Code|Agent Client 与 Claude Code]]。两层都会读取笔记库根目录的 `CLAUDE.md`。

## 知识层添加的内容
| 路径 | 用途 |
| --- | --- |
| `.claude-obsidian.json` | 工作区标记：`role: vault`、`source_inbox: inbox` |
| `.gitignore` | 忽略 `.vault-meta/`、`.mcp.json`、`.obsidian/workspace*.json`、`.trash/` |
| `inbox/` | 将来源材料放在这里，再执行摄取 |
| `.raw/.manifest.json` | 摄取增量记录 |
| `wiki/overview.md`、`wiki/hot.md`、`wiki/index.md`、`wiki/log.md` | 概览、近期上下文、目录、操作日志 |
| `wiki/routing-map.md` | 由所有者编写，定义操作应把内容归档到笔记库的哪里 |
| `wiki/meta/ledgers/*.json` | 来源与论断账本，初始为空 |
| `.obsidian/snippets/vault-colors.css` | 为文件树中的 `wiki/*` 文件夹着色，已启用 |
| `.vault-meta/` | 运行时日志，已被 Git 忽略；分发前应删除 |

仪表盘中的全库任务查询排除了 `wiki/`，因此 wiki 页面里的清单不会混入任务或项目仪表盘。

## 命令
```bash
CORE=<claude plugin cache>/claude-obsidian/<version>/scripts/claude-obsidian.py   # or use the /claude-obsidian:* slash commands
python3 "$CORE" doctor --vault .            # health
python3 "$CORE" lint --vault . --format markdown   # read-only wiki lint
```
在 Claude Code 终端或 Agent Client 聊天中，可使用 `/claude-obsidian:wiki-query`、`/claude-obsidian:save`、`/claude-obsidian:wiki-lint`。每次写入都经过 inspect → approve → apply，即检查、批准、应用。绝不使用 `--force`。

可选：`export CLAUDE_OBSIDIAN_SESSION_CONTEXT=1` 会让每次 Claude Code 会话先读取 `wiki/hot.md`。这会把笔记库文本放入模型上下文，应在理解其影响后主动启用。

## 未安装该插件的社区用户
不会影响笔记库运行。`wiki/` 和 `inbox/` 是带有效 frontmatter 的普通 Markdown 文件夹，点文件通常不可见。你只是无法使用 `/claude-obsidian:*` 工作流。
