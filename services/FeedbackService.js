import { postData, fetchData } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

class FeedbackService {
    constructor() {
        this.apiUrl = API_ENDPOINTS.FEEDBACK.SUBMIT;
    }

    async submitFeedback(feedbackData) {
        try {
            const response = await postData(this.apiUrl, feedbackData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new FeedbackService();
