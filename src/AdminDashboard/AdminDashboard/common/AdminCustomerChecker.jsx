import React, { useState } from 'react';

const AdminCustomerChecker = () => {
  const [search, setSearch] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  const customers = [
    { id: '001', name: 'John Doe', email: 'john@example.com', orderHistory: ['Order 1001', 'Order 1002'], status: 'Active' },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', orderHistory: ['Order 1003', 'Order 1004'], status: 'Inactive' },
    { id: '003', name: 'David Lee', email: 'david@example.com', orderHistory: ['Order 1005', 'Order 1006'], status: 'Active' },
    { id: '004', name: 'Sarah Kim', email: 'sarah@example.com', orderHistory: ['Order 1007'], status: 'Active' },
  ];

  const handleSearch = () => {
    const customer = customers.find((customer) => customer.name.toLowerCase().includes(search.toLowerCase()));
    setCustomerDetails(customer || null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Admin - Customer Checker</h2>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-600">Enter Customer Name</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Customer Name"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search Customer
        </button>
      </div>

      {customerDetails ? (
        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
          <p><strong>Customer ID:</strong> {customerDetails.id}</p>
          <p><strong>Name:</strong> {customerDetails.name}</p>
          <p><strong>Email:</strong> {customerDetails.email}</p>
          <p><strong>Status:</strong>
            <span className={`px-2 py-1 rounded-md ${
              customerDetails.status === 'Active' ? 'bg-green-500 text-white' :
              'bg-red-500 text-white'}`}>
              {customerDetails.status}
            </span>
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-medium">Order History:</h4>
            <ul className="list-disc ml-6">
              {customerDetails.orderHistory.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : search && (
        <div className="mt-6 text-red-500">
          <p>Customer not found. Please check the name and try again.</p>
        </div>
      )}
    </div>
  );
};

export default AdminCustomerChecker;
