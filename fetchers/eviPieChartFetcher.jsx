import axios from 'axios';

export const eviPieChartFetcher = async (params) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/evi-pie-chart/', {params});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Consider handling the error more gracefully, depending on your use case.
    }
};