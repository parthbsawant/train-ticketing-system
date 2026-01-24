// import { motion } from 'framer-motion';
// import { FaTrain, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const TrainCard = ({ train }) => {
//   const navigate = useNavigate();

//   const handleBookNow = () => {
//     navigate(`/booking/${train.id}`);
//   };

//   return (
//     <motion.div
//       className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <FaTrain className="text-primary text-2xl" />
//           <div>
//             <h3 className="text-xl font-bold text-gray-800">{train.name}</h3>
//             <p className="text-sm text-gray-500">Train No: {train.number}</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-4 mb-4">
//         <div className="flex items-center gap-2">
//           <FaMapMarkerAlt className="text-secondary text-sm" />
//           <div>
//             <p className="text-sm text-gray-600">From</p>
//             <p className="font-semibold text-gray-800">{train.from}</p>
//             <p className="text-xs text-gray-500">{train.departure}</p>
//           </div>
//         </div>

//         <div className="flex-1 flex items-center justify-center">
//           <div className="border-t-2 border-dashed border-gray-300 w-full relative">
//             <FaClock className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-400 text-xs p-1" />
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <FaMapMarkerAlt className="text-secondary text-sm" />
//           <div>
//             <p className="text-sm text-gray-600">To</p>
//             <p className="font-semibold text-gray-800">{train.to}</p>
//             <p className="text-xs text-gray-500">{train.arrival}</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-4">
//         <p className="text-sm text-gray-600">Duration: <span className="font-semibold">{train.duration}</span></p>
//       </div>

//       <div className="mb-4">
//         <p className="text-sm font-semibold text-gray-700 mb-2">Available Classes:</p>
//         <div className="flex flex-wrap gap-2">
//           {Object.entries(train.classes).map(([classType, classData]) => (
//             <div
//               key={classType}
//               className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
//             >
//               <p className="text-xs font-semibold text-gray-700">{classType}</p>
//               <p className="text-xs text-gray-600">₹{classData.price}</p>
//               <p className="text-xs text-gray-500">Seats: {classData.seats}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleBookNow}
//         className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
//       >
//         Book Now
//       </button>
//     </motion.div>
//   );
// };

// export default TrainCard;


import { motion } from 'framer-motion';
import { FaTrain, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TrainCard = ({ train }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!train?.id) {
      toast.error('Train ID missing. Please reseed trains.');
      console.error('Train object missing id:', train);
      return;
    }

    navigate(`/booking/${train.number}`);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaTrain className="text-primary text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{train.name}</h3>
            <p className="text-sm text-gray-500">Train No: {train.number}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-secondary text-sm" />
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-semibold text-gray-800">{train.from}</p>
            <p className="text-xs text-gray-500">{train.departure}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="border-t-2 border-dashed border-gray-300 w-full relative">
            <FaClock className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-400 text-xs p-1" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-secondary text-sm" />
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-semibold text-gray-800">{train.to}</p>
            <p className="text-xs text-gray-500">{train.arrival}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          Duration: <span className="font-semibold">{train.duration}</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Available Classes:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(train.classes).map(([classType, classData]) => (
            <div
              key={classType}
              className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
            >
              <p className="text-xs font-semibold text-gray-700">{classType}</p>
              <p className="text-xs text-gray-600">₹{classData.price}</p>
              <p className="text-xs text-gray-500">Seats: {classData.seats}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleBookNow}
        className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
      >
        Book Now
      </button>
    </motion.div>
  );
};

export default TrainCard;
