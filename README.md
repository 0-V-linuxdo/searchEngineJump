# searchEngineJump fork

本 fork 基于qxinGitHub/searchEngineJump 的5.26.11 版本

## 相对原分支的修改

| 方向 | 修改 |
| --- | --- |
| 搜索页适配 | 增加 Kagi 搜索页支持；适配 YouTube 新 UI 与 bilibili 全部搜索结果页；排除 YouTube 视频播放页。 |
| 暗色模式 | 优化 Kagi 页面中的脚本按钮栏、下拉菜单和设置弹窗，减少透明、亮边与站点样式冲突。 |
| 图标缓存 | 将远程 favicon 缓存为本地 data URI，减少严格 CSP 页面中图标无法显示的问题。 |
| 设置弹窗 | 跟随页面明暗主题，收敛样式影响，并修复滚动穿透、窄屏溢出和布局错位。 |
| 设置按钮 | `setBtnOpacity=0` 时仍保留可 hover、可点击的设置入口热区。 |
