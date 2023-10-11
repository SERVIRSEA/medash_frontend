import axios from 'axios';

export const protectedAreaFetcher = async () => {
    const response = await axios.get('/data/protected_area.geojson');
    return response.data;
};