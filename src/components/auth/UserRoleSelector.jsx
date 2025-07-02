import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useRBAC } from '../../contexts/RBACContext';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiShield, FiActivity, FiUsers, FiTool, FiPhone, FiPackage } = FiIcons;

const UserRoleSelector = ({ onRoleSelect }) => {
  const { SAMPLE_USERS } = useRBAC();
  const [selectedUser, setSelectedUser] = useState(null);

  const roleInfo = {
    admin: {
      icon: FiShield,
      color: 'bg-purple-600',
      description: 'Full system access and user management'
    },
    doctor: {
      icon: FiActivity,
      color: 'bg-blue-600',
      description: 'Patient care, prescriptions, and medical records'
    },
    nurse: {
      icon: FiUser,
      color: 'bg-green-600',
      description: 'Patient monitoring and basic medical tasks'
    },
    technician: {
      icon: FiTool,
      color: 'bg-orange-600',
      description: 'Lab results and technical equipment'
    },
    receptionist: {
      icon: FiPhone,
      color: 'bg-pink-600',
      description: 'Patient registration and front desk operations'
    },
    pharmacist: {
      icon: FiPackage,
      color: 'bg-indigo-600',
      description: 'Medication management and prescriptions'
    },
    security: {
      icon: FiShield,
      color: 'bg-red-600',
      description: 'Emergency response and security management'
    }
  };

  const userList = Object.values(SAMPLE_USERS);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    onRoleSelect(user);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select User Role</h2>
        <p className="text-gray-600">Choose a user to experience different access levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userList.map((user) => {
          const roleKey = user.role.replace('_', '');
          const info = roleInfo[roleKey] || roleInfo.admin;
          
          return (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUserSelect(user)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedUser?.id === user.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center`}>
                  <SafeIcon icon={info.icon} className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.department}</p>
                  <p className="text-xs text-blue-600 mt-1">{user.email}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-600">{info.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Demo Instructions:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Select any user above to login with their role</li>
          <li>• Each role has different permissions and access levels</li>
          <li>• Navigate through the system to see role-based restrictions</li>
          <li>• Password: Use any password for demo purposes</li>
        </ul>
      </div>
    </div>
  );
};

export default UserRoleSelector;