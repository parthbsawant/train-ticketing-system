
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaSearch, FaTrain, FaGift, FaDatabase } from 'react-icons/fa';
// import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
// import { db } from '../firebase/firebaseConfig';
// import toast from 'react-hot-toast';
// import { indianTrains } from '../data/indianTrains.dataset';

// const Home = () => {
//   const navigate = useNavigate();
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [seeding, setSeeding] = useState(false);

//   useEffect(() => {
//     const fetchTrains = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'trains'));
//         const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
//         setTrains(list.slice(0, 3));
//       } catch (error) {
//         console.error('Fetch trains error:', error);
//       }
//     };

//     fetchTrains();
//   }, []);

//   const handleSeedData = async () => {
//     setSeeding(true);

//     try {
//       const trainsRef = collection(db, 'trains');
//       const existing = await getDocs(trainsRef);

//       if (existing.size > 0) {
//         const confirm = window.confirm('Trains already exist. Seed again?');
//         if (!confirm) {
//           setSeeding(false);
//           return;
//         }
//       }

//       let batch = writeBatch(db);
//       let count = 0;

//       for (let i = 0; i < indianTrains.length; i++) {
//         const train = indianTrains[i];

//         // ✅ Critical fix: remove dataset id
//         const { id, ...cleanTrain } = train;

//         const docRef = doc(trainsRef);
//         batch.set(docRef, { ...cleanTrain, createdAt: new Date() });
//         count++;

//         if (count % 450 === 0) {
//           await batch.commit();
//           batch = writeBatch(db);
//         }
//       }

//       await batch.commit();
//       toast.success(`Seeded ${count} trains`);

//       const snapshot = await getDocs(trainsRef);
//       const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
//       setTrains(list.slice(0, 3));
//     } catch (err) {
//       console.error(err);
//       toast.error('Seeding failed');
//     } finally {
//       setSeeding(false);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!from || !to || !date) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       const snapshot = await getDocs(collection(db, 'trains'));
//       const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

//       const results = list.filter(
//         t =>
//           t.from.toLowerCase() === from.toLowerCase() &&
//           t.to.toLowerCase() === to.toLowerCase()
//       );

//       if (results.length === 0) {
//         toast.error('No trains found');
//         return;
//       }

//       navigate('/search', {
//         state: { trains: results, from, to, date },
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error('Search failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const offers = [
//     { title: '10% off on First Booking', description: 'Get 10% discount on your first train booking' },
//     { title: 'Students Discount', description: 'Special discount for students with valid ID' },
//     { title: 'Weekend Travel Deals', description: 'Enjoy reduced fares on weekend travels' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <motion.div className="max-w-6xl mx-auto px-4 py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

//         {/* Hero */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-3">Book Your Train Journey</h1>
//           <p className="text-gray-600 mb-4">Fast, Easy, and Reliable Train Booking</p>

//           <button
//             onClick={handleSeedData}
//             disabled={seeding}
//             className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
//           >
//             <FaDatabase />
//             {seeding ? 'Seeding...' : 'Seed Train Data'}
//           </button>
//         </div>

//         {/* Search */}
//         <div className="bg-white rounded-xl shadow p-8 mb-12">
//           <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" className="border p-3 rounded" required />
//             <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="border p-3 rounded" required />
//             <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-3 rounded" required />
//             <button disabled={loading} className="bg-primary text-white rounded px-4 py-2">
//               {loading ? 'Searching...' : <><FaSearch /> Search</>}
//             </button>
//           </form>
//         </div>

//         {/* Offers */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
//             <FaGift className="text-secondary" /> Featured Offers
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {offers.map((offer, i) => (
//               <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                 <h3 className="font-semibold mb-2">{offer.title}</h3>
//                 <p className="text-gray-600 text-sm">{offer.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Trains */}
//         {trains.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
//               <FaTrain className="text-primary" /> Popular Trains
//             </h2>

//             <div className="grid md:grid-cols-3 gap-6">
//               {trains.map(t => (
//                 <div key={t.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                   <h3 className="font-semibold">{t.name}</h3>
//                   <p className="text-sm text-gray-600">{t.from} → {t.to}</p>
//                   <p className="text-xs text-gray-500">Train No: {t.number}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaTrain, FaGift, FaDatabase } from 'react-icons/fa';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';
import { indianTrains } from '../data/indianTrains.dataset';

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const fetchTrains = async () => {
      const snapshot = await getDocs(collection(db, 'trains'));
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTrains(list.slice(0, 3));
    };
    fetchTrains();
  }, []);

  // ✅ FIXED SEEDING
  const handleSeedData = async () => {
    setSeeding(true);

    try {
      const trainsRef = collection(db, 'trains');
      let batch = writeBatch(db);

      indianTrains.forEach(train => {
        const docRef = doc(trainsRef, train.number); // ← UNIQUE ID
        batch.set(docRef, {
          ...train,
          createdAt: new Date()
        });
      });

      await batch.commit();
      toast.success('Trains seeded without duplicates');

      const snapshot = await getDocs(trainsRef);
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTrains(list.slice(0, 3));
    } catch (err) {
      console.error(err);
      toast.error('Seeding failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, 'trains'));
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      const results = list.filter(
        t =>
          t.from.toLowerCase().trim() === from.toLowerCase().trim() &&
          t.to.toLowerCase().trim() === to.toLowerCase().trim()
      );


      if (results.length === 0) {
        toast.error('No trains found');
        return;
      }

      navigate('/search', {
        state: { trains: results, from, to, date },
      });
    } catch (err) {
      console.error(err);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const offers = [
    { title: '10% off on First Booking', description: 'Get 10% discount on your first train booking' },
    { title: 'Students Discount', description: 'Special discount for students with valid ID' },
    { title: 'Weekend Travel Deals', description: 'Enjoy reduced fares on weekend travels' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div className="max-w-6xl mx-auto px-4 py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Book Your Train Journey</h1>
          <p className="text-gray-600 mb-4">Fast, Easy, and Reliable Train Booking</p>

          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <FaDatabase />
            {seeding ? 'Seeding...' : 'Seed Train Data'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-8 mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" className="border p-3 rounded" required />
            <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="border p-3 rounded" required />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-3 rounded" required />
            <button disabled={loading} className="bg-primary text-white rounded px-4 py-2">
              {loading ? 'Searching...' : <><FaSearch /> Search</>}
            </button>
          </form>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
            <FaGift className="text-secondary" /> Featured Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {trains.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
              <FaTrain className="text-primary" /> Popular Trains
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {trains.map(t => (
                <div key={t.id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-600">{t.from} → {t.to}</p>
                  <p className="text-xs text-gray-500">Train No: {t.number}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
