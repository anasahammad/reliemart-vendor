import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AllOrders() {
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Pending', amount: '$150', date: '2024-12-05' },
    { id: 2, customer: 'Jane Smith', status: 'Shipped', amount: '$220', date: '2024-12-04' },
    { id: 3, customer: 'Alice Brown', status: 'Delivered', amount: '$310', date: '2024-12-03' },
    // Add more orders as needed
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4 text-sm text-gray-800"><Link to="/admin/product-details">{order.id}</Link></td>
                <td className="py-3 px-4 text-sm text-gray-800">{order.customer}</td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <span
                    className={`${
                      order.status === 'Pending'
                        ? 'text-yellow-500'
                        : order.status === 'Shipped'
                        ? 'text-blue-500'
                        : 'text-green-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">{order.amount}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{order.date}</td>
                <td className="py-3 px-4 text-sm text-gray-800 flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
