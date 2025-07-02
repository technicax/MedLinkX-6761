import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReportsDashboard from './ReportsDashboard';
import ReportsGenerator from './ReportsGenerator';
import ReportsHistory from './ReportsHistory';
import ReportsViewer from './ReportsViewer';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiPlus, FiClock, FiEye } = FiIcons;

const Reports = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState(null);

  const views = [
    { id: 'dashboard', label: 'Analytics', icon: FiBarChart3 },
    { id: 'generator', label: 'Generate', icon: FiPlus },
    { id: 'history', label: 'History', icon: FiClock },
    { id: 'viewer', label: 'Viewer', icon: FiEye }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'generator':
        return <ReportsGenerator />;
      case 'history':
        return <ReportsHistory onViewReport={(report) => {
          setSelectedReport(report);
          setActiveView('viewer');
        }} />;
      case 'viewer':
        return <ReportsViewer report={selectedReport} onBack={() => setActiveView('history')} />;
      default:
        return <ReportsDashboard />;
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
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Generate, view, and analyze hospital performance reports
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
      <div className="min-h-[calc(100vh-16rem)]">
        {renderView()}
      </div>
    </motion.div>
  );
};

export default Reports;