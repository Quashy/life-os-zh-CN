项目笔记放在 `04 Projects/`，使用 `status`（状态）、`area`（领域）、`quarter`（季度）和 `due`（截止日期）属性。任务通过 `#project/<slug>` 标签关联项目。

## 进行中
```dataviewjs
const cfg = dv.page("Meta/Compass Config") || {};
const folder = cfg.projects_folder || "04 Projects";
const projects = dv.pages(`"${folder}"`).where(p => p.type === "project" && p.status !== "done").sort(p => p.due ?? "9999", "asc");
const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const allTasks = dv.pages().where(p => !p.file.path.startsWith("wiki/")).file.tasks;
const rows = projects.map(p => {
  const tag = "#project/" + slug(p.file.name);
  const mine = allTasks.where(t => (t.tags || []).some(x => x === tag || x.startsWith(tag + "/")));
  const open = mine.where(t => !t.completed).length;
  const done = mine.where(t => t.completed).length;
  const pct = open + done ? Math.round(100 * done / (open + done)) : 0;
  return [p.file.link, p.status, p.area ?? "", p.quarter ?? "", p.due ?? "", open, `${pct}%`];
});
dv.table(["项目", "状态", "领域", "季度", "截止日期", "未完成任务", "进度"], rows);
```

## 按季度
```dataview
TABLE WITHOUT ID file.link AS "项目", status AS "状态", area AS "领域", due AS "截止日期"
FROM "04 Projects"
WHERE type = "project"
GROUP BY quarter
SORT quarter DESC
```

## 已完成
```dataview
LIST
FROM "04 Projects"
WHERE type = "project" AND status = "done"
SORT file.mtime DESC
```
