import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../services/index/customerOrder';
import { fetchResellerOrders, fetchResellers } from '../../services/index/reseller';
import { fetchProducts } from '../../services/index/productsLists';
import { FaShoppingCart, FaUsers, FaBoxOpen, FaMoneyBillWave, FaUserTie, FaHandshake, FaChartLine } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: ordersData } = useQuery({
    queryKey: ['orders', { page, limit, search, status }],
    queryFn: fetchOrders,
    keepPreviousData: true,
  });

  const { data: resellers = [] } = useQuery({
    queryKey: ['resellers'],
    queryFn: fetchResellers,
    keepPreviousData: true,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const { data: resellerOrders = [] } = useQuery({
    queryKey: ['resellerOrders'],
    queryFn: fetchResellerOrders,
    keepPreviousData: true,
  });

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [30, 50, 70, 90, 110, 130],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1500, 1200, 1800],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ],
  };

  const DashboardCard = ({ title, value, icon, color, link }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${color} hover:shadow-xl transition-shadow duration-300`}
    >
      <Link to={link} className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`text-4xl ${color.replace('border-', 'text-')}`}>{icon}</div>
      </Link>
    </motion.div>
  );

  const SectionTitle = ({ title }) => (
    <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">{title}</h2>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      <SectionTitle title="Customer Metrics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard link={"/admin/customer/orders"} title="Total Customer Orders" value={ordersData?.orders.length || 0} icon={<FaShoppingCart />} color="border-blue-500" />
        <DashboardCard title="Pending Customer Orders" value="35" icon={<MdPendingActions />} color="border-yellow-500" />
        <DashboardCard link={"/admin/customer/all"} title="Total Customers" value="250" icon={<FaUsers />} color="border-green-500" />
      </div>

      <SectionTitle title="Reseller Metrics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard link={"/admin/resellers/all"} title="Total Resellers" value={resellers.length} icon={<FaHandshake />} color="border-purple-500" />
        <DashboardCard link={"/admin/resellers/orders"} title="Total Reseller Orders" value={resellerOrders.length} icon={<FaUserTie />} color="border-indigo-500" />
        <DashboardCard title="Pending Reseller Orders" value="28" icon={<MdPendingActions />} color="border-red-500" />
      </div>

      <SectionTitle title="Financial Metrics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Total Revenue" value="$15,230" icon={<FaChartLine />} color="border-green-500" />
        <DashboardCard title="Withdraw Requests" value="12" icon={<FaMoneyBillWave />} color="border-orange-500" />
        <DashboardCard title="Pending Payouts" value="$3,450" icon={<FaMoneyBillWave />} color="border-yellow-500" />
      </div>

      <SectionTitle title="Product Metrics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard link={"/admin/all-product"} title="Total Products" value={products.length} icon={<FaBoxOpen />} color="border-blue-500" />
        <DashboardCard title="Low Stock Products" value="15" icon={<FaBoxOpen />} color="border-red-500" />
        <DashboardCard title="Top Selling Products" value="5" icon={<FaChartLine />} color="border-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg max-h-[50vh]"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Orders Overview</h3>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg max-h-[50vh]"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Revenue Trend</h3>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;