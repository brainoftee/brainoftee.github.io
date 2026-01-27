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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
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

// Toggle writing sample expansion
function toggleWriting(sampleId) {
    const fullText = document.getElementById(sampleId);
    const button = event.target;
    const originalText = button.getAttribute('data-original') || 'Read More';

    if (fullText.style.display === 'none' || fullText.style.display === '') {
        fullText.style.display = 'block';
        button.textContent = 'Show Less';
        button.classList.add('expanded');

        // Smooth scroll to show full content
        setTimeout(() => {
            fullText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        fullText.style.display = 'none';
        button.textContent = originalText;
        button.classList.remove('expanded');
    }
}

// Add hover effect to personal project cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.personal-project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
