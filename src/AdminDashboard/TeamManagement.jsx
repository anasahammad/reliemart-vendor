import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaFacebook, FaTrash, FaWhatsapp } from 'react-icons/fa';

const TeamManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // For editing a member
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    facebook: '',
    whatsapp: '',
    photo: null,
  });

  // Cloudinary configuration
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const CLOUDINARY_UPLOAD_PRESET = `${import.meta.env.VITE_CLOUDINARY_PRESET}`;

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/team`);
      setMembers(response.data.data);
    } catch (error) {
      toast.error('Error fetching team members');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = formData.photo;

      // Upload photo if it's a new file
      if (formData.photo instanceof File) {
        photoUrl = await uploadImageToCloudinary(formData.photo);
      }

      // If editing
      if (editingMember) {
        await axios.put(`${import.meta.env.VITE_API_URL}/team/${editingMember._id}`, {
          name: formData.name,
          role: formData.role,
          photo: photoUrl,
          facebook: formData.facebook,
          whatsapp: formData.whatsapp,
        });
        toast.success('Team member updated successfully');
      } else {
        // If adding a new member
        await axios.post(`${import.meta.env.VITE_API_URL}/team`, {
          name: formData.name,
          role: formData.role,
          photo: photoUrl,
          facebook: formData.facebook,
          whatsapp: formData.whatsapp,
        });
        toast.success('Team member added successfully');
      }

      fetchMembers();
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Error saving team member');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/team/${id}`);
      toast.success('Team member deleted successfully');
      fetchMembers();
    } catch (error) {
      toast.error('Error deleting team member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      facebook: member.socialLinks?.facebook || '',
      whatsapp: member.socialLinks?.whatsapp || '',
      photo: member.photo,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      facebook: '',
      whatsapp: '',
      photo: null,
    });
    setEditingMember(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>

      {/* Add/Edit Member Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Facebook Link</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Link</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (editingMember ? 'Updating...' : 'Adding...') : editingMember ? 'Update Member' : 'Add Member'}
          </button>
          {editingMember && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Team Members Grid */}
      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex space-x-4 mb-4">
                {member.socialLinks?.facebook && (
                  <a
                    href={member.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}
                {member.socialLinks?.whatsapp && (
                  <a
                    href={member.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit/>
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash/>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        'No team members available'
      )}
    </div>
  );
};

export default TeamManagement;
