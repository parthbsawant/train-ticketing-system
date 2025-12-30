import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus, FaUser, FaTrain } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
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
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: 'Male' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    const fetchTrain = async () => {
      try {
        const trainDoc = await getDoc(doc(db, 'trains', trainId));
        if (trainDoc.exists()) {
          setTrain({ id: trainDoc.id, ...trainDoc.data() });
        } else {
          toast.error('Train not found');
          navigate('/');
        }
      } catch (error) {
        toast.error('Error fetching train details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrain();
  }, [trainId, user, navigate]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleContinue = () => {
    if (!selectedClass) {
      toast.error('Please select a class');
      return;
    }

    const isValid = passengers.every(p => p.name && p.age && p.gender);
    if (!isValid) {
      toast.error('Please fill all passenger details');
      return;
    }

    const classData = train.classes[selectedClass];
    const totalAmount = classData.price * passengers.length;

    navigate('/confirm', {
      state: {
        train,
        selectedClass,
        passengers,
        amount: totalAmount
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading train details...</p>
        </div>
      </div>
    );
  }

  if (!train) {
    return null;
  }

  const steps = ['Search', 'Details', 'Confirm'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Stepper currentStep={2} steps={steps} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Train Summary Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaTrain className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{train.name}</h3>
                <p className="text-sm text-gray-500">Train No: {train.number}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">From</p>
                <p className="font-semibold text-gray-800">{train.from}</p>
                <p className="text-gray-500">{train.departure}</p>
              </div>
              <div>
                <p className="text-gray-600">To</p>
                <p className="font-semibold text-gray-800">{train.to}</p>
                <p className="text-gray-500">{train.arrival}</p>
              </div>
            </div>
          </div>

          {/* Class Selection */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Class</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(train.classes).map(([classType, classData]) => (
                <button
                  key={classType}
                  onClick={() => setSelectedClass(classType)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedClass === classType
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{classType}</p>
                      <p className="text-sm text-gray-600">₹{classData.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Seats: {classData.seats}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaUser /> Passenger Details
              </h3>
              <button
                onClick={handleAddPassenger}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <FaPlus /> Add Passenger
              </button>
            </div>

            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-700">Passenger {index + 1}</h4>
                    {passengers.length > 1 && (
                      <button
                        onClick={() => handleRemovePassenger(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        placeholder="Enter name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        placeholder="Enter age"
                        min="1"
                        max="120"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedClass && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare ({selectedClass}):</span>
                  <span className="font-semibold">₹{train.classes[selectedClass].price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Passengers:</span>
                  <span className="font-semibold">{passengers.length}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{train.classes[selectedClass].price * passengers.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium text-lg"
          >
            Continue to Confirm Booking
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;

