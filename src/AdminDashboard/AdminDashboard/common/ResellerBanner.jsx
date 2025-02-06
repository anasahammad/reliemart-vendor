import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaTrash, FaImage } from "react-icons/fa";

const ResellerBanner = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drbtvputr/upload";
  const CLOUDINARY_PRESET = "rowshanara";

  const fetchBannerPhotos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerBanner`);
      setBannerPhotos(response.data || []);
    } catch (error) {
      toast.error("Error fetching banner photos");
    }
  };

  useEffect(() => {
    fetchBannerPhotos();
  }, []);

  const uploadPhoto = async () => {
    if (!selectedFile) return toast.error("Please select a file first.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
      const { secure_url } = cloudinaryResponse.data;

      const updatedPhotos = [...bannerPhotos, secure_url];
      await axios.post(`${import.meta.env.VITE_API_URL}/resellerBanner`, { bannerPhoto: updatedPhotos });

      toast.success("Photo uploaded successfully.");
      fetchBannerPhotos();
    } catch (error) {
      toast.error("Error uploading photo");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const deletePhoto = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/resellerBanner/${id}`);
      toast.success("Photo deleted successfully.");
      fetchBannerPhotos();
    } catch (error) {
      toast.error("Error deleting photo");
    }
    setDeleteModal({ show: false, id: null });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const aspectRatio = image.width / image.height;
        if (aspectRatio.toFixed(2) === (16 / 9).toFixed(2)) {
          setSelectedFile(file);
          setPreview(image.src);
        } else {
          toast.error("Please upload an image with a 16:9 aspect ratio.");
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Reseller Banner Photo Manager
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Easily manage your banner photos with our intuitive interface. Upload, preview, and delete images with just a few clicks.
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

            {preview && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Preview:</h2>
                <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
              </div>
            )}

            <button
              onClick={uploadPhoto}
              disabled={loading || !selectedFile}
              className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${loading || !selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Photo"
              )}
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Current Banner Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bannerPhotos.map((photo, index) => (
              <motion.div
                key={photo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <img src={photo.bannerPhoto} alt={`Banner ${index + 1}`} className="w-full h-auto rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105" />
                <button
                  onClick={() => setDeleteModal({ show: true, id: photo._id })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
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
              <p className="mb-6">Are you sure you want to delete this photo?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null })}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePhoto(deleteModal.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {bannerPhotos.length === 0 && (
        <div className="text-center py-12">
          <FaImage className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-xl text-gray-500">No banner photos uploaded yet.</p>
        </div>
      )}
    </div>
  );
};

export default ResellerBanner;