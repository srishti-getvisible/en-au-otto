// Australia Cookie Consent Component
(function() {
    'use strict';
    
    // Check if consent has already been given
    function hasConsent() {
        return localStorage.getItem('australia-cookie-consent') === 'accepted';
    }
    
    // Save consent
    function saveConsent(accepted) {
        localStorage.setItem('australia-cookie-consent', accepted ? 'accepted' : 'declined');
        localStorage.setItem('australia-cookie-consent-date', new Date().toISOString());
    }
    
    // Create the cookie consent banner
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'australia-cookie-banner';
        banner.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }
                #australia-cookie-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #ffffff;
                    border-top: 1px solid #e1e3e6;
                    padding: 20px;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    z-index: 999999;
                    font-family: Roboto, "Open Sans", Arial, Helvetica;
                    font-size: 12px;
                    color: #000000;
                    box-sizing: border-box;
                }
                
                /* Add padding to body to prevent content from being hidden behind banner */
                body.cookie-banner-active {
                    padding-bottom: 100px;
                }
                
                .cookie-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 40px;
                    box-sizing: border-box;
                }
                
                .cookie-text {
                    flex: 1;
                    max-width: 70%;
                    margin-right: 2em;
                }
                
                .cookie-text p {
                    margin: 0 0 10px 0;
                    line-height: 1.75;
                    font-size: 12px;
                }
                
                .cookie-text a {
                    color: #4672ff;
                    text-decoration: none;
                    font-size: 12px;
                }
                
                .cookie-text a:hover {
                    text-decoration: underline;
                }
                
                .cookie-buttons {
                    display: flex;
                    gap: 12px;
                    flex-shrink: 0;
                }
                
                .cookie-btn {
                    padding: 8px 16px;
                    border: 1px solid;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: inline-block;
                    text-align: center;
                    min-width: 80px;
                    font-family: Roboto, "Open Sans", Arial, Helvetica;
                    box-sizing: border-box;
                }
                
                .cookie-btn-prefs {
                    background: #ffffff;
                    border-color: #000000;
                    color: #000000;
                }
                
                .cookie-btn-prefs:hover {
                    background: #f5f5f5;
                }
                
                .cookie-btn-decline {
                    background: #000000;
                    border-color: #000000;
                    color: #ffffff;
                }
                
                .cookie-btn-decline:hover {
                    background: #333333;
                }
                
                .cookie-btn-accept {
                    background: #000000;
                    border-color: #000000;
                    color: #ffffff;
                }
                
                .cookie-btn-accept:hover {
                    background: #333333;
                }
                

                
                @media (max-width: 768px) {
                    #australia-cookie-banner {
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: 15px;
                        max-height: none;
                    }
                    
                    .cookie-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        gap: 15px;
                        padding: 10px;
                    }
                    
                    .cookie-text {
                        max-width: 100%;
                        margin-right: 0;
                        text-align: center;
                    }
                    
                    .cookie-buttons {
                        width: 100%;
                        justify-content: center;
                        flex-wrap: nowrap;
                        gap: 8px;
                    }
                    
                    .cookie-text p {
                        font-size: 12px;
                        line-height: 1.5;
                        margin-bottom: 12px;
                    }
                    
                    .cookie-btn {
                        padding: 8px 12px;
                        font-size: 12px;
                        flex: 1;
                        max-width: 120px;
                    }
                    
                    body.cookie-banner-active {
                        padding-bottom: 180px;
                    }
                }
            </style>
            
            <div class="cookie-content">
                <div class="cookie-text">
                    <p>We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve your experience and analyse website traffic. By clicking "Accept", you agree to our use of cookies as described in our <a href="#" target="_blank">Cookie Policy</a>. You can change your cookie settings at any time by clicking "Preferences".</p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-prefs" onclick="showPreferences()">Preferences</button>
                    <button class="cookie-btn cookie-btn-decline" onclick="declineCookies()">Decline</button>
                    <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept</button>
                </div>
            </div>
        `;
        
        return banner;
    }
    
    // Create preferences modal
    function createPreferencesModal() {
        const modal = document.createElement('div');
        modal.id = 'australia-cookie-preferences';
        modal.innerHTML = `
            <style>
                #australia-cookie-preferences {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .preferences-content {
                    background: white;
                    border-radius: 8px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                
                .preferences-header {
                    margin-bottom: 20px;
                }
                
                .preferences-header h2 {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 24px;
                }
                
                .preferences-header p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                }
                
                .cookie-category {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #e1e3e6;
                    border-radius: 6px;
                }
                
                .cookie-category-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                
                .cookie-category-title {
                    font-weight: 600;
                    color: #333;
                }
                
                .cookie-category-description {
                    color: #666;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                
                .cookie-toggle {
                    position: relative;
                    width: 50px;
                    height: 24px;
                    background: #ccc;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                
                .cookie-toggle.active {
                    background: #4672ff;
                }
                
                .cookie-toggle::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.3s;
                }
                
                .cookie-toggle.active::after {
                    transform: translateX(26px);
                }
                
                .preferences-buttons {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #e1e3e6;
                }
            </style>
            
            <div class="preferences-content">
                <div class="preferences-header">
                    <h2>Cookie Preferences</h2>
                    <p>Manage your cookie preferences to personalise your experience on our website.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <div class="cookie-category-title">Essential Cookies</div>
                            <div class="cookie-category-description">These cookies are necessary for the basic functionality of the website and cannot be disabled.</div>
                        </div>
                        <div class="cookie-toggle active" data-category="essential"></div>
                    </div>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <div class="cookie-category-title">Performance Cookies</div>
                            <div class="cookie-category-description">These cookies allow us to analyze website usage to measure and improve performance.</div>
                        </div>
                        <div class="cookie-toggle" data-category="performance"></div>
                    </div>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <div class="cookie-category-title">Functionality Cookies</div>
                            <div class="cookie-category-description">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</div>
                        </div>
                        <div class="cookie-toggle" data-category="analytics"></div>
                    </div>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div>
                            <div class="cookie-category-title">Advertising Cookies</div>
                            <div class="cookie-category-description">Used to deliver advertisements more relevant to you and your interests.</div>
                        </div>
                        <div class="cookie-toggle" data-category="advertising"></div>
                    </div>
                </div>
                
                <div class="preferences-buttons">
                    <button class="cookie-btn cookie-btn-decline" onclick="closePreferences()">Cancel</button>
                    <button class="cookie-btn cookie-btn-accept" onclick="savePreferences()">Save Preferences</button>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    // Global functions for button clicks
    window.acceptCookies = function() {
        saveConsent(true);
        hideBanner();
        // Trigger any analytics or tracking scripts here
        console.log('Cookies accepted');
    };
    
    window.declineCookies = function() {
        saveConsent(false);
        hideBanner();
        console.log('Cookies declined');
    };
    
    window.showPreferences = function() {
        const modal = createPreferencesModal();
        document.body.appendChild(modal);
        
        // Add click handlers for toggles
        const toggles = modal.querySelectorAll('.cookie-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const category = this.dataset.category;
                if (category !== 'essential') {
                    this.classList.toggle('active');
                }
            });
        });
    };
    
    window.closePreferences = function() {
        const modal = document.getElementById('spanish-cookie-preferences');
        if (modal) {
            modal.remove();
        }
    };
    
    window.savePreferences = function() {
        const modal = document.getElementById('spanish-cookie-preferences');
        const toggles = modal.querySelectorAll('.cookie-toggle');
        const preferences = {};
        
        toggles.forEach(toggle => {
            const category = toggle.dataset.category;
            preferences[category] = toggle.classList.contains('active');
        });
        
        localStorage.setItem('spanish-cookie-preferences', JSON.stringify(preferences));
        localStorage.setItem('spanish-cookie-consent', 'custom');
        localStorage.setItem('spanish-cookie-consent-date', new Date().toISOString());
        
        modal.remove();
        hideBanner();
        
        console.log('Cookie preferences saved:', preferences);
    };
    
    function hideBanner() {
        const banner = document.getElementById('spanish-cookie-banner');
        if (banner) {
            banner.style.display = 'none';
            document.body.classList.remove('cookie-banner-active');
        }
    }
    
    // Disable Termly banner on Australian pages
    function disableTermly() {
        // Remove any existing Termly banners
        const termlyBanners = document.querySelectorAll('[id*="termly"], [class*="termly"]');
        termlyBanners.forEach(banner => {
            if (banner.style && banner.style.display !== 'none') {
                banner.style.display = 'none';
            }
        });
        
        // Disable Termly scripts
        const termlyScripts = document.querySelectorAll('script[src*="termly"]');
        termlyScripts.forEach(script => {
            script.remove();
        });
    }
    
    // Initialize cookie consent
    function init() {
        // Disable Termly first
        disableTermly();
        
        if (!hasConsent()) {
            const banner = createCookieBanner();
            document.body.appendChild(banner);
            document.body.classList.add('cookie-banner-active');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})(); 