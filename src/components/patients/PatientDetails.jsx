import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiCalendar, FiMapPin, FiPhone, FiMail, FiEdit, FiFileText,
  FiHeart, FiActivity, FiThermometer, FiDroplet, FiClock, FiAlert,
  FiPill, FiClipboard, FiUserCheck, FiShield, FiDownload, FiPrinter
} = FiIcons;

const PatientDetails = ({ patient, onPatientUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const vitals = [
    { 
      label: 'Heart Rate', 
      value: `${patient.vitals.heartRate} bpm`, 
      status: patient.vitals.heartRate > 100 ? 'high' : patient.vitals.heartRate < 60 ? 'low' : 'normal',
      icon: FiHeart
    },
    { 
      label: 'Blood Pressure', 
      value: patient.vitals.bloodPressure, 
      status: 'normal',
      icon: FiActivity
    },
    { 
      label: 'Temperature', 
      value: `${patient.vitals.temperature}°F`, 
      status: patient.vitals.temperature > 99.5 ? 'high' : 'normal',
      icon: FiThermometer
    },
    { 
      label: 'Oxygen Saturation', 
      value: `${patient.vitals.oxygenSat}%`, 
      status: patient.vitals.oxygenSat < 95 ? 'low' : 'normal',
      icon: FiDroplet
    }
  ];

  const medications = [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '08:00',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active'
    },
    {
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      time: '08:00, 20:00',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active'
    },
    {
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      time: '08:00',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      endDate: 'Ongoing',
      status: 'active'
    }
  ];

  const labResults = [
    {
      test: 'Complete Blood Count (CBC)',
      result: 'Normal',
      date: '2024-01-20',
      status: 'normal',
      details: 'WBC: 7.2, RBC: 4.5, HGB: 14.2, HCT: 42.1'
    },
    {
      test: 'Basic Metabolic Panel',
      result: 'Normal',
      date: '2024-01-20',
      status: 'normal',
      details: 'Glucose: 95, BUN: 18, Creatinine: 1.0'
    },
    {
      test: 'Lipid Panel',
      result: 'Elevated cholesterol',
      date: '2024-01-18',
      status: 'abnormal',
      details: 'Total: 245, LDL: 165, HDL: 38, Triglycerides: 210'
    },
    {
      test: 'Troponin I',
      result: 'Elevated',
      date: '2024-01-15',
      status: 'critical',
      details: '0.8 ng/mL (Normal: <0.04)'
    }
  ];

  const procedures = [
    {
      name: 'Cardiac Catheterization',
      date: '2024-01-16',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      notes: 'Successful PCI with stent placement in LAD'
    },
    {
      name: 'Echocardiogram',
      date: '2024-01-15',
      doctor: 'Dr. Michael Brown',
      status: 'completed',
      notes: 'EF 45%, mild LV dysfunction'
    }
  ];

  const notes = [
    {
      date: '2024-01-20 10:30',
      author: 'Dr. Sarah Johnson',
      type: 'Progress Note',
      content: 'Patient continues to recover well from cardiac procedure. Chest pain resolved. Ambulating without assistance. Plan to discharge tomorrow if stable.'
    },
    {
      date: '2024-01-19 14:15',
      author: 'Nurse Mary Smith',
      type: 'Nursing Note',
      content: 'Patient reports mild chest discomfort 3/10. Vitals stable. Given PRN pain medication with good effect.'
    },
    {
      date: '2024-01-18 08:00',
      author: 'Dr. Sarah Johnson',
      type: 'Admission Note',
      content: 'Patient admitted with chest pain and elevated troponins. Underwent emergent cardiac catheterization with successful PCI.'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      normal: 'text-green-600 bg-green-50 border-green-200',
      high: 'text-red-600 bg-red-50 border-red-200',
      low: 'text-blue-600 bg-blue-50 border-blue-200',
      critical: 'text-red-600 bg-red-50 border-red-200',
      abnormal: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      active: 'text-green-600 bg-green-50 border-green-200',
      completed: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    return colors[status] || colors.normal;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'vitals', label: 'Vitals', icon: FiHeart },
    { id: 'medications', label: 'Medications', icon: FiPill },
    { id: 'labs', label: 'Lab Results', icon: FiClipboard },
    { id: 'procedures', label: 'Procedures', icon: FiUserCheck },
    { id: 'notes', label: 'Notes', icon: FiFileText }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      {/* Patient Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={patient.avatar} 
              alt={patient.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(patient.status)}`}>
                  {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  Last updated: {new Date(patient.lastUpdated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <SafeIcon icon={FiPrinter} className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
            <span>{patient.age} years, {patient.gender}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
            <span>Room {patient.room}{patient.bed}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
            <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiUserCheck} className="w-4 h-4 mr-2" />
            <span>{patient.doctor}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Current Condition</h3>
              <p className="text-gray-700">{patient.condition}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Blood Type</label>
                  <p className="text-gray-900">{patient.bloodType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Insurance</label>
                  <p className="text-gray-900">{patient.insurance}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Allergies</label>
                  <p className="text-gray-900">
                    {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None known'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Department</label>
                  <p className="text-gray-900 capitalize">{patient.department}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Emergency Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                  <span>{patient.emergencyContact}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                  <span>{patient.emergencyPhone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Current Vitals</h3>
            <div className="grid grid-cols-1 gap-4">
              {vitals.map((vital, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(vital.status)}`}>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={vital.icon} className="w-5 h-5" />
                    <span className="font-medium">{vital.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{vital.value}</div>
                    <div className="text-xs capitalize">{vital.status}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Vital Signs Trend</h4>
                <button className="text-sm text-blue-600 hover:text-blue-700">View Chart</button>
              </div>
              <div className="text-sm text-gray-600">
                Last recorded: {new Date(patient.lastUpdated).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Add Medication
              </button>
            </div>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(med.status)}`}>
                      {med.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Dosage:</span> {med.dosage}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span> {med.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Next dose:</span> {med.time}
                    </div>
                    <div>
                      <span className="font-medium">Prescribed by:</span> {med.prescribedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Lab Results</h3>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Order Labs
              </button>
            </div>
            <div className="space-y-3">
              {labResults.map((lab, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{lab.test}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{lab.date}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lab.status)}`}>
                        {lab.result}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{lab.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'procedures' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Procedures & Treatments</h3>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Schedule Procedure
              </button>
            </div>
            <div className="space-y-3">
              {procedures.map((procedure, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{procedure.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(procedure.status)}`}>
                      {procedure.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Date:</span> {procedure.date} • 
                    <span className="font-medium"> Doctor:</span> {procedure.doctor}
                  </div>
                  <p className="text-sm text-gray-600">{procedure.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Clinical Notes</h3>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Add Note
              </button>
            </div>
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{note.type}</span>
                      <span className="text-sm text-gray-500">by {note.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
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