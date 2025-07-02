import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiTrendingUp, FiTrendingDown, FiCalendar, FiFilter,
  FiUsers, FiActivity, FiClock, FiTarget, FiHeart
} = FiIcons;

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('patients');

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Patient Flow Analytics
  const patientFlowChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Admissions', 'Discharges', 'Emergency Cases', 'Transfers']
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Admissions',
        type: 'line',
        data: [12, 8, 15, 25, 32, 28, 18],
        smooth: true,
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Discharges',
        type: 'line',
        data: [8, 6, 12, 20, 28, 25, 15],
        smooth: true,
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Emergency Cases',
        type: 'line',
        data: [5, 3, 8, 12, 15, 18, 10],
        smooth: true,
        itemStyle: { color: '#EF4444' }
      },
      {
        name: 'Transfers',
        type: 'line',
        data: [2, 1, 3, 5, 8, 6, 4],
        smooth: true,
        itemStyle: { color: '#F59E0B' }
      }
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  };

  // Department Performance Chart
  const departmentChart = {
    tooltip: { trigger: 'item' },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Patient Volume',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1235, name: 'Emergency' },
          { value: 892, name: 'Cardiology' },
          { value: 456, name: 'ICU' },
          { value: 678, name: 'Surgery' },
          { value: 234, name: 'Pediatrics' },
          { value: 345, name: 'Neurology' }
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

  // Wait Time Trends
  const waitTimeChart = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value', name: 'Minutes' },
    series: [
      {
        name: 'Average Wait Time',
        type: 'bar',
        data: [25, 32, 18, 45, 38, 22, 15],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }
    ]
  };

  // Resource Utilization
  const resourceChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Beds', 'Staff', 'Equipment'] },
    xAxis: {
      type: 'category',
      data: ['ED', 'ICU', 'Surgery', 'Cardiology', 'Neurology', 'Pediatrics']
    },
    yAxis: { type: 'value', max: 100, name: 'Utilization %' },
    series: [
      {
        name: 'Beds',
        type: 'bar',
        data: [89, 94, 82, 76, 68, 71],
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Staff',
        type: 'bar',
        data: [95, 87, 91, 78, 82, 85],
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Equipment',
        type: 'bar',
        data: [78, 92, 88, 85, 75, 80],
        itemStyle: { color: '#F59E0B' }
      }
    ]
  };

  const analyticsCards = [
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: FiHeart,
      color: 'green'
    },
    {
      title: 'Avg Length of Stay',
      value: '3.2 days',
      change: '-0.5',
      trend: 'down',
      icon: FiClock,
      color: 'blue'
    },
    {
      title: 'Readmission Rate',
      value: '8.4%',
      change: '-1.2%',
      trend: 'down',
      icon: FiActivity,
      color: 'green'
    },
    {
      title: 'Staff Efficiency',
      value: '87%',
      change: '+3%',
      trend: 'up',
      icon: FiUsers,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      red: 'bg-red-50 text-red-600 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
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
                icon={card.trend === 'up' ? FiTrendingUp : FiTrendingDown}
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
        {/* Patient Flow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Flow Analysis</h3>
          <div className="h-80">
            <ReactECharts option={patientFlowChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <div className="h-80">
            <ReactECharts option={departmentChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Wait Time Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Wait Times</h3>
          <div className="h-80">
            <ReactECharts option={waitTimeChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Resource Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h3>
          <div className="h-80">
            <ReactECharts option={resourceChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-900">Peak Hours</h4>
            <p className="text-sm text-blue-700 mt-1">
              Emergency admissions peak between 4 PM - 8 PM. Consider staffing adjustments.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <SafeIcon icon={FiTarget} className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-green-900">Efficiency Gains</h4>
            <p className="text-sm text-green-700 mt-1">
              Surgery department shows 15% improvement in turnover time this quarter.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <SafeIcon icon={FiClock} className="w-6 h-6 text-yellow-600 mb-2" />
            <h4 className="font-medium text-yellow-900">Wait Time Alert</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Cardiology wait times increased 20%. Review scheduling protocols.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;