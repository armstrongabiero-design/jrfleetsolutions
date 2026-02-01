/**
 * ANIMATIONS JAVASCRIPT
 * JR Fleet Solutions - Advanced animations and visual effects
 */

(function() {
    'use strict';

    // ==========================================
    // CURSOR TRAIL EFFECT (Premium Enhancement)
    // ==========================================
    
    class CursorTrail {
        constructor() {
            this.particles = [];
            this.maxParticles = 20;
            this.isEnabled = window.innerWidth > 768; // Only on desktop
            
            if (this.isEnabled) {
                this.init();
            }
        }

        init() {
            document.addEventListener('mousemove', (e) => {
                this.addParticle(e.clientX, e.clientY);
            });

            this.animate();
        }

        addParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            
            Object.assign(particle.style, {
                position: 'fixed',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold)',
                pointerEvents: 'none',
                zIndex: '9998',
                left: `${x}px`,
                top: `${y}px`,
                opacity: '0.6',
                transition: 'all 0.5s ease-out'
            });

            document.body.appendChild(particle);
            this.particles.push({ element: particle, createdAt: Date.now() });

            // Remove old particles
            if (this.particles.length > this.maxParticles) {
                const oldest = this.particles.shift();
                if (oldest.element.parentNode) {
                    oldest.element.parentNode.removeChild(oldest.element);
                }
            }

            // Fade out and remove
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    this.particles = this.particles.filter(p => p.element !== particle);
                }, 500);
            }, 100);
        }

        animate() {
            requestAnimationFrame(() => this.animate());
        }
    }

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    
    class StatsCounter {
        constructor() {
            this.counters = [];
            this.init();
        }

        init() {
            const statValues = document.querySelectorAll('.stat-value');
            
            statValues.forEach(stat => {
                const text = stat.textContent;
                const hasPercent = text.includes('%');
                const hasPlus = text.includes('+');
                const hasSlash = text.includes('/');
                
                let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
                
                if (!isNaN(targetValue)) {
                    this.counters.push({
                        element: stat,
                        target: targetValue,
                        current: 0,
                        hasPercent,
                        hasPlus,
                        hasSlash,
                        originalText: text,
                        animated: false
                    });
                }
            });

            this.observeStats();
        }

        observeStats() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = this.counters.find(c => c.element === entry.target);
                        if (counter && !counter.animated) {
                            this.animateCounter(counter);
                            counter.animated = true;
                        }
                    }
                });
            }, { threshold: 0.5 });

            this.counters.forEach(counter => {
                observer.observe(counter.element);
            });
        }

        animateCounter(counter) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = counter.target / steps;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                counter.current += increment;

                if (currentStep >= steps) {
                    counter.current = counter.target;
                    clearInterval(timer);
                }

                this.updateDisplay(counter);
            }, stepDuration);
        }

        updateDisplay(counter) {
            let displayValue = Math.floor(counter.current);
            
            if (counter.hasSlash) {
                counter.element.textContent = counter.originalText;
            } else if (counter.hasPercent) {
                counter.element.textContent = displayValue.toFixed(1) + '%';
            } else if (counter.hasPlus) {
                if (displayValue >= 1000) {
                    counter.element.textContent = (displayValue / 1000).toFixed(0) + 'K+';
                } else {
                    counter.element.textContent = displayValue + '+';
                }
            } else {
                counter.element.textContent = displayValue;
            }
        }
    }

    // ==========================================
    // CARD TILT EFFECT
    // ==========================================
    
    class CardTilt {
        constructor() {
            this.cards = document.querySelectorAll('.problem-card, .capability-card, .why-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
                card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            });
        }

        handleMouseMove(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }

        handleMouseLeave(card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    
    class ScrollReveal {
        constructor() {
            this.init();
        }

        init() {
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Elements to reveal
            const elements = document.querySelectorAll(
                '.section-header, .benefit-item, .visual-card, .cta-box'
            );

            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(element);
            });
        }
    }

    // ==========================================
    // BACKGROUND GRADIENT ANIMATION
    // ==========================================
    
    class GradientAnimation {
        constructor() {
            this.hero = document.querySelector('.hero-section');
            this.ctaSection = document.querySelector('.final-cta-section');
            this.mouseX = 0;
            this.mouseY = 0;
            this.init();
        }

        init() {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX / window.innerWidth;
                this.mouseY = e.clientY / window.innerHeight;
                this.updateGradient();
            });
        }

        updateGradient() {
            if (this.hero) {
                const x = 20 + (this.mouseX * 30);
                const y = 50 + (this.mouseY * 30);
                
                const background = this.hero.querySelector('.hero-background');
                if (background) {
                    background.style.backgroundImage = `
                        radial-gradient(circle at ${x}% ${y}%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at ${80 - x/2}% ${80 - y/2}%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
                    `;
                }
            }
        }
    }

    // ==========================================
    // FORM INPUT ANIMATIONS
    // ==========================================
    
    class FormAnimations {
        constructor() {
            this.inputs = document.querySelectorAll('.form-input');
            this.init();
        }

        init() {
            this.inputs.forEach(input => {
                // Focus animation
                input.addEventListener('focus', () => {
                    input.style.transform = 'scale(1.02)';
                    input.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.1)';
                });

                // Blur animation
                input.addEventListener('blur', () => {
                    input.style.transform = 'scale(1)';
                    input.style.boxShadow = 'none';
                });

                // Add smooth transition
                input.style.transition = 'all 0.3s ease';
            });
        }
    }

    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    
    class ButtonRipple {
        constructor() {
            this.buttons = document.querySelectorAll('.btn');
            this.init();
        }

        init() {
            this.buttons.forEach(button => {
                button.addEventListener('click', (e) => this.createRipple(e, button));
            });
        }

        createRipple(e, button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            Object.assign(ripple.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                left: `${x}px`,
                top: `${y}px`,
                pointerEvents: 'none',
                transform: 'scale(0)',
                animation: 'ripple 0.6s ease-out'
            });

            // Ensure button has position relative
            button.style.position = 'relative';
            button.style.overflow = 'hidden';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    }

    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // NAVIGATION INDICATOR
    // ==========================================
    
    class NavigationIndicator {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.updateActiveLink(id);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px -66% 0px'
            });

            this.sections.forEach(section => {
                observer.observe(section);
            });
        }

        updateActiveLink(sectionId) {
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.style.color = 'var(--color-gold)';
                } else if (!link.classList.contains('nav-cta')) {
                    link.style.color = 'var(--color-gray-200)';
                }
            });
        }
    }

    // ==========================================
    // LAZY LOAD OPTIMIZATION
    // ==========================================
    
    class LazyLoad {
        constructor() {
            this.images = document.querySelectorAll('img[data-src]');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });

            this.images.forEach(img => observer.observe(img));
        }
    }

    // ==========================================
    // PERFORMANCE MONITOR (Development Only)
    // ==========================================
    
    class PerformanceMonitor {
        constructor() {
            this.enabled = false; // Set to true for debugging
            if (this.enabled) {
                this.init();
            }
        }

        init() {
            if (window.performance && window.performance.timing) {
                window.addEventListener('load', () => {
                    const timing = window.performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    console.log(`Page load time: ${loadTime}ms`);
                });
            }
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    function initAnimations() {
        // Initialize all animation modules
        // new CursorTrail(); // Optional - can be enabled for extra premium feel
        new StatsCounter();
        new CardTilt();
        new ScrollReveal();
        new GradientAnimation();
        new FormAnimations();
        new ButtonRipple();
        new NavigationIndicator();
        new LazyLoad();
        new PerformanceMonitor();

        console.log('JR Fleet Solutions - Animations Initialized');
    }

    // Wait for DOM and main.js to be loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

})();
