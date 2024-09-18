import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class EviService extends BaseService {
    constructor() {
        super(API_ENDPOINTS.EVI);
    }
}

export default new EviService();
