// ========================================
// LIL INDIE GAMES - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initBurgerMenu();
    initSmoothScroll();
    initScrollAnimations();
    initCometParallax();
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// BURGER MENU (MOBILE)
// ========================================

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

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section-header, .about-text, .about-stats, .game-showcase-punk, .contact-content'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// COMET PHYSICS SYSTEM
// ========================================

function initCometParallax() {
    const container = document.getElementById('cometContainer');
    if (!container) return;

    const gamesSection = document.querySelector('.games');
    if (!gamesSection) return;

    // Create comets with fixed positions and parallax speeds
    const cometData = [
        { x: 5, y: 10, size: 80, speed: 0.3, rotation: 15 },
        { x: 85, y: 20, size: 60, speed: 0.5, rotation: -20 },
        { x: 15, y: 70, size: 70, speed: 0.4, rotation: 45 },
        { x: 75, y: 80, size: 90, speed: 0.2, rotation: -10 },
        { x: 50, y: 5, size: 50, speed: 0.6, rotation: 30 },
    ];

    const comets = cometData.map(data => {
        const comet = document.createElement('div');
        comet.className = 'comet';
        container.appendChild(comet);

        comet.style.width = data.size + 'px';
        comet.style.height = data.size + 'px';
        comet.style.left = data.x + '%';
        comet.style.top = data.y + '%';
        comet.style.opacity = '0.6';

        return {
            el: comet,
            baseY: data.y,
            speed: data.speed,
            rotation: data.rotation
        };
    });

    // Scroll-based parallax
    function updateParallax() {
        const rect = gamesSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress through section (-1 to 1 range)
        const progress = (windowHeight - sectionTop) / (windowHeight + rect.height);
        const scrollOffset = (progress - 0.5) * 100;

        comets.forEach(comet => {
            const yOffset = scrollOffset * comet.speed;
            const rotation = comet.rotation + (scrollOffset * 0.2);
            comet.el.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });

        requestAnimationFrame(updateParallax);
    }

    updateParallax();
}

// ========================================
// NOTIFY BUTTON
// ========================================

document.querySelector('.btn-notify-punk')?.addEventListener('click', () => {
    alert('Notification system coming soon! Follow us on social media for updates.');
});
