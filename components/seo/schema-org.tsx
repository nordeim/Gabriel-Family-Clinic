/**
 * Schema.org Structured Data Components
 * Healthcare-specific JSON-LD schemas for Gabriel Family Clinic
 * 
 * Implements:
 * - Medical Business schema
 * - LocalBusiness schemas for clinic locations
 * - Service schemas
 * - BreadcrumbList schema
 * 
 * Note: Using flexible typing to accommodate all schema.org properties
 */

/**
 * Healthcare Organization Schema
 * Establishes Gabriel Family Clinic as a medical business with E-A-T signals
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://gabrielfamilyclinic.com/#organization',
  name: 'Gabriel Family Clinic',
  description: 'Comprehensive family healthcare for all ages with 35+ years of experience providing compassionate, personalized medical care.',
  url: 'https://gabrielfamilyclinic.com',
  logo: 'https://gabrielfamilyclinic.com/logo.png',
  image: 'https://gabrielfamilyclinic.com/og-image.png',
  
  // E-A-T Signals
  foundingDate: '1989',
  slogan: 'Compassionate Healthcare for All Ages',
  
  // Contact information
  telephone: '+1-555-GABRIEL',
  email: 'info@gabrielfamilyclinic.com',
  
  // Medical credentials and specialty
  hasCredential: 'Board Certified Family Medicine Physicians',
  medicalSpecialty: ['Family Medicine', 'Primary Care', 'Preventive Medicine'],
  
  // Service areas
  areaServed: [
    {
      '@type': 'City',
      name: 'Singapore',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Woodlands',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Northern Singapore',
    },
  ],
  
  // Social media (add when available)
  sameAs: [
    // 'https://www.facebook.com/gabrielfamilyclinic',
    // 'https://twitter.com/gabrielclinic',
    // 'https://www.linkedin.com/company/gabriel-family-clinic',
  ],
  
  // Additional metadata
  keywords: 'family medicine, primary care, healthcare services, family doctor, medical clinic, preventive care, chronic disease management',
} as const;

/**
 * Location-specific schemas for each clinic
 */
export const locationSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://gabrielfamilyclinic.com/#singapore-location',
    name: 'Gabriel Family Clinic - Singapore',
    description: 'Main clinic location in Singapore providing comprehensive family medicine services.',
    
    // Parent organization
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marsiling Rise, #01-204 Block 131',
      addressLocality: 'Singapore',
      addressRegion: '',
      postalCode: '730131',
      addressCountry: 'SG',
    },
    
    // Geo-coordinates (approximate for Marsiling, Singapore)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 1.4382,
      longitude: 103.7831,
    },
    
    // Contact
    telephone: '6269 6681',
    email: 'singapore@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#singapore-location',
    
    // Opening hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    
    // Services
    medicalSpecialty: ['Family Medicine', 'Primary Care'],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Primary Care Consultation',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Preventive Health Screenings',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Chronic Disease Management',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://gabrielfamilyclinic.com/#orchard-location',
    name: 'Gabriel Family Clinic - Orchard',
    description: 'Premium clinic location in Orchard offering comprehensive family medicine and specialist services.',
    
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Orchard Medical Centre, #08-15 Block 123',
      addressLocality: 'Singapore',
      addressRegion: '',
      postalCode: '238855',
      addressCountry: 'SG',
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 1.3048,
      longitude: 103.8318,
    },
    
    telephone: '6738 2244',
    email: 'orchard@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#orchard-location',
    
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    
    medicalSpecialty: ['Family Medicine', 'Urgent Care'],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Urgent Care',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Family Medicine',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://gabrielfamilyclinic.com/#jurong-location',
    name: 'Gabriel Family Clinic - Jurong',
    description: 'Community-focused clinic in Jurong providing family medicine and geriatric care services.',
    
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jurong Healthcare Hub, #05-28 Block 456',
      addressLocality: 'Singapore',
      addressRegion: '',
      postalCode: '608531',
      addressCountry: 'SG',
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 1.3330,
      longitude: 103.7431,
    },
    
    telephone: '6891 5577',
    email: 'jurong@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#jurong-location',
    
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    
    medicalSpecialty: ['Geriatric Medicine', 'Family Medicine'],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Senior Care',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Chronic Disease Management',
      },
    ],
  },
] as const;

/**
 * BreadcrumbList Schema
 * Helps search engines understand site structure
 */
export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://gabrielfamilyclinic.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://gabrielfamilyclinic.com/#services',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Locations',
      item: 'https://gabrielfamilyclinic.com/#locations',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Testimonials',
      item: 'https://gabrielfamilyclinic.com/#testimonials',
    },
  ],
} as const;
