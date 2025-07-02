import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useRBAC } from '../../contexts/RBACContext';
import { useSite } from '../../contexts/SiteContext';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiMessageSquare, FiUsers, FiUserCheck, FiAlertTriangle, FiBarChart3, FiSettings, FiActivity } = FiIcons;

const Sidebar = ({ isOpen, onToggle }) => {
  const { currentUser } = useRBAC();
  const { currentSite } = useSite();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/messages', icon: FiMessageSquare, label: 'Messages', badge: 3 },
    { path: '/patients', icon: FiUsers, label: 'Patients' },
    { path: '/staff', icon: FiUserCheck, label: 'Staff' },
    { path: '/emergency', icon: FiAlertTriangle, label: 'Emergency', badge: 2 },
    { path: '/reports', icon: FiBarChart3, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40"
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: currentSite?.theme?.primary || '#2563EB' }}
          >
            <SafeIcon icon={FiActivity} className="w-5 h-5" />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <div className="text-lg font-bold text-gray-900">
                {currentSite?.shortName || 'MedLinkX'}
              </div>
              <div className="text-xs text-gray-500">
                {currentSite?.type || 'Hospital System'}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Site Info Banner */}
      {isOpen && currentSite && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mx-2 mb-4 p-3 rounded-lg border"
          style={{ 
            backgroundColor: currentSite.theme.primary + '10',
            borderColor: currentSite.theme.primary + '30'
          }}
        >
          <div className="text-xs font-medium" style={{ color: currentSite.theme.primary }}>
            Current Hospital
          </div>
          <div className="text-sm font-medium text-gray-900 truncate">
            {currentSite.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentSite.beds} beds • {currentSite.departments.length} departments
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 rounded-lg transition-colors relative group ${
                isActive
                  ? `text-white shadow-sm`
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? currentSite?.theme?.primary || '#2563EB' : 'transparent'
            })}
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

            {/* Badge */}
            {item.badge && (
              <>
                {isOpen ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {item.badge}
                  </motion.span>
                ) : (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </>
            )}

            {/* Tooltip for collapsed sidebar */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
                {item.badge && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1">
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Status */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={currentUser?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm min-w-0 flex-1"
            >
              <div className="font-medium text-gray-900 truncate">
                {currentUser?.name || 'User'}
              </div>
              <div className="text-gray-500 truncate text-xs">
                {currentUser?.role?.replace('_', ' ') || 'Online'} • {currentSite?.code}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
        style={{ borderColor: currentSite?.theme?.primary + '30' || '#E5E7EB' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <SafeIcon 
            icon={FiActivity} 
            className="w-4 h-4"
            style={{ color: currentSite?.theme?.primary || '#6B7280' }}
          />
        </motion.div>
      </button>
    </motion.div>
  );
};

export default Sidebar;