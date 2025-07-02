import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin } = FiIcons;

const StaffList = ({ searchTerm, filterDepartment, filterStatus, selectedStaff, onSelectStaff }) => {
  const staff = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Emergency Medicine Physician',
      department: 'emergency',
      status: 'online',
      shift: 'Day Shift (7 AM - 7 PM)',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@medlinkx.com',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      location: 'Emergency Department'
    },
    {
      id: 2,
      name: 'Dr. Michael Brown',
      role: 'Cardiologist',
      department: 'cardiology',
      status: 'busy',
      shift: 'Day Shift (8 AM - 6 PM)',
      phone: '(555) 234-5678',
      email: 'michael.brown@medlinkx.com',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      location: 'Cardiology Wing'
    },
    {
      id: 3,
      name: 'Nurse Mary Smith',
      role: 'ICU Nurse',
      department: 'icu',
      status: 'online',
      shift: 'Night Shift (7 PM - 7 AM)',
      phone: '(555) 345-6789',
      email: 'mary.smith@medlinkx.com',
      avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
      location: 'ICU - Floor 3'
    },
    {
      id: 4,
      name: 'Dr. Lisa Chen',
      role: 'Neurologist',
      department: 'neurology',
      status: 'offline',
      shift: 'Day Shift (9 AM - 5 PM)',
      phone: '(555) 456-7890',
      email: 'lisa.chen@medlinkx.com',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      location: 'Neurology Department'
    },
    {
      id: 5,
      name: 'Dr. Robert Wilson',
      role: 'Surgeon',
      department: 'surgery',
      status: 'busy',
      shift: 'On Call',
      phone: '(555) 567-8901',
      email: 'robert.wilson@medlinkx.com',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      location: 'Operating Theater 2'
    }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-green-100 text-green-800 border-green-200',
      busy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offline: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || colors.offline;
  };

  const getStatusDot = (status) => {
    const colors = {
      online: 'bg-green-500',
      busy: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    return colors[status] || colors.offline;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Staff Members ({filteredStaff.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredStaff.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectStaff(member)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedStaff?.id === member.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${getStatusDot(member.status)}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiPhone} className="w-3 h-3 mr-1" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiMail} className="w-3 h-3 mr-1" />
                    <span>{member.email}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">{member.shift}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filteredStaff.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No staff found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default StaffList;