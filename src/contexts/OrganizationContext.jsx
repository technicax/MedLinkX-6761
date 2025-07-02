import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const OrganizationContext = createContext();

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

// Sample organizations and business units
const ORGANIZATIONS = {
  'medlinkx-health': {
    id: 'medlinkx-health',
    name: 'MedLinkX Health System',
    type: 'health_system',
    description: 'Comprehensive healthcare network serving multiple communities',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
    founded: '1985',
    headquarters: 'Chicago, IL',
    website: 'https://medlinkx.com',
    businessUnits: [
      {
        id: 'central-hospital',
        name: 'MedLinkX Central Hospital',
        type: 'acute_care',
        description: 'Main acute care facility with 500+ beds',
        location: {
          address: '123 Medical Center Drive',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        capacity: {
          beds: 524,
          icuBeds: 48,
          emergencyBeds: 32,
          operatingRooms: 18
        },
        specialties: ['Cardiology', 'Neurology', 'Oncology', 'Emergency Medicine', 'Surgery'],
        accreditations: ['Joint Commission', 'Magnet Recognition', 'DNV GL'],
        contact: {
          phone: '(312) 555-0100',
          email: 'info@central.medlinkx.com',
          emergencyPhone: '(312) 555-0911'
        }
      },
      {
        id: 'north-clinic',
        name: 'MedLinkX North Clinic',
        type: 'outpatient',
        description: 'Outpatient specialty clinic focusing on preventive care',
        location: {
          address: '456 Wellness Boulevard',
          city: 'Evanston',
          state: 'IL',
          zipCode: '60201',
          country: 'USA'
        },
        capacity: {
          beds: 0,
          icuBeds: 0,
          emergencyBeds: 0,
          operatingRooms: 4
        },
        specialties: ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Women\'s Health'],
        accreditations: ['Joint Commission', 'PCMH Level 3'],
        contact: {
          phone: '(847) 555-0200',
          email: 'info@north.medlinkx.com',
          emergencyPhone: '(847) 555-0911'
        }
      },
      {
        id: 'south-hospital',
        name: 'MedLinkX South Hospital',
        type: 'acute_care',
        description: 'Community hospital serving the south side',
        location: {
          address: '789 Community Health Way',
          city: 'Oak Lawn',
          state: 'IL',
          zipCode: '60453',
          country: 'USA'
        },
        capacity: {
          beds: 286,
          icuBeds: 24,
          emergencyBeds: 20,
          operatingRooms: 12
        },
        specialties: ['Emergency Medicine', 'General Surgery', 'Orthopedics', 'Maternity'],
        accreditations: ['Joint Commission', 'Baby-Friendly Hospital'],
        contact: {
          phone: '(708) 555-0300',
          email: 'info@south.medlinkx.com',
          emergencyPhone: '(708) 555-0911'
        }
      },
      {
        id: 'rehabilitation-center',
        name: 'MedLinkX Rehabilitation Center',
        type: 'rehabilitation',
        description: 'Specialized rehabilitation and physical therapy center',
        location: {
          address: '321 Recovery Lane',
          city: 'Naperville',
          state: 'IL',
          zipCode: '60540',
          country: 'USA'
        },
        capacity: {
          beds: 48,
          icuBeds: 0,
          emergencyBeds: 0,
          operatingRooms: 2
        },
        specialties: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Cardiac Rehab'],
        accreditations: ['CARF', 'Joint Commission'],
        contact: {
          phone: '(630) 555-0400',
          email: 'info@rehab.medlinkx.com',
          emergencyPhone: '(630) 555-0911'
        }
      }
    ]
  },
  'regional-medical': {
    id: 'regional-medical',
    name: 'Regional Medical Group',
    type: 'medical_group',
    description: 'Multi-specialty medical group with integrated care',
    logo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop',
    founded: '1992',
    headquarters: 'Milwaukee, WI',
    website: 'https://regionalmedical.com',
    businessUnits: [
      {
        id: 'main-medical-center',
        name: 'Regional Main Medical Center',
        type: 'acute_care',
        description: 'Primary medical center with comprehensive services',
        location: {
          address: '100 Medical Plaza',
          city: 'Milwaukee',
          state: 'WI',
          zipCode: '53202',
          country: 'USA'
        },
        capacity: {
          beds: 350,
          icuBeds: 32,
          emergencyBeds: 24,
          operatingRooms: 14
        },
        specialties: ['Cardiology', 'Pulmonology', 'Gastroenterology', 'Endocrinology'],
        accreditations: ['Joint Commission', 'ISO 9001'],
        contact: {
          phone: '(414) 555-0100',
          email: 'info@main.regionalmedical.com',
          emergencyPhone: '(414) 555-0911'
        }
      }
    ]
  }
};

export const OrganizationProvider = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState(null);
  const [organizations] = useState(ORGANIZATIONS);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Load saved organization and business unit from localStorage
    const savedOrgId = localStorage.getItem('hcs_organization_id');
    const savedBusinessUnitId = localStorage.getItem('hcs_business_unit_id');

    if (savedOrgId && organizations[savedOrgId]) {
      const org = organizations[savedOrgId];
      setCurrentOrganization(org);

      if (savedBusinessUnitId) {
        const businessUnit = org.businessUnits.find(bu => bu.id === savedBusinessUnitId);
        if (businessUnit) {
          setCurrentBusinessUnit(businessUnit);
        } else {
          // Default to first business unit if saved one doesn't exist
          setCurrentBusinessUnit(org.businessUnits[0]);
          localStorage.setItem('hcs_business_unit_id', org.businessUnits[0].id);
        }
      } else {
        // Default to first business unit
        setCurrentBusinessUnit(org.businessUnits[0]);
        localStorage.setItem('hcs_business_unit_id', org.businessUnits[0].id);
      }
    } else {
      // Default to first organization and business unit
      const defaultOrg = Object.values(organizations)[0];
      setCurrentOrganization(defaultOrg);
      setCurrentBusinessUnit(defaultOrg.businessUnits[0]);
      localStorage.setItem('hcs_organization_id', defaultOrg.id);
      localStorage.setItem('hcs_business_unit_id', defaultOrg.businessUnits[0].id);
    }
  }, [organizations]);

  const switchOrganization = (organizationId) => {
    const org = organizations[organizationId];
    if (org) {
      setCurrentOrganization(org);
      setCurrentBusinessUnit(org.businessUnits[0]); // Default to first business unit
      localStorage.setItem('hcs_organization_id', organizationId);
      localStorage.setItem('hcs_business_unit_id', org.businessUnits[0].id);
      
      addNotification({
        type: 'success',
        title: 'Organization Switched',
        message: `Switched to ${org.name}`
      });
    }
  };

  const switchBusinessUnit = (businessUnitId) => {
    if (currentOrganization) {
      const businessUnit = currentOrganization.businessUnits.find(bu => bu.id === businessUnitId);
      if (businessUnit) {
        setCurrentBusinessUnit(businessUnit);
        localStorage.setItem('hcs_business_unit_id', businessUnitId);
        
        addNotification({
          type: 'success',
          title: 'Facility Switched',
          message: `Switched to ${businessUnit.name}`
        });
      }
    }
  };

  const getBusinessUnitsByType = (type) => {
    if (!currentOrganization) return [];
    return currentOrganization.businessUnits.filter(bu => bu.type === type);
  };

  const getAllBusinessUnits = () => {
    if (!currentOrganization) return [];
    return currentOrganization.businessUnits;
  };

  const getOrganizationStats = () => {
    if (!currentOrganization) return null;

    const stats = currentOrganization.businessUnits.reduce((acc, bu) => {
      acc.totalBeds += bu.capacity.beds;
      acc.totalICUBeds += bu.capacity.icuBeds;
      acc.totalEmergencyBeds += bu.capacity.emergencyBeds;
      acc.totalOperatingRooms += bu.capacity.operatingRooms;
      acc.facilities += 1;
      return acc;
    }, {
      totalBeds: 0,
      totalICUBeds: 0,
      totalEmergencyBeds: 0,
      totalOperatingRooms: 0,
      facilities: 0
    });

    return stats;
  };

  const value = {
    currentOrganization,
    currentBusinessUnit,
    organizations,
    switchOrganization,
    switchBusinessUnit,
    getBusinessUnitsByType,
    getAllBusinessUnits,
    getOrganizationStats
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};