import { Link, useNavigate } from 'react-router-dom';
import { FaTrain, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <FaTrain className="text-2xl" />
            <span className="text-xl font-bold font-poppins">TrainEase</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Offers
            </Link>
            {user && (
              <Link
                to="/bookings"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Bookings
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                  <FaUser className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.displayName || user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

