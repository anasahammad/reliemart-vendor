import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaUserCheck, FaBan, FaUserAlt, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResllersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resellersPerPage = 10;

  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reseller/seller/all-resellers`, { withCredentials: true });
      return response.data.resellers;
    }
  });


  const approveMutation = useMutation({
    mutationFn: (id) => axios.post(`${import.meta.env.VITE_API_URL}/reseller/approve/${id}`, {}, { withCredentials: true }),
    onSuccess: () => queryClient.invalidateQueries(["users"])
  });

  const banMutation = useMutation({
    mutationFn: (id) => axios.post(`${import.meta.env.VITE_API_URL}/reseller/ban/${id}`, {}, { withCredentials: true }),
    onSuccess: () => queryClient.invalidateQueries(["users"])
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleBan = (id) => {
    banMutation.mutate(id);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReseller = currentPage * resellersPerPage;
  const indexOfFirstReseller = indexOfLastReseller - resellersPerPage;
  const currentResellers = filteredUsers.slice(indexOfFirstReseller, indexOfLastReseller);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center">Error fetching resellers</div>;

  return (
    <div className=" min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white">Resellers Management</h2>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resellers..."
                className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Phone</th>
                  <th className="border px-4 py-2 text-center">Is Verified</th>
                  <th className="border px-4 py-2 text-center">Total Sales</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentResellers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      <Link to={`/admin/resellers/details/${user._id}`} className="text-blue-600 hover:underline">
                        {user.name}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className={`border px-4 py-2 text-center ${user.isVerified ? 'text-green-500' : 'text-red-500'}`}>
                      {user.isVerified ? 'Verified' : 'Not Verified'}
                    </td>
                    <td className="border px-4 py-2 text-center">{user.totalOrders}</td>
                    <td className="border px-4 py-2 text-center">
                      {!user.isVerified && (
                        <>
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="text-green-500 hover:text-green-700 mr-2 transition duration-300"
                            title="Approve"
                          >
                            <FaUserCheck className="inline text-xl" />
                          </button>
                          <button
                            onClick={() => handleBan(user._id)}
                            className="text-red-500 hover:text-red-700 transition duration-300"
                            title="Ban"
                          >
                            <FaBan className="inline text-xl" />
                          </button>
                        </>
                      )}
                      {user.isVerified && (
                        <Link to={`/users/profile/${user._id}`} className="text-blue-500 hover:text-blue-700 transition duration-300" title="View Profile">
                          <FaUserAlt className="inline text-xl" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(Math.ceil(filteredUsers.length / resellersPerPage)).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === number + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredUsers.length / resellersPerPage)}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <FaChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResllersList;