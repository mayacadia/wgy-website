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
        image: 'destinations/barcelona.jpg'
    },
    {
        id: 'cabo',
        title: 'CABO SAN LUCAS, MEXICO',
        description: 'Sun, sea, and luxury where desert landscapes meet the sparkling Pacific',
        image: 'destinations/cabosanlucas.jpg'
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

console.log('🌍 WGY Travel - Landing Page Loaded');
