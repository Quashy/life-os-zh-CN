#!/usr/bin/env node
// Syntax and synthetic-data checks for localized views and reusable templates.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(process.argv[2] || ".");
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const results = [];
const check = (name, condition) => results.push({ name, ok: Boolean(condition) });
const filesIn = folder => fs.readdirSync(path.join(root, folder), { withFileTypes: true }).flatMap(entry => {
  const name = folder + "/" + entry.name;
  return entry.isDirectory() ? filesIn(name) : [name];
});
const markdownFolders = ["Templates", "00 Dashboards", "03 Planning", "08 Tasks"];
// Maintainer defaults are checked in source workspaces but are not shipped in candidates.
if (fs.existsSync(path.join(root, "scripts/template/defaults"))) markdownFolders.push("scripts/template/defaults");
const markdownFiles = markdownFolders.flatMap(filesIn).filter(name => name.endsWith(".md"));
markdownFiles.push("wiki/routing-map.md");
const templaterBlocks = text => [...text.matchAll(/<%(\*?)([\s\S]*?)(?:-)?%>/g)];
const compile = (name, source) => {
  try { new AsyncFunction("dv", "input", "app", "moment", "Notice", source); check(name, true); }
  catch (error) { results.push({ name, ok: false, detail: error.message }); }
};

for (const name of filesIn("Meta/views").filter(name => name.endsWith(".js"))) {
  compile("DataviewJS syntax: " + name, read(name));
}

const fence = String.fromCharCode(96).repeat(3);
for (const name of markdownFiles) {
  const source = read(name);
  const blocks = templaterBlocks(source);
  check("Templater delimiters: " + name, blocks.length === (source.match(/<%/g) || []).length);
  for (const [index, block] of blocks.entries()) {
    compile("Templater syntax: " + name + " #" + (index + 1),
      block[1] === "*" ? block[2] : "return (" + block[2] + ");");
  }
  const quoted = source.split("\n").map(line => line.replace(/^>\s?/, "")).join("\n");
  const pattern = new RegExp(fence + "dataviewjs\\s*\\n([\\s\\S]*?)\\n" + fence, "g");
  for (const [index, block] of [...quoted.matchAll(pattern)].entries()) {
    compile("Embedded DataviewJS syntax: " + name + " #" + (index + 1),
      block[1].replace(/<%[\s\S]*?%>/g, "2026-09-09"));
  }

  let inCode = false, widths = [], lineNumbers = [];
  const inspectTable = () => {
    if (widths.length) check("Markdown table columns: " + name + ":" + lineNumbers[0], widths.every(width => width === widths[0]));
    widths = []; lineNumbers = [];
  };
  for (const [index, line] of source.split("\n").entries()) {
    if (line.trimStart().startsWith(fence)) { inspectTable(); inCode = !inCode; continue; }
    if (inCode || !line.trimStart().startsWith("|")) { inspectTable(); continue; }
    const cells = line.trim().split(/(?<!\\)\|/).slice(1, -1);
    widths.push(cells.length); lineNumbers.push(index + 1);
    const unescapedAlias = [...line.matchAll(/\[\[([^\]]+)\]\]/g)].some(match => /(?<!\\)\|/.test(match[1]));
    check("Markdown table aliases escaped: " + name + ":" + (index + 1), !unescapedAlias);
  }
  inspectTable();
}

