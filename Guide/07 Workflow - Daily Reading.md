# 工作流 5：每日《圣经》阅读

视频：11:51 至 14:11，介绍 Mike 的每日《圣经》阅读。这是他追踪最久的习惯，也是“让我理解为什么要把一切放在同一笔记库里的工作流”。本模板把该模块做成通用结构：任何带计划的每日阅读，都可以使用章节笔记、学习笔记和主题地图。《圣经》作为完整示例，是因为视频以它为例，配套脚本也用于生成这些内容。

这是可选模块。不需要时，可以删除 `09 Reading/` 及 `Templates/Daily Note.md` 中的 `[!reading]` 提示块。也可以将其用于任何每日阅读，例如每季度一本书、一门课程或一组经典文章：在 `Reading Plan.md` 中每章对应一个任务，在 `Chapters/` 中每章对应一篇笔记，再通过学习笔记链接这些章节。

## 两种表示方式（12:09）
| | 每章一篇笔记 | 每节一篇笔记 |
| --- | --- | --- |
| 文件夹示例 | `09 Reading/Chapters/Genesis 1.md` | `09 Reading/Verses/Genesis 1.1.md` |
| 用途 | 每日阅读计划 | 作为讲道笔记、专题内容地图、学习笔记和读书笔记的链接目标 |
| 数量 | 1,189 | 31,102 |

## 阅读计划（12:22）
`09 Reading/Reading Plan.md` 中每章对应一个任务，带有计划日期（⏳）。每日笔记的 **Bible reading**（《圣经》阅读）提示块通过 Tasks 查询显示计划日期不晚于今天的章节，未读章节会延续到之后的日期。可直接在提示块中勾选完成。

生成完整计划：
```bash
python3 scripts/generate_reading_plan.py --start 2026-09-01 --days 365 > "09 Reading/Reading Plan.md"
```
选项：`--order canonical`（默认，按正典顺序），或 `--order chronological`（内置一种常见时间顺序），以及 `--days 365`。

## 生成章节和经节笔记
```bash
python3 scripts/split_bible.py path/to/kjv.txt --out "09 Reading"
```
输入应为每行一节经文的纯文本文件，格式为 `Book Chapter:Verse<TAB>Text`，这是公有领域 KJV/WEB 文本常用的导出格式。脚本会生成含全文与经节链接的 `Chapters/<Book> <N>.md`，以及带前后导航的 `Verses/<Book> <N>.<V>.md`。Obsidian 可以处理约 31,000 个小文件，首次索引时请稍等片刻。

## 交叉索引资料库（12:53）
- 讲道笔记（`Templates/Study Note.md`）链接其中提到的每节经文。打开某节的局部关系图，就能看到所有引用它的讲道、学习笔记和专题页面。
- `09 Reading/Topics/` 中的专题页面是内容地图。
- 纸质《圣经》中的高亮可以转成经节笔记标签，例如 `#highlight`、`#topic/...`。

Mike 自己的《圣经》资源文件：https://download.mikeschmitz.com/bible
