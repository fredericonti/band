// Google Maps Configuration for CODA
// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key

export const GOOGLE_MAPS_CONFIG = {
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // ⚠️ Add your API key here
    libraries: ['places'],
    region: 'BR',
    language: 'pt-BR'
};

// São Paulo coordinates for biasing autocomplete results
export const SAO_PAULO_CENTER = {
    lat: -23.5505,
    lng: -46.6333
};

export const SAO_PAULO_BOUNDS = {
    north: -23.3569,
    south: -23.7739,
    east: -46.3652,
    west: -46.8261
};

/**
 * Instructions to get your Google Maps API Key:
 * 
 * 1. Go to: https://console.cloud.google.com/
 * 2. Create a new project (or select existing)
 * 3. Enable the following APIs:
 *    - Places API (New)
 *    - Maps JavaScript API
 * 4. Go to "Credentials" and create an API Key
 * 5. Restrict the key:
 *    - Application restrictions: HTTP referrers (websites)
 *    - Add your domain (e.g., localhost:5173, coda-editorial-design.surge.sh)
 *    - API restrictions: Restrict to Places API and Maps JavaScript API
 * 6. Copy the API key and paste it above
 */
