import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrain, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
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
      else navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-3 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4">
          No account? <Link to="/signup" className="text-primary">Signup</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
