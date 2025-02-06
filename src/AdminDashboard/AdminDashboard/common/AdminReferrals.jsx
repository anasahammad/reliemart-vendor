import React, { useState } from 'react';

const AdminReferrals = () => {
  const [search, setSearch] = useState('');
  const referrals = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@yahoo.com', status: 'Approved' },
    { id: 3, name: 'David Lee', email: 'davidlee@gmail.com', status: 'Rejected' },
    { id: 4, name: 'Sarah Kim', email: 'sarahkim@gmail.com', status: 'Pending' },
  ];

  const filteredReferrals = referrals.filter((referral) =>
    referral.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id, status) => {
    const updatedReferrals = referrals.map((referral) =>
      referral.id === id ? { ...referral, status } : referral
    );
    console.log(updatedReferrals); // Placeholder for updating the referral list in a real app
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Admin Referrals</h2>

      <input
        type="text"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-gray-600">Email</th>
            <th className="px-6 py-3 text-left text-gray-600">Status</th>
            <th className="px-6 py-3 text-center text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReferrals.map((referral) => (
            <tr key={referral.id} className="border-b">
              <td className="px-6 py-4">{referral.name}</td>
              <td className="px-6 py-4">{referral.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-md ${
                    referral.status === 'Pending'
                      ? 'bg-yellow-500 text-white'
                      : referral.status === 'Approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {referral.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-md mr-2"
                  onClick={() => handleStatusChange(referral.id, 'Approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded-md"
                  onClick={() => handleStatusChange(referral.id, 'Rejected')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReferrals;
