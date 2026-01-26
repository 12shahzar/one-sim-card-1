import axios from "axios";

const BASE = `${import.meta.env.VITE_API_BASE_URL}/api/faq`;

// Get all FAQ Groups
export const getFaqGroups = async () => {
  const res = await axios.get(`${BASE}/groups`);
  console.log("result data group fetch", res.data);
  return res.data; // return the array directly
};


// Get FAQ by group id
export const getFaqsByGroup = async (groupId) => {
  const res = await axios.get(`${BASE}/by-group/${groupId}`);
  return res.data; // [{question, answer}]
};

// Search FAQ
export const searchFaq = async (query) => {
  const res = await axios.get(`${BASE}/search`, { params: { q: query } });
  return res.data; // your backend already returns an array
};

