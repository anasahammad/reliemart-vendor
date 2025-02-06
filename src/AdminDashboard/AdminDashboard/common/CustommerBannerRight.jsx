import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaTrash, FaImage } from "react-icons/fa";



const CustomerBannerRight = () => {
  const [topBanners, setTopBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, position: null });
  const [uploadPosition, setUploadPosition] = useState('');

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drbtvputr/upload";
  const CLOUDINARY_PRESET = "rowshanara";

  const fetchBanners = async () => {
    try {
      const topResponse = await axios.get(`${import.meta.env.VITE_API_URL}/customer-banner/top/banners`);
      setTopBanners(topResponse.data);
      const bottomResponse = await axios.get(`${import.meta.env.VITE_API_URL}/customer-banner/bottom/banners`);
      setBottomBanners(bottomResponse.data);
    } catch (error) {
      toast.error("Error fetching banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []); //Fixed: Added empty dependency array to useEffect

  const uploadPhoto = async () => {
    if (!selectedFile) return toast.error("Please select a file first.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
      const { secure_url } = cloudinaryResponse.data;

      await axios.post(`${import.meta.env.VITE_API_URL}/customer-banner/${uploadPosition}/upload`, {
        imageUrl: secure_url
      });

      toast.success("Banner uploaded successfully.");
      fetchBanners();
    } catch (error) {
      toast.error("Error uploading banner");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const deletePhoto = async (id, position) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/customer-banner/${position}/delete/${id}`);
      toast.success("Banner deleted successfully.");
      fetchBanners();
    } catch (error) {
      toast.error("Error deleting banner");
    }
    setDeleteModal({ show: false, id: null, position: null });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Customer Right Side Banner Management
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Manage your top and bottom right side banner images easily.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out">
                <FaCloudUploadAlt className="mr-2" />
                <span>Choose File</span>
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Banner Position</label>
              <select
                value={uploadPosition}
                onChange={(e) => setUploadPosition(e.target.value )}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            {preview && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Preview:</h2>
                <img src={preview || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
              </div>
            )}

            <button
              onClick={uploadPhoto}
              disabled={loading || !selectedFile}
              className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${loading || !selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Uploading..." : "Upload Banner"}
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Current Banners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {topBanners?.map((banner) => (
              <motion.div
                key={banner._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <img src={banner.imageUrl || "/placeholder.svg"} alt={`Banner Top`} className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105" />
                <button
                  onClick={() => setDeleteModal({ show: true, id: banner._id, position: 'top' })}
                  className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
            {bottomBanners?.map((banner) => (
              <motion.div
                key={banner._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <img src={banner.imageUrl || "/placeholder.svg"} alt={`Banner Bottom`} className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105" />
                <button
                  onClick={() => setDeleteModal({ show: true, id: banner._id, position: 'bottom' })}
                  className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this banner?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null, position: null })}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteModal.id && deleteModal.position && deletePhoto(deleteModal.id, deleteModal.position)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {(topBanners.length === 0 && bottomBanners.length === 0) && (
        <div className="text-center py-12">
          <FaImage className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-xl text-gray-500">No banners uploaded yet.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerBannerRight;