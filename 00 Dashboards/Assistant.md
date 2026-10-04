通过 Agent Client 使用已配置的智能体。工作流要求智能体遵守 `AGENTS.md`；这是行为规则，不能从技术上保证每个客户端都会请求批准。请检查所用客户端已关闭自动批准。配置方法见 [[14 Agent Client and Claude Code|AI 助手配置]]。没有插件时，也可打开 `Prompts/` 中的笔记，将 `Prompt` 章节复制到所用智能体，参见 [[20 Prompt Library|提示词库]]。

## 发送前检查

下方按钮会准备提示词，自动发送已关闭。请先在输入框中审阅，再发送。嵌入式聊天使用当前承载聊天的 Assistant 笔记作为上下文，不保证包含你此前浏览的其他笔记。

- 检查所选智能体、提及的笔记、附件和链接笔记展开设置。
- 使用模型服务的对话可能将提示词、已包含的笔记及随后读取的笔记发送给服务提供方。日记和人物笔记可能含有敏感个人信息。
- 进行较大范围的复盘前，先让智能体列出拟读取的笔记路径和日期范围。批准所需上下文后再继续。
- 批准读取上下文，不等于批准编辑、安装、付费或发布。
- 已配置智能体或本地 API 密钥，不代表已认证、连接正常或工作流已通过测试。

第一方 Life OS 仪表盘本身不调用模型服务。控件会交给 Agent Client，实际行为由其设置、外部客户端和所选智能体共同决定。

## 每日
```agent
type: button
text: "开始新的一天"
prompt: "Read Prompts/01 Morning Start.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "引导晚间问答"
prompt: "Read Prompts/02 End of Day Coaching.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "梳理今日重点"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 每周与每季度
```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备季度复盘"
prompt: "Read Prompts/04 Retreat Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "引导季度复盘"
prompt: "Read Prompts/05 Retreat Facilitation.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "分析问题与习惯趋势"
prompt: "Read Prompts/13 Trend Analysis.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 工作
```agent
type: button
text: "整理任务收件箱"
prompt: "Read Prompts/06 Task Triage.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备会议"
prompt: "Read Prompts/07 Meeting Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "启动项目"
prompt: "Read Prompts/08 Project Kickoff.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "整理看板"
prompt: "Read Prompts/09 Board Grooming.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 写作与研究
```agent
type: button
text: "协助撰写内容"
prompt: "Read Prompts/10 Writing Pipeline.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "检查发布前 SEO"
prompt: "Read Prompts/11 SEO Pre-publish Audit.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "将页面整理到知识库"
prompt: "Read Prompts/12 Research Capture.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 系统
```agent
type: button
text: "检查笔记库状态"
prompt: "Read Prompts/15 Vault Health Check.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "协助设置笔记库"
prompt: "Read Prompts/16 Onboarding Assistant.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 聊天
```agent-client
type: chat
agent: claude-code-acp
height: 600px
id: lifeos-assistant
persist: true
noteContext: hosting
```
