import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaPlus, FaTrash, FaSpinner, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const VideosManagement = () => {
  const [newVideo, setNewVideo] = useState({ title: '', description: '', videoUrl: '' });
  const [editingVideo, setEditingVideo] = useState(null);
  const queryClient = useQueryClient();

  const { data: videos = [], isLoading, isError } = useQuery({
    queryKey: ['learningVideos'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/learningVideo`);
      return response.data.data;
    },
  });

  const addVideoMutation = useMutation({
    mutationFn: (newVideo) => axios.post(`${import.meta.env.VITE_API_URL}/learningVideo`, newVideo),
    onSuccess: () => {
      queryClient.invalidateQueries(['learningVideos']);
      setNewVideo({ title: '', description: '', videoUrl: '' });
      toast.success('Video added successfully');
    },
    onError: () => {
        toast.error('An error occurred. Please try again.');
    }
  });

  const updateVideoMutation = useMutation({
    mutationFn: (updatedVideo) => axios.patch(`${import.meta.env.VITE_API_URL}/learningVideo/${updatedVideo._id}`, updatedVideo),
    onSuccess: () => {
      queryClient.invalidateQueries(['learningVideos']);
      setEditingVideo(null);
      toast.success('Video updated successfully');
    },
    onError: () => {
        toast.error('An error occurred. Please try again.');
    }
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/learningVideo/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['learningVideos']);
      toast.success('Video deleted successfully');
    },
    onError: () => {
        toast.error('An error occurred. Please try again.');}
  });

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingVideo({ ...editingVideo, [name]: value });
    } else {
      setNewVideo({ ...newVideo, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideoMutation.mutate(newVideo);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateVideoMutation.mutate(editingVideo);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideoMutation.mutate(id);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo({ ...video, videoUrl: video.videoUrl[0] });
  };

  const cancelEdit = () => {
    setEditingVideo(null);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-blue-500" /></div>;
  if (isError) return <div className="text-red-500 text-center">Error fetching learning videos</div>;

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Learning Videos Management</h1>

        {/* Add New Video Form */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newVideo.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={newVideo.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={newVideo.videoUrl}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={addVideoMutation.isLoading}
            >
              {addVideoMutation.isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaPlus className="mr-2" />
              )}
              Add Video
            </button>
          </form>
        </div>

        {/* Video List */}
        <div className="bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold p-6 border-b">Learning Videos</h2>
          <ul className="divide-y divide-gray-200">
            {videos.map((video) => (
              <li key={video._id} className="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                {editingVideo && editingVideo._id === video._id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        id="edit-title"
                        name="title"
                        value={editingVideo.title}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="edit-description"
                        name="description"
                        value={editingVideo.description}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="edit-videoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
                      <input
                        type="url"
                        id="edit-videoUrl"
                        name="videoUrl"
                        value={editingVideo.videoUrl}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaSave className="mr-2" />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{video.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{video.description}</p>
                      <a href={video.videoUrl[0]} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-500">
                        Watch Video
                      </a>
                    </div>
                    <div className="ml-4 flex-shrink-0 space-x-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideosManagement;