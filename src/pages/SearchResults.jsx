import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter, FaSort } from 'react-icons/fa';
import TrainCard from '../components/TrainCard';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  useEffect(() => {
    if (location.state?.trains) {
      setTrains(location.state.trains);
      setSearchParams({
        from: location.state.from || '',
        to: location.state.to || '',
        date: location.state.date || ''
      });
    } else {
      // If no state, try to fetch from Firestore or redirect
      toast.error('No search results found');
      navigate('/');
    }
  }, [location, navigate]);

  if (trains.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">No trains found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Search Results
            </h2>
            <p className="text-gray-600">
              Showing {trains.length} train(s) for{' '}
              {searchParams.from && searchParams.to && (
                <span className="font-semibold">
                  {searchParams.from} → {searchParams.to}
                </span>
              )}
              {searchParams.date && (
                <span className="ml-2">
                  on {new Date(searchParams.date).toLocaleDateString('en-IN')}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaFilter className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaSort className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Sort By</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {trains.map((train, index) => (
              <motion.div
                key={train.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TrainCard train={train} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResults;

