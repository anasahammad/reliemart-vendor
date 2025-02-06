import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/order/orders`; // Replace with your actual backend URL

// Fetch Orders
export const fetchOrders = async ({ queryKey }) => {
  const [, { page, limit, search, status }] = queryKey;

  const response = await axios.get(API_URL, {
    params: { page, limit, search, status },
  });

  return response.data;
};

// Fetch Order Details by Order ID
export const fetchOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async ({ orderId, status }) => {
  const response = await axios.patch(`${API_URL}/${orderId}/status`, {
    status,
  });
  return response.data;
};

// Update Order Tracking ID
export const updateOrderTracking = async ({ orderId, trackingId }) => {
  const response = await axios.patch(`${API_URL}/${orderId}/tracking`, {
    trackingId,
  });
  return response.data;
};

// Delete Order
export const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/${orderId}`);
  return response.data;
};

// Add Order Note
export const addOrderNote = async ({ orderId, note }) => {
  const response = await axios.post(`${API_URL}/${orderId}/notes`, { note });
  return response.data;
};
