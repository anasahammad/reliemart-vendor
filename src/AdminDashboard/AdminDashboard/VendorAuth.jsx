import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import VendorLogin from './common/VendorLogin';
import VendorRegistration from './VendorRegistration';


const VendorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = '#f0f4f8';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Vendor Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Access your account" : "Create your account"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-full ${
                isLogin
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-full ${
                !isLogin
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Sign Up
            </motion.button>
          </div>

          {isLogin ? <VendorLogin /> : <VendorRegistration setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};

export default VendorAuth;