document.addEventListener('DOMContentLoaded', () => {
    // ---- Language Toggle Logic ----
    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = 'de'; // Default language

    const updateLanguage = (lang) => {
        // Find all elements with both data-de and data-en attributes
        const translatableElements = document.querySelectorAll('[data-de][data-en]');
        
        translatableElements.forEach(el => {
            // We set the inner text to the corresponding attribute
            if (lang === 'en') {
                el.innerText = el.getAttribute('data-en');
            } else {
                el.innerText = el.getAttribute('data-de');
            }
        });

        // Update Toggle Button Text
        if (lang === 'en') {
            langToggleBtn.innerText = 'DE | EN';
        } else {
            langToggleBtn.innerText = 'EN | DE';
        }

        // Specifically handle the CV Download Link which needs to link to the correct file potentially
        // For now, we only have the DE PDF copied. So the link remains the same, but the text changes.
        // If an EN PDF is added later, we could switch the href here.
        
        document.documentElement.lang = lang;
    };

    if(langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'de' ? 'en' : 'de';
            updateLanguage(currentLang);
        });
    }

    // Initialize with default state
    updateLanguage(currentLang);

    // ---- Mobile Menu Toggle ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ---- Smooth Scrolling for Internal Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
