import React, { useState } from 'react';

const AdminOrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const orders = [
    { id: '1001', status: 'Pending', customer: 'John Doe', orderDate: '2024-12-01', shippingDate: '2024-12-05' },
    { id: '1002', status: 'Shipped', customer: 'Jane Smith', orderDate: '2024-12-02', shippingDate: '2024-12-03' },
    { id: '1003', status: 'Delivered', customer: 'David Lee', orderDate: '2024-12-03', shippingDate: '2024-12-04' },
    { id: '1004', status: 'Cancelled', customer: 'Sarah Kim', orderDate: '2024-12-04', shippingDate: '' },
  ];

  const handleSearch = () => {
    const order = orders.find((order) => order.id === orderId);
    setOrderDetails(order || null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Order Tracking</h2>

      <div className="mb-6">
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-600">Enter Order ID</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Order ID"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Track Order
        </button>
      </div>

      {orderDetails ? (
        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Customer:</strong> {orderDetails.customer}</p>
          <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
          <p><strong>Status:</strong> 
            <span className={`px-2 py-1 rounded-md ${
              orderDetails.status === 'Pending' ? 'bg-yellow-500 text-white' :
              orderDetails.status === 'Shipped' ? 'bg-blue-500 text-white' :
              orderDetails.status === 'Delivered' ? 'bg-green-500 text-white' : 
              'bg-red-500 text-white'}`}>
              {orderDetails.status}
            </span>
          </p>
          {orderDetails.status === 'Shipped' && (
            <p><strong>Shipping Date:</strong> {orderDetails.shippingDate}</p>
          )}
        </div>
      ) : orderId && (
        <div className="mt-6 text-red-500">
          <p>Order not found. Please check the Order ID and try again.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrderTracking;
