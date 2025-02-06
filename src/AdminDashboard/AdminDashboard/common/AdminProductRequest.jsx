import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSearch, FaTrash } from 'react-icons/fa';

const AdminProductRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: productRequests = [], isLoading, isError, error } = useQuery({
    queryKey: ['productRequests'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/productReq`);
      return response.data.data;
    },
  });

  const deleteProductRequestMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/productReq/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['productRequests']);
      toast.success('Product request deleted successfully');
    },
    onError: () => {
      toast.error('An error occurred. Please try again.');
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product request?')) {
      deleteProductRequestMutation.mutate(id);
    }
  };

  const filteredRequests = productRequests.filter(request =>
    request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <h2 className="text-3xl font-bold text-white">Admin - Product Requests</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={request.image} 
                          alt={request.productName} 
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request._id.slice(0, 15)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.sellerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                        >
                          <FaTrash className="mr-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductRequest;