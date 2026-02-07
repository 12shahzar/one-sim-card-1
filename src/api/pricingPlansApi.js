import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/pricing-plans";

export const fetchPricingPlans = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.plans;
    } catch (error) {
        console.error("Error fetching Pricing Plans:", error);
        throw error;
    }
};
