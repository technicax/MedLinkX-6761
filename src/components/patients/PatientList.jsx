import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiCalendar, FiMapPin, FiPhone, FiMail,
  FiGrid, FiList, FiMoreVertical, FiEdit, FiEye,
  FiHeart, FiClock, FiAlert
} = FiIcons;

const PatientList = ({
  searchTerm,
  filterStatus,
  filterDepartment,
  filterPriority,
  selectedPatient,
  onSelectPatient,
  viewMode,
  onViewModeChange
}) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const patients = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      room: '204',
      bed: 'A',
      condition: 'Cardiac Surgery Recovery',
      status: 'stable',
      priority: 'medium',
      department: 'cardiology',
      admissionDate: '2024-01-15',
      dischargeDate: null,
      doctor: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      insurance: 'Blue Cross',
      emergencyContact: 'Jane Smith',
      emergencyPhone: '(555) 987-6543',
      allergies: ['Penicillin', 'Shellfish'],
      bloodType: 'O+',
      vitals: {
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 98.6,
        oxygenSat: 98
      },
      lastUpdated: '2024-01-20T10:30:00Z'
    },
    {
      id: 'P002',
      name: 'Maria Garcia',
      age: 32,
      gender: 'Female',
      room: '315',
      bed: 'B',
      condition: 'Pneumonia',
      status: 'critical',
      priority: 'high',
      department: 'icu',
      admissionDate: '2024-01-18',
      dischargeDate: null,
      doctor: 'Dr. Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 234-5678',
      email: 'maria.garcia@email.com',
      insurance: 'Aetna',
      emergencyContact: 'Carlos Garcia',
      emergencyPhone: '(555) 876-5432',
      allergies: ['Latex'],
      bloodType: 'A-',
      vitals: {
        heartRate: 95,
        bloodPressure: '140/90',
        temperature: 101.2,
        oxygenSat: 94
      },
      lastUpdated: '2024-01-20T11:15:00Z'
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 67,
      gender: 'Male',
      room: '102',
      bed: 'A',
      condition: 'Hip Replacement',
      status: 'recovering',
      priority: 'low',
      department: 'surgery',
      admissionDate: '2024-01-20',
      dischargeDate: null,
      doctor: 'Dr. Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 345-6789',
      email: 'robert.johnson@email.com',
      insurance: 'Medicare',
      emergencyContact: 'Susan Johnson',
      emergencyPhone: '(555) 765-4321',
      allergies: [],
      bloodType: 'B+',
      vitals: {
        heartRate: 68,
        bloodPressure: '118/75',
        temperature: 98.4,
        oxygenSat: 99
      },
      lastUpdated: '2024-01-20T09:45:00Z'
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      room: '401',
      bed: 'C',
      condition: 'Appendectomy',
      status: 'discharged',
      priority: 'low',
      department: 'surgery',
      admissionDate: '2024-01-12',
      dischargeDate: '2024-01-19',
      doctor: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 456-7890',
      email: 'emily.davis@email.com',
      insurance: 'Cigna',
      emergencyContact: 'Mark Davis',
      emergencyPhone: '(555) 654-3210',
      allergies: ['Sulfa drugs'],
      bloodType: 'AB+',
      vitals: {
        heartRate: 70,
        bloodPressure: '115/70',
        temperature: 98.2,
        oxygenSat: 100
      },
      lastUpdated: '2024-01-19T16:30:00Z'
    },
    {
      id: 'P005',
      name: 'David Wilson',
      age: 55,
      gender: 'Male',
      room: '208',
      bed: 'B',
      condition: 'Stroke Recovery',
      status: 'stable',
      priority: 'medium',
      department: 'neurology',
      admissionDate: '2024-01-16',
      dischargeDate: null,
      doctor: 'Dr. Kevin Park',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      phone: '(555) 567-8901',
      email: 'david.wilson@email.com',
      insurance: 'United Healthcare',
      emergencyContact: 'Linda Wilson',
      emergencyPhone: '(555) 543-2109',
      allergies: ['Iodine'],
      bloodType: 'O-',
      vitals: {
        heartRate: 76,
        bloodPressure: '125/82',
        temperature: 98.8,
        oxygenSat: 97
      },
      lastUpdated: '2024-01-20T08:20:00Z'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || patient.department === filterDepartment;
    const matchesPriority = filterPriority === 'all' || patient.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'admissionDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      stable: 'bg-green-100 text-green-800 border-green-200',
      recovering: 'bg-blue-100 text-blue-800 border-blue-200',
      discharged: 'bg-gray-100 text-gray-800 border-gray-200',
      admitted: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || colors.stable;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-green-50 text-green-700 border-green-200'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return FiAlert;
      case 'medium': return FiClock;
      case 'low': return FiHeart;
      default: return FiClock;
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const PatientCard = ({ patient, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelectPatient(patient)}
      className={`p-6 bg-white rounded-xl border cursor-pointer hover:shadow-md transition-all ${
        selectedPatient?.id === patient.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={patient.avatar} 
            alt={patient.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">ID: {patient.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon 
            icon={getPriorityIcon(patient.priority)} 
            className={`w-4 h-4 ${
              patient.priority === 'high' ? 'text-red-600' : 
              patient.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
            }`} 
          />
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
          <span>{patient.age} years, {patient.gender}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
          <span>Room {patient.room}{patient.bed}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
          <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900">{patient.condition}</p>
        <p className="text-xs text-gray-600">Dr. {patient.doctor}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(patient.priority)}`}>
          {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)} Priority
        </span>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
            <SafeIcon icon={FiEye} className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <SafeIcon icon={FiEdit} className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Patients ({sortedPatients.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredPatients.filter(p => p.status === 'critical').length} critical, 
              {filteredPatients.filter(p => p.status === 'stable').length} stable, 
              {filteredPatients.filter(p => p.status === 'recovering').length} recovering
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Sort Options */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="admissionDate-desc">Newest First</option>
              <option value="admissionDate-asc">Oldest First</option>
              <option value="status-asc">Status</option>
              <option value="priority-desc">Priority</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={FiList} className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={FiGrid} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient List/Grid */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedPatients.map((patient, index) => (
              <PatientCard key={patient.id} patient={patient} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectPatient(patient)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-sm transition-all group ${
                  selectedPatient?.id === patient.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={patient.avatar} 
                      alt={patient.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{patient.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </span>
                        <SafeIcon 
                          icon={getPriorityIcon(patient.priority)} 
                          className={`w-4 h-4 ${
                            patient.priority === 'high' ? 'text-red-600' : 
                            patient.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} 
                        />
                      </div>
                      <p className="text-sm text-gray-600">{patient.id} • {patient.condition}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>Room {patient.room}{patient.bed}</span>
                        <span>{patient.doctor}</span>
                        <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <div className="text-gray-900 font-medium">
                        HR: {patient.vitals.heartRate} bpm
                      </div>
                      <div className="text-gray-600">
                        BP: {patient.vitals.bloodPressure}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {sortedPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;