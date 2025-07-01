import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiMessageSquare, FiAlertTriangle, FiFileText } = FiIcons;

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Patient',
      description: 'Register new patient',
      icon: FiPlus,
      color: 'blue',
      action: () => navigate('/patients')
    },
    {
      title: 'Send Message',
      description: 'Quick communication',
      icon: FiMessageSquare,
      color: 'green',
      action: () => navigate('/messages')
    },
    {
      title: 'Emergency Alert',
      description: 'Broadcast urgent alert',
      icon: FiAlertTriangle,
      color: 'red',
      action: () => navigate('/emergency')
    },
    {
      title: 'Generate Report',
      description: 'Create new report',
      icon: FiFileText,
      color: 'purple',
      action: () => navigate('/reports')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      red: 'bg-red-600 hover:bg-red-700',
      purple: 'bg-purple-600 hover:bg-purple-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            className={`p-4 rounded-lg text-white transition-colors ${getColorClasses(action.color)}`}
          >
            <SafeIcon icon={action.icon} className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">{action.title}</div>
            <div className="text-xs opacity-90 mt-1">{action.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;