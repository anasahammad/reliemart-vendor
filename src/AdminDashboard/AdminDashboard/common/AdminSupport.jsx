import React, { useState } from 'react';

const AdminSupport = () => {
  // Sample support tickets data
  const [tickets, setTickets] = useState([
    {
      id: 1,
      customer: 'John Doe',
      issue: 'Unable to log in',
      status: 'Open',
      createdAt: '2024-12-01',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      issue: 'Payment issue',
      status: 'Resolved',
      createdAt: '2024-12-02',
    },
    {
      id: 3,
      customer: 'Alice Johnson',
      issue: 'Incorrect billing',
      status: 'Open',
      createdAt: '2024-12-03',
    },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.customer.toLowerCase().includes(search.toLowerCase()) || ticket.issue.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Admin - Support</h2>

      {/* Search and Filter */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="w-1/3 p-3 border border-gray-300 rounded-md"
          placeholder="Search by customer or issue"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="ml-4 p-3 border border-gray-300 rounded-md"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Support Tickets Table */}
      <div className="overflow-x-auto bg-gray-50 p-6 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Support Tickets</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Customer</th>
              <th className="px-4 py-2 border-b text-left">Issue</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{ticket.customer}</td>
                <td className="px-4 py-2 border-b">{ticket.issue}</td>
                <td className="px-4 py-2 border-b">{ticket.status}</td>
                <td className="px-4 py-2 border-b">{ticket.createdAt}</td>
                <td className="px-4 py-2 border-b">
                  {ticket.status === 'Open' ? (
                    <button
                      onClick={() => handleUpdateStatus(ticket.id, 'Resolved')}
                      className="py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Mark as Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(ticket.id, 'Open')}
                      className="py-1 px-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                    >
                      Reopen Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSupport;
