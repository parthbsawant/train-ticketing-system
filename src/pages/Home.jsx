import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaTrain, FaGift, FaDatabase } from 'react-icons/fa';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
// import { seedTrains } from '../seedData';
import toast from 'react-hot-toast';
import { writeBatch } from 'firebase/firestore';
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
    // Fetch all trains for featured section
    const fetchTrains = async () => {
      try {
        const trainsCollection = collection(db, 'trains');
        const trainsSnapshot = await getDocs(trainsCollection);
        const trainsList = trainsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrains(trainsList.slice(0, 3)); // Show first 3 for featured
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  const handleSeedData = async () => {
  setSeeding(true);

  try {
    const trainsRef = collection(db, 'trains');
    const existingSnapshot = await getDocs(trainsRef);

    if (existingSnapshot.size > 0) {
      const confirmSeed = window.confirm(
        'Trains already exist in database. Do you still want to seed again?'
      );
      if (!confirmSeed) {
        setSeeding(false);
        return;
      }
    }

    const BATCH_LIMIT = 500;
    let batch = writeBatch(db);
    let batchCount = 0;
    let totalAdded = 0;

    for (let i = 0; i < indianTrains.length; i++) {
      const train = indianTrains[i];
      const docRef = doc(trainsRef);

      batch.set(docRef, {
        ...train,
        createdAt: new Date()
      });

      batchCount++;
      totalAdded++;

      if (batchCount === BATCH_LIMIT) {
        await batch.commit();
        batch = writeBatch(db);
        batchCount = 0;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }

    toast.success(`✅ Successfully seeded ${totalAdded} trains`);

    // Refresh featured trains
    const updatedSnapshot = await getDocs(trainsRef);
    const trainsList = updatedSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTrains(trainsList.slice(0, 3));
  } catch (error) {
    console.error('Seeding failed:', error);
    toast.error('❌ Failed to seed trains. Check console.');
  } finally {
    setSeeding(false);
  }
};


  // const handleSeedData = async () => {
  //   setSeeding(true);
  //   try {
  //     // Check if trains already exist
  //     const trainsCollection = collection(db, 'trains');
  //     const trainsSnapshot = await getDocs(trainsCollection);

  //     if (trainsSnapshot.docs.length > 0) {
  //       const confirmed = window.confirm('Trains already exist. Do you want to add more?');
  //       if (!confirmed) {
  //         setSeeding(false);
  //         return;
  //       }
  //     }

  //     // Seed all trains
  //     let successCount = 0;
  //     let failCount = 0;

  //     for (const train of seedTrains) {
  //       try {
  //         const { id, ...trainData } = train;
  //         await addDoc(collection(db, 'trains'), trainData);
  //         successCount++;
  //         console.log(`✓ Added train: ${train.name}`);
  //       } catch (trainError) {
  //         failCount++;
  //         console.error(`✗ Failed to add train: ${train.name}`, trainError);
  //       }
  //     }

  //     if (successCount > 0) {
  //       toast.success(`Successfully seeded ${successCount} train(s)!`);
  //     }

  //     if (failCount > 0) {
  //       toast.error(`Failed to seed ${failCount} train(s). Check console for details.`);
  //       console.error('Seeding errors. Common causes:');
  //       console.error('1. Firestore rules blocking writes - Update rules to allow writes');
  //       console.error('2. Network errors - Check internet connection');
  //       console.error('3. Invalid data format - Check seedData.js');
  //     }

  //     // Refresh the trains list
  //     const updatedSnapshot = await getDocs(collection(db, 'trains'));
  //     const trainsList = updatedSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     setTrains(trainsList.slice(0, 3));
  //   } catch (error) {
  //     const errorMessage = error.message || 'Unknown error';
  //     toast.error(`Error seeding data: ${errorMessage}`);
  //     console.error('Full error:', error);
  //     console.error('Error code:', error.code);
  //     console.error('Error details:', error);

  //     // Provide helpful error messages
  //     if (error.code === 'permission-denied') {
  //       console.error('❌ PERMISSION DENIED: Firestore rules are blocking writes.');
  //       console.error('📝 SOLUTION: Update Firestore rules to allow writes temporarily:');
  //       console.error(`
  //         Go to Firebase Console → Firestore → Rules
  //         Change this:
  //           match /trains/{trainId} {
  //             allow read: if true;
  //             allow write: if false;  // ← This is blocking writes
  //           }
          
  //         To this (temporarily):
  //           match /trains/{trainId} {
  //             allow read: if true;
  //             allow write: if true;  // ← Allow writes for seeding
  //           }
          
  //         After seeding, change it back to: allow write: if false;
  //       `);
  //     }
  //   } finally {
  //     setSeeding(false);
  //   }
  // };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const trainsCollection = collection(db, 'trains');
      const trainsSnapshot = await getDocs(trainsCollection);
      const trainsList = trainsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter trains by from and to
      const filteredTrains = trainsList.filter(
        train => train.from.toLowerCase() === from.toLowerCase() &&
          train.to.toLowerCase() === to.toLowerCase()
      );

      if (filteredTrains.length === 0) {
        toast.error('No trains found for this route');
        setLoading(false);
        return;
      }

      // Navigate to search results with filters
      navigate('/search', { state: { trains: filteredTrains, date, from, to } });
    } catch (error) {
      toast.error('Error searching trains');
      console.error(error);
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
      {/* Hero Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Train Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Fast, Easy, and Reliable Train Booking
          </p>
          {/* Temporary Seed Button - Remove after seeding */}
          <div className="mt-4">
            {true && (
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              <FaDatabase />
              {seeding ? 'Seeding Trains...' : 'Seed Train Data (One-time setup)'}
            </button>
            )}

          </div>
        </div>

        {/* Search Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Mumbai"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Delhi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Searching...' : (
                  <>
                    <FaSearch /> Search Trains
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Featured Offers */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaGift className="text-secondary" />
            Featured Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Trains */}
        {trains.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaTrain className="text-primary" />
              Popular Trains
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trains.map((train, index) => (
                <motion.div
                  key={train.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FaTrain className="text-primary text-xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{train.name}</h3>
                      <p className="text-sm text-gray-500">Train No: {train.number}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{train.from}</span> →{' '}
                      <span className="font-semibold">{train.to}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Dep: {train.departure} | Arr: {train.arrival}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;

