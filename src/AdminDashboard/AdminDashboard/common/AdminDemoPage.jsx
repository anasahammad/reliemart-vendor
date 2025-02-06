





import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUserByIdForReseller } from "../../../services/index/users";




const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
 const [error, setError] = useState();

  const [accounts, setAccounts] = useState();
  const userState = useSelector((state) => state.user);

  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("adminAccount"));
  const resellerId = userInfo?.user?._id;
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUserByIdForReseller(resellerId);
          console.log(userData.user)
          setAccounts(userData.user);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchUser();
    }, [resellerId]);


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Profile Section */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
          <FaRegEdit size={40} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-semibold mt-2">{accounts?.name || "N/A"}</h2>
        <p className="text-gray-600">{accounts?.email || "N/A"}</p>
        <p className="text-sm text-gray-500 mt-1">
          Address: {accounts?.address || "N/A"}
        </p>
      
      </div>



      <button
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Close Edit Info" : "Edit Profile Info"}
      </button>

      {isEditing && (
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              defaultValue="Shakil Sikder"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              defaultValue="shakilsikder525@gmail.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              defaultValue="01890533479"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shop Name *</label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Of Birth *</label>
            <input
              type="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address *</label>
            <textarea
              placeholder="Enter Address"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile *</label>
            <input type="file" className="mt-1 block w-full text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NID *</label>
            <input type="file" className="mt-1 block w-full text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Refer Code *</label>
              <input
                type="text"
                value="SHARR00329"
                disabled
                className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Refer By *</label>
              <input
                type="text"
                value="DOKANAMR"
                disabled
                className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Update
          </button>
        </form>
      )}




    </div>
  );
};

export default AdminProfile;

