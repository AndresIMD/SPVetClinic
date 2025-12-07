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
};

// ==========================================
// CAROUSEL
// ==========================================
window.setActiveSlide = function (slideNumber) {
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
