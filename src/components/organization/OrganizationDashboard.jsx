import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import { useOrganization } from '../../contexts/OrganizationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBuilding, FiUsers, FiBed, FiActivity, FiTrendingUp, FiMapPin, 
  FiPhone, FiMail, FiAward, FiBarChart3, FiPieChart 
} = FiIcons;

const OrganizationDashboard = () => {
  const { currentOrganization, getOrganizationStats, getAllBusinessUnits } = useOrganization();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  if (!currentOrganization) return null;

  const stats = getOrganizationStats();
  const businessUnits = getAllBusinessUnits();

  // Sample data for charts
  const facilityPerformanceData = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Patient Volume', 'Bed Occupancy %', 'Satisfaction Score'] },
    xAxis: {
      type: 'category',
      data: businessUnits.map(bu => bu.name.split(' ').pop())
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Patient Volume',
        type: 'bar',
        data: businessUnits.map(() => Math.floor(Math.random() * 500) + 200),
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Bed Occupancy %',
        type: 'line',
        data: businessUnits.map(() => Math.floor(Math.random() * 30) + 70),
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Satisfaction Score',
        type: 'line',
        data: businessUnits.map(() => (Math.random() * 1 + 4).toFixed(1)),
        itemStyle: { color: '#F59E0B' }
      }
    ]
  };

  const capacityDistributionData = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: 'Bed Distribution',
        type: 'pie',
        radius: '70%',
        data: businessUnits.map(bu => ({
          value: bu.capacity.beds,
          name: bu.name
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      }
    ]
  };

  const getBusinessUnitTypeColor = (type) => {
    const colors = {
      acute_care: 'bg-blue-100 text-blue-800 border-blue-200',
      outpatient: 'bg-green-100 text-green-800 border-green-200',
      rehabilitation: 'bg-purple-100 text-purple-800 border-purple-200',
      emergency: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[type] || colors.acute_care;
  };

  const getBusinessUnitTypeIcon = (type) => {
    switch (type) {
      case 'acute_care': return '🏥';
      case 'outpatient': return '🏢';
      case 'rehabilitation': return '♿';
      case 'emergency': return '🚑';
      default: return '🏢';
    }
  };

  return (
    <div className="space-y-6">
      {/* Organization Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={currentOrganization.logo}
              alt={currentOrganization.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentOrganization.name}</h1>
              <p className="text-gray-600 mt-1">{currentOrganization.description}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>Founded {currentOrganization.founded}</span>
                <span>•</span>
                <span>{currentOrganization.headquarters}</span>
                <span>•</span>
                <a 
                  href={currentOrganization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  {currentOrganization.website}
                </a>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{stats.facilities}</div>
            <div className="text-sm text-gray-600">Facilities</div>
          </div>
        </div>
      </motion.div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalBeds.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
              <SafeIcon icon={FiBed} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+5.2%</span>
            <span className="text-sm text-gray-500 ml-1">vs last year</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ICU Beds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalICUBeds}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg border border-red-200 flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+2.1%</span>
            <span className="text-sm text-gray-500 ml-1">vs last year</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operating Rooms</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOperatingRooms}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center">
              <SafeIcon icon={FiBuilding} className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+8.3%</span>
            <span className="text-sm text-gray-500 ml-1">vs last year</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency Beds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalEmergencyBeds}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+12.5%</span>
            <span className="text-sm text-gray-500 ml-1">vs last year</span>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Facility Performance</h3>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="h-80">
            <ReactECharts option={facilityPerformanceData} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bed Capacity Distribution</h3>
          <div className="h-80">
            <ReactECharts option={capacityDistributionData} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Business Units */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Facilities Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessUnits.map((businessUnit, index) => (
            <motion.div
              key={businessUnit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getBusinessUnitTypeIcon(businessUnit.type)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{businessUnit.name}</h4>
                    <p className="text-sm text-gray-600">{businessUnit.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBusinessUnitTypeColor(businessUnit.type)}`}>
                  {businessUnit.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                  <span>{businessUnit.location.address}, {businessUnit.location.city}, {businessUnit.location.state}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                  <span>{businessUnit.contact.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                  <span>{businessUnit.contact.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {businessUnit.capacity.beds > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.beds}</div>
                    <div className="text-xs text-gray-600">Total Beds</div>
                  </div>
                )}
                {businessUnit.capacity.icuBeds > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.icuBeds}</div>
                    <div className="text-xs text-gray-600">ICU Beds</div>
                  </div>
                )}
                {businessUnit.capacity.operatingRooms > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.operatingRooms}</div>
                    <div className="text-xs text-gray-600">OR Rooms</div>
                  </div>
                )}
                {businessUnit.capacity.emergencyBeds > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{businessUnit.capacity.emergencyBeds}</div>
                    <div className="text-xs text-gray-600">ER Beds</div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Specialties</div>
                <div className="flex flex-wrap gap-1">
                  {businessUnit.specialties.slice(0, 4).map((specialty, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                  {businessUnit.specialties.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{businessUnit.specialties.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Accreditations</div>
                <div className="flex flex-wrap gap-1">
                  {businessUnit.accreditations.map((accreditation, i) => (
                    <span key={i} className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      <SafeIcon icon={FiAward} className="w-3 h-3" />
                      <span>{accreditation}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizationDashboard;