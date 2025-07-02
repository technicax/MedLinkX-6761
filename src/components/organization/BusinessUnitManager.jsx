import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useOrganization } from '../../contexts/OrganizationContext';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPlus, FiEdit, FiTrash2, FiMapPin, FiPhone, FiMail, FiBuilding, 
  FiBed, FiUsers, FiActivity, FiAward, FiX, FiCheck 
} = FiIcons;

const BusinessUnitManager = () => {
  const { currentOrganization, getAllBusinessUnits } = useOrganization();
  const { addNotification } = useNotification();
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const businessUnits = getAllBusinessUnits();

  const getBusinessUnitTypeIcon = (type) => {
    switch (type) {
      case 'acute_care': return '🏥';
      case 'outpatient': return '🏢';
      case 'rehabilitation': return '♿';
      case 'emergency': return '🚑';
      default: return '🏢';
    }
  };

  const getBusinessUnitTypeColor = (type) => {
    const colors = {
      acute_care: 'bg-blue-100 text-blue-800 border-blue-200',
      outpatient: 'bg-green-100 text-green-800 border-green-200',
      rehabilitation: 'bg-purple-100 text-purple-800 border-purple-200',
      emergency: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[type] || colors.acute_care;
  };

  const BusinessUnitForm = ({ businessUnit, onSave, onCancel, isEdit = false }) => {
    const [formData, setFormData] = useState(
      businessUnit || {
        name: '',
        type: 'acute_care',
        description: '',
        location: {
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA'
        },
        capacity: {
          beds: 0,
          icuBeds: 0,
          emergencyBeds: 0,
          operatingRooms: 0
        },
        specialties: [],
        accreditations: [],
        contact: {
          phone: '',
          email: '',
          emergencyPhone: ''
        }
      }
    );

    const [newSpecialty, setNewSpecialty] = useState('');
    const [newAccreditation, setNewAccreditation] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    const addSpecialty = () => {
      if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
        setFormData(prev => ({
          ...prev,
          specialties: [...prev.specialties, newSpecialty.trim()]
        }));
        setNewSpecialty('');
      }
    };

    const removeSpecialty = (specialty) => {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(s => s !== specialty)
      }));
    };

    const addAccreditation = () => {
      if (newAccreditation.trim() && !formData.accreditations.includes(newAccreditation.trim())) {
        setFormData(prev => ({
          ...prev,
          accreditations: [...prev.accreditations, newAccreditation.trim()]
        }));
        setNewAccreditation('');
      }
    };

    const removeAccreditation = (accreditation) => {
      setFormData(prev => ({
        ...prev,
        accreditations: prev.accreditations.filter(a => a !== accreditation)
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
          className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Business Unit' : 'Add New Business Unit'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Facility Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="acute_care">Acute Care Hospital</option>
                    <option value="outpatient">Outpatient Clinic</option>
                    <option value="rehabilitation">Rehabilitation Center</option>
                    <option value="emergency">Emergency Center</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, city: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.location.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, state: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Capacity</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Beds
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.capacity.beds}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, beds: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICU Beds
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.capacity.icuBeds}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, icuBeds: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Beds
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.capacity.emergencyBeds}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, emergencyBeds: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Rooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.capacity.operatingRooms}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, operatingRooms: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.emergencyPhone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, emergencyPhone: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <span>{specialty}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialty)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <SafeIcon icon={FiX} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Accreditations */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Accreditations</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.accreditations.map((accreditation, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full"
                  >
                    <SafeIcon icon={FiAward} className="w-3 h-3" />
                    <span>{accreditation}</span>
                    <button
                      type="button"
                      onClick={() => removeAccreditation(accreditation)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <SafeIcon icon={FiX} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newAccreditation}
                  onChange={(e) => setNewAccreditation(e.target.value)}
                  placeholder="Add accreditation..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccreditation())}
                />
                <button
                  type="button"
                  onClick={addAccreditation}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEdit ? 'Update' : 'Create'} Business Unit
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  const handleSave = (businessUnitData) => {
    addNotification({
      type: 'success',
      title: showEditModal ? 'Business Unit Updated' : 'Business Unit Created',
      message: `${businessUnitData.name} has been ${showEditModal ? 'updated' : 'created'} successfully`
    });
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedBusinessUnit(null);
  };

  const handleDelete = (businessUnit) => {
    addNotification({
      type: 'success',
      title: 'Business Unit Deleted',
      message: `${businessUnit.name} has been deleted`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Unit Management</h1>
          <p className="text-gray-600 mt-1">
            Manage facilities and business units within {currentOrganization?.name}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Business Unit</span>
        </button>
      </div>

      {/* Business Units Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {businessUnits.map((businessUnit, index) => (
          <motion.div
            key={businessUnit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getBusinessUnitTypeIcon(businessUnit.type)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{businessUnit.name}</h3>
                  <p className="text-sm text-gray-600">{businessUnit.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBusinessUnitTypeColor(businessUnit.type)}`}>
                  {businessUnit.type.replace('_', ' ').toUpperCase()}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setSelectedBusinessUnit(businessUnit);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(businessUnit)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                <span>{businessUnit.location.address}, {businessUnit.location.city}, {businessUnit.location.state}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                <span>{businessUnit.contact.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                <span>{businessUnit.contact.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {businessUnit.capacity.beds > 0 && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.beds}</div>
                  <div className="text-xs text-gray-600">Total Beds</div>
                </div>
              )}
              {businessUnit.capacity.icuBeds > 0 && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.icuBeds}</div>
                  <div className="text-xs text-gray-600">ICU Beds</div>
                </div>
              )}
              {businessUnit.capacity.operatingRooms > 0 && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.operatingRooms}</div>
                  <div className="text-xs text-gray-600">OR Rooms</div>
                </div>
              )}
              {businessUnit.capacity.emergencyBeds > 0 && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.emergencyBeds}</div>
                  <div className="text-xs text-gray-600">ER Beds</div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Specialties</div>
              <div className="flex flex-wrap gap-1">
                {businessUnit.specialties.slice(0, 3).map((specialty, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
                {businessUnit.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{businessUnit.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">Accreditations</div>
              <div className="flex flex-wrap gap-1">
                {businessUnit.accreditations.map((accreditation, i) => (
                  <span key={i} className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    <SafeIcon icon={FiAward} className="w-3 h-3" />
                    <span>{accreditation}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <BusinessUnitForm
            onSave={handleSave}
            onCancel={() => setShowAddModal(false)}
          />
        )}
        {showEditModal && selectedBusinessUnit && (
          <BusinessUnitForm
            businessUnit={selectedBusinessUnit}
            onSave={handleSave}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedBusinessUnit(null);
            }}
            isEdit={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessUnitManager;