(function() {
if (window.innerWidth < 768) {
    const bg = document.getElementById('particles-bg');
    if (bg) bg.remove();
    return;
}
const canvas = document.getElementById("particles-bg");
canvas.style.zIndex = "-1";
const ctx = canvas.getContext("2d");
const main = document.querySelector(".main");

let particles = [];
let lastTime = performance.now();

// ====== DEFAULT ======
let PARTICLE_COUNT = 80;
let SPEED = 0.55;
let MIN_RADIUS = 2;
let MAX_RADIUS = 4;

// ====== SCROLL STATE ======
let isScrolling = false;
let scrollTimeout;

// ====== RESPONSIVE ======
function applyResponsiveSettings() {
    const w = window.innerWidth;

    if (w <= 600) {
        PARTICLE_COUNT = 25;
        SPEED = 1;
        MIN_RADIUS = 2.5;
        MAX_RADIUS = 4.5;
    } else {
        PARTICLE_COUNT = 80;
        SPEED = 1;
        MIN_RADIUS = 2;
        MAX_RADIUS = 4;
    }
}

// ====== CANVAS SIZE ======
function resizeCanvas() {
    const w = main.clientWidth;
    const h = main.clientHeight;

    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
    }
}

// ====== SCROLL LISTENER ======
window.addEventListener(
    "scroll",
    () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 120);
    },
    { passive: true }
);

// ====== PARTICLE ======
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius =
            Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;

        this.speedX = (Math.random() - 0.5) * SPEED;
        this.speedY = (Math.random() - 0.5) * SPEED;

        this.color = Math.random() > 0.5
            ? "rgba(255, 215, 0, 0.65)"
            : "rgba(0, 210, 255, 0.55)";
    }

    update(delta) {
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;

        if (
            this.x < -60 || this.x > canvas.width + 60 ||
            this.y < -60 || this.y > canvas.height + 60
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;

        ctx.fill();
    }
}

// ====== INIT ======
function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

// ====== ANIMATE ======
function animate(time) {
    let delta = (time - lastTime) / 16.6;
    lastTime = time;

    // защита от скачков после scroll
    if (delta > 2) delta = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        if (!isScrolling) {
            p.update(delta);
        }
        p.draw();
    });

    requestAnimationFrame(animate);
}

// ====== RESIZE OBSERVER ======
// Автоматически обновляем canvas, если высота main изменилась (например, загрузились картинки)
const resizeObserver = new ResizeObserver(() => {
    const w = main.clientWidth;
    const h = main.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
        resizeCanvas();
        initParticles();
    }
});
resizeObserver.observe(main);

// ====== START ======
applyResponsiveSettings();
resizeCanvas();
initParticles();
requestAnimationFrame(animate);

// ====== RESIZE ======
window.addEventListener("resize", () => {
    applyResponsiveSettings();
    resizeCanvas();
    initParticles();
});
})();
