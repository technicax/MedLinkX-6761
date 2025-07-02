import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import SiteSelector from './SiteSelector';
import { useAuth } from '../../contexts/AuthContext';
import { useRBAC } from '../../contexts/RBACContext';
import { useSite } from '../../contexts/SiteContext';
import { useSocket } from '../../contexts/SocketContext';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiBell, FiSearch, FiChevronDown, FiLogOut, FiUser, FiSettings } = FiIcons;

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { currentUser } = useRBAC();
  const { currentSite } = useSite();
  const { connected, onlineUsers } = useSocket();
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Site-specific search
      const term = searchTerm.toLowerCase();
      if (term.includes('patient') || term.includes('p-') || term.includes('room')) {
        navigate('/patients');
      } else if (term.includes('staff') || term.includes('doctor') || term.includes('nurse')) {
        navigate('/staff');
      } else if (term.includes('emergency') || term.includes('alert')) {
        navigate('/emergency');
      } else if (term.includes('message') || term.includes('chat')) {
        navigate('/messages');
      } else if (term.includes('report') || term.includes('analytics')) {
        navigate('/reports');
      } else {
        navigate('/patients');
      }
      setSearchTerm('');
      setShowSearch(false);
    }
  };

  const handleProfileNavigation = (path) => {
    navigate(path);
    setShowProfile(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate('/');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const sitePrefix = currentSite ? `${currentSite.shortName} - ` : '';
    
    switch (path) {
      case '/dashboard': return `${sitePrefix}Dashboard`;
      case '/messages': return `${sitePrefix}Messages`;
      case '/patients': return `${sitePrefix}Patients`;
      case '/staff': return `${sitePrefix}Staff`;
      case '/emergency': return `${sitePrefix}Emergency`;
      case '/reports': return `${sitePrefix}Reports`;
      case '/settings': return `${sitePrefix}Settings`;
      default: return `${sitePrefix}Hospital Communication System`;
    }
  };

  // Site-specific online users count
  const siteOnlineUsers = onlineUsers.filter(user => 
    currentSite ? user.siteId === currentSite.id : true
  );

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5" />
          </button>

          {/* Site Selector */}
          <SiteSelector />

          {/* Page Title */}
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
            {currentSite && (
              <p className="text-xs text-gray-500">{currentSite.name}</p>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            {showSearch ? (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSearch}
                className="flex items-center"
              >
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search ${currentSite?.shortName || 'hospital'} records...`}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => {
                      if (!searchTerm) setShowSearch(false);
                    }}
                  />
                </div>
              </motion.form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Search"
              >
                <SafeIcon icon={FiSearch} className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Site-specific Connection Status */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-gray-600">
              {connected ? `${siteOnlineUsers.length} online` : 'Offline'}
            </span>
            {currentSite && (
              <span className="text-xs text-gray-500">• {currentSite.shortName}</span>
            )}
          </div>

          {/* Site-specific Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/emergency')}
            title="Emergency Alerts"
          >
            <SafeIcon icon={FiBell} className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile Dropdown */}
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
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser?.name || user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {currentUser?.role?.replace('_', ' ') || 'Role'} • {currentSite?.shortName}
                </div>
              </div>
              <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
            </button>

            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                onMouseLeave={() => setShowProfile(false)}
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="font-medium text-gray-900">
                    {currentUser?.name || 'User'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentUser?.email || 'email@example.com'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {currentUser?.department || 'Department'} • {currentSite?.name}
                  </div>
                </div>

                {/* Menu Items */}
                <button
                  onClick={() => handleProfileNavigation('/settings')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => handleProfileNavigation('/settings')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="w-4 h-4" />
                  <span>System Settings</span>
                </button>
                <button
                  onClick={() => handleProfileNavigation('/emergency')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <SafeIcon icon={FiBell} className="w-4 h-4" />
                  <span>Notifications</span>
                </button>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      {showSearch && searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-6 right-6 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2">Quick suggestions for {currentSite?.shortName}:</div>
            <div className="space-y-1">
              {[
                { label: 'Search Patients', action: () => navigate('/patients') },
                { label: 'Find Staff Members', action: () => navigate('/staff') },
                { label: 'Emergency Alerts', action: () => navigate('/emergency') },
                { label: 'View Messages', action: () => navigate('/messages') },
                { label: 'Generate Reports', action: () => navigate('/reports') }
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    suggestion.action();
                    setSearchTerm('');
                    setShowSearch(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;