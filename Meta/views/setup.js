// Compass Setup status widget. Usage: await dv.view("Meta/views/setup")
// Detects what is still at its template default. Renders booleans only; never shows key values; never writes.
const cfg = dv.page("Meta/Compass Config") || {};
const cur = dv.current() || {};
const rows = [];
const add = (tier, item, ok, where, note) => rows.push({ tier, item, ok, where, note: note || "" });
const readJson = async p => { try { return JSON.parse(await app.vault.adapter.read(p)); } catch (e) { return null; } };
const readText = async p => { try { const f = app.vault.getAbstractFileByPath(p); return f ? await app.vault.cachedRead(f) : ""; } catch (e) { return ""; } };
const enabled = id => { try { return app.plugins.enabledPlugins.has(id); } catch (e) { return false; } };
const pset = id => { try { return app.plugins.plugins[id]?.settings || null; } catch (e) { return null; } };
const today = moment();

// Tier 0: the app
for (const [id, name] of [["life-os-app", "Life OS"], ["dataview", "Dataview"], ["templater-obsidian", "Templater"], ["periodic-notes", "Periodic Notes"], ["quickadd", "QuickAdd"], ["obsidian-tasks-plugin", "Tasks"], ["obsidian-kanban", "Kanban"]])
  add(0, `${name} 插件已启用`, enabled(id), "设置 → 第三方插件");
add(0, "Life OS 应用命令已注册", !!app.commands.findCommand("life-os-app:open-home"), "命令面板 → Life OS：打开首页");
add(0, "已启用 Dataview JavaScript 查询", !!(pset("dataview")?.enableDataviewJs), "设置 → Dataview");
add(0, "已启用 lifeos CSS 片段", (() => { try { return app.customCss.enabledSnippets.has("lifeos"); } catch (e) { return false; } })(), "设置 → 外观 → CSS 代码片段");
add(0, "Periodic Notes 日记目录与配置一致", (() => { const pn = pset("periodic-notes"); return !!pn && pn.daily?.folder === (cfg.daily_folder || "01 Journal/Daily") && /Daily Note\.md$/.test(pn.daily?.template || ""); })(), "设置 → Periodic Notes");
add(0, "Templater 会在新建文件时运行", (() => {
  const t = pset("templater-obsidian");
  if (!t) return false;
  // Version 2 stores the trigger on this device; the matching mode does not enable it.
  if (t.data_version >= 2) {
    try { return app.loadLocalStorage?.("templater-local-settings")?.trigger_on_file_creation === true; }
    catch (e) { return false; }
  }
  return t.trigger_on_file_creation === true;
})(), "设置 → Templater → Trigger Templater on new file creation", "首次在本设备打开时需自行开启；Folder templates 只指定匹配方式");
add(0, "QuickAdd 捕获操作可作为命令使用", (() => { const ch = pset("quickadd")?.choices || []; return ["Journal entry", "Log a win", "Gratitude", "Add task"].every(n => ch.find(c => (c.name || "").includes(n))?.command === true); })(), "设置 → QuickAdd（每个选项旁的闪电图标）");
add(0, "已设置今日笔记与每日问答快捷键", (() => { try { const hk = app.hotkeyManager.customKeys || {}; return ["quickadd:choice:lifeos-daily", "templater-obsidian:Templates/Daily Questions Prompt.md"].every(id => (hk[id] || []).length > 0); } catch (e) { return false; } })(), "设置 → 快捷键");

