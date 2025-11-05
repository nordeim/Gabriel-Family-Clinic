# Phase 3: Create Additional Singapore Clinic Addresses - Detailed Sub-Plan

## Objective
Generate realistic Singapore clinic addresses for the Oakland and Berkeley locations, maintaining authentic Singapore format and providing appropriate phone numbers.

## Singapore Address Format Requirements

### Format Structure
```
[Building Name], [Floor]-[Unit] [Block/Street], Singapore [Postal Code]
```

### Singapore Postal Codes
- 6 digits (100000-828999)
- Marsiling area: 730000-739999
- Orchard area: 238000-239999  
- CBD area: 010000-049999
- Woodlands area: 730000-739999
- Jurong area: 600000-649999

## New Clinic Locations to Create

### Oakland Replacement → Orchard Branch
**Location**: Orchard Road area (premium medical district)
```
Address: Orchard Medical Centre, #08-15 Block 123, Singapore 238855
Phone: 6738 2244
Hours: Mon-Fri: 8am-6pm, Sat: 9am-3pm
```

### Berkeley Replacement → Jurong Branch  
**Location**: Jurong area (western Singapore)
```
Address: Jurong Healthcare Hub, #05-28 Block 456, Singapore 608531
Phone: 6891 5577
Hours: Mon-Fri: 8am-5pm
```

## Detailed Sub-Tasks

### 3.1 Research Authentic Singapore Addresses
**Research Singapore Medical Districts**:
1. **Orchard Area**: Premium medical facilities, high-end clinics
   - Famous for Raffles Hospital, Mount Elizabeth hospitals
   - Premium shopping district with medical facilities
   - High rental area suitable for medical practice

2. **Jurong Area**: West Singapore, residential + industrial
   - Growing healthcare needs in residential areas
   - Good accessibility from western Singapore
   - Government focus on healthcare expansion

3. **Additional Options Considered**:
   - **CBD Area**: Financial district with corporate health
   - **Tampines**: East Singapore, HDB-heavy residential
   - **Woodlands**: North Singapore, near main address

### 3.2 Generate Realistic Singapore Addresses

#### Orchard Branch (Premium Location)
```
Name: "Orchard Medical Centre"
Address: "Orchard Medical Centre, #08-15 Block 123"
City: "Singapore 238855"
Phone: "6738 2244"
```
**Rationale**: 
- Orchard Road is Singapore's premier medical district
- Building name sounds professional and medical
- Floor 8 (medical practices typically on higher floors)
- Unit 15 (realistic unit number)
- Block 123 (realistic numbering)
- Postal code 238855 (valid Orchard area code)

#### Jurong Branch (Residential Location)
```
Name: "Jurong Healthcare Hub"  
Address: "Jurong Healthcare Hub, #05-28 Block 456"
City: "Singapore 608531"
Phone: "6891 5577"
```
**Rationale**:
- Jurong serves growing west Singapore population
- Healthcare hub suggests comprehensive services
- Floor 5 (typical for medical practices)
- Unit 28 (realistic unit number)
- Block 456 (realistic numbering)
- Postal code 608531 (valid Jurong area code)

### 3.3 Generate Singapore Phone Numbers

#### Phone Number Format Rules
- **Singapore Format**: 8 digits (XXXX XXXX)
- **Medical Clinic Numbers**: Typically start with 6XXX XXXX
- **Landline Range**: 6000 0000 - 6999 9999

#### Generated Numbers
```
Orchard Branch: 6738 2244
- Starts with 67 (orchard/medical district code)
- All digits unique, realistic sequence

Jurong Branch: 6891 5577  
- Starts with 68 (western Singapore area)
- Mix of digits, memorable pattern
```

### 3.4 Update Code with New Addresses

**File**: `/workspace/gabriel-clinic/app/page.tsx`
- Update Oakland location object
- Update Berkeley location object
- Ensure consistent formatting

**Schema.org Updates**: `/workspace/gabriel-clinic/components/seo/schema-org.tsx`
- Add new location schemas for Singapore branches
- Update geo-coordinates for each area
- Update email addresses with Singapore domains

### 3.5 Validate Singapore Format
- ✅ Address format follows Singapore conventions
- ✅ Postal codes are valid and in correct ranges
- ✅ Phone numbers follow Singapore 8-digit format
- ✅ Building names sound authentic and professional
- ✅ Unit numbers and floors are realistic

## Singapore Healthcare Context

### Orchard Medical District
- **Reputation**: Singapore's premier medical corridor
- **Location**: Orchard Road, between Orchard and Dhoby Ghaut MRT
- **Demographics**: Affluent residents, expatriates, business district workers
- **Services**: Premium healthcare, specialist clinics, international patients

### Jurong Healthcare Hub  
- **Reputation**: Community-focused healthcare
- **Location**: Jurong East/West, major MRT interchange
- **Demographics**: Local families, industrial workers, aging population
- **Services**: Family medicine, geriatric care, community health

## Technical Implementation

### Updated Location Objects
```javascript
[
  {
    name: "Singapore Main",
    address: "Marsiling Rise, #01-204 Block 131",
    city: "Singapore 730131",
    phone: "6269 6681",
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
  },
  {
    name: "Orchard Medical Centre",
    address: "Orchard Medical Centre, #08-15 Block 123",
    city: "Singapore 238855",
    phone: "6738 2244", 
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm",
  },
  {
    name: "Jurong Healthcare Hub",
    address: "Jurong Healthcare Hub, #05-28 Block 456", 
    city: "Singapore 608531",
    phone: "6891 5577",
    hours: "Mon-Fri: 8am-5pm",
  }
]
```

### Schema.org Integration
- Add 2 new MedicalClinic schemas
- Geo-coordinates for Orchard and Jurong areas
- Email addresses: orchard@gabrielfamilyclinic.com, jurong@gabrielfamilyclinic.com
- Proper Singapore address formatting

## Quality Assurance

### Address Authenticity Checklist
- [ ] Building names sound professional and medical
- [ ] Floor/unit numbers are realistic for Singapore buildings
- [ ] Postal codes are valid and in correct districts
- [ ] Phone numbers follow Singapore format
- [ ] Address format matches Singapore conventions
- [ ] No US-style address elements remain

### SEO Considerations
- Schema.org data updated for all locations
- Local business information accurate
- Singapore postal codes for local search
- Phone numbers with country code +65
- Geographic relevance for Singapore searches

## Phase 3 Success Criteria
- ✅ All 3 locations use authentic Singapore addresses
- ✅ Phone numbers follow Singapore format  
- ✅ Addresses pass authenticity validation
- ✅ Schema.org data updated for all locations
- ✅ Website builds successfully with new addresses
- ✅ No US address remnants in codebase