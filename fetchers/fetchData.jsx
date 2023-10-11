import axios from 'axios';

export const fetchData = async (action, params) => {
    try {
        // Combine the action with the rest of the params
        const fullParams = {
            action: action,
            ...params
        };
        const response = await axios.get('http://127.0.0.1:8000/api/', {params: fullParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Consider handling the error more gracefully, depending on your use case.
    }
};