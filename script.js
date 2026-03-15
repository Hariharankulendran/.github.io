document.addEventListener('DOMContentLoaded', () => {
    // ---- Language Toggle Logic ----
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'de'; // Default language

    // Function to update the content based on language
    const updateLanguage = (lang) => {
        // Elements with data-de and data-en attributes (for text content)
        const translatableElements = document.querySelectorAll('[data-de][data-en]');
        
        translatableElements.forEach(el => {
            if (lang === 'en') {
                // If it is an input/textarea and not having inner text, don't overwrite inner text
                if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                    // check if element has child elements, if it does, replacing innerText might destroy them. 
                    // However, our design only uses it on elements with flat text.
                    el.innerText = el.getAttribute('data-en');
                }
            } else {
                if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                    el.innerText = el.getAttribute('data-de');
                }
            }
        });

        // Handle placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-de][data-placeholder-en]');
        placeholderElements.forEach(el => {
            if (lang === 'en') {
                el.placeholder = el.getAttribute('data-placeholder-en');
            } else {
                el.placeholder = el.getAttribute('data-placeholder-de');
            }
        });

        // Update Toggle Button Text
        if (lang === 'en') {
            langToggle.innerText = 'EN | DE';
        } else {
            langToggle.innerText = 'DE | EN';
        }

        // Update Document Language Attribute
        document.documentElement.lang = lang;
    };

    // Toggle button event listener
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'de' ? 'en' : 'de';
        updateLanguage(currentLang);
    });

    // Initialize with default state
    updateLanguage(currentLang);

    // ---- Mobile Menu Toggle ----
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // ---- Smooth Scrolling for Internal Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Scroll Animations (Intersection Observer) ----
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Trigger immediately for elements already in view (hero)
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // ---- Contact Form Handler ----
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = currentLang === 'de' ? 'Vielen Dank für Ihre Nachricht!' : 'Thank you for your message!';
            alert(successMsg);
            form.reset();
        });
    }
});
