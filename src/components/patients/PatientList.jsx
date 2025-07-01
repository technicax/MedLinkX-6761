import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiCalendar, FiMapPin } = FiIcons;

const PatientList = ({ searchTerm, filterStatus, selectedPatient, onSelectPatient }) => {
  const patients = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      room: '204',
      condition: 'Cardiac Surgery Recovery',
      status: 'stable',
      admissionDate: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'P002',
      name: 'Maria Garcia',
      age: 32,
      gender: 'Female',
      room: '315',
      condition: 'Pneumonia',
      status: 'critical',
      admissionDate: '2024-01-18',
      doctor: 'Dr. Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 67,
      gender: 'Male',
      room: '102',
      condition: 'Hip Replacement',
      status: 'stable',
      admissionDate: '2024-01-20',
      doctor: 'Dr. Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      room: '401',
      condition: 'Appendectomy',
      status: 'discharged',
      admissionDate: '2024-01-12',
      doctor: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      stable: 'bg-green-100 text-green-800 border-green-200',
      discharged: 'bg-gray-100 text-gray-800 border-gray-200',
      admitted: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.stable;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Patient List ({filteredPatients.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPatient(patient)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedPatient?.id === patient.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-xs text-gray-600">ID: {patient.id}</p>
                  </div>
                  
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiUser} className="w-3 h-3 mr-1" />
                    <span>{patient.age} years, {patient.gender}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                    <span>Room {patient.room}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600">
                    <SafeIcon icon={FiCalendar} className="w-3 h-3 mr-1" />
                    <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-900 font-medium">{patient.condition}</p>
                  <p className="text-xs text-gray-600">Attending: {patient.doctor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;