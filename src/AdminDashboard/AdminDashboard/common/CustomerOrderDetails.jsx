import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchOrderDetails,
  updateOrderStatus,
  updateOrderTracking,
  deleteOrder,
  addOrderNote
} from '../../../services/index/customerOrder';
import { FaBox, FaClipboardList, FaTruck, FaTrash, FaStickyNote, FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt, FaShippingFast, FaExclamationTriangle } from 'react-icons/fa';
// import InvoiceForCustomer from '../../../_components/InvoiceForCustomer';

const CustomerOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [newStatus, setNewStatus] = useState('');
  const [newTrackingId, setNewTrackingId] = useState('');
  const [newNote, setNewNote] = useState('');

  const { data: order, isLoading, isError, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => fetchOrderDetails(orderId),
  });

  const { mutate: mutateStatus } = useMutation(updateOrderStatus);
  const { mutate: mutateTracking } = useMutation(updateOrderTracking);
  const { mutate: mutateDelete } = useMutation(deleteOrder);
  const { mutate: mutateAddNote } = useMutation(addOrderNote);

  const handleStatusChange = (e) => setNewStatus(e.target.value);
  const handleTrackingChange = (e) => setNewTrackingId(e.target.value);
  const handleNoteChange = (e) => setNewNote(e.target.value);

  const handleUpdateStatus = () => {
    if (newStatus) {
      mutateStatus({ orderId, status: newStatus });
    }
  };

  const handleUpdateTracking = () => {
    if (newTrackingId) {
      mutateTracking({ orderId, trackingId: newTrackingId });
    }
  };

  const handleAddNote = () => {
    if (newNote) {
      mutateAddNote({ orderId, note: newNote });
      setNewNote('');
    }
  };

  const handleDeleteOrder = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      mutateDelete(orderId);
      navigate('/admin/customer/orders');
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
  
  if (isError) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-100 to-pink-100">
      <div className="text-center text-red-600 text-xl p-8 bg-white rounded-lg shadow-xl">
        <FaExclamationTriangle className="text-5xl mb-4 mx-auto" />
        Error: {error.message}
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-200 text-yellow-800',
      placed: 'bg-blue-200 text-blue-800',
      processing: 'bg-orange-200 text-orange-800',
      shipped: 'bg-purple-200 text-purple-800',
      delivered: 'bg-green-200 text-green-800',
      cancelled: 'bg-red-200 text-red-800'
    };
    return colors[status] || 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <h2 className="text-4xl font-extrabold mb-2">Order #{order.orderId}</h2>
            <div className="flex flex-wrap items-center text-sm">
              <span className="flex items-center mr-4 mb-2">
                <FaCalendarAlt className="mr-2" />
                Created: {formatDate(order.createdAt)}
              </span>
              <span className="flex items-center mb-2">
                <FaEdit className="mr-2" />
                Updated: {formatDate(order.updatedAt)}
              </span>
            </div>
          </div>
          
          {/* <div className='flex justify-end'><InvoiceForCustomer order={order}/></div> */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold flex items-center mb-4 text-blue-800">
                <FaUser className="mr-2" /> Customer Details
              </h3>
              <div className="space-y-3">
                <p className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {order.customerName}</p>
                <p className="flex items-center"><FaEnvelope className="mr-2 text-blue-500" /> {order.customerEmail}</p>
                <p className="flex items-center"><FaPhone className="mr-2 text-blue-500" /> {order.customerNumber}</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-blue-500" /> {order.customerAddress}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold flex items-center mb-4 text-purple-800">
                <FaClipboardList className="mr-2" /> Order Summary
              </h3>
              <div className="space-y-3">
                <p className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${order.subtotal}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold">${order.shippingCost}</span>
                </p>
                <p className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${order.total}</span>
                </p>
                <p className="flex items-center">
                  <FaCreditCard className="mr-2 text-purple-500" /> {order.paymentMethod}
                </p>
                <p className="flex items-center">
                  <FaShippingFast className="mr-2 text-purple-500" /> {order.shippingOption}
                </p>
                {order.trackingID && (
                  <p className="flex items-center">
                    <FaTruck className="mr-2 text-purple-500" /> Tracking: {order.trackingID}
                  </p>
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="md:col-span-2 bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold flex items-center mb-4 text-pink-800">
                <FaBox className="mr-2" /> Product Details
              </h3>
              {order.product.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl mb-4 shadow">
                  <img src={item.image[0] || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Update Order */}
            <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold flex items-center mb-4 text-green-800">
                <FaEdit className="mr-2" /> Update Order
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="flex items-center">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="">Select new status</option>
                      <option value="pending">Pending</option>
                      <option value="placed">Placed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handleUpdateStatus}
                      className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Tracking ID</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter tracking ID"
                      value={newTrackingId}
                      onChange={handleTrackingChange}
                    />
                    <button
                      onClick={handleUpdateTracking}
                      className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition duration-300"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold flex items-center mb-4 text-yellow-800">
                <FaStickyNote className="mr-2" /> Order Notes
              </h3>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mb-2"
                placeholder="Add your note here"
                value={newNote}
                onChange={handleNoteChange}
                rows="3"
              />
              <button
                onClick={handleAddNote}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center"
              >
                <FaStickyNote className="mr-2" /> Add Note
              </button>
              {order.notes && order.notes.length > 0 && (
                <div className="mt-4 space-y-2">
                  {order.notes.map((note, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow">
                      {note}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delete Order */}
            <div className="md:col-span-2 mt-8 text-center">
              <button
                onClick={handleDeleteOrder}
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center mx-auto"
              >
                <FaTrash className="mr-2" /> Delete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetails;