import React, { useState } from 'react';

const AdminService = () => {
  // Sample services data
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Haircut',
      description: 'A standard haircut for all styles.',
      price: 20.0,
    },
    {
      id: 2,
      name: 'Massage',
      description: 'Relaxing full-body massage.',
      price: 50.0,
    },
    {
      id: 3,
      name: 'Manicure',
      description: 'Nail treatment with a choice of colors.',
      price: 30.0,
    },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAddService = () => {
    if (newService.name && newService.description && newService.price) {
      const id = services.length + 1;
      setServices([
        ...services,
        { id, ...newService, price: parseFloat(newService.price) },
      ]);
      setNewService({ name: '', description: '', price: '' });
    }
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Admin - Manage Services</h2>

      {/* Add Service Form */}
      <div className="bg-gray-50 p-6 rounded-md shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Service Name</label>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter service name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter service description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter service price"
          />
        </div>
        <button
          onClick={handleAddService}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto bg-gray-50 p-6 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Existing Services</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Service Name</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{service.name}</td>
                <td className="px-4 py-2 border-b">{service.description}</td>
                <td className="px-4 py-2 border-b">${service.price}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminService;
