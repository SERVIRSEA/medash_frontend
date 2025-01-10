// apiClient.js
import axios from 'axios';

// Read environment variables
const defaultBaseURL = process.env.NEXT_PUBLIC_REST_API_BASE_URL;
const defaultApiKey = process.env.NEXT_PUBLIC_DATA_API_KEY;
const defaultTimeout = 60000; // 60 seconds

// Function to create an axios instance dynamically
export const createApiClient = ({ baseURL = defaultBaseURL, apiKey = defaultApiKey, timeout = defaultTimeout }) => {
    if (!baseURL) {
        throw new Error('Base URL is not defined');
    }

    if (!apiKey) {
        throw new Error('API Key is not defined');
    }

    return axios.create({
        baseURL: baseURL,
        headers: {
            'Authorization': `${apiKey}`,
            'Content-Type': 'application/json',
        },
        timeout: timeout,
    });
};


// import axios from 'axios';

// // Read environment variables
// const baseURL = process.env.NEXT_PUBLIC_REST_API_BASE_URL;
// const apiKey = process.env.NEXT_PUBLIC_DATA_API_KEY;
// const timeout = 60000; // 60 seconds

// // Validate environment variables
// if (!baseURL) {
//     throw new Error('Base URL is not defined in environment variables');
// }

// if (!apiKey) {
//     throw new Error('API Key is not defined in environment variables');
// }

// // Create and export the axios instance
// export const apiClient = axios.create({
//     baseURL: baseURL,
//     headers: {
//         'Authorization': `${apiKey}`,
//         'Content-Type': 'application/json',
//     },
//     timeout: timeout
// });