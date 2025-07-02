import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUsers, FiPlus, FiEdit, FiTrash2, FiUser, 
  FiMapPin, FiClock, FiTarget, FiTrendingUp 
} = FiIcons;

const TeamsPanel = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const { addNotification } = useNotification();

  const teams = [
    {
      id: 1,
      name: 'Emergency Response Team',
      department: 'Emergency',
      description: 'First response team for emergency situations and critical care',
      leader: 'Dr. Sarah Johnson',
      members: 8,
      activeMembers: 6,
      location: 'Emergency Department',
      shift: 'All Shifts',
      established: '2020-01-15',
      status: 'active',
      specialization: 'Emergency Medicine',
      members_list: [
        { id: 1, name: 'Dr. Sarah Johnson', role: 'Team Leader', status: 'online' },
        { id: 2, name: 'Dr. Michael Chen', role: 'Emergency Physician', status: 'online' },
        { id: 3, name: 'Nurse Jennifer Wilson', role: 'Emergency Nurse', status: 'busy' },
        { id: 4, name: 'Nurse Robert Davis', role: 'Trauma Nurse', status: 'online' },
        { id: 5, name: 'John Martinez', role: 'Paramedic', status: 'online' },
        { id: 6, name: 'Lisa Thompson', role: 'Emergency Technician', status: 'offline' },
        { id: 7, name: 'Mark Anderson', role: 'Security Officer', status: 'online' },
        { id: 8, name: 'Emily Rodriguez', role: 'Coordinator', status: 'busy' }
      ],
      metrics: {
        responseTime: '3.2 min',
        casesHandled: 156,
        satisfaction: '4.8/5'
      }
    },
    {
      id: 2,
      name: 'Cardiac Care Team',
      department: 'Cardiology',
      description: 'Specialized team for cardiac procedures and heart-related care',
      leader: 'Dr. Michael Brown',
      members: 6,
      activeMembers: 4,
      location: 'Cardiology Wing',
      shift: 'Day Shift',
      established: '2019-03-22',
      status: 'active',
      specialization: 'Cardiology',
      members_list: [
        { id: 1, name: 'Dr. Michael Brown', role: 'Cardiologist', status: 'busy' },
        { id: 2, name: 'Dr. Amanda Wilson', role: 'Interventional Cardiologist', status: 'online' },
        { id: 3, name: 'Nurse Patricia Lee', role: 'Cardiac Nurse', status: 'online' },
        { id: 4, name: 'David Kim', role: 'Cardiac Technician', status: 'online' },
        { id: 5, name: 'Sarah Garcia', role: 'Perfusionist', status: 'offline' },
        { id: 6, name: 'Tom Johnson', role: 'Echo Technician', status: 'offline' }
      ],
      metrics: {
        responseTime: '5.1 min',
        casesHandled: 89,
        satisfaction: '4.9/5'
      }
    },
    {
      id: 3,
      name: 'Critical Care Team',
      department: 'ICU',
      description: 'Intensive care specialists managing critically ill patients',
      leader: 'Dr. Lisa Chen',
      members: 12,
      activeMembers: 9,
      location: 'ICU - Floor 3',
      shift: 'All Shifts',
      established: '2018-11-10',
      status: 'active',
      specialization: 'Critical Care Medicine',
      members_list: [
        { id: 1, name: 'Dr. Lisa Chen', role: 'ICU Director', status: 'online' },
        { id: 2, name: 'Dr. James Wilson', role: 'Intensivist', status: 'busy' },
        { id: 3, name: 'Mary Smith', role: 'ICU Nurse', status: 'online' },
        { id: 4, name: 'Jennifer Brown', role: 'ICU Nurse', status: 'online' },
        { id: 5, name: 'Robert Johnson', role: 'Respiratory Therapist', status: 'online' }
      ],
      metrics: {
        responseTime: '2.8 min',
        casesHandled: 234,
        satisfaction: '4.7/5'
      }
    },
    {
      id: 4,
      name: 'Surgical Team Alpha',
      department: 'Surgery',
      description: 'Primary surgical team for major operations and procedures',
      leader: 'Dr. Robert Wilson',
      members: 10,
      activeMembers: 7,
      location: 'Operating Theater Complex',
      shift: 'Day Shift',
      established: '2017-06-30',
      status: 'active',
      specialization: 'General Surgery',
      members_list: [
        { id: 1, name: 'Dr. Robert Wilson', role: 'Chief Surgeon', status: 'busy' },
        { id: 2, name: 'Dr. Amanda Rodriguez', role: 'Surgeon', status: 'offline' },
        { id: 3, name: 'Nurse Kelly Martinez', role: 'OR Nurse', status: 'online' },
        { id: 4, name: 'Nurse Chris Davis', role: 'Scrub Nurse', status: 'online' }
      ],
      metrics: {
        responseTime: '8.5 min',
        casesHandled: 67,
        satisfaction: '4.8/5'
      }
    },
    {
      id: 5,
      name: 'Diagnostic Team',
      department: 'Laboratory',
      description: 'Laboratory and diagnostic imaging specialists',
      leader: 'Dr. Kevin Park',
      members: 8,
      activeMembers: 6,
      location: 'Laboratory & Radiology',
      shift: 'All Shifts',
      established: '2020-09-15',
      status: 'active',
      specialization: 'Diagnostics',
      members_list: [
        { id: 1, name: 'Dr. Kevin Park', role: 'Lab Director', status: 'online' },
        { id: 2, name: 'John Wilson', role: 'Lab Technician', status: 'online' },
        { id: 3, name: 'Maria Gonzalez', role: 'Radiologic Technologist', status: 'busy' }
      ],
      metrics: {
        responseTime: '12.3 min',
        casesHandled: 445,
        satisfaction: '4.6/5'
      }
    }
  ];

  const TeamCard = ({ team }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setSelectedTeam(team)}
      className={`p-6 bg-white rounded-xl border cursor-pointer transition-all ${
        selectedTeam?.id === team.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{team.name}</h3>
            <p className="text-sm text-gray-600">{team.department}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          team.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {team.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{team.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
          <span>{team.activeMembers}/{team.members} active</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
          <span>{team.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-600">Leader: </span>
          <span className="font-medium text-gray-900">{team.leader}</span>
        </div>
        <div className="flex items-center space-x-1">
          {team.members_list.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
              title={member.name}
            />
          ))}
          {team.members > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-white font-medium">+{team.members - 3}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const AddTeamModal = () => (
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
        <h3 className="text-lg font-semibold mb-4">Add New Team</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Team name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select department</option>
            <option>Emergency</option>
            <option>Cardiology</option>
            <option>ICU</option>
            <option>Surgery</option>
          </select>
          <textarea
            placeholder="Team description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddTeam(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowAddTeam(false);
              addNotification({
                type: 'success',
                title: 'Team Created',
                message: 'New team has been successfully created'
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Team
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Teams List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Teams ({teams.length})</h2>
          <button
            onClick={() => setShowAddTeam(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Team</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div className="lg:col-span-1">
        {selectedTeam ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Team Details</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Team Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">{selectedTeam.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{selectedTeam.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{selectedTeam.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leader:</span>
                    <span className="font-medium">{selectedTeam.leader}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Members:</span>
                    <span className="font-medium">{selectedTeam.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedTeam.location}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Response Time</span>
                    </div>
                    <span className="font-semibold text-blue-600">{selectedTeam.metrics.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Cases Handled</span>
                    </div>
                    <span className="font-semibold text-green-600">{selectedTeam.metrics.casesHandled}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Satisfaction</span>
                    </div>
                    <span className="font-semibold text-purple-600">{selectedTeam.metrics.satisfaction}</span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Team Members</h4>
                <div className="space-y-2">
                  {selectedTeam.members_list.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          member.status === 'online' ? 'bg-green-500' :
                          member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Team</h3>
              <p className="text-gray-600">Choose a team to view details and members</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Team Modal */}
      <AnimatePresence>
        {showAddTeam && <AddTeamModal />}
      </AnimatePresence>
    </div>
  );
};

export default TeamsPanel;