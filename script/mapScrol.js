document.addEventListener("DOMContentLoaded", () => {

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
            zoom: zoom
        });

        // маркер
        const markerEl = document.createElement('div');
        markerEl.className = 'marker';
        markerEl.style.backgroundImage = 'url(images/logo.png)';

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

    // ===== ЛЕНИВАЯ ЗАГРУЗКА КАРТЫ =====
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            map = createMap('map', 17);
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(mapWrapper);

    // ===== FULLSCREEN =====
    mapWrapper.addEventListener('click', () => {
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

});
