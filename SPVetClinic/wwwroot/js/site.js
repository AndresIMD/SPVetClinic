// ==========================================
// SCROLL ANIMATIONS
// ==========================================

// Persistent observer — created once, reused on every call
window._revealObserver = window._revealObserver || new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

window._scrollSetup = false;

window.initScrollAnimations = function () {
    // Observe any new .reveal elements (safe to call multiple times)
    document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)')
        .forEach(el => window._revealObserver.observe(el));

    // One-time setup for scroll and anchor listeners
    if (!window._scrollSetup) {
        window._scrollSetup = true;

        // Smooth scroll for anchor links (delegated to avoid duplicates)
        document.addEventListener('click', function (e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            const navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.topnav');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }
};

// ==========================================
// CLEAR TEXT SELECTION
// ==========================================
window.clearTextSelection = function () {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }

    // En GitHub Pages, el script de redirección SPA puede causar
    // re-selección después de history.replaceState
    // Ejecutar nuevamente después de un frame para asegurar limpieza
    requestAnimationFrame(() => {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    });
};

// ==========================================
// CAROUSEL - Enhanced with drag, swipe, and pause on hover
// ==========================================

// Carousel state
window.carouselState = {
    isPaused: false,
    isDragging: false,
    startX: 0,
    currentX: 0,
    threshold: 50, // Minimum drag distance to trigger slide change
    currentSlide: 1,
    totalSlides: 4
};

window.setActiveSlide = function (slideNumber) {
    window.carouselState.currentSlide = slideNumber;

    // Remove active from all slides and indicators
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Add active to target slide and indicator
    const targetSlide = document.querySelector(`.carousel-slide[data-slide="${slideNumber}"]`);
    const targetIndicator = document.querySelector(`.indicator[data-target="${slideNumber}"]`);

    if (targetSlide) targetSlide.classList.add('active');
    if (targetIndicator) targetIndicator.classList.add('active');
};

// Navigate to next slide
window.goToNextSlide = function () {
    const state = window.carouselState;
    state.currentSlide = state.currentSlide >= state.totalSlides ? 1 : state.currentSlide + 1;
    window.setActiveSlide(state.currentSlide);
};

// Navigate to previous slide
window.goToPrevSlide = function () {
    const state = window.carouselState;
    state.currentSlide = state.currentSlide <= 1 ? state.totalSlides : state.currentSlide - 1;
    window.setActiveSlide(state.currentSlide);
};

// Pause carousel on hover
window.pauseCarousel = function () {
    window.carouselState.isPaused = true;
};

// Resume carousel on mouse leave
window.resumeCarousel = function () {
    window.carouselState.isPaused = false;
};

// Check if carousel is paused (called by Blazor timer)
window.isCarouselPaused = function () {
    return window.carouselState.isPaused;
};

// Initialize drag/swipe functionality
window.initCarouselDrag = function () {
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    // Set initial cursor
    container.style.cursor = 'grab';

    // Mouse events for desktop
    container.addEventListener('mousedown', handleDragStart);
    container.addEventListener('mousemove', handleDragMove);
    container.addEventListener('mouseup', handleDragEnd);
    container.addEventListener('mouseleave', handleDragEnd);

    // Touch events for mobile
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Prevent default drag behavior on slides
    container.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.addEventListener('dragstart', (e) => e.preventDefault());
    });
};

function handleDragStart(e) {
    // Don't start drag if clicking a button or link
    if (e.target.closest('a, button')) return;

    window.carouselState.isDragging = true;
    window.carouselState.startX = e.clientX;
    window.carouselState.currentX = e.clientX;

    const container = document.querySelector('.carousel-container');
    container.style.cursor = 'grabbing';
}

function handleDragMove(e) {
    if (!window.carouselState.isDragging) return;
    window.carouselState.currentX = e.clientX;
}

function handleDragEnd(e) {
    if (!window.carouselState.isDragging) return;

    const container = document.querySelector('.carousel-container');
    container.style.cursor = 'grab';

    const diff = window.carouselState.startX - window.carouselState.currentX;

    if (Math.abs(diff) > window.carouselState.threshold) {
        if (diff > 0) {
            // Dragged left - go to next slide
            window.goToNextSlide();
        } else {
            // Dragged right - go to previous slide
            window.goToPrevSlide();
        }
    }

    window.carouselState.isDragging = false;
}

function handleTouchStart(e) {
    window.carouselState.startX = e.touches[0].clientX;
    window.carouselState.currentX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    window.carouselState.currentX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    const diff = window.carouselState.startX - window.carouselState.currentX;

    if (Math.abs(diff) > window.carouselState.threshold) {
        if (diff > 0) {
            window.goToNextSlide();
        } else {
            window.goToPrevSlide();
        }
    }
}

// ==========================================
// FAQ TOGGLE
// ==========================================
window.toggleFaq = function (button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('.faq-icon');

    faqItem.classList.toggle('active');

    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    } else {
        answer.style.maxHeight = '0';
        icon.textContent = '+';
    }
};

// ==========================================
// MOBILE MENU & DROPDOWN (TopNav)
// ==========================================
window.toggleMobileMenu = function () {
    document.getElementById('navLinks').classList.toggle('active');
    var btn = document.querySelector('.mobile-menu-btn');
    if (btn) btn.classList.toggle('active');
};

window.toggleDropdown = function (event) {
    event.stopPropagation();
    var dropdown = event.target.closest('.nav-dropdown');
    dropdown.classList.toggle('active');

    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
};

// Close dropdown on mobile when clicking a link
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown-item').forEach(function (item) {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-dropdown').forEach(function (d) { d.classList.remove('active'); });
            var navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('active');
            var btn = document.querySelector('.mobile-menu-btn');
            if (btn) btn.classList.remove('active');
        });
    });

    // Promo close button (Vacunacion page)
    var promoClose = document.querySelector('.promo-close');
    if (promoClose) {
        promoClose.addEventListener('click', function () {
            var promoFloat = document.getElementById('promo-float');
            if (promoFloat) promoFloat.style.display = 'none';
        });
    }
});