// Prompts locate these lines literally, even though they are not Markdown headings.
const promptLineContracts = [
  {
    prompt: "Prompts/03 Weekly Review.md", labels: ["Days:"],
    targets: ["Templates/Weekly Note.md", ...filesIn("01 Journal/Weekly").filter(name => name.endsWith(".md"))],
  },
  {
    prompt: "Prompts/05 Retreat Facilitation.md",
    labels: ["Previous retreat:", "Notes:", "What stood out:", "Focus area for the next 90 days:", "Why this one:", "Changes to make:"],
    targets: ["Templates/Personal Retreat.md", ...filesIn("02 Retreats").filter(name => name.endsWith(".md"))],
  },
  {
    prompt: "Prompts/07 Meeting Prep.md", labels: ["Tag:"],
    targets: ["Templates/Person.md", "05 People/Example Person - Alex Rivera.md"],
  },
];
for (const { prompt, labels, targets } of promptLineContracts) {
  for (const target of targets) {
    const lines = read(target).split(/\r?\n/);
    check("Prompt line targets remain resolvable: " + target,
      labels.every(label => read(prompt).includes('"' + label + '"') && lines.some(line => line.startsWith(label))));
  }
}
check("Project kickoff can identify the template placeholder task",
  read("Prompts/08 Project Kickoff.md").includes('"First step"') &&
  /^- \[ \] First step.*#project\//m.test(read("Templates/Project.md")));
const kickoffPrompt = read("Prompts/08 Project Kickoff.md");
const kickoffDefaultLane = kickoffPrompt.match(/默认建议的目标为 "(## [^"]+)"/)?.[1];
check("Project kickoff's default target exists in the shipped board",
  kickoffDefaultLane && read("04 Projects/Projects Board.md").split(/\r?\n/).includes(kickoffDefaultLane) &&
  !kickoffPrompt.includes("This quarter") && kickoffPrompt.includes("不得自动新建或重命名泳道"));

class Element {
  constructor(tag = "div", options = {}) {
    this.tag = tag; this.options = options; this.children = []; this.style = {}; this.handlers = {};
    this.innerHTML = ""; this.textContent = options.text || "";
  }
  createEl(tag, options = {}) { const child = new Element(tag, options); this.children.push(child); return child; }
  appendText(text) { this.children.push(new Element("#text", { text })); }
  addEventListener(event, handler) { this.handlers[event] = handler; }
  addClass() {}
  setText(text) { this.textContent = text; }
}
const flatten = element => [element, ...element.children.flatMap(flatten)];
const texts = element => flatten(element).map(item => String(item.textContent)).join(" ");
const html = element => flatten(element).map(item => item.innerHTML).join("");
const dataArray = values => ({
  length: values.length,
  where: fn => dataArray(values.filter(fn)),
  sort: (fn, direction) => dataArray([...values].sort((a, b) => String(fn(a)).localeCompare(String(fn(b))) * (direction === "desc" ? -1 : 1))),
  array: () => values,
});
function moment(value = "2026-09-09") {
  const date = new Date(typeof value === "number" ? value : String(value).slice(0, 10) + "T12:00:00Z");
  const api = {
    clone: () => moment(date.valueOf()),
    startOf: () => api, endOf: () => api,
    valueOf: () => date.valueOf(),
    format: () => date.toISOString().slice(0, 10),
    year: () => date.getUTCFullYear(), quarter: () => Math.floor(date.getUTCMonth() / 3) + 1,
    day: () => date.getUTCDay(), date: () => date.getUTCDate(),
    add(amount) { date.setUTCDate(date.getUTCDate() + amount); return api; },
    subtract(amount) { return api.add(-amount); },
    isAfter: other => date.valueOf() > other.valueOf(),
    diff: () => 0,
  };
  return api;
}
const payload = '<img src=x onerror="run()"> & 中文 |';
const config = {
  questions: [{ key: "dq_custom", text: "今天是否专注？" }],
  habits: ["habit_custom"],
  wheel_areas: ["wheel_one", "wheel_two", "wheel_three"],
  property_labels: { dq_custom: payload, dq_other: { invalid: true }, habit_custom: payload, wheel_one: payload, wheel_two: "健康", wheel_three: 7 },
};
const daily = [{
  file: { name: "2026-09-09", path: "01 Journal/Daily/2026-09-09.md", frontmatter: { dq_custom: 8, dq_other: 6, habit_custom: true } },
}];
const retreat = { file: { name: "2026-Q3 Personal Retreat", path: "02 Retreats/2026-Q3 Personal Retreat.md", frontmatter: { wheel_one: 6, wheel_two: 7, wheel_three: 8 } } };
const runView = async (name, currentConfig, pages = daily, input = {}) => {
  const container = new Element();
  const dv = {
    container, page: name => name === "Meta/Compass Config" ? currentConfig : retreat,
    pages: () => dataArray(pages),
  };
  await new AsyncFunction("dv", "input", "app", "moment", "Notice", read(name))(dv, input, {}, moment, class {});
  return container;
};

