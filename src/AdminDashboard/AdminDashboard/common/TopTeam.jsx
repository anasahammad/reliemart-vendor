import React, { useState } from "react";
import { FaFacebook, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const AdminResellerTeamRanking = () => {
  const [resellers, setResellers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      facebook: "https://facebook.com/johndoe",
      totalSales: 12, // Sales count
      salesAmount: 12000, // Total sales amount
      team: [
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+0987654321",
          facebook: "https://facebook.com/janesmith",
          salesCount: 5,
          salesAmount: 3000,
        },
        {
          id: 3,
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "+1122334455",
          facebook: "https://facebook.com/alicejohnson",
          salesCount: 7,
          salesAmount: 5000,
        },
      ],
      joiningDate: "2024-05-20",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "+9876543210",
      facebook: "https://facebook.com/bobbrown",
      totalSales: 10,
      salesAmount: 8000,
      team: [
        {
          id: 5,
          name: "Charlie D.",
          email: "charlie@example.com",
          phone: "+1222333445",
          facebook: "https://facebook.com/charlied",
          salesCount: 3,
          salesAmount: 2500,
        },
      ],
      joiningDate: "2024-06-15",
    },
    {
      id: 6,
      name: "Eve Williams",
      email: "eve@example.com",
      phone: "+1555555555",
      facebook: "https://facebook.com/evwilliams",
      totalSales: 8,
      salesAmount: 5000,
      team: [
        {
          id: 7,
          name: "Dave Lee",
          email: "dave@example.com",
          phone: "+1999888777",
          facebook: "https://facebook.com/davelee",
          salesCount: 5,
          salesAmount: 2000,
        },
      ],
      joiningDate: "2024-07-10",
    },
    {
      id: 8,
      name: "Frank Black",
      email: "frank@example.com",
      phone: "+1777777777",
      facebook: "https://facebook.com/frankblack",
      totalSales: 6,
      salesAmount: 4000,
      team: [
        {
          id: 9,
          name: "Grace Moore",
          email: "grace@example.com",
          phone: "+1666666666",
          facebook: "https://facebook.com/gracemoore",
          salesCount: 3,
          salesAmount: 1500,
        },
      ],
      joiningDate: "2024-08-01",
    },
    {
      id: 10,
      name: "Hannah Green",
      email: "hannah@example.com",
      phone: "+1888888888",
      facebook: "https://facebook.com/hannahgreen",
      totalSales: 4,
      salesAmount: 2500,
      team: [
        {
          id: 11,
          name: "Ivy Brown",
          email: "ivy@example.com",
          phone: "+1444444444",
          facebook: "https://facebook.com/ivybrown",
          salesCount: 2,
          salesAmount: 1000,
        },
      ],
      joiningDate: "2024-09-15",
    },
  ]);

  // Sort resellers based on sales amount (descending)
  const sortedResellers = [...resellers]
    .sort((a, b) => b.salesAmount - a.salesAmount)
    .slice(0, 5); // Get top 5 resellers

  return (
    <div className="overflow-x-auto bg-white p-5 shadow-sm rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Top 5 Reseller Team Rankings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Rank</th>
              <th className="border px-4 py-2">Reseller Name</th>
              <th className="border px-4 py-2">Sales Count</th>
              <th className="border px-4 py-2">Sales Amount</th>
              <th className="border px-4 py-2">Team Members</th>
              <th className="border px-4 py-2">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedResellers.map((reseller, index) => (
              <tr key={reseller.id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{reseller.name}</td>
                <td className="border px-4 py-2 text-center">{reseller.totalSales}</td>
                <td className="border px-4 py-2 text-center">{reseller.salesAmount} tk</td>
                <td className="border px-4 py-2">
                  <ul>
                    {reseller.team.map((member) => (
                      <li key={member.id} className="py-1">
                        <div>{member.name}</div>
                        <div className="text-sm text-gray-500">{member.salesCount} sales</div>
                        <div className="text-sm">
                          <a href={member.facebook} className="text-blue-600">
                            <FaFacebook />
                          </a>{" "}
                          |{" "}
                          <a href={`tel:${member.phone}`} className="text-green-600">
                            <FaPhoneAlt />
                          </a>{" "}
                          |{" "}
                          <a href={`mailto:${member.email}`} className="text-red-600">
                            <FaEnvelope />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">{reseller.joiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResellerTeamRanking;
