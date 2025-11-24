// I am going to continue to improve this...
// I attempt to perform candle again but could not overcome the previous version.
// https://codepen.io/fixcl/pen/nKFDr

// 音乐播放控制
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // 点击按钮切换音乐播放状态
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<span class="play-icon">🎵</span>';
        } else {
            bgMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<span class="play-icon">🎶</span>';
        }
        isPlaying = !isPlaying;
    });

    // 自动播放音乐（延迟2秒）
    setTimeout(() => {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<span class="play-icon">🎶</span>';
        }).catch(err => {
            console.log('自动播放被阻止，请点击按钮播放音乐');
        });
    }, 2000);

    // 照片轮播控制
    const photos = document.querySelectorAll('.gallery-photo');
    const prevBtn = document.querySelector('.photo-nav.prev');
    const nextBtn = document.querySelector('.photo-nav.next');
    const dotsContainer = document.querySelector('.photo-dots');
    let currentPhotoIndex = 0;
    let autoPlayInterval;

    // 创建指示点
    photos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showPhoto(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showPhoto(index) {
        // 移除所有活动状态
        photos.forEach(photo => photo.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 设置新的活动照片
        currentPhotoIndex = index;
        photos[currentPhotoIndex].classList.add('active');
        dots[currentPhotoIndex].classList.add('active');
    }

    function nextPhoto() {
        let newIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(newIndex);
    }

    function prevPhoto() {
        let newIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        showPhoto(newIndex);
    }

    // 按钮事件
    nextBtn.addEventListener('click', () => {
        nextPhoto();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevPhoto();
        resetAutoPlay();
    });

    // 自动轮播
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextPhoto, 3000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // 延迟启动自动轮播，等照片区域出现后
    setTimeout(startAutoPlay, 9000);

    // 鼠标悬停时暂停自动播放
    const photoGallery = document.querySelector('.photo-gallery');
    photoGallery.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    photoGallery.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // 打字机效果
    const typewriterText = '于是我逢人便说，你是我不可多得的挚友。是低落时接住我所有情绪的避风港，是迷茫时陪我理清思路的同行者，是分享喜悦时比我还雀跃的真心人。岁月匆匆，幸好有你，让每一段寻常日子都多了份安心与光亮。今天是属于你的特别日子，愿你往后岁岁常欢愉，年年皆胜意，眼底有星光，心中有温暖，所求皆如愿，所行皆坦途。往后的路，我们继续并肩，把更多美好写进时光里，生日快乐呀，我最珍贵的朋友！';
    const typewriterElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.cursor');
    let charIndex = 0;
    let typingSpeed = 100; // 每个字的打字速度（毫秒）

    function typeWriter() {
        if (charIndex < typewriterText.length) {
            typewriterElement.textContent += typewriterText.charAt(charIndex);
            charIndex++;
            
            // 标点符号后稍作停顿
            const currentChar = typewriterText.charAt(charIndex - 1);
            const pauseChars = ['，', '。', '！', '、', '；'];
            const delay = pauseChars.includes(currentChar) ? typingSpeed + 200 : typingSpeed;
            
            setTimeout(typeWriter, delay);
        } else {
            // 打字完成后，继续显示光标闪烁
            cursorElement.style.display = 'inline-block';
        }
    }

    // 延迟10秒后开始打字（等待蛋糕动画和照片区域出现）
    setTimeout(() => {
        typeWriter();
    }, 10000);
});