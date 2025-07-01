import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiUsers, FiActivity } = FiIcons;

const ReportsDashboard = () => {
  const metrics = [
    {
      title: 'Patient Admissions',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Average Length of Stay',
      value: '4.2 days',
      change: '-8%',
      trend: 'down',
      icon: FiActivity,
      color: 'green'
    },
    {
      title: 'Bed Occupancy Rate',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'yellow'
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: '+3%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'purple'
    }
  ];

  const admissionsChart = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Admissions', 'Discharges']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Admissions',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        smooth: true,
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Discharges',
        type: 'line',
        data: [110, 125, 95, 128, 85, 220, 200, 175, 185, 225, 280, 320],
        smooth: true,
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  const departmentChart = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Patients by Department',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: 'Emergency' },
          { value: 310, name: 'Cardiology' },
          { value: 234, name: 'Neurology' },
          { value: 135, name: 'Orthopedics' },
          { value: 148, name: 'Pediatrics' }
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

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(metric.color)}`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <SafeIcon 
                icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                className={`w-4 h-4 mr-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} 
              />
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Flow Trends</h3>
          <div className="h-64">
            <ReactECharts option={admissionsChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patients by Department</h3>
          <div className="h-64">
            <ReactECharts option={departmentChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Monthly Patient Summary', generated: '2 hours ago', type: 'PDF' },
            { name: 'Department Performance', generated: '1 day ago', type: 'Excel' },
            { name: 'Financial Report Q4', generated: '3 days ago', type: 'PDF' },
            { name: 'Staff Utilization Report', generated: '5 days ago', type: 'Excel' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <p className="text-sm text-gray-600">Generated {report.generated}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {report.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsDashboard;