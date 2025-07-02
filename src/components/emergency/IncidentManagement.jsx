import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiAlertTriangle, FiPlus, FiEdit, FiEye, FiClock, FiMapPin, FiUser,
  FiActivity, FiShield, FiCheck, FiX, FiSearch, FiFilter, FiFileText
} = FiIcons;

const IncidentManagement = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addNotification } = useNotification();

  const incidents = [
    {
      id: 'INC-001',
      title: 'Cardiac Arrest - ICU Room 304',
      type: 'Medical Emergency',
      priority: 'critical',
      status: 'active',
      location: 'ICU - Room 304',
      reportedBy: 'Nurse Sarah Wilson',
      assignedTeam: 'Alpha Response Team',
      createdAt: '2024-01-20T14:30:00Z',
      updatedAt: '2024-01-20T14:35:00Z',
      description: 'Patient experiencing cardiac arrest, immediate CPR in progress',
      timeline: [
        { time: '14:30', action: 'Incident reported', user: 'Nurse Sarah Wilson' },
        { time: '14:31', action: 'Alpha team dispatched', user: 'System' },
        { time: '14:32', action: 'Team arrived on scene', user: 'Dr. Michael Brown' },
        { time: '14:35', action: 'CPR initiated', user: 'Dr. Michael Brown' }
      ],
      resources: ['Defibrillator', 'Emergency Cart', 'Oxygen'],
      estimatedResolution: '15 minutes'
    },
    {
      id: 'INC-002',
      title: 'Fire Alarm - Kitchen Area',
      type: 'Fire Safety',
      priority: 'high',
      status: 'investigating',
      location: 'Ground Floor - Kitchen',
      reportedBy: 'Security Guard Tom Johnson',
      assignedTeam: 'Bravo Fire Team',
      createdAt: '2024-01-20T14:15:00Z',
      updatedAt: '2024-01-20T14:25:00Z',
      description: 'Smoke detector activation in kitchen area, investigating source',
      timeline: [
        { time: '14:15', action: 'Fire alarm triggered', user: 'System' },
        { time: '14:16', action: 'Security notified', user: 'System' },
        { time: '14:17', action: 'Fire team dispatched', user: 'Security Control' },
        { time: '14:20', action: 'Area secured, investigating', user: 'Fire Chief Adams' }
      ],
      resources: ['Fire Extinguisher', 'Smoke Detector', 'Ventilation System'],
      estimatedResolution: '30 minutes'
    },
    {
      id: 'INC-003',
      title: 'Power Outage - East Wing',
      type: 'Equipment Failure',
      priority: 'medium',
      status: 'resolved',
      location: 'East Wing - Floors 2-4',
      reportedBy: 'Maintenance Staff',
      assignedTeam: 'Delta Technical Team',
      createdAt: '2024-01-20T13:45:00Z',
      updatedAt: '2024-01-20T14:10:00Z',
      description: 'Partial power outage affecting non-critical systems',
      timeline: [
        { time: '13:45', action: 'Power outage reported', user: 'Maintenance Staff' },
        { time: '13:47', action: 'Backup power activated', user: 'System' },
        { time: '13:50', action: 'Technical team assigned', user: 'Control Center' },
        { time: '14:10', action: 'Power restored', user: 'Electrician Mike' }
      ],
      resources: ['Generator', 'Electrical Equipment', 'UPS Systems'],
      estimatedResolution: 'Completed'
    },
    {
      id: 'INC-004',
      title: 'Security Breach - Main Entrance',
      type: 'Security',
      priority: 'high',
      status: 'monitoring',
      location: 'Main Building - Entrance',
      reportedBy: 'Security Officer Davis',
      assignedTeam: 'Charlie Security',
      createdAt: '2024-01-20T13:30:00Z',
      updatedAt: '2024-01-20T14:00:00Z',
      description: 'Unauthorized access attempt detected, person detained for questioning',
      timeline: [
        { time: '13:30', action: 'Suspicious activity detected', user: 'Security Cameras' },
        { time: '13:31', action: 'Security notified', user: 'System' },
        { time: '13:35', action: 'Individual approached', user: 'Officer Davis' },
        { time: '14:00', action: 'Situation under control', user: 'Officer Davis' }
      ],
      resources: ['Security Personnel', 'CCTV System', 'Access Control'],
      estimatedResolution: '45 minutes'
    }
  ];

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || incident.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-red-100 text-red-800 border-red-200',
      investigating: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      monitoring: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || colors.active;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-50 text-red-700 border-red-200',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return FiAlertTriangle;
      case 'high': return FiActivity;
      case 'medium': return FiClock;
      default: return FiShield;
    }
  };

  const handleUpdateStatus = (incidentId, newStatus) => {
    addNotification({
      type: 'success',
      title: 'Incident Updated',
      message: `Incident ${incidentId} status changed to ${newStatus}`
    });
  };

  const CreateIncidentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Create New Incident</h3>
          <button 
            onClick={() => setShowCreateModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Brief description of incident"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type *
              </label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Medical Emergency</option>
                <option>Fire Safety</option>
                <option>Security</option>
                <option>Equipment Failure</option>
                <option>Natural Disaster</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level *
              </label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Specific location in hospital"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Detailed description of the incident..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reported By
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Name of person reporting"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Team
              </label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Auto-assign based on type</option>
                <option>Alpha Response Team</option>
                <option>Bravo Fire Team</option>
                <option>Charlie Security</option>
                <option>Delta Technical Team</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setShowCreateModal(false);
                addNotification({
                  type: 'success',
                  title: 'Incident Created',
                  message: 'New incident has been created and assigned'
                });
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Create Incident
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Incident Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Create Incident</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search incidents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="investigating">Investigating</option>
          <option value="monitoring">Monitoring</option>
          <option value="resolved">Resolved</option>
        </select>
        
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Priority</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedIncident(incident)}
              className={`p-6 bg-white rounded-xl border cursor-pointer hover:shadow-md transition-all ${
                selectedIncident?.id === incident.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon 
                    icon={getPriorityIcon(incident.priority)} 
                    className={`w-5 h-5 ${
                      incident.priority === 'critical' ? 'text-red-600' :
                      incident.priority === 'high' ? 'text-orange-600' :
                      incident.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} 
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                    <p className="text-sm text-gray-600">{incident.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(incident.priority)}`}>
                    {incident.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                  <span>{incident.location}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                  <span>{incident.assignedTeam}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                  <span>Created: {new Date(incident.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{incident.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  ETA: {incident.estimatedResolution}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Incident Details */}
        <div className="lg:col-span-1">
          {selectedIncident ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Incident Details</h3>
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{selectedIncident.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium">{selectedIncident.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedIncident.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedIncident.priority)}`}>
                        {selectedIncident.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedIncident.status)}`}>
                        {selectedIncident.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                  <div className="space-y-2">
                    {selectedIncident.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{event.action}</p>
                          <p className="text-xs text-gray-500">{event.time} - {event.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedIncident.resources.map((resource, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.id, 'resolved')}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    <SafeIcon icon={FiCheck} className="w-4 h-4" />
                    <span>Mark Resolved</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    <span>Update Status</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                    <SafeIcon icon={FiFileText} className="w-4 h-4" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚨</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Incident</h3>
                <p className="text-gray-600">Choose an incident to view details and timeline</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Incident Modal */}
      <AnimatePresence>
        {showCreateModal && <CreateIncidentModal />}
      </AnimatePresence>
    </div>
  );
};

export default IncidentManagement;