// ==========================================
// SCROLL ANIMATIONS
// ==========================================
window.initScrollAnimations = function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
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
