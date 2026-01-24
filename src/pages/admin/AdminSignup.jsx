import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      name,
      email,
      role: 'admin',
      createdAt: new Date()
    });

    alert('Admin created');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border p-3 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border p-3 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="w-full bg-purple-600 text-white py-3 rounded">Create Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
