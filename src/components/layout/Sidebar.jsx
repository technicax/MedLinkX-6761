import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, FiMessageSquare, FiUsers, FiUserCheck, 
  FiAlertTriangle, FiBarChart3, FiSettings, FiActivity 
} = FiIcons;

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/messages', icon: FiMessageSquare, label: 'Messages', badge: 3 },
    { path: '/patients', icon: FiUsers, label: 'Patients' },
    { path: '/staff', icon: FiUserCheck, label: 'Staff' },
    { path: '/emergency', icon: FiAlertTriangle, label: 'Emergency', badge: 2 },
    { path: '/reports', icon: FiBarChart3, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiActivity} className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900"
            >
              HCS
            </motion.div>
          )}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 rounded-lg transition-colors relative ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 font-medium"
              >
                {item.label}
              </motion.span>
            )}
            {item.badge && isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {item.badge}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm"
            >
              <div className="font-medium text-gray-900">Online</div>
              <div className="text-gray-500">All systems operational</div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;