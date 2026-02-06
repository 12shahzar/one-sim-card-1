import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/why-onesim";

export const fetchWhyOneSimCards = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.cards;
    } catch (error) {
        console.error("Error fetching Why OneSimCard data:", error);
        throw error;
    }
};
