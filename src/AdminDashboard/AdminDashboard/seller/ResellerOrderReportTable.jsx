import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ResellerOrderReportTable = () => {
 
  const userState = useSelector((state) => state.user);

  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
//   const resellerId = userInfo?.user?._id;
  const {data:orders = [], isLoading, refetch} = useQuery({
    queryKey: ["seller_orders",],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerOrder/admin/orders`, {withCredentials: true});
      return response.data;
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/resellerOrder/orders/${id}`, {withCredentials: true});
        return response.data;
    },
    onSuccess: () => {
        toast.success("Order deleted successfully");
        refetch();
    },
    onError: (error) => {
        toast.error("Failed to delete order");
    }
  })
  if(isLoading) return <h1>Loading...</h1>

  console.log(orders);
  return (
    <div className="p-0">
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead className="  bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">অর্ডার নাম্বার</th>
              <th className="px-4 py-2 border">রিসেলার নাম</th>
              <th className="px-4 py-2 border">কাস্টোমার নাম</th>
              <th className="px-4 py-2 border">রিসেলার ফোন নাম্বার</th>
              <th className="px-4 py-2 border">রিসেলার কোম্পানি নাম</th>
              <th className="px-4 py-2 border">মূল প্রাইস</th>
              <th className="px-4 py-2 border">অর্ডার তারিখ</th>
           
              <th className="px-4 py-2 border">স্ট্যাটাস</th>
              {/* <th className="px-4 py-2 border">ক্রুইয়ার চেকার</th>
              <th className="px-4 py-2 border">ট্র্যাকিং আইডি</th> */}
              <th className="px-4 py-2 border">একশন</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="text-center border-t">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{order._id.slice(19, 24)}</td>
                <td className="px-4 py-2 border">{order.sellerId?.name}</td>
                <td className="px-4 py-2 border">{order.customerName}</td>
                <td className="px-4 py-2 border">{order.sellerId?.phone}</td>
                <td className="px-4 py-2 border">{order.sellerId?.companyName}</td>
                <td className="px-4 py-2 border">{order?.totalAmount}</td>
                <td className="px-4 py-2 border"> {new Date(order?.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })}</td>
               
                <td className="px-4 py-2 border">
  <span
    className={`px-2 py-1 rounded text-white text-sm ${
      order.status === "pending"
        ? "bg-yellow-500" // Yellow for Pending
        : order.status === "processing"
        ? "bg-blue-500" // Blue for Processing
        : order.status === "confirmed"
        ? "bg-green-500" // Green for Confirmed
        : order.status === "cancelled"
        ? "bg-red-600" // Red for Cancelled
        : "bg-gray-500" // Default (optional)
    }`}
  >
    {order.status}
  </span>
</td>
                {/* <td className="px-4 py-2 border">{order.courier}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <span>{order.trackingId}</span>
                    <button className="bg-[#27374D] text-white px-2 py-1 rounded hover:bg-blue-600">
                       <FaCopy/>
                    </button>
                  </div>
                </td> */}
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button className="  bg-yellow-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                     <Link to={`/admin/reseller/order/${order?._id}`}> View</Link>
                    </button>
                    <button onClick={()=>deleteMutation.mutate(order._id)} className="bg-[#F4511E] text-white px-2 py-1 rounded  ">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResellerOrderReportTable;
