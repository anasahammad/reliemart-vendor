import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../../services/index/customerOrder';
import { Link, useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', { page, limit, search, status }],
    queryFn: fetchOrders,
    keepPreviousData: false,
  });

  console.log(data);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when the search changes
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1); // Reset to the first page when the status changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewDetails = (orderId) => {
    navigate(`/admin/customer/order-details/${orderId}`); // Ensure correct dynamic route
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            className="px-4 py-2 border rounded-lg"
            placeholder="Search orders"
            value={search}
            onChange={handleSearchChange}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order #</th>
            <th className="px-4 py-2 border">Customer Name</th>
            <th className="px-4 py-2 border">Customer Number</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 border">{order.orderId}</td>
              <td className="px-4 py-2 border">{order.customerName}</td>
              <td className="px-4 py-2 border">{order.customerNumber}</td>
              <td className="px-4 py-2 border">{order.status}</td>
              <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
              <Link to={`/admin/customer/order-details/${order._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-gray-700">
          Page {page} of {data.pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data.pagination.totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerOrders;
