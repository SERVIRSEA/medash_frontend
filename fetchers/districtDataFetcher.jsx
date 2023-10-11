import axios from 'axios';

export const districtDataFetcher = async () => {
    const response = await axios.get('/data/cambodia_distrct.json');
    return response.data;
};