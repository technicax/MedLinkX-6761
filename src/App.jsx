import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Patients from './components/patients/Patients';
import Staff from './components/staff/Staff';
import Emergency from './components/emergency/Emergency';
import Reports from './components/reports/Reports';
import Settings from './components/settings/Settings';
import Login from './components/auth/Login';
import PermissionGate from './components/common/PermissionGate';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RBACProvider, useRBAC } from './contexts/RBACContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SocketProvider } from './contexts/SocketContext';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const { currentUser } = useRBAC();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route 
                path="/dashboard" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Dashboard />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Messages />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/patients" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Patients />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/staff" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Staff />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/emergency" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Emergency />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Reports />
                  </PermissionGate>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PermissionGate fallback={<AccessDenied />}>
                    <Settings />
                  </PermissionGate>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-96"
    >
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this resource.</p>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <RBACProvider>
        <AuthProvider>
          <NotificationProvider>
            <SocketProvider>
              <AppContent />
            </SocketProvider>
          </NotificationProvider>
        </AuthProvider>
      </RBACProvider>
    </Router>
  );
}

export default App;