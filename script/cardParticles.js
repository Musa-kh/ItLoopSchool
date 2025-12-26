document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("cardsTrack");
    
    function createParticle(card) {
        const particle = document.createElement('div');
        particle.classList.add('card-particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Позиция внутри карточки
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Желтый или Голубой
        particle.style.background = Math.random() > 0.5 ? '#00d2ff' : '#f1c40f';
        
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `particleFade ${duration}s ease-in-out infinite`;
        
        card.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Следим за добавлением карточек
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('course-card')) {
                    setInterval(() => {
                        if (node.classList.contains('active')) {
                            createParticle(node);
                        }
                    }, 400);
                }
            });
        });
    });

    observer.observe(track, { childList: true });
    
    // Для уже существующих (если они есть к моменту запуска скрипта)
    document.querySelectorAll('.course-card').forEach(card => {
        setInterval(() => {
            if (card.classList.contains('active')) {
                createParticle(card);
            }
        }, 400);
    });
});
