import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                index + 1 <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {index + 1 < currentStep ? (
                <FaCheck className="text-white" />
              ) : (
                index + 1
              )}
            </motion.div>
            <p
              className={`mt-2 text-sm font-medium ${
                index + 1 <= currentStep ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {step}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-4 ${
                index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;

