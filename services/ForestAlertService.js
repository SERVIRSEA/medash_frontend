import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class ForestAlertService extends BaseService {
    constructor(subcategory) {
        super(API_ENDPOINTS.FOREST_ALERT[subcategory]);
    }
}

// GLAD Alert Service
export const gladService = new ForestAlertService('GLAD_ALERT');

// SARFDAS Alert Service
export const sarfdasService = new ForestAlertService('SARFDAS_ALERT');