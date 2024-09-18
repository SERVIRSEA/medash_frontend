// Import utility functions and API endpoints
import { fetchData, postData } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/config/apiConfig";

// Fetch the EVI map data
export const getEviMap = async (params) => {
    try {
        const url = API_ENDPOINTS.EVI.MAP;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching EVI map:', error);
        throw error;
    }
};

// Fetch the download EVI map URL
export const downloadEviMap = async (params) => {
    try {
        const url = API_ENDPOINTS.EVI.DOWNLOAD;
        const data = await postData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching EVI download URL:', error);
        throw error;
    }
};

// Fetch the EVI pie chart data
export const getEviPie = async (params) => {
    try {
        const url = API_ENDPOINTS.EVI.CHART_PIE;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching EVI pie chart data:', error);
        throw error;
    }
};