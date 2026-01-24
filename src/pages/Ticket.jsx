import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import TicketCard from '../components/TicketCard';
import toast from 'react-hot-toast';

const Ticket = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Try to get from location state first
        if (location.state?.booking && location.state?.train) {
          setBooking(location.state.booking);
          setTrain(location.state.train);
          setLoading(false);
          return;
        }

        // Otherwise fetch from Firestore
        const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
        const bookingDoc = bookingsSnapshot.docs.find(
          doc => doc.data().bookingId === bookingId
        );

        if (bookingDoc) {
          const bookingData = { id: bookingDoc.id, ...bookingDoc.data() };
          setBooking(bookingData);

          // Fetch train details
          const trainDoc = await getDoc(doc(db, 'trains', bookingData.trainId));
          if (trainDoc.exists()) {
            setTrain({ id: trainDoc.id, ...trainDoc.data() });
          }
        } else {
          toast.error('Booking not found');
          navigate('/');
        }
      } catch (error) {
        toast.error('Error fetching booking details');
        console.error(error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!booking || !train) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <TicketCard booking={booking} train={train} />
      </div>
    </div>
  );
};

export default Ticket;