// Tier 1: make it yours
add(1, "已填写出生日期", !!cfg.birthdate && String(cfg.birthdate).slice(0, 10) !== "1990-01-01", "[[Compass Config]]");
const theme = await readText("03 Planning/Life Theme.md");
add(1, "已填写人生主题", theme.length > 0 && !/Replace this line with your life theme|用你的人生主题替换本行/.test(theme), "[[Life Theme]]");
const values = await readText("03 Planning/Core Values.md");
add(1, "已填写核心价值观", values.length > 0 && !/\*\*(?:Value one|价值观一)\*\*/.test(values), "[[Core Values]]");
add(1, "已填写理想一周并移除 example 属性", !((dv.page("03 Planning/Ideal Week") || {}).example === true), "[[Ideal Week]]", "填写时间表后移除 example 属性");
add(1, "已检查每日问题、习惯与生命之轮领域", Array.isArray(cfg.questions) && cfg.questions.length > 0 && Array.isArray(cfg.habits) && cfg.habits.length <= 5, "[[Compass Config]]", Array.isArray(cfg.habits) && cfg.habits.length > 5 ? "习惯超过 5 项，建议每阶段保留 3–5 项" : "");
const examples = dv.pages("#example").length;
add(1, "已清理示例笔记", examples === 0, "[[16 Onboarding Assistant]] 第 6 步，或自行检查并删除带 example 标签的笔记", examples ? `还有 ${examples} 篇示例笔记` : "");

// Tier 2: the practice
const daily = cfg.daily_folder || "01 Journal/Daily";
const dqp = cfg.dq_prefix || "dq_";
add(2, "已创建今日笔记", !!dv.page(`${daily}/${today.format("YYYY-MM-DD")}`), "Ctrl/Cmd+Shift+D");
const real = dv.pages(`"${daily}"`).where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name) && !(p.tags || []).includes("example")).array();
const answered = real.filter(p => Object.entries(p.file.frontmatter || {}).some(([k, v]) => k.startsWith(dqp) && v !== null && v !== "" && v !== undefined));
const last30 = answered.filter(p => today.diff(moment(p.file.name), "days") < 30).length;
add(2, "已完成第一次实际每日问答", answered.length > 0, "今晚按 Ctrl/Cmd+Shift+Q，或打开 [[02 End of Day Coaching]]");
add(2, `最近 30 天的答题天数（目标 25 天）`, last30 >= 25, "继续记录", `${last30}/30`);
add(2, "已创建本周笔记", !!dv.page(`${cfg.weekly_folder || "01 Journal/Weekly"}/${today.format("gggg-[W]ww")}`), "命令面板：Periodic Notes: Open weekly note", "从第 2 周开始");
add(2, "已创建本季度复盘笔记", !!dv.page(`${cfg.retreat_folder || "02 Retreats"}/${today.format("YYYY-[Q]Q")} Personal Retreat`), "[[04 Workflow - Personal Retreat]]", "从第 60 天开始");
const plan = (await readText("09 Reading/Reading Plan.md")).replace(/```[\s\S]*?```/g, "");
if (app.vault.getAbstractFileByPath("09 Reading")) add(2, "已设置阅读模块（填写计划，或确认无需此模块）", /^- \[ \]/m.test(plan), "[[07 Workflow - Daily Reading]]", "可选");

// Tier 3: AI in the vault (optional)
add(3, "已启用 Agent Client 插件", enabled("agent-client"), "设置 → 第三方插件", "可选");
const ac = await readJson(".obsidian/plugins/agent-client/data.json");
const configuredCommands = Object.values(ac?.presetAgents || {}).map(p => p?.command || "").filter(Boolean);
const isLinux = navigator.userAgent.includes("Linux") && !navigator.userAgent.includes("Android");
add(3, "已在 Agent Client 中设置至少一个本地智能体路径", configuredCommands.some(cmd => !isLinux || cmd.startsWith("/")), "设置 → Agent Client → 选择智能体 → Auto-detect", "可选；Linux Flatpak 需填写包装脚本的完整路径，参见 Guide 14");
add(3, "已登录智能体（自行确认）", cur.setup_claude_login === true, "在本笔记属性中勾选 setup_claude_login", "可选；为兼容升级而保留原属性名");
add(3, "已为智能体注册 Obsidian MCP 服务（自行确认）", cur.setup_mcp_registered === true, "[[19 Obsidian MCP Bridge]]，完成后勾选 setup_mcp_registered", "可选");
add(3, "Agent Client 已有对话记录", (ac?.savedSessions || []).length > 0, "[[Assistant]]", "可选");

