这三个工具在生活工作流之上，让笔记库也成为研究与发布的工作场所。

## Web viewer（核心插件，Obsidian 1.8+）
已在 `core-plugins.json` 中启用。随附的 `.obsidian/webviewer.json` 设置为在查看器内打开外部链接、开启广告拦截、将保存的页面放入 `07 Library`。这些 key 来自公开笔记库的观察，并无官方文档说明，请在所用版本中手动切换一次对应设置以确认。你可以在 Obsidian 中打开链接，把网页标签页放在草稿旁，并通过“Save to vault”（保存到笔记库）把网页保存为笔记，与官方 Web Clipper 配合使用。在设置 → 核心插件 → Web viewer 中，可选择是否在查看器内打开外部链接、设置搜索引擎及清除浏览数据。

## SEO（`seo` 0.5.6，https://github.com/davidvkimball/obsidian-seo）
检查准备发布的笔记：标题与描述长度，标题、描述、slug 中的关键词，标题层级，替代文本，失效和裸露链接，重复标题，阅读难度及字数。评分范围为 40 至 100。
- 命令：**Run current note audit**（检查当前笔记）、**Run vault audit**（检查整个笔记库）。
- 设置 → SEO → 扫描目录：设置为 `06 Writing`；如果发布读书笔记，也可加入 `07 Library`。排除日记文件夹，它们不是写给搜索引擎的。
- 外部链接检查默认关闭，且需要联网；模板中保持关闭。
- 插件读取的 frontmatter 为 `title`、`description`、`slug`、`keywords`，可在设置中调整。目前写作模板使用 `subject`、`meta_description`、`slug`；如果要为草稿评分，请在设置 → SEO 中对齐属性名称。
- 它属于作者的 Vault CMS 项目，与任何具体发布平台无关。

## Vault Lens（浏览器扩展，原名“Obsidian Search for Web”）
https://github.com/jk-oster/obsidian-search-for-web。在网页搜索结果旁，以及你再次访问的页面上，显示匹配的笔记库笔记。它需要笔记库端的服务；安全评估与用户设置步骤见 [[17 Search Providers|搜索服务]]。

## 配合使用
用 Web viewer 阅读，用 Web Clipper 与 Vault Lens 捕获并再次发现材料，通过 [[14 Agent Client and Claude Code|Agent Client 与 Claude Code]] 在 `06 Writing` 中辅助起草，再用 SEO 在内容离开笔记库前进行检查。
