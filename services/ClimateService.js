import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class ClimateService extends BaseService {
    constructor() {
        super(API_ENDPOINTS.CLIMATE);
    }
}

export default new ClimateService();