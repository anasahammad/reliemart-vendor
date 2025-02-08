import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getUserByIdForReseller } from "../../../services/index/users";
import {
  FaPhone, FaUserCircle, FaTachometerAlt, FaBoxOpen, FaWallet, 
  FaTruck, FaUsers,  FaCogs, FaHeadphonesAlt, FaInfoCircle,
   FaProductHunt, 
} from "react-icons/fa";
import {
  
  MdGroup,  MdLogout, MdExpandMore,
  MdSupportAgent
} from "react-icons/md";


const navItems = [
 
  { name: "Dashboard", path: "/vendor/dashboard", icon: <FaTachometerAlt /> },

  { name: "All Products", path: "/vendor/all-product", icon: <FaBoxOpen /> },
  { name: "Balance", path: "/vendor/balance", icon: <FaWallet /> },
 
 
  { name: "Team Management", path: "/vendor/team", icon: <MdGroup /> },
  
 

  //products

  {
    name: "Products",
    path: "/vendor/product",
    icon: <FaProductHunt />,
    children: [
     
      {
        name: "Products",
        path: "/vendor/product",
        icon: <FaProductHunt />,
      },
      {
        name: "Categories",
        path: "/vendor/product/cat",
        icon: <FaProductHunt />,
      },
      {
        name: "Sub-Categories",
        path: "/vendor/product/sub-cat",
        icon: <FaProductHunt />,
      },
      {
        name: "Brands",
        path: "/vendor/product/brands",
        icon: <FaProductHunt />,
      },
    ],
  },
  
  
 

  { name: "Order Tracking", path: "/vendor/order-tracking", icon: <FaTruck /> },
  { name: "Customer Checker", path: "/vendor/customer-checker", icon: <FaUsers /> },
 
  
  { name: "Settings", path: "/vendor/settings", icon: <FaCogs /> },
  { name: "Service", path: "/vendor/service", icon: <FaHeadphonesAlt /> },
  { name: "Support", path: "/vendor/support", icon: <MdSupportAgent /> },
  { name: "About Us", path: "/vendor/about-us", icon: <FaInfoCircle /> },
 
];

export default function AdminSiteNavBar({ handleCallNav, logoutHandler }) {
  const [openMenu, setOpenMenu] = useState({});
  const [accounts, setAccounts] = useState();
  const [error, setError] = useState();
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("vendorAccount"));
  const resellerId = userInfo?.user?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        setAccounts(userData.user);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, [resellerId]);

  const toggleMenu = (index) => {
    setOpenMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full h-full bg-[#223344] p-4 flex flex-col gap-2 shadow-lg "
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Relifemart</h2>
      </div>
      <div className=" rounded-lg p-2 bg-[#696AF6] shadow-md mb-3">
        <div className="flex items-center gap-4">
          <img
            src={accounts?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"}
            alt="Relifemart"
            className="w-16 h-16 rounded-full border-4 border-purple-500 object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{accounts?.name || "N/A"}</h3>
            <div className="flex items-center text-white mt-1">
              <FaPhone className="text-purple-600 mr-2" />
              <span>{accounts?.phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {navItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.children ? (
              <div
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  openMenu[index] ? "bg-[#696AF6] text-white" : " hover:bg-[#696AF6]"
                }`}
              >
                <div
                  className="p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMenu(index)}
                >
                  <div className="flex items-center gap-3">
                    {React.cloneElement(item.icon, { className: `text-xl ${openMenu[index] ? "text-white" : "text-white"}` })}
                    <span className={`font-medium ${openMenu[index] ? "text-white" : "text-white"}`}>{item.name}</span>
                  </div>
                  <MdExpandMore className={`text-xl transition-transform duration-300 ${openMenu[index] ? "rotate-180 text-white" : "text-white"}`} />
                </div>
                {openMenu[index] && (
                  <div className="">
                    {item.children.map((child, idx) => (
                      <NavLink
                        key={idx}
                        to={child.path}
                        onClick={() => handleCallNav(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 pl-8 transition-colors duration-200 ${
                            isActive
                              ? " "
                              : "  hover:text-purple-600"
                          }`
                        }
                      >
                        {React.cloneElement(child.icon, { className: "text-lg" })}
                        <span>{child.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => handleCallNav(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-[#696AF6] text-white"
                      : " text-white hover:bg-[#696AF6] hover:text-white"
                  }`
                }
              >
                {React.cloneElement(item.icon, { className: "text-xl" })}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={logoutHandler}
        className="mt-4 w-full p-3 rounded-lg bg-red-500 text-white flex justify-between items-center hover:bg-red-600 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-2xl" />
          <span className="font-semibold">Logout</span>
        </div>
        <MdLogout className="text-xl" />
      </button>
    </motion.div>
  );
}