import  { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const WholesaleOrders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['wholesaleOrders'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/wholesale`);
      return response.data;
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId) => axios.delete(`${import.meta.env.VITE_API_URL}/wholesale/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries('wholesaleOrders');
      toast.success('Order deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }) => axios.patch(`${import.meta.env.VITE_API_URL}/wholesale/${orderId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries('wholesaleOrders');
        toast.success('Status updated successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleViewProduct = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleDelete = (orderId) => {
   
      deleteOrderMutation.mutate(orderId);
    
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate( {orderId, status: newStatus} );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-blue-500" /></div>;
  if (isError) return <div className="text-red-500 text-center">Error fetching wholesale orders</div>;

  return (
    <div className="container mx-auto px-4 py-8">
     <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white rounded-xl'>
     <h1 className="text-3xl font-bold mb-6 ">Wholesale Orders</h1>
     </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
              <h3 className="font-bold text-lg text-indigo-600">{order.customerName}</h3>
              <p className="text-sm text-gray-600">Phone: {order.phone}</p>
              <p className="text-sm text-gray-600">Product: {order.productName}</p>
              <p className="text-sm text-gray-600">Quantity: {order.productQuantity}</p>
              <p className="text-sm text-gray-600">Business Type: {order.businessType}</p>
              <p className="text-sm text-gray-600">Company: {order.companyName}</p>
              <div className="mt-4 flex justify-between items-center">
                <select
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewProduct(order.productId)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
                    title="View Product"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-300"
                    title="View Details"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                    title="Delete Order"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed left-[22%] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
              <p><strong>Quantity:</strong> {selectedOrder.productQuantity}</p>
              <p><strong>Business Type:</strong> {selectedOrder.businessType}</p>
              <p><strong>Company Name:</strong> {selectedOrder.companyName}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
              <p><strong>Facebook Page:</strong> {selectedOrder.facebookPage}</p>
              <p><strong>Website:</strong> {selectedOrder.website}</p>
              <p><strong>Status:</strong> {selectedOrder.status || 'Pending'}</p>
            </div>
            {selectedOrder.businessCard && (
              <div className="mt-4">
                <p><strong>Business Card:</strong></p>
                <img src={selectedOrder.businessCard || "/placeholder.svg"} alt="Business Card" className="max-w-full h-auto mt-2" />
              </div>
            )}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesaleOrders;