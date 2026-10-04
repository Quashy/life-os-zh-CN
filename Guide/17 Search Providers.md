Vault Lens 浏览器扩展（https://github.com/jk-oster/obsidian-search-for-web，v2.7.x）会在网页搜索结果旁和再次访问的页面上展示笔记库笔记。它与 Obsidian 内的小型本地服务器通信。本页记录模板附带哪一种服务器，以及选择原因；依据为对插件源码的安全审查。

## 随模板提供的内容
| 插件 | 状态 | 原因 |
| --- | --- | --- |
| **Local REST API** 5.1.0 | 已安装并启用，HTTP 服务器端口 27123 | 这是唯一支持 Vault Lens 预览、编辑、追加、每日笔记和页面笔记功能的服务。每次安装使用独立的 bearer API key 认证，绑定 `127.0.0.1`。Vault Lens 默认使用该服务、`http` 和 27123，因此用户只需手动粘贴 key。 |
| **Omnisearch** 1.30.1 | 已安装并启用，其 HTTP 服务器保持**关闭**，这是默认值 | 提供优秀的笔记库内搜索，使用 BM25 并容忍拼写错误。HTTP 端点没有认证，且设置 `Access-Control-Allow-Origin: *`，因此本地进程或已加载网页都可能查询笔记库索引。除非明确知道用途，否则保持关闭。若确需启用，实际端口为 51361；Vault Lens 快速入门中的“51736”是笔误。 |

随附设置：`.obsidian/plugins/obsidian-local-rest-api/data.json` 仅含 `{"enableInsecureServer": true}`。插件首次加载时会生成 API key 与自签名证书，并保存到用户机器上的同一文件。

## 用户设置（8 步）
1. 打开笔记库并关闭安全模式（Restricted mode）。Local REST API 会与其他插件一起加载。
2. 设置 → Local REST API：确认“Non-encrypted (HTTP) server”（非加密 HTTP 服务器）正在 27123 端口运行，复制页面中显示的 API key。
3. 安装 Vault Lens，可使用 Chrome Web Store（Chrome、Brave、Edge、Arc、Opera）、Firefox Add-ons（2.5.2+）或 Edge Add-ons。入口：https://vaultlens.com/getting-started.html。
4. 扩展选项 → “Obsidian Connection”：服务选择 Local REST API，协议 `http`，端口 `27123`，粘贴 API key，笔记库名称填写所打开文件夹的名称。
5. 等待绿色“connection established”（连接已建立）提示。
6. 验证搜索：在网页搜索 `Guide/00 Start Here.md` 中出现的词语；扩展图标应变绿，并列出该笔记。
7. 验证写入路径：点击扩展侧边栏的每日笔记按钮，笔记应在 `01 Journal/Daily/` 下打开。如果创建的是空笔记，没有 Daily Note 属性，运行一次 **Templater: Replace templates in the active file**；无论是否为空，QuickAdd 捕获都能使用。
8. 可选：确认设置 → 核心插件 → Web viewer 已开启。不要在应用内浏览器登录敏感网站。

## 安全设置原则
- 只允许本机回环访问。绝不设置 REST API 的 `bindingHost` 或 Omnisearch 的 `DANGER_httpHost`。
- 使用 27123 端口的 HTTP，是因为 HTTPS（27124）需要每位用户导入自签名证书，而证书 365 天后过期，会带来持续支持成本。需要 HTTPS 的用户仍可自行使用。
- API key 相当于能够读写笔记库的密码。不要分享 Local REST API 设置页面截图。Vault Lens 把它存储在浏览器的同步扩展存储中。插件的“Reset all cryptography”会轮换 key 和证书。
- 浏览器编辑会替换整篇笔记；如果同一笔记也在 Obsidian 中打开，则最后一次写入覆盖前一次。
- Web viewer 使用 Chromium webview，经过 Cure53 审计，开启广告拦截。Obsidian 运行时，第三方插件可以访问 Web viewer 的 cookie，因此需要密码的网站应使用主浏览器访问。

## 所有者的发布检查
如果 Local REST API 设置中含已生成的 key 或证书，`scripts/verify_template.py` 会拒绝分发。`scripts/build_template.py` 每次构建都会将该文件重置为 `{"enableInsecureServer": true}`。见 `scripts/RELEASE.md`。

## 已记录的不同意见
1. 给每位用户都开启监听服务器，包括从不安装扩展的人，是一种产品策略选择。更保守的做法是“已安装但未启用”，代价是设置清单多一步。
2. 预先启用 HTTP，改变了插件作者默认 HTTPS 开、HTTP 关的安全优先策略。回环地址加 bearer key 对单用户桌面可以接受，在共享机器上则更弱。
