# searchEngineJump fork

本 fork 基于qxinGitHub/searchEngineJump 的5.26.11 版本

## 相对原分支的修改

| 序号 | 功能 | 具体修改 |
| --- | --- | --- |
| 1 | 搜索页适配 | 增加 Kagi 搜索页支持。<br>适配 YouTube 新 UI。<br>适配 bilibili 全部搜索结果页。<br>排除 YouTube 视频播放页。 |
| 2 | 暗色模式 | 优化暗色页面中的脚本按钮栏。<br>优化下拉菜单和设置弹窗。<br>减少透明、亮边与站点样式冲突。 |
| 3 | 图标缓存 | 将远程 favicon 缓存为本地 data URI。<br>减少严格 CSP 页面中图标无法显示的问题。 |
| 4 | 设置弹窗 | 跟随页面明暗主题。<br>收敛样式影响。<br>修复滚动穿透、窄屏溢出和布局错位。 |
| 5 | 设置按钮 | 设置按钮透明度调为 0 时，<br>仍保留可 hover、可点击的设置入口热区。 |
