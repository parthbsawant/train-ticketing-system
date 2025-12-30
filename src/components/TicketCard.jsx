import { motion } from 'framer-motion';
import { FaTrain, FaCheckCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TicketCard = ({ booking, train }) => {
  const handleDownloadPDF = async () => {
    const ticketElement = document.getElementById('ticket-content');
    const canvas = await html2canvas(ticketElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ticket-${booking.bookingId}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        id="ticket-content"
        className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-2" />
          </motion.div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        <div className="border-t-2 border-b-2 border-gray-200 py-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaTrain className="text-primary text-2xl" />
            <h3 className="text-xl font-bold text-gray-800">TrainEase Ticket</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Train</p>
              <p className="text-lg font-semibold text-gray-800">{train?.name}</p>
              <p className="text-sm text-gray-500">Train No: {train?.number}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-semibold text-gray-800">{train?.from}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">To</p>
                <p className="font-semibold text-gray-800">{train?.to}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-800">
                  {booking?.createdAt 
                    ? (booking.createdAt.toDate 
                        ? new Date(booking.createdAt.toDate()).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                        : new Date(booking.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }))
                    : new Date().toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold text-gray-800">{booking?.classType}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">Passengers</p>
              {booking?.passengers?.map((passenger, index) => (
                <div key={index} className="bg-white p-3 rounded mb-2">
                  <p className="font-semibold text-gray-800">
                    {index + 1}. {passenger.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Age: {passenger.age} | Gender: {passenger.gender}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-semibold">Total Amount</p>
                <p className="text-2xl font-bold text-primary">₹{booking?.amount}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="text-lg font-mono font-bold text-gray-800">{booking?.bookingId}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Download Ticket (PDF)
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Book Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketCard;

