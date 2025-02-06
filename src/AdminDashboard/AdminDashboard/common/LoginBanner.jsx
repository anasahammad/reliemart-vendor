import  { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginBanner = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drbtvputr/upload"; // Replace with your Cloudinary URL
  const CLOUDINARY_PRESET = "rowshanara"; // Replace with your Cloudinary preset

  // Fetch banner photos
  const fetchBannerPhotos = async () => {
    try {
      const response = await axios.get("https://reseller-backend-zeta.vercel.app/api/v4/cover");
      setBannerPhotos(response.data || []); // Assuming `bannerPhoto` is an array
    } catch (error) {
      toast.error("Error fetching banner photos:", error);
    }
  };

  useEffect(() => {
    fetchBannerPhotos();
  }, []);

  // Upload a new photo
  const uploadPhoto = async () => {
    if (!selectedFile) return alert("Please select a file first.");
    setLoading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
      const { secure_url } = cloudinaryResponse.data;

      // Append the new URL to the existing array
      const updatedPhotos = [...bannerPhotos, secure_url];

      // Update backend with the new array
      await axios.post("https://reseller-backend-zeta.vercel.app/api/v4/cover", { bannerPhoto: updatedPhotos });

      toast.success("Photo uploaded successfully.");
      fetchBannerPhotos(); // Refresh photos
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  // Delete a photo
  const deletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
    

      // Update backend with the new array
      await axios.delete(`${import.meta.env.VITE_API_URL}/cover/${id}`,);

      toast.success("Photo deleted successfully.");
      fetchBannerPhotos(); // Refresh photos
    } catch (error) {
      toast.error("Error deleting photo:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const aspectRatio = image.width / image.height;
        if (aspectRatio.toFixed(2) === (16 / 9).toFixed(2)) {
          setSelectedFile(file);
        } else {
          alert("Please upload an image with a 16:9 aspect ratio.");
        }
      };
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reseller Cover Photo Manager</h1>

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          onClick={uploadPhoto}
          disabled={loading || !selectedFile}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bannerPhotos?.map((photoUrl, index) => (
          <div key={index} className="relative border rounded overflow-hidden">
            <img src={photoUrl.bannerPhoto} alt={`Banner ${index + 1}`} className="w-full h-auto" />
            <button
              onClick={() => deletePhoto(photoUrl._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginBanner;
