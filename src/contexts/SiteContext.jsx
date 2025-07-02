import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

// Available hospital sites
const HOSPITAL_SITES = {
  'medlinkx-central': {
    id: 'medlinkx-central',
    name: 'MedLinkX Central Hospital',
    shortName: 'Central',
    code: 'MLX-C',
    address: '123 Medical Center Drive, Downtown City, ST 12345',
    phone: '(555) 100-0000',
    email: 'info@medlinkx-central.com',
    website: 'https://central.medlinkx.com',
    type: 'General Hospital',
    beds: 450,
    established: '1985',
    logo: '/logos/medlinkx-central.png',
    theme: {
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#3B82F6'
    },
    departments: [
      'emergency', 'cardiology', 'neurology', 'icu', 'surgery', 
      'pediatrics', 'oncology', 'orthopedics', 'radiology', 'laboratory'
    ],
    businessUnits: [
      {
        id: 'inpatient',
        name: 'Inpatient Services',
        description: 'Hospital admission and care'
      },
      {
        id: 'outpatient',
        name: 'Outpatient Services',
        description: 'Clinic and day procedures'
      },
      {
        id: 'emergency',
        name: 'Emergency Services',
        description: '24/7 emergency care'
      },
      {
        id: 'diagnostics',
        name: 'Diagnostic Services',
        description: 'Lab and imaging services'
      }
    ]
  }
};

export const SiteProvider = ({ children }) => {
  const [currentSite, setCurrentSite] = useState(null);
  const [availableSites, setAvailableSites] = useState(HOSPITAL_SITES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved site from localStorage or default to central hospital
    const savedSiteId = localStorage.getItem('hcs_current_site');
    if (savedSiteId && HOSPITAL_SITES[savedSiteId]) {
      setCurrentSite(HOSPITAL_SITES[savedSiteId]);
    } else {
      // Default to central hospital if none selected
      setCurrentSite(HOSPITAL_SITES['medlinkx-central']);
      localStorage.setItem('hcs_current_site', 'medlinkx-central');
    }
    setLoading(false);
  }, []);

  const switchSite = (siteId) => {
    if (HOSPITAL_SITES[siteId]) {
      setCurrentSite(HOSPITAL_SITES[siteId]);
      localStorage.setItem('hcs_current_site', siteId);
      
      // Clear site-specific cached data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('hcs_site_data_')) {
          localStorage.removeItem(key);
        }
      });
    }
  };

  const getSiteSpecificData = (dataType) => {
    if (!currentSite) return null;
    const cacheKey = `hcs_site_data_${currentSite.id}_${dataType}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }
    return null;
  };

  const setSiteSpecificData = (dataType, data) => {
    if (!currentSite) return;
    const cacheKey = `hcs_site_data_${currentSite.id}_${dataType}`;
    localStorage.setItem(cacheKey, JSON.stringify(data));
  };

  const getDepartments = () => {
    return currentSite?.departments || [];
  };

  const getBusinessUnits = () => {
    return currentSite?.businessUnits || [];
  };

  const isSiteSpecificUser = (userId) => {
    return userId.startsWith(currentSite?.code?.toLowerCase() || '');
  };

  const generateSiteSpecificId = (prefix = '') => {
    const siteCode = currentSite?.code?.toLowerCase() || 'mlx';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${siteCode}-${prefix}${timestamp}${random}`;
  };

  const value = {
    currentSite,
    availableSites,
    loading,
    switchSite,
    getSiteSpecificData,
    setSiteSpecificData,
    getDepartments,
    getBusinessUnits,
    isSiteSpecificUser,
    generateSiteSpecificId
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};

export { HOSPITAL_SITES };