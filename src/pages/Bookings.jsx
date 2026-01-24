import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchBookings = async () => {
      try {
        // const q = query(
        //   collection(db, 'bookings'),
        //   where('userId', '==', user.uid),
        //   orderBy('createdAt', 'desc')
        // );
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (err) {
        console.error('Fetch bookings error:', err);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div
                key={b.id}
                className="bg-white p-6 rounded-xl shadow border"
              >
                <h2 className="text-lg font-semibold">{b.trainName}</h2>
                <p className="text-sm text-gray-600">
                  {b.from} → {b.to}
                </p>
                <p className="text-sm">Class: {b.classType}</p>
                <p className="text-sm">Passengers: {b.passengers.length}</p>
                <p className="text-sm font-medium">Amount: ₹{b.amount}</p>
                <p className="text-xs text-gray-400">
                  Booking ID: {b.bookingId}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
