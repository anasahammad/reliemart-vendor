import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsFillBagFill, BsTruck, BsCreditCard, BsCalendarEvent } from "react-icons/bs";
import { RiArrowUpCircleLine, RiMoneyDollarCircleLine, RiPercentLine, RiShoppingCartLine } from "react-icons/ri";
import { FaMapMarkerAlt, FaPhoneAlt, FaTags, FaNotesMedical, FaBoxOpen, FaClock, FaDownload } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import OrderProgressBar from "./OrderProgressBar";
import InvoiceDownload from "./InvoiceDownload";

const OrderDetails = ({ order, refetch }) => {
  const [newStatus, setNewStatus] = useState(order?.status || ""); // Initialize with the current order status

  console.log("Order Details:", order); // Debugging: Check the order object

  // Fetch seller data
  const { data: seller = {} } = useQuery({
    queryKey: ["seller", order.sellerId],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/reseller/${order?.sellerId}`,
        { withCredentials: true }
      );
      return response.data.user;
    },
  });

  console.log("Seller Data:", seller); // Debugging: Check the seller object
  // Function to calculate the total purchase price
  const calculateTotalPurchasePrice = () => {
    return order?.products?.reduce(
      (total, product) =>
        total + (product?.productId?.MainCashDiscountPrice * product?.quantity),
      0
    );
  };

  // Function to calculate total profit
  const calculateTotalProfit = () => {
    const shippingCharge = order?.shippingCharge || 0; // Default to 0 if undefined
    return calculateTotalPurchasePrice() - order?.totalAmount - shippingCharge;
  };

  // Function to calculate profit percentage
  const calculateProfitPercentage = () => {
    const profit = calculateTotalProfit();
    if (order?.totalAmount > 0) {
      return ((profit / order?.totalAmount) * 100).toFixed(2);
    }
    return "0.00"; // Return 0 if totalAmount is 0 or undefined
  };

  // Mutation for updating order status
  const handleUpdateStatus = async () => {
    try {
      const profit = newStatus === "delivered" ? calculateTotalProfit() : 0;
      const productCount = order?.products?.length || 0;

      const dataToSend = {
        status: newStatus,
        profit,
        productCount,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/resellerOrder/orders/${order._id}`,
        dataToSend,
        { withCredentials: true }
      );

      toast.success("Order status updated successfully");
      if (refetch) refetch(); // Refresh data if refetch function is provided
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };
  


  console.log("Order Details:", order); // Debugging: Check the order object
  return (
    <div className="min-h-screen ">
      <div className="max-w-5xl mx-auto bg-white  overflow-hidden transform transition-all duration-300 ">
        <div className="px-2 py-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6">
            
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-[#f45142] p-3 rounded-full">
                <BsFillBagFill size={30} className="text-white" />
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-800">
                অর্ডার বিস্তারিত
              </h1>
              
            </div>
            <div className="text-center sm:text-right">
            {/* <button className="bg-[#f45142] text-white px-4 py-2 rounded-full font-semibold flex justify-center items-center gap-2 "> <FaDownload />Download Invoice</button> */}

            {/* <InvoiceDownload 
                order={order} 
                reseller={seller} 
                // className="bg-[#f45142] text-white px-4 py-2 rounded-full font-semibold flex justify-center items-center gap-2 mb-2 hover:bg-[#e33e2f] transition-colors duration-300"
              /> */}
              
              <InvoiceDownload order={order} reseller={seller} />
              
              <p className="text-sm text-gray-500">অর্ডার আইডি</p>
              <p className="text-lg font-semibold text-[#f45142]">#{order?.orderId}</p>
              {/* <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-end">
                <BsCalendarEvent className="mr-1" />
                {new Date(order?.createdAt).toLocaleDateString()}
              </p> */}

<p className=" text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-end">
<BsCalendarEvent className="mr-1" />
  Order Date: {new Date(order?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })}
</p>
<p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-end">
  <FaClock className="mr-1" />
  Order Time: {new Date(order?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}
</p>
            </div>
          </div>

          <div className="mt-8">
            <OrderProgressBar currentStatus={order.status} />
             {order?.status === 'pending' && (<div className='text-center my-2'>বর্তমান স্ট্যাটাস: ‍<span className='text-[#f45142]'>{order.status === 'pending' ? 'অর্ডার পেন্ডিং এ আছে' : ''}</span> </div>)}
          </div>
<div className="mt-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
    <FaBoxOpen className="mr-2 text-[#f45142]" />
    পণ্য বিবরণ
  </h2>
  <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
    {order?.products?.map((product, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200 last:border-b-0"
      >
        {/* Product Image */}
        <img
          src={product?.productId?.image[0]}
          alt={product?.productId?.name}
          className="w-24 h-24 object-cover rounded-lg shadow-md"
        />

        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800 hover:underline">
          <Link to={`/seller/product/${product._id}`}>  {product?.productId?.name}</Link>
          </h3>
          <p className="text-gray-600">
            ৳{product?.productId?.MainCashDiscountPrice || product?.productId?.Mainprice}
            <span className="mx-2">×</span>
            {product?.quantity}
          </p>
         
        </div>
 {/* Product Size and Color */}
       {product.productId?.clothingSchema.length > 0 && (
        <div className="flex-1 text-center sm:text-left">
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-medium">সাইজ:</span> {product?.size || "N/A"} |{" "}
            <span className="font-medium">রঙ:</span>{" "}
            <span
              className="inline-block w-4 h-4 rounded-full ml-1"
              style={{ backgroundColor: product?.color || "#ccc" }}
              title={product?.color || "N/A"}
            ></span>
          </p>
       </div>)}
        {/* Product Total Price */}
        <p className=" text-lg font-semibold text-[#f45142]">
          ৳
          {calculateTotalPurchasePrice()}
        </p>
      </div>
    ))}
  </div>
</div>

<div className="mt-10 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-center">
        <RiMoneyDollarCircleLine className="mr-2 text-emerald-600 text-3xl" />
        রিসেলার প্রফিট তথ্য
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiShoppingCartLine className="mr-2 text-emerald-600" />
            মোট ক্রয়মূল্য:
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{order.totalAmount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiMoneyDollarCircleLine className="mr-2 text-emerald-600" />
            মোট বিক্রয়মূল্য:
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{calculateTotalPurchasePrice()}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiShoppingCartLine className="mr-2 text-emerald-600" />
            শিপিং চার্জ :
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{order.shippingCharge}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiArrowUpCircleLine className="mr-2 text-emerald-600" />
            মোট লাভ:
          </p>
          <p className="text-2xl font-bold text-emerald-600 animate-pulse">৳{calculateTotalProfit()}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiPercentLine className="mr-2 text-emerald-600" />
            লাভের শতকরা হার:
          </p>
          <p className="text-2xl font-bold text-emerald-600 animate-pulse">{calculateProfitPercentage()}%</p>
        </div>
      </div>
    </div>
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center bg-indigo-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <BsCreditCard className="text-[#f45142] text-2xl" />
              <span className="text-gray-600">পেমেন্ট মেথড:</span>
              <span className="font-semibold text-gray-800">{order?.paymentMethod || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <RiMoneyDollarCircleLine className="text-green-500 text-3xl" />
              <p className="text-2xl font-bold text-green-600">
                মোট মূল্য: ৳{calculateTotalPurchasePrice()}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#f45142]" />
                শিপিং ঠিকানা
              </h2>
              <p className="text-gray-600">{order?.customerName}</p>
              <p className="text-gray-600">{order?.shippingAddress}</p>
              <p className="text-gray-600 mt-2 flex items-center">
                <FaPhoneAlt className="mr-2 text-purple-600" />
                {order?.phoneNumber}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BsTruck className="mr-2 text-blue-600" />
                শিপিং তথ্য
              </h2>
              <p className="text-gray-600">কুরিয়ার সার্ভিস: {order?.courierService || "N/A"}</p>
              {/* <p className="text-gray-600 mt-2">ট্র্যাকিং নম্বর: {order?.trackingNumber || "N/A"}</p> */}

               <p className="text-gray-600 mt-1">কুরিয়ার চার্জ প্রদান করা হয়েছে?: {order?.CustomerDeliveryCharge? 'হ্যাঁ' : 'না' }</p>
            </div>
          </div>

          <div className="mt-10 bg-yellow-50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaNotesMedical className="mr-2 text-yellow-600" />
              অতিরিক্ত তথ্য
            </h2>
            <p className="text-gray-600 mb-4">{order?.notes || "কোনো নোট নেই"}</p>
            <div className="flex items-center">
              <FaTags className="mr-2 text-yellow-600" />
              <div className="flex flex-wrap gap-2">
                {order?.tags?.map((tag, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

     
            <div className="mt-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">অর্ডার স্ট্যাটাস আপডেট</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <select
                onChange={(e) => setNewStatus(e.target.value)}
                value={newStatus}
                className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-300 ease-in-out"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="w-full sm:w-auto bg-[#f45142] text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              >
                আপডেট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;