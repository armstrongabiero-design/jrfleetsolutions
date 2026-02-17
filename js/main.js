/**
 * MAIN JAVASCRIPT
 * JR Fleet Solutions - Core functionality and interactions
 */

(function() {
    'use strict';

    // ==========================================
    // HEADER SCROLL BEHAVIOR
    // ==========================================
    
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        if (mobileMenuToggle.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translateY(7px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ==========================================
    // FORM SUBMISSION HANDLER
    // ==========================================
    
    const demoForm = document.getElementById('demoForm');

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(demoForm);
        
        // Convert FormData to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validate required fields
        if (!data.name || !data.email || !data.company) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const button = demoForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Submitting...';
        button.disabled = true;
        
        // Replace with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQXiNUMbyE_DNmlPSzmM-B3U4sy0gnGZX5zizOYT1idYLRp22IkQauC4Lku7GjTycqng/exec';
        
        // Send data to Google Apps Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Success
                button.textContent = 'Request Sent!';
                button.style.backgroundColor = 'var(--color-gold-light)';
                
                // Reset form
                demoForm.reset();
                
                // Show success message
                showNotification('Thank you! We will contact you shortly to schedule your demo.', 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Show error message
            showNotification('There was an error submitting your request. Please try again.', 'error');
            
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
        });
    }

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? 'var(--color-gold)' : 'var(--color-black)',
            color: type === 'success' ? 'var(--color-black)' : 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '9999',
            fontWeight: '500',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease-out',
            border: `2px solid ${type === 'success' ? 'var(--color-gold-dark)' : 'var(--color-gold)'}`
        });
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.getElementById('scrollProgress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scrollProgress';
            Object.assign(progressBar.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                height: '3px',
                backgroundColor: 'var(--color-gold)',
                zIndex: '9999',
                transition: 'width 0.1s ease-out',
                boxShadow: '0 0 10px var(--color-gold)'
            });
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${scrollPercent}%`;
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and sections
        const elementsToAnimate = document.querySelectorAll(
            '.problem-card, .capability-card, .why-card, .solution-content, .solution-visual'
        );
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }

    // ==========================================
    // PARALLAX EFFECT FOR HERO
    // ==========================================
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    // ==========================================
    // TYPING EFFECT FOR HERO HEADLINE (Optional Enhancement)
    // ==========================================
    
    function initTypingEffect() {
        const accentText = document.querySelector('.headline-accent');
        if (!accentText) return;
        
        const originalText = accentText.textContent;
        accentText.textContent = '';
        accentText.style.opacity = '1';
        
        let charIndex = 0;
        const typingSpeed = 100;
        
        function typeChar() {
            if (charIndex < originalText.length) {
                accentText.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeChar, 500);
    }

    // ==========================================
    // PERFORMANCE OPTIMIZATION: DEBOUNCE
    // ==========================================
    
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

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    
    // Scroll events
    const debouncedScrollHandler = debounce(() => {
        handleHeaderScroll();
        updateScrollProgress();
        handleParallax();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMobileMenu();
                smoothScroll(href);
            }
        });
    });

    // Form submission
    if (demoForm) {
        demoForm.addEventListener('submit', handleFormSubmit);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });

    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    function init() {
        // Initialize scroll animations
        initScrollAnimations();
        
        // Add initial header state
        handleHeaderScroll();
        
        // Initialize scroll progress
        updateScrollProgress();
        
        // Optional: Enable typing effect
        // initTypingEffect();
        
        console.log('JR Fleet Solutions - Landing Page Initialized');
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==========================================
    // EXPOSE PUBLIC API (if needed)
    // ==========================================
    
    window.JRFleet = {
        showNotification,
        smoothScroll
    };

})();
