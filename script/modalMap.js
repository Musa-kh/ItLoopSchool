const routeBtn = document.getElementById('routeBtn'); // кнопка "Построить маршрут"
const mapModal = document.getElementById('mapModal'); // сама модалка
const closeBtn = mapModal.querySelector('.map-close-btn'); // кнопка закрытия внутри модалки

// Открытие модалки
routeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    mapModal.style.display = 'flex';
});

// Закрытие модалки по кнопке "Закрыть"
closeBtn.addEventListener('click', function() {
    mapModal.style.display = 'none';
});

// Закрытие модалки при клике на фон
mapModal.addEventListener('click', function(e) {
    if (e.target === mapModal) {
        mapModal.style.display = 'none';
    }
});
