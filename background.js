// 监听插件安装事件
chrome.runtime.onInstalled.addListener(() => {
    console.log('中文翻译助手已安装');
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translate') {
        // 这里可以添加翻译相关的后台处理逻辑
        sendResponse({ status: 'success' });
    }
});

// 显示通知的辅助函数
function showNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon128.png',
        title: '中文翻译助手',
        message: message
    });
}

// 点击插件图标时触发
chrome.action.onClicked.addListener((tab) => {
    // 检查是否是特殊页面
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('edge://')) {
        showNotification('抱歉，翻译助手无法在浏览器特殊页面中使用。');
        return;
    }

    // 注入脚本和样式
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['js-md5.min.js', 'content.js']
    }).then(() => {
        // 脚本注入成功后，发送消息
        chrome.tabs.sendMessage(tab.id, { action: 'show_translator' })
            .catch(error => {
                console.error('发送消息失败:', error);
                showNotification('抱歉，无法在当前页面使用翻译助手。');
            });
    }).catch(error => {
        console.error('注入脚本失败:', error);
        showNotification('抱歉，无法在当前页面使用翻译助手。');
    });

    // 注入样式
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['content-styles.css']
    }).catch(error => {
        console.error('注入样式失败:', error);
    });
}); 