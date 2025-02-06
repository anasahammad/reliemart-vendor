import axios from "axios";

const API_URL = 'https://reseller-backend-zeta.vercel.app/api/v4/reseller/seller/all-resellers'; // Replace with your actual backend URL

// Fetch Orders
export const fetchResellers = async () => {
  const response = await axios.get(API_URL, {withCredentials:true})
  return response.data.resellers;
};

export const fetchResellerOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerOrder/admin/orders`, {withCredentials:true})
  return response.data;
}

