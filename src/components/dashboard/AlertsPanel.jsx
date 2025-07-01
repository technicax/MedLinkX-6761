import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiClock, FiHeart, FiThermometer } = FiIcons;

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Patient Critical Condition',
      description: 'Room 204 - Vitals unstable',
      time: '2 min ago',
      icon: FiHeart,
      priority: 'high'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Medication Due',
      description: 'Room 315 - Pain medication',
      time: '5 min ago',
      icon: FiClock,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'temperature',
      title: 'Temperature Alert',
      description: 'Room 102 - Fever detected',
      time: '10 min ago',
      icon: FiThermometer,
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-blue-200 bg-blue-50'
    };
    return colors[priority] || colors.medium;
  };

  const getIconColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-blue-600'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon 
                icon={alert.icon} 
                className={`w-5 h-5 mt-0.5 ${getIconColor(alert.priority)}`} 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Alerts
      </button>
    </div>
  );
};

export default AlertsPanel;