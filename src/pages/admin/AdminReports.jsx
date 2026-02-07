// import { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import { FaDownload, FaSearch } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const AdminReports = () => {
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersSnap = await getDocs(collection(db, 'users'));
//         const bookingsSnap = await getDocs(collection(db, 'bookings'));

//         const usersData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
//         const bookingsData = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

//         setUsers(usersData);
//         setFilteredUsers(usersData);
//         setBookings(bookingsData);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const lower = search.toLowerCase();
//     setFilteredUsers(
//       users.filter(u =>
//         u.name?.toLowerCase().includes(lower) ||
//         u.email?.toLowerCase().includes(lower)
//       )
//     );
//   }, [search, users]);

//   const formatDate = (ts) => ts?.toDate ? ts.toDate().toLocaleString() : '';

//   // ---------- ANALYTICS ----------
//   const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

//   const routeStats = {};
//   bookings.forEach(b => {
//     const key = `${b.from || ''} → ${b.to || ''}`;
//     routeStats[key] = (routeStats[key] || 0) + 1;
//   });

//   const popularRoutes = Object.entries(routeStats)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5);

//   const classStats = {};
//   bookings.forEach(b => {
//     classStats[b.classType] = (classStats[b.classType] || 0) + 1;
//   });

//   // ---------- GENERIC CSV BUILDER ----------
//   const downloadCSV = (headers, rows, filename) => {
//     const csv = [headers, ...rows]
//       .map(r => r.map(v => `"${v ?? ''}"`).join(','))
//       .join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//   };

//   // ---------- FULL EXPORT ----------
//   const exportCSV = () => {
//     const headers = ['Name', 'Email', 'Age', 'Phone', 'Gender', 'Address', 'Login Time', 'Logout Time'];
//     const rows = filteredUsers.map(u => [
//       u.name,
//       u.email,
//       u.age,
//       u.phone,
//       u.gender,
//       u.address,
//       formatDate(u.loginTime),
//       formatDate(u.logoutTime)
//     ]);

//     downloadCSV(headers, rows, 'user_reports_full.csv');
//   };

//   // ---------- COLUMN PAIR EXPORTS ----------
//   const exportNameEmail = () =>
//     downloadCSV(
//       ['Name', 'Email'],
//       filteredUsers.map(u => [u.name, u.email]),
//       'name_email.csv'
//     );

//   const exportNameAge = () =>
//     downloadCSV(
//       ['Name', 'Age'],
//       filteredUsers.map(u => [u.name, u.age]),
//       'name_age.csv'
//     );

//   const exportNamePhone = () =>
//     downloadCSV(
//       ['Name', 'Phone'],
//       filteredUsers.map(u => [u.name, u.phone]),
//       'name_phone.csv'
//     );

//   const exportNameLoginLogout = () =>
//     downloadCSV(
//       ['Name', 'Login Time', 'Logout Time'],
//       filteredUsers.map(u => [u.name, formatDate(u.loginTime), formatDate(u.logoutTime)]),
//       'name_login_logout.csv'
//     );

//   const exportNameGender = () =>
//     downloadCSV(
//       ['Name', 'Gender'],
//       filteredUsers.map(u => [u.name, u.gender]),
//       'name_gender.csv'
//     );

//   const exportNameAddress = () =>
//     downloadCSV(
//       ['Name', 'Address'],
//       filteredUsers.map(u => [u.name, u.address]),
//       'name_address.csv'
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md"
//       >
//         <h1 className="text-2xl font-bold mb-6">Admin Reports & Analytics</h1>

//         {/* KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-gray-50 p-5 rounded-lg">
//             <p className="text-gray-500 text-sm">Total Users</p>
//             <p className="text-2xl font-bold">{users.length}</p>
//           </div>

//           <div className="bg-gray-50 p-5 rounded-lg">
//             <p className="text-gray-500 text-sm">Total Bookings</p>
//             <p className="text-2xl font-bold">{bookings.length}</p>
//           </div>

//           <div className="bg-gray-50 p-5 rounded-lg">
//             <p className="text-gray-500 text-sm">Total Revenue</p>
//             <p className="text-2xl font-bold">₹{totalRevenue}</p>
//           </div>

//           <div className="bg-gray-50 p-5 rounded-lg">
//             <p className="text-gray-500 text-sm">Most Used Class</p>
//             <p className="text-2xl font-bold">
//               {Object.entries(classStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'}
//             </p>
//           </div>
//         </div>

//         {/* ROUTES */}
//         <div className="mb-10">
//           <h2 className="font-semibold mb-3">Most Booked Routes</h2>
//           <ul className="space-y-2">
//             {popularRoutes.map(([route, count]) => (
//               <li key={route} className="flex justify-between bg-gray-50 px-4 py-2 rounded">
//                 <span>{route}</span>
//                 <span className="font-semibold">{count} bookings</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* SEARCH + EXPORT */}
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="relative w-full md:w-64">
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             <input
//               placeholder="Search users..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Export Buttons */}
//           <div className="flex flex-wrap gap-3">
//             <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded flex gap-2 items-center">
//               <FaDownload /> Full CSV
//             </button>

//             <button onClick={exportNameEmail} className="bg-blue-600 text-white px-4 py-2 rounded">Name+Email</button>
//             <button onClick={exportNameAge} className="bg-indigo-600 text-white px-4 py-2 rounded">Name+Age</button>
//             <button onClick={exportNamePhone} className="bg-purple-600 text-white px-4 py-2 rounded">Name+Phone</button>
//             <button onClick={exportNameLoginLogout} className="bg-orange-600 text-white px-4 py-2 rounded">Name+Login</button>
//             <button onClick={exportNameGender} className="bg-pink-600 text-white px-4 py-2 rounded">Name+Gender</button>
//             <button onClick={exportNameAddress} className="bg-teal-600 text-white px-4 py-2 rounded">Name+Address</button>
//           </div>
//         </div>

//         {/* TABLE */}
//         {loading ? (
//           <p className="text-center py-10 text-gray-500">Loading reports...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {['Name','Email','Age','Phone','Gender','Address','Login Time','Logout Time']
//                     .map(h => <th key={h} className="border px-3 py-2 text-left">{h}</th>)}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map(u => (
//                   <tr key={u.id}>
//                     <td className="border px-3 py-2">{u.name || '-'}</td>
//                     <td className="border px-3 py-2">{u.email || '-'}</td>
//                     <td className="border px-3 py-2">{u.age || '-'}</td>
//                     <td className="border px-3 py-2">{u.phone || '-'}</td>
//                     <td className="border px-3 py-2">{u.gender || '-'}</td>
//                     <td className="border px-3 py-2">{u.address || '-'}</td>
//                     <td className="border px-3 py-2">{formatDate(u.loginTime)}</td>
//                     <td className="border px-3 py-2">{formatDate(u.logoutTime)}</td>
//                   </tr>
//                 ))}
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
  const [trains, setTrains] = useState([]);   // ✅ NEW
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const bookingsSnap = await getDocs(collection(db, 'bookings'));
        const trainsSnap = await getDocs(collection(db, 'trains')); // ✅ NEW

        const usersData = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const bookingsData = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const trainsData = trainsSnap.docs.map(d => ({ id: d.id, ...d.data() })); // ✅

        setUsers(usersData);
        setFilteredUsers(usersData);
        setBookings(bookingsData);
        setTrains(trainsData); // ✅
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

  // ---------- GENERIC CSV BUILDER ----------
  const downloadCSV = (headers, rows, filename) => {
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${v ?? ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  // ================= USER EXPORTS =================

  const exportCSV = () => {
    const headers = ['Name','Email','Age','Phone','Gender','Address','Login Time','Logout Time'];
    const rows = filteredUsers.map(u => [
      u.name, u.email, u.age, u.phone, u.gender, u.address,
      formatDate(u.loginTime), formatDate(u.logoutTime)
    ]);
    downloadCSV(headers, rows, 'user_reports_full.csv');
  };

  const exportNameEmail = () =>
    downloadCSV(['Name','Email'], filteredUsers.map(u => [u.name, u.email]), 'name_email.csv');

  const exportNameAge = () =>
    downloadCSV(['Name','Age'], filteredUsers.map(u => [u.name, u.age]), 'name_age.csv');

  const exportNamePhone = () =>
    downloadCSV(['Name','Phone'], filteredUsers.map(u => [u.name, u.phone]), 'name_phone.csv');

  const exportNameLoginLogout = () =>
    downloadCSV(
      ['Name','Login Time','Logout Time'],
      filteredUsers.map(u => [u.name, formatDate(u.loginTime), formatDate(u.logoutTime)]),
      'name_login_logout.csv'
    );

  const exportNameGender = () =>
    downloadCSV(['Name','Gender'], filteredUsers.map(u => [u.name, u.gender]), 'name_gender.csv');

  const exportNameAddress = () =>
    downloadCSV(['Name','Address'], filteredUsers.map(u => [u.name, u.address]), 'name_address.csv');

  // ================= TRAIN REPORTS =================

  const exportTrainMaster = () => {
    const headers = ['Name','Number','From','To','Arrival','Departure','Duration','Type'];
    const rows = trains.map(t => [
      t.name, t.number, t.from, t.to,
      t.arrival, t.departure, t.duration, t.type
    ]);
    downloadCSV(headers, rows, 'train_master_report.csv');
  };

  const exportTrainTiming = () => {
    const headers = ['Name','Arrival','Departure'];
    const rows = trains.map(t => [t.name, t.arrival, t.departure]);
    downloadCSV(headers, rows, 'train_timing_report.csv');
  };

  // ================= BOOKING REPORTS =================

  const exportBookingReport = () => {
    const headers = ['Train','From','To','Class','Amount','Payment'];
    const rows = bookings.map(b => [
      b.trainName, b.from, b.to, b.classType, b.amount, b.paymentMethod
    ]);
    downloadCSV(headers, rows, 'booking_report.csv');
  };

  const exportRevenueByRoute = () => {
    const map = {};
    bookings.forEach(b => {
      const key = `${b.from} → ${b.to}`;
      map[key] = (map[key] || 0) + (b.amount || 0);
    });

    downloadCSV(
      ['Route','Revenue'],
      Object.entries(map),
      'revenue_by_route.csv'
    );
  };

  const exportClassUsage = () => {
    downloadCSV(
      ['Class','Bookings'],
      Object.entries(classStats),
      'class_usage.csv'
    );
  };

  const exportPassengerCounts = () => {
    const rows = bookings.map(b => [
      b.trainName,
      b.passengers?.length || 0,
      b.amount
    ]);

    downloadCSV(
      ['Train','Passenger Count','Amount'],
      rows,
      'passenger_counts.csv'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
        className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6">Admin Reports & Analytics</h1>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Stat label="Total Users" value={users.length}/>
          <Stat label="Total Bookings" value={bookings.length}/>
          <Stat label="Total Revenue" value={`₹${totalRevenue}`}/>
          <Stat label="Most Used Class"
            value={Object.entries(classStats).sort((a,b)=>b[1]-a[1])[0]?.[0] || '-'}
          />
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-64 mb-4">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
          />
        </div>

        {/* EXPORT BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-8">

          {/* User */}
          <Btn onClick={exportCSV} text="Full Users CSV"/>
          <Btn onClick={exportNameEmail} text="Name+Email"/>
          <Btn onClick={exportNameAge} text="Name+Age"/>
          <Btn onClick={exportNamePhone} text="Name+Phone"/>
          <Btn onClick={exportNameLoginLogout} text="Name+Login"/>
          <Btn onClick={exportNameGender} text="Name+Gender"/>
          <Btn onClick={exportNameAddress} text="Name+Address"/>

          {/* Train */}
          <Btn onClick={exportTrainMaster} text="Train Master"/>
          <Btn onClick={exportTrainTiming} text="Train Timing"/>

          {/* Booking */}
          <Btn onClick={exportBookingReport} text="Booking Report"/>
          <Btn onClick={exportRevenueByRoute} text="Revenue by Route"/>
          <Btn onClick={exportClassUsage} text="Class Usage"/>
          <Btn onClick={exportPassengerCounts} text="Passenger Count"/>
        </div>

        {/* TABLE (unchanged) */}
        {loading ? (
          <p className="text-center py-10">Loading reports...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  {['Name','Email','Age','Phone','Gender','Address','Login Time','Logout Time']
                    .map(h => <th key={h} className="border px-3 py-2">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td className="border px-3 py-2">{u.name||'-'}</td>
                    <td className="border px-3 py-2">{u.email||'-'}</td>
                    <td className="border px-3 py-2">{u.age||'-'}</td>
                    <td className="border px-3 py-2">{u.phone||'-'}</td>
                    <td className="border px-3 py-2">{u.gender||'-'}</td>
                    <td className="border px-3 py-2">{u.address||'-'}</td>
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

const Btn = ({ onClick, text }) => (
  <button onClick={onClick}
    className="bg-gray-800 text-white px-4 py-2 rounded text-sm">
    {text}
  </button>
);

const Stat = ({ label, value }) => (
  <div className="bg-gray-50 p-5 rounded-lg">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminReports;
