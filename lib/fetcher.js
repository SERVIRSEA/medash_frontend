import { apiClient } from "./apiClient";

// Fetch data with GET request
export const fetchData = async (url, params) => {
    try {
        const response = await apiClient.get(url, { params });

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
};

// Post data with POST request
export const postData = async (url, data) => {
    try {
        const response = await apiClient.post(url, data);

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Error posting data to ${url}:`, error);
        throw error;
    }
};