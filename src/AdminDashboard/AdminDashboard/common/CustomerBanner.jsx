import { useState, useEffect } from "react";
import axios from "axios";

import { FaCloudUploadAlt, FaInfo, FaTimes, FaTrash } from "react-icons/fa"; // Added icon for upload
import toast from "react-hot-toast";


const CustomerBanner = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of selected files
  const [previewUrls, setPreviewUrls] = useState([]); // Array for preview URLs
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drbtvputr/upload";
  const CLOUDINARY_PRESET = "rowshanara";

  // Fetch banner photos
  const fetchBannerPhotos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bannerPhoto`);
      setBannerPhotos(response.data || []);
    } catch (error) {
      toast.error("Error fetching banner photos:", error);
    }
  };

  useEffect(() => {
    fetchBannerPhotos();
  }, []);

  // Upload a new photo
  // Upload photos
  const uploadPhotos = async () => {
    if (selectedFiles.length === 0) {
      return alert('Please select at least one file');
    }

    setLoading(true);

    try {
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', `${CLOUDINARY_PRESET}`);

        const cloudinaryResponse = await axios.post(`${CLOUDINARY_URL}`, formData);
        const { secure_url } = cloudinaryResponse.data;
        uploadedUrls.push(secure_url);
      }

      // Here you would send the uploaded URLs to your backend to save them
      await axios.post(`${import.meta.env.VITE_API_URL}/bannerPhoto`, {
        bannerPhoto: uploadedUrls,
      });

     alert('Photos uploaded successfully!');
      setSelectedFiles([]); // Clear selected files after upload
      setPreviewUrls([]); // Clear preview URLs
    //   fetchBannerPhotos()
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error('Error uploading photos');
    } finally {
      setLoading(false);
    }
  };
  

  // Delete a photo
  const deletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/bannerPhoto/${id}`);
      alert("Photo deleted successfully.");
      setBannerPhotos(bannerPhotos.filter((photo) => photo._id !== id)); // Update state immediately
    } catch (error) {
      toast.error("Error deleting photo:", error);
    }
  };


const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files); // Convert FileList to array
      const newPreviewUrls = [];
      const validFiles = []; // To store valid files
  
      // Loop through each file to check aspect ratio
      fileArray.forEach((file) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file); // Create object URL for preview
        image.src = objectUrl;
  
        image.onload = () => {
          const aspectRatio = image.width / image.height;
  
          // Check if the aspect ratio is 16:9
          if (aspectRatio.toFixed(2) === (16 / 9).toFixed(2)) {
            validFiles.push(file); // Add valid file
            newPreviewUrls.push(objectUrl); // Add valid file preview
          } else {
           alert("Please upload an image with a 16:9 aspect ratio.");
          }
  
          // Update state only after checking all files
          if (validFiles.length === fileArray.length) {
            setSelectedFiles(validFiles);
            setPreviewUrls(newPreviewUrls); // Update preview URLs
          }
        };
      });
    }
  };
  
  return (
    <div className="p-4">
        <div className="flex justify-start items-center gap-3 mb-6 ">
        <h1 className="text-xl font-bold  ">Cover Photo Manager</h1>
         {/* Upload Rules Button */}
        <button
            onClick={openModal}
            className=" px-4 py-1 text-sm flex justify-start items-center gap- bg-green-500  rounded hover:bg-blue-600 transition"
        >
           <FaInfo></FaInfo> Upload Rules
        </button>
 {/* Modal for Upload Rules */}
 {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Rules</h2>
            <ul className="space-y-2 text-sm">
              <li className="font-semibold">1. Image aspect ratio must be 16:9.</li>
              <li>2. Maximum file size: 10MB.</li>
              <li>3. Supported formats: JPG, PNG, JPEG , webp.</li>
             <li>4. Minimum image resolution: qHD (540 × 960) pixels.</li>
             <li>5. Maximum image resolution: HD (720 × 1280) pixels</li>
             <li>5. Maximum image resolution: Full HD (1080 × 1920) pixels</li>
             <li>5. Maximum image resolution: QHD (1440 × 2560) pixels</li>
             <li>5. Maximum image resolution: 4K UHD (2160 × 3840) pixels</li>
           
            </ul>
          

            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500  rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    

        </div>
    

      <div className="mb-4 w-full max-w-sm">
      <label htmlFor="file-upload" className="cursor-pointer  flex items-center justify-center p-2 border-2 border-dashed rounded-md">
        <FaCloudUploadAlt className="mr-2" />
        {selectedFiles.length > 0 ? 'Change Photos' : 'Select Photos'}
      </label>

      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

        
       {/* {previewUrl && (
          <div className="relative w-full max-w-sm mt-2">
            <img src={previewUrl} alt="Preview" className="w-full h-auto rounded border" />
            <button
              onClick={() => { setSelectedFile(null); setPreviewUrl(null);   window.location.reload();  }} 
              className="absolute w-7 h-7 top-2 right-2 bg-red-500  flex justify-center items-center rounded-full"
            >
               <FaTimes></FaTimes>
            </button>
          </div>
        )}  */}
 <div className="preview-container mt-4">
        {previewUrls.length > 0 && previewUrls.map((url, index) => (
          <div key={index} className="relative mb-4">
            <img src={url} alt={`Preview ${index}`} className="w-full h-auto" />
            <button
              onClick={() => {
                const updatedFiles = selectedFiles.filter((_, i) => i !== index);
                const updatedUrls = previewUrls.filter((_, i) => i !== index);
                setSelectedFiles(updatedFiles);
                setPreviewUrls(updatedUrls);
              }}
              className="absolute top-2 right-2 bg-red-500  px-2 py-1 rounded"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
        <button
          onClick={uploadPhotos}
          disabled={loading || !selectedFiles}
          className={`mt-2 px-4 py-2 bg-blue-500 w-full max-w-sm hover:bg-blue-400  rounded ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
<div className="p-2 rounded-lg border ">
<div className="mt-6 mb-2 text-center font-semibold text-gray-700">All Cover Photos </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bannerPhotos?.map((photoUrl, index) => (
          <div key={index} className="relative border rounded overflow-hidden">
            <img src={photoUrl?.bannerPhoto} alt={`Banner ${index + 1}`} className="w-full h-auto" />
            <button
              title="Delete Photo"
              onClick={() => deletePhoto(photoUrl._id)}
              className="absolute top-2 right-2 bg-red-500  px-2 py-1 border border-white  rounded"
            >
              <FaTrash/>
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CustomerBanner;