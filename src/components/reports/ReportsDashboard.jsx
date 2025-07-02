import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiUsers, FiActivity, FiDownload } = FiIcons;

const ReportsDashboard = () => {
  const { addNotification } = useNotification();

  const metrics = [
    { title: 'Patient Admissions', value: '1,247', change: '+12%', trend: 'up', icon: FiUsers, color: 'blue' },
    { title: 'Average Length of Stay', value: '4.2 days', change: '-8%', trend: 'down', icon: FiActivity, color: 'green' },
    { title: 'Bed Occupancy Rate', value: '89%', change: '+5%', trend: 'up', icon: FiTrendingUp, color: 'yellow' },
    { title: 'Patient Satisfaction', value: '4.8/5', change: '+3%', trend: 'up', icon: FiTrendingUp, color: 'purple' }
  ];

  const admissionsChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Admissions', 'Discharges'] },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: { type: 'value' },
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
    tooltip: { trigger: 'item' },
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
            shadowColor: 'rgba(0,0,0,0.5)'
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

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Patient Summary',
      generated: '2 hours ago',
      type: 'PDF',
      size: '2.4 MB',
      url: '/reports/monthly-patient-summary.pdf'
    },
    {
      id: 2,
      name: 'Department Performance',
      generated: '1 day ago',
      type: 'Excel',
      size: '1.8 MB',
      url: '/reports/department-performance.xlsx'
    },
    {
      id: 3,
      name: 'Financial Report Q4',
      generated: '3 days ago',
      type: 'PDF',
      size: '3.2 MB',
      url: '/reports/financial-report-q4.pdf'
    },
    {
      id: 4,
      name: 'Staff Utilization Report',
      generated: '5 days ago',
      type: 'Excel',
      size: '1.5 MB',
      url: '/reports/staff-utilization.xlsx'
    }
  ];

  const handleDownloadReport = (report) => {
    try {
      // Create sample data for the report
      const reportData = generateReportData(report);
      
      if (report.type === 'PDF') {
        downloadPDF(report.name, reportData);
      } else if (report.type === 'Excel') {
        downloadExcel(report.name, reportData);
      }

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

  const generateReportData = (report) => {
    // Generate sample report content based on report type
    switch (report.name) {
      case 'Monthly Patient Summary':
        return {
          title: 'Monthly Patient Summary Report',
          date: new Date().toLocaleDateString(),
          data: {
            totalPatients: 1247,
            admissions: 156,
            discharges: 142,
            averageStay: '4.2 days',
            satisfaction: '4.8/5'
          }
        };
      case 'Department Performance':
        return {
          title: 'Department Performance Report',
          date: new Date().toLocaleDateString(),
          departments: [
            { name: 'Emergency', patients: 335, satisfaction: '4.6/5' },
            { name: 'Cardiology', patients: 310, satisfaction: '4.8/5' },
            { name: 'Neurology', patients: 234, satisfaction: '4.7/5' }
          ]
        };
      default:
        return {
          title: report.name,
          date: new Date().toLocaleDateString(),
          data: 'Sample report data'
        };
    }
  };

  const downloadPDF = (filename, data) => {
    // Create a simple PDF-like content
    const content = `
${data.title}
Generated: ${data.date}
Hospital: MedLinkX Communication System

${data.data ? JSON.stringify(data.data, null, 2) : ''}
${data.departments ? data.departments.map(d => `${d.name}: ${d.patients} patients, Satisfaction: ${d.satisfaction}`).join('\n') : ''}

This is a sample report generated by MedLinkX Hospital Communication System.
For actual PDF generation, integrate with a PDF library like jsPDF or server-side generation.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadExcel = (filename, data) => {
    // Create CSV content (Excel-compatible)
    let csvContent = `${data.title}\nGenerated: ${data.date}\n\n`;
    
    if (data.departments) {
      csvContent += 'Department,Patients,Satisfaction\n';
      data.departments.forEach(dept => {
        csvContent += `${dept.name},${dept.patients},${dept.satisfaction}\n`;
      });
    } else if (data.data) {
      csvContent += 'Metric,Value\n';
      Object.entries(data.data).forEach(([key, value]) => {
        csvContent += `${key},${value}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
              <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
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
          {recentReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span>Generated {report.generated}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {report.type}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadReport(report)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsDashboard;