import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiShield, FiAlertTriangle, FiCheckCircle, FiClock, FiTrendingUp, 
  FiTrendingDown, FiEye, FiSettings, FiUsers, FiDatabase, FiActivity
} = FiIcons;

const ComplianceMonitoring = () => {
  const [complianceData, setComplianceData] = useState({});
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [alertSeverity, setAlertSeverity] = useState('all');

  const complianceFrameworks = [
    { id: 'hipaa', name: 'HIPAA', fullName: 'Health Insurance Portability and Accountability Act' },
    { id: 'hitech', name: 'HITECH', fullName: 'Health Information Technology for Economic and Clinical Health Act' },
    { id: 'sox', name: 'SOX', fullName: 'Sarbanes-Oxley Act' },
    { id: 'fda', name: 'FDA CFR', fullName: 'FDA Code of Federal Regulations' },
    { id: 'iso27001', name: 'ISO 27001', fullName: 'Information Security Management' },
    { id: 'jcaho', name: 'JCAHO', fullName: 'Joint Commission Standards' }
  ];

  const complianceMetrics = [
    {
      framework: 'HIPAA',
      score: 94.2,
      trend: 'up',
      change: '+2.1%',
      status: 'compliant',
      violations: 3,
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      requirements: 45,
      compliantReqs: 42
    },
    {
      framework: 'HITECH',
      score: 91.8,
      trend: 'up',
      change: '+1.5%',
      status: 'compliant',
      violations: 2,
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: 38,
      compliantReqs: 35
    },
    {
      framework: 'SOX',
      score: 88.5,
      trend: 'down',
      change: '-0.7%',
      status: 'warning',
      violations: 5,
      lastAudit: '2024-01-05',
      nextAudit: '2024-04-05',
      requirements: 32,
      compliantReqs: 28
    },
    {
      framework: 'FDA CFR',
      score: 96.1,
      trend: 'up',
      change: '+3.2%',
      status: 'compliant',
      violations: 1,
      lastAudit: '2024-01-20',
      nextAudit: '2024-06-20',
      requirements: 28,
      compliantReqs: 27
    },
    {
      framework: 'ISO 27001',
      score: 89.3,
      trend: 'up',
      change: '+1.8%',
      status: 'warning',
      violations: 4,
      lastAudit: '2024-01-12',
      nextAudit: '2024-07-12',
      requirements: 35,
      compliantReqs: 31
    },
    {
      framework: 'JCAHO',
      score: 93.7,
      trend: 'up',
      change: '+2.5%',
      status: 'compliant',
      violations: 2,
      lastAudit: '2024-01-18',
      nextAudit: '2024-04-18',
      requirements: 42,
      compliantReqs: 39
    }
  ];

  const recentAlerts = [
    {
      id: 'ALT-001',
      timestamp: '2024-01-20T14:30:00Z',
      severity: 'high',
      framework: 'HIPAA',
      category: 'Data Access',
      title: 'Unauthorized Patient Record Access',
      description: 'Multiple failed attempts to access patient records from external IP',
      status: 'investigating',
      assignedTo: 'Security Team',
      riskScore: 85
    },
    {
      id: 'ALT-002',
      timestamp: '2024-01-20T13:45:00Z',
      severity: 'medium',
      framework: 'SOX',
      category: 'Financial Controls',
      title: 'Segregation of Duties Violation',
      description: 'User performed both authorization and execution of financial transaction',
      status: 'resolved',
      assignedTo: 'Compliance Officer',
      riskScore: 62
    },
    {
      id: 'ALT-003',
      timestamp: '2024-01-20T12:15:00Z',
      severity: 'critical',
      framework: 'FDA CFR',
      category: 'Audit Trail',
      title: 'Missing Audit Trail Entry',
      description: 'Critical system event not recorded in audit trail',
      status: 'open',
      assignedTo: 'IT Security',
      riskScore: 92
    },
    {
      id: 'ALT-004',
      timestamp: '2024-01-20T11:30:00Z',
      severity: 'low',
      framework: 'HITECH',
      category: 'Encryption',
      title: 'Weak Encryption Algorithm Detected',
      description: 'Legacy system using deprecated encryption method',
      status: 'planned',
      assignedTo: 'IT Infrastructure',
      riskScore: 35
    },
    {
      id: 'ALT-005',
      timestamp: '2024-01-20T10:45:00Z',
      severity: 'high',
      framework: 'ISO 27001',
      category: 'Access Control',
      title: 'Privileged Account Misuse',
      description: 'Administrative account used for non-administrative tasks',
      status: 'investigating',
      assignedTo: 'Security Team',
      riskScore: 78
    }
  ];

  // Compliance trend chart
  const complianceTrendChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Overall Score', 'HIPAA', 'SOX', 'FDA CFR', 'ISO 27001']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      min: 80,
      max: 100,
      name: 'Compliance Score (%)'
    },
    series: [
      {
        name: 'Overall Score',
        type: 'line',
        data: [91.2, 91.8, 92.1, 91.9, 92.5, 93.1, 93.8, 94.2, 94.1, 94.5, 94.3, 94.7],
        smooth: true,
        itemStyle: { color: '#3B82F6' },
        lineStyle: { width: 3 }
      },
      {
        name: 'HIPAA',
        type: 'line',
        data: [92.1, 92.5, 92.8, 92.3, 93.1, 93.7, 94.1, 94.2, 94.0, 94.8, 94.5, 94.9],
        smooth: true,
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'SOX',
        type: 'line',
        data: [89.2, 89.8, 88.9, 89.5, 88.7, 89.1, 89.8, 88.5, 88.9, 89.3, 88.8, 89.0],
        smooth: true,
        itemStyle: { color: '#F59E0B' }
      },
      {
        name: 'FDA CFR',
        type: 'line',
        data: [94.8, 95.1, 95.5, 95.2, 95.8, 96.1, 96.3, 96.1, 96.0, 96.4, 96.2, 96.5],
        smooth: true,
        itemStyle: { color: '#8B5CF6' }
      },
      {
        name: 'ISO 27001',
        type: 'line',
        data: [87.5, 88.1, 88.9, 88.3, 89.1, 89.7, 89.3, 89.3, 89.8, 90.1, 89.5, 90.2],
        smooth: true,
        itemStyle: { color: '#EF4444' }
      }
    ]
  };

  // Violation distribution chart
  const violationChart = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Violations by Category',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 12, name: 'Data Access', itemStyle: { color: '#EF4444' } },
          { value: 8, name: 'Authentication', itemStyle: { color: '#F59E0B' } },
          { value: 6, name: 'Audit Trail', itemStyle: { color: '#8B5CF6' } },
          { value: 4, name: 'Encryption', itemStyle: { color: '#3B82F6' } },
          { value: 3, name: 'Access Control', itemStyle: { color: '#10B981' } },
          { value: 2, name: 'Data Retention', itemStyle: { color: '#6B7280' } }
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
      compliant: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      violation: 'bg-red-100 text-red-800 border-red-200',
      investigating: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200',
      open: 'bg-red-100 text-red-800 border-red-200',
      planned: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || colors.warning;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity] || colors.medium;
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-blue-600';
    return 'text-green-600';
  };

  const filteredAlerts = recentAlerts.filter(alert => {
    const matchesFramework = selectedFramework === 'all' || alert.framework.toLowerCase().includes(selectedFramework);
    const matchesSeverity = alertSeverity === 'all' || alert.severity === alertSeverity;
    return matchesFramework && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Compliance</p>
              <p className="text-2xl font-bold text-gray-900">92.4%</p>
            </div>
            <SafeIcon icon={FiShield} className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+1.8%</span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Violations</p>
              <p className="text-2xl font-bold text-gray-900">17</p>
            </div>
            <SafeIcon icon={FiAlertTriangle} className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiTrendingDown} className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">-3</span>
            <span className="text-sm text-gray-500 ml-1">from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <SafeIcon icon={FiAlertTriangle} className="w-8 h-8 text-red-600" />
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">Avg resolution: 2.3 days</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">68/100</p>
            </div>
            <SafeIcon icon={FiActivity} className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Framework Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Framework Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceMetrics.map((metric, index) => (
            <motion.div
              key={metric.framework}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{metric.framework}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Compliance Score</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-gray-900">{metric.score}%</span>
                    <SafeIcon 
                      icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                      className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} 
                    />
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Requirements</span>
                  <span className="text-sm font-medium">{metric.compliantReqs}/{metric.requirements}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Violations</span>
                  <span className={`text-sm font-medium ${metric.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {metric.violations}
                  </span>
                </div>
                
                <div className="pt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${metric.score >= 90 ? 'bg-green-500' : metric.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Next audit: {new Date(metric.nextAudit).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trend</h3>
          <div className="h-80">
            <ReactECharts option={complianceTrendChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* Violation Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Violation Distribution</h3>
          <div className="h-80">
            <ReactECharts option={violationChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Recent Compliance Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Compliance Alerts</h3>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Frameworks</option>
              {complianceFrameworks.map(framework => (
                <option key={framework.id} value={framework.id}>
                  {framework.name}
                </option>
              ))}
            </select>
            
            <select
              value={alertSeverity}
              onChange={(e) => setAlertSeverity(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Framework: {alert.framework}</span>
                      <span>Category: {alert.category}</span>
                      <span>Assigned: {alert.assignedTo}</span>
                      <span>Time: {new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Risk Score</div>
                    <div className={`text-lg font-bold ${getRiskScoreColor(alert.riskScore)}`}>
                      {alert.riskScore}
                    </div>
                  </div>
                  
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No compliance alerts</h3>
            <p className="text-gray-600">All compliance requirements are currently being met</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceMonitoring;