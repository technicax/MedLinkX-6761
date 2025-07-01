import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiRadio, FiUsers, FiMapPin, FiSend, FiMic } = FiIcons;

const EmergencyBroadcast = () => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('high');
  const [recipients, setRecipients] = useState('all');
  const [location, setLocation] = useState('');
  const { addNotification } = useNotification();

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addNotification({
      type: 'success',
      title: 'Emergency Broadcast Sent',
      message: 'Your emergency message has been sent to all selected recipients'
    });

    setMessage('');
    setLocation('');
  };

  const quickMessages = [
    'All clear - Emergency situation resolved',
    'Evacuation in progress - Please follow emergency protocols',
    'Code Blue - Medical emergency in progress',
    'Security alert - Lockdown procedures in effect',
    'Fire alarm activated - Evacuate immediately'
  ];

  const recipientGroups = [
    { value: 'all', label: 'All Staff', count: 156 },
    { value: 'doctors', label: 'All Doctors', count: 45 },
    { value: 'nurses', label: 'All Nurses', count: 78 },
    { value: 'security', label: 'Security Team', count: 12 },
    { value: 'emergency', label: 'Emergency Response', count: 21 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-red-800">
          <SafeIcon icon={FiRadio} className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Emergency Broadcast System</h2>
        </div>
        <p className="text-red-700 mt-2 text-sm">
          Use this system to send urgent messages to hospital staff during emergency situations.
        </p>
      </div>

      <form onSubmit={handleBroadcast} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your emergency message..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>
            <select
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {recipientGroups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label} ({group.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Location
            </label>
            <div className="relative">
              <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., ICU Floor 3"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <SafeIcon icon={FiUsers} className="w-4 h-4" />
            <span className="text-sm">
              Will reach {recipientGroups.find(g => g.value === recipients)?.count} staff members
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiMic} className="w-4 h-4" />
              <span>Voice Message</span>
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!message.trim()}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiSend} className="w-4 h-4" />
              <span>Send Broadcast</span>
            </motion.button>
          </div>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Messages</h3>
        <div className="grid grid-cols-1 gap-2">
          {quickMessages.map((quickMsg, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setMessage(quickMsg)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{quickMsg}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyBroadcast;