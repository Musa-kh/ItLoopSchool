document.addEventListener("DOMContentLoaded", () => {
    const phoneNumber = "77084130827";

    // Используем делегирование событий, так как карточки создаются динамически
    document.addEventListener("click", (event) => {
        const target = event.target;

        // Проверяем, что нажата кнопка "Записаться"
        if (target.classList.contains("gradient-btn") && target.dataset.courseKey) {
            const courseKey = target.dataset.courseKey;
            const currentLang = window.currentLang || localStorage.getItem("lang") || "ru";

            const courseTitle = (window.translations && window.translations[currentLang] && window.translations[currentLang][courseKey]) 
                ? window.translations[currentLang][courseKey] 
                : courseKey;
            
            const messageTemplate = (window.translations && window.translations[currentLang] && window.translations[currentLang]["whatsapp_message"])
                ? window.translations[currentLang]["whatsapp_message"]
                : "Здравствуйте! Я хочу записаться на курс: ";

            const finalMessage = encodeURIComponent(messageTemplate + courseTitle);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${finalMessage}`;

            window.open(whatsappUrl, "_blank");
        }

        // Обработка главной кнопки в баннере
        if (target.id === "bannerEnrollBtn") {
            event.preventDefault();
            const currentLang = window.currentLang || localStorage.getItem("lang") || "ru";
            const messageTemplate = (window.translations && window.translations[currentLang] && window.translations[currentLang]["whatsapp_message_general"])
                ? window.translations[currentLang]["whatsapp_message_general"]
                : "Здравствуйте! Я хочу записаться на курс.";

            const finalMessage = encodeURIComponent(messageTemplate);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${finalMessage}`;
            window.open(whatsappUrl, "_blank");
        }
    });
});