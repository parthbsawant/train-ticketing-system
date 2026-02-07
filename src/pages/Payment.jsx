import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [method, setMethod] = useState(null);
    const [processing, setProcessing] = useState(false);

    if (!state) {
        navigate('/');
        return null;
    }

    const { train, selectedClass, passengers, amount } = state;

    // -------- SAVE BOOKING ----------
    //   const finalizeBooking = async () => {
    //     try {
    //       const booking = {
    //         userId: user.uid,
    //         trainId: train.id || train.firestoreId,
    //         trainName: train.name,
    //         classType: selectedClass,
    //         passengers,
    //         amount,
    //         from: train.from,
    //         to: train.to,
    //         createdAt: serverTimestamp(),
    //         paymentMethod: method,
    //         status: 'confirmed'
    //       };

    //       const doc = await addDoc(collection(db, 'bookings'), booking);

    //       toast.success('Payment successful');
    //       navigate(`/ticket/${doc.id}`);
    //     } catch (err) {
    //       console.error(err);
    //       toast.error('Booking save failed');
    //     }
    //   };
    const finalizeBooking = async () => {
        try {
            if (!user?.uid) {
                toast.error('User not logged in');
                return;
            }

            const bookingId = `TNE${Date.now()}`; // ✅ required for Ticket.jsx lookup

            // const booking = {
            //     bookingId, // ✅ ADD THIS
            //     userId: user.uid,

            //     trainId: train.id || train.firestoreId,
            //     trainName: train.name,

            //     from: train.from,
            //     to: train.to,

            //     classType: selectedClass,
            //     passengers,
            //     amount,

            //     paymentMethod: method,
            //     status: 'confirmed',

            //     createdAt: serverTimestamp()
            // };

            const booking = {
                userId: user.uid,
                trainId: train.number,   // ✅ ALWAYS EXISTS
                trainName: train.name,
                classType: selectedClass,
                passengers,
                amount,
                from: train.from,
                to: train.to,
                createdAt: serverTimestamp(),
                paymentMethod: method,
                status: 'confirmed'
            };


            console.log("Saving booking:", booking);

            const ref = await addDoc(collection(db, 'bookings'), booking);

            toast.success('Payment successful');

            navigate(`/ticket/${bookingId}`, {   // ✅ use bookingId not doc.id
                state: {
                    booking: { ...booking, id: ref.id },
                    train
                }
            });

        } catch (err) {
            console.error("BOOKING SAVE ERROR:", err);
            toast.error(err.message || 'Booking save failed');
        }
    };

    // -------- CARD PAYMENT (DEMO) ----------
    const handleCardPay = async () => {
        setProcessing(true);
        setTimeout(() => {
            finalizeBooking();
        }, 1500);
    };

    // -------- UPI QR CONFIRM ----------
    const handleUPIConfirm = async () => {
        setProcessing(true);
        setTimeout(() => {
            finalizeBooking();
        }, 1500);
    };

    const upiString =
        `upi://pay?pa=demo@upi&pn=TrainEase&am=${amount}&cu=INR&tn=TrainTicket`;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Choose Payment Method
                </h2>

                {!method && (
                    <div className="space-y-4">
                        <button
                            onClick={() => setMethod('card')}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg"
                        >
                            Pay by Card
                        </button>

                        <button
                            onClick={() => setMethod('upi')}
                            className="w-full bg-green-600 text-white py-3 rounded-lg"
                        >
                            Pay by UPI QR
                        </button>
                    </div>
                )}

                {/* ---------- CARD FORM ---------- */}
                {method === 'card' && (
                    <div className="space-y-4">
                        <input placeholder="Card Number" className="border p-3 w-full rounded" />
                        <input placeholder="Name on Card" className="border p-3 w-full rounded" />
                        <div className="grid grid-cols-2 gap-3">
                            <input placeholder="MM/YY" className="border p-3 rounded" />
                            <input placeholder="CVV" className="border p-3 rounded" />
                        </div>

                        <button
                            onClick={handleCardPay}
                            disabled={processing}
                            className="w-full bg-primary text-white py-3 rounded-lg"
                        >
                            Pay ₹{amount}
                        </button>
                    </div>
                )}

                {/* ---------- UPI QR ---------- */}
                {method === 'upi' && (
                    <div className="text-center space-y-4">
                        <QRCodeCanvas value={upiString} size={220} />

                        <p className="text-sm text-gray-600">
                            Scan QR with any UPI app
                        </p>

                        <button
                            onClick={handleUPIConfirm}
                            disabled={processing}
                            className="w-full bg-primary text-white py-3 rounded-lg"
                        >
                            I Have Paid
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
