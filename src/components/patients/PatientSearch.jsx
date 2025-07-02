import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiCalendar, FiX, FiChevronDown } = FiIcons;

const PatientSearch = ({ searchTerm, onSearchChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    ageRange: { min: '', max: '' },
    admissionDateRange: { start: '', end: '' },
    bloodType: '',
    insurance: '',
    doctor: '',
    hasAllergies: false,
    chronicConditions: []
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const insuranceProviders = ['Blue Cross', 'Aetna', 'Cigna', 'United Healthcare', 'Medicare', 'Medicaid'];
  const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Brown', 'Dr. Lisa Chen', 'Dr. Kevin Park', 'Dr. Robert Wilson'];
  const chronicConditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'COPD', 'Kidney Disease', 'Cancer'];

  const handleAdvancedFilterChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      ageRange: { min: '', max: '' },
      admissionDateRange: { start: '', end: '' },
      bloodType: '',
      insurance: '',
      doctor: '',
      hasAllergies: false,
      chronicConditions: []
    });
  };

  const applyAdvancedSearch = () => {
    // Here you would typically apply the advanced filters to your search
    console.log('Applying advanced filters:', advancedFilters);
    setShowAdvanced(false);
  };

  return (
    <div className="space-y-4">
      {/* Quick Search Suggestions */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Quick search:</span>
        {['Critical patients', 'Admitted today', 'Discharge ready', 'No allergies'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSearchChange(suggestion)}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Advanced Search Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <SafeIcon icon={FiFilter} className="w-4 h-4" />
          <span>Advanced Search</span>
          <SafeIcon 
            icon={FiChevronDown} 
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} 
          />
        </button>

        {showAdvanced && (
          <button
            onClick={clearAdvancedFilters}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Advanced Search Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={advancedFilters.ageRange.min}
                    onChange={(e) => handleAdvancedFilterChange('ageRange', { 
                      ...advancedFilters.ageRange, 
                      min: e.target.value 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={advancedFilters.ageRange.max}
                    onChange={(e) => handleAdvancedFilterChange('ageRange', { 
                      ...advancedFilters.ageRange, 
                      max: e.target.value 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Admission Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date</label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={advancedFilters.admissionDateRange.start}
                    onChange={(e) => handleAdvancedFilterChange('admissionDateRange', { 
                      ...advancedFilters.admissionDateRange, 
                      start: e.target.value 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={advancedFilters.admissionDateRange.end}
                    onChange={(e) => handleAdvancedFilterChange('admissionDateRange', { 
                      ...advancedFilters.admissionDateRange, 
                      end: e.target.value 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Blood Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select
                  value={advancedFilters.bloodType}
                  onChange={(e) => handleAdvancedFilterChange('bloodType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any blood type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Insurance Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                <select
                  value={advancedFilters.insurance}
                  onChange={(e) => handleAdvancedFilterChange('insurance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any insurance</option>
                  {insuranceProviders.map((provider) => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              {/* Attending Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attending Doctor</label>
                <select
                  value={advancedFilters.doctor}
                  onChange={(e) => handleAdvancedFilterChange('doctor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              {/* Has Allergies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={advancedFilters.hasAllergies}
                    onChange={(e) => handleAdvancedFilterChange('hasAllergies', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Has known allergies</span>
                </label>
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions</label>
              <div className="flex flex-wrap gap-2">
                {chronicConditions.map((condition) => (
                  <label key={condition} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={advancedFilters.chronicConditions.includes(condition)}
                      onChange={(e) => {
                        const conditions = e.target.checked
                          ? [...advancedFilters.chronicConditions, condition]
                          : advancedFilters.chronicConditions.filter(c => c !== condition);
                        handleAdvancedFilterChange('chronicConditions', conditions);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply/Cancel Buttons */}
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAdvanced(false)}
                className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyAdvancedSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(advancedFilters).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0) || 
              (typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(v => !v))) {
            return null;
          }

          let displayValue = value;
          if (key === 'ageRange' && (value.min || value.max)) {
            displayValue = `Age: ${value.min || '0'}-${value.max || '100+'}`;
          } else if (key === 'admissionDateRange' && (value.start || value.end)) {
            displayValue = `Admitted: ${value.start || 'Any'} to ${value.end || 'Any'}`;
          } else if (key === 'hasAllergies' && value) {
            displayValue = 'Has allergies';
          } else if (key === 'chronicConditions' && Array.isArray(value) && value.length > 0) {
            displayValue = `Conditions: ${value.join(', ')}`;
          } else if (key === 'bloodType') {
            displayValue = `Blood: ${value}`;
          } else if (key === 'insurance') {
            displayValue = `Insurance: ${value}`;
          } else if (key === 'doctor') {
            displayValue = `Doctor: ${value}`;
          }

          return (
            <span
              key={key}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              <span>{displayValue}</span>
              <button
                onClick={() => {
                  if (key === 'ageRange') {
                    handleAdvancedFilterChange(key, { min: '', max: '' });
                  } else if (key === 'admissionDateRange') {
                    handleAdvancedFilterChange(key, { start: '', end: '' });
                  } else if (key === 'chronicConditions') {
                    handleAdvancedFilterChange(key, []);
                  } else if (key === 'hasAllergies') {
                    handleAdvancedFilterChange(key, false);
                  } else {
                    handleAdvancedFilterChange(key, '');
                  }
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PatientSearch;