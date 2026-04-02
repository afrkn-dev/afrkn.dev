document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // To allow staggered animations using custom properties
                if (entry.target.style.getPropertyValue('--delay')) {
                    entry.target.style.transitionDelay = entry.target.style.getPropertyValue('--delay');
                }
                
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Form Submissions Smoothness (already handled via inline but this prevents empty submit styling issues)
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.style.cursor = 'not-allowed';
            
            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully!';
                btn.style.background = '#10b981'; // Green
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    form.reset();
                }, 3000);
            }, 1000);
        });
    }


});
