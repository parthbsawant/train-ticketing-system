// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaPlus, FaMinus, FaUser, FaTrain } from 'react-icons/fa';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase/firebaseConfig';
// import { useAuth } from '../context/AuthContext';
// import Stepper from '../components/Stepper';
// import toast from 'react-hot-toast';

// const Booking = () => {
//   const { trainId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [train, setTrain] = useState(null);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [passengers, setPassengers] = useState([
//     { name: '', age: '', gender: 'Male' }
//   ]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       toast.error('Please login to book tickets');
//       navigate('/login');
//       return;
//     }

//     const fetchTrain = async () => {
//       try {
//         const q = query(
//           collection(db, 'trains'),
//           where('id', '==', trainId)
//         );

//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           const doc = snapshot.docs[0];
//           setTrain({ firestoreId: doc.id, ...doc.data() });
//         } else {
//           toast.error('Train not found');
//           navigate('/');
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error('Failed to load train');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrain();
//   }, [trainId, user, navigate]);

//   const handleAddPassenger = () => {
//     setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
//   };

//   const handleRemovePassenger = (index) => {
//     if (passengers.length > 1) {
//       setPassengers(passengers.filter((_, i) => i !== index));
//     }
//   };

//   const handlePassengerChange = (index, field, value) => {
//     const updated = [...passengers];
//     updated[index][field] = value;
//     setPassengers(updated);
//   };

//   const handleContinue = () => {
//     if (!selectedClass) {
//       toast.error('Please select a class');
//       return;
//     }

//     const valid = passengers.every(p => p.name && p.age && p.gender);
//     if (!valid) {
//       toast.error('Please fill all passenger details');
//       return;
//     }

//     const total = train.classes[selectedClass].price * passengers.length;

//     navigate('/confirm', {
//       state: {
//         train,
//         selectedClass,
//         passengers,
//         amount: total
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600">Loading train details...</p>
//       </div>
//     );
//   }

//   if (!train) return null;

//   const steps = ['Search', 'Details', 'Confirm'];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <Stepper currentStep={2} steps={steps} />

//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           {/* Train Summary */}
//           <div className="bg-white p-6 rounded-xl shadow mb-6">
//             <h2 className="text-xl font-bold mb-2">{train.name}</h2>
//             <p className="text-gray-600">
//               {train.from} → {train.to}
//             </p>
//             <p className="text-sm text-gray-500">Train No: {train.number}</p>
//           </div>

//           {/* Class Selection */}
//           <div className="bg-white p-6 rounded-xl shadow mb-6">
//             <h3 className="font-semibold mb-4">Select Class</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {Object.entries(train.classes).map(([cls, data]) => (
//                 <button
//                   key={cls}
//                   onClick={() => setSelectedClass(cls)}
//                   className={`p-4 border rounded-lg ${
//                     selectedClass === cls
//                       ? 'border-primary bg-primary/10'
//                       : 'border-gray-200'
//                   }`}
//                 >
//                   <p className="font-semibold">{cls}</p>
//                   <p className="text-sm">₹{data.price}</p>
//                   <p className="text-xs">Seats: {data.seats}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Passengers */}
//           <div className="bg-white p-6 rounded-xl shadow mb-6">
//             <div className="flex justify-between mb-4">
//               <h3 className="font-semibold">Passengers</h3>
//               <button onClick={handleAddPassenger} className="text-primary">
//                 + Add
//               </button>
//             </div>

//             {passengers.map((p, i) => (
//               <div key={i} className="grid grid-cols-3 gap-3 mb-3">
//                 <input
//                   placeholder="Name"
//                   value={p.name}
//                   onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
//                   className="border p-2 rounded"
//                 />
//                 <input
//                   placeholder="Age"
//                   type="number"
//                   value={p.age}
//                   onChange={(e) => handlePassengerChange(i, 'age', e.target.value)}
//                   className="border p-2 rounded"
//                 />
//                 <select
//                   value={p.gender}
//                   onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)}
//                   className="border p-2 rounded"
//                 >
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             ))}
//           </div>

//           {/* Continue */}
//           <button
//             onClick={handleContinue}
//             className="w-full bg-secondary text-white py-3 rounded-lg"
//           >
//             Continue to Confirm
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Booking;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Stepper from '../components/Stepper';
import toast from 'react-hot-toast';

const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [train, setTrain] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    const fetchTrain = async () => {
      try {
        const q = query(
          collection(db, 'trains'),
          where('number', '==', trainId)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          setTrain(snap.docs[0].data());
        } else {
          toast.error('Train not found');
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load train');
      } finally {
        setLoading(false);
      }
    };

    fetchTrain();
  }, [trainId, user, navigate]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleContinue = () => {
    if (!selectedClass) return toast.error('Select class');
    if (!passengers.every(p => p.name && p.age)) return toast.error('Fill all passenger details');

    const amount = train.classes[selectedClass].price * passengers.length;

    navigate('/confirm', {
      state: { train, selectedClass, passengers, amount }
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!train) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Stepper currentStep={2} steps={['Search', 'Details', 'Confirm']} />

      <div className="bg-white p-6 rounded shadow mb-4">
        <h2 className="text-xl font-bold">{train.name}</h2>
        <p>{train.from} → {train.to}</p>
        <p>Train No: {train.number}</p>
      </div>

      <div className="bg-white p-6 rounded shadow mb-4">
        <h3 className="font-semibold mb-3">Select Class</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(train.classes).map(([cls, data]) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`p-3 border rounded ${selectedClass === cls ? 'border-blue-600 bg-blue-50' : ''}`}
            >
              {cls} – ₹{data.price}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow mb-4">
        <h3 className="font-semibold mb-3">Passengers</h3>

        {passengers.map((p, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input placeholder="Name" className="border p-2" value={p.name} onChange={e => handlePassengerChange(i, 'name', e.target.value)} />
            <input placeholder="Age" className="border p-2" value={p.age} onChange={e => handlePassengerChange(i, 'age', e.target.value)} />
            <select className="border p-2" value={p.gender} onChange={e => handlePassengerChange(i, 'gender', e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        ))}

        <button onClick={handleAddPassenger} className="text-blue-600 mt-2">+ Add Passenger</button>
      </div>

      <button onClick={handleContinue} className="bg-green-600 text-white w-full py-3 rounded">
        Continue to Confirm
      </button>
    </div>
  );
};

export default Booking;
