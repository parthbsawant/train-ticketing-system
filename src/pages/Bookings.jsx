// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebaseConfig';
// import { useAuth } from '../context/AuthContext';
// import { FaTrain, FaTicketAlt, FaClock } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// const Bookings = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         const bookingsQuery = query(
//           collection(db, 'bookings'),
//           where('userId', '==', user.uid)
//         );
//         const bookingsSnapshot = await getDocs(bookingsQuery);
        
//         const bookingsList = await Promise.all(
//           bookingsSnapshot.docs.map(async (bookingDoc) => {
//             const bookingData = { id: bookingDoc.id, ...bookingDoc.data() };
            
//             // Fetch train details
//             const trainDoc = await getDoc(doc(db, 'trains', bookingData.trainId));
//             if (trainDoc.exists()) {
//               bookingData.train = { id: trainDoc.id, ...trainDoc.data() };
//             }
            
//             return bookingData;
//           })
//         );

//         // Sort by creation date (newest first)
//         bookingsList.sort((a, b) => {
//           const aTime = a.createdAt?.toDate?.() || new Date(0);
//           const bTime = b.createdAt?.toDate?.() || new Date(0);
//           return bTime - aTime;
//         });

//         setBookings(bookingsList);
//       } catch (error) {
//         toast.error('Error fetching bookings');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
//               <FaTicketAlt className="text-primary" />
//               My Bookings
//             </h1>
//             <p className="text-gray-600">View all your train bookings</p>
//           </div>

//           {bookings.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//               <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
//               <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
//               <button
//                 onClick={() => navigate('/')}
//                 className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
//               >
//                 Book a Train
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {bookings.map((booking, index) => (
//                 <motion.div
//                   key={booking.id}
//                   className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <FaTrain className="text-primary text-2xl" />
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-800">
//                           {booking.train?.name || 'Train'}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Train No: {booking.train?.number || 'N/A'}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
//                         {booking.status}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Route</p>
//                       <p className="font-semibold text-gray-800">
//                         {booking.train?.from || 'N/A'} → {booking.train?.to || 'N/A'}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Class</p>
//                       <p className="font-semibold text-gray-800">{booking.classType}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Passengers</p>
//                       <p className="font-semibold text-gray-800">
//                         {booking.passengers?.length || 0}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <FaClock />
//                       <span>
//                         Booked on:{' '}
//                         {booking.createdAt?.toDate?.()
//                           ? new Date(booking.createdAt.toDate()).toLocaleDateString('en-IN', {
//                               day: 'numeric',
//                               month: 'short',
//                               year: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit'
//                             })
//                           : 'N/A'}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-right">
//                         <p className="text-sm text-gray-600">Total Amount</p>
//                         <p className="text-xl font-bold text-primary">₹{booking.amount}</p>
//                       </div>
//                       <button
//                         onClick={() => navigate(`/ticket/${booking.bookingId}`, {
//                           state: { booking, train: booking.train }
//                         })}
//                         className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
//                       >
//                         View Ticket
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { FaTrain, FaTicketAlt, FaClock, FaCalendarCheck, FaHistory } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        
        const bookingsList = await Promise.all(
          bookingsSnapshot.docs.map(async (bookingDoc) => {
            const bookingData = { id: bookingDoc.id, ...bookingDoc.data() };
            const trainDoc = await getDoc(doc(db, 'trains', bookingData.trainId));
            if (trainDoc.exists()) {
              bookingData.train = { id: trainDoc.id, ...trainDoc.data() };
            }
            return bookingData;
          })
        );

        // Sort by creation date (newest first)
        bookingsList.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime - aTime;
        });

        setBookings(bookingsList);
      } catch (error) {
        toast.error('Error fetching bookings');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Separate bookings into Upcoming and Past
  const today = new Date();
  const upcomingBookings = bookings.filter(
    (b) => b.date && new Date(b.date) >= today
  );
  const pastBookings = bookings.filter(
    (b) => b.date && new Date(b.date) < today
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaTicketAlt className="text-primary" />
              My Dashboard
            </h1>
            <p className="text-gray-600">View your upcoming and past bookings</p>
          </div>

          {/* No bookings */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Bookings Yet
              </h2>
              <p className="text-gray-600 mb-6">
                You haven’t made any bookings yet.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Book a Train
              </button>
            </div>
          ) : (
            <>
              {/* Upcoming Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <FaCalendarCheck /> Upcoming Trips
                </h2>
                {upcomingBookings.length === 0 ? (
                  <p className="text-gray-500 ml-1">No upcoming trips.</p>
                ) : (
                  <div className="space-y-6">
                    {upcomingBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-green-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <FaTrain className="text-primary text-2xl" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {booking.train?.name || 'Train'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Train No: {booking.train?.number || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {booking.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Route</p>
                            <p className="font-semibold text-gray-800">
                              {booking.train?.from || 'N/A'} → {booking.train?.to || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Class</p>
                            <p className="font-semibold text-gray-800">{booking.classType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Passengers</p>
                            <p className="font-semibold text-gray-800">
                              {booking.passengers?.length || 0}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaClock />
                            <span>
                              Date of Travel:{' '}
                              {booking.date
                                ? new Date(booking.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                                : 'N/A'}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              navigate(`/ticket/${booking.bookingId}`, {
                                state: { booking, train: booking.train }
                              })
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            View Ticket
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* Past Section */}
              <section>
                <h2 className="text-2xl font-semibold text-orange-700 mb-4 flex items-center gap-2">
                  <FaHistory /> Past Trips
                </h2>
                {pastBookings.length === 0 ? (
                  <p className="text-gray-500 ml-1">No past trips yet.</p>
                ) : (
                  <div className="space-y-6">
                    {pastBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <FaTrain className="text-orange-500 text-2xl" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {booking.train?.name || 'Train'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Train No: {booking.train?.number || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                            Completed
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Route</p>
                            <p className="font-semibold text-gray-800">
                              {booking.train?.from || 'N/A'} → {booking.train?.to || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Class</p>
                            <p className="font-semibold text-gray-800">{booking.classType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Passengers</p>
                            <p className="font-semibold text-gray-800">
                              {booking.passengers?.length || 0}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaClock />
                            <span>
                              Travel Date:{' '}
                              {booking.date
                                ? new Date(booking.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                                : 'N/A'}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-xl font-bold text-orange-600">
                              ₹{booking.amount}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Bookings;
