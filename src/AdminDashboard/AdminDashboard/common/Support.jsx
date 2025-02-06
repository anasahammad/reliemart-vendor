import React, { useState } from "react";

const CustomerSupport = () => {
  // Example data for customer support tickets
  const [tickets] = useState([
    {
      id: 1,
      customerName: "Aisha Ahmed",
      issue: "Order not delivered",
      date: "2025-01-04",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Rahim Chowdhury",
      issue: "Received damaged product",
      date: "2025-01-03",
      status: "Resolved",
    },
    {
      id: 3,
      customerName: "Fatima Begum",
      issue: "Refund request",
      date: "2025-01-02",
      status: "In Progress",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Resolved":
        return "text-green-500";
      case "In Progress":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Customer Support Tickets</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Ticket ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Issue</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{ticket.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.issue}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.date}</td>
              <td className={`border border-gray-300 px-4 py-2 ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSupport;
