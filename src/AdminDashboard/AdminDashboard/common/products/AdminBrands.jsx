

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BrandManager = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesById, setSubcategoriesById] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState(""); // For selecting subcategory for brand
  const [formData, setFormData] = useState({ name: "" });
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandsBySubcategory, setBrandsBySubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://reseller-backend-zeta.vercel.app/api/v4/category");
      setCategories(response.data);
    } catch (err) {
      setError("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (categoryId) fetchSubcategoriesByCategoryId();
  }, [categoryId]);

  const fetchSubcategoriesByCategoryId = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/subCategory/category/${categoryId}`
      );
      setSubcategoriesById(response.data.data);
    } catch (err) {
      setError("Error fetching subcategories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch brands based on subcategory
  useEffect(() => {
    if (subcategoryId) fetchBrandsBySubcategory();
  }, [subcategoryId]);

  const fetchBrandsBySubcategory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/brand/subcat/${subcategoryId}`
      );
      setBrandsBySubcategory(response.data.data);
    } catch (err) {
      setError("brands not found");
    } finally {
      setLoading(false);
    }
  };

  // Handle create or update brand
  const handleCreateOrUpdateBrand = async () => {
    if (!subcategoryId || !formData.name.trim()) {
      toast.error("Please fill in the Name fields.");
      return;
    }
    setLoading(true);
    try {
      if (editingBrand) {
        await axios.put(
          `https://reseller-backend-zeta.vercel.app/api/v4/brand/${editingBrand._id}`,
          formData
        );
        toast.success("Brand edited successfully!");
      } else {
        await axios.post(`https://reseller-backend-zeta.vercel.app/api/v4/brand/${subcategoryId}`, {
          ...formData,
          subcategory: subcategoryId,
        });
        toast.success("Brand created successfully!");
      }
      fetchBrandsBySubcategory();
      resetForm();
    } catch (err) {
      setError("Error saving brand.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete brand
  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await axios.delete(`https://reseller-backend-zeta.vercel.app/api/v4/brand/${id}`);
      fetchBrandsBySubcategory();
    } catch (err) {
      setError("Error deleting brand.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form after add/edit
  const resetForm = () => {
    setFormData({ name: "" });
    setEditingBrand(null);
  };

  return (
    <div className="min-h-screen  text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Brand Manager</h1>

        {/* Error and Loading */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-400 mb-4">Loading...</p>}

        {/* Category and Subcategory Selection */}
        <div className="bg-gray-300 p-6 rounded-lg shadow-md mb-6">
          <select
            className="w-full p-3 mb-4 rounded-lg bg-gray-200 text-gray-800 border border-gray-700 focus:outline-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Subcategory Selection */}
          {categoryId && (
            <select
              className="w-full p-3 mb-4 rounded-lg bg-gray-200 text-gray-800 border border-gray-700 focus:outline-none"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              <option value="">Select a subcategory</option>
              {subcategoriesById.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          )}

          {/* Brand Name Input */}
          {subcategoryId && (
            <>
              <input
                type="text"
                placeholder="Brand Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 mb-4 rounded-lg bg-gray-200 border-gray-700"
              />

              <button
                onClick={handleCreateOrUpdateBrand}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-gray-700 ${
                  editingBrand
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {editingBrand ? "Update Brand" : "Add Brand"}
              </button>
            </>
          )}
        </div>

        {/* Brands List */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Brands</h2>
          {brandsBySubcategory?.length === 0 ? (
            <p className="text-gray-600">No brands available.</p>
          ) : (
            <ul className="space-y-4">
              {brandsBySubcategory?.map((brand) => (
                <li
                  key={brand._id}
                  className="flex justify-between items-center border border-gray-800 p-4 rounded-lg"
                >
                  <div>
                    <p>{brand.name}</p>
                  </div>
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setEditingBrand(brand);
                        setFormData({ name: brand.name });
                      }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(brand._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandManager;

