import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiUsers, FiUser, FiMessageSquare, FiPhone, FiVideo } = FiIcons;

const ContactList = ({ onSelectContact }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addNotification } = useNotification();

  const contacts = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      role: 'Cardiologist',
      department: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'doctor',
      phone: '(555) 234-5678',
      email: 'michael.brown@medlinkx.com'
    },
    {
      id: 2,
      name: 'Nurse Mary Smith',
      role: 'ICU Nurse',
      department: 'Intensive Care',
      avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'nurse',
      phone: '(555) 345-6789',
      email: 'mary.smith@medlinkx.com'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      role: 'Neurologist',
      department: 'Neurology',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: false,
      type: 'doctor',
      phone: '(555) 456-7890',
      email: 'lisa.chen@medlinkx.com'
    },
    {
      id: 4,
      name: 'Emergency Team',
      role: 'Emergency Response',
      department: 'Emergency',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'group',
      phone: '(555) 911-0000',
      email: 'emergency@medlinkx.com'
    },
    {
      id: 5,
      name: 'John Wilson',
      role: 'Lab Technician',
      department: 'Laboratory',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'staff',
      phone: '(555) 567-8901',
      email: 'john.wilson@medlinkx.com'
    },
    {
      id: 6,
      name: 'Dr. Robert Wilson',
      role: 'Surgeon',
      department: 'Surgery',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: false,
      type: 'doctor',
      phone: '(555) 678-9012',
      email: 'robert.wilson@medlinkx.com'
    },
    {
      id: 7,
      name: 'Pharmacy Team',
      role: 'Medication Management',
      department: 'Pharmacy',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'group',
      phone: '(555) 789-0123',
      email: 'pharmacy@medlinkx.com'
    },
    {
      id: 8,
      name: 'Emily Davis',
      role: 'Receptionist',
      department: 'Front Desk',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'staff',
      phone: '(555) 890-1234',
      email: 'emily.davis@medlinkx.com'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.type === filter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { key: 'all', label: 'All', count: contacts.length },
    { key: 'doctor', label: 'Doctors', count: contacts.filter(c => c.type === 'doctor').length },
    { key: 'nurse', label: 'Nurses', count: contacts.filter(c => c.type === 'nurse').length },
    { key: 'staff', label: 'Staff', count: contacts.filter(c => c.type === 'staff').length },
    { key: 'group', label: 'Groups', count: contacts.filter(c => c.type === 'group').length }
  ];

  const onlineCount = contacts.filter(c => c.online).length;

  const handleVoiceCall = (contact) => {
    addNotification({
      type: 'info',
      title: 'Voice Call',
      message: `Calling ${contact.name}...`
    });
  };

  const handleVideoCall = (contact) => {
    addNotification({
      type: 'info',
      title: 'Video Call',
      message: `Starting video call with ${contact.name}...`
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Contacts</h2>
          <div className="text-sm text-gray-500">
            {onlineCount} online
          </div>
        </div>

        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  {contact.type === 'group' && (
                    <SafeIcon icon={FiUsers} className="w-3 h-3 text-gray-400" />
                  )}
                </div>
                <p className="text-xs text-gray-600">{contact.role}</p>
                <p className="text-xs text-gray-500">{contact.department}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelectContact(contact)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Send Message"
                >
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVoiceCall(contact)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Voice Call"
                >
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVideoCall(contact)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Video Call"
                >
                  <SafeIcon icon={FiVideo} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;