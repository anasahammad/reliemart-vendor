import React from "react";

const WholesaleRequests = () => {
  // Example data for wholesale requests
  const requests = [
    {
      id: 1,
      customerName: "Aisha Ahmed",
      requestDate: "2025-01-05",
      product: "100 units of T-Shirts",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Rahim Chowdhury",
      requestDate: "2025-01-03",
      product: "200 units of Shoes",
      status: "Approved",
    },
    {
      id: 3,
      customerName: "Fatima Begum",
      requestDate: "2025-01-02",
      product: "150 units of Bags",
      status: "Rejected",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Approved":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Wholesale Requests</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Request Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{request.id}</td>
              <td className="border border-gray-300 px-4 py-2">{request.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{request.requestDate}</td>
              <td className="border border-gray-300 px-4 py-2">{request.product}</td>
              <td className={`border border-gray-300 px-4 py-2 ${getStatusColor(request.status)}`}>
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WholesaleRequests;
