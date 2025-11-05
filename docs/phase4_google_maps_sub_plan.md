# Phase 4: Google Maps Integration for Main Singapore Branch - Detailed Sub-Plan

## Objective
Integrate Google Maps functionality for the main Singapore branch at Marsiling Rise, providing an interactive map component that matches the current design aesthetic.

## New Main Address
```
Marsiling Rise, #01-204 Block 131, Singapore 730131
```

## Technical Requirements

### Google Maps API Integration
- **API Service**: Google Maps JavaScript API
- **Map Type**: Interactive embedded map with controls
- **Map Style**: Professional, clean design matching website aesthetics
- **Responsive**: Mobile and desktop optimized
- **Accessibility**: WCAG AAA compliant

### Design Requirements
- **Color Scheme**: Match blue/teal color palette (#2563EB primary, #10B981 accent)
- **Typography**: Poppins font family consistent with site
- **Layout**: Integrated with existing card-based design system
- **Shadows**: Professional shadow system (no harsh shadows)
- **Borders**: Clean borders matching card styling
- **Spacing**: Consistent with current component spacing

## Detailed Sub-Tasks

### 4.1 Research Google Maps Integration Options
**Options to Consider**:
1. **Google Maps Embed API** (Free, limited customization)
2. **Google Maps JavaScript API** (Requires API key, full control)
3. **Mapbox** (Alternative, requires API key)
4. **Leaflet + OpenStreetMap** (Open source, no API key needed)

**Recommended Approach**: Google Maps Embed API
- ✅ No API key required for basic functionality
- ✅ Good customization options
- ✅ Reliable Google infrastructure
- ✅ Mobile responsive
- ✅ Easy to implement

### 4.2 Create Map Component Structure
**Component Location**: `components/maps/ClinicMap.tsx`

**Component Props**:
```typescript
interface ClinicMapProps {
  address: string;
  clinicName: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  className?: string;
}
```

**Default Values**:
- Address: "Marsiling Rise, #01-204 Block 131, Singapore 730131"
- Clinic Name: "Gabriel Family Clinic - Singapore"
- Zoom: 15 (street level)
- Height: "400px" (responsive)

### 4.3 Design Map Component Styling

#### CSS Classes for Map Integration
```css
.clinic-map-container {
  @apply rounded-xl overflow-hidden shadow-lg border border-neutral-200;
  position: relative;
  min-height: 400px;
}

.clinic-map-wrapper {
  @apply relative w-full h-full;
  border-radius: inherit;
}

.clinic-map-overlay {
  @apply absolute top-4 left-4 bg-white/95 backdrop-blur-sm 
         rounded-lg px-3 py-2 shadow-md border border-white/20;
  z-index: 10;
}

.clinic-map-title {
  @apply font-semibold text-neutral-900 text-sm;
  font-family: 'Poppins', sans-serif;
}

.clinic-map-address {
  @apply text-neutral-600 text-xs mt-1;
}
```

### 4.4 Implement Google Maps Embed
**Approach**: Google Maps Embed URL with parameters

**Generated URL**:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817!2d103.7831!3d1.4382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjYnMTUuMiJOIxAzMwKwNDYnNTkuMSJF!5e0!3m2!1sen!2ssg!4v1234567890
```

**URL Parameters**:
- `pb`: Place ID (if available) or encoded location
- `q`: Query string for location search
- `output`: "embed" for embedded view
- Additional styling parameters

### 4.5 Create Responsive Map Component
**Implementation Strategy**:
1. **Container Component**: Wraps iframe with overlay UI
2. **Loading State**: Skeleton loader while map loads
3. **Error Handling**: Fallback if map fails to load
4. **Mobile Optimization**: Touch-friendly interface
5. **Accessibility**: Proper ARIA labels and keyboard navigation

### 4.6 Integrate Map into Location Cards
**Location**: Update location cards in `/workspace/gabriel-clinic/app/page.tsx`

**Current Structure**:
```jsx
<ElderButton
  variant="outline"
  size="md"
  iconLeft={<MapPin className="w-5 h-5" />}
>
  Get Directions
</ElderButton>
```

**Enhanced Structure**:
```jsx
<div className="space-y-3">
  <ClinicMap
    address={location.address}
    clinicName={location.name}
    className="mb-4"
  />
  <div className="flex gap-2">
    <ElderButton
      variant="outline"
      size="md"
      iconLeft={<ExternalLink className="w-5 h-5" />}
      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, '_blank')}
    >
      Open in Maps
    </ElderButton>
    <ElderButton
      variant="outline"
      size="md"
      iconLeft={<MapPin className="w-5 h-5" />}
      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`, '_blank')}
    >
      Get Directions
    </ElderButton>
  </div>
</div>
```

### 4.7 Add Map Component Styling Integration
**CSS File**: Update `/workspace/gabriel-clinic/app/globals.css`

