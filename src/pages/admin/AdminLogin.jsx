import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);

    if (res.success) {
      if (user?.role === 'admin') navigate('/admin/dashboard');
      else alert('Not authorized as admin');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border p-3 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button disabled={loading} className="w-full bg-purple-600 text-white py-3 rounded">
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          No admin account? <Link to="/admin/signup" className="text-purple-600 font-semibold">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
