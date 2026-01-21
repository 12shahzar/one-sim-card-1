import axios from "axios";

const api = axios.create({
    baseURL: "https://onesimcardbackend.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Coverage & Plans
export const getCountries = async () => {
    const response = await api.get("/coverage/countries");
    return response?.data || [];
};

export const getOperatorsAndPlans = async (country) => {
    const response = await api.get(`/coverage/operators?country=${encodeURIComponent(country)}`);
    return response?.data || { operators: [], plans: [] };
};

// Features
export const getKeyFeatures = async () => {
    const response = await api.get("/key-features");
    return response?.data || { keyFeatures: [] };
};

// FAQ
export const getFaqGroups = async () => {
    const response = await api.get("/faq/groups");
    return response?.data || [];
};

export const getFaqsByGroup = async (groupId) => {
    const response = await api.get(`/faq/by-group/${groupId}`);
    return response?.data || [];
};

export const searchFaq = async (query) => {
    const response = await api.get("/faq/search", { params: { q: query } });
    return response?.data || [];
};

// Forms Submission
export const submitM2MSupport = async (formData) => {
    const response = await api.post("/m2m-support/submit", formData);
    return response?.data;
};

export const submitCustomQuote = async (payload) => {
    const response = await api.post("/quote/submit", payload);
    return response?.data;
};

export const submitBuyNow = async (form) => {
    const response = await api.post("/buynow/submit", form);
    return response?.data;
};

// Utility for dynamic URLs
export const fetchByUrl = async (url) => {
    const response = await axios.get(url);
    return response?.data;
};

export default {
    getCountries,
    getOperatorsAndPlans,
    getKeyFeatures,
    getFaqGroups,
    getFaqsByGroup,
    searchFaq,
    submitM2MSupport,
    submitCustomQuote,
    submitBuyNow,
    fetchByUrl,
};
