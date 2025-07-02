import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiActivity, FiHeart, FiUsers, FiAlertTriangle,
  FiWifi, FiWifiOff, FiMonitor, FiRefreshCw,
  FiClock, FiTrendingUp, FiTarget, FiZap
} = FiIcons;

const RealTimeMonitor = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [liveData, setLiveData] = useState({
    activePatients: 247,
    staffOnDuty: 156,
    emergencyCases: 8,
    bedOccupancy: 87
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activePatients: prev.activePatients + Math.floor(Math.random() * 5) - 2,
        staffOnDuty: Math.max(140, Math.min(170, prev.staffOnDuty + Math.floor(Math.random() * 3) - 1)),
        emergencyCases: Math.max(0, Math.min(15, prev.emergencyCases + Math.floor(Math.random() * 3) - 1)),
        bedOccupancy: Math.max(70, Math.min(95, prev.bedOccupancy + Math.floor(Math.random() * 3) - 1))
      }));
      setLastUpdate(new Date());
    }, 3000);

    // Simulate connection issues occasionally
    const connectionInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 2000);
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, []);

  // Real-time patient flow chart
  const [patientFlowData, setPatientFlowData] = useState([
    { time: '09:00', admissions: 12, discharges: 8 },
    { time: '10:00', admissions: 15, discharges: 10 },
    { time: '11:00', admissions: 18, discharges: 12 },
    { time: '12:00', admissions: 22, discharges: 15 },
    { time: '13:00', admissions: 25, discharges: 18 },
    { time: '14:00', admissions: 28, discharges: 20 }
  ]);

  const realTimeChart = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Admissions', 'Discharges'] },
    xAxis: {
      type: 'category',
      data: patientFlowData.map(item => item.time)
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Admissions',
        type: 'line',
        data: patientFlowData.map(item => item.admissions),
        smooth: true,
        itemStyle: { color: '#3B82F6' },
        areaStyle: { opacity: 0.3 }
      },
      {
        name: 'Discharges',
        type: 'line',
        data: patientFlowData.map(item => item.discharges),
        smooth: true,
        itemStyle: { color: '#10B981' },
        areaStyle: { opacity: 0.3 }
      }
    ],
    animation: true
  };

  // Department status data
  const departmentStatus = [
    { name: 'Emergency', status: 'normal', capacity: 89, alerts: 2 },
    { name: 'ICU', status: 'high', capacity: 94, alerts: 1 },
    { name: 'Surgery', status: 'normal', capacity: 82, alerts: 0 },
    { name: 'Cardiology', status: 'low', capacity: 76, alerts: 0 },
    { name: 'Laboratory', status: 'normal', capacity: 85, alerts: 3 }
  ];

  // Live alerts
  const [liveAlerts, setLiveAlerts] = useState([
    { id: 1, type: 'critical', message: 'Patient vitals unstable - Room 204', time: 'Just now' },
    { id: 2, type: 'warning', message: 'High patient volume in Emergency', time: '2 min ago' },
    { id: 3, type: 'info', message: 'New staff member checked in', time: '5 min ago' }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      normal: 'bg-green-100 text-green-800 border-green-200',
      high: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      critical: 'bg-red-100 text-red-800 border-red-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.normal;
  };

  const getAlertColor = (type) => {
    const colors = {
      critical: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    return colors[type] || colors.info;
  };

  return (
    <div className="space-y-6">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Real-time Monitor</h2>
          <div className="flex items-center space-x-2 mt-1">
            <SafeIcon 
              icon={isConnected ? FiWifi : FiWifiOff} 
              className={`w-4 h-4 ${isConnected ? 'text-green-600' : 'text-red-600'}`} 
            />
            <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Connection Lost'}
            </span>
            <span className="text-gray-500 text-sm">
              • Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLastUpdate(new Date())}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
          <span>Refresh</span>
        </motion.button>
      </div>

      {/* Live Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: ['0 1px 3px rgba(0,0,0,0.12)', '0 4px 6px rgba(0,0,0,0.15)', '0 1px 3px rgba(0,0,0,0.12)']
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{liveData.activePatients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-500">Live count</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{liveData.staffOnDuty}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: liveData.emergencyCases > 10 ? [1, 1.05, 1] : [1, 1.02, 1],
            borderColor: liveData.emergencyCases > 10 ? ['#EF4444', '#F87171', '#EF4444'] : ['#E5E7EB', '#E5E7EB', '#E5E7EB']
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
              <p className={`text-2xl font-bold mt-1 ${liveData.emergencyCases > 10 ? 'text-red-600' : 'text-gray-900'}`}>
                {liveData.emergencyCases}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
              liveData.emergencyCases > 10 ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
            }`}>
              <SafeIcon icon={FiAlertTriangle} className={`w-6 h-6 ${
                liveData.emergencyCases > 10 ? 'text-red-600' : 'text-yellow-600'
              }`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
              liveData.emergencyCases > 10 ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm text-gray-500">Active alerts</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bed Occupancy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{liveData.bedOccupancy}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                animate={{ width: `${liveData.bedOccupancy}%` }}
                transition={{ duration: 1 }}
                className={`h-2 rounded-full ${
                  liveData.bedOccupancy > 90 ? 'bg-red-500' :
                  liveData.bedOccupancy > 80 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Charts and Department Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Patient Flow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Live Patient Flow</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Live</span>
            </div>
          </div>
          <div className="h-80">
            <ReactECharts option={realTimeChart} style={{ height: '100%', width: '100%' }} />
          </div>
        </motion.div>

        {/* Department Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Status</h3>
          <div className="space-y-4">
            {departmentStatus.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMonitor} className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-600">Capacity: {dept.capacity}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {dept.alerts > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {dept.alerts} alerts
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(dept.status)}`}>
                    {dept.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Live Alerts Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Alerts Feed</h3>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiZap} className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-500">Real-time updates</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {liveAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <SafeIcon 
                    icon={alert.type === 'critical' ? FiAlertTriangle : 
                          alert.type === 'warning' ? FiClock : FiActivity} 
                    className="w-4 h-4 mt-0.5" 
                  />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                  </div>
                </div>
                {alert.type === 'critical' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RealTimeMonitor;