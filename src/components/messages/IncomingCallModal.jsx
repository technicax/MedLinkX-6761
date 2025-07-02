import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiPhoneOff, FiVideo, FiMic, FiMicOff } = FiIcons;

const IncomingCallModal = ({ caller, callType, onAccept, onReject }) => {
  const [isRinging, setIsRinging] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Auto-reject after 30 seconds
    const timer = setTimeout(() => {
      if (isRinging) {
        handleReject();
      }
    }, 30000);

    // Play ringing sound simulation
    const ringInterval = setInterval(() => {
      if (isRinging) {
        console.log('Ring...');
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(ringInterval);
    };
  }, [isRinging]);

  const handleAccept = () => {
    setIsRinging(false);
    addNotification({
      type: 'success',
      title: 'Call Accepted',
      message: `Answered ${callType} call from ${caller.name}`
    });
    onAccept();
  };

  const handleReject = () => {
    setIsRinging(false);
    addNotification({
      type: 'info',
      title: 'Call Declined',
      message: `Declined ${callType} call from ${caller.name}`
    });
    onReject();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        {/* Caller Info */}
        <div className="mb-8">
          <motion.div
            animate={{ scale: isRinging ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
          >
            <img
              src={caller.avatar}
              alt={caller.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{caller.name}</h2>
          <p className="text-gray-600 mb-1">{caller.role}</p>
          <p className="text-sm text-gray-500 capitalize">
            Incoming {callType} call
          </p>
        </div>

        {/* Call Status */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <SafeIcon icon={callType === 'video' ? FiVideo : FiPhone} className="w-5 h-5" />
            <span className="font-medium">Ringing...</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-8">
          {/* Reject Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReject}
            className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <SafeIcon icon={FiPhoneOff} className="w-7 h-7 text-white" />
          </motion.button>

          {/* Accept Audio Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAccept}
            className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
          >
            <SafeIcon icon={FiPhone} className="w-7 h-7 text-white" />
          </motion.button>

          {/* Accept Video Button (only for video calls) */}
          {callType === 'video' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAccept}
              className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            >
              <SafeIcon icon={FiVideo} className="w-7 h-7 text-white" />
            </motion.button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Mute">
            <SafeIcon icon={FiMicOff} className="w-5 h-5 text-gray-600" />
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Send Message
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IncomingCallModal;