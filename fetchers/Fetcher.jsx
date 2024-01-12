import axios from 'axios';

axios.defaults.timeout = 50000;

export const Fetcher = async (action, params) => {
    // Ensure action is a string to prevent errors with 'substring' method.
    if (typeof action !== 'string') {
        throw new Error('Action must be a string');
    }

    // Validate 'action' format.
    if (!action.startsWith('get-') && !action.startsWith('download-')) {
        throw new Error('Action does not have the correct format');
    }

    try {
        const fullParams = {
            action: action,
            ...params
        };

        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const apiKey = process.env.NEXT_PUBLIC_DATA_API_KEY; 

        if (!baseURL) {
            throw new Error('Base URL is not defined in environment variables');
        }

        if (!apiKey) {
            throw new Error('API Key is not defined in environment variables');
        }

        // Construct the full URL
        const url = `${baseURL}`;

        // Construct the headers object with the API key
        const headers = {
            'Authorization': `${apiKey}` 
        };

        // Await the axios GET request with the headers included and return the data
        const response = await axios.get(url, { 
            params: fullParams,
            headers: headers 
        });

        // Optional: Check for non-200 status responses
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // This allows the calling context to handle the error as needed.
    }
};