// Tier 4: browser and web (optional)
add(4, "已启用 Local REST API", enabled("obsidian-local-rest-api"), "设置 → 第三方插件", "可选");
const ra = await readJson(".obsidian/plugins/obsidian-local-rest-api/data.json");
add(4, "已生成 REST API 密钥（此处不会显示密钥）", typeof ra?.apiKey === "string" && ra.apiKey.length > 0 && ra?.enableInsecureServer === true, "设置 → Local REST API", "可选");
add(4, "已连接 Vault Lens 扩展（自行确认）", cur.setup_vault_lens === true, "[[17 Search Providers]]，完成后勾选 setup_vault_lens", "可选");
add(4, "已启用 Web viewer 核心插件", (() => { try { return app.internalPlugins.plugins.webviewer?.enabled === true; } catch (e) { return false; } })(), "设置 → 核心插件", "可选");
add(4, "已设置 SEO 扫描目录", ((await readJson(".obsidian/plugins/seo/data.json"))?.scanDirectories || "").includes("06 Writing"), "设置 → SEO", "可选");
add(4, "已备份笔记库文件夹（自行确认）", cur.setup_backup === true, "将完整文件夹备份到其他位置，验证后勾选 setup_backup");

// Render
const linkLabels = {
  "Compass Config": "配置", "Life Theme": "人生主题", "Core Values": "核心价值观",
  "Ideal Week": "理想一周", "16 Onboarding Assistant": "入门助手",
  "02 End of Day Coaching": "晚间问答", "04 Workflow - Personal Retreat": "季度复盘工作流",
  "07 Workflow - Daily Reading": "每日阅读工作流", "19 Obsidian MCP Bridge": "Obsidian MCP 桥接",
  "Assistant": "AI 助手", "17 Search Providers": "搜索服务配置",
};
const appendLinkedText = (element, text) => {
  let position = 0;
  for (const match of text.matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)) {
    element.appendText(text.slice(position, match.index));
    const target = match[1], label = match[2] || (Object.prototype.hasOwnProperty.call(linkLabels, target) ? linkLabels[target] : target);
    const link = element.createEl("a", { text: label, cls: "internal-link", attr: { href: target, "data-href": target } });
    link.addEventListener("click", event => { event.preventDefault(); app.workspace.openLinkText(target, "", false); });
    position = match.index + match[0].length;
  }
  element.appendText(text.slice(position));
};
const root = dv.container.createEl("div", { cls: "lifeos-widget" });
if (cur.status === "done") { root.createEl("p", { text: "设置已标记为完成。将本笔记的 status 属性改回 open，可重新显示清单。" }); }
else {
  const tiers = { 0: "第 0 层：启用应用", 1: "第 1 层：按需设置", 2: "第 2 层：开始实践", 3: "第 3 层：AI 助手（可选）", 4: "第 4 层：浏览器与网络（可选）" };
  const total = rows.filter(r => r.tier <= 2).length, done = rows.filter(r => r.tier <= 2 && r.ok).length;
  root.createEl("p", { text: `必需项目已完成 ${done}/${total}。下方可选功能可按需配置，不影响基础使用。` });
  for (const t of [0, 1, 2, 3, 4]) {
    root.createEl("h4", { text: tiers[t] });
    const table = root.createEl("table", { cls: "lifeos-table" });
    const th = table.createEl("thead").createEl("tr"); for (const h of ["", "项目", "设置位置", "说明"]) th.createEl("th", { text: h });
    const tb = table.createEl("tbody");
    for (const r of rows.filter(x => x.tier === t)) {
      const tr = tb.createEl("tr");
      tr.createEl("td", { text: r.ok ? "✅" : "⬜" });
      tr.createEl("td", { text: r.item });
      const td = tr.createEl("td");
      appendLinkedText(td, r.where);
      tr.createEl("td", { text: r.note });
    }
  }
}
