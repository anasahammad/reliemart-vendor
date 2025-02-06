import axios from "axios";

const API_URL = 'https://reseller-backend-zeta.vercel.app/api/v4/products'; // Replace with your actual backend URL

// Fetch Orders
export const fetchProducts = async () => {
  const response = await axios.get(API_URL, {withCredentials:true})
  return response.data.data;
};

