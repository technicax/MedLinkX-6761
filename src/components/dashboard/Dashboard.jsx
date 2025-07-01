import React from 'react';
import { motion } from 'framer-motion';
import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import PatientOverview from './PatientOverview';
import AlertsPanel from './AlertsPanel';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <PatientOverview />
        </div>
        
        <div className="space-y-6">
          <AlertsPanel />
          <RecentActivity />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;