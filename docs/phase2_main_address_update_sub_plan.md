# Phase 2: Main Clinic Address Update to Singapore - Detailed Sub-Plan

## Objective
Replace the current San Francisco main clinic address with the provided Singapore location across all components and data structures.

## New Main Address Details
```
Address: Marsiling Rise, #01-204 Block 131, Singapore 730131
Phone: 6269 6681
```

## Detailed Sub-Tasks

### 2.1 Update Main Locations Array (page.tsx)
**Target**: `/workspace/gabriel-clinic/app/page.tsx` - locations array

**Actions**:
1. Replace San Francisco location object:
   ```javascript
   // OLD
   {
     name: "San Francisco Main",
     address: "123 Market Street, Suite 400", 
     city: "San Francisco, CA 94102",
     phone: "(415) 555-0123",
     hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
   }
   
   // NEW
   {
     name: "Singapore Main",
     address: "Marsiling Rise, #01-204 Block 131",
     city: "Singapore 730131", 
     phone: "6269 6681",
     hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
   }
   ```

### 2.2 Update Schema.org Data (schema-org.tsx)
**Target**: `/workspace/gabriel-clinic/components/seo/schema-org.tsx`

**Actions**:
1. Update San Francisco location schema:
   - Change `streetAddress` to "Marsiling Rise, #01-204 Block 131"
   - Change `addressLocality` to "Singapore" 
   - Change `addressRegion` to "" (empty for Singapore)
   - Change `postalCode` to "730131"
   - Change `addressCountry` to "SG"
   - Update geo-coordinates for Singapore location
   - Update telephone to "6269 6681"
   - Update email domain if needed

### 2.3 Update Footer Contact Information
**Target**: `/workspace/gabriel-clinic/app/page.tsx` - footer section

**Actions**:
1. Replace footer address span:
   ```javascript
   // OLD
   <span>123 Market Street, SF, CA 94102</span>
   
   // NEW  
   <span>Marsiling Rise, #01-204 Block 131, Singapore 730131</span>
   ```

### 2.4 Update Phone Number References
**Target**: All components with phone number references

**Actions**:
1. Replace main clinic phone number from "(415) 555-0123" to "6269 6681"
2. Update all `tel:` link hrefs to use Singapore format
3. Update emergency number format consistency
4. Maintain existing phone tracking functionality

### 2.5 Update Area Served Information
**Target**: Schema.org organization schema

**Actions**:
1. Update `areaServed` from US cities to Singapore regions/districts
2. Update medical business description if it mentions specific locations
3. Update service area references throughout

## Technical Considerations

### Singapore Address Format
- Use Singapore postal code format: 6 digits
- Building units follow format: #01-204 
- Block numbers included in address
- No state abbreviation needed (Singapore is a city-state)

### Phone Number Format
- Singapore: 8 digits (XXXX XXXX)
- Remove parentheses and dashes for Singapore format
- Update tel: links to use correct format

### Geo-Coordinates
- Update latitude/longitude for Singapore location
- Research approximate coordinates for Marsiling area
- Ensure coordinates point to actual location

### SEO Impact
- Schema.org updates critical for search rankings
- Local business information accuracy
- Maintain structured data compliance

## Files to Modify

| File | Modification Type | Priority |
|------|------------------|----------|
| `app/page.tsx` | Location array, footer | HIGH |
| `components/seo/schema-org.tsx` | Schema data | HIGH |
| Navigation components | Phone numbers | MEDIUM |
| All CTA buttons | Phone references | MEDIUM |

## Success Criteria
- ✅ Main Singapore address displays correctly in location cards
- ✅ Schema.org data validates for Singapore location
- ✅ Footer shows Singapore address
- ✅ Phone number works as clickable link
- ✅ All components maintain design consistency
- ✅ Singapore format proper throughout

## Testing Requirements
1. Verify address format renders correctly
2. Test phone number click functionality
3. Check schema.org validation
4. Ensure responsive design maintained
5. Validate Singapore postal code format

## Phase 2 Execution Order
1. Update locations array in page.tsx
2. Update schema-org.tsx structured data  
3. Update footer contact information
4. Update all phone number references
5. Test and verify changes