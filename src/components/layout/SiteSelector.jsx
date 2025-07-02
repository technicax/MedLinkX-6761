import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useSite } from '../../contexts/SiteContext';
import { useUserAccess } from '../../contexts/UserAccessContext';
import { useRBAC } from '../../contexts/RBACContext';
import * as FiIcons from 'react-icons/fi';

const { FiBuilding, FiChevronDown, FiMapPin, FiPhone, FiGlobe, FiCheck } = FiIcons;

const SiteSelector = () => {
  const { currentSite, availableSites, switchSite } = useSite();
  const { getUserAccessibleSites } = useUserAccess();
  const { currentUser } = useRBAC();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentSite || !currentUser) return null;

  // Get sites that the current user has access to
  const accessibleSites = getUserAccessibleSites(currentUser.email, availableSites);
  const sitesList = Object.values(accessibleSites);

  // If user only has access to one site, don't show selector
  if (sitesList.length <= 1) {
    return (
      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: currentSite.theme.primary }}
        >
          <SafeIcon icon={FiBuilding} className="w-5 h-5" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{currentSite.shortName}</div>
          <div className="text-xs text-gray-500">{currentSite.type}</div>
        </div>
      </div>
    );
  }

  const handleSiteChange = (siteId) => {
    if (siteId !== currentSite.id) {
      switchSite(siteId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors min-w-64"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: currentSite.theme.primary }}
        >
          <SafeIcon icon={FiBuilding} className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900">{currentSite.shortName}</div>
          <div className="text-xs text-gray-500">{currentSite.type}</div>
        </div>
        <SafeIcon
          icon={FiChevronDown}
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900 mb-1">Select Hospital</h3>
                <p className="text-sm text-gray-600">
                  Switch to a different medical facility ({sitesList.length} available)
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {sitesList.map((site) => (
                  <motion.button
                    key={site.id}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                    onClick={() => handleSiteChange(site.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: site.theme.primary }}
                      >
                        <SafeIcon icon={FiBuilding} className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900">{site.name}</div>
                          {currentSite.id === site.id && (
                            <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {site.type} • {site.beds} beds
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                            <span className="truncate">{site.address}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <SafeIcon icon={FiPhone} className="w-3 h-3 mr-1" />
                            <span>{site.phone}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {site.businessUnits.slice(0, 2).map((unit) => (
                            <span
                              key={unit.id}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: site.theme.primary + '20',
                                color: site.theme.primary
                              }}
                            >
                              {unit.name}
                            </span>
                          ))}
                          {site.businessUnits.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                              +{site.businessUnits.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  Access is controlled by your assigned permissions
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiteSelector;