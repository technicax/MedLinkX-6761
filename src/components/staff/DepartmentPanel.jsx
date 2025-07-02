import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBuilding, FiPlus, FiEdit, FiTrash2, FiUsers, 
  FiMapPin, FiTrendingUp, FiActivity, FiClock,
  FiBarChart3, FiTarget
} = FiIcons;

const DepartmentPanel = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [showAddDept, setShowAddDept] = useState(false);
  const { addNotification } = useNotification();

  const departments = [
    {
      id: 1,
      name: 'Emergency Department',
      code: 'ED',
      description: 'Provides immediate medical care for urgent and life-threatening conditions',
      head: 'Dr. Sarah Johnson',
      location: 'Ground Floor - East Wing',
      established: '1985-03-15',
      staff: 24,
      activeStaff: 18,
      teams: 3,
      budget: '$2.4M',
      status: 'operational',
      specializations: ['Emergency Medicine', 'Trauma Care', 'Critical Care'],
      equipment: ['CT Scanner', 'X-Ray Machines', 'Ultrasound', 'Defibrillators'],
      metrics: {
        patientVolume: 1247,
        avgWaitTime: '18 min',
        satisfaction: '4.6/5',
        bedOccupancy: '89%'
      },
      staff_breakdown: {
        doctors: 8,
        nurses: 12,
        technicians: 3,
        administrators: 1
      }
    },
    {
      id: 2,
      name: 'Cardiology Department',
      code: 'CARD',
      description: 'Specialized care for heart and cardiovascular conditions',
      head: 'Dr. Michael Brown',
      location: 'Floor 2 - North Wing',
      established: '1990-08-22',
      staff: 18,
      activeStaff: 14,
      teams: 2,
      budget: '$1.8M',
      status: 'operational',
      specializations: ['Interventional Cardiology', 'Electrophysiology', 'Heart Surgery'],
      equipment: ['Cardiac Cath Lab', 'Echo Machines', 'EKG Machines', 'Stress Test Equipment'],
      metrics: {
        patientVolume: 892,
        avgWaitTime: '25 min',
        satisfaction: '4.8/5',
        bedOccupancy: '76%'
      },
      staff_breakdown: {
        doctors: 6,
        nurses: 8,
        technicians: 3,
        administrators: 1
      }
    },
    {
      id: 3,
      name: 'Intensive Care Unit',
      code: 'ICU',
      description: 'Critical care for patients requiring intensive monitoring and treatment',
      head: 'Dr. Lisa Chen',
      location: 'Floor 3 - Central Wing',
      established: '1988-11-10',
      staff: 28,
      activeStaff: 22,
      teams: 4,
      budget: '$3.2M',
      status: 'operational',
      specializations: ['Critical Care Medicine', 'Respiratory Care', 'Neurointensive Care'],
      equipment: ['Ventilators', 'ECMO Machines', 'Dialysis Machines', 'Monitoring Systems'],
      metrics: {
        patientVolume: 456,
        avgWaitTime: 'N/A',
        satisfaction: '4.7/5',
        bedOccupancy: '94%'
      },
      staff_breakdown: {
        doctors: 8,
        nurses: 16,
        technicians: 2,
        administrators: 2
      }
    },
    {
      id: 4,
      name: 'Surgery Department',
      code: 'SURG',
      description: 'Comprehensive surgical services and operating room management',
      head: 'Dr. Robert Wilson',
      location: 'Floor 4 - Operating Complex',
      established: '1987-06-30',
      staff: 32,
      activeStaff: 24,
      teams: 5,
      budget: '$4.1M',
      status: 'operational',
      specializations: ['General Surgery', 'Orthopedic Surgery', 'Neurosurgery', 'Plastic Surgery'],
      equipment: ['Operating Tables', 'Surgical Robots', 'Anesthesia Machines', 'Surgical Instruments'],
      metrics: {
        patientVolume: 678,
        avgWaitTime: '45 min',
        satisfaction: '4.9/5',
        bedOccupancy: '82%'
      },
      staff_breakdown: {
        doctors: 12,
        nurses: 16,
        technicians: 3,
        administrators: 1
      }
    },
    {
      id: 5,
      name: 'Laboratory Department',
      code: 'LAB',
      description: 'Diagnostic testing and laboratory services',
      head: 'Dr. Kevin Park',
      location: 'Floor 1 - South Wing',
      established: '1986-09-15',
      staff: 16,
      activeStaff: 12,
      teams: 2,
      budget: '$1.2M',
      status: 'operational',
      specializations: ['Clinical Chemistry', 'Hematology', 'Microbiology', 'Pathology'],
      equipment: ['Analyzers', 'Microscopes', 'Centrifuges', 'Incubators'],
      metrics: {
        patientVolume: 2145,
        avgWaitTime: '2.5 hours',
        satisfaction: '4.4/5',
        bedOccupancy: 'N/A'
      },
      staff_breakdown: {
        doctors: 3,
        nurses: 2,
        technicians: 10,
        administrators: 1
      }
    },
    {
      id: 6,
      name: 'Pharmacy Department',
      code: 'PHARM',
      description: 'Medication management and pharmaceutical services',
      head: 'Dr. Amanda Rodriguez',
      location: 'Floor 1 - West Wing',
      established: '1985-12-03',
      staff: 12,
      activeStaff: 9,
      teams: 1,
      budget: '$800K',
      status: 'operational',
      specializations: ['Clinical Pharmacy', 'Drug Information', 'Sterile Compounding'],
      equipment: ['Automated Dispensing', 'IV Compounders', 'Refrigeration Units'],
      metrics: {
        patientVolume: 3456,
        avgWaitTime: '15 min',
        satisfaction: '4.5/5',
        bedOccupancy: 'N/A'
      },
      staff_breakdown: {
        doctors: 2,
        nurses: 0,
        technicians: 8,
        administrators: 2
      }
    }
  ];

  const DepartmentCard = ({ dept }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setSelectedDept(dept)}
      className={`p-6 bg-white rounded-xl border cursor-pointer transition-all ${
        selectedDept?.id === dept.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBuilding} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{dept.name}</h3>
            <p className="text-sm text-gray-600">{dept.code}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          dept.status === 'operational' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {dept.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{dept.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
          <span>{dept.activeStaff}/{dept.staff} staff</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
          <span>{dept.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-600">Head: </span>
          <span className="font-medium text-gray-900">{dept.head}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Teams: </span>
          <span className="font-medium text-gray-900">{dept.teams}</span>
        </div>
      </div>
    </motion.div>
  );

  const AddDepartmentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-md w-full"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Department name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Department code"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Department description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Department head"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddDept(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowAddDept(false);
              addNotification({
                type: 'success',
                title: 'Department Created',
                message: 'New department has been successfully created'
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Department
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Departments List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Departments ({departments.length})</h2>
          <button
            onClick={() => setShowAddDept(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} dept={dept} />
          ))}
        </div>
      </div>

      {/* Department Details */}
      <div className="lg:col-span-1">
        {selectedDept ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Department Details</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{selectedDept.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedDept.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Code:</span>
                  <span className="font-medium">{selectedDept.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Head:</span>
                  <span className="font-medium">{selectedDept.head}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedDept.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">{selectedDept.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">{new Date(selectedDept.established).getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Staff Breakdown */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Staff Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(selectedDept.staff_breakdown).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600 capitalize">{role}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiBarChart3} className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Patient Volume</span>
                  </div>
                  <span className="font-semibold text-blue-600">{selectedDept.metrics.patientVolume}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Avg Wait Time</span>
                  </div>
                  <span className="font-semibold text-yellow-600">{selectedDept.metrics.avgWaitTime}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Satisfaction</span>
                  </div>
                  <span className="font-semibold text-green-600">{selectedDept.metrics.satisfaction}</span>
                </div>

                {selectedDept.metrics.bedOccupancy !== 'N/A' && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Bed Occupancy</span>
                    </div>
                    <span className="font-semibold text-purple-600">{selectedDept.metrics.bedOccupancy}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDept.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Equipment</h4>
              <div className="space-y-1">
                {selectedDept.equipment.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Department</h3>
              <p className="text-gray-600">Choose a department to view details and metrics</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Department Modal */}
      <AnimatePresence>
        {showAddDept && <AddDepartmentModal />}
      </AnimatePresence>
    </div>
  );
};

export default DepartmentPanel;