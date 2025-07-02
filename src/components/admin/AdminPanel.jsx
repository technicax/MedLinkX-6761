import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FacilityManagement from './FacilityManagement';
import UserAccessManagement from './UserAccessManagement';
import SystemSettings from './SystemSettings';
import AdminDashboard from './AdminDashboard';
import SafeIcon from '../../common/SafeIcon';
import { useRBAC } from '../../contexts/RBACContext';
import { useUserAccess } from '../../contexts/UserAccessContext';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiUsers, FiBuilding, FiBarChart3, FiShield } = FiIcons;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentUser } = useRBAC();
  const { isGlobalAdmin } = useUserAccess();

  // Check if user has admin access
  if (!currentUser || !isGlobalAdmin(currentUser.email)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-96"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You need administrative privileges to access this panel.
          </p>
        </div>
      </motion.div>
    );
  }

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiBarChart3,
      description: 'System overview and analytics'
    },
    {
      id: 'facilities',
      label: 'Facilities',
      icon: FiBuilding,
      description: 'Manage hospitals and medical facilities'
    },
    {
      id: 'users',
      label: 'User Access',
      icon: FiUsers,
      description: 'Manage user permissions and site access'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: FiSettings,
      description: 'Global system configuration'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'facilities':
        return <FacilityManagement />;
      case 'users':
        return <UserAccessManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
              <p className="text-gray-600">
                Manage hospitals, users, and system-wide settings
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Logged in as</p>
          <p className="font-medium text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-red-600">Global Administrator</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <div className="text-left">
                <div>{tab.label}</div>
                <div className="text-xs opacity-75">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;