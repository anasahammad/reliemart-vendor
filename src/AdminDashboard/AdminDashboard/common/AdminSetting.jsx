import React, { useState } from 'react';

const AdminSettings = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [siteTitle, setSiteTitle] = useState('E-commerce Admin');
  const [logo, setLogo] = useState(null);

  const handleSaveSettings = () => {
    // Save the settings logic
    console.log('Settings saved', { email, password, siteTitle, logo });
  };

  const handleLogoChange = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Admin - Settings</h2>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-gray-50 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Change Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="New password"
            />
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-gray-50 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
          <div className="mb-4">
            <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-600">
              Site Title
            </label>
            <input
              type="text"
              id="siteTitle"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-600">
              Logo Upload
            </label>
            <input
              type="file"
              id="logo"
              onChange={handleLogoChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            {logo && (
              <div className="mt-4">
                <img src={logo} alt="Logo preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
