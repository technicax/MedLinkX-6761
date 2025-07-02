import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUsers, FiClock, FiActivity, FiHeart, FiTrendingUp,
  FiBarChart3, FiPieChart, FiTarget, FiAward, FiCalendar
} = FiIcons;

const PerformanceMetrics = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timeFrame, setTimeFrame] = useState('monthly');

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'icu', label: 'ICU' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'laboratory', label: 'Laboratory' }
  ];

  // Department Performance Comparison
  const departmentPerformanceChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Patient Volume', 'Satisfaction', 'Efficiency'] },
    radar: {
      indicator: [
        { name: 'Emergency', max: 100 },
        { name: 'Cardiology', max: 100 },
        { name: 'ICU', max: 100 },
        { name: 'Surgery', max: 100 },
        { name: 'Laboratory', max: 100 },
        { name: 'Pharmacy', max: 100 }
      ]
    },
    series: [
      {
        name: 'Performance Metrics',
        type: 'radar',
        data: [
          {
            value: [95, 88, 92, 85, 90, 87],
            name: 'Patient Volume',
            itemStyle: { color: '#3B82F6' }
          },
          {
            value: [85, 92, 88, 90, 82, 89],
            name: 'Satisfaction',
            itemStyle: { color: '#10B981' }
          },
          {
            value: [88, 85, 95, 92, 87, 91],
            name: 'Efficiency',
            itemStyle: { color: '#F59E0B' }
          }
        ]
      }
    ]
  };

  // Staff Performance Trends
  const staffPerformanceChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Productivity', 'Quality Score', 'Patient Feedback'] },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: { type: 'value', max: 100 },
    series: [
      {
        name: 'Productivity',
        type: 'line',
        data: [85, 87, 89, 91, 88, 92],
        smooth: true,
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Quality Score',
        type: 'line',
        data: [88, 90, 87, 93, 91, 94],
        smooth: true,
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Patient Feedback',
        type: 'line',
        data: [82, 85, 88, 86, 89, 91],
        smooth: true,
        itemStyle: { color: '#8B5CF6' }
      }
    ]
  };

  // Operational Efficiency
  const efficiencyChart = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Efficiency Metrics',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: 'Optimal', itemStyle: { color: '#10B981' } },
          { value: 45, name: 'Good', itemStyle: { color: '#3B82F6' } },
          { value: 15, name: 'Needs Improvement', itemStyle: { color: '#F59E0B' } },
          { value: 5, name: 'Critical', itemStyle: { color: '#EF4444' } }
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

  // Resource Utilization Heatmap
  const resourceHeatmapChart = {
    tooltip: { position: 'top' },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: ['Emergency', 'ICU', 'Surgery', 'Cardiology', 'Laboratory'],
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    series: [
      {
        name: 'Utilization %',
        type: 'heatmap',
        data: [
          [0, 0, 89], [0, 1, 94], [0, 2, 82], [0, 3, 76], [0, 4, 88],
          [1, 0, 92], [1, 1, 87], [1, 2, 85], [1, 3, 79], [1, 4, 91],
          [2, 0, 87], [2, 1, 91], [2, 2, 88], [2, 3, 82], [2, 4, 86],
          [3, 0, 91], [3, 1, 89], [3, 2, 90], [3, 3, 85], [3, 4, 89],
          [4, 0, 88], [4, 1, 92], [4, 2, 87], [4, 3, 81], [4, 4, 90],
          [5, 0, 85], [5, 1, 88], [5, 2, 84], [5, 3, 78], [5, 4, 87],
          [6, 0, 82], [6, 1, 86], [6, 2, 81], [6, 3, 75], [6, 4, 84]
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const performanceCards = [
    {
      title: 'Overall Efficiency',
      value: '89%',
      change: '+3%',
      trend: 'up',
      icon: FiTarget,
      color: 'blue'
    },
    {
      title: 'Patient Throughput',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: FiUsers,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '8.2 min',
      change: '-1.3',
      trend: 'down',
      icon: FiClock,
      color: 'purple'
    },
    {
      title: 'Quality Score',
      value: '94.5',
      change: '+2.1',
      trend: 'up',
      icon: FiAward,
      color: 'yellow'
    }
  ];

  const topPerformers = [
    { name: 'Dr. Sarah Johnson', department: 'Emergency', score: 97, improvement: '+5%' },
    { name: 'Dr. Michael Brown', department: 'Cardiology', score: 95, improvement: '+3%' },
    { name: 'Mary Smith', department: 'ICU', score: 94, improvement: '+7%' },
    { name: 'Dr. Lisa Chen', department: 'Neurology', score: 93, improvement: '+2%' },
    { name: 'John Wilson', department: 'Laboratory', score: 91, improvement: '+4%' }
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

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(card.color)}`}>
                <SafeIcon icon={card.icon} className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <SafeIcon
                icon={card.trend === 'up' ? FiTrendingUp : FiTrendingUp}
                className={`w-4 h-4 mr-1 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
              />
              <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {card.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Comparison</h3>
          <div className="h-80">
            <ReactECharts option={departmentPerformanceChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Staff Performance Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Performance Trends</h3>
          <div className="h-80">
            <ReactECharts option={staffPerformanceChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Operational Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Efficiency Distribution</h3>
          <div className="h-80">
            <ReactECharts option={efficiencyChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Resource Utilization Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization Heatmap</h3>
          <div className="h-80">
            <ReactECharts option={resourceHeatmapChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Top Performers and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers This Month</h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{performer.score}</p>
                  <p className="text-sm text-green-600">{performer.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-600 mb-2" />
              <h4 className="font-medium text-green-900 text-sm">Efficiency Up</h4>
              <p className="text-xs text-green-700 mt-1">
                Overall efficiency improved by 3% this month
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="font-medium text-blue-900 text-sm">Staff Excellence</h4>
              <p className="text-xs text-blue-700 mt-1">
                94% of staff exceed performance targets
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-yellow-600 mb-2" />
              <h4 className="font-medium text-yellow-900 text-sm">Focus Area</h4>
              <p className="text-xs text-yellow-700 mt-1">
                Laboratory response time needs attention
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;