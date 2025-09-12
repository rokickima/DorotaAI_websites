// Storytel Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Add smooth scrolling
    enableSmoothScrolling();
    
    // Setup UTM tracking for CTA button
    setupUTMTracking();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Add loading animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Initialize horizontal scroll for books
    initializeBookScroll();
    
    
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // CTA Button - UTM tracking is handled separately in setupUTMTracking()
    // No need to add another event listener here
    
    // Book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        
        card.addEventListener('mouseenter', handleBookHover);
        card.addEventListener('mouseleave', handleBookLeave);
    });
    
    // View all books link
    const viewAllLink = document.querySelector('.popular-books__view-all');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', handleViewAllClick);
    }
    
    // Feature items hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', handleFeatureHover);
        item.addEventListener('mouseleave', handleFeatureLeave);
    });
    
    // Promo badge click - now handled in setupUTMTracking() for consistent behavior
}

/**
 * Handle CTA button click
 */
function handleCTAClick(event) {
    event.preventDefault();
    
    const button = event.target;
    
    // Add click animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Show success message
    showNotification('🎉 Świetny wybór! Przekierowywanie do rejestracji...', 'success');
    
    // Simulate redirect delay
    setTimeout(() => {
        console.log('Redirecting to signup page...');
        // In real app: window.location.href = '/signup';
    }, 2000);
}

 

/**
 * Handle book card hover
 */
function handleBookHover(event) {
    const bookCard = event.currentTarget;
    const cover = bookCard.querySelector('.book-card__cover');
    
    if (cover) {
        cover.style.transform = 'scale(1.05) rotate(1deg)';
        cover.style.transition = 'transform 0.3s ease';
    }
}

/**
 * Handle book card leave
 */
function handleBookLeave(event) {
    const bookCard = event.currentTarget;
    const cover = bookCard.querySelector('.book-card__cover');
    
    if (cover) {
        cover.style.transform = 'scale(1) rotate(0deg)';
    }
}



/**
 * Handle feature item hover
 */
function handleFeatureHover(event) {
    const featureItem = event.currentTarget;
    const number = featureItem.querySelector('.feature-item__number');
    
    if (number) {
        number.style.transform = 'scale(1.1) rotate(5deg)';
        number.style.transition = 'transform 0.3s ease';
    }
}

/**
 * Handle feature item leave
 */
function handleFeatureLeave(event) {
    const featureItem = event.currentTarget;
    const number = featureItem.querySelector('.feature-item__number');
    
    if (number) {
        number.style.transform = 'scale(1) rotate(0deg)';
    }
}

/**
 * Handle promo badge click
 */
function handlePromoBadgeClick(event) {
    const badge = event.target.closest('.hero__promo-badge');
    
    // Add pulse animation
    badge.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        badge.style.animation = '';
    }, 600);
    
    showNotification('🎧 Promocja 50% taniej dostępna tylko dziś!', 'success');
}

/**
 * Initialize book scroll functionality
 */
function initializeBookScroll() {
    const booksScroll = document.querySelector('.books-scroll');
    if (!booksScroll) return;
    
    let isScrolling = false;
    
    // Add scroll indicators if needed
    booksScroll.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                // Handle scroll position changes
                isScrolling = false;
            });
        }
    });
    
    // Enable smooth scrolling with mouse wheel
    booksScroll.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY * 2;
        }
    });
}

/**
 * Initialize scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Enable smooth scrolling
 */
function enableSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style notification
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: colors[type] || colors.info,
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        maxWidth: '400px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Handle scroll effects
 */
let ticking = false;

function updateOnScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero__background');
    if (heroBackground) {
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
    }
    
    // Update header on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrolled > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

/**
 * Handle window resize
 */
let resizeTimeout;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments
        console.log('Window resized');
    }, 250);
});

/**
 * Performance optimization - preload critical resources
 */
function preloadResources() {
    // Preload fonts if needed
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    
    // Add other preload resources as needed
}

// Initialize preloading
preloadResources();

// UTM Parameter Tracking for CTA Button
function setupUTMTracking() {

    // Function to append UTM params to a given URL
    function appendUTMParams(url) {

        const urlObj = new URL(url)
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of params.entries()) {
            if (key.startsWith("utm_")) {
                urlObj.searchParams.set(key, value);
            }

            if (key === 'fbclid') {
                urlObj.searchParams.set('client_reference_id', value);
            }
        }

        return urlObj.toString();
    }

    // Function to append UTM params to a given URL
    function handleCTAClick(e) {
        e.preventDefault();
        const targetUrl = 'https://buy.stripe.com/aFa6oAfiKfC36TTbFy7ss08?locale=pl';
        window.location.href = appendUTMParams(targetUrl); 
    }

    // Add click handler to redirect with UTM params
    const button = document.getElementById("cta-button");
    if (button) {
        button.addEventListener('click', handleCTAClick);
    }

    // Also make promo badge clickable with same functionality
    const promoBadge = document.getElementById('promo-badge');
    if (promoBadge) {
        promoBadge.addEventListener('click', handleCTAClick);
    }
    
    // Add the same functionality for the second CTA button
    const button2 = document.getElementById("cta-button_2");
    if (button2) { 
        button2.addEventListener('click', handleCTAClick);
    }
    
    // Add the same functionality for the third CTA button
    const button3 = document.getElementById("cta-button_3");
    if (button3) {
        button3.addEventListener('click', handleCTAClick);
    }
    
    // Add the same functionality for the fourth CTA button
    const button4 = document.getElementById("cta-button_4");
    if (button4) {
        button4.addEventListener('click', handleCTAClick);
    }
}