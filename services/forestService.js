// Import utility functions and API endpoints
import { fetchData, postData } from "@/utils/fetcher";
import { API_ENDPOINTS } from "@/config/apiConfig";

// Fetch the forest cover map data
export const getForestCoverMap = async (params) => {
    try {
        const url = API_ENDPOINTS.FOREST.FOREST_COVER_MAP;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching forest cover map:', error, { params });
        throw error;
    }
};

// Fetch the forest gain map data
export const getForestGainMap = async (params) => {
    try {
        const url = API_ENDPOINTS.FOREST.FOREST_GAIN_MAP;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching forest gain map:', error, { params });
        throw error;
    }
};

// Fetch the forest loss map data
export const getForestLossMap = async (params) => {
    try {
        const url = API_ENDPOINTS.FOREST.FOREST_LOSS_MAP;
        const data = await fetchData(url, params);
        return data;
    } catch (error) {
        console.error('Error fetching forest loss map:', error, { params });
        throw error;
    }
};


// // Fetch the download EVI map URL
// export const downloadEviMap = async (params) => {
//     try {
//         const url = API_ENDPOINTS.EVI.DOWNLOAD;
//         const data = await postData(url, params);
//         return data;
//     } catch (error) {
//         console.error('Error fetching EVI download URL:', error);
//         throw error;
//     }
// };