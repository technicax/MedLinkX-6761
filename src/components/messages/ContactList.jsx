import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiUsers, FiUser } = FiIcons;

const ContactList = ({ onSelectContact }) => {
  const [filter, setFilter] = useState('all');

  const contacts = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      role: 'Cardiologist',
      department: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'doctor'
    },
    {
      id: 2,
      name: 'Nurse Mary Smith',
      role: 'ICU Nurse',
      department: 'Intensive Care',
      avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'nurse'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      role: 'Neurologist',
      department: 'Neurology',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: false,
      type: 'doctor'
    },
    {
      id: 4,
      name: 'Emergency Team',
      role: 'Emergency Response',
      department: 'Emergency',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'group'
    },
    {
      id: 5,
      name: 'John Wilson',
      role: 'Lab Technician',
      department: 'Laboratory',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      online: true,
      type: 'staff'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.type === filter;
  });

  const filters = [
    { key: 'all', label: 'All', count: contacts.length },
    { key: 'doctor', label: 'Doctors', count: contacts.filter(c => c.type === 'doctor').length },
    { key: 'nurse', label: 'Nurses', count: contacts.filter(c => c.type === 'nurse').length },
    { key: 'staff', label: 'Staff', count: contacts.filter(c => c.type === 'staff').length },
    { key: 'group', label: 'Groups', count: contacts.filter(c => c.type === 'group').length }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
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

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectContact(contact)}
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
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

              <div className={`w-2 h-2 rounded-full ${contact.online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;