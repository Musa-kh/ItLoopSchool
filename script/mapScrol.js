(function() {
    const schoolCoordinates = [76.6327639, 43.199507];
    const mapWrapper = document.querySelector('.map-wrapper');
    const fullscreen = document.getElementById('mapFullscreen');
    const closeBtn = document.getElementById('closeFullscreen');

    let map = null;
    let fullscreenMap = null;

    // ===== ИНИЦИАЛИЗАЦИЯ КАРТЫ =====
    function createMap(containerId, zoom) {
        const mapInstance = new maplibregl.Map({
            container: containerId,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: schoolCoordinates,
            zoom: zoom,
            cooperativeGestures: true // Исправляет "залипание" скролла страницы на карте
        });

        // Добавляем кнопки зума (+/-), так как скролл теперь "умный"
        mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

        // маркер
        const markerEl = document.createElement('div');
        markerEl.className = 'marker';
        markerEl.style.backgroundImage = 'url(images/logo.webp)';

        const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML("<strong>IT Loop School</strong><br>ул. Алии Молдагуловой, 3а, Каскелен");

        new maplibregl.Marker(markerEl)
            .setLngLat(schoolCoordinates)
            .setPopup(popup)
            .addTo(mapInstance);

        mapInstance.on('load', () => {
            if (mapInstance.getLayer('background')) {
                mapInstance.setPaintProperty('background', 'background-color', '#f7f9fc');
            }
            if (mapInstance.getLayer('water')) {
                mapInstance.setPaintProperty('water', 'fill-color', '#00bcd4');
            }
        });

        return mapInstance;
    }

    // Инициализируем карту сразу, так как скрипт уже загружен лениво
    map = createMap('map', 17);

    // ===== FULLSCREEN =====
    mapWrapper.addEventListener('click', (e) => {
        // Не открываем fullscreen при клике на кнопки зума или маркер
        if (e.target.closest('.maplibregl-ctrl') || e.target.closest('.marker')) return;

        fullscreen.style.display = 'flex';
        // помечаем документ — чтобы скрыть шапку и карточки через CSS
        document.body.classList.add('map-open');
        // блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';

        if (!fullscreenMap) {
            fullscreenMap = createMap('fullscreenMap', 18);
        }

        setTimeout(() => fullscreenMap.resize(), 200);
    });

    function closeFullscreen() {
        fullscreen.style.display = 'none';
        document.body.classList.remove('map-open');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', () => {
        closeFullscreen();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
})();
