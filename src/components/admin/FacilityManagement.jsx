import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useSite } from '../../contexts/SiteContext';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus, FiEdit, FiTrash2, FiEye, FiMapPin, FiPhone, FiMail, FiGlobe,
  FiUsers, FiBed, FiCalendar, FiActivity, FiX, FiCheck, FiAlertTriangle
} = FiIcons;

const FacilityManagement = () => {
  const { availableSites, addSite, updateSite, deleteSite } = useSite();
  const { addNotification } = useNotification();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const facilities = Object.values(availableSites);

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddFacility = (facilityData) => {
    try {
      const newFacility = addSite(facilityData);
      addNotification({
        type: 'success',
        title: 'Facility Added',
        message: `${facilityData.name} has been successfully added to the system.`
      });
      setShowAddModal(false);
      return newFacility;
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Adding Facility',
        message: 'Failed to add the facility. Please try again.'
      });
    }
  };

  const handleEditFacility = (facilityData) => {
    try {
      updateSite(selectedFacility.id, facilityData);
      addNotification({
        type: 'success',
        title: 'Facility Updated',
        message: `${facilityData.name} has been successfully updated.`
      });
      setShowEditModal(false);
      setSelectedFacility(null);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Updating Facility',
        message: 'Failed to update the facility. Please try again.'
      });
    }
  };

  const handleDeleteFacility = () => {
    try {
      const success = deleteSite(selectedFacility.id);
      if (success) {
        addNotification({
          type: 'success',
          title: 'Facility Deleted',
          message: `${selectedFacility.name} has been removed from the system.`
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Cannot Delete',
          message: 'Cannot delete the last remaining facility.'
        });
      }
      setShowDeleteModal(false);
      setSelectedFacility(null);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error Deleting Facility',
        message: 'Failed to delete the facility. Please try again.'
      });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || colors.active;
  };

  const getTypeColor = (type) => {
    const colors = {
      'General Hospital': 'bg-blue-100 text-blue-800',
      'Specialty Hospital': 'bg-purple-100 text-purple-800',
      'Children\'s Hospital': 'bg-pink-100 text-pink-800',
      'Clinic': 'bg-green-100 text-green-800',
      'Emergency Center': 'bg-red-100 text-red-800'
    };
    return colors[type] || colors['General Hospital'];
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Facility Management</h2>
          <p className="text-gray-600 mt-1">
            Manage all hospital facilities and medical centers in the system
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search facilities..."
            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility, index) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Facility Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: facility.theme.primary }}
                  >
                    <SafeIcon icon={FiActivity} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                    <p className="text-sm text-gray-600">{facility.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(facility.status)}`}>
                    {facility.status}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(facility.type)}`}>
                {facility.type}
              </span>
            </div>

            {/* Facility Details */}
            <div className="p-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                <span className="truncate">{facility.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                <span>{facility.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiBed} className="w-4 h-4 mr-2" />
                <span>{facility.beds} beds</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                <span>{facility.departments.length} departments</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                <span>Est. {facility.established}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedFacility(facility);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Facility"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFacility(facility);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Facility"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {facility.id}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new facility</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <FacilityModal
            facility={showEditModal ? selectedFacility : null}
            onSave={showEditModal ? handleEditFacility : handleAddFacility}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedFacility(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteConfirmationModal
            facility={selectedFacility}
            onConfirm={handleDeleteFacility}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedFacility(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Facility Add/Edit Modal Component
const FacilityModal = ({ facility, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: facility?.name || '',
    shortName: facility?.shortName || '',
    code: facility?.code || '',
    type: facility?.type || 'General Hospital',
    address: facility?.address || '',
    phone: facility?.phone || '',
    email: facility?.email || '',
    website: facility?.website || '',
    beds: facility?.beds || 100,
    established: facility?.established || new Date().getFullYear().toString(),
    status: facility?.status || 'active',
    theme: facility?.theme || {
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#3B82F6'
    },
    departments: facility?.departments || ['emergency', 'general'],
    businessUnits: facility?.businessUnits || []
  });

  const facilityTypes = [
    'General Hospital',
    'Specialty Hospital',
    'Children\'s Hospital',
    'Clinic',
    'Emergency Center',
    'Rehabilitation Center',
    'Mental Health Facility'
  ];

  const availableDepartments = [
    'emergency', 'cardiology', 'neurology', 'icu', 'surgery',
    'pediatrics', 'oncology', 'orthopedics', 'radiology', 'laboratory',
    'pharmacy', 'rehabilitation', 'mental_health', 'maternity'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.code || !formData.address) {
      return;
    }

    onSave(formData);
  };

  const handleDepartmentToggle = (dept) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept]
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
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {facility ? 'Edit Facility' : 'Add New Facility'}
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facility Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Name *
              </label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => setFormData(prev => ({ ...prev, shortName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facility Code *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MLX-C"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facility Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {facilityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Facility Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Beds
              </label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) => setFormData(prev => ({ ...prev, beds: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Established Year
              </label>
              <input
                type="text"
                value={formData.established}
                onChange={(e) => setFormData(prev => ({ ...prev, established: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Theme Color
            </label>
            <input
              type="color"
              value={formData.theme.primary}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                theme: { ...prev.theme, primary: e.target.value }
              }))}
              className="w-full h-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Departments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Departments
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDepartments.map(dept => (
                <label key={dept} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.departments.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {dept.replace('_', ' ')}
                  </span>
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
              {facility ? 'Update Facility' : 'Add Facility'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ facility, onConfirm, onClose }) => {
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
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Facility</h3>
            <p className="text-gray-600">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{facility?.name}</strong>? 
          This will permanently remove the facility and all associated data.
        </p>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Facility
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FacilityManagement;