import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare, FiEdit, FiCalendar } = FiIcons;

const StaffDetails = ({ staff }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const schedule = [
    { day: 'Monday', shift: '7:00 AM - 7:00 PM', status: 'scheduled' },
    { day: 'Tuesday', shift: '7:00 AM - 7:00 PM', status: 'scheduled' },
    { day: 'Wednesday', shift: 'Off', status: 'off' },
    { day: 'Thursday', shift: '7:00 AM - 7:00 PM', status: 'scheduled' },
    { day: 'Friday', shift: '7:00 AM - 7:00 PM', status: 'scheduled' },
    { day: 'Saturday', shift: 'On Call', status: 'oncall' },
    { day: 'Sunday', shift: 'Off', status: 'off' }
  ];

  const recentActivity = [
    { action: 'Completed patient consultation', time: '2 hours ago' },
    { action: 'Updated patient records', time: '4 hours ago' },
    { action: 'Attended emergency call', time: '6 hours ago' },
    { action: 'Submitted shift report', time: '1 day ago' }
  ];

  const certifications = [
    { name: 'Board Certified Emergency Medicine', expires: '2025-12-31' },
    { name: 'Advanced Cardiac Life Support (ACLS)', expires: '2024-08-15' },
    { name: 'Pediatric Advanced Life Support (PALS)', expires: '2024-10-20' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      online: 'text-green-600 bg-green-50 border-green-200',
      busy: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      offline: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[status] || colors.offline;
  };

  const getScheduleColor = (status) => {
    const colors = {
      scheduled: 'text-blue-600',
      oncall: 'text-yellow-600',
      off: 'text-gray-400'
    };
    return colors[status] || colors.scheduled;
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'activity', label: 'Activity' },
    { id: 'certifications', label: 'Certifications' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      {/* Staff Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={staff.avatar}
              alt={staff.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
              staff.status === 'online' ? 'bg-green-500' : 
              staff.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{staff.name}</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{staff.role}</p>
            <div className="mt-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(staff.status)}`}>
                {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 mr-3" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-3" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-3" />
                  <span>{staff.location}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Department</h3>
              <p className="text-gray-700 capitalize">{staff.department}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Current Shift</h3>
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                <span>{staff.shift}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Weekly Schedule</h3>
            <div className="space-y-3">
              {schedule.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{day.day}</span>
                  <span className={`text-sm ${getScheduleColor(day.status)}`}>
                    {day.shift}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Certifications & Licenses</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <SafeIcon icon={FiCalendar} className="w-3 h-3 mr-1" />
                      <span>Expires: {new Date(cert.expires).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StaffDetails;