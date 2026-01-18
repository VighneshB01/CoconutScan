// Configuration file for CoconutGuard AI
// Update the PRODUCTION_API_URL before deploying to production

const CONFIG = {
    // Development API (local backend)
    DEVELOPMENT_API_URL: 'http://localhost:5000/api/predict',
    
    // Production API - Railway deployment (easier than Heroku)
    PRODUCTION_API_URL: 'https://your-app-name.up.railway.app/api/predict',
    
    // Automatically detect environment
    getApiUrl: function() {
        const isLocal = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
        
        return isLocal ? this.DEVELOPMENT_API_URL : this.PRODUCTION_API_URL;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}