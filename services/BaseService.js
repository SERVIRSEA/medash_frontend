import { fetchData, postData } from "@/lib/fetcher";

export default class BaseService {
    constructor(apiEndpoints, subcategory = null) {
        this.apiEndpoints = apiEndpoints;
        this.subcategory = subcategory;
    }

    // Get the endpoint URL based on the provided key, handling subcategories and chart types
    _getEndpoint(endpointKey, chartType = null) {
        let endpoint = this.apiEndpoints;

        // 1. Check if subcategory exists and use that if available
        if (this.subcategory && endpoint[this.subcategory]) {
            endpoint = endpoint[this.subcategory];
        }

        // 2. Handle chart logic when endpointKey is 'CHART'
        if (endpointKey === 'CHART') {
            const chartKey = chartType ? chartType.toUpperCase() : 'DEFAULT';
            
            // Ensure we're accessing nested objects correctly
            if (endpoint['CHART'] && endpoint['CHART'][chartKey]) {
                return endpoint['CHART'][chartKey];
            }
            
            // If chart type is not found, fall back to 'DEFAULT'
            return endpoint['CHART'] && endpoint['CHART']['DEFAULT'] 
                ? endpoint['CHART']['DEFAULT']
                : undefined;
        }

        // 3. Return the URL for the given endpoint key (MAP, DOWNLOAD, etc.)
        return endpoint[endpointKey];
    }

    // Fetch map data
    async getMap(params) {
        const url = this._getEndpoint('MAP');
        if (!url) {
            // console.error('Map endpoint is undefined');
            throw new Error(`Map endpoint URL is not defined`);
        }
        // console.log('Map URL:', url);
        return await fetchData(url, params);
    }

    // Download map data
    async downloadMap(data) {
        const url = this._getEndpoint('DOWNLOAD');
        if (!url) {
            // console.error('Download map endpoint is undefined');
            throw new Error(`Download map endpoint URL is not defined`);
        }
        // console.log('Download URL:', url);
        return await postData(url, data);
    }

    // Fetch chart data, with fallback to default chart type
    async getChart(params, chartType = 'DEFAULT') {
        const url = this._getEndpoint('CHART', chartType);
        
        // // Log for debugging
        // console.log('Fetching chart data with URL:', url, 'and chartType:', chartType);
        
        if (!url) {
            // console.error('Chart endpoint is undefined');
            throw new Error(`Chart endpoint URL for type ${chartType} is not defined`);
        }
        return await fetchData(url, params);
    }
}