import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useUserAccess } from '../../contexts/UserAccessContext';
import { useSite } from '../../contexts/SiteContext';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers, FiPlus, FiEdit, FiTrash2, FiShield, FiEye, FiEyeOff,
  FiCheck, FiX, FiSearch, FiFilter, FiMail, FiUser, FiBuilding
} = FiIcons;

const UserAccessManagement = () => {
  const {
    getAllUsers, createUserAccess, updateUserAccess, deleteUserAccess,
    grantSiteAccess, revokeSiteAccess, isGlobalAdmin
  } = useUserAccess();
  const { availableSites } = useSite();
  const { addNotification } = useNotification();

  const [users] = useState(getAllUsers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const roles = [
    { value: 'super_admin', label: 'Super Administrator', color: 'bg-red-100 text-red-800' },
    { value: 'admin', label: 'Administrator', color: 'bg-purple-100 text-purple-800' },
    { value: 'doctor', label: 'Doctor', color: 'bg-blue-100 text-blue-800' },
    { value: 'nurse', label: 'Nurse', color: 'bg-green-100 text-green-800' },
    { value: 'technician', label: 'Technician', color: 'bg-orange-100 text-orange-800' },
    { value: 'pharmacist', label: 'Pharmacist', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'receptionist', label: 'Receptionist', color: 'bg-pink-100 text-pink-800' },
    { value: 'security', label: 'Security', color: 'bg-gray-100 text-gray-800' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleInfo = (roleValue) => {
    return roles.find(role => role.value === roleValue) || roles[0];
  };

  const handleCreateUser = (userData) => {
    try {
      createUserAccess(userData, 'admin@medlinkx.com');
      addNotification({
        type: 'success',
        title: 'User Access Created',
        message: `Access granted for ${userData.userId}`
      });
      setShowAddModal(false);
      // Refresh users list
      window.location.reload();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Creating User',
        message: 'Failed to create user access. Please try again.'
      });
    }
  };

  const handleUpdateUser = (userData) => {
    try {
      updateUserAccess(selectedUser.userId, userData, 'admin@medlinkx.com');
      addNotification({
        type: 'success',
        title: 'User Access Updated',
        message: `Access updated for ${selectedUser.userId}`
      });
      setShowEditModal(false);
      setSelectedUser(null);
      // Refresh users list
      window.location.reload();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Updating User',
        message: 'Failed to update user access. Please try again.'
      });
    }
  };

  const handleDeleteUser = (userId) => {
    try {
      deleteUserAccess(userId, 'admin@medlinkx.com');
      addNotification({
        type: 'success',
        title: 'User Access Removed',
        message: `Access removed for ${userId}`
      });
      // Refresh users list
      window.location.reload();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Removing User',
        message: 'Failed to remove user access. Please try again.'
      });
    }
  };

  const formatSiteAccess = (siteAccess) => {
    if (siteAccess === '*') return 'All Facilities';
    if (Array.isArray(siteAccess)) {
      return siteAccess.map(siteId => {
        const site = availableSites[siteId];
        return site ? site.shortName : siteId;
      }).join(', ');
    }
    const site = availableSites[siteAccess];
    return site ? site.shortName : siteAccess;
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">User Access Management</h2>
          <p className="text-gray-600 mt-1">
            Manage user permissions and facility access rights
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          {roles.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Access Level</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Facilities</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <motion.tr
                    key={user.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.userId}</p>
                          <p className="text-sm text-gray-500">
                            {isGlobalAdmin(user.userId) ? 'Global Administrator' : 'Site User'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon 
                          icon={user.accessLevel === 'global' ? FiShield : FiBuilding} 
                          className="w-4 h-4 text-gray-500" 
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {user.accessLevel}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-700">
                        {formatSiteAccess(user.siteAccess)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <SafeIcon icon={FiEdit} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.userId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                          disabled={isGlobalAdmin(user.userId)}
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or add a new user</p>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <UserModal
            user={showEditModal ? selectedUser : null}
            availableSites={availableSites}
            roles={roles}
            onSave={showEditModal ? handleUpdateUser : handleCreateUser}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// User Add/Edit Modal Component
const UserModal = ({ user, availableSites, roles, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    userId: user?.userId || '',
    role: user?.role || 'nurse',
    accessLevel: user?.accessLevel || 'site',
    siteAccess: user?.siteAccess || [],
    permissions: user?.permissions || ['read']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.role) {
      return;
    }

    onSave(formData);
  };

  const handleSiteAccessToggle = (siteId) => {
    if (formData.accessLevel === 'global') return;

    setFormData(prev => {
      const currentAccess = Array.isArray(prev.siteAccess) ? prev.siteAccess : [];
      const newAccess = currentAccess.includes(siteId)
        ? currentAccess.filter(id => id !== siteId)
        : [...currentAccess, siteId];
      
      return { ...prev, siteAccess: newAccess };
    });
  };

  const handlePermissionToggle = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {user ? 'Edit User Access' : 'Add New User'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Email *
              </label>
              <input
                type="email"
                value={formData.userId}
                onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user@example.com"
                required
                disabled={!!user} // Disable editing email for existing users
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Access Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Access Level *
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="site"
                  checked={formData.accessLevel === 'site'}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    accessLevel: e.target.value,
                    siteAccess: [] 
                  }))}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Site Access</span>
                  <p className="text-sm text-gray-600">Access to specific facilities only</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="global"
                  checked={formData.accessLevel === 'global'}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    accessLevel: e.target.value,
                    siteAccess: '*' 
                  }))}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Global Access</span>
                  <p className="text-sm text-gray-600">Access to all facilities and admin functions</p>
                </div>
              </label>
            </div>
          </div>

          {/* Site Access Selection */}
          {formData.accessLevel === 'site' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facility Access
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {Object.values(availableSites).map(site => (
                  <label key={site.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Array.isArray(formData.siteAccess) && formData.siteAccess.includes(site.id)}
                      onChange={() => handleSiteAccessToggle(site.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{site.shortName}</span>
                      <p className="text-xs text-gray-600">{site.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['read', 'write', 'delete', 'admin'].map(permission => (
                <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {user ? 'Update User' : 'Add User'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserAccessManagement;