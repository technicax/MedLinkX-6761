import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientList from './PatientList';
import PatientDetails from './PatientDetails';
import AddPatientModal from './AddPatientModal';
import PatientSearch from './PatientSearch';
import PatientStats from './PatientStats';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiPlus, FiUsers, FiUserCheck, FiClock, FiHeart } = FiIcons;

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'details'

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'admitted', label: 'Admitted' },
    { value: 'discharged', label: 'Discharged' },
    { value: 'critical', label: 'Critical' },
    { value: 'stable', label: 'Stable' },
    { value: 'recovering', label: 'Recovering' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'icu', label: 'ICU' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'oncology', label: 'Oncology' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handlePatientAdded = () => {
    setShowAddModal(false);
    // Refresh patient list logic would go here
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterDepartment('all');
    setFilterPriority('all');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive patient records and care coordination
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <PatientStats />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Search & Filter Patients</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Search Component */}
        <PatientSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-2">
          <PatientList
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            filterDepartment={filterDepartment}
            filterPriority={filterPriority}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-1">
          {selectedPatient ? (
            <PatientDetails 
              patient={selectedPatient} 
              onPatientUpdate={(updatedPatient) => setSelectedPatient(updatedPatient)}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Patient
                </h3>
                <p className="text-gray-600">
                  Choose a patient to view detailed information and medical records
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddPatientModal
            onClose={() => setShowAddModal(false)}
            onPatientAdded={handlePatientAdded}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Patients;