import { apiClient } from "@/config/apiClient";

export const fetchData = async (url, params) => {
    try {
        const response = await apiClient.get(url, {
            params
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (url, data) => {
    try {
        const response = await apiClient.post(url, data);

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};