import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReportsDashboard from './ReportsDashboard';
import ReportsGenerator from './ReportsGenerator';
import ReportsHistory from './ReportsHistory';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiPlus, FiClock } = FiIcons;

const Reports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart3 },
    { id: 'generator', label: 'Generate Report', icon: FiPlus },
    { id: 'history', label: 'Report History', icon: FiClock }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="text-sm text-gray-500">
          Data updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && <ReportsDashboard />}
          {activeTab === 'generator' && <ReportsGenerator />}
          {activeTab === 'history' && <ReportsHistory />}
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;