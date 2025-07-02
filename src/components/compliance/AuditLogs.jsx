import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiFilter, FiCalendar, FiDownload, FiEye, FiUser, 
  FiActivity, FiShield, FiDatabase, FiSettings, FiAlertTriangle,
  FiClock, FiMapPin, FiMonitor, FiRefreshCw
} = FiIcons;

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock audit log data
  const generateAuditLogs = () => {
    const categories = [
      'authentication', 'authorization', 'data_access', 'data_modification',
      'system_access', 'policy_violation', 'security_event', 'configuration_change',
      'patient_record', 'medication', 'financial', 'emergency'
    ];

    const actions = [
      'login_success', 'login_failed', 'logout', 'password_change',
      'record_viewed', 'record_modified', 'record_created', 'record_deleted',
      'permission_granted', 'permission_denied', 'policy_updated',
      'system_configuration', 'backup_created', 'data_export',
      'medication_dispensed', 'emergency_access', 'audit_trail_accessed'
    ];

    const users = [
      { id: 'dr001', name: 'Dr. Sarah Johnson', role: 'Doctor' },
      { id: 'nurse001', name: 'Mary Smith', role: 'Nurse' },
      { id: 'admin001', name: 'John Wilson', role: 'Admin' },
      { id: 'tech001', name: 'Mike Davis', role: 'Technician' },
      { id: 'sec001', name: 'Security System', role: 'System' }
    ];

    const severities = ['low', 'medium', 'high', 'critical'];
    const outcomes = ['success', 'failure', 'warning', 'blocked'];

    const mockLogs = [];
    const now = new Date();

    for (let i = 0; i < 500; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      
      // Generate timestamp within last 30 days
      const timestamp = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);

      mockLogs.push({
        id: `LOG-${(i + 1).toString().padStart(6, '0')}`,
        timestamp: timestamp.toISOString(),
        category,
        action,
        user: user.id,
        userName: user.name,
        userRole: user.role,
        severity,
        outcome,
        resourceType: getResourceType(category),
        resourceId: `RES-${Math.floor(Math.random() * 10000)}`,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        userAgent: getBrowserAgent(),
        location: getLocation(),
        description: getDescription(action, category),
        details: getDetails(action, category, outcome),
        complianceFlags: getComplianceFlags(category, outcome),
        riskScore: Math.floor(Math.random() * 100),
        sessionId: `SES-${Math.random().toString(36).substr(2, 9)}`,
        correlationId: `COR-${Math.random().toString(36).substr(2, 9)}`
      });
    }

    return mockLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getResourceType = (category) => {
    const mapping = {
      'patient_record': 'Patient Record',
      'medication': 'Medication',
      'financial': 'Financial Record',
      'system_access': 'System',
      'authentication': 'Authentication',
      'authorization': 'Authorization',
      'data_access': 'Database',
      'data_modification': 'Database',
      'policy_violation': 'Policy',
      'security_event': 'Security',
      'configuration_change': 'Configuration',
      'emergency': 'Emergency System'
    };
    return mapping[category] || 'System';
  };

  const getBrowserAgent = () => {
    const agents = [
      'Chrome/91.0.4472.124',
      'Firefox/89.0',
      'Safari/14.1.1',
      'Edge/91.0.864.59',
      'Mobile App/2.1.0'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  };

  const getLocation = () => {
    const locations = [
      'Emergency Department',
      'ICU - Floor 3',
      'Cardiology Wing',
      'Pharmacy',
      'Administrative Office',
      'Laboratory',
      'Surgery Theater 2',
      'Nursing Station A',
      'Remote Access',
      'Mobile Device'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getDescription = (action, category) => {
    const descriptions = {
      'login_success': 'User successfully logged into the system',
      'login_failed': 'Failed login attempt detected',
      'logout': 'User session terminated',
      'password_change': 'User password was changed',
      'record_viewed': 'Patient record accessed for viewing',
      'record_modified': 'Patient record was modified',
      'record_created': 'New record created in the system',
      'record_deleted': 'Record was deleted from the system',
      'permission_granted': 'Access permission granted to resource',
      'permission_denied': 'Access permission denied',
      'policy_updated': 'System policy was updated',
      'system_configuration': 'System configuration changed',
      'backup_created': 'Data backup operation completed',
      'data_export': 'Data export operation performed',
      'medication_dispensed': 'Medication dispensed to patient',
      'emergency_access': 'Emergency access granted to critical resource',
      'audit_trail_accessed': 'Audit trail was accessed for review'
    };
    return descriptions[action] || 'System activity recorded';
  };

  const getDetails = (action, category, outcome) => {
    const details = {
      'login_success': { method: 'Username/Password', location: 'Workstation-045' },
      'login_failed': { reason: 'Invalid credentials', attempts: Math.floor(Math.random() * 5) + 1 },
      'record_viewed': { recordType: 'Patient Demographics', duration: `${Math.floor(Math.random() * 300) + 30}s` },
      'record_modified': { fields: ['diagnosis', 'medication'], changeType: 'update' },
      'medication_dispensed': { medication: 'Aspirin 81mg', quantity: Math.floor(Math.random() * 10) + 1 },
      'emergency_access': { reason: 'Patient Critical Condition', authorizedBy: 'Dr. Emergency' }
    };
    return details[action] || { action: action, outcome: outcome };
  };

  const getComplianceFlags = (category, outcome) => {
    const flags = [];
    
    if (outcome === 'failure' || outcome === 'blocked') {
      flags.push('SECURITY_VIOLATION');
    }
    
    if (category === 'patient_record') {
      flags.push('HIPAA_RELEVANT');
    }
    
    if (category === 'financial') {
      flags.push('SOX_RELEVANT');
    }
    
    if (category === 'medication') {
      flags.push('FDA_RELEVANT');
    }
    
    if (Math.random() > 0.8) {
      flags.push('REQUIRES_REVIEW');
    }
    
    return flags;
  };

  useEffect(() => {
    const initialLogs = generateAuditLogs();
    setLogs(initialLogs);
    setFilteredLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate new log entries
        const newLogs = generateAuditLogs().slice(0, Math.floor(Math.random() * 5) + 1);
        setLogs(prev => [...newLogs, ...prev].slice(0, 1000));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  useEffect(() => {
    let filtered = logs;

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(log => log.category === filterCategory);
    }

    if (filterSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === filterSeverity);
    }

    if (filterUser !== 'all') {
      filtered = filtered.filter(log => log.user === filterUser);
    }

    // Apply date range filter
    const now = new Date();
    if (dateRange !== 'all') {
      const ranges = {
        'today': 1,
        'week': 7,
        'month': 30,
        'quarter': 90
      };
      
      const days = ranges[dateRange];
      if (days) {
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(log => new Date(log.timestamp) >= cutoff);
      }
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, filterCategory, filterSeverity, filterUser, dateRange]);

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity] || colors.low;
  };

  const getOutcomeColor = (outcome) => {
    const colors = {
      success: 'text-green-600',
      failure: 'text-red-600',
      warning: 'text-yellow-600',
      blocked: 'text-red-600'
    };
    return colors[outcome] || colors.success;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'authentication': FiShield,
      'authorization': FiShield,
      'data_access': FiDatabase,
      'data_modification': FiDatabase,
      'system_access': FiSettings,
      'policy_violation': FiAlertTriangle,
      'security_event': FiShield,
      'configuration_change': FiSettings,
      'patient_record': FiUser,
      'medication': FiActivity,
      'financial': FiActivity,
      'emergency': FiAlertTriangle
    };
    return icons[category] || FiActivity;
  };

  const exportLogs = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Timestamp,Category,Action,User,Severity,Outcome,Description\n"
      + filteredLogs.map(log => 
          `${log.id},${log.timestamp},${log.category},${log.action},${log.userName},${log.severity},${log.outcome},"${log.description}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const LogDetailModal = ({ log, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Audit Log Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <SafeIcon icon={FiEye} className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Log ID:</span>
                  <span className="font-mono">{log.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="capitalize">{log.category.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Action:</span>
                  <span className="capitalize">{log.action.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Severity:</span>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(log.severity)}`}>
                    {log.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outcome:</span>
                  <span className={`font-medium ${getOutcomeColor(log.outcome)}`}>
                    {log.outcome.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">User:</span>
                  <span>{log.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span>{log.userRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-mono">{log.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session ID:</span>
                  <span className="font-mono">{log.sessionId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Technical Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Address:</span>
                  <span className="font-mono">{log.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User Agent:</span>
                  <span className="font-mono text-xs">{log.userAgent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>{log.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resource Type:</span>
                  <span>{log.resourceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resource ID:</span>
                  <span className="font-mono">{log.resourceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Score:</span>
                  <span className={`font-medium ${log.riskScore > 70 ? 'text-red-600' : log.riskScore > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {log.riskScore}/100
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Compliance Flags</h4>
              <div className="flex flex-wrap gap-2">
                {log.complianceFlags.map((flag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {flag}
                  </span>
                ))}
                {log.complianceFlags.length === 0 && (
                  <span className="text-sm text-gray-500">No compliance flags</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {log.description}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Additional Details</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const uniqueUsers = [...new Set(logs.map(log => log.user))];

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{filteredLogs.length.toLocaleString()}</p>
            </div>
            <SafeIcon icon={FiActivity} className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredLogs.filter(log => log.category === 'security_event' || log.severity === 'critical').length}
              </p>
            </div>
            <SafeIcon icon={FiShield} className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Actions</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredLogs.filter(log => log.outcome === 'failure' || log.outcome === 'blocked').length}
              </p>
            </div>
            <SafeIcon icon={FiAlertTriangle} className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueUsers.length}</p>
            </div>
            <SafeIcon icon={FiUsers} className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Audit Log Filters</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Auto Refresh</span>
            </label>
            <button
              onClick={exportLogs}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="authentication">Authentication</option>
            <option value="authorization">Authorization</option>
            <option value="data_access">Data Access</option>
            <option value="data_modification">Data Modification</option>
            <option value="system_access">System Access</option>
            <option value="policy_violation">Policy Violation</option>
            <option value="security_event">Security Event</option>
            <option value="patient_record">Patient Record</option>
            <option value="medication">Medication</option>
            <option value="emergency">Emergency</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(userId => {
              const log = logs.find(l => l.user === userId);
              return (
                <option key={userId} value={userId}>
                  {log?.userName || userId}
                </option>
              );
            })}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterSeverity('all');
              setFilterUser('all');
              setDateRange('today');
            }}
            className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Outcome</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.slice(0, 100).map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                      <div className="text-xs text-gray-500">{log.userRole}</div>
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={getCategoryIcon(log.category)} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-900 capitalize">
                        {log.category.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900 capitalize">
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(log.severity)}`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getOutcomeColor(log.outcome)}`}>
                      {log.outcome.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={log.description}>
                      {log.description}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {log.complianceFlags.slice(0, 2).map((flag, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                          {flag}
                        </span>
                      ))}
                      {log.complianceFlags.length > 2 && (
                        <span className="text-xs text-gray-500">+{log.complianceFlags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiActivity} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No audit logs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or date range</p>
          </div>
        )}

        {filteredLogs.length > 100 && (
          <div className="p-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Showing first 100 of {filteredLogs.length.toLocaleString()} results. 
              Use filters to narrow down the results.
            </p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <LogDetailModal 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuditLogs;