import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useOrganization } from '../../contexts/OrganizationContext';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiBuilding, FiMapPin, FiUsers, FiCheck } = FiIcons;

const OrganizationSwitcher = ({ showBusinessUnit = true }) => {
  const {
    currentOrganization,
    currentBusinessUnit,
    organizations,
    switchOrganization,
    switchBusinessUnit
  } = useOrganization();

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showBusinessUnitDropdown, setShowBusinessUnitDropdown] = useState(false);

  if (!currentOrganization) return null;

  const getBusinessUnitTypeIcon = (type) => {
    switch (type) {
      case 'acute_care':
        return '🏥';
      case 'outpatient':
        return '🏢';
      case 'rehabilitation':
        return '♿';
      case 'emergency':
        return '🚑';
      default:
        return '🏢';
    }
  };

  const getBusinessUnitTypeLabel = (type) => {
    switch (type) {
      case 'acute_care':
        return 'Hospital';
      case 'outpatient':
        return 'Clinic';
      case 'rehabilitation':
        return 'Rehab Center';
      case 'emergency':
        return 'Emergency Center';
      default:
        return 'Facility';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Organization Selector */}
      <div className="relative">
        <button
          onClick={() => setShowOrgDropdown(!showOrgDropdown)}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src={currentOrganization.logo}
            alt={currentOrganization.name}
            className="w-6 h-6 rounded object-cover"
          />
          <div className="text-left hidden md:block">
            <div className="text-sm font-medium text-gray-900 truncate max-w-32">
              {currentOrganization.name}
            </div>
            <div className="text-xs text-gray-500">
              {Object.keys(organizations).length} organizations
            </div>
          </div>
          <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
        </button>

        <AnimatePresence>
          {showOrgDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              onMouseLeave={() => setShowOrgDropdown(false)}
            >
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Select Organization</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {Object.values(organizations).map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      switchOrganization(org.id);
                      setShowOrgDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-600">{org.description}</div>
                      <div className="text-xs text-gray-500">
                        {org.businessUnits.length} facilities • Founded {org.founded}
                      </div>
                    </div>
                    {currentOrganization.id === org.id && (
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Business Unit Selector */}
      {showBusinessUnit && currentBusinessUnit && (
        <div className="relative">
          <button
            onClick={() => setShowBusinessUnitDropdown(!showBusinessUnitDropdown)}
            className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">{getBusinessUnitTypeIcon(currentBusinessUnit.type)}</span>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-medium text-gray-900 truncate max-w-40">
                {currentBusinessUnit.name}
              </div>
              <div className="text-xs text-gray-500">
                {getBusinessUnitTypeLabel(currentBusinessUnit.type)} • {currentBusinessUnit.location.city}
              </div>
            </div>
            <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showBusinessUnitDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                onMouseLeave={() => setShowBusinessUnitDropdown(false)}
              >
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Select Facility</h3>
                  <p className="text-xs text-gray-600">{currentOrganization.name}</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {currentOrganization.businessUnits.map((businessUnit) => (
                    <button
                      key={businessUnit.id}
                      onClick={() => {
                        switchBusinessUnit(businessUnit.id);
                        setShowBusinessUnitDropdown(false);
                      }}
                      className="w-full flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl mt-1">
                        {getBusinessUnitTypeIcon(businessUnit.type)}
                      </span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{businessUnit.name}</div>
                        <div className="text-sm text-gray-600 mb-1">{businessUnit.description}</div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                            <span>{businessUnit.location.city}, {businessUnit.location.state}</span>
                          </div>
                          {businessUnit.capacity.beds > 0 && (
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiBuilding} className="w-3 h-3" />
                              <span>{businessUnit.capacity.beds} beds</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {businessUnit.specialties.slice(0, 3).map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                          {businessUnit.specialties.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{businessUnit.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      {currentBusinessUnit.id === businessUnit.id && (
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-blue-600 mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default OrganizationSwitcher;