**Map-specific Styles**:
```css
/* Clinic Map Component Styles */
.clinic-map-container {
  @apply relative overflow-hidden rounded-xl shadow-lg border border-neutral-200;
  transition: all 0.3s ease;
  min-height: 400px;
}

.clinic-map-container:hover {
  @apply shadow-xl border-primary-200;
}

.clinic-map-iframe {
  @apply w-full h-full border-0;
  min-height: 400px;
}

.clinic-map-overlay {
  @apply absolute top-4 left-4 bg-white/95 backdrop-blur-sm 
         rounded-lg px-4 py-3 shadow-lg border border-white/20
         transition-all duration-300;
}

.clinic-map-overlay:hover {
  @apply bg-white shadow-xl;
}

.clinic-map-title {
  @apply font-semibold text-neutral-900 text-base;
  font-family: 'Poppins', sans-serif;
}

.clinic-map-address {
  @apply text-neutral-600 text-sm mt-1 leading-relaxed;
}

/* Responsive Map Styles */
@media (max-width: 768px) {
  .clinic-map-container {
    min-height: 300px;
  }
  
  .clinic-map-iframe {
    min-height: 300px;
  }
  
  .clinic-map-overlay {
    @apply top-2 left-2 right-2;
    max-width: none;
  }
}
```

### 4.8 Implement Interactive Features
**Enhanced Map Functionality**:
1. **Click to Enlarge**: Fullscreen map modal
2. **Directions Button**: Direct link to Google Maps directions
3. **Location Info Panel**: Overlay with clinic details
4. **Zoom Controls**: User-friendly map navigation
5. **Mobile Gestures**: Touch pinch-to-zoom support

### 4.9 Add Loading and Error States
**Loading State**:
```jsx
<div className="clinic-map-container">
  <div className="absolute inset-0 bg-neutral-100 animate-pulse rounded-xl" />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2" />
      <p className="text-neutral-600 text-sm">Loading map...</p>
    </div>
  </div>
</div>
```

**Error State**:
```jsx
<div className="clinic-map-container">
  <div className="absolute inset-0 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center">
    <div className="text-center p-6">
      <MapPin className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
      <p className="text-neutral-600 text-sm">Map temporarily unavailable</p>
      <button className="mt-2 text-primary-600 text-sm hover:text-primary-700 underline">
        View on Google Maps
      </button>
    </div>
  </div>
</div>
```

### 4.10 Accessibility Implementation
**WCAG AAA Compliance**:
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Tab order and focus management
- **Color Contrast**: High contrast for text and interactive elements
- **Alt Text**: Descriptive text for map regions
- **Focus Indicators**: Clear focus rings on interactive elements

### 4.11 Performance Optimization
**Optimization Strategies**:
1. **Lazy Loading**: Load maps only when visible
2. **Image Optimization**: Compress map tiles
3. **Caching**: Browser cache for map data
4. **Progressive Enhancement**: Fallback for slow connections
5. **Bundle Size**: Minimize component overhead

## Integration Points

### Files to Create/Modify
1. **`components/maps/ClinicMap.tsx`** (NEW)
   - Main map component
   - Responsive design
   - Error handling

2. **`app/globals.css`** (UPDATE)
   - Map component styles
   - Responsive breakpoints

3. **`app/page.tsx`** (UPDATE)
   - Integrate map into location cards
   - Add enhanced directional buttons

4. **`types/maps.ts`** (NEW)
   - TypeScript interfaces
   - Map component props

### Dependencies
- **Lucide React**: Icons for map controls
- **Next.js**: Static site compatibility
- **Framer Motion**: Map animation (existing)

## Success Criteria
- ✅ Interactive Google Maps embedded for main Singapore location
- ✅ Map styling matches website design aesthetic
- ✅ Mobile responsive with proper touch controls
- ✅ Loading and error states implemented
- ✅ Accessibility compliant (WCAG AAA)
- ✅ Professional appearance with proper shadows and spacing
- ✅ Fast loading with lazy loading optimization
- ✅ Fallback options for map failures
- ✅ Enhanced directional buttons functional

## Testing Requirements
1. **Visual Testing**: Map appearance on desktop and mobile
2. **Interactive Testing**: Click, zoom, pan functionality
3. **Accessibility Testing**: Screen reader compatibility
4. **Performance Testing**: Load times and smooth interactions
5. **Cross-browser Testing**: Chrome, Safari, Firefox, Edge
6. **Mobile Testing**: Touch gestures and responsive behavior

## Phase 4 Execution Order
1. Create ClinicMap component structure
2. Implement Google Maps embed integration
3. Add responsive styling matching design system
4. Integrate map into location cards
5. Add loading and error states
6. Implement accessibility features
7. Test and optimize performance
8. Verify cross-browser compatibility