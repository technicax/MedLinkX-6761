import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiSearch, FiDownload, FiEye, FiClock } = FiIcons;

const EmergencyProtocols = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const protocols = [
    {
      id: 1,
      title: 'Cardiac Arrest Response',
      category: 'medical',
      description: 'Immediate response procedures for cardiac arrest situations',
      lastUpdated: '2024-01-15',
      priority: 'critical',
      estimatedTime: '2-5 minutes'
    },
    {
      id: 2,
      title: 'Fire Emergency Evacuation',
      category: 'safety',
      description: 'Complete evacuation procedures in case of fire emergency',
      lastUpdated: '2024-01-10',
      priority: 'high',
      estimatedTime: '10-15 minutes'
    },
    {
      id: 3,
      title: 'Mass Casualty Incident',
      category: 'disaster',
      description: 'Protocols for handling multiple casualties simultaneously',
      lastUpdated: '2024-01-08',
      priority: 'critical',
      estimatedTime: '30+ minutes'
    },
    {
      id: 4,
      title: 'Chemical Spill Response',
      category: 'safety',
      description: 'Procedures for containing and cleaning chemical spills',
      lastUpdated: '2024-01-05',
      priority: 'high',
      estimatedTime: '15-30 minutes'
    },
    {
      id: 5,
      title: 'Bomb Threat Protocol',
      category: 'security',
      description: 'Step-by-step response to bomb threats and suspicious packages',
      lastUpdated: '2024-01-03',
      priority: 'critical',
      estimatedTime: '5-10 minutes'
    },
    {
      id: 6,
      title: 'Power Outage Emergency',
      category: 'infrastructure',
      description: 'Maintaining critical operations during power failures',
      lastUpdated: '2024-01-01',
      priority: 'medium',
      estimatedTime: '1-2 hours'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'medical', label: 'Medical' },
    { value: 'safety', label: 'Safety' },
    { value: 'security', label: 'Security' },
    { value: 'disaster', label: 'Disaster' },
    { value: 'infrastructure', label: 'Infrastructure' }
  ];

  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[priority] || colors.medium;
  };

  const getCategoryColor = (category) => {
    const colors = {
      medical: 'bg-blue-50 text-blue-700',
      safety: 'bg-green-50 text-green-700',
      security: 'bg-purple-50 text-purple-700',
      disaster: 'bg-red-50 text-red-700',
      infrastructure: 'bg-gray-50 text-gray-700'
    };
    return colors[category] || colors.medical;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Emergency Protocols</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiFileText} className="w-4 h-4" />
          <span>Add Protocol</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search protocols..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProtocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">{protocol.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(protocol.priority)}`}>
                  {protocol.priority}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{protocol.description}</p>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                <span>{protocol.estimatedTime}</span>
              </div>
              
              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(protocol.category)}`}>
                {protocol.category}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Updated: {new Date(protocol.lastUpdated).toLocaleDateString()}
              </span>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="View Protocol"
                >
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Download Protocol"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProtocols.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No protocols found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyProtocols;