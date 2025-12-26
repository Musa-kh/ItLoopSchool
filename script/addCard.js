document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".courses-container");
    const track = document.getElementById("cardsTrack");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    const courses = [
        { 
            title: "Roblox Studio", 
            titleKey: "course_roblox",
            scheduleKey: "roblox_schedule",
            groupKey: "roblox_group",
            langKey: "lang_english",
            timeKey: "time_90",
            Schedule: "2 Раза в неделю(ПН-СР; ВТ-ЧТ; СБ-ВС) 8 Уроков в месяц",
            Group: "до 10 учеников",
            Language:"Английский",
            TimeLesson:"90 мин",
            img: "images/roblox-banner.webp", 
            price: "35.000 ₸" 
        },
        { 
            title: "Frontend", 
            titleKey: "course_frontend",
            scheduleKey: "frontend_schedule",
            groupKey: "frontend_group",
            langKey: "lang_russian",
            timeKey: "time_90",
            Schedule: "2 Раза в неделю(ПН-СР; ВТ-ЧТ; СБ-ВС) 8 Уроков в месяц",
            Group: "до 10 учеников",
            Language:"Русский",
            TimeLesson:"90 мин",
            img: "images/webCours-banner.webp", 
            price: "35.000 ₸" 
        },
        { 
            title: "Python", 
            titleKey: "course_python",
            scheduleKey: "python_schedule",
            groupKey: "python_group",
            langKey: "lang_english",
            timeKey: "time_90",
            Schedule: "2 Раза в неделю(ПН-ВТ; СР-ЧТ; СБ-ВС) 8 Уроков в месяц",
            Group: "до 10 учеников",
            Language:"Английский",
            TimeLesson:"90 мин",
            img: "images/python-banner.webp", 
            price: "35.000 ₸" 
        },
        { 
            title: "Подготовка к школе", 
            titleKey: "course_school_prep",
            scheduleKey: "school_prep_schedule",
            groupKey: "school_prep_group",
            langKey: "lang_ru_kz",
            timeKey: "time_180",
            Schedule: "5 Дней в неделю",
            Group: "до 6 учеников",
            Language:"Русский-Казахский",
            TimeLesson:"180 мин",
            img: "images/schoolPrep-banner.webp", 
            price: "60.000 ₸/ 20 Дней"
        },
        { 
            title: "Курсы по робототехнике (Будни)", 
            titleKey: "course_robotics",
            scheduleKey: "robotics_schedule",
            groupKey: "robotics_group",
            langKey: "lang_ru_kz",
            timeKey: "time_90",
            Schedule: "2 Раз в неделю(ПН-СР; ВТ-ЧТ) 8 Урока в месяц",
            Group: "до 6 учеников",
            Language:"Русский-Казахский",
            TimeLesson:"90 мин",
            img: "images/robotLab-banner.webp", 
            price: "20.000 ₸" 
        },
        { 
            title: "Компьютерная грамотность", 
            titleKey: "course_computer_literacy",
            scheduleKey: "computer_literacy_schedule",
            groupKey: "computer_literacy_group",
            langKey: "lang_ru_kz",
            timeKey: "time_90",
            Schedule: "2 Раза в неделю(ПН-СР; ВТ-ЧТ; СБ-ВС) 8 Уроков в месяц",
            Group: "до 10 учеников",
            Language:"Русский-Казахский",
            TimeLesson:"90 мин",
            img: "images/computerSkills-banner.webp", 
            price: "30.000 ₸" 
        },
        { 
            title: "Курсы по робототехнике (Выходной)", 
            titleKey: "course_robotics_2",
            scheduleKey: "robotics_2_schedule",
            groupKey: "robotics_2_group",
            langKey: "lang_ru_kz",
            timeKey: "time_90",
            Schedule: "2 Раз в неделю(СБ-ВС) 8 Урока в месяц",
            Language:"Русский-Казахский",
            TimeLesson:"90 мин",
            Group: "до 10 учеников", 
            img: "images/robotLab2-banner.webp", 
            price: "25.000 ₸" 
        }
    ];

    // ===== Создание карточек =====
    courses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        card.innerHTML = `
            <div class="card-image">
                <img src="${course.img}" alt="" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-text">
                    <h3 class="glow-title" data-i18n="${course.titleKey}">${course.title}</h3>
                    <p><span class="card-label" data-i18n="card_schedule">Расписание: </span><span data-i18n="${course.scheduleKey}">${course.Schedule}</span></p>
                    <p><span class="card-label" data-i18n="card_group">Группа: </span><span data-i18n="${course.groupKey}">${course.Group}</span></p>
                    <p><span class="card-label" data-i18n="card_language">Язык обучения: </span><span data-i18n="${course.langKey}">${course.Language}</span></p>
                    <p><span class="card-label" data-i18n="card_duration">Длительность: </span><span data-i18n="${course.timeKey}">${course.TimeLesson}</span></p>
                </div>
                <div class="price">
                    <span>${course.price}</span>
                    <button class="gradient-btn" data-i18n="card_enroll" data-course-key="${course.titleKey}">Записаться</button>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    // После добавления всех карточек вызываем перевод, если функция доступна
    if (typeof changeLanguage === 'function') {
        const savedLang = localStorage.getItem("lang") || "ru";
        changeLanguage(savedLang);
    }
    let cardWidth;
    function calculateCardWidth() {
        const firstCard = track.firstElementChild;
        if (firstCard) {
            const style = window.getComputedStyle(firstCard);
            const margin = parseFloat(window.getComputedStyle(track).gap) || 0;
            cardWidth = firstCard.offsetWidth + margin;
        } else {
            cardWidth = 350;
        }
    }
    window.addEventListener("resize", () => {
        calculateCardWidth();
    });
    calculateCardWidth();

    let isAnimating = false;

    function updateClasses() {
        const cards = Array.from(track.children);
        cards.forEach(card => card.classList.remove("prev", "active", "next", "prev2", "next2", "prev3", "next3"));

        // Поскольку мы всегда держим "активную" карточку в центре DOM-структуры для бесконечного эффекта
        const middle = Math.floor(cards.length / 2);

        if (cards[middle]) cards[middle].classList.add("active");
        if (cards[middle - 1]) cards[middle - 1].classList.add("prev");
        if (cards[middle - 2]) cards[middle - 2].classList.add("prev2");
        if (cards[middle - 3]) cards[middle - 3].classList.add("prev3");
        if (cards[middle + 1]) cards[middle + 1].classList.add("next");
        if (cards[middle + 2]) cards[middle + 2].classList.add("next2");
        if (cards[middle + 3]) cards[middle + 3].classList.add("next3");
    }

    // Изначально центрируем трек, чтобы средняя карточка была посередине
    // Но так как мы используем appendChild/prepend, нам нужно начальное положение.
    // Для 7 карточек middle = 3.
    
    updateClasses();

    function next() {
        if (isAnimating) return;
        isAnimating = true;

        if (!cardWidth) calculateCardWidth();

        const cards = Array.from(track.children);
        const middle = Math.floor(cards.length / 2);

        // Плавное обновление классов для анимации масштаба и поворота
        // Мы двигаемся ВПРАВО (track влево), значит:
        // middle -> становится prev
        // middle + 1 -> становится active
        // middle + 2 -> становится next
        // middle + 3 -> становится next2
        // middle - 1 -> становится prev2
        
        cards.forEach(card => card.classList.remove("prev", "active", "next", "prev2", "next2", "prev3", "next3"));

        if (cards[middle - 2]) cards[middle - 2].classList.add("prev3");
        if (cards[middle - 1]) cards[middle - 1].classList.add("prev2");
        if (cards[middle]) cards[middle].classList.add("prev");
        if (cards[middle + 1]) cards[middle + 1].classList.add("active");
        if (cards[middle + 2]) cards[middle + 2].classList.add("next");
        if (cards[middle + 3]) cards[middle + 3].classList.add("next2");
        if (cards[middle + 4]) cards[middle + 4].classList.add("next3");

        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(${-cardWidth}px)`;

        const handleTransitionEnd = (e) => {
            if (e.propertyName !== "transform" || e.target !== track) return;
            track.removeEventListener("transitionend", handleTransitionEnd);
            
            track.style.transition = "none";
            track.appendChild(track.firstElementChild);
            track.style.transform = "translateX(0px)";
            updateClasses();
            isAnimating = false;
        };
        track.addEventListener("transitionend", handleTransitionEnd);
    }

    function prev() {
        if (isAnimating) return;
        isAnimating = true;

        if (!cardWidth) calculateCardWidth();

        track.style.transition = "none";
        track.prepend(track.lastElementChild);
        track.style.transform = `translateX(${-cardWidth}px)`;

        // Форсируем перерисовку
        track.offsetHeight;

        const cards = Array.from(track.children);
        const middle = Math.floor(cards.length / 2);
        
        cards.forEach(c => c.classList.remove("prev", "active", "next", "prev2", "next2", "prev3", "next3"));
        
        // Устанавливаем классы для анимации ПЕРЕД началом движения
        // Так как мы уже сделали prepend, middle - это новая активная карточка
        if (cards[middle - 3]) cards[middle - 3].classList.add("prev3");
        if (cards[middle - 2]) cards[middle - 2].classList.add("prev2");
        if (cards[middle - 1]) cards[middle - 1].classList.add("prev");
        if (cards[middle]) cards[middle].classList.add("active");
        if (cards[middle + 1]) cards[middle + 1].classList.add("next");
        if (cards[middle + 2]) cards[middle + 2].classList.add("next2");
        if (cards[middle + 3]) cards[middle + 3].classList.add("next3");

        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = "translateX(0px)";

        const handleTransitionEnd = (e) => {
            if (e.propertyName !== "transform" || e.target !== track) return;
            track.removeEventListener("transitionend", handleTransitionEnd);
            isAnimating = false;
            updateClasses();
        };
        track.addEventListener("transitionend", handleTransitionEnd);
    }
    // ===== EVENTS =====
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    track.addEventListener("wheel", e => {
        e.preventDefault();
        e.deltaY > 0 ? next() : prev();
    }, { passive: false });

    // ===== TOUCH EVENTS FOR SWIPE =====
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // порог в пикселях для срабатывания свайпа
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево -> следующая карточка
            next();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо -> предыдущая карточка
            prev();
        }
    }
});