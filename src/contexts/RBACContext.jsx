import React, { createContext, useContext, useState, useEffect } from 'react';

const RBACContext = createContext();

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  TECHNICIAN: 'technician',
  RECEPTIONIST: 'receptionist',
  PHARMACIST: 'pharmacist',
  SECURITY: 'security'
};

const SAMPLE_USERS = {
  'admin@medlinkx.com': {
    id: 'admin-1',
    name: 'Dr. Sarah Johnson',
    email: 'admin@medlinkx.com',
    role: ROLES.ADMIN,
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0001',
    status: 'online'
  },
  'doctor@medlinkx.com': {
    id: 'doc-1',
    name: 'Dr. Michael Brown',
    email: 'doctor@medlinkx.com',
    role: ROLES.DOCTOR,
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0002',
    status: 'online'
  },
  'nurse@medlinkx.com': {
    id: 'nurse-1',
    name: 'Mary Smith',
    email: 'nurse@medlinkx.com',
    role: ROLES.NURSE,
    department: 'ICU',
    avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0003',
    status: 'online'
  },
  'technician@medlinkx.com': {
    id: 'tech-1',
    name: 'John Wilson',
    email: 'technician@medlinkx.com',
    role: ROLES.TECHNICIAN,
    department: 'Laboratory',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0004',
    status: 'online'
  },
  'receptionist@medlinkx.com': {
    id: 'recep-1',
    name: 'Emily Davis',
    email: 'receptionist@medlinkx.com',
    role: ROLES.RECEPTIONIST,
    department: 'Front Desk',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0005',
    status: 'online'
  },
  'pharmacist@medlinkx.com': {
    id: 'pharm-1',
    name: 'Dr. Lisa Chen',
    email: 'pharmacist@medlinkx.com',
    role: ROLES.PHARMACIST,
    department: 'Pharmacy',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0006',
    status: 'online'
  },
  'security@medlinkx.com': {
    id: 'sec-1',
    name: 'Robert Wilson',
    email: 'security@medlinkx.com',
    role: ROLES.SECURITY,
    department: 'Security',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    phone: '(555) 001-0007',
    status: 'online'
  }
};

export const RBACProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email) => {
    const user = SAMPLE_USERS[email.toLowerCase()];
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('hcs_user', JSON.stringify(user));
      return user;
    }
    throw new Error('User not found');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hcs_user');
  };

  const hasPermission = (permission) => {
    // Simple permission check - all users have access for demo
    return true;
  };

  const hasAnyPermission = (permissions) => {
    return true;
  };

  const hasAllPermissions = (permissions) => {
    return true;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('hcs_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('hcs_user');
      }
    }
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    ROLES,
    SAMPLE_USERS
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
};