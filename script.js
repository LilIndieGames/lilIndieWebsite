// =====================================================
// LIL INDIE GAMES
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initSmoothScroll();
    initCometParallax();
});

// =====================================================
// BURGER MENU (MOBILE)
// =====================================================
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    if (!burger || !navLinks) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =====================================================
// SMOOTH SCROLL (offset for sticky nav)
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const nav = document.querySelector('.navbar');
            const offset = nav ? nav.offsetHeight + 4 : 60;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// =====================================================
// COMET PARALLAX (games section background drift)
// =====================================================
function initCometParallax() {
    const container = document.getElementById('cometContainer');
    const gamesSection = document.querySelector('.games');
    if (!container || !gamesSection) return;

    const cometData = [
        { x: 4,  y: 12, size: 74, speed: 0.30 },
        { x: 86, y: 18, size: 56, speed: 0.50 },
        { x: 12, y: 72, size: 66, speed: 0.40 },
        { x: 78, y: 78, size: 88, speed: 0.22 },
        { x: 48, y: 6,  size: 46, speed: 0.60 },
    ];

    const comets = cometData.map(d => {
        const el = document.createElement('div');
        el.className = 'comet';
        el.style.width = d.size + 'px';
        el.style.height = d.size + 'px';
        el.style.left = d.x + '%';
        el.style.top = d.y + '%';
        container.appendChild(el);
        return { el, speed: d.speed };
    });

    let ticking = false;
    function update() {
        const rect = gamesSection.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 100;
        comets.forEach(c => {
            c.el.style.transform = `translateY(${offset * c.speed}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
}
