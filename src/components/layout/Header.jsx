import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useRBAC } from '../../contexts/RBACContext';
import { useSocket } from '../../contexts/SocketContext';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiBell, FiSearch, FiChevronDown, FiLogOut, FiUser } = FiIcons;

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { currentUser } = useRBAC();
  const { connected, onlineUsers } = useSocket();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5" />
          </button>

          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, staff, or records..."
              className="pl-10 pr-4 py-2 w-96 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-gray-600">
              {connected ? `${onlineUsers.length} online` : 'Disconnected'}
            </span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <SafeIcon icon={FiBell} className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={currentUser?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt={currentUser?.name || user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser?.name || user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">{currentUser?.role?.replace('_', ' ') || 'Role'}</div>
              </div>
              <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
            </button>

            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="font-medium text-gray-900">{currentUser?.name || 'User'}</div>
                  <div className="text-sm text-gray-600">{currentUser?.email || 'email@example.com'}</div>
                </div>
                
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700">
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                
                <button
                  onClick={() => {
                    logout();
                    setShowProfile(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;