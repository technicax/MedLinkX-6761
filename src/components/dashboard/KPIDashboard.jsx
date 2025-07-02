import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiTarget, FiTrendingUp, FiTrendingDown, FiActivity,
  FiHeart, FiClock, FiUsers, FiDollarSign, FiShield,
  FiCheckCircle, FiAlertTriangle, FiBarChart3
} = FiIcons;

const KPIDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('operational');

  const categories = [
    { id: 'operational', label: 'Operational KPIs', icon: FiActivity },
    { id: 'clinical', label: 'Clinical KPIs', icon: FiHeart },
    { id: 'financial', label: 'Financial KPIs', icon: FiDollarSign },
    { id: 'safety', label: 'Safety KPIs', icon: FiShield }
  ];

  const operationalKPIs = [
    {
      title: 'Bed Occupancy Rate',
      current: 87,
      target: 85,
      unit: '%',
      trend: 'up',
      change: '+2%',
      status: 'warning',
      description: 'Current bed utilization across all departments'
    },
    {
      title: 'Average Length of Stay',
      current: 3.2,
      target: 3.5,
      unit: 'days',
      trend: 'down',
      change: '-0.3',
      status: 'good',
      description: 'Mean duration patients stay in the hospital'
    },
    {
      title: 'Emergency Response Time',
      current: 8,
      target: 10,
      unit: 'min',
      trend: 'down',
      change: '-1.2',
      status: 'good',
      description: 'Time from arrival to initial assessment'
    },
    {
      title: 'Staff Utilization',
      current: 92,
      target: 90,
      unit: '%',
      trend: 'up',
      change: '+3%',
      status: 'warning',
      description: 'Percentage of staff actively engaged'
    }
  ];

  const clinicalKPIs = [
    {
      title: 'Patient Satisfaction Score',
      current: 4.8,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      change: '+0.2',
      status: 'excellent',
      description: 'Average patient satisfaction rating'
    },
    {
      title: 'Readmission Rate',
      current: 8.4,
      target: 10,
      unit: '%',
      trend: 'down',
      change: '-1.6%',
      status: 'good',
      description: '30-day readmission rate'
    },
    {
      title: 'Mortality Rate',
      current: 2.1,
      target: 2.5,
      unit: '%',
      trend: 'down',
      change: '-0.3%',
      status: 'good',
      description: 'Hospital standardized mortality ratio'
    },
    {
      title: 'Infection Control',
      current: 1.2,
      target: 2.0,
      unit: '%',
      trend: 'down',
      change: '-0.8%',
      status: 'excellent',
      description: 'Hospital-acquired infection rate'
    }
  ];

  const financialKPIs = [
    {
      title: 'Revenue per Patient',
      current: 12500,
      target: 12000,
      unit: '$',
      trend: 'up',
      change: '+4.2%',
      status: 'good',
      description: 'Average revenue generated per patient'
    },
    {
      title: 'Cost per Discharge',
      current: 8900,
      target: 9200,
      unit: '$',
      trend: 'down',
      change: '-3.3%',
      status: 'good',
      description: 'Average cost per patient discharge'
    },
    {
      title: 'Operating Margin',
      current: 15.2,
      target: 12.0,
      unit: '%',
      trend: 'up',
      change: '+2.1%',
      status: 'excellent',
      description: 'Operating profit margin percentage'
    },
    {
      title: 'Collection Rate',
      current: 94.5,
      target: 95.0,
      unit: '%',
      trend: 'down',
      change: '-0.5%',
      status: 'warning',
      description: 'Percentage of billed amounts collected'
    }
  ];

  const safetyKPIs = [
    {
      title: 'Patient Falls',
      current: 0.8,
      target: 1.0,
      unit: 'per 1000 days',
      trend: 'down',
      change: '-20%',
      status: 'good',
      description: 'Patient falls per 1000 patient days'
    },
    {
      title: 'Medication Errors',
      current: 2.1,
      target: 3.0,
      unit: 'per 1000 doses',
      trend: 'down',
      change: '-30%',
      status: 'good',
      description: 'Medication errors per 1000 doses'
    },
    {
      title: 'Staff Injuries',
      current: 3.2,
      target: 4.0,
      unit: 'per 100 FTE',
      trend: 'down',
      change: '-20%',
      status: 'good',
      description: 'Staff injuries per 100 full-time employees'
    },
    {
      title: 'Compliance Score',
      current: 98.5,
      target: 95.0,
      unit: '%',
      trend: 'up',
      change: '+1.5%',
      status: 'excellent',
      description: 'Regulatory compliance percentage'
    }
  ];

  const getCurrentKPIs = () => {
    switch (selectedCategory) {
      case 'clinical': return clinicalKPIs;
      case 'financial': return financialKPIs;
      case 'safety': return safetyKPIs;
      default: return operationalKPIs;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-blue-100 text-blue-800 border-blue-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.good;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return FiCheckCircle;
      case 'good': return FiTarget;
      case 'warning': return FiAlertTriangle;
      case 'critical': return FiAlertTriangle;
      default: return FiTarget;
    }
  };

  // KPI Trend Chart
  const kpiTrendChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Current', 'Target', 'Previous Period'] },
    xAxis: {
      type: 'category',
      data: getCurrentKPIs().map(kpi => kpi.title.split(' ')[0])
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Current',
        type: 'bar',
        data: getCurrentKPIs().map(kpi => kpi.current),
        itemStyle: { color: '#3B82F6' }
      },
      {
        name: 'Target',
        type: 'line',
        data: getCurrentKPIs().map(kpi => kpi.target),
        itemStyle: { color: '#EF4444' },
        lineStyle: { type: 'dashed' }
      }
    ]
  };

  // Performance Gauge for selected KPI
  const performanceGauge = {
    series: [
      {
        name: 'Performance',
        type: 'gauge',
        progress: { show: true },
        detail: { valueAnimation: true, formatter: '{value}%' },
        data: [{ value: 87, name: 'Overall Performance' }],
        color: ['#3B82F6']
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Key Performance Indicators</h2>
        <div className="text-sm text-gray-500">
          Updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Category Selector */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <SafeIcon icon={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getCurrentKPIs().map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={getStatusIcon(kpi.status)} className={`w-5 h-5 ${
                  kpi.status === 'excellent' ? 'text-green-600' :
                  kpi.status === 'good' ? 'text-blue-600' :
                  kpi.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`} />
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(kpi.status)}`}>
                  {kpi.status.toUpperCase()}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-600 mb-2">{kpi.title}</h3>
            
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {typeof kpi.current === 'number' && kpi.current > 1000 
                  ? kpi.current.toLocaleString() 
                  : kpi.current}
              </span>
              <span className="text-sm text-gray-500">{kpi.unit}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-500">
                Target: {typeof kpi.target === 'number' && kpi.target > 1000 
                  ? kpi.target.toLocaleString() 
                  : kpi.target}{kpi.unit}
              </div>
              <div className="flex items-center">
                <SafeIcon
                  icon={kpi.trend === 'up' ? FiTrendingUp : FiTrendingDown}
                  className={`w-4 h-4 mr-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                />
                <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full ${
                  kpi.current >= kpi.target ? 'bg-green-500' : 
                  kpi.current >= kpi.target * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ 
                  width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` 
                }}
              ></div>
            </div>

            <p className="text-xs text-gray-500">{kpi.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Trends */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI Trends vs Targets</h3>
            <div className="h-80">
              <ReactECharts option={kpiTrendChart} style={{ height: '100%', width: '100%' }} />
            </div>
          </motion.div>
        </div>

        {/* Performance Gauge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
          <div className="h-80">
            <ReactECharts option={performanceGauge} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items & Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Bed Occupancy Above Target</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Current occupancy is 87%, exceeding the target of 85%. Consider discharge planning optimization.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Excellent Patient Satisfaction</h4>
              <p className="text-sm text-green-700 mt-1">
                Patient satisfaction score of 4.8/5 exceeds target. Continue current practices.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <SafeIcon icon={FiTarget} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Response Time Improvement</h4>
              <p className="text-sm text-blue-700 mt-1">
                Emergency response time improved by 1.2 minutes. Focus on maintaining this trend.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KPIDashboard;