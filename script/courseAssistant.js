document.addEventListener("DOMContentLoaded", () => {
    const assistant = document.getElementById("courseAssistant");
    const closeBtn = document.getElementById("assistantClose");
    const titleEl = document.getElementById("assistantTitle");
    const textEl = document.getElementById("assistantText");

    let lastCourse = null;
    let isHidden = false;

    function getLang() {
        return localStorage.getItem("lang") || "ru";
    }

    function setDefaultText() {
        const lang = getLang();
        titleEl.textContent = translations[lang].assistant_default_title;
        textEl.textContent = translations[lang].assistant_default_text;
    }

    function updateAssistant() {
        if (isHidden) return;

        const activeCard = document.querySelector(".course-card.active");
        if (!activeCard) return;

        const key = activeCard.dataset.course;
        if (!key || key === lastCourse) return;

        const lang = getLang();
        const t = translations[lang];

        titleEl.textContent = t[`assistant_${key}_title`];
        textEl.textContent = t[`assistant_${key}_text`];

        assistant.classList.add("visible");
        lastCourse = key;
    }

    // Появление при прокрутке
    window.addEventListener("scroll", () => {
        const section = document.querySelector(".courses");
        if (section.getBoundingClientRect().top < window.innerHeight - 200) {
            assistant.classList.add("visible");
        }
    });

    // Закрытие
    closeBtn.addEventListener("click", () => {
        assistant.style.display = "none";
        isHidden = true;
    });

    // Обновление при смене языка
    window.addEventListener("languageChanged", () => {
        lastCourse = null;
        setDefaultText();
    });

    setDefaultText();
    setInterval(updateAssistant, 120);
});
