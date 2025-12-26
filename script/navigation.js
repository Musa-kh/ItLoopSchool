const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active'); // добавляем класс для поворота стрелки
});

// при скролле закрываем nav и сбрасываем стрелку
window.addEventListener('scroll', () => {
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
});
