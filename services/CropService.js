import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class CropService extends BaseService {
    constructor(subcategory) {
        super(API_ENDPOINTS.CROP[subcategory]);
    }
}

// RICE Service
export const riceService = new CropService('RICE');

// RUBBER Service
export const rubberService = new CropService('RUBBER');