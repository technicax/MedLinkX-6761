import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiEye, FiTrash2, FiSearch, FiFilter, FiCalendar } = FiIcons;

const ReportsHistory = ({ onViewReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { addNotification } = useNotification();

  const reports = [
    {
      id: 1,
      name: 'Monthly Patient Summary - December 2024',
      type: 'patient-summary',
      format: 'PDF',
      size: '2.4 MB',
      generatedBy: 'Dr. Sarah Johnson',
      generatedAt: '2024-01-15T10:30:00Z',
      status: 'completed',
      downloads: 12
    },
    {
      id: 2,
      name: 'Department Performance Q4 2024',
      type: 'department-analytics',
      format: 'Excel',
      size: '1.8 MB',
      generatedBy: 'Admin User',
      generatedAt: '2024-01-14T14:15:00Z',
      status: 'completed',
      downloads: 8
    },
    {
      id: 3,
      name: 'Financial Report - Q4 2024',
      type: 'financial',
      format: 'PDF',
      size: '3.2 MB',
      generatedBy: 'Finance Manager',
      generatedAt: '2024-01-13T09:45:00Z',
      status: 'completed',
      downloads: 15
    },
    {
      id: 4,
      name: 'Staff Performance Analysis',
      type: 'staff-performance',
      format: 'Excel',
      size: '1.5 MB',
      generatedBy: 'HR Manager',
      generatedAt: '2024-01-12T16:20:00Z',
      status: 'completed',
      downloads: 5
    },
    {
      id: 5,
      name: 'Quality Metrics Report - December',
      type: 'quality-metrics',
      format: 'PDF',
      size: '2.1 MB',
      generatedBy: 'Quality Assurance',
      generatedAt: '2024-01-11T11:30:00Z',
      status: 'processing',
      downloads: 0
    }
  ];

  const reportTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'patient-summary', label: 'Patient Summary' },
    { value: 'financial', label: 'Financial' },
    { value: 'staff-performance', label: 'Staff Performance' },
    { value: 'department-analytics', label: 'Department Analytics' },
    { value: 'quality-metrics', label: 'Quality Metrics' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.completed;
  };

  const getTypeColor = (type) => {
    const colors = {
      'patient-summary': 'bg-blue-50 text-blue-700',
      'financial': 'bg-green-50 text-green-700',
      'staff-performance': 'bg-purple-50 text-purple-700',
      'department-analytics': 'bg-orange-50 text-orange-700',
      'quality-metrics': 'bg-pink-50 text-pink-700'
    };
    return colors[type] || colors['patient-summary'];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatType = (type) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const generateReportData = (report) => {
    const baseData = {
      title: report.name,
      generatedBy: report.generatedBy,
      generatedAt: report.generatedAt,
      format: report.format
    };

    switch (report.type) {
      case 'patient-summary':
        return {
          ...baseData,
          data: {
            totalPatients: 1247,
            admissions: 156,
            discharges: 142,
            averageStay: '4.2 days',
            departments: ['Emergency: 335', 'Cardiology: 310', 'ICU: 234']
          }
        };
      case 'financial':
        return {
          ...baseData,
          data: {
            totalRevenue: '$2.4M',
            expenses: '$1.8M',
            netIncome: '$600K',
            departments: ['Surgery: $800K', 'Emergency: $600K', 'ICU: $500K']
          }
        };
      case 'department-analytics':
        return {
          ...baseData,
          data: {
            departments: [
              'Emergency: 89% efficiency',
              'Cardiology: 92% efficiency', 
              'ICU: 87% efficiency'
            ]
          }
        };
      default:
        return {
          ...baseData,
          data: { summary: 'Sample report data for demonstration' }
        };
    }
  };

  const downloadReport = (report) => {
    try {
      const reportData = generateReportData(report);
      
      if (report.format === 'PDF') {
        downloadAsPDF(reportData);
      } else {
        downloadAsCSV(reportData);
      }

      // Update download count
      const updatedReports = reports.map(r => 
        r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r
      );

      addNotification({
        type: 'success',
        title: 'Download Started',
        message: `${report.name} is being downloaded`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Download Failed',
        message: 'Failed to download report. Please try again.'
      });
    }
  };

  const downloadAsPDF = (data) => {
    let content = `${data.title}\n`;
    content += `Generated by: ${data.generatedBy}\n`;
    content += `Date: ${new Date(data.generatedAt).toLocaleString()}\n`;
    content += `\n--- REPORT CONTENT ---\n\n`;
    
    if (data.data.departments) {
      content += `Departments:\n${data.data.departments.join('\n')}\n\n`;
    }
    
    Object.entries(data.data).forEach(([key, value]) => {
      if (key !== 'departments') {
        content += `${key}: ${value}\n`;
      }
    });

    content += `\n\nThis is a sample report generated by MedLinkX Hospital Communication System.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadAsCSV = (data) => {
    let csvContent = `Report Title,${data.title}\n`;
    csvContent += `Generated By,${data.generatedBy}\n`;
    csvContent += `Date,${new Date(data.generatedAt).toLocaleString()}\n\n`;
    csvContent += `Metric,Value\n`;
    
    Object.entries(data.data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => csvContent += `${key},${item}\n`);
      } else {
        csvContent += `${key},${value}\n`;
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = (report) => {
    addNotification({
      type: 'success',
      title: 'Report Deleted',
      message: `${report.name} has been deleted`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Report History</h2>
        <div className="text-sm text-gray-500">
          {filteredReports.length} of {reports.length} reports
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {reportTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Report Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Generated By</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-500">{report.format} • {report.downloads} downloads</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(report.type)}`}>
                      {formatType(report.type)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {report.generatedBy}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                      <span>{formatDate(report.generatedAt)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {report.size}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewReport(report)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Report"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </motion.button>
                      {report.status === 'completed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => downloadReport(report)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download Report"
                        >
                          <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(report)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Report"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsHistory;