import axios from 'axios';

export const provinceDataFetcher = async () => {
    const response = await axios.get('/data/cambodia_province.json');
    return response.data;
};