import { FaCheck, FaTimes } from "react-icons/fa";

export default function WithdrawRequestsTable() {
  const requests = [
    { id: 1, amount: "$200", paymentMethod: "PayPal", status: "Pending" },
    { id: 2, amount: "$150", paymentMethod: "Bank Transfer", status: "Pending" },
    { id: 3, amount: "$500", paymentMethod: "Crypto", status: "Pending" },
    // Add more requests as needed
  ];

  const handleApprove = (id) => {
    console.log("Approved request with ID:", id);
    // Handle approval logic (e.g., call API to update status)
  };

  const handleReject = (id) => {
    console.log("Rejected request with ID:", id);
    // Handle rejection logic (e.g., call API to update status)
  };

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Withdraw Requests</h2>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Request ID</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment Method</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-sm text-gray-800">{request.id}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.amount}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.paymentMethod}</td>
              <td className="py-3 px-4 text-sm text-gray-800">
                <span
                  className={`${
                    request.status === "Pending" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-800 flex items-center space-x-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
