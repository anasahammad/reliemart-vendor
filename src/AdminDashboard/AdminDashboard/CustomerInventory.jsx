import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerInventory = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventoryAndProfit();
  }, [selectedMonth, selectedYear]);

  const fetchInventoryAndProfit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/inventory/customer`, {
        params: { month: selectedMonth, year: selectedYear }
      });
      setInventoryData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch inventory and profit data');
      setLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Inventory Management & Monthly Profit From Customer</h1>
      
      <div className="mb-6 flex space-x-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[...Array(10)].map((_, i) => {
            const year = new Date().getFullYear() - 5 + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>

      {inventoryData && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
            <div className="space-y-2">
              <p>Total Products: {inventoryData.inventory.totalProducts}</p>
              <p>Total Stock: {inventoryData.inventory.totalStock}</p>
              <p>Low Stock Products: {inventoryData.inventory.lowStockProducts}</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Profit</h2>
            <div className="space-y-2">
              <p>Total Orders: {inventoryData.monthlyProfit.totalOrders}</p>
              <p>Total Revenue: ${inventoryData.monthlyProfit.totalRevenue.toFixed(2)}</p>
              <p>Total Profit: ${inventoryData.monthlyProfit.totalProfit.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        {/* Add a table or list of recent orders here */}
      </div>
    </div>
  );
};

export default CustomerInventory;