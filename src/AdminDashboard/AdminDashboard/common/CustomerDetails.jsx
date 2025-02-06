import React from "react";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams(); // Get customer ID from the URL

  // Simulated customer data (Replace with API fetch or state management logic)
  const customer = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Cityville, USA",
    orders: [
      { id: 101, product: "Laptop", date: "2024-01-01", amount: "$1200" },
      { id: 102, product: "Smartphone", date: "2024-01-15", amount: "$800" },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
        <p className="text-gray-700 mb-1">Email: {customer.email}</p>
        <p className="text-gray-700 mb-1">Phone: {customer.phone}</p>
        <p className="text-gray-700 mb-1">Address: {customer.address}</p>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4">Order History</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">Product</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {customer.orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-100 transition">
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.product}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerDetails;
