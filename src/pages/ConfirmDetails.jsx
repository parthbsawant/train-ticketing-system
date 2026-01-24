import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrain, FaUser, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Stepper from '../components/Stepper';
import toast from 'react-hot-toast';

const ConfirmDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!location.state) {
      toast.error('No booking data found');
      navigate('/');
      return;
    }
    setBookingData(location.state);
  }, [location, navigate]);

  // const handlePayment = async () => {
  //   if (!bookingData || processing) return; // Prevent double-clicking

  //   if (!user) {
  //     toast.error('Please login to complete booking');
  //     navigate('/login');
  //     return;
  //   }

  //   setProcessing(true);
    
  //   // Clear any existing toasts first
  //   toast.dismiss();
    
  //   try {
  //     // Simulate payment processing
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     // Generate booking ID
  //     const bookingId = `TNE${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  //     // Create booking document in Firestore
  //     const bookingDoc = {
  //       bookingId,
  //       userId: user.uid,
  //       trainId: bookingData.train.id,
  //       classType: bookingData.selectedClass,
  //       passengers: bookingData.passengers,
  //       amount: bookingData.amount,
  //       status: 'Paid',
  //       createdAt: serverTimestamp()
  //     };

  //     // Add booking to Firestore
  //     const docRef = await addDoc(collection(db, 'bookings'), bookingDoc);
  //     console.log('Booking created successfully:', docRef.id);

  //     // Show success message
  //     toast.success('Payment successful!');
      
  //     // Small delay to ensure toast is visible, then navigate
  //     await new Promise(resolve => setTimeout(resolve, 500));
      
  //     // Prepare booking data for navigation (use plain objects, not functions)
  //     const bookingForState = { 
  //       ...bookingDoc, 
  //       id: docRef.id,
  //       createdAt: new Date() // Use actual Date object, not a function
  //     };
      
  //     // Navigate to ticket page
  //     navigate(`/ticket/${bookingId}`, {
  //       state: {
  //         booking: bookingForState,
  //         train: bookingData.train
  //       },
  //       replace: true // Replace current history entry
  //     });
  //   } catch (error) {
  //     // Clear any success toasts
  //     toast.dismiss();
      
  //     // Show detailed error message
  //     console.error('Payment error:', error);
  //     console.error('Error code:', error.code);
  //     console.error('Error message:', error.message);
      
  //     let errorMessage = 'Payment failed. Please try again.';
      
  //     if (error.code === 'permission-denied') {
  //       errorMessage = 'Permission denied. Please check Firestore rules.';
  //       console.error('❌ Firestore rules are blocking writes to bookings collection.');
  //       console.error('📝 Make sure bookings rules allow writes for authenticated users.');
  //     } else if (error.code === 'unavailable') {
  //       errorMessage = 'Network error. Please check your internet connection.';
  //     }
      
  //     toast.error(errorMessage);
  //     setProcessing(false); // Reset processing state on error
  //   }
  // };
  const handlePayment = async () => {
  if (!bookingData || processing) return;

  if (!user) {
    toast.error('Please login to complete booking');
    navigate('/login');
    return;
  }

  setProcessing(true);
  toast.dismiss();

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const bookingId = `TNE${Date.now()}`;

    const bookingDoc = {
      bookingId,
      userId: user.uid,
      trainId: bookingData.train.number, // use number (matches your DB)
      trainName: bookingData.train.name,
      from: bookingData.train.from,
      to: bookingData.train.to,
      classType: bookingData.selectedClass,
      passengers: bookingData.passengers,
      amount: bookingData.amount,
      status: 'Paid',
      createdAt: new Date(),
    };

    console.log("Trying to save booking:", bookingDoc);

    const ref = await addDoc(collection(db, 'bookings'), bookingDoc);

    console.log("Firestore write success:", ref.id);

    toast.success('Payment successful!');

    navigate(`/ticket/${bookingId}`, {
      state: {
        booking: { ...bookingDoc, id: ref.id },
        train: bookingData.train,
      },
      replace: true
    });

  } catch (err) {
    console.error("PAYMENT ERROR FULL:", err);
    toast.error(err.message || 'Payment failed. Check console.');
  } finally {
    setProcessing(false);
  }
};

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const steps = ['Search', 'Details', 'Confirm'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Stepper currentStep={3} steps={steps} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Train Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaTrain className="text-primary" />
              Train Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Train:</span>
                <span className="font-semibold text-gray-800">{bookingData.train.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Train Number:</span>
                <span className="font-semibold text-gray-800">{bookingData.train.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-semibold text-gray-800">
                  {bookingData.train.from} → {bookingData.train.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold text-gray-800">{bookingData.selectedClass}</span>
              </div>
            </div>
          </div>

          {/* Passenger List */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-primary" />
              Passengers
            </h3>
            <div className="space-y-3">
              {bookingData.passengers.map((passenger, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">
                    {index + 1}. {passenger.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Age: {passenger.age} | Gender: {passenger.gender}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fare Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fare Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare:</span>
                <span className="font-semibold">₹{bookingData.train.classes[bookingData.selectedClass].price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Passengers:</span>
                <span className="font-semibold">{bookingData.passengers.length}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">₹{bookingData.amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCreditCard className="text-primary" />
              Payment
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-600 text-sm">
                💳 Mock Payment Processing
              </p>
              <p className="text-gray-500 text-xs mt-1">
                This is a demo. No actual payment will be processed.
              </p>
            </div>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Pay Now
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmDetails;

