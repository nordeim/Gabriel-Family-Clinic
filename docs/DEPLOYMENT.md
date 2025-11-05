# Gabriel Family Clinic - Deployment Guide

## Build & Deployment Instructions

### Prerequisites
- Node.js >=20.9.0
- pnpm package manager

### Build for Production

```bash
# Install dependencies
pnpm install

# Build static export
pnpm build

# The static site will be in the 'out' directory
```

### Deployment Options

#### Option 1: Static Hosting (Vercel, Netlify, etc.)
The site is configured for static export and can be deployed to any static hosting service.

```bash
# Build creates an 'out' directory with static files
# Deploy the 'out' directory to your hosting service
```

#### Option 2: Manual Deployment
```bash
# After building, copy the 'out' directory to your web server
cp -r out/* /var/www/html/
```

### Environment Variables

Before deployment, set up these environment variables:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Enable analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Enable Web Vitals monitoring
NEXT_PUBLIC_ENABLE_WEB_VITALS=true
```

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Check accessibility features (Skip Links, Text Size Control)
- [ ] Verify analytics tracking (GA4 events)
- [ ] Test all CTAs (phone buttons, appointment buttons)
- [ ] Check Core Web Vitals in production
- [ ] Verify HTTPS is enabled
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

### Performance Verification

After deployment, run these tests:

1. **Lighthouse Audit**
   - Open Chrome DevTools
   - Navigate to Lighthouse tab
   - Run audit
   - Target: Performance >90, Accessibility 100

2. **PageSpeed Insights**
   - Visit: https://pagespeed.web.dev/
   - Enter your URL
   - Verify Core Web Vitals are in "Good" range

3. **WAVE Accessibility**
   - Visit: https://wave.webaim.org/
   - Enter your URL
   - Verify WCAG AAA compliance

### Monitoring

- Monitor Web Vitals in GA4
- Check performance trends
- Track user engagement metrics
- Monitor elderly-specific interactions

---

**Note:** This is a static export configured for maximum performance and accessibility. All features work client-side without requiring a Node.js server.
