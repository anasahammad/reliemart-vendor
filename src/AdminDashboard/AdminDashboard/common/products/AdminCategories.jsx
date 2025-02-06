import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const AdminCategories = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [photo, setPhoto] = useState(null); // For image upload
    const [isUploading, setIsUploading] = useState(false);

    const IMGBB_API_KEY = "572cbdd219d0fca730f35a7b498fc3a5"; // Replace with your imgbb API key

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://reseller-backend-zeta.vercel.app/api/v4/category");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handle image upload to imgbb
    const uploadImage = async () => {
        if (!photo) return null;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", photo);
        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
            setIsUploading(false);
            return response.data.data.url; // Return the URL of the uploaded image
        } catch (error) {
            setIsUploading(false);
            console.error("Error uploading image:", error);
            return null;
        }
    };

    // Add a new category
    const handleCreateCategory = async () => {
        if (!categoryName.trim()) return alert("Category name cannot be empty!");
        const uploadedImageUrl = await uploadImage(); // Upload the image and get the URL
        if (!uploadedImageUrl) return alert("Failed to upload image!");

        try {
            const response = await axios.post("https://reseller-backend-zeta.vercel.app/api/v4/category", {
                name: categoryName,
                photo: uploadedImageUrl,
            });
            setCategories([...categories, response.data]);
            setCategoryName("");
            setPhoto(null);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    // Update category
    const handleUpdateCategory = async () => {
        if (!editingCategory || !categoryName.trim()) return;
        const uploadedImageUrl = photo ? await uploadImage() : editingCategory.photo; // Only upload a new image if changed
        if (photo && !uploadedImageUrl) return alert("Failed to upload image!");

        try {
            const response = await axios.put(`https://reseller-backend-zeta.vercel.app/api/v4/category/${editingCategory._id}`, {
                name: categoryName,
                photo: uploadedImageUrl,
            });
            setCategories(categories.map((cat) => (cat._id === editingCategory._id ? response.data : cat)));
            setEditingCategory(null);
            setCategoryName("");
            setPhoto(null);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    // Delete category
    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`https://reseller-backend-zeta.vercel.app/api/v4/category/${id}`);
            setCategories(categories.filter((cat) => cat._id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Filter categories based on the search query
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 min-h-screen  text-gray-900">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categories Management</h1>

            {/* Add New Category */}
            <div className="mb-4 flex lg:flex-row  flex-col lg:space-x-2 space-y-2">
                <input
                    type="text"
                    className="lg:w-[40%] w-full p-1 border border-gray-700 rounded bg-transparent text-gray-900 focus:outline-none focus:ring focus:ring-orange-600 "
                    placeholder="Add a new category..."
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="p-2 border lg:w-[40%] w-full  border-gray-700 rounded bg-transparent text-gray-900 focus:outline-none"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <button
                    className="p-2 bg-orange-600 lg:w-[20%] w-full flex justify-center items-center font-semibold gap-2 text-gray-800 rounded hover:bg-orange-500"
                    onClick={handleCreateCategory}
                >
                    Create <FaPlus />
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center mb-4 space-x-2">
                <FaSearch className="text-gray-900" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="p-2 border border-gray-700 rounded bg-transparent text-gray-900 focus:outline-none focus:ring focus:ring-orange-600 w-full lg:w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-700 text-gray-900">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border border-gray-700">Photo</th>
                            <th className="p-3 border border-gray-700">Category Name</th>
                            <th className="p-3 border border-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-200">
                                    <td className="p-3 border border-gray-700">
                                    {category.photo && <img src={category.photo} alt={category.name} className="w-16 h-16 rounded-lg mt-2" />}
                                    </td>
                                    <td className="p-3 border border-gray-700">{category.name}</td>
                                    <td className="p-3  border-gray-700 flex space-x-2 ">
                                        <button
                                            className="p-1 rounded bg-orange-600 text-gray-100 hover:bg-orange-500"
                                            onClick={() => {
                                                setEditingCategory(category);
                                                setCategoryName(category.name);
                                                setPhoto(null); // Reset photo input when editing
                                            }}
                                            title="Edit Category"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="p-1 rounded bg-red-600 text-gray-100 hover:bg-red-500"
                                            onClick={() => handleDeleteCategory(category._id)}
                                            title="Delete Category"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-3 border border-gray-700">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Category Button */}
            {editingCategory && (
                <div className="mt-4  p-6 rounded-lg shadow-md">
                    <button
                        onClick={handleUpdateCategory}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
                    >
                        Update Category
                    </button>
                </div>
            )}
        </div>
        
    );
};

export default AdminCategories;
