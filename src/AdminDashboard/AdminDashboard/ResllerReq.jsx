import { FaCheck, FaTimes } from "react-icons/fa";

export default function ResellerRequestsTable() {
  const requests = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      requestDate: "2024-12-08",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      requestDate: "2024-12-07",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      phone: "456-789-0123",
      requestDate: "2024-12-06",
      status: "Pending",
    },
  ];

  const handleApprove = (id) => {
    console.log("Approved reseller request with ID:", id);
    // Handle the approval logic here (e.g., call an API to update status)
  };

  const handleReject = (id) => {
    console.log("Rejected reseller request with ID:", id);
    // Handle the rejection logic here (e.g., call an API to update status)
  };

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Reseller Requests
      </h2>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Phone</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Request Date</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-sm text-gray-800">{request.id}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.name}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.email}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.phone}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{request.requestDate}</td>
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
