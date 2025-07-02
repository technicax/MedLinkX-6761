import React from 'react';
import SafeIcon from '../../common/SafeIcon';
import { useRBAC } from '../../contexts/RBACContext';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiActivity, FiUser, FiTool, FiPhone, FiPackage } = FiIcons;

const RoleBadge = ({ role, size = 'md', showIcon = true, showText = true }) => {
  const { ROLES } = useRBAC();

  const roleConfig = {
    [ROLES.SUPER_ADMIN]: {
      icon: FiShield,
      label: 'Super Admin',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    [ROLES.ADMIN]: {
      icon: FiShield,
      label: 'Admin',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    [ROLES.DOCTOR]: {
      icon: FiActivity,
      label: 'Doctor',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    [ROLES.NURSE]: {
      icon: FiUser,
      label: 'Nurse',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    [ROLES.TECHNICIAN]: {
      icon: FiTool,
      label: 'Technician',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    [ROLES.RECEPTIONIST]: {
      icon: FiPhone,
      label: 'Receptionist',
      color: 'bg-pink-100 text-pink-800 border-pink-200'
    },
    [ROLES.PHARMACIST]: {
      icon: FiPackage,
      label: 'Pharmacist',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    [ROLES.SECURITY]: {
      icon: FiShield,
      label: 'Security',
      color: 'bg-red-100 text-red-800 border-red-200'
    }
  };

  const config = roleConfig[role] || roleConfig[ROLES.ADMIN];
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`inline-flex items-center space-x-1 font-medium rounded-full border ${config.color} ${sizeClasses[size]}`}>
      {showIcon && (
        <SafeIcon icon={config.icon} className={iconSizes[size]} />
      )}
      {showText && <span>{config.label}</span>}
    </span>
  );
};

export default RoleBadge;