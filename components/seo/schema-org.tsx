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
      name: 'San Francisco',
    },
    {
      '@type': 'City',
      name: 'Oakland',
    },
    {
      '@type': 'City',
      name: 'San Jose',
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
    '@id': 'https://gabrielfamilyclinic.com/#sf-location',
    name: 'Gabriel Family Clinic - San Francisco',
    description: 'Main clinic location in San Francisco providing comprehensive family medicine services.',
    
    // Parent organization
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Medical Plaza Drive',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94102',
      addressCountry: 'US',
    },
    
    // Geo-coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    
    // Contact
    telephone: '+1-555-GABRIEL',
    email: 'sf@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#sf-location',
    
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
    '@id': 'https://gabrielfamilyclinic.com/#oakland-location',
    name: 'Gabriel Family Clinic - Oakland',
    description: 'Oakland clinic location offering family medicine and urgent care services.',
    
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: '456 Healthcare Blvd',
      addressLocality: 'Oakland',
      addressRegion: 'CA',
      postalCode: '94607',
      addressCountry: 'US',
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.8044,
      longitude: -122.2712,
    },
    
    telephone: '+1-555-OAKLAND',
    email: 'oakland@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#oakland-location',
    
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
    '@id': 'https://gabrielfamilyclinic.com/#sj-location',
    name: 'Gabriel Family Clinic - San Jose',
    description: 'San Jose clinic specializing in senior care and chronic disease management.',
    
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gabriel Family Clinic',
    },
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: '789 Wellness Avenue',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      postalCode: '95113',
      addressCountry: 'US',
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.3382,
      longitude: -121.8863,
    },
    
    telephone: '+1-555-SANJOSE',
    email: 'sanjose@gabrielfamilyclinic.com',
    url: 'https://gabrielfamilyclinic.com/#sj-location',
    
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
