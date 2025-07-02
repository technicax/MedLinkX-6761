import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCards from './StatsCards';
import PatientOverview from './PatientOverview';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import AlertsPanel from './AlertsPanel';
import AnalyticsDashboard from './AnalyticsDashboard';
import KPIDashboard from './KPIDashboard';
import PerformanceMetrics from './PerformanceMetrics';
import RealTimeMonitor from './RealTimeMonitor';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBarChart3, FiTrendingUp, FiActivity, FiMonitor } = FiIcons;

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  const dashboardViews = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3 },
    { id: 'kpi', label: 'KPIs', icon: FiTrendingUp },
    { id: 'performance', label: 'Performance', icon: FiActivity },
    { id: 'realtime', label: 'Real-time', icon: FiMonitor }
  ];

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  const renderView = () => {
    switch (activeView) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'kpi':
        return <KPIDashboard />;
      case 'performance':
        return <PerformanceMetrics />;
      case 'realtime':
        return <RealTimeMonitor />;
      default:
        return (
          <div className="space-y-6">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientOverview />
              <AlertsPanel />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity />
              <QuickActions />
            </div>
          </div>
        );
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
          <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* View Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {dashboardViews.map((view) => (
            <button
              key={view.id}
              onClick={() => handleViewChange(view.id)}
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
      </div>

      {/* Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderView()}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;