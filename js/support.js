/**
 * SUPPORT PAGE JAVASCRIPT
 * JR Fleet Solutions - Support form functionality and interactions
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

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    
    function showNotification(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // ==========================================
    // FORM SUBMISSION HANDLER
    // ==========================================
    
    const supportForm = document.getElementById('supportForm');

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(supportForm);
        
        // Convert FormData to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validate required fields
        if (!data.issue || !data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const button = supportForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Submitting...';
        button.disabled = true;
        
        // Replace with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQXiNUMbyE_DNmlPSzmM-B3U4sy0gnGZX5zizOYT1idYLRp22IkQauC4Lku7GjTycqng/exec';
        
        // Send data to Google Apps Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                formType: 'support' // Identify this as a support form submission
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Success
                button.textContent = 'Request Sent!';
                button.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
                
                // Reset form
                supportForm.reset();
                
                // Show success message
                showNotification('Thank you! Your support request has been submitted. We will get back to you soon.', 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Show error message
            showNotification('Sorry, there was an error submitting your request. Please try again or contact us directly.', 'error');
            
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
        });
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    
    // Scroll event
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Form submission
    if (supportForm) {
        supportForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // ==========================================
    // INITIALIZE
    // ==========================================
    
    // Check scroll position on load
    handleHeaderScroll();
    
})();
