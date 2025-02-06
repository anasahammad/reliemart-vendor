import React, { useState } from 'react';

const AdminVerification = () => {
  // Example list of users or products to verify
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: 'John Doe', type: 'User', status: 'Pending' },
    { id: 2, name: 'Jane Smith', type: 'User', status: 'Pending' },
    { id: 3, name: 'Product A', type: 'Product', status: 'Pending' },
    { id: 4, name: 'Product B', type: 'Product', status: 'Pending' },
  ]);

  // Function to handle the approval of verification
  const handleApprove = (id) => {
    setPendingVerifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );
  };

  // Function to handle the rejection of verification
  const handleReject = (id) => {
    setPendingVerifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Rejected' } : item
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Admin - Verification</h2>

      {/* Pending Verifications Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">Type</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 text-center text-lg font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingVerifications.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-4 text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-900">{item.type}</td>
                <td className="px-6 py-4 text-gray-900">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {item.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerification;
