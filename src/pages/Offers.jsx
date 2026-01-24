// import { motion } from 'framer-motion';
// import { FaTag, FaPercent, FaGift, FaTrain } from 'react-icons/fa';
// import Offers from './pages/Offers';


// const offers = [
//   {
//     title: "10% Off on First Booking",
//     description: "New users get flat 10% discount on their first train booking.",
//     icon: <FaPercent />,
//     color: "bg-green-100 text-green-600",
//   },
//   {
//     title: "Student Special Discount",
//     description: "Students with valid ID get special discounted fares.",
//     icon: <FaGift />,
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     title: "Weekend Travel Deal",
//     description: "Enjoy reduced fares when you book for Saturday or Sunday.",
//     icon: <FaTrain />,
//     color: "bg-purple-100 text-purple-600",
//   },
//   {
//     title: "Family Booking Offer",
//     description: "Book 4 or more tickets together and get 15% off.",
//     icon: <FaTag />,
//     color: "bg-orange-100 text-orange-600",
//   },
//   {
//     title: "Senior Citizen Discount",
//     description: "Special fare benefits for passengers aged 60+.",
//     icon: <FaGift />,
//     color: "bg-pink-100 text-pink-600",
//   },
//   {
//     title: "Festive Season Offer",
//     description: "Extra discounts during Diwali, Christmas and holidays.",
//     icon: <FaPercent />,
//     color: "bg-yellow-100 text-yellow-600",
//   },
// ];

// const Offers = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-10">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10 text-center"
//         >
//           <h1 className="text-4xl font-bold text-gray-800 mb-3">
//             🎁 Available Offers
//           </h1>
//           <p className="text-gray-600">
//             Save more on every journey with exciting deals
//           </p>
//         </motion.div>

//         {/* Offers Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {offers.map((offer, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
//             >
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 ${offer.color}`}>
//                 {offer.icon}
//               </div>

//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {offer.title}
//               </h3>

//               <p className="text-gray-600 text-sm">
//                 {offer.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Offers;


import { motion } from 'framer-motion';
import { FaTag, FaPercent, FaGift, FaTrain } from 'react-icons/fa';

const offers = [
  {
    title: "10% Off on First Booking",
    description: "New users get flat 10% discount on their first train booking.",
    icon: <FaPercent />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Student Special Discount",
    description: "Students with valid ID get special discounted fares.",
    icon: <FaGift />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Weekend Travel Deal",
    description: "Enjoy reduced fares when you book for Saturday or Sunday.",
    icon: <FaTrain />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Family Booking Offer",
    description: "Book 4 or more tickets together and get 15% off.",
    icon: <FaTag />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Senior Citizen Discount",
    description: "Special fare benefits for passengers aged 60+.",
    icon: <FaGift />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Festive Season Offer",
    description: "Extra discounts during Diwali, Christmas and holidays.",
    icon: <FaPercent />,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🎁 Available Offers
          </h1>
          <p className="text-gray-600">
            Save more on every journey with exciting deals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 ${offer.color}`}>
                {offer.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {offer.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
