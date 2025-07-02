import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuditLogs from './AuditLogs';
import ComplianceMonitoring from './ComplianceMonitoring';
import ComplianceReports from './ComplianceReports';
import PolicyManagement from './PolicyManagement';
import RiskAssessment from './RiskAssessment';
import ComplianceTraining from './ComplianceTraining';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiShield, FiFileText, FiBarChart3, FiBook, FiAlertTriangle, 
  FiGraduationCap, FiActivity, FiUsers 
} = FiIcons;

const Compliance = () => {
  const [activeView, setActiveView] = useState('monitoring');

  const views = [
    { id: 'monitoring', label: 'Compliance Monitor', icon: FiShield },
    { id: 'audit', label: 'Audit Logs', icon: FiActivity },
    { id: 'reports', label: 'Reports', icon: FiBarChart3 },
    { id: 'policies', label: 'Policies', icon: FiBook },
    { id: 'risk', label: 'Risk Assessment', icon: FiAlertTriangle },
    { id: 'training', label: 'Training', icon: FiGraduationCap }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'audit':
        return <AuditLogs />;
      case 'reports':
        return <ComplianceReports />;
      case 'policies':
        return <PolicyManagement />;
      case 'risk':
        return <RiskAssessment />;
      case 'training':
        return <ComplianceTraining />;
      default:
        return <ComplianceMonitoring />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit & Compliance</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive regulatory compliance and audit management system
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiFileText} className="w-4 h-4" />
            <span>Generate Report</span>
          </motion.button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeView === view.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <SafeIcon icon={view.icon} className="w-4 h-4" />
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[calc(100vh-20rem)]">
        {renderView()}
      </div>
    </motion.div>
  );
};

export default Compliance;