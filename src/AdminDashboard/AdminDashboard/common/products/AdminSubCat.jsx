import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SubcategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesById, setSubcategoriesById] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingSubcategory, setEditingSubcategory] = useState(null);
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

  // Fetch subcategories based on category
  useEffect(() => {
    if (categoryId) fetchSubcategoriesById();
  }, [categoryId]);

  const fetchSubcategoriesById = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/subCategory/category/${categoryId}`
      );
      console.log(response)
      setSubcategoriesById(response.data.data);
    } catch (err) {
      setError("subcategories not found");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!categoryId || !formData.name.trim() ) {
      toast.error("Please fill in the Name fields.");
      return;
    }
    setLoading(true);
    try {
      if (editingSubcategory) {
        await axios.put(
          `https://reseller-backend-zeta.vercel.app/api/v4/subcategory/${editingSubcategory._id}`,
          formData
        );
        toast.success("sub Category edited")
      } else {
        await axios.post(`https://reseller-backend-zeta.vercel.app/api/v4/subcategory/${categoryId}`, {
          ...formData,
          category: categoryId,
        });
        toast.success("sub Category Created")
      }
      fetchSubcategoriesById();
      toast.success("sub Category Updated")
      resetForm();
    } catch (err) {
      setError("Error saving subcategory.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await axios.delete(`https://reseller-backend-zeta.vercel.app/api/v4/subCategory/${id}`);
      fetchSubcategoriesById();
    } catch (err) {
      setError("Error deleting subcategory.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditingSubcategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 shadow-md text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Subcategory Manager</h1>

        {/* Error and Loading */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-400 mb-4">Loading...</p>}

        {/* Category Selection */}
        <div className=" p-6 rounded-lg bg-gray-100 shadow-md mb-6">
          <select
            className="w-full p-3 mb-4 rounded-lg  text-gray-900 border border-gray-700 focus:outline-none"
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

          {/* Input Fields */}
          {categoryId && (
            <>
              <input
                type="text"
                placeholder="Subcategory Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 mb-4 rounded-lg  border-gray-700"
              />
              <textarea
                placeholder="Subcategory Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 mb-4 rounded-lg  border-gray-700"
              ></textarea>

              <button
                onClick={handleCreateOrUpdate}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-gray-800 ${
                  editingSubcategory
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {editingSubcategory ? "Update Subcategory" : "Add Subcategory"}
              </button>
            </>
          )}
        </div>

        {/* Subcategories List */}
        <div className=" p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
          {subcategoriesById?.length === 0 ? (
            <p className="text-gray-400">No subcategories available.</p>
          ) : (
            <ul className="space-y-4">
              {subcategoriesById?.map((sub) => (
                <li
                  key={sub._id}
                  className="flex justify-between items-center border border-gray-800 p-4 rounded-lg"
                >
                  <div>
                    <p>{sub.name}</p>
                    {sub.description && (
                      <p className="text-gray-400">{sub.description}</p>
                    )}
                  </div>
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setEditingSubcategory(sub);
                        setFormData({ name: sub.name, description: sub.description });
                      }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubcategory(sub._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-gray-800"
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

export default SubcategoryManager;
