import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoReorderFourSharp } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AdminDashboardHeader({ handleCallNav }) {
  const [callNotifiction, setCallNotifiction] = useState(false);
  return (
    <div className="relative">
    <div className="w-full h-[60px]  p-3 px-5 flex shadow-md justify-between items-center border-b  bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="flex justify-start items-center">
        <span
          onClick={() => handleCallNav(true)}
          className="p-1 block md:hidden cursor-pointer rounded-md border"
        >
          <IoReorderFourSharp />
        </span>
        <Link target="_blank" to="https://relifemart.com/" className=" font-semibold text-gray-600 hidden md:block">
          Customer Ui
        </Link>
      </div>
      
      <div className="flex justify-end items-center gap-3">
        <div className="flex justify-center items-center">
          <span className="text-xl block md:hidden cursor-pointer p-1">
            <FiSearch />
          </span>
          <span
            onClick={() => setCallNotifiction(!callNotifiction)}
            className={`p-2 my-auto relative cursor-pointer rounded-md ml-2 border`}
          >
            <span className="absolute p-1 rounded-full bg-[#30425a] top-0 right-0"></span>
            <MdOutlineNotificationsActive />
          </span>
        </div>
      </div>
      <div
        className={`w-[calc(100%-40px)] sm:w-[350px] ${
          callNotifiction ? "block" : "hidden"
        }  rounded-md shadow-md z-50 max-h-[500px] overflow-y-auto bg-white absolute border top-[50px] right-5`}
      >
        <div className="p-2 border-b">
          <h3>Notifections</h3>
        </div>
        <div className="p-3"></div>
      </div>

    
    </div>

     
    </div>
  );
}
