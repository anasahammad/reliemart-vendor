import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Phone, ShoppingCart, Star, Mail, MapPin, Facebook, Globe } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { MdAccountBalance, MdAttachMoney } from 'react-icons/md';

const SellerDetails = () => {
  const { id } = useParams();
  const { data: seller = {} } = useQuery({
    queryKey: ['seller', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reseller/${id}`, { withCredentials: true });
      return response.data.user;
    }
  });

  return (
    <div className=" min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 ">
              <div className="p-8">
                <div className="relative">
                  <img
                    src={seller.logo || 'https://via.placeholder.com/150'}
                    alt={seller.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-200 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-400 rounded-full w-6 h-6 border-4 border-white"></div>
                </div>
                <h2 className="mt-4 text-3xl font-bold text-center text-gray-800">{seller.name}</h2>
                <p className="text-center text-indigo-600 font-medium">{seller.companyName}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {seller?.tags?.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 ">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-center">
                  <Phone className="w-6 h-6 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-lg text-gray-800">{seller.phone}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <BsWhatsapp className="w-6 h-6 text-green-500 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">WhatsApp</p>
                    <p className="text-lg text-gray-800">{seller.whatsappNumber}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="w-6 h-6 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg text-gray-800">{seller.email}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Facebook className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Facebook Page</p>
                    <Link to={seller.facebookPageLink} target="_blank" rel="noopener" className="text-lg text-blue-600 hover:underline">
                      {seller.facebookPageLink}
                    </Link>
                  </div>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-6 h-6 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Address</p>
                    <p className="text-lg text-gray-800">{seller.address}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 ">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Seller Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <ShoppingCart className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-700">{seller.totalOrders}</p>
                  <p className="text-sm font-medium text-blue-600">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <MdAttachMoney className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-700">${seller.totalSalesAmount}</p>
                  <p className="text-sm font-medium text-green-600">Total Sales</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-yellow-700">{seller.ratings}</p>
                  <p className="text-sm font-medium text-yellow-600">Ratings</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <MdAccountBalance className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-purple-700">${seller.withdrawAmount}</p>
                  <p className="text-sm font-medium text-purple-600">Withdrawn</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 ">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Referral Code</p>
                    <p className="text-lg text-gray-800">{seller.referralCode}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expertise Level</p>
                    <p className="text-lg text-gray-800">{seller.expertiseLevel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Platform Usage</p>
                    <p className="text-lg text-gray-800">{seller.platformUsage}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${seller.isActive ? 'bg-green-500' : 'bg-red-500'} mr-3`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Status</p>
                    <p className="text-lg text-gray-800">{seller.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-center">
                  <Mail className="w-6 h-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Joined</p>
                    <p className="text-lg text-gray-800">{new Date(seller.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;