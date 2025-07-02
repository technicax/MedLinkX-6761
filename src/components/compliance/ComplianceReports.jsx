import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiFileText, FiDownload, FiCalendar, FiFilter, FiEye, FiShare2,
  FiBarChart3, FiTrendingUp, FiShield, FiAlertTriangle, FiClock,
  FiUsers, FiDatabase, FiSettings, FiX
} = FiIcons;

const ComplianceReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('summary');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [dateRange, setDateRange] = useState('monthly');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { addNotification } = useNotification();

  const reportTypes = [
    { id: 'summary', label: 'Executive Summary', description: 'High-level compliance overview' },
    { id: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive compliance analysis' },
    { id: 'audit', label: 'Audit Trail Report', description: 'Detailed audit log analysis' },
    { id: 'violation', label: 'Violation Report', description: 'Compliance violations and remediation' },
    { id: 'risk', label: 'Risk Assessment', description: 'Risk analysis and mitigation strategies' },
    { id: 'training', label: 'Training Report', description: 'Staff compliance training status' }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      title: 'HIPAA Compliance Summary - Q4 2024',
      type: 'Executive Summary',
      framework: 'HIPAA',
      generatedBy: 'Compliance Officer',
      generatedAt: '2024-01-20T10:30:00Z',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed',
      recipients: ['CEO', 'CTO', 'Compliance Team'],
      findings: {
        score: 94.2,
        violations: 3,
        resolved: 15,
        pending: 2
      }
    },
    {
      id: 'RPT-002',
      title: 'SOX Controls Assessment - December 2024',
      type: 'Detailed Analysis',
      framework: 'SOX',
      generatedBy: 'Internal Auditor',
      generatedAt: '2024-01-18T14:15:00Z',
      size: '5.8 MB',
      format: 'PDF',
      status: 'completed',
      recipients: ['CFO', 'Board of Directors', 'External Auditors'],
      findings: {
        score: 88.5,
        violations: 5,
        resolved: 8,
        pending: 3
      }
    },
    {
      id: 'RPT-003',
      title: 'FDA CFR Part 11 Validation Report',
      type: 'Audit Trail Report',
      framework: 'FDA CFR',
      generatedBy: 'QA Manager',
      generatedAt: '2024-01-15T09:45:00Z',
      size: '3.2 MB',
      format: 'PDF',
      status: 'completed',
      recipients: ['Quality Assurance', 'Regulatory Affairs'],
      findings: {
        score: 96.1,
        violations: 1,
        resolved: 12,
        pending: 1
      }
    },
    {
      id: 'RPT-004',
      title: 'Security Incident Analysis - January 2024',
      type: 'Violation Report',
      framework: 'ISO 27001',
      generatedBy: 'Security Team',
      generatedAt: '2024-01-12T16:20:00Z',
      size: '4.1 MB',
      format: 'PDF',
      status: 'completed',
      recipients: ['CISO', 'IT Management', 'Compliance Team'],
      findings: {
        score: 89.3,
        violations: 4,
        resolved: 6,
        pending: 2
      }
    },
    {
      id: 'RPT-005',
      title: 'Compliance Training Effectiveness Report',
      type: 'Training Report',
      framework: 'All Frameworks',
      generatedBy: 'HR Director',
      generatedAt: '2024-01-10T11:30:00Z',
      size: '1.9 MB',
      format: 'Excel',
      status: 'completed',
      recipients: ['HR Team', 'Department Heads'],
      findings: {
        score: 91.7,
        violations: 0,
        resolved: 20,
        pending: 0
      }
    }
  ];

  // Compliance score trend chart
  const complianceScoreChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['HIPAA', 'SOX', 'FDA CFR', 'ISO 27001', 'Overall']
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: {
      type: 'value',
      min: 80,
      max: 100,
      name: 'Compliance Score (%)'
    },
    series: [
      {
        name: 'HIPAA',
        type: 'line',
        data: [91.2, 92.8, 93.5, 94.2],
        smooth: true,
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'SOX',
        type: 'line',
        data: [86.5, 87.8, 88.1, 88.5],
        smooth: true,
        itemStyle: { color: '#F59E0B' }
      },
      {
        name: 'FDA CFR',
        type: 'line',
        data: [94.8, 95.2, 95.8, 96.1],
        smooth: true,
        itemStyle: { color: '#8B5CF6' }
      },
      {
        name: 'ISO 27001',
        type: 'line',
        data: [87.2, 88.5, 89.1, 89.3],
        smooth: true,
        itemStyle: { color: '#EF4444' }
      },
      {
        name: 'Overall',
        type: 'line',
        data: [89.9, 91.1, 91.6, 92.0],
        smooth: true,
        itemStyle: { color: '#3B82F6' },
        lineStyle: { width: 3 }
      }
    ]
  };

  // Violation trend chart
  const violationTrendChart = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['New Violations', 'Resolved', 'Pending']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      name: 'Count'
    },
    series: [
      {
        name: 'New Violations',
        type: 'bar',
        data: [8, 12, 6, 15, 9, 11, 7, 13, 10, 8, 14, 9],
        itemStyle: { color: '#EF4444' }
      },
      {
        name: 'Resolved',
        type: 'bar',
        data: [6, 10, 5, 12, 8, 9, 6, 11, 8, 7, 12, 8],
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Pending',
        type: 'line',
        data: [2, 4, 5, 8, 9, 11, 12, 14, 16, 17, 19, 20],
        itemStyle: { color: '#F59E0B' }
      }
    ]
  };

  const handleGenerateReport = (reportConfig) => {
    addNotification({
      type: 'success',
      title: 'Report Generation Started',
      message: 'Your compliance report is being generated and will be available shortly.'
    });
    setShowGenerateModal(false);
  };

  const handleDownloadReport = (report) => {
    addNotification({
      type: 'info',
      title: 'Download Started',
      message: `Downloading ${report.title}`
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      generating: 'bg-blue-100 text-blue-800 border-blue-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || colors.pending;
  };

  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const GenerateReportModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Generate Compliance Report</h3>
          <button 
            onClick={() => setShowGenerateModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Report Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedReportType === type.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReportType(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="reportType"
                      value={type.id}
                      checked={selectedReportType === type.id}
                      onChange={(e) => setSelectedReportType(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{type.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Framework
              </label>
              <select 
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Frameworks</option>
                <option value="hipaa">HIPAA</option>
                <option value="sox">SOX</option>
                <option value="fda">FDA CFR</option>
                <option value="iso27001">ISO 27001</option>
                <option value="hitech">HITECH</option>
                <option value="jcaho">JCAHO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Last 7 Days</option>
                <option value="monthly">Last 30 Days</option>
                <option value="quarterly">Last Quarter</option>
                <option value="yearly">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV Data File</option>
                <option value="html">HTML Report</option>
              </select>
            </div>
          </div>

          {/* Report Sections */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Include Sections
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Executive Summary',
                'Compliance Scores',
                'Violation Analysis',
                'Risk Assessment',
                'Audit Trail',
                'Recommendations',
                'Trend Analysis',
                'Training Status'
              ].map((section) => (
                <label key={section} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{section}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Recipients
            </label>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter email addresses (comma separated)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2">
                {['CEO', 'CTO', 'Compliance Officer', 'Legal Team'].map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleGenerateReport({
                  type: selectedReportType,
                  framework: selectedFramework,
                  dateRange: dateRange
                });
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Report
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  const ReportDetailModal = ({ report, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Information */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Report Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Report ID:</span>
                  <span className="font-mono">{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span>{report.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span>{report.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Framework:</span>
                  <span>{report.framework}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Generated By:</span>
                  <span>{report.generatedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Generated:</span>
                  <span>{new Date(report.generatedAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span>{report.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recipients</h4>
              <div className="space-y-1">
                {report.recipients.map((recipient, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {recipient}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Findings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Compliance Score</div>
                  <div className={`text-lg font-bold ${getScoreColor(report.findings.score)}`}>
                    {report.findings.score}%
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Active Violations</div>
                  <div className="text-lg font-bold text-red-600">
                    {report.findings.violations}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Resolved Issues</div>
                  <div className="text-lg font-bold text-green-600">
                    {report.findings.resolved}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Pending Actions</div>
                  <div className="text-lg font-bold text-yellow-600">
                    {report.findings.pending}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Report Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleDownloadReport(report)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  <span>Share Report</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  <span>View in Browser</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Generate Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Compliance Reports</h2>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiFileText} className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Report Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Score Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Score Trends</h3>
          <div className="h-80">
            <ReactECharts option={complianceScoreChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* Violation Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Violation Trends</h3>
          <div className="h-80">
            <ReactECharts option={violationTrendChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="summary">Executive Summary</option>
              <option value="detailed">Detailed Analysis</option>
              <option value="audit">Audit Trail</option>
              <option value="violation">Violation Report</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Report</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Framework</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Generated</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-600">{report.id} • {report.size}</div>
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{report.type}</span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {report.framework}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      by {report.generatedBy}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getScoreColor(report.findings.score)}`}>
                      {report.findings.score}%
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Report"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      </button>
                      
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Share Report"
                      >
                        <SafeIcon icon={FiShare2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showGenerateModal && <GenerateReportModal />}
        {selectedReport && (
          <ReportDetailModal 
            report={selectedReport} 
            onClose={() => setSelectedReport(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComplianceReports;