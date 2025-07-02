import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAccessContext = createContext();

export const useUserAccess = () => {
  const context = useContext(UserAccessContext);
  if (!context) {
    throw new Error('useUserAccess must be used within a UserAccessProvider');
  }
  return context;
};

// Default access permissions structure
const DEFAULT_ACCESS_RULES = {
  'admin@medlinkx.com': {
    userId: 'admin@medlinkx.com',
    role: 'super_admin',
    accessLevel: 'global',
    siteAccess: '*', // Access to all sites
    permissions: ['read', 'write', 'delete', 'admin'],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system'
  },
  'doctor@medlinkx.com': {
    userId: 'doctor@medlinkx.com',
    role: 'doctor',
    accessLevel: 'site',
    siteAccess: ['medlinkx-central', 'riverside-medical'],
    permissions: ['read', 'write'],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin@medlinkx.com'
  },
  'nurse@medlinkx.com': {
    userId: 'nurse@medlinkx.com',
    role: 'nurse',
    accessLevel: 'site',
    siteAccess: ['medlinkx-central'],
    permissions: ['read', 'write'],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin@medlinkx.com'
  }
};

export const UserAccessProvider = ({ children }) => {
  const [accessRules, setAccessRules] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedRules = localStorage.getItem('hcs_user_access_rules');
      const rules = savedRules ? JSON.parse(savedRules) : DEFAULT_ACCESS_RULES;
      setAccessRules(rules);
    } catch (error) {
      console.error('Error loading access rules:', error);
      setAccessRules(DEFAULT_ACCESS_RULES);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAccessRules = (rules) => {
    setAccessRules(rules);
    localStorage.setItem('hcs_user_access_rules', JSON.stringify(rules));
  };

  const getUserAccess = (userId) => {
    return accessRules[userId] || null;
  };

  const hasAccessToSite = (userId, siteId) => {
    const userAccess = getUserAccess(userId);
    if (!userAccess) return false;

    // Super admin has access to everything
    if (userAccess.accessLevel === 'global' || userAccess.siteAccess === '*') {
      return true;
    }

    // Check if user has access to specific site
    if (Array.isArray(userAccess.siteAccess)) {
      return userAccess.siteAccess.includes(siteId);
    }

    return userAccess.siteAccess === siteId;
  };

  const getUserAccessibleSites = (userId, allSites) => {
    const userAccess = getUserAccess(userId);
    if (!userAccess) return {};

    // Super admin gets all sites
    if (userAccess.accessLevel === 'global' || userAccess.siteAccess === '*') {
      return allSites;
    }

    // Filter sites based on user access
    const accessibleSites = {};
    if (Array.isArray(userAccess.siteAccess)) {
      userAccess.siteAccess.forEach(siteId => {
        if (allSites[siteId]) {
          accessibleSites[siteId] = allSites[siteId];
        }
      });
    } else if (typeof userAccess.siteAccess === 'string' && allSites[userAccess.siteAccess]) {
      accessibleSites[userAccess.siteAccess] = allSites[userAccess.siteAccess];
    }

    return accessibleSites;
  };

  const grantSiteAccess = (userId, siteId, grantedBy) => {
    const currentAccess = getUserAccess(userId);
    if (!currentAccess) return false;

    let newSiteAccess;
    if (currentAccess.siteAccess === '*') {
      // Already has global access
      return true;
    } else if (Array.isArray(currentAccess.siteAccess)) {
      if (!currentAccess.siteAccess.includes(siteId)) {
        newSiteAccess = [...currentAccess.siteAccess, siteId];
      } else {
        return true; // Already has access
      }
    } else {
      // Convert single site to array and add new site
      newSiteAccess = [currentAccess.siteAccess, siteId];
    }

    const updatedAccess = {
      ...currentAccess,
      siteAccess: newSiteAccess,
      updatedAt: new Date().toISOString(),
      updatedBy: grantedBy
    };

    const updatedRules = {
      ...accessRules,
      [userId]: updatedAccess
    };

    saveAccessRules(updatedRules);
    return true;
  };

  const revokeSiteAccess = (userId, siteId, revokedBy) => {
    const currentAccess = getUserAccess(userId);
    if (!currentAccess) return false;

    if (currentAccess.siteAccess === '*') {
      // Cannot revoke global access this way
      return false;
    }

    let newSiteAccess;
    if (Array.isArray(currentAccess.siteAccess)) {
      newSiteAccess = currentAccess.siteAccess.filter(id => id !== siteId);
    } else if (currentAccess.siteAccess === siteId) {
      newSiteAccess = [];
    } else {
      return true; // User didn't have access anyway
    }

    const updatedAccess = {
      ...currentAccess,
      siteAccess: newSiteAccess,
      updatedAt: new Date().toISOString(),
      updatedBy: revokedBy
    };

    const updatedRules = {
      ...accessRules,
      [userId]: updatedAccess
    };

    saveAccessRules(updatedRules);
    return true;
  };

  const createUserAccess = (userData, createdBy) => {
    const newAccess = {
      userId: userData.userId,
      role: userData.role,
      accessLevel: userData.accessLevel || 'site',
      siteAccess: userData.siteAccess || [],
      permissions: userData.permissions || ['read'],
      createdAt: new Date().toISOString(),
      createdBy: createdBy
    };

    const updatedRules = {
      ...accessRules,
      [userData.userId]: newAccess
    };

    saveAccessRules(updatedRules);
    return newAccess;
  };

  const updateUserAccess = (userId, updates, updatedBy) => {
    const currentAccess = getUserAccess(userId);
    if (!currentAccess) return null;

    const updatedAccess = {
      ...currentAccess,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy
    };

    const updatedRules = {
      ...accessRules,
      [userId]: updatedAccess
    };

    saveAccessRules(updatedRules);
    return updatedAccess;
  };

  const deleteUserAccess = (userId, deletedBy) => {
    if (!accessRules[userId]) return false;

    const updatedRules = { ...accessRules };
    delete updatedRules[userId];

    saveAccessRules(updatedRules);
    return true;
  };

  const getAllUsers = () => {
    return Object.values(accessRules);
  };

  const isGlobalAdmin = (userId) => {
    const userAccess = getUserAccess(userId);
    return userAccess?.accessLevel === 'global' || userAccess?.siteAccess === '*';
  };

  const value = {
    accessRules,
    loading,
    getUserAccess,
    hasAccessToSite,
    getUserAccessibleSites,
    grantSiteAccess,
    revokeSiteAccess,
    createUserAccess,
    updateUserAccess,
    deleteUserAccess,
    getAllUsers,
    isGlobalAdmin
  };

  return (
    <UserAccessContext.Provider value={value}>
      {children}
    </UserAccessContext.Provider>
  );
};