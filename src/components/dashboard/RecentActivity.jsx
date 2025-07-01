import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMessageSquare, FiFileText, FiAlertTriangle } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'patient',
      message: 'New patient admitted to ICU',
      user: 'Dr. Sarah Johnson',
      time: '2 minutes ago',
      icon: FiUser,
      color: 'blue'
    },
    {
      id: 2,
      type: 'message',
      message: 'Message sent to nursing team',
      user: 'Dr. Michael Brown',
      time: '5 minutes ago',
      icon: FiMessageSquare,
      color: 'green'
    },
    {
      id: 3,
      type: 'report',
      message: 'Lab results updated',
      user: 'Lab Technician',
      time: '10 minutes ago',
      icon: FiFileText,
      color: 'purple'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Emergency alert resolved',
      user: 'Emergency Team',
      time: '15 minutes ago',
      icon: FiAlertTriangle,
      color: 'red'
    }
  ];

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      red: 'text-red-600 bg-red-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconColor(activity.color)}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.user}</p>
            </div>
            
            <div className="text-xs text-gray-400">{activity.time}</div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;