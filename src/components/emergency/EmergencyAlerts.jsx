import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiClock, FiMapPin, FiUser, FiCheck, FiX } = FiIcons;

const EmergencyAlerts = () => {
  const { addNotification } = useNotification();

  const alerts = [
    {
      id: 1,
      type: 'cardiac',
      title: 'Cardiac Arrest - Room 204',
      description: 'Patient experiencing cardiac arrest, immediate response required',
      priority: 'critical',
      location: 'ICU - Room 204',
      time: '2 minutes ago',
      assignedTo: 'Dr. Sarah Johnson',
      status: 'active'
    },
    {
      id: 2,
      type: 'trauma',
      title: 'Trauma Alert - ER Bay 3',
      description: 'Multi-vehicle accident victim, severe injuries',
      priority: 'high',
      location: 'Emergency Room - Bay 3',
      time: '5 minutes ago',
      assignedTo: 'Trauma Team Alpha',
      status: 'responding'
    },
    {
      id: 3,
      type: 'fire',
      title: 'Fire Alarm - Kitchen Area',
      description: 'Smoke detected in kitchen area, evacuation protocols initiated',
      priority: 'high',
      location: 'Ground Floor - Kitchen',
      time: '8 minutes ago',
      assignedTo: 'Security Team',
      status: 'investigating'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-50 border-red-200 text-red-800',
      high: 'bg-orange-50 border-orange-200 text-orange-800',
      medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      low: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-red-100 text-red-800',
      responding: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.active;
  };

  const handleResolveAlert = (alertId) => {
    addNotification({
      type: 'success',
      title: 'Alert Resolved',
      message: 'Emergency alert has been marked as resolved'
    });
  };

  const handleDismissAlert = (alertId) => {
    addNotification({
      type: 'info',
      title: 'Alert Dismissed',
      message: 'Emergency alert has been dismissed'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Active Emergency Alerts</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          New Emergency Alert
        </motion.button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600 mt-0.5" />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                      <span>{alert.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                      <span>{alert.assignedTo}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleResolveAlert(alert.id)}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Resolve Alert"
                >
                  <SafeIcon icon={FiCheck} className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDismissAlert(alert.id)}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Dismiss Alert"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
          <p className="text-gray-600">All emergency situations are currently resolved</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlerts;