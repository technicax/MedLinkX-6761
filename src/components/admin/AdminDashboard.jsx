import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useSite } from '../../contexts/SiteContext';
import { useUserAccess } from '../../contexts/UserAccessContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiBuilding, FiUsers, FiActivity, FiShield, FiTrendingUp, FiTrendingDown,
  FiClock, FiCheck, FiAlertTriangle, FiBarChart3
} = FiIcons;

const AdminDashboard = () => {
  const { availableSites } = useSite();
  const { getAllUsers } = useUserAccess();

  const sites = Object.values(availableSites);
  const users = getAllUsers();

  // Calculate statistics
  const totalSites = sites.length;
  const activeSites = sites.filter(site => site.status === 'active').length;
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.accessLevel).length;
  const totalBeds = sites.reduce((sum, site) => sum + (site.beds || 0), 0);
  const totalDepartments = sites.reduce((sum, site) => sum + (site.departments?.length || 0), 0);

  const stats = [
    {
      title: 'Total Facilities',
      value: totalSites.toString(),
      change: '+2',
      trend: 'up',
      icon: FiBuilding,
      color: 'blue',
      description: 'Active medical facilities'
    },
    {
      title: 'System Users',
      value: totalUsers.toString(),
      change: '+5',
      trend: 'up',
      icon: FiUsers,
      color: 'green',
      description: 'Registered users with access'
    },
    {
      title: 'Total Capacity',
      value: `${totalBeds} beds`,
      change: '+50',
      trend: 'up',
      icon: FiActivity,
      color: 'purple',
      description: 'Combined bed capacity'
    },
    {
      title: 'Active Sites',
      value: `${activeSites}/${totalSites}`,
      change: '100%',
      trend: 'up',
      icon: FiCheck,
      color: 'green',
      description: 'Operational facilities'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New facility added',
      details: 'Metro Children\'s Hospital was added to the system',
      user: 'System Admin',
      timestamp: '2 hours ago',
      type: 'facility'
    },
    {
      id: 2,
      action: 'User access granted',
      details: 'Dr. Sarah Johnson granted access to Riverside Medical',
      user: 'Admin',
      timestamp: '4 hours ago',
      type: 'user'
    },
    {
      id: 3,
      action: 'Facility updated',
      details: 'Central Hospital bed capacity increased to 450',
      user: 'System Admin',
      timestamp: '1 day ago',
      type: 'facility'
    },
    {
      id: 4,
      action: 'New user registered',
      details: 'nurse@riverside.com added to the system',
      user: 'Admin',
      timestamp: '2 days ago',
      type: 'user'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'facility': return FiBuilding;
      case 'user': return FiUsers;
      default: return FiActivity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'facility': return 'text-blue-600 bg-blue-50';
      case 'user': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <SafeIcon 
                icon={stat.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} 
              />
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">this month</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Facilities Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Facilities Overview</h3>
            <SafeIcon icon={FiBuilding} className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {sites.map((site, index) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: site.theme.primary }}
                  >
                    <SafeIcon icon={FiBuilding} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{site.shortName}</h4>
                    <p className="text-sm text-gray-600">{site.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      site.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {site.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {site.beds} beds • {site.departments?.length || 0} depts
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <SafeIcon icon={getActivityIcon(activity.type)} className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-400">{activity.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
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
            className="flex items-center space-x-3 p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span className="font-medium">Add Facility</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <SafeIcon icon={FiUsers} className="w-5 h-5" />
            <span className="font-medium">Manage Users</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <SafeIcon icon={FiBarChart3} className="w-5 h-5" />
            <span className="font-medium">View Reports</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <SafeIcon icon={FiShield} className="w-5 h-5" />
            <span className="font-medium">System Settings</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;