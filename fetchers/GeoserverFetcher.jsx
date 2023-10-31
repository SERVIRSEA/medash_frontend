import axios from 'axios';

export const GeoserverFetcher = async (params) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/khm/wfs`;
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; 
    }
}