/**
 * Structured Data Component
 * Injects JSON-LD schemas into the page
 */

import { organizationSchema, locationSchemas, breadcrumbSchema } from './schema-org';

/**
 * StructuredData component
 * Renders all JSON-LD structured data for the page
 * Uses dangerouslySetInnerHTML for proper JSON-LD injection
 */
export function StructuredData() {
  return (
    <>
      {/* Organization Schema */}
      <script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      {/* Location Schemas - Each clinic location */}
      {locationSchemas.map((schema, index) => (
        <script
          key={`schema-location-${index}`}
          id={`schema-location-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      
      {/* Breadcrumb Schema */}
      <script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
