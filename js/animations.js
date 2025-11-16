/* ====================================
   Animations JavaScript - Scroll Animations
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();

    // Add stagger animation to grids
    initStaggerAnimations();
});

/**
 * Initialize Scroll-Triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add scroll-triggered animations to cards and sections
    const cards = document.querySelectorAll(
        '.resource-card, .tool-card, .step-card, .practice-card, .venue-card'
    );

    cards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Initialize Stagger Animations for Grids
 */
function initStaggerAnimations() {
    const grids = document.querySelectorAll('.cards-grid, .tools-grid, .practices-grid');

    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        });
    });
}

/**
 * Parallax Scroll Effect (Optional Enhancement)
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Counter Animation for Numbers
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Reveal on Scroll Animation
 */
function revealOnScroll() {
    const sections = document.querySelectorAll('.content-section');

    const revealSection = function(entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(function(section) {
        sectionObserver.observe(section);
        section.classList.add('section--hidden');
    });
}

/**
 * Add Progress Bar Animation
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '100%';
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// Initialize additional animations if elements exist
window.addEventListener('load', () => {
    animateProgressBars();
});
