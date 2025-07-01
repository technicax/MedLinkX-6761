import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiUserCheck, FiAlertTriangle, FiActivity } = FiIcons;

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Active Staff',
      value: '156',
      change: '+3%',
      trend: 'up',
      icon: FiUserCheck,
      color: 'green'
    },
    {
      title: 'Critical Alerts',
      value: '8',
      change: '-25%',
      trend: 'down',
      icon: FiAlertTriangle,
      color: 'red'
    },
    {
      title: 'Bed Occupancy',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: FiActivity,
      color: 'yellow'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(stat.color)}`}>
              <SafeIcon icon={stat.icon} className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last week</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;