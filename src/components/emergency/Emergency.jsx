import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EmergencyAlerts from './EmergencyAlerts';
import EmergencyBroadcast from './EmergencyBroadcast';
import EmergencyProtocols from './EmergencyProtocols';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiRadio, FiFileText } = FiIcons;

const Emergency = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  const tabs = [
    { id: 'alerts', label: 'Active Alerts', icon: FiAlertTriangle, count: 3 },
    { id: 'broadcast', label: 'Broadcast', icon: FiRadio },
    { id: 'protocols', label: 'Protocols', icon: FiFileText }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Emergency Management</h1>
        <div className="flex items-center space-x-2 text-red-600">
          <SafeIcon icon={FiAlertTriangle} className="w-5 h-5" />
          <span className="text-sm font-medium">Emergency System Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'alerts' && <EmergencyAlerts />}
          {activeTab === 'broadcast' && <EmergencyBroadcast />}
          {activeTab === 'protocols' && <EmergencyProtocols />}
        </div>
      </div>
    </motion.div>
  );
};

export default Emergency;