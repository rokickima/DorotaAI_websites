// CTA Button JavaScript - Standalone functionality for cta-button_2
// This file handles the click functionality for CTA buttons with UTM tracking

document.addEventListener('DOMContentLoaded', function() {
    // Initialize CTA button functionality
    initializeCTAButtons();
});

/**
 * Initialize all CTA button functionality
 */
function initializeCTAButtons() {
    // Setup UTM tracking for CTA buttons
    setupUTMTracking();
    
    // Setup visual feedback for button clicks
    setupButtonAnimations();
}

/**
 * Setup UTM Parameter Tracking for CTA Buttons
 */
function setupUTMTracking() {
    // Function to append UTM params to a given URL
    function appendUTMParams(url) {
        const urlObj = new URL(url);
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

    // Function to handle CTA button click with UTM tracking
    function handleCTAClick(e) {
        e.preventDefault();
        
        // Add click animation
        const button = e.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Redirect to Stripe checkout with UTM parameters immediately
        const targetUrl = 'https://buy.stripe.com/9B628k9Yq1Lddih4d67ss00?prefilled_promo_code=BACKTOSCHOOL50&locale=pl';
        const urlWithUTM = appendUTMParams(targetUrl);
        
        // Immediate redirect
        window.location.href = urlWithUTM;
    }

    // Add click handler to cta-button_2 ONLY
    const button2 = document.getElementById("cta-button_2");
    if (button2) { 
        button2.addEventListener('click', handleCTAClick);
        console.log('CTA Button 2 event listener added successfully');
    } else {
        console.warn('CTA Button 2 element not found');
    }
}

/**
 * Setup button animations and visual feedback
 */
function setupButtonAnimations() {
    // Add hover effects to cta-button_2 ONLY
    const button2 = document.getElementById("cta-button_2");
    
    if (button2) {
        // Add hover effect
        button2.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease';
            this.style.transform = 'translateY(-2px)';
        });
        
        button2.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add focus effect for accessibility
        button2.addEventListener('focus', function() {
            this.style.outline = '2px solid #3B82F6';
            this.style.outlineOffset = '2px';
        });
        
        button2.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    }
}


/**
 * Utility function to check if element exists
 */
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

 
