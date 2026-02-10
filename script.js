// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.capability-card, .use-case-card, .industry-tile, .why-item, .step, .security-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Form handling
// - Run locally: from project folder run "npx serve ." then open http://localhost:3000 (or use Live Server in VS Code).
// - Formspree: get your form ID from https://formspree.io and set FORM_ENDPOINT below.
const FORM_ENDPOINT = 'https://formspree.io/f/yourFormId';
// Set to true to simulate success when testing locally or on server without a real endpoint. Set false for production.
const FORM_DEMO_MODE = true;

function showFormSuccess(submitButton, originalText, form) {
    submitButton.textContent = 'Request Sent!';
    submitButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    form.reset();
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.disabled = false;
    }, 3000);
}

const demoForm = document.getElementById('demoForm');
if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        const submitButton = demoForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const isPlaceholder = FORM_ENDPOINT.includes('yourFormId');

        // Demo mode: simulate success for local/server testing without configuring Formspree
        if (FORM_DEMO_MODE && isPlaceholder) {
            console.log('Demo form submitted (no backend):', formData);
            setTimeout(() => showFormSuccess(submitButton, originalText, demoForm), 800);
            return;
        }

        fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            showFormSuccess(submitButton, originalText, demoForm);
        })
        .catch(error => {
            console.error('Form submit failed:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            if (isPlaceholder) {
                alert(
                    'Form is not configured yet. To receive demo requests:\n\n' +
                    '1. Go to https://formspree.io and create a free account.\n' +
                    '2. Create a new form and copy its form ID.\n' +
                    '3. In script.js, replace "yourFormId" in FORM_ENDPOINT with your form ID (e.g. https://formspree.io/f/abcdexyz).\n\n' +
                    'For UI-only testing, keep FORM_DEMO_MODE = true.'
                );
            } else {
                alert('There was an issue sending your request. Please try again in a moment.');
            }
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Cursor-follow hero interactions removed per request

// "What is VoxSetu" cursor interactions removed per request

// Image tilt/parallax interactions removed per request

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Waveform animation enhancement
const waveformAnimation = document.querySelector('.waveform-animation');
if (waveformAnimation) {
    // Create multiple waveform layers for depth
    for (let i = 0; i < 3; i++) {
        const layer = waveformAnimation.cloneNode(true);
        layer.style.animationDelay = `${i * 0.5}s`;
        layer.style.opacity = `${0.3 - i * 0.1}`;
        waveformAnimation.parentElement.appendChild(layer);
    }
}

// Add hover effects to cards
document.querySelectorAll('.capability-card, .use-case-card, .industry-tile').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile menu toggle (if needed for responsive design)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-content');
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 24px;
            cursor: pointer;
        `;
        
        nav.insertBefore(toggle, nav.firstChild);
        
        toggle.addEventListener('click', () => {
            const links = document.querySelector('.nav-links');
            links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
        });
    }
};

// Check on resize
window.addEventListener('resize', createMobileMenu);
createMobileMenu();
