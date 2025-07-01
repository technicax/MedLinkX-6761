import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';

const PatientOverview = () => {
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Admissions', 'Discharges']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Admissions',
        type: 'line',
        data: [15, 23, 18, 32, 28, 19, 24],
        smooth: true,
        itemStyle: {
          color: '#3B82F6'
        }
      },
      {
        name: 'Discharges',
        type: 'line',
        data: [12, 19, 15, 28, 25, 16, 21],
        smooth: true,
        itemStyle: {
          color: '#10B981'
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Patient Flow</h2>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="h-64">
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </div>
    </motion.div>
  );
};

export default PatientOverview;