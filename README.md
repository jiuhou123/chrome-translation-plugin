# 中文翻译助手 Chrome 插件

一个简单易用的 Chrome 浏览器翻译插件，支持中英互译，界面简洁，使用方便。

## ✨ 功能特点

- 🔄 支持中文 → 英文、英文 → 中文双向翻译
- 📌 固定在浏览器右侧，不影响网页浏览，**网页内容会自动让出空间，不被遮挡**
- 🎯 可展开/收起的侧边栏设计，体验类似 DeepSider™
- 🚀 简洁的用户界面
- 💪 使用百度翻译 API，翻译质量有保证

## 📦 安装方法

1. 下载本项目代码
   ```bash
   git clone https://github.com/jiuhou123/chrome-translation-plugin.git
   ```

2. 打开 Chrome 浏览器，进入扩展程序页面
   - 在地址栏输入：`chrome://extensions/`
   - 或者点击菜单 → 更多工具 → 扩展程序

3. 开启"开发者模式"（右上角开关）

4. 点击"加载已解压的扩展程序"，选择项目文件夹

## 🔧 配置说明

使用前需要配置百度翻译 API 的密钥：

1. 访问[百度翻译开放平台](http://api.fanyi.baidu.com/api/trans/product/desktop)注册账号
2. 创建应用，获取 APP ID 和密钥
3. 在 `content.js` 中填入你的 APP ID 和密钥：
   ```javascript
   const appid = '你的APP_ID';
   const key = '你的密钥';
   ```

## 📝 使用说明

1. 点击浏览器工具栏中的插件图标，会在页面右侧显示翻译面板，**网页内容会自动缩进，不会被遮挡**
2. 选择翻译方向（中 → 英 或 英 → 中）
3. 在上方文本框输入要翻译的文本
4. 点击"翻译"按钮即可看到翻译结果
5. 可以通过左侧绿色按钮展开/收起翻译面板
6. 点击右上角 × 按钮关闭翻译面板，网页内容恢复原状

## 🚫 使用限制

- 不支持在浏览器的特殊页面使用（如 chrome:// 开头的页面）
- 需要自行申请百度翻译 API 的密钥

## 🛠️ 技术栈

- Chrome Extension API
- JavaScript
- CSS3
- 百度翻译 API

## 📄 开源协议

[MIT License](LICENSE)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📸 截图展示

[在这里添加你的插件截图]

## 🔄 更新日志

### v1.2
- 添加侧边栏模式，网页内容自动让出空间，不被遮挡
- 支持展开/收起功能，体验类似 DeepSider™
- 优化用户界面

### v1.1
- 支持中英互译
- 添加翻译历史记录

### v1.0
- 初始版本发布
- 基本翻译功能

## 👨‍💻 作者

jiuhou

## 🙏 致谢

- [百度翻译开放平台](http://api.fanyi.baidu.com/)
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions/) 