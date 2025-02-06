import React, { useState } from 'react';

const AdminAboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState({
    title: 'About Us',
    description:
      'We are a leading e-commerce platform providing high-quality products and services to our customers. Our mission is to deliver the best shopping experience with top-notch customer service.',
    imageUrl:
      'https://via.placeholder.com/400x250?text=About+Us+Image',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutUsContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to the backend API
    alert('About Us content updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Admin - About Us</h2>

      {/* About Us Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={aboutUsContent.title}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the title"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={aboutUsContent.description}
            onChange={handleChange}
            rows="6"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the description"
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={aboutUsContent.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the image URL"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => alert('Changes discarded')}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Discard Changes
          </button>
        </div>
      </div>

      {/* Preview of About Us Content */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Preview</h3>
        <div className="bg-gray-50 p-6 mt-4 rounded-md">
          <h4 className="text-2xl font-semibold">{aboutUsContent.title}</h4>
          <p className="mt-4 text-gray-700">{aboutUsContent.description}</p>
          <img
            src={aboutUsContent.imageUrl}
            alt="About Us"
            className="mt-6 max-w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;