try {
  const questions = await runView("Meta/views/dailyquestions.js", config, daily, { from: "2026-09-01", to: "2026-09-30" });
  check("Question labels are HTML escaped in generated tables", !html(questions).includes("<img") && html(questions).includes("&lt;img src=x onerror=&quot;run()&quot;&gt; &amp; 中文 |"));
  check("Invalid question label falls back to its key", html(questions).includes("<td>Other</td>"));
  const wheel = await runView("Meta/views/wheel.js", config, [], { page: retreat.file.path });
  check("Wheel labels are SVG escaped", !html(wheel).includes("<img") && html(wheel).includes("&lt;img"));
  check("Invalid wheel label falls back to its key", html(wheel).includes("Three (8)"));
  const habits = await runView("Meta/views/habits.js", config, daily);
  check("Habit labels use text nodes", texts(habits).includes(payload) && !html(habits).includes("<img"));

  const app = {
    vault: { getAbstractFileByPath: value => ({ path: value }) },
    metadataCache: { getFileCache: () => ({ frontmatter: config }) },
  };
  for (const [name, expected] of [["Templates/Daily Note.md", ["dq_custom: ", "habit_custom: false"]], ["Templates/Personal Retreat.md", ["wheel_one: ", "wheel_two: ", "wheel_three: "]]]) {
    const block = templaterBlocks(read(name)).find(item => item[1] === "*" && item[2].includes("_cfg"));
    const output = await new AsyncFunction("app", "let tR = '';\n" + block[2] + "\nreturn tR;")(app);
    check("Template executes configured machine keys: " + name, expected.every(key => output.includes(key)) && !output.includes(payload));
  }

  const promptCode = templaterBlocks(read("Templates/Daily Questions Prompt.md"))[0][2];
  const promptApp = {
    vault: { getAbstractFileByPath: value => ({ path: value }) },
    metadataCache: { getFileCache: file => ({ frontmatter: file.path === "Meta/Compass Config.md" ? config : { dq_custom: 5, habit_custom: false } }) },
    fileManager: { processFrontMatter: async (_file, change) => { change(saved); writes++; } },
  };
  let saved = {}, writes = 0;
  const prompts = [];
  const tp = {
    config: { target_file: { path: daily[0].file.path, basename: "2026-09-09" } },
    system: {
      prompt: async text => { prompts.push(text); return "8"; },
      suggester: async (labels, values, _throw, placeholder) => {
        assert.deepEqual(labels, ["已完成", "未完成"]); assert.deepEqual(values, [true, false]);
        prompts.push(placeholder); return false;
      },
    },
  };
  await new AsyncFunction("tp", "app", "Notice", promptCode)(tp, promptApp, class {});
  check("Localized daily check-in preserves numeric and boolean values", writes === 1 && saved.dq_custom === 8 && saved.habit_custom === false && prompts.some(text => text.includes(payload)));
  writes = 0; saved = {}; tp.system.prompt = async () => null;
  await new AsyncFunction("tp", "app", "Notice", promptCode)(tp, promptApp, class {});
  check("Cancelling the first question does not write properties", writes === 0 && Object.keys(saved).length === 0);

  const opened = [];
  const setupApp = {
    plugins: { enabledPlugins: new Set(), plugins: {} }, commands: { findCommand: () => null },
    customCss: { enabledSnippets: new Set() }, hotkeyManager: { customKeys: {} }, internalPlugins: { plugins: {} },
    vault: { adapter: { read: async () => "{}" }, getAbstractFileByPath: () => null, cachedRead: async () => "" },
    workspace: { openLinkText: target => opened.push(target) },
  };
  const dv = { container: new Element(), page: () => null, current: () => ({ status: "done" }), pages: () => dataArray([]) };
  const appendLinkedText = await new AsyncFunction("dv", "app", "moment", "navigator", read("Meta/views/setup.js") + "\nreturn appendLinkedText;")(dv, setupApp, moment, { userAgent: "Synthetic test" });
  const cell = new Element();
  appendLinkedText(cell, "前文 [[Life Theme|" + payload + "]] / [[Compass Config]] 后文");
  const links = cell.children.filter(child => child.tag === "a");
  links.forEach(link => link.handlers.click({ preventDefault() {} }));
  check("Setup link aliases are text and keep canonical targets", links[0].options.text === payload && links[1].options.text === "配置" && opened.join(",") === "Life Theme,Compass Config" && texts(cell).includes("前文") && texts(cell).includes("后文"));

  const setupRows = new AsyncFunction("dv", "app", "moment", "navigator", read("Meta/views/setup.js") + "\nreturn rows;");
  const modernTemplater = { data_version: 2, trigger_on_file_creation_mode: "folder" };
  for (const { name, settings, loadLocalStorage, expected } of [
    { name: "Device-local trigger off is not enabled by folder matching", settings: modernTemplater, loadLocalStorage: () => ({ trigger_on_file_creation: false }), expected: false },
    { name: "Device-local trigger on is detected", settings: modernTemplater, loadLocalStorage: key => { assert.equal(key, "templater-local-settings"); return { trigger_on_file_creation: true }; }, expected: true },
    { name: "An unset device-local trigger remains disabled", settings: modernTemplater, loadLocalStorage: () => null, expected: false },
    { name: "Missing local-storage API does not pass modern Templater setup", settings: modernTemplater, expected: false },
    { name: "Unavailable local storage does not pass Templater setup", settings: modernTemplater, loadLocalStorage: () => { throw new Error("Unavailable"); }, expected: false },
    { name: "Modern local false overrides a stale legacy true", settings: { ...modernTemplater, trigger_on_file_creation: true }, loadLocalStorage: () => ({ trigger_on_file_creation: false }), expected: false },
    { name: "Legacy Templater trigger true remains supported", settings: { trigger_on_file_creation: true }, expected: true },
    { name: "Legacy Templater folder mode alone remains disabled", settings: { trigger_on_file_creation_mode: "folder" }, expected: false },
  ]) {
    const testApp = { ...setupApp, plugins: { ...setupApp.plugins, plugins: { "templater-obsidian": { settings } } }, loadLocalStorage };
    const rows = await setupRows({ ...dv, container: new Element() }, testApp, moment, { userAgent: "Synthetic test" });
    check(name, rows.find(row => row.item === "Templater 会在新建文件时运行")?.ok === expected);
  }

  const boardPath = "04 Projects/Projects Board.md";
  const boardSource = "## Ideas\n- [ ] Test card\n## Done\n- [x] Finished card";
  const board = { file: { name: "Projects Board", path: boardPath, frontmatter: { "kanban-plugin": "board" } } };
  const boardDv = { container: new Element(), page: () => ({}), pages: () => dataArray([board]) };
  const boardApp = { vault: { getAbstractFileByPath: value => value, cachedRead: async () => boardSource }, workspace: { openLinkText: target => opened.push(target) } };
  await new AsyncFunction("dv", "input", "app", read("Meta/views/boards.js"))(boardDv, { compact: true }, boardApp);
  const boardLink = flatten(boardDv.container).find(element => element.tag === "a");
  boardLink.handlers.click({ preventDefault() {} });
  check("Chinese board labels preserve lane counts and navigation", texts(boardDv.container).includes("项目看板") && texts(boardDv.container).includes("灵感 1") && opened.at(-1) === boardPath && boardSource.includes("## Done"));
} catch (error) {
  results.push({ name: "synthetic execution", ok: false, detail: error.stack || error.message });
}

check("Display dates do not depend on English month or weekday names",
  !["Templates/Daily Note.md", "Templates/Weekly Note.md", "Templates/Quarterly Note.md", "Meta/views/week.js"].some(name => /\.format\("(?:MMM|ddd)|tp\.date\.now\("dddd/.test(read(name))));
check("Display changes do not set Moment's global locale",
  !["Templates/Daily Note.md", "Templates/Weekly Note.md", "Templates/Quarterly Note.md", "Meta/views/week.js"].some(name => /moment\.locale\s*\(/.test(read(name))));

for (const result of results.filter(result => !result.ok)) console.error("FAIL " + result.name + (result.detail ? ": " + result.detail : ""));
const failed = results.filter(result => !result.ok).length;
console.log((results.length - failed) + " passed, " + failed + " failed");
process.exitCode = failed ? 1 : 0;
