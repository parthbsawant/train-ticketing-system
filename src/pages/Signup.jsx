import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrain, FaEnvelope, FaLock, FaUser, FaPhone, FaHome } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await signup(form);
    if (result.success) navigate('/');

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaTrain className="text-primary text-3xl" />
              <h1 className="text-3xl font-bold">TrainEase</h1>
            </div>
            <p className="text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border rounded-lg" />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-3 border rounded-lg" />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-3 border rounded-lg" />

            <select name="gender" onChange={handleChange} required className="w-full p-3 border rounded-lg">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input name="address" placeholder="Address" onChange={handleChange} required className="w-full p-3 border rounded-lg" />

            <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-3 border rounded-lg" />
            <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} required className="w-full p-3 border rounded-lg" />

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have account?{' '}
            <Link to="/login" className="text-primary font-semibold">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
