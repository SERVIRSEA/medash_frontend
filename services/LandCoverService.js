import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class LandCoverService extends BaseService {
    constructor() {
        super(API_ENDPOINTS.LANDCOVER);
    }
}

// Instantiate and export as default
export default new LandCoverService();
