import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";


const NoticePage = () => {
  const queryClient = useQueryClient();

  const [newNotice, setNewNotice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch the current notice
  const { data: notice, isLoading } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notice`);
      return response.data.data;
    },
  });

  // Mutation to create a notice
  const addMutation = useMutation({
    mutationFn: async (newNotice) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/notice/notice`, {
        content: newNotice,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Notice added successfully!");
      queryClient.invalidateQueries({ queryKey: ["notice"] });
      setNewNotice("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add notice");
    },
  });

  // Mutation to update a notice
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedContent }) => {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/notice/notice/${id}`, {
        content: updatedContent,
      });
      return response.data;
    },
    onSuccess: () => {
        toast.success("Notice updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["notice"] });
      setNewNotice("");
      setIsEditing(false);
      setEditingId(null);
    },
    onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to update notice");
    },
  });

  // Mutation to delete a notice
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/notice/notice/${id}`, {withCredentials: true});
      return response.data;
    },
    onSuccess: () => {
        toast.success("Notice deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notice"] });
      setNewNotice("");
      setIsEditing(false);
      setEditingId(null);
    },
    onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to delete notice");
    },
  });

  const handleAddNotice = () => {
    if (!newNotice.trim()) {
      alert("Notice cannot be empty!");
      return;
    }
    addMutation.mutate(newNotice.trim());
  };

  const handleUpdateNotice = () => {
    if (!newNotice.trim()) {
        toast.error("Notice cannot be empty!");
      return;
    }
    updateMutation.mutate({ id: editingId, updatedContent: newNotice.trim() });
  };

  const handleDeleteNotice = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
        Notice Management
      </h2>

      {/* Display existing notice */}
      {notice ? (
        <div className="mb-6 bg-white p-4 rounded shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Notice:</h3>
          <p className="text-gray-700">{notice.content}</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setIsEditing(true);
                setEditingId(notice._id);
                setNewNotice(notice.content);
              }}
            >
              Update
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeleteNotice(notice._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No notice available. Add a new notice.</p>
      )}

      {/* Add or update notice */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {isEditing ? "Update Notice" : "Add Notice"}:
        </h3>
        <textarea
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows="4"
          placeholder="Write your notice here..."
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2 mt-4">
          {isEditing ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleUpdateNotice}
            >
              Update Notice
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleAddNotice}
            >
              Add Notice
            </button>
          )}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => {
              setNewNotice("");
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
