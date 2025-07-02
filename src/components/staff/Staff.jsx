import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StaffList from './StaffList';
import StaffDetails from './StaffDetails';
import AddStaffModal from './AddStaffModal';
import TeamsPanel from './TeamsPanel';
import DepartmentPanel from './DepartmentPanel';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiPlus, FiUsers, FiBuilding } = FiIcons;

const Staff = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState('staff');

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'icu', label: 'ICU' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'radiology', label: 'Radiology' }
  ];

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'technician', label: 'Technician' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'administrator', label: 'Administrator' },
    { value: 'security', label: 'Security' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'online', label: 'Online' },
    { value: 'busy', label: 'Busy' },
    { value: 'offline', label: 'Offline' }
  ];

  const handleStaffAdded = () => {
    setShowAddModal(false);
  };

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    // Reset selected staff when changing views
    if (viewId !== 'staff') {
      setSelectedStaff(null);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'teams':
        return <TeamsPanel />;
      case 'departments':
        return <DepartmentPanel />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Panel - Staff List */}
            <div className="lg:col-span-2">
              <StaffList
                searchTerm={searchTerm}
                filterDepartment={filterDepartment}
                filterStatus={filterStatus}
                filterRole={filterRole}
                selectedStaff={selectedStaff}
                onSelectStaff={setSelectedStaff}
              />
            </div>

            {/* Right Panel - Staff Details */}
            <div className="lg:col-span-1">
              {selectedStaff ? (
                <StaffDetails staff={selectedStaff} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select Staff Member
                    </h3>
                    <p className="text-gray-600">
                      Choose a staff member to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage hospital staff, teams, and departments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => handleViewChange('staff')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'staff'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <SafeIcon icon={FiUsers} className="w-4 h-4" />
          <span>Staff Members</span>
        </button>

        <button
          onClick={() => handleViewChange('teams')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'teams'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <SafeIcon icon={FiUsers} className="w-4 h-4" />
          <span>Teams</span>
        </button>

        <button
          onClick={() => handleViewChange('departments')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'departments'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <SafeIcon icon={FiBuilding} className="w-4 h-4" />
          <span>Departments</span>
        </button>
      </div>

      {/* Filters - Only show for staff view */}
      {activeView === 'staff' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search staff..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderView()}
      </motion.div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <AddStaffModal
          onClose={() => setShowAddModal(false)}
          onStaffAdded={handleStaffAdded}
        />
      )}
    </motion.div>
  );
};

export default Staff;