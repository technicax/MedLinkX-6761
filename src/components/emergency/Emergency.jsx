import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EmergencyDashboard from './EmergencyDashboard';
import EmergencyAlerts from './EmergencyAlerts';
import EmergencyProtocols from './EmergencyProtocols';
import EmergencyBroadcast from './EmergencyBroadcast';
import IncidentManagement from './IncidentManagement';
import EmergencyContacts from './EmergencyContacts';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiRadio, FiFileText, FiUsers, FiActivity, FiShield } = FiIcons;

const Emergency = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: FiActivity },
    { id: 'alerts', label: 'Active Alerts', icon: FiAlertTriangle },
    { id: 'incidents', label: 'Incidents', icon: FiShield },
    { id: 'protocols', label: 'Protocols', icon: FiFileText },
    { id: 'broadcast', label: 'Broadcast', icon: FiRadio },
    { id: 'contacts', label: 'Contacts', icon: FiUsers }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'alerts':
        return <EmergencyAlerts />;
      case 'incidents':
        return <IncidentManagement />;
      case 'protocols':
        return <EmergencyProtocols />;
      case 'broadcast':
        return <EmergencyBroadcast />;
      case 'contacts':
        return <EmergencyContacts />;
      default:
        return <EmergencyDashboard />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emergency Management</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive emergency response and crisis management system
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
            <span>Declare Emergency</span>
          </motion.button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeView === view.id
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <SafeIcon icon={view.icon} className="w-4 h-4" />
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[calc(100vh-20rem)]">
        {renderView()}
      </div>
    </motion.div>
  );
};

export default Emergency;