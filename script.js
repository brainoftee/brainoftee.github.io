// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Intersection Observer for scroll animations with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for grouped elements
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach((element) => {
    observer.observe(element);
});

// Add stagger delay to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    if (!card.hasAttribute('data-aos-delay')) {
        card.style.transitionDelay = `${index * 0.1}s`;
    }
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate stats on scroll
const animateStats = () => {
    const statValues = document.querySelectorAll('.stat-value');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Add a subtle scale animation
                target.style.animation = 'scaleIn 0.6s ease-out';
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statsObserver.observe(stat));
};

// Add scale animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleIn {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations
animateStats();

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add cursor trail effect (optional, subtle)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handler
const optimizedScroll = debounce(() => {
    // Scroll optimizations here if needed
}, 10);

window.addEventListener('scroll', optimizedScroll);

console.log('Portfolio loaded successfully! ✨');

// Handle scroll indicator visibility
const scrollIndicator = document.querySelector('.scroll-indicator-container');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });
}

// Image Carousel Functions
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) {
        console.log('Carousel container not found');
        return;
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!slides.length || !prevBtn || !nextBtn) {
        console.log('Carousel elements missing:', { slides: slides.length, prevBtn: !!prevBtn, nextBtn: !!nextBtn });
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance carousel every 5 seconds
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!document.querySelector('.modal.active')) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    console.log('Carousel initialized successfully');
}

// Modal Functions - Exposed to window for onclick handlers
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) firstElement.focus();

        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                window.closeModal(modalId);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeModal(modalId);
            }
        });
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    initCarousel();

    // Add hover effect to personal project cards
    document.querySelectorAll('.personal-project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate stat counters on scroll
    const statValues = document.querySelectorAll('.stat-value');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Store original value as data attribute if not already stored
                if (!target.dataset.originalValue) {
                    target.dataset.originalValue = target.textContent.trim();
                }

                const text = target.dataset.originalValue;

                // Extract the number (including decimals)
                const numberMatch = text.match(/[\d,.]+/);

                if (numberMatch) {
                    const numStr = numberMatch[0].replace(/,/g, '');
                    const endValue = parseFloat(numStr);

                    if (!isNaN(endValue) && endValue > 0) {
                        try {
                            animateNumber(target, 0, endValue, 2000);
                        } catch (error) {
                            // If animation fails, restore original value
                            target.textContent = target.dataset.originalValue;
                        }
                        statObserver.unobserve(target);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statObserver.observe(stat));

    // Add ripple effect to buttons
    document.querySelectorAll('.read-more-btn, .nav-arrow').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Number animation function for stat counters
function animateNumber(element, start, end, duration) {
    // Get the original value from data attribute or current text
    const originalText = element.dataset.originalValue || element.textContent.trim();
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    // Extract prefix, number, and suffix more carefully
    const match = originalText.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) return; // Exit if no number found

    const prefix = match[1];
    const numberPart = match[2];
    const suffix = match[3];

    // Check if it's a decimal number
    const hasDecimal = numberPart.includes('.');
    const decimalPlaces = hasDecimal ? numberPart.split('.')[1].length : 0;

    const timer = setInterval(() => {
        current += increment;

        if (current >= end) {
            // On completion, restore the exact original format
            current = end;
            clearInterval(timer);
            element.textContent = originalText;
            return;
        }

        let displayValue;
        if (hasDecimal) {
            displayValue = current.toFixed(decimalPlaces);
        } else {
            displayValue = Math.floor(current).toString();
        }

        element.textContent = prefix + displayValue + suffix;
    }, 16);
}

// Add ripple animation keyframes dynamically
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Project card popout functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }

            this.classList.toggle('expanded');

            // Optional: Close other expanded cards
            // projectCards.forEach(otherCard => {
            //     if (otherCard !== this) {
            //         otherCard.classList.remove('expanded');
            //     }
            // });
        });

        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
