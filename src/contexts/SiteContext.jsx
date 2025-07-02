import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

// Default hospital sites - these can be extended by admin
const DEFAULT_HOSPITAL_SITES = {
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
    status: 'active',
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
    ],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system'
  },
  'riverside-medical': {
    id: 'riverside-medical',
    name: 'Riverside Medical Center',
    shortName: 'Riverside',
    code: 'RMC',
    address: '456 Riverside Boulevard, Riverside City, ST 67890',
    phone: '(555) 200-0000',
    email: 'info@riverside-medical.com',
    website: 'https://riverside-medical.com',
    type: 'Specialty Hospital',
    beds: 280,
    established: '1992',
    status: 'active',
    logo: '/logos/riverside-medical.png',
    theme: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10B981'
    },
    departments: [
      'emergency', 'cardiology', 'oncology', 'surgery', 
      'radiology', 'laboratory', 'rehabilitation'
    ],
    businessUnits: [
      {
        id: 'oncology',
        name: 'Cancer Care Center',
        description: 'Comprehensive cancer treatment'
      },
      {
        id: 'cardiac',
        name: 'Cardiac Center',
        description: 'Heart and vascular care'
      },
      {
        id: 'emergency',
        name: 'Emergency Services',
        description: '24/7 emergency care'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system'
  },
  'metro-childrens': {
    id: 'metro-childrens',
    name: 'Metro Children\'s Hospital',
    shortName: 'Metro Kids',
    code: 'MCH',
    address: '789 Children\'s Way, Metro City, ST 13579',
    phone: '(555) 300-0000',
    email: 'info@metro-childrens.com',
    website: 'https://metro-childrens.com',
    type: 'Children\'s Hospital',
    beds: 180,
    established: '1998',
    status: 'active',
    logo: '/logos/metro-childrens.png',
    theme: {
      primary: '#7C3AED',
      secondary: '#6D28D9',
      accent: '#8B5CF6'
    },
    departments: [
      'pediatrics', 'nicu', 'picu', 'pediatric_surgery', 
      'pediatric_oncology', 'pediatric_cardiology'
    ],
    businessUnits: [
      {
        id: 'nicu',
        name: 'Neonatal ICU',
        description: 'Newborn intensive care'
      },
      {
        id: 'picu',
        name: 'Pediatric ICU',
        description: 'Children\'s intensive care'
      },
      {
        id: 'outpatient',
        name: 'Pediatric Clinics',
        description: 'Outpatient children\'s services'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system'
  }
};

export const SiteProvider = ({ children }) => {
  const [currentSite, setCurrentSite] = useState(null);
  const [availableSites, setAvailableSites] = useState({});
  const [loading, setLoading] = useState(true);

  // Load sites from localStorage or use defaults
  useEffect(() => {
    try {
      const savedSites = localStorage.getItem('hcs_hospital_sites');
      const sites = savedSites ? JSON.parse(savedSites) : DEFAULT_HOSPITAL_SITES;
      setAvailableSites(sites);

      // Load current site
      const savedSiteId = localStorage.getItem('hcs_current_site');
      if (savedSiteId && sites[savedSiteId]) {
        setCurrentSite(sites[savedSiteId]);
      } else {
        // Default to first available site
        const firstSiteId = Object.keys(sites)[0];
        if (firstSiteId) {
          setCurrentSite(sites[firstSiteId]);
          localStorage.setItem('hcs_current_site', firstSiteId);
        }
      }
    } catch (error) {
      console.error('Error loading sites:', error);
      setAvailableSites(DEFAULT_HOSPITAL_SITES);
      setCurrentSite(DEFAULT_HOSPITAL_SITES['medlinkx-central']);
    } finally {
      setLoading(false);
    }
  }, []);

  const switchSite = (siteId) => {
    if (availableSites[siteId]) {
      setCurrentSite(availableSites[siteId]);
      localStorage.setItem('hcs_current_site', siteId);
      
      // Clear site-specific cached data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('hcs_site_data_')) {
          localStorage.removeItem(key);
        }
      });
    }
  };

  const addSite = (siteData) => {
    const newSite = {
      ...siteData,
      id: siteData.id || generateSiteId(siteData.code),
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    const updatedSites = {
      ...availableSites,
      [newSite.id]: newSite
    };

    setAvailableSites(updatedSites);
    localStorage.setItem('hcs_hospital_sites', JSON.stringify(updatedSites));
    
    return newSite;
  };

  const updateSite = (siteId, updates) => {
    if (availableSites[siteId]) {
      const updatedSite = {
        ...availableSites[siteId],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const updatedSites = {
        ...availableSites,
        [siteId]: updatedSite
      };

      setAvailableSites(updatedSites);
      localStorage.setItem('hcs_hospital_sites', JSON.stringify(updatedSites));

      // Update current site if it's the one being updated
      if (currentSite?.id === siteId) {
        setCurrentSite(updatedSite);
      }

      return updatedSite;
    }
    return null;
  };

  const deleteSite = (siteId) => {
    if (availableSites[siteId] && Object.keys(availableSites).length > 1) {
      const updatedSites = { ...availableSites };
      delete updatedSites[siteId];

      setAvailableSites(updatedSites);
      localStorage.setItem('hcs_hospital_sites', JSON.stringify(updatedSites));

      // Switch to another site if current site is deleted
      if (currentSite?.id === siteId) {
        const newSiteId = Object.keys(updatedSites)[0];
        switchSite(newSiteId);
      }

      return true;
    }
    return false; // Cannot delete if it's the only site
  };

  const generateSiteId = (code) => {
    const baseId = code.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const timestamp = Date.now().toString().slice(-6);
    return `${baseId}-${timestamp}`;
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
    addSite,
    updateSite,
    deleteSite,
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

export { DEFAULT_HOSPITAL_SITES };