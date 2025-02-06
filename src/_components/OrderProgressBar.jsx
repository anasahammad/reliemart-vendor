import React from 'react';
import { FiShoppingCart, FiPackage, FiTruck, FiCheck } from 'react-icons/fi';

const orderStatuses = [
  { status: 'placed', name: 'অর্ডার গ্রহণ করা হয়েছে', icon: FiShoppingCart },
  { status: 'processing', name: 'অর্ডার প্রসেসিং এ আছে', icon: FiPackage },
  { status: 'shipped', name: 'অর্ডার শিপিং এ আছে', icon: FiTruck },
  { status: 'delivered', name: 'ডেলিভারি সম্পন্ন হয়েছে', icon: FiCheck },
] ;



const OrderProgressBar = ({ currentStatus }) => {
  const currentStepIndex = orderStatuses.findIndex(step => step.status === currentStatus);

  return (
    <div className=" max-w-4xl mx-auto p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
        <ul className="relative flex justify-between">
          {orderStatuses.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrentStep = index === currentStepIndex;
            return (
              <li key={step.status} className="text-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-indigo-600 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    } ${
                      isCurrentStep ? 'animate-pulse shadow-lg ring-4 ring-purple-200' : ''
                    } transition-all duration-500 ease-in-out transform hover:scale-110`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <p
                    className={`mt-3 text-sm font-medium ${
                      isActive ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < orderStatuses.length - 1 && (
                  <div
                    className={`hidden sm:block absolute top-0 right-0 h-1 w-full -translate-y-8 transform ${
                      isActive ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-gray-300'
                    } transition-all duration-500 ease-in-out`}
                    style={{ width: `${100 / (orderStatuses.length - 1)}%`, left: `${(100 / (orderStatuses.length - 1)) * (index + 1)}%` }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderProgressBar;
// Example usage
// export default function OrderStatusDisplay() {
//   // This would typically come from your backend or state management
//   const orderStatus = 'PROCESSING';

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8">Order Status</h1>
//       <OrderProgressBar currentStatus={orderStatus} />
//       <p className="mt-8 text-lg text-gray-600">
//         Current Status: <span className="font-semibold text-indigo-600">{orderStatus}</span>
//       </p>
//     </div>
//   );
// }