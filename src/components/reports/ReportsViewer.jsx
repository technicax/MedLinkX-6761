import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiDownload, FiPrinter, FiShare2, FiZoomIn, FiZoomOut, FiMaximize2 } = FiIcons;

const ReportsViewer = ({ report, onBack }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { addNotification } = useNotification();

  if (!report) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Report Selected</h3>
        <p className="text-gray-600">Select a report from the history to view it here</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back to History
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    addNotification({
      type: 'success',
      title: 'Download Started',
      message: `${report.name} is being downloaded`
    });
  };

  const handlePrint = () => {
    window.print();
    addNotification({
      type: 'info',
      title: 'Print Dialog Opened',
      message: 'Report is ready for printing'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: report.name,
        text: `Report: ${report.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addNotification({
        type: 'success',
        title: 'Link Copied',
        message: 'Report link copied to clipboard'
      });
    }
  };

  // Sample chart data based on report type
  const getChartData = () => {
    switch (report.type) {
      case 'patient-summary':
        return {
          title: { text: 'Patient Summary Report', left: 'center' },
          tooltip: { trigger: 'axis' },
          legend: { data: ['Admissions', 'Discharges'], bottom: 10 },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: { type: 'value' },
          series: [
            {
              name: 'Admissions',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230],
              smooth: true,
              itemStyle: { color: '#3B82F6' }
            },
            {
              name: 'Discharges',
              type: 'line',
              data: [110, 125, 95, 128, 85, 220],
              smooth: true,
              itemStyle: { color: '#10B981' }
            }
          ]
        };
      case 'financial':
        return {
          title: { text: 'Financial Performance', left: 'center' },
          tooltip: { trigger: 'item' },
          series: [{
            name: 'Revenue Sources',
            type: 'pie',
            radius: '70%',
            data: [
              { value: 1048, name: 'Patient Services' },
              { value: 735, name: 'Insurance Claims' },
              { value: 580, name: 'Government Funding' },
              { value: 484, name: 'Other Revenue' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
      default:
        return {
          title: { text: 'Department Performance', left: 'center' },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: ['Emergency', 'Cardiology', 'ICU', 'Surgery', 'Laboratory']
          },
          yAxis: { type: 'value' },
          series: [{
            name: 'Performance Score',
            type: 'bar',
            data: [85, 92, 88, 90, 87],
            itemStyle: { color: '#8B5CF6' }
          }]
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{report.name}</h2>
              <p className="text-sm text-gray-600">
                Generated on {new Date(report.generatedAt).toLocaleString()} by {report.generatedBy}
              </p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                className="p-2 rounded hover:bg-gray-200"
                disabled={zoomLevel <= 50}
              >
                <SafeIcon icon={FiZoomOut} className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                className="p-2 rounded hover:bg-gray-200"
                disabled={zoomLevel >= 200}
              >
                <SafeIcon icon={FiZoomIn} className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiMaximize2} className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
            </button>
            
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiPrinter} className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div 
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
      >
        {/* Report Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{report.name}</h1>
              <p className="text-gray-600">
                Report Period: {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">MedLinkX Hospital</div>
              <div className="text-sm text-gray-600">Communication System</div>
              <div className="text-sm text-gray-600">Generated: {new Date(report.generatedAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-blue-800">Total Patients</div>
              <div className="text-xs text-blue-600 mt-1">+12% from last period</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-green-800">Bed Occupancy</div>
              <div className="text-xs text-green-600 mt-1">+5% from last period</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.8/5</div>
              <div className="text-sm text-purple-800">Patient Satisfaction</div>
              <div className="text-xs text-purple-600 mt-1">+0.2 from last period</div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
          <div className="h-96 border border-gray-200 rounded-lg">
            <ReactECharts 
              option={getChartData()} 
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patients</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Avg Stay</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Satisfaction</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { dept: 'Emergency', patients: 456, stay: '4.2 hours', satisfaction: '4.6/5', performance: '92%' },
                  { dept: 'Cardiology', patients: 234, stay: '3.1 days', satisfaction: '4.8/5', performance: '95%' },
                  { dept: 'ICU', patients: 123, stay: '5.4 days', satisfaction: '4.7/5', performance: '88%' },
                  { dept: 'Surgery', patients: 189, stay: '4.8 days', satisfaction: '4.9/5', performance: '94%' },
                  { dept: 'Laboratory', patients: 1456, stay: '2.1 hours', satisfaction: '4.4/5', performance: '87%' }
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.dept}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.patients}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.stay}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.satisfaction}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-900">Optimize Emergency Department Flow</h4>
                <p className="text-sm text-blue-700">Consider additional triage staff during peak hours (2-8 PM) to reduce wait times.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-green-900">Maintain Surgery Excellence</h4>
                <p className="text-sm text-green-700">Surgery department shows exceptional performance. Continue current practices.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-yellow-900">Improve Laboratory Efficiency</h4>
                <p className="text-sm text-yellow-700">Review laboratory workflow to reduce processing times and improve satisfaction scores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>This report was automatically generated by MedLinkX Hospital Communication System</p>
          <p>For questions or concerns, contact the Analytics Department at analytics@medlinkx.com</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsViewer;