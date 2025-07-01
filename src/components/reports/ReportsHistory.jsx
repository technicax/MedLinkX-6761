import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiEye, FiTrash2, FiSearch, FiFilter, FiCalendar } = FiIcons;

const ReportsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Report"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </motion.button>
                      
                      {report.status === 'completed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download Report"
                        >
                          <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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