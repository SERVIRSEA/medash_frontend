import BaseService from "./BaseService";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class FireService extends BaseService {
    constructor() {
        super(API_ENDPOINTS.FIRE);
    }
}

const fireService = new FireService();
export default fireService;