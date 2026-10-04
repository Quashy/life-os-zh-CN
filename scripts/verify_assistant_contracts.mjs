#!/usr/bin/env node
// Read system workflow definitions only. Never connects to an agent or provider.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(process.argv[2] || ".");
const source = fs.readFileSync(path.join(root, "00 Dashboards/Assistant.md"), "utf8").replace(/\r\n/g, "\n");
const buttons = [...source.matchAll(/```agent\n([\s\S]*?)```/g)];
assert.equal(buttons.length, 16, "All 16 assistant workflows must remain available");
for (const [, block] of buttons) {
  assert.match(block, /^autoSend: false$/m, "Workflow must require a separate send action");
  assert.match(block, /^type: button$/m);
  const promptPath = block.match(/Read (Prompts\/[^"\n]+?\.md) with vault_read/);
  assert.ok(promptPath, "Workflow must name a local prompt");
  assert.ok(fs.existsSync(path.join(root, promptPath[1])), "Named prompt must exist");
}
assert.match(source, /## 发送前检查/);
assert.match(source, /这是行为规则，不能从技术上保证每个客户端都会请求批准/);
assert.match(source, /noteContext: hosting/);
assert.match(source, /不代表已认证、连接正常或工作流已通过测试/);
assert.match(source, /批准读取上下文，不等于批准编辑、安装、付费或发布/);
console.log("Assistant contracts passed: 16 explicit non-auto-send workflows, local prompt paths, context and authority disclosure. Native client behavior not tested.");
