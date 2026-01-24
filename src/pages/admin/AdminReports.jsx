// // import { useEffect, useState } from 'react';
// // import { collection, getDocs } from 'firebase/firestore';
// // import { db } from '../../firebase/firebaseConfig';

// // const AdminReports = () => {
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     const fetch = async () => {
// //       const snap = await getDocs(collection(db, 'users'));
// //       const data = snap.docs.map(d => d.data());
// //       setUsers(data);
// //     };
// //     fetch();
// //   }, []);

// //   const exportCSV = () => {
// //     const headers = ['Name', 'Email', 'Age', 'Phone', 'Gender', 'Address', 'LoginTime', 'LogoutTime'];

// //     const rows = users.map(u => [
// //       u.name || '',
// //       u.email || '',
// //       u.age || '',
// //       u.phone || '',
// //       u.gender || '',
// //       u.address || '',
// //       u.loginTime?.toDate?.().toLocaleString() || '',
// //       u.logoutTime?.toDate?.().toLocaleString() || ''
// //     ]);

// //     const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = URL.createObjectURL(blob);

// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'user_report.csv';
// //     a.click();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
// //         <div className="flex justify-between mb-4">
// //           <h2 className="text-2xl font-bold">User Reports</h2>
// //           <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded">
// //             Export CSV
// //           </button>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="w-full border text-sm">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="border p-2">Name</th>
// //                 <th className="border p-2">Email</th>
// //                 <th className="border p-2">Age</th>
// //                 <th className="border p-2">Phone</th>
// //                 <th className="border p-2">Gender</th>
// //                 <th className="border p-2">Address</th>
// //                 <th className="border p-2">Login Time</th>
// //                 <th className="border p-2">Logout Time</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.map((u, i) => (
// //                 <tr key={i}>
// //                   <td className="border p-2">{u.name}</td>
// //                   <td className="border p-2">{u.email}</td>
// //                   <td className="border p-2">{u.age}</td>
// //                   <td className="border p-2">{u.phone}</td>
// //                   <td className="border p-2">{u.gender}</td>
// //                   <td className="border p-2">{u.address}</td>
// //                   <td className="border p-2">{u.loginTime?.toDate?.().toLocaleString()}</td>
// //                   <td className="border p-2">{u.logoutTime?.toDate?.().toLocaleString()}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminReports;

// import { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import { FaDownload, FaSearch } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const AdminReports = () => {
//   const [users, setUsers] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const snap = await getDocs(collection(db, 'users'));
//         const data = snap.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setUsers(data);
//         setFiltered(data);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const lower = search.toLowerCase();
//     const filteredData = users.filter(u =>
//       u.name?.toLowerCase().includes(lower) ||
//       u.email?.toLowerCase().includes(lower)
//     );
//     setFiltered(filteredData);
//   }, [search, users]);

//   const formatDate = (ts) => {
//     if (!ts?.toDate) return '';
//     return ts.toDate().toLocaleString();
//   };

//   const exportCSV = () => {
//     const headers = [
//       'Name',
//       'Email',
//       'Age',
//       'Phone',
//       'Gender',
//       'Address',
//       'Login Time',
//       'Logout Time'
//     ];

//     const rows = filtered.map(u => [
//       u.name || '',
//       u.email || '',
//       u.age || '',
//       u.phone || '',
//       u.gender || '',
//       u.address || '',
//       formatDate(u.loginTime),
//       formatDate(u.logoutTime)
//     ]);

//     const csv = [headers, ...rows]
//       .map(row => row.map(v => `"${v}"`).join(','))
//       .join('\n');

//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'user_reports.csv';
//     a.click();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md"
//       >
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             User Reports
//           </h1>

//           <div className="flex items-center gap-4 w-full md:w-auto">
//             <div className="relative w-full md:w-64">
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search name or email"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <button
//               onClick={exportCSV}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
//             >
//               <FaDownload />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Count */}
//         <p className="text-sm text-gray-500 mb-3">
//           Showing {filtered.length} of {users.length} users
//         </p>

//         {/* Table */}
//         {loading ? (
//           <div className="text-center py-10 text-gray-500">
//             Loading reports...
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   {['Name', 'Email', 'Age', 'Phone', 'Gender', 'Address', 'Login Time', 'Logout Time'].map(h => (
//                     <th key={h} className="border px-3 py-2 text-left">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="text-center py-6 text-gray-500">
//                       No users found
//                     </td>
//                   </tr>
//                 ) : (
//                   filtered.map((u) => (
//                     <tr key={u.id} className="hover:bg-gray-50">
//                       <td className="border px-3 py-2">{u.name || '-'}</td>
//                       <td className="border px-3 py-2">{u.email || '-'}</td>
//                       <td className="border px-3 py-2">{u.age || '-'}</td>
//                       <td className="border px-3 py-2">{u.phone || '-'}</td>
//                       <td className="border px-3 py-2">{u.gender || '-'}</td>
//                       <td className="border px-3 py-2">{u.address || '-'}</td>
//                       <td className="border px-3 py-2">{formatDate(u.loginTime)}</td>
//                       <td className="border px-3 py-2">{formatDate(u.logoutTime)}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default AdminReports;



import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FaDownload, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminReports = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const bookingsSnap = await getDocs(collection(db, 'bookings'));

        const usersData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const bookingsData = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        setUsers(usersData);
        setFilteredUsers(usersData);
        setBookings(bookingsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredUsers(
      users.filter(u =>
        u.name?.toLowerCase().includes(lower) ||
        u.email?.toLowerCase().includes(lower)
      )
    );
  }, [search, users]);

  const formatDate = (ts) => ts?.toDate ? ts.toDate().toLocaleString() : '';

  // ---------- ANALYTICS ----------
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

  const routeStats = {};
  bookings.forEach(b => {
    const key = `${b.from || ''} → ${b.to || ''}`;
    routeStats[key] = (routeStats[key] || 0) + 1;
  });

  const popularRoutes = Object.entries(routeStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const classStats = {};
  bookings.forEach(b => {
    classStats[b.classType] = (classStats[b.classType] || 0) + 1;
  });

  // ---------- CSV EXPORT ----------
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Age', 'Phone', 'Gender', 'Address', 'Login Time', 'Logout Time'];
    const rows = filteredUsers.map(u => [
      u.name || '',
      u.email || '',
      u.age || '',
      u.phone || '',
      u.gender || '',
      u.address || '',
      formatDate(u.loginTime),
      formatDate(u.logoutTime)
    ]);

    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_reports.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Reports & Analytics</h1>

        {/* ---------- KPI CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₹{totalRevenue}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500 text-sm">Most Used Class</p>
            <p className="text-2xl font-bold">
              {Object.entries(classStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'}
            </p>
          </div>
        </div>

        {/* ---------- POPULAR ROUTES ---------- */}
        <div className="mb-10">
          <h2 className="font-semibold mb-3">Most Booked Routes</h2>
          <ul className="space-y-2">
            {popularRoutes.map(([route, count]) => (
              <li key={route} className="flex justify-between bg-gray-50 px-4 py-2 rounded">
                <span>{route}</span>
                <span className="font-semibold">{count} bookings</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- USER REPORT TABLE ---------- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FaDownload /> Export CSV
          </button>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading reports...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  {['Name', 'Email', 'Age', 'Phone', 'Gender', 'Address', 'Login Time', 'Logout Time']
                    .map(h => (
                      <th key={h} className="border px-3 py-2 text-left">{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{u.name || '-'}</td>
                    <td className="border px-3 py-2">{u.email || '-'}</td>
                    <td className="border px-3 py-2">{u.age || '-'}</td>
                    <td className="border px-3 py-2">{u.phone || '-'}</td>
                    <td className="border px-3 py-2">{u.gender || '-'}</td>
                    <td className="border px-3 py-2">{u.address || '-'}</td>
                    <td className="border px-3 py-2">{formatDate(u.loginTime)}</td>
                    <td className="border px-3 py-2">{formatDate(u.logoutTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminReports;
