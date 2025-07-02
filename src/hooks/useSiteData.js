import { useState, useEffect } from 'react';
import { useSite } from '../contexts/SiteContext';

/**
 * Hook for managing site-specific data with automatic isolation
 * @param {string} dataType - Type of data (patients, staff, messages, etc.)
 * @param {any} defaultData - Default data if none exists
 * @returns {[data, setData, loading]} - Data, setter, and loading state
 */
export const useSiteData = (dataType, defaultData = null) => {
  const { currentSite, getSiteSpecificData, setSiteSpecificData } = useSite();
  const [data, setDataState] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentSite) {
      const siteData = getSiteSpecificData(dataType);
      setDataState(siteData || defaultData);
      setLoading(false);
    }
  }, [currentSite, dataType, defaultData, getSiteSpecificData]);

  const setData = (newData) => {
    if (currentSite) {
      setDataState(newData);
      setSiteSpecificData(dataType, newData);
    }
  };

  return [data, setData, loading];
};

/**
 * Hook for generating site-specific IDs
 * @param {string} prefix - Prefix for the ID
 * @returns {function} - Function to generate new ID
 */
export const useSiteId = (prefix = '') => {
  const { generateSiteSpecificId } = useSite();
  return () => generateSiteSpecificId(prefix);
};

/**
 * Hook for filtering data by current site
 * @param {Array} allData - All data across sites
 * @param {string} siteIdField - Field name that contains site ID
 * @returns {Array} - Filtered data for current site
 */
export const useSiteFilter = (allData, siteIdField = 'siteId') => {
  const { currentSite } = useSite();
  return allData.filter(item => 
    currentSite && item[siteIdField] === currentSite.id
  );
};

export default useSiteData;