// ===========================
// NAVIGATION FUNCTIONALITY
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 65;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .partner-logo, .airline-logo');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(13, 17, 23, 0.2)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// ACTIVE SECTION HIGHLIGHTING
// ===========================

const sections = document.querySelectorAll('section[id]');

// Disabled - single page only
/*
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--white)';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--gold)';
                }
            });
        }
    });
});
*/

// ===========================
// LOADING ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// DESTINATIONS CAROUSEL
// ===========================

const destinations = [
    {
        id: 'barcelona',
        title: 'BARCELONA, SPAIN',
        description: 'A place where history, culture, and sunshine come together',
        image: 'images/destinations/barcelona.jpg'
    },
    {
        id: 'cabo',
        title: 'CABO SAN LUCAS, MEXICO',
        description: 'Sun, sea, and luxury where desert landscapes meet the sparkling Pacific',
        image: 'images/destinations/cabosanlucas.jpg'
    }
];

let currentDestinationIndex = 0;

// Carousel navigation
const prevBtn = document.getElementById('prevDestination');
const nextBtn = document.getElementById('nextDestination');
const slides = document.querySelectorAll('.destination-slide');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        changeDestination(-1);
    });

    nextBtn.addEventListener('click', () => {
        changeDestination(1);
    });
}

function changeDestination(direction) {
    slides[currentDestinationIndex].classList.remove('active');
    currentDestinationIndex = (currentDestinationIndex + direction + slides.length) % slides.length;
    slides[currentDestinationIndex].classList.add('active');
}

// ===========================
// DESTINATION MODAL
// ===========================

const modal = document.getElementById('destinationModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const viewMoreBtns = document.querySelectorAll('.view-more-btn');

let currentModalIndex = 0;

// Open modal
viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const destinationId = btn.getAttribute('data-destination');
        currentModalIndex = destinations.findIndex(d => d.id === destinationId);
        updateModal();
        modal.classList.remove('closing');
        modal.classList.add('active');
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

function closeModal() {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
    }, 300);
}

// Modal navigation
if (modalPrev) {
    modalPrev.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex - 1 + destinations.length) % destinations.length;
        updateModal();
    });
}

if (modalNext) {
    modalNext.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex + 1) % destinations.length;
        updateModal();
    });
}

function updateModal() {
    const destination = destinations[currentModalIndex];
    document.getElementById('modalTitle').textContent = destination.title;
    document.getElementById('modalImage').src = destination.image;
    document.getElementById('modalDescription').textContent = destination.description;
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success modal
        successModal.style.display = 'block';
        
        // Reset form
        contactForm.reset();
    });
}

function closeModal() {
    if (successModal) {
        successModal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === successModal) {
        closeModal();
    }
});

// ===========================
// ADVANCED DRAG SCROLL WITH MOMENTUM
// ===========================

class AdvancedDragScroll {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.momentum = null;
        this.lastX = 0;
        this.lastTime = 0;
        
        this.init();
    }
    
    init() {
        // Mouse events
        this.element.addEventListener('mousedown', (e) => this.onPointerDown(e));
        this.element.addEventListener('mousemove', (e) => this.onPointerMove(e));
        this.element.addEventListener('mouseup', () => this.onPointerUp());
        this.element.addEventListener('mouseleave', () => this.onPointerUp());
        
        // Touch events
        this.element.addEventListener('touchstart', (e) => this.onPointerDown(e), { passive: true });
        this.element.addEventListener('touchmove', (e) => this.onPointerMove(e), { passive: true });
        this.element.addEventListener('touchend', () => this.onPointerUp());
        
        // Mouse wheel
        this.element.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.element.scrollLeft += e.deltaY;
            this.updateProgressIndicator();
        }, { passive: false });
        
        // Update progress on scroll
        this.element.addEventListener('scroll', () => this.updateProgressIndicator());
        
        // Create progress indicator
        this.createProgressIndicator();
    }
    
    getPageX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    }
    
    onPointerDown(e) {
        this.isDragging = true;
        this.element.classList.add('grabbing');
        
        const pageX = this.getPageX(e);
        this.startX = pageX - this.element.offsetLeft;
        this.scrollLeft = this.element.scrollLeft;
        this.lastX = pageX;
        this.lastTime = Date.now();
        this.velocity = 0;
        
        // Cancel any ongoing momentum
        if (this.momentum) {
            cancelAnimationFrame(this.momentum);
        }
    }
    
    onPointerMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        const pageX = this.getPageX(e);
        const currentTime = Date.now();
        const x = pageX - this.element.offsetLeft;
        const distance = (x - this.startX) * 2.5; // Acceleration multiplier
        
        this.element.scrollLeft = this.scrollLeft - distance;
        
        // Calculate velocity for momentum
        const timeDelta = currentTime - this.lastTime;
        if (timeDelta > 0) {
            this.velocity = (pageX - this.lastX) / timeDelta * 50;
        }
        
        this.lastX = pageX;
        this.lastTime = currentTime;
    }
    
    onPointerUp() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.element.classList.remove('grabbing');
        
        // Apply momentum
        this.applyMomentum();
    }
    
    applyMomentum() {
        if (Math.abs(this.velocity) > 0.5) {
            this.element.scrollLeft -= this.velocity;
            this.velocity *= 0.92; // Friction coefficient
            
            this.momentum = requestAnimationFrame(() => this.applyMomentum());
        }
    }
    
    createProgressIndicator() {
        const cards = this.element.querySelectorAll('.testimonial-card');
        if (cards.length <= 1) return;
        
        const wrapper = this.element.parentElement;
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot';
            if (index === 0) dot.classList.add('active');
            progressContainer.appendChild(dot);
        });
        
        wrapper.appendChild(progressContainer);
    }
    
    updateProgressIndicator() {
        const dots = this.element.parentElement.querySelectorAll('.scroll-dot');
        const cards = this.element.querySelectorAll('.testimonial-card');
        
        if (dots.length === 0 || cards.length === 0) return;
        
        const scrollLeft = this.element.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.element).gap) || 32;
        const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

// Initialize advanced drag scroll
const testimonialsContainer = document.querySelector('.testimonials-scroll-container');
if (testimonialsContainer) {
    new AdvancedDragScroll(testimonialsContainer);
}

// ===========================
// NAVBAR OPACITY ON SCROLL
// ===========================

const navbar = document.querySelector('.navbar');
const lightSections = document.querySelectorAll('.testimonials-section, .airline-partners-section, .partners-section, .tailored-section, .office-location-section');

function updateNavbarOpacity() {
    let isOverLightSection = false;
    
    lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            isOverLightSection = true;
        }
    });
    
    if (isOverLightSection) {
        navbar.classList.add('navbar-solid');
    } else {
        navbar.classList.remove('navbar-solid');
    }
}

window.addEventListener('scroll', updateNavbarOpacity);
window.addEventListener('load', updateNavbarOpacity);

console.log('🌍 WGY Travel - Landing Page Loaded');
