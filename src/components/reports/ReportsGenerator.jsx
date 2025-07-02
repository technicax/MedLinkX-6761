import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiDownload, FiFilter, FiFileText, FiBarChart3 } = FiIcons;

const ReportsGenerator = () => {
  const [reportType, setReportType] = useState('patient-summary');
  const [dateRange, setDateRange] = useState('last-month');
  const [department, setDepartment] = useState('all');
  const [format, setFormat] = useState('pdf');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const reportTypes = [
    {
      value: 'patient-summary',
      label: 'Patient Summary Report',
      description: 'Comprehensive overview of patient admissions, discharges, and demographics',
      icon: FiFileText
    },
    {
      value: 'financial',
      label: 'Financial Report',
      description: 'Revenue, expenses, and billing analysis',
      icon: FiBarChart3
    },
    {
      value: 'staff-performance',
      label: 'Staff Performance Report',
      description: 'Staff productivity, schedules, and performance metrics',
      icon: FiFileText
    },
    {
      value: 'department-analytics',
      label: 'Department Analytics',
      description: 'Department-wise patient flow and resource utilization',
      icon: FiBarChart3
    },
    {
      value: 'quality-metrics',
      label: 'Quality Metrics Report',
      description: 'Patient satisfaction, readmission rates, and quality indicators',
      icon: FiFileText
    },
    {
      value: 'inventory',
      label: 'Inventory Report',
      description: 'Medical supplies, equipment, and medication inventory',
      icon: FiFileText
    }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-week', label: 'Last 7 Days' },
    { value: 'last-month', label: 'Last 30 Days' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF Document', icon: FiFileText },
    { value: 'excel', label: 'Excel Spreadsheet', icon: FiFileText },
    { value: 'csv', label: 'CSV File', icon: FiFileText }
  ];

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      addNotification({
        type: 'success',
        title: 'Report Generated Successfully',
        message: 'Your report has been generated and is ready for download'
      });

      // Reset form
      setReportType('patient-summary');
      setDateRange('last-month');
      setDepartment('all');
      setFormat('pdf');
      setCustomStartDate('');
      setCustomEndDate('');
      
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Generation Failed',
        message: 'Failed to generate report. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedReportType = reportTypes.find(type => type.value === reportType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Generate New Report</h2>
        <p className="text-gray-600">Create custom reports based on your specific requirements</p>
      </div>

      <form onSubmit={handleGenerateReport} className="space-y-6">
        {/* Report Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Report Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <motion.div
                key={type.value}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  reportType === type.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setReportType(type.value)}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="reportType"
                    value={type.value}
                    checked={reportType === type.value}
                    onChange={(e) => setReportType(e.target.value)}
                    className="mt-1"
                  />
                  <SafeIcon icon={type.icon} className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">{type.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range *
            </label>
            <div className="relative">
              <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format *
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {formats.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Date Range */}
        {dateRange === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        )}

        {/* Report Preview */}
        {selectedReportType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <h3 className="font-medium text-blue-900 mb-2">Report Preview</h3>
            <p className="text-blue-800 text-sm">{selectedReportType.description}</p>
            <div className="mt-3 text-sm text-blue-700">
              <p><strong>Date Range:</strong> {dateRanges.find(r => r.value === dateRange)?.label}</p>
              <p><strong>Department:</strong> {departments.find(d => d.value === department)?.label}</p>
              <p><strong>Format:</strong> {formats.find(f => f.value === format)?.label}</p>
            </div>
          </motion.div>
        )}

        {/* Generate Button */}
        <div className="flex items-center justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Report'
              )}
            </span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ReportsGenerator;