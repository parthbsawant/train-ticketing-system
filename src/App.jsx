// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';

// import Navbar from './components/Navbar';
// import Loader from './components/Loader';

// import Home from './pages/Home';
// import SearchResults from './pages/SearchResults';
// import Booking from './pages/Booking';
// import ConfirmDetails from './pages/ConfirmDetails';
// import Ticket from './pages/Ticket';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Bookings from './pages/Bookings';

// // ✅ Admin Pages
// import AdminLogin from './pages/admin/AdminLogin';
// import AdminSignup from './pages/admin/AdminSignup';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminReports from './pages/admin/AdminReports';

// // -------------------
// // Protected User Route
// // -------------------
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <Loader />;
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// };

// // -------------------
// // Public User Route
// // -------------------
// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <Loader />;
//   if (user) return <Navigate to="/" replace />;

//   return children;
// };

// // -------------------
// // Protected Admin Route
// // -------------------
// const AdminRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <Loader />;

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// };

// // -------------------
// // All Routes
// // -------------------
// function AppRoutes() {
//   return (
//     <Routes>
//       {/* User Routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/search" element={<SearchResults />} />

//       <Route
//         path="/booking/:trainId"
//         element={
//           <ProtectedRoute>
//             <Booking />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/confirm"
//         element={
//           <ProtectedRoute>
//             <ConfirmDetails />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/ticket/:bookingId"
//         element={
//           <ProtectedRoute>
//             <Ticket />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/bookings"
//         element={
//           <ProtectedRoute>
//             <Bookings />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />

//       <Route
//         path="/signup"
//         element={
//           <PublicRoute>
//             <Signup />
//           </PublicRoute>
//         }
//       />

//       {/* ------------------- */}
//       {/* Admin Routes */}
//       {/* ------------------- */}
//       <Route path="/admin/login" element={<AdminLogin />} />
//       <Route path="/admin/signup" element={<AdminSignup />} />

//       <Route
//         path="/admin/dashboard"
//         element={
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         }
//       />

//       <Route
//         path="/admin/reports"
//         element={
//           <AdminRoute>
//             <AdminReports />
//           </AdminRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// // -------------------
// // App Wrapper
// // -------------------
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />

//           <AppRoutes />

//           <Toaster
//             position="top-right"
//             toastOptions={{
//               duration: 3000,
//               style: {
//                 background: '#363636',
//                 color: '#fff',
//               },
//               success: {
//                 duration: 3000,
//                 iconTheme: {
//                   primary: '#43A047',
//                   secondary: '#fff',
//                 },
//               },
//               error: {
//                 duration: 4000,
//                 iconTheme: {
//                   primary: '#E53935',
//                   secondary: '#fff',
//                 },
//               },
//             }}
//           />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Loader from './components/Loader';

import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import ConfirmDetails from './pages/ConfirmDetails';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Bookings from './pages/Bookings';
import Offers from './pages/Offers'; // ✅ ADDED

import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import Payment from './pages/Payment';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offers" element={<Offers />} /> {/* ✅ FIXED */}
      <Route path="/search" element={<SearchResults />} />

      <Route path="/booking/:trainId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
      <Route path="/confirm" element={<ProtectedRoute><ConfirmDetails /></ProtectedRoute>} />
      <Route path="/ticket/:bookingId" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />

      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
