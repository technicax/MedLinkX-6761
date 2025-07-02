import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiAlertTriangle, FiActivity, FiClock, FiUsers, FiMapPin, 
  FiTrendingUp, FiShield, FiRadio, FiHeart, FiZap 
} = FiIcons;

const EmergencyDashboard = () => {
  const [liveData, setLiveData] = useState({
    activeIncidents: 3,
    responseTeams: 8,
    avgResponseTime: '4.2 min',
    facilityStatus: 'operational'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        activeIncidents: Math.max(0, prev.activeIncidents + Math.floor(Math.random() * 3) - 1),
        responseTeams: Math.max(5, Math.min(12, prev.responseTeams + Math.floor(Math.random() * 3) - 1))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const emergencyStats = [
    {
      title: 'Active Incidents',
      value: liveData.activeIncidents,
      status: liveData.activeIncidents > 5 ? 'critical' : liveData.activeIncidents > 2 ? 'warning' : 'normal',
      icon: FiAlertTriangle,
      description: 'Current emergency situations'
    },
    {
      title: 'Response Teams',
      value: `${liveData.responseTeams}/12`,
      status: 'normal',
      icon: FiUsers,
      description: 'Teams available for deployment'
    },
    {
      title: 'Avg Response Time',
      value: liveData.avgResponseTime,
      status: 'normal',
      icon: FiClock,
      description: 'Average emergency response time'
    },
    {
      title: 'Facility Status',
      value: liveData.facilityStatus,
      status: 'normal',
      icon: FiShield,
      description: 'Overall facility operational status'
    }
  ];

  const recentIncidents = [
    {
      id: 'INC-001',
      type: 'Medical Emergency',
      location: 'ICU - Room 304',
      priority: 'critical',
      status: 'active',
      time: '3 min ago',
      assignedTeam: 'Alpha Team',
      description: 'Patient cardiac arrest'
    },
    {
      id: 'INC-002',
      type: 'Fire Alarm',
      location: 'Kitchen Area',
      priority: 'high',
      status: 'investigating',
      time: '12 min ago',
      assignedTeam: 'Safety Team',
      description: 'Smoke detector activation'
    },
    {
      id: 'INC-003',
      type: 'Security Alert',
      location: 'Main Entrance',
      priority: 'medium',
      status: 'resolved',
      time: '28 min ago',
      assignedTeam: 'Security Team',
      description: 'Unauthorized access attempt'
    }
  ];

  const responseTeams = [
    {
      id: 'team-1',
      name: 'Alpha Response Team',
      status: 'deployed',
      location: 'ICU Floor 3',
      members: 4,
      specialization: 'Medical Emergency',
      lastUpdate: '2 min ago'
    },
    {
      id: 'team-2',
      name: 'Bravo Fire Team',
      status: 'standby',
      location: 'Fire Station',
      members: 6,
      specialization: 'Fire & Evacuation',
      lastUpdate: '5 min ago'
    },
    {
      id: 'team-3',
      name: 'Charlie Security',
      status: 'patrol',
      location: 'Main Building',
      members: 3,
      specialization: 'Security & Access',
      lastUpdate: '1 min ago'
    },
    {
      id: 'team-4',
      name: 'Delta Hazmat',
      status: 'available',
      location: 'Equipment Bay',
      members: 5,
      specialization: 'Hazardous Materials',
      lastUpdate: '8 min ago'
    }
  ];

  // Emergency response time chart
  const responseTimeChart = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Response Time', 'Target Time']
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
    },
    yAxis: {
      type: 'value',
      name: 'Minutes'
    },
    series: [
      {
        name: 'Response Time',
        type: 'line',
        data: [3.2, 4.1, 5.2, 6.8, 4.5, 3.8],
        smooth: true,
        itemStyle: { color: '#EF4444' }
      },
      {
        name: 'Target Time',
        type: 'line',
        data: [5, 5, 5, 5, 5, 5],
        lineStyle: { type: 'dashed' },
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  // Incident type distribution
  const incidentTypeChart = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Incident Types',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 35, name: 'Medical Emergency', itemStyle: { color: '#EF4444' } },
          { value: 25, name: 'Fire Safety', itemStyle: { color: '#F59E0B' } },
          { value: 20, name: 'Security', itemStyle: { color: '#8B5CF6' } },
          { value: 12, name: 'Equipment Failure', itemStyle: { color: '#06B6D4' } },
          { value: 8, name: 'Other', itemStyle: { color: '#6B7280' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      normal: 'bg-green-100 text-green-800 border-green-200',
      active: 'bg-red-100 text-red-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      deployed: 'bg-red-100 text-red-800',
      standby: 'bg-yellow-100 text-yellow-800',
      available: 'bg-green-100 text-green-800',
      patrol: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || colors.normal;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return FiAlertTriangle;
      case 'high': return FiZap;
      case 'medium': return FiActivity;
      default: return FiHeart;
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {emergencyStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getStatusColor(stat.status)}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">{stat.description}</p>
            
            {/* Live indicator for active incidents */}
            {stat.title === 'Active Incidents' && (
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-gray-500">Live monitoring</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Analysis</h3>
          <div className="h-80">
            <ReactECharts option={responseTimeChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Incident Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Type Distribution</h3>
          <div className="h-80">
            <ReactECharts option={incidentTypeChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Recent Incidents and Response Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Incidents</h3>
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SafeIcon 
                      icon={getPriorityIcon(incident.priority)} 
                      className={`w-4 h-4 ${
                        incident.priority === 'critical' ? 'text-red-600' :
                        incident.priority === 'high' ? 'text-orange-600' : 'text-yellow-600'
                      }`} 
                    />
                    <span className="font-medium text-gray-900">{incident.type}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{incident.time}</span>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiUsers} className="w-3 h-3 mr-1" />
                    <span>{incident.assignedTeam}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{incident.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Response Teams Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response Teams</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Deploy Team
            </button>
          </div>
          
          <div className="space-y-4">
            {responseTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">{team.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(team.status)}`}>
                      {team.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{team.lastUpdate}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiUsers} className="w-3 h-3 mr-1" />
                    <span>{team.members} members</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {team.specialization}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5" />
            <span className="font-medium">Emergency Alert</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <SafeIcon icon={FiRadio} className="w-5 h-5" />
            <span className="font-medium">Broadcast Message</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <SafeIcon icon={FiUsers} className="w-5 h-5" />
            <span className="font-medium">Deploy Team</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <SafeIcon icon={FiActivity} className="w-5 h-5" />
            <span className="font-medium">System Status</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyDashboard;