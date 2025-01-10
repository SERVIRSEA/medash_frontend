import { fetchData } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

const activeFireBaseURL = process.env.NEXT_PUBLIC_FIRMS_REST_API_BASE_URL;
const activeFireApiKey = process.env.NEXT_PUBLIC_FIRMS_REST_API_KEY;

class ActiveFireService {
    constructor(baseURL = activeFireBaseURL, apiKey = activeFireApiKey) {
        // Default URL and API Key can be set in constructor
        if (!baseURL) {
            throw new Error('Base URL is required');
        }
        if (!apiKey) {
            throw new Error('API Key is required');
        }

        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    // Fetch active fire data using fetchData
    async getActiveFireData(params = {}) {
        // Default endpoint can be set directly in this method
        // const endpoint = "api/v1/active-fires?country=Cambodia&output_format=geojson"; 

        try {
            const data = await fetchData(API_ENDPOINTS.ACTIVE_FIRE.MAP, params, this.baseURL, this.apiKey);
            return data; // Return the data from the response
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            throw error; // Propagate the error for further handling
        }
    }

    // Fetch chart data
    async getActiveFireChartData(params = {}) {
        try {
            const data = await fetchData(
                API_ENDPOINTS.ACTIVE_FIRE.CHART.DEFAULT,
                params,
                this.baseURL,
                this.apiKey
            );
            return data;
        } catch (error) {
            console.error('Error fetching chart data:', error);
            throw error;
        }
    }
}

export default new ActiveFireService;
