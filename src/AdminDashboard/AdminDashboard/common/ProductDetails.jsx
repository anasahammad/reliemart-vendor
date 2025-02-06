import {
    FaTruck,
    FaCreditCard,
    FaDollarSign,
    FaPhoneAlt,
    FaRegCalendarAlt,
    FaBoxOpen,
    FaUserAlt,
  } from "react-icons/fa";
  
  export default function ProductDetails() {
    const orderData = {
      orderId: "ORD123456",
      orderDate: "2024-11-22",
      totalAmount: "150.00",
      paymentStatus: "Paid",
      shippingStatus: "Shipped",
      customerInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        shippingAddress: "123 Main St, City, Country",
        billingAddress: "456 Billing St, City, Country",
        phoneNumber: "123-456-7890",
      },
      items: [
        {
          productName: "Product 1",
          quantity: 2,
          price: 50,
          sku: "P12345",
          variant: "Size: M, Color: Red",
          productImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s",
        },
        {
          productName: "Product 2",
          quantity: 1,
          price: 50,
          sku: "P67890",
          variant: "Size: L, Color: Blue",
          productImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfri7esL5ir1SGRzYx1t7O32_4SEfUGyRfLQ&s",
        },
      ],
      shippingInfo: {
        shippingMethod: "Standard Shipping",
        trackingNumber: "TRACK123",
        shippingCarrier: "Carrier XYZ",
        estimatedDeliveryDate: "2024-11-30",
      },
      orderStatus: "Shipped",
      paymentInfo: {
        paymentMethod: "Credit Card",
        paymentConfirmation: "Confirmed",
        transactionId: "TX12345678",
        refundStatus: "Not Applicable",
      },
      returnInfo: {
        returnRequest: "No",
        refundAmount: null,
        refundStatus: null,
        reasonForReturn: null,
      },
    };
  
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl space-y-6">
          {/* Order Overview */}
          <div className="bg-blue-100 rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaBoxOpen className="text-blue-600 text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            </div>
            <div className="text-gray-600">
              <p>
                Order ID:{" "}
                <span className="font-semibold">{orderData.orderId}</span>
              </p>
              <p>
                Order Date:{" "}
                <span className="font-semibold">{orderData.orderDate}</span>
              </p>
            </div>
          </div>
  
          {/* Total Amount & Payment Status */}
          <div className="bg-gray-100 rounded-lg p-6 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              Total Amount:{" "}
              <span className="text-blue-600">{orderData.totalAmount} USD</span>
            </div>
            <div className="text-sm text-gray-500">
              Payment Status:{" "}
              <span className="font-semibold">{orderData.paymentStatus}</span>
            </div>
          </div>
  
          {/* Customer Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Customer Information
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <FaUserAlt className="text-gray-600 text-xl" />
                <p className="text-gray-600">{orderData.customerInfo.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-gray-600 text-xl" />
                <p className="text-gray-600">
                  {orderData.customerInfo.phoneNumber}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaRegCalendarAlt className="text-gray-600 text-xl" />
                <p className="text-gray-600">{orderData.customerInfo.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Shipping Address:</h3>
                <p className="text-gray-600">
                  {orderData.customerInfo.shippingAddress}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Billing Address:</h3>
                <p className="text-gray-600">
                  {orderData.customerInfo.billingAddress}
                </p>
              </div>
            </div>
          </div>
  
          {/* Items in the Order */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Items in the Order
            </h2>
            {orderData.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
              >
                {/* Product Image */}
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-[120px] h-[120px] object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">
                    Price per Unit: {item.price} USD
                  </p>
                  <p className="text-gray-600">SKU: {item.sku}</p>
                  <p className="text-gray-600">Variant: {item.variant}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Shipping Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Shipping Information
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg ">
              <div className="flex items-center space-x-3">
                <FaTruck className="text-gray-600 text-xl" />
                <p className="text-gray-600">
                  Shipping Method:{" "}
                  <span className="font-semibold">
                    {orderData.shippingInfo.shippingMethod}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Tracking Number:{" "}
                  <span className="font-semibold">
                    {orderData.shippingInfo.trackingNumber}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Shipping Carrier:{" "}
                  <span className="font-semibold">
                    {orderData.shippingInfo.shippingCarrier}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaRegCalendarAlt className="text-gray-600 text-xl" />
                <p className="text-gray-600">
                  Estimated Delivery:{" "}
                  <span className="font-semibold">
                    {orderData.shippingInfo.estimatedDeliveryDate}
                  </span>
                </p>
              </div>
            </div>
          </div>
  
          {/* Order Status */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Status</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-lg font-semibold text-green-600">
                {orderData.orderStatus}
              </div>
            </div>
          </div>
  
          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Information
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-600 text-xl" />
                <p className="text-gray-600">
                  Payment Method:{" "}
                  <span className="font-semibold">
                    {orderData.paymentInfo.paymentMethod}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Payment Confirmation:{" "}
                  <span className="font-semibold">
                    {orderData.paymentInfo.paymentConfirmation}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Transaction ID:{" "}
                  <span className="font-semibold">
                    {orderData.paymentInfo.transactionId}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Refund Status:{" "}
                  <span className="font-semibold">
                    {orderData.paymentInfo.refundStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
  
          {/* Manage Returns & Refunds */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Manage Returns & Refunds
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg ">
              <div className="flex items-center space-x-3">
                <p className="text-gray-600">
                  Return Request:{" "}
                  <span className="font-semibold">
                    {orderData.returnInfo.returnRequest}
                  </span>
                </p>
              </div>
              {orderData.returnInfo.refundAmount && (
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="text-gray-600 text-xl" />
                  <p className="text-gray-600">
                    Refund Amount:{" "}
                    <span className="font-semibold">
                      {orderData.returnInfo.refundAmount} USD
                    </span>
                  </p>
                </div>
              )}
              {orderData.returnInfo.refundStatus && (
                <div className="flex items-center space-x-3">
                  <p className="text-gray-600">
                    Refund Status:{" "}
                    <span className="font-semibold">
                      {orderData.returnInfo.refundStatus}
                    </span>
                  </p>
                </div>
              )}
              {orderData.returnInfo.reasonForReturn && (
                <div className="flex items-center space-x-3">
                  <p className="text-gray-600">
                    Reason for Return:{" "}
                    <span className="font-semibold">
                      {orderData.returnInfo.reasonForReturn}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  