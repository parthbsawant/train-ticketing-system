
// import { useNavigate } from 'react-router-dom';
// import { FaChartBar, FaUsers, FaTrain, FaFileAlt } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-6xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Admin Dashboard
//         </h1>

//         {/* Stats cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center gap-3 text-purple-600 mb-2">
//               <FaUsers />
//               <span className="font-semibold">Total Users</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">—</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center gap-3 text-blue-600 mb-2">
//               <FaTrain />
//               <span className="font-semibold">Total Trains</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">—</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center gap-3 text-green-600 mb-2">
//               <FaFileAlt />
//               <span className="font-semibold">Total Bookings</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">—</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center gap-3 text-orange-600 mb-2">
//               <FaChartBar />
//               <span className="font-semibold">Reports</span>
//             </div>
//             <p className="text-sm text-gray-500">View analytics</p>
//           </div>
//         </div>

//         {/* Reports Section */}
//         <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               User & Booking Reports
//             </h2>
//             <p className="text-gray-600">
//               View full report of users, bookings, activity and export data to Excel.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate('/admin/reports')}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
//           >
//             Open Reports
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaTrain,
  FaFileAlt
} from 'react-icons/fa';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#8b5cf6', '#10b981', '#f97316'];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [trainsCount, setTrainsCount] = useState(0);

  const [userGrowth, setUserGrowth] = useState([]);
  const [bookingTrend, setBookingTrend] = useState([]);
  const [genderStats, setGenderStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // USERS
      const usersSnap = await getDocs(collection(db, 'users'));
      const users = usersSnap.docs.map(d => d.data());
      setUsersCount(users.length);

      // BOOKINGS
      const bookingsSnap = await getDocs(collection(db, 'bookings'));
      const bookings = bookingsSnap.docs.map(d => d.data());
      setBookingsCount(bookings.length);

      // TRAINS
      const trainsSnap = await getDocs(collection(db, 'trains'));
      setTrainsCount(trainsSnap.size);

      // USER GROWTH CHART
      const growthMap = {};
      users.forEach(u => {
        if (u.createdAt?.toDate) {
          const date = u.createdAt.toDate().toLocaleDateString();
          growthMap[date] = (growthMap[date] || 0) + 1;
        }
      });

      setUserGrowth(
        Object.keys(growthMap).map(date => ({
          date,
          users: growthMap[date]
        }))
      );

      // BOOKINGS TREND
      const bookingMap = {};
      bookings.forEach(b => {
        if (b.createdAt?.toDate) {
          const date = b.createdAt.toDate().toLocaleDateString();
          bookingMap[date] = (bookingMap[date] || 0) + 1;
        }
      });

      setBookingTrend(
        Object.keys(bookingMap).map(date => ({
          date,
          bookings: bookingMap[date]
        }))
      );

      // GENDER PIE
      const genderMap = {};
      users.forEach(u => {
        if (u.gender) {
          genderMap[u.gender] = (genderMap[u.gender] || 0) + 1;
        }
      });

      setGenderStats(
        Object.keys(genderMap).map(g => ({
          name: g,
          value: genderMap[g]
        }))
      );
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Admin Analytics Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-purple-600">
              <FaUsers />
              Total Users
            </div>
            <p className="text-3xl font-bold">{usersCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-green-600">
              <FaFileAlt />
              Total Bookings
            </div>
            <p className="text-3xl font-bold">{bookingsCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-blue-600">
              <FaTrain />
              Total Trains
            </div>
            <p className="text-3xl font-bold">{trainsCount}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* User Growth */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Trend */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Bookings Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold mb-4">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderStats}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {genderStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reports Button */}
        <div className="text-right">
          <button
            onClick={() => navigate('/admin/reports')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Open Full Reports
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
