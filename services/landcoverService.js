import { fetchData, postData } from "@/utils/fetcher";
import { API_ENDPOINTS } from "@/config/apiConfig";

// Fetch the landcover map data
export const getLandcoverMap = async (params) => {
    try {
        const url = API_ENDPOINTS.LANDCOVER.MAP;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching landcover map:', error);
        throw error;
    }
};

// Download the landcover map
export const downloadLandcoverMap = async (data) => {
    try {
        const url = API_ENDPOINTS.LANDCOVER.DOWNLOAD;
        const response = await postData(url, data);
        return response;
    } catch (error) {
        console.error('Error downloading landcover map:', error);
        throw error;
    }
};

// Fetch the landcover chart data
export const getLandcoverChart = async (params) => {
    try {
        const url = API_ENDPOINTS.LANDCOVER.CHART;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching landcover chart:', error);
        throw error;
    }
};