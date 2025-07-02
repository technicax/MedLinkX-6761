import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiHeart, FiAlertTriangle, FiTrendingUp, FiClock, FiUserCheck } = FiIcons;

const PatientStats = ({ patients = [], site }) => {
  // Calculate stats from actual patient data
  const totalPatients = patients.length;
  const criticalCases = patients.filter(p => p.status === 'critical').length;
  const stablePatients = patients.filter(p => p.status === 'stable').length;
  const avgLengthOfStay = '3.2 days'; // This would be calculated from actual data
  const dischargesToday = patients.filter(p => {
    const today = new Date().toDateString();
    return p.dischargeDate && new Date(p.dischargeDate).toDateString() === today;
  }).length;
  
  // Calculate bed occupancy based on site capacity
  const bedOccupancy = site ? Math.round((totalPatients / site.beds) * 100) : 0;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients.toString(),
      change: '+12',
      trend: 'up',
      icon: FiUsers,
      color: 'blue',
      description: `Currently in ${site?.shortName || 'hospital'}`
    },
    {
      title: 'Critical Cases',
      value: criticalCases.toString(),
      change: criticalCases > 5 ? '+2' : '-2',
      trend: criticalCases > 5 ? 'up' : 'down',
      icon: FiAlertTriangle,
      color: 'red',
      description: 'Requiring immediate attention'
    },
    {
      title: 'Stable Patients',
      value: stablePatients.toString(),
      change: '+5',
      trend: 'up',
      icon: FiHeart,
      color: 'green',
      description: 'Recovering well'
    },
    {
      title: 'Avg Length of Stay',
      value: avgLengthOfStay,
      change: '-0.3',
      trend: 'down',
      icon: FiClock,
      color: 'purple',
      description: `${site?.shortName || 'Hospital'} average`
    },
    {
      title: 'Discharges Today',
      value: dischargesToday.toString(),
      change: '+3',
      trend: 'up',
      icon: FiUserCheck,
      color: 'green',
      description: 'Patients sent home'
    },
    {
      title: 'Bed Occupancy',
      value: `${bedOccupancy}%`,
      change: '+2%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'yellow',
      description: `${totalPatients}/${site?.beds || 0} beds used`
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const getBgColor = (color) => {
    const colors = {
      blue: 'bg-blue-600',
      red: 'bg-red-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      yellow: 'bg-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(stat.color)}`}>
              <SafeIcon icon={stat.icon} className="w-6 h-6" />
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </div>
          
          {/* Mini progress bar for bed occupancy */}
          {stat.title === 'Bed Occupancy' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getBgColor(stat.color)}`}
                  style={{ width: stat.value }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PatientStats;