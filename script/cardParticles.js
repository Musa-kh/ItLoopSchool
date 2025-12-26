document.addEventListener("DOMContentLoaded", () => {
    // Оптимизация: отключаем частицы на мобильных и планшетах
    if (window.innerWidth < 1024) return;

    const track = document.getElementById("cardsTrack");
    let lastSpawnTime = 0;
    const spawnInterval = 600; // Создаем частицы реже (раз в 600мс)
    
    function createParticle(card) {
        // Ограничение: не больше 3 частиц одновременно на карточке
        if (card.querySelectorAll('.card-particle').length >= 3) return;

        const particle = document.createElement('div');
        particle.classList.add('card-particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 90 + 5 + '%';
        particle.style.top = Math.random() * 90 + 5 + '%';
        particle.style.background = Math.random() > 0.5 ? '#00d2ff' : '#f1c40f';
        
        card.appendChild(particle);
        
        // Удаляем элемент после завершения анимации (3s в CSS)
        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 3000);
    }

    function loop(timestamp) {
        if (timestamp - lastSpawnTime > spawnInterval) {
            const activeCard = track.querySelector('.course-card.active');
            if (activeCard) {
                createParticle(activeCard);
            }
            lastSpawnTime = timestamp;
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
});
