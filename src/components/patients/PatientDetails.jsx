import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiCalendar, FiMapPin, FiPhone, FiMail, FiEdit, FiFileText } = FiIcons;

const PatientDetails = ({ patient }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const vitals = [
    { label: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal' },
    { label: 'Temperature', value: '98.6°F', status: 'normal' },
    { label: 'Oxygen Saturation', value: '98%', status: 'normal' }
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '08:00' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '08:00, 20:00' },
    { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', time: '08:00' }
  ];

  const labResults = [
    { test: 'Complete Blood Count', result: 'Normal', date: '2024-01-20' },
    { test: 'Basic Metabolic Panel', result: 'Normal', date: '2024-01-20' },
    { test: 'Lipid Panel', result: 'Elevated cholesterol', date: '2024-01-18' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      normal: 'text-green-600 bg-green-50',
      elevated: 'text-yellow-600 bg-yellow-50',
      critical: 'text-red-600 bg-red-50'
    };
    return colors[status] || colors.normal;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'medications', label: 'Medications' },
    { id: 'labs', label: 'Lab Results' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      {/* Patient Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start space-x-4">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-1">Patient ID: {patient.id}</p>
            
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                <span>{patient.age} years, {patient.gender}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                <span>Room {patient.room}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                <span>{patient.doctor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Current Condition</h3>
              <p className="text-gray-700">{patient.condition}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Status</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(patient.status)}`}>
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                  <span>john.smith@email.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Latest Vitals</h3>
            <div className="grid grid-cols-1 gap-4">
              {vitals.map((vital, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{vital.label}</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{vital.value}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vital.status)}`}>
                      {vital.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <span className="text-sm text-gray-500">{med.dosage}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>{med.frequency}</p>
                    <p>Next dose: {med.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Lab Results</h3>
            <div className="space-y-3">
              {labResults.map((lab, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{lab.test}</h4>
                    <span className="text-sm text-gray-500">{lab.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{lab.result}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDetails;