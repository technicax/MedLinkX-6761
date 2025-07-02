import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientList from './PatientList';
import PatientDetails from './PatientDetails';
import AddPatientModal from './AddPatientModal';
import PatientSearch from './PatientSearch';
import PatientStats from './PatientStats';
import SafeIcon from '../../common/SafeIcon';
import { useSite } from '../../contexts/SiteContext';
import { useSiteData } from '../../hooks/useSiteData';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiPlus, FiUsers, FiUserCheck, FiClock, FiHeart, FiBuilding } = FiIcons;

const Patients = () => {
  const { currentSite } = useSite();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Site-specific patient data
  const [sitePatients, setSitePatients] = useSiteData('patients', []);

  useEffect(() => {
    // Initialize with sample site-specific patients if none exist
    if (currentSite && (!sitePatients || sitePatients.length === 0)) {
      const samplePatients = generateSamplePatients(currentSite);
      setSitePatients(samplePatients);
    }
  }, [currentSite, sitePatients, setSitePatients]);

  const generateSamplePatients = (site) => {
    if (!site) return [];

    const siteCode = site.code.toLowerCase();
    const siteDepartments = site.departments;

    return [
      {
        id: `${siteCode}-p001`,
        name: 'John Smith',
        age: 45,
        gender: 'Male',
        room: '204',
        bed: 'A',
        condition: 'Cardiac Surgery Recovery',
        status: 'stable',
        priority: 'medium',
        department: siteDepartments.includes('cardiology') ? 'cardiology' : siteDepartments[0],
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
        lastUpdated: new Date().toISOString(),
        siteId: site.id,
        siteName: site.name
      },
      {
        id: `${siteCode}-p002`,
        name: 'Maria Garcia',
        age: 32,
        gender: 'Female',
        room: '315',
        bed: 'B',
        condition: 'Pneumonia',
        status: 'critical',
        priority: 'high',
        department: siteDepartments.includes('icu') ? 'icu' : siteDepartments[0],
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
        lastUpdated: new Date().toISOString(),
        siteId: site.id,
        siteName: site.name
      }
    ];
  };

  // Filter options based on current site
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
    ...(currentSite?.departments || []).map(dept => ({
      value: dept,
      label: dept.charAt(0).toUpperCase() + dept.slice(1).replace('-', ' ')
    }))
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handlePatientAdded = (newPatient) => {
    // Add site information to new patient
    const sitePatient = {
      ...newPatient,
      siteId: currentSite.id,
      siteName: currentSite.name,
      id: `${currentSite.code.toLowerCase()}-p${Date.now().toString().slice(-6)}`
    };
    setSitePatients([...sitePatients, sitePatient]);
    setShowAddModal(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterDepartment('all');
    setFilterPriority('all');
  };

  if (!currentSite) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <SafeIcon icon={FiBuilding} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Hospital Selected</h3>
          <p className="text-gray-600">Please select a hospital to view patient data</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Patient Management - {currentSite.shortName}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentSite.name} • {sitePatients.length} patients
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: currentSite.theme.primary }}
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Site-specific Stats */}
      <PatientStats patients={sitePatients} site={currentSite} />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Search & Filter Patients - {currentSite.shortName}
          </h3>
          <button
            onClick={clearFilters}
            className="text-sm font-medium hover:opacity-70"
            style={{ color: currentSite.theme.primary }}
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
              placeholder={`Search ${currentSite.shortName} patients...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': currentSite.theme.primary }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': currentSite.theme.primary }}
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
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': currentSite.theme.primary }}
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
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': currentSite.theme.primary }}
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
          site={currentSite}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-2">
          <PatientList
            patients={sitePatients}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            filterDepartment={filterDepartment}
            filterPriority={filterPriority}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            site={currentSite}
          />
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-1">
          {selectedPatient ? (
            <PatientDetails
              patient={selectedPatient}
              onPatientUpdate={(updatedPatient) => {
                const updatedPatients = sitePatients.map(p =>
                  p.id === updatedPatient.id ? updatedPatient : p
                );
                setSitePatients(updatedPatients);
                setSelectedPatient(updatedPatient);
              }}
              site={currentSite}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Patient
                </h3>
                <p className="text-gray-600">
                  Choose a patient to view detailed information and medical records for {currentSite.shortName}
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
            site={currentSite}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Patients;