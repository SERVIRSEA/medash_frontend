import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";


class ForestService extends BaseService {
    constructor(subcategory) {
        super(API_ENDPOINTS.FOREST[subcategory]);
    }
}

// Cover Service
export const forestCoverService = new ForestService('FOREST_COVER');

// Gain Service
export const forestGainService = new ForestService('FOREST_GAIN');

// Loss Service
export const forestLossService = new ForestService('FOREST_LOSS');

// Gain Losss
export const forestGainLossService = new ForestService('FOREST_GAIN_LOSS');