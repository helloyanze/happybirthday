/* by rikanutyy */

let cardOpened = false;
const card = document.querySelector('.card');
const clickHint = document.querySelector('.click-hint');

// 监听卡片的 hover 状态
card.addEventListener('mouseenter', function() {
    cardOpened = true;
    // 延迟显示提示，等卡片翻转动画完成
    setTimeout(() => {
        if (cardOpened) {
            clickHint.style.opacity = '1';
            clickHint.style.visibility = 'visible';
        }
    }, 700); // 与 CSS 中的 transition 时间匹配
});

card.addEventListener('mouseleave', function() {
    cardOpened = false;
    clickHint.style.opacity = '0';
    clickHint.style.visibility = 'hidden';
});

// 点击页面跳转到蛋糕页面
document.body.addEventListener('click', function() {
    if (cardOpened) {
        // 添加淡出效果
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';
        
        // 等待淡出动画完成后跳转
        setTimeout(() => {
            window.location.href = './cake/index.html';
        }, 500);
    }
});