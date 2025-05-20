// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translate') {
        // 获取选中的文本
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            sendResponse({ text: selectedText });
        }
    }
});

// 监听来自background的消息，显示侧边栏
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'show_translator') {
        showTranslatorSidebar();
    }
});

function showTranslatorSidebar() {
    console.log('Showing translator sidebar'); // 调试日志

    // 移除已存在的侧边栏
    const existingSidebar = document.querySelector('.translator-sidebar');
    if (existingSidebar) {
        existingSidebar.remove();
    }

    // 创建侧边栏
    const sidebar = document.createElement('div');
    sidebar.className = 'translator-sidebar';

    // 展开/收起按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'translator-sidebar-toggle';
    toggleBtn.innerHTML = '⮜';
    sidebar.appendChild(toggleBtn);

    // 侧边栏内容
    const content = document.createElement('div');
    content.className = 'translator-content';
    content.innerHTML = `
        <div id="translator-header">
            <span>中文翻译助手</span>
            <button id="translator-close">×</button>
        </div>
        <div class="translator-select-group">
            <label for="translator-langSelect">翻译方向：</label>
            <select id="translator-langSelect" class="translator-select">
                <option value="zh-en">中文 → 英文</option>
                <option value="en-zh">英文 → 中文</option>
            </select>
        </div>
        <div class="translator-input-group">
            <textarea id="translator-sourceText" class="translator-textarea" placeholder="请输入要翻译的文本"></textarea>
        </div>
        <div class="translator-button-group">
            <button id="translator-translateBtn" class="translator-button translator-translate-btn">翻译</button>
            <button id="translator-clearBtn" class="translator-button translator-clear-btn">清除</button>
        </div>
        <div class="translator-result-group">
            <textarea id="translator-resultText" class="translator-textarea" readonly placeholder="翻译结果将显示在这里"></textarea>
        </div>
    `;
    sidebar.appendChild(content);

    // 添加到页面
    document.body.appendChild(sidebar);
    console.log('Sidebar added to page'); // 调试日志

    // 展开/收起逻辑
    let collapsed = false;
    toggleBtn.onclick = function () {
        collapsed = !collapsed;
        sidebar.classList.toggle('collapsed', collapsed);
        toggleBtn.innerHTML = collapsed ? '⮞' : '⮜';
    };

    // 关闭按钮
    document.getElementById('translator-close').onclick = function () {
        sidebar.remove();
    };

    // 翻译逻辑
    const sourceText = document.getElementById('translator-sourceText');
    const resultText = document.getElementById('translator-resultText');
    const translateBtn = document.getElementById('translator-translateBtn');
    const clearBtn = document.getElementById('translator-clearBtn');
    const langSelect = document.getElementById('translator-langSelect');

    // 百度翻译API配置（请填写你自己的信息）
    const appid = '你的APP_ID'; // TODO: 替换为你的APP_ID
    const key = '你的密钥';     // TODO: 替换为你的密钥

    translateBtn.onclick = async function () {
        const q = sourceText.value.trim();
        if (!q) {
            alert('请输入要翻译的文本');
            return;
        }
        let from = 'zh', to = 'en';
        if (langSelect.value === 'en-zh') {
            from = 'en';
            to = 'zh';
        }
        const salt = Date.now();
        const sign = md5(appid + q + salt + key);
        const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(q)}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.trans_result && data.trans_result.length > 0) {
                resultText.value = data.trans_result[0].dst;
            } else {
                resultText.value = '翻译失败：' + (data.error_msg || '未知错误');
            }
        } catch (error) {
            alert('翻译出错：' + error.message);
        }
    };

    clearBtn.onclick = function () {
        sourceText.value = '';
        resultText.value = '';
    };
} 