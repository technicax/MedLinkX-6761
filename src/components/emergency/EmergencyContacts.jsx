import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPhone, FiMail, FiMapPin, FiPlus, FiEdit, FiTrash2, FiSearch,
  FiShield, FiActivity, FiTool, FiTruck, FiUsers, FiX, FiCheck
} = FiIcons;

const EmergencyContacts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { addNotification } = useNotification();

  const contactCategories = [
    { id: 'all', label: 'All Contacts', icon: FiUsers },
    { id: 'internal', label: 'Internal Teams', icon: FiActivity },
    { id: 'external', label: 'External Services', icon: FiShield },
    { id: 'medical', label: 'Medical Services', icon: FiActivity },
    { id: 'utilities', label: 'Utilities', icon: FiTool },
    { id: 'government', label: 'Government', icon: FiShield }
  ];

  const emergencyContacts = [
    // Internal Teams
    {
      id: 1,
      name: 'Emergency Response Team Alpha',
      category: 'internal',
      role: 'Primary Emergency Response',
      phone: '(555) 911-0001',
      email: 'alpha-team@medlinkx.com',
      location: 'Emergency Center - Floor 1',
      availability: '24/7',
      description: 'First response team for medical emergencies',
      teamLead: 'Dr. Sarah Johnson',
      members: 8,
      specialization: 'Medical Emergency Response'
    },
    {
      id: 2,
      name: 'Fire Safety Team Bravo',
      category: 'internal',
      role: 'Fire Prevention & Response',
      phone: '(555) 911-0002',
      email: 'bravo-fire@medlinkx.com',
      location: 'Fire Station - Ground Floor',
      availability: '24/7',
      description: 'Fire prevention, suppression, and evacuation coordination',
      teamLead: 'Chief Mike Adams',
      members: 12,
      specialization: 'Fire Safety & Evacuation'
    },
    {
      id: 3,
      name: 'Security Team Charlie',
      category: 'internal',
      role: 'Security & Access Control',
      phone: '(555) 911-0003',
      email: 'security@medlinkx.com',
      location: 'Security Office - Main Entrance',
      availability: '24/7',
      description: 'Physical security, access control, and threat response',
      teamLead: 'Officer Robert Davis',
      members: 15,
      specialization: 'Security & Protection'
    },
    
    // External Emergency Services
    {
      id: 4,
      name: 'City Fire Department',
      category: 'external',
      role: 'Municipal Fire Services',
      phone: '911',
      email: 'dispatch@cityfire.gov',
      location: 'Station 5 - 2 blocks away',
      availability: '24/7',
      description: 'Primary fire department response',
      responseTime: '3-5 minutes',
      specialization: 'Fire Suppression & Rescue'
    },
    {
      id: 5,
      name: 'Police Department',
      category: 'external',
      role: 'Law Enforcement',
      phone: '911',
      email: 'dispatch@citypd.gov',
      location: 'Precinct 12',
      availability: '24/7',
      description: 'Law enforcement and security support',
      responseTime: '2-4 minutes',
      specialization: 'Law Enforcement & Security'
    },
    {
      id: 6,
      name: 'Paramedic Services',
      category: 'external',
      role: 'Emergency Medical Services',
      phone: '911',
      email: 'ems@cityhealth.gov',
      location: 'EMS Station 3',
      availability: '24/7',
      description: 'Advanced life support and emergency medical care',
      responseTime: '4-6 minutes',
      specialization: 'Emergency Medical Care'
    },
    
    // Medical Services
    {
      id: 7,
      name: 'Poison Control Center',
      category: 'medical',
      role: 'Poison Information & Treatment',
      phone: '1-800-222-1222',
      email: 'info@poisoncontrol.org',
      location: 'Regional Center',
      availability: '24/7',
      description: 'Poison exposure information and treatment guidance',
      specialization: 'Toxicology & Poison Treatment'
    },
    {
      id: 8,
      name: 'Blood Bank Emergency',
      category: 'medical',
      role: 'Emergency Blood Supply',
      phone: '(555) 224-BLOOD',
      email: 'emergency@bloodbank.org',
      location: 'Regional Blood Center',
      availability: '24/7',
      description: 'Emergency blood products and platelets',
      specialization: 'Blood Products & Transfusion'
    },
    {
      id: 9,
      name: 'Organ Procurement',
      category: 'medical',
      role: 'Organ Transplant Coordination',
      phone: '(555) 867-5309',
      email: 'emergency@organbank.org',
      location: 'Transplant Center',
      availability: '24/7',
      description: 'Organ procurement and transplant coordination',
      specialization: 'Organ Transplantation'
    },
    
    // Utilities
    {
      id: 10,
      name: 'Electric Company Emergency',
      category: 'utilities',
      role: 'Power Grid Emergency',
      phone: '(555) 123-POWER',
      email: 'emergency@cityelectric.com',
      location: 'Main Grid Station',
      availability: '24/7',
      description: 'Power outage reporting and emergency restoration',
      specialization: 'Electrical Systems'
    },
    {
      id: 11,
      name: 'Water Authority Emergency',
      category: 'utilities',
      role: 'Water System Emergency',
      phone: '(555) 123-WATER',
      email: 'emergency@citywater.gov',
      location: 'Water Treatment Plant',
      availability: '24/7',
      description: 'Water system emergencies and contamination',
      specialization: 'Water Systems'
    },
    {
      id: 12,
      name: 'Gas Company Emergency',
      category: 'utilities',
      role: 'Natural Gas Emergency',
      phone: '(555) 123-GAS-1',
      email: 'emergency@citygas.com',
      location: 'Gas Distribution Center',
      availability: '24/7',
      description: 'Gas leaks and natural gas emergencies',
      specialization: 'Natural Gas Systems'
    },
    
    // Government Agencies
    {
      id: 13,
      name: 'Emergency Management Office',
      category: 'government',
      role: 'Disaster Coordination',
      phone: '(555) 234-5678',
      email: 'director@cityemo.gov',
      location: 'City Hall',
      availability: 'Business Hours / On-Call',
      description: 'Municipal emergency management and disaster coordination',
      specialization: 'Emergency Management'
    },
    {
      id: 14,
      name: 'Health Department Emergency',
      category: 'government',
      role: 'Public Health Emergency',
      phone: '(555) 345-6789',
      email: 'emergency@health.gov',
      location: 'Health Department',
      availability: '24/7',
      description: 'Public health emergencies and disease outbreaks',
      specialization: 'Public Health'
    },
    {
      id: 15,
      name: 'Hazmat Response Team',
      category: 'government',
      role: 'Hazardous Materials',
      phone: '(555) 456-7890',
      email: 'hazmat@cityfire.gov',
      location: 'Hazmat Station',
      availability: '24/7',
      description: 'Chemical spills and hazardous material incidents',
      specialization: 'Hazardous Materials'
    }
  ];

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'internal': return FiActivity;
      case 'external': return FiShield;
      case 'medical': return FiActivity;
      case 'utilities': return FiTool;
      case 'government': return FiShield;
      default: return FiUsers;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      internal: 'bg-blue-50 text-blue-700 border-blue-200',
      external: 'bg-red-50 text-red-700 border-red-200',
      medical: 'bg-green-50 text-green-700 border-green-200',
      utilities: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      government: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[category] || colors.internal;
  };

  const handleCall = (phone) => {
    addNotification({
      type: 'info',
      title: 'Calling Emergency Contact',
      message: `Initiating call to ${phone}`
    });
  };

  const AddContactModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Add Emergency Contact</h3>
          <button 
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Emergency contact name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="internal">Internal Teams</option>
                <option value="external">External Services</option>
                <option value="medical">Medical Services</option>
                <option value="utilities">Utilities</option>
                <option value="government">Government</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contact@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role/Specialization *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency response specialization"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Physical location or address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of services and capabilities"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>24/7</option>
                <option>Business Hours</option>
                <option>On-Call</option>
                <option>Emergency Only</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Time
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 3-5 minutes"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setShowAddModal(false);
                addNotification({
                  type: 'success',
                  title: 'Contact Added',
                  message: 'Emergency contact has been added successfully'
                });
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Contact
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Emergency Contacts</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {contactCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <SafeIcon icon={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search emergency contacts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getCategoryColor(contact.category)}`}>
                  <SafeIcon icon={getCategoryIcon(contact.category)} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.role}</p>
                </div>
              </div>
              
              <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(contact.category)}`}>
                {contact.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                <span>{contact.phone}</span>
              </div>
              
              {contact.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                  <span>{contact.email}</span>
                </div>
              )}
              
              {contact.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                  <span>{contact.location}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700">{contact.description}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Available: {contact.availability}</span>
              {contact.responseTime && (
                <span>ETA: {contact.responseTime}</span>
              )}
            </div>

            {contact.specialization && (
              <div className="mb-4">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {contact.specialization}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCall(contact.phone)}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>Call</span>
              </motion.button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📞</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add new contacts</p>
        </div>
      )}

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showAddModal && <AddContactModal />}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyContacts;