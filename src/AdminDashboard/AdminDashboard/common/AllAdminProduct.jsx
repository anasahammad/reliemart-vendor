import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaBox, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; 

export default function AdminProductPage() {
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/products`
      );
      return response.data.data;
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      await axios.delete(
        `https://reseller-backend-zeta.vercel.app/api/v4/products/${productId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = data?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5]">
      <div className="flex lg:flex-row flex-col items-center justify-between bg-white p-4 lg:gap-10 gap-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <FaBox className="text-blue-600 text-xl" />
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {categoryname} Products
          </h1>
        </div>
        <div className="w-full flex items-center bg-gray-100 px-3 py-2 rounded-md shadow-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-gray-500 flex justify-start items-center gap-2 mt-1">
                for Customer:{" "}
                <span className="text-green-500">{product.MainCashDiscountPrice}</span>
              </p>
              <p className="text-gray-500 flex justify-start items-center gap-2">
                for reseller:{" "}
                <span className="text-green-500">{product.resellerPrice}</span>
              </p>
              <div className="flex justify-center items-center gap-2 mt-2">
              <button
                onClick={() =>
                  navigate(
                    // Redirect to product details page (if needed)
                  )
                }
                className=" w-full text-sm bg-blue-600 text-white py-1 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                View Details
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className=" w-full text-sm bg-red-600 text-white py-1 rounded-md shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
