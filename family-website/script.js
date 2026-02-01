// 家庭网站 JavaScript 功能

document.addEventListener('DOMContentLoaded', function() {
    // 设置当前日期
    setCurrentDate();

    // 初始化平滑滚动
    initSmoothScrolling();

    // 初始化导航高亮
    initNavHighlight();

    // 初始化备忘录功能
    initMemoFunction();

    // 初始化成员卡片交互
    initMemberCards();
});

// 设置当前日期
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
}

// 初始化平滑滚动
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // 更新URL哈希（可选）
                history.pushState(null, null, targetId);
            }
        });
    });
}

// 初始化导航高亮
function initNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // 更新导航链接高亮
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 为当前活动链接添加样式
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background-color: #2c3e50;
            color: #f1c40f !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// 初始化备忘录功能
function initMemoFunction() {
    const saveBtn = document.querySelector('.save-btn');
    const memoTextarea = document.querySelector('.contact-card textarea');

    if (!saveBtn || !memoTextarea) return;

    // 从本地存储加载保存的备忘录
    const savedMemo = localStorage.getItem('familyMemo');
    if (savedMemo) {
        memoTextarea.value = savedMemo;
    }

    // 保存备忘录到本地存储
    saveBtn.addEventListener('click', function() {
        const memoText = memoTextarea.value.trim();

        if (memoText) {
            localStorage.setItem('familyMemo', memoText);

            // 显示保存成功提示
            showNotification('备忘录已保存！', 'success');
        } else {
            // 清除保存的备忘录
            localStorage.removeItem('familyMemo');
            showNotification('备忘录已清空！', 'info');
        }
    });

    // 自动保存（可选，每5秒保存一次）
    let saveTimeout;
    memoTextarea.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            const memoText = memoTextarea.value.trim();
            if (memoText) {
                localStorage.setItem('familyMemo', memoText);
            }
        }, 5000);
    });
}

// 初始化成员卡片交互
function initMemberCards() {
    const memberCards = document.querySelectorAll('.member-profile, .member-card');

    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // 获取成员信息
            const name = this.querySelector('h3, h4')?.textContent || '家庭成员';
            const role = this.querySelector('.role')?.textContent || '';

            // 显示成员信息提示
            if (name && role) {
                showNotification(`查看: ${name} (${role})`, 'info', 1500);
            }
        });
    });
}

// 显示通知
function showNotification(message, type = 'info', duration = 3000) {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            max-width: 300px;
        }

        .notification.success {
            background-color: #27ae60;
            border-left: 4px solid #2ecc71;
        }

        .notification.info {
            background-color: #3498db;
            border-left: 4px solid #2980b9;
        }

        .notification.warning {
            background-color: #f39c12;
            border-left: 4px solid #e67e22;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    // 自动移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
}

// 添加家庭成员统计功能
function updateFamilyStats() {
    const memberCount = document.querySelectorAll('.member-profile').length;
    const generationCount = document.querySelectorAll('.generation').length;

    // 更新统计数据
    const memberStat = document.querySelector('.stat:nth-child(1) .number');
    const generationStat = document.querySelector('.stat:nth-child(2) .number');

    if (memberStat) memberStat.textContent = memberCount;
    if (generationStat) generationStat.textContent = generationCount;
}

// 初始化时更新统计数据
updateFamilyStats();

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Alt+H 回到首页
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showNotification('已回到首页', 'info', 1500);
    }

    // Alt+M 跳转到家庭成员
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const membersSection = document.getElementById('members');
        if (membersSection) {
            window.scrollTo({
                top: membersSection.offsetTop - 80,
                behavior: 'smooth'
            });
            showNotification('跳转到家庭成员', 'info', 1500);
        }
    }
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // 添加加载完成样式
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        body.loaded {
            opacity: 1;
        }

        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        body.loaded section {
            opacity: 1;
            transform: translateY(0);
        }

        /* 添加延迟动画 */
        body.loaded #home { transition-delay: 0.1s; }
        body.loaded #family-tree { transition-delay: 0.2s; }
        body.loaded #members { transition-delay: 0.3s; }
        body.loaded #gallery { transition-delay: 0.4s; }
        body.loaded #contact { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
});