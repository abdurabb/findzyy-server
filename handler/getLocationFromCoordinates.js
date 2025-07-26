const axios = require('axios');

const getLocationFromCoordinates = async (lat, lng) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const result = response.data.results[0]; // Most relevant address
            return {
                formattedAddress: result.formatted_address,
                city: result.address_components.find(c => c.types.includes('locality'))?.long_name || '',
                state: result.address_components.find(c => c.types.includes('administrative_area_level_1'))?.long_name || '',
                country: result.address_components.find(c => c.types.includes('country'))?.long_name || ''
            };
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    getLocationFromCoordinates
}
