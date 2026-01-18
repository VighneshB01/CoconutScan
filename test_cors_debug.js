// Debug CORS issue
import fetch from 'node-fetch';

async function debugCORS() {
    console.log('🔍 Debugging CORS issue...\n');
    
    const API_URL = 'https://coconutscan-production.up.railway.app/api/predict';
    const FRONTEND_ORIGIN = 'https://coconut-scan-yxl2.vercel.app';
    
    console.log('API URL:', API_URL);
    console.log('Frontend Origin:', FRONTEND_ORIGIN);
    console.log('---\n');
    
    // Test 1: Simple GET to root
    try {
        console.log('1️⃣ Testing root endpoint...');
        const rootResponse = await fetch('https://coconutscan-production.up.railway.app/');
        console.log('✅ Root Status:', rootResponse.status);
        console.log('Root Response:', await rootResponse.text());
    } catch (error) {
        console.log('❌ Root test failed:', error.message);
    }
    
    // Test 2: OPTIONS request (preflight)
    try {
        console.log('\n2️⃣ Testing OPTIONS preflight...');
        const optionsResponse = await fetch(API_URL, {
            method: 'OPTIONS',
            headers: {
                'Origin': FRONTEND_ORIGIN,
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('OPTIONS Status:', optionsResponse.status);
        console.log('OPTIONS Headers:');
        console.log('  Access-Control-Allow-Origin:', optionsResponse.headers.get('access-control-allow-origin'));
        console.log('  Access-Control-Allow-Methods:', optionsResponse.headers.get('access-control-allow-methods'));
        console.log('  Access-Control-Allow-Headers:', optionsResponse.headers.get('access-control-allow-headers'));
        console.log('  Access-Control-Max-Age:', optionsResponse.headers.get('access-control-max-age'));
        
        const optionsBody = await optionsResponse.text();
        console.log('OPTIONS Body:', optionsBody);
        
    } catch (error) {
        console.log('❌ OPTIONS test failed:', error.message);
    }
    
    // Test 3: POST request with minimal data
    try {
        console.log('\n3️⃣ Testing POST request...');
        
        // Minimal test image (1x1 pixel)
        const testImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg==';
        
        const postResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': FRONTEND_ORIGIN
            },
            body: JSON.stringify({
                imageSrc: testImage
            })
        });
        
        console.log('POST Status:', postResponse.status);
        console.log('POST CORS Headers:');
        console.log('  Access-Control-Allow-Origin:', postResponse.headers.get('access-control-allow-origin'));
        
        const postBody = await postResponse.text();
        console.log('POST Response:', postBody);
        
    } catch (error) {
        console.log('❌ POST test failed:', error.message);
    }
    
    // Test 4: Check if Railway is blocking requests
    try {
        console.log('\n4️⃣ Testing without Origin header...');
        const noOriginResponse = await fetch(API_URL, {
            method: 'OPTIONS'
        });
        
        console.log('No-Origin Status:', noOriginResponse.status);
        console.log('No-Origin CORS Headers:');
        console.log('  Access-Control-Allow-Origin:', noOriginResponse.headers.get('access-control-allow-origin'));
        
    } catch (error) {
        console.log('❌ No-Origin test failed:', error.message);
    }
}

debugCORS();