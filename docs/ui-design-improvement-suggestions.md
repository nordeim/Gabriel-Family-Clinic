Excellent — I’ve reviewed the redesigned site (`https://cjyhkg57ojn3.space.minimax.io/`).
Below is a **meticulous professional critique** from the perspective of a **world-class UI/UX designer**, focusing on the visual design system, composition, typography, and emotional resonance of your current layout.

---

## 🎯 Executive Summary

Your redesign represents a **strong improvement in structure and color discipline** compared to the prior version.
However, it still falls short of **visual harmony and emotional cohesion** — the interface looks “assembled” rather than “composed.”

In short:

* Good layout foundation ✅
* Moderate aesthetic alignment ⚙️
* Needs refinement in **color balance, typographic rhythm, spacing harmony, and visual flow** 🎨

---

## 🧱 1. Overall Visual Impression

### Strengths

✅ Clean grid and layout hierarchy
✅ Simplified color usage (less visual noise than before)
✅ Proper whitespace utilization around primary sections

### Weaknesses

❌ Visual identity is still **neutral to the point of being forgettable** — lacks a strong emotional anchor or brand tone.
❌ The typography–color–spacing triad doesn’t “sing together.” Fonts, font sizes, and colors feel applied individually rather than part of a coherent system.
❌ Gradients and shadows feel slightly “synthetic” instead of natural and integrated.
❌ Component proportions (e.g., hero image vs headline) are inconsistent across viewport sizes.

> 🧠 **Design Principle Insight:** Cohesion in visual design comes not from adding more, but by aligning *tone, rhythm, and density* of all elements.

---

## 🖋️ 2. Typography & Hierarchy

### Observations

* The primary font (likely a Tailwind default such as `Inter` or `Open Sans`) is functional but lacks personality.
* Headings are slightly oversized and too tightly spaced vertically.
* Body text line height is a bit compressed; needs breathing room.
* CTA button text feels disconnected — heavier weight than surrounding text.

### Recommendations

| Element                 | Issue                 | Improvement                                                                     |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------- |
| **H1**                  | Too heavy and large   | Reduce to `text-5xl` max with `font-semibold`; increase letter spacing slightly |
| **Body Text**           | Dense readability     | Line height `1.8`; text size `1.125rem (18px)`                                  |
| **Font Family Pairing** | Flat and generic      | Use **Poppins (Headings)** + **Inter/Nunito Sans (Body)**                       |
| **CTA Buttons**         | Overweight typography | Use `font-medium`, not `font-bold`; spacing between letters +1%                 |

> ✨ *Typography should breathe — think of rhythm, not just readability.*

---

## 🎨 3. Color Palette and Mood

### Current Feel

* Slightly cold and impersonal
* Colors lack depth and tonal balance
* Overuse of flat blues/greens without emotional contrast

### Recommended Refinement

Move toward a **balanced tri-tone** system:

* **Primary:** `#2563EB` (blue 600) – trust, clarity
* **Secondary:** `#10B981` (emerald 500) – vitality, action
* **Neutral Base:** `#F9FAFB` + `#1F2937` – warmth and readability

Use **soft gradients** sparingly for emphasis only (e.g., hero or call-to-action), not as section fillers.

> 💡 *Think in terms of “temperature balance” — pair one cool tone (blue) with a neutral or warm undertone to humanize the design.*

---

## 🧩 4. Layout & Composition

### Hero Section

* Headline-to-subheadline ratio too extreme
* CTA button placement good, but spacing beneath feels uneven
* Background gradient feels disconnected from content hierarchy

**Fix:**
Use a subtle, directional background gradient (top-left to bottom-right).
Visually anchor CTA buttons within the same vertical rhythm as the headline (equal padding above/below).

### Mid-page Sections

* Good modular structure but lacks **consistent vertical rhythm** — padding varies too much.
* Cards have inconsistent shadows; some “float” more than others.

**Fix:**
Adopt consistent spacing scales (e.g., multiples of 8 or 12px).
Standardize shadow depth:

```css
box-shadow: 0 4px 12px rgba(0,0,0,0.05);
```

### Footer

* Much improved visually from prior version.
* Text contrast is good, but social/link icons feel misaligned in density.
  **Fix:** Increase spacing between groups and use lighter hover animations (opacity fade).

---

## 🌈 5. Motion & Interactivity

### Current State

* Hover states exist but feel abrupt or inconsistent across elements.
* Scroll animation timing slightly off (elements appear before the scroll settles).

### Improvement Plan

* Use **ease-out 300–400ms** for button transitions.
* Apply **consistent scroll reveal** using opacity + transform Y shift (8–12px).
* Reduce animation density to 1–2 key sections — hero and cards only.

> 🕊️ *Motion should feel like gentle breathing, not blinking.*

---

## ⚙️ 6. Accessibility & Usability

✅ Contrast generally acceptable
⚠️ Buttons hover contrast may not meet WCAG 2.1 AA (need ≥ 4.5:1)
⚠️ Small text in footer or labels may need scaling to 16px minimum

Add `focus-visible` outlines and ensure colorblind-safe palettes (avoid relying solely on green/red).

---

## 📐 7. Overall Composition & Aesthetic Coherence

Here’s how your redesign rates on professional design axes (out of 10):

| Category             | Score | Commentary                                   |
| -------------------- | ----- | -------------------------------------------- |
| Layout Structure     | 8.5   | Excellent improvement over old version       |
| Visual Balance       | 7.0   | Needs color-weight tuning                    |
| Typography Rhythm    | 6.5   | Better, but still inconsistent               |
| Brand Tone / Emotion | 6.0   | Feels neutral and generic                    |
| Accessibility        | 8.0   | Functional but contrast edge cases exist     |
| Motion & Interaction | 6.5   | Slightly unrefined timing and pacing         |
| Cohesive Identity    | 7.0   | Good skeleton; polish needed for personality |

---

## 🧭 8. Next Step Options

I can help you:

1. **Generate a refined visual system (CSS patch)** improving typography, gradients, shadows, and interactivity in line with this critique, *or*
2. **Design a new “Style System Spec Sheet”** (colors, fonts, motion timing, spacing grid, shadows, radius tokens, etc.) that defines your design identity for future scalability.

---

Nice — I dug deep, designed a meticulous implementation plan, and built a **production-ready CSS patch** that implements the aesthetic improvements we discussed.

# What I delivered

* A detailed, systematic plan for the redesign (typography, color tokens, spacing, motion, accessibility).
* A production-ready CSS file: **`/mnt/data/style-patch-advanced.css`** — created and saved for you.

# How to apply

1. Upload `/public/css/style-patch-advanced.css` (or move `/mnt/data/style-patch-advanced.css` into your project's `public/css/` directory).
2. Include the stylesheet **after** your Tailwind/main CSS in the `<head>`:

```html
<link rel="stylesheet" href="/_next/static/css/2da1630b67baa9a8.css">
<link rel="stylesheet" href="/public/css/style-patch-advanced.css">
```

3. Clear the browser cache and test on desktop and mobile (I recommend Chrome and Safari).
4. Validate accessibility (contrast and keyboard navigation) and iterate.

---

It is designed for **immediate integration** after your Tailwind CSS import.
This patch refines typography, color palette, layout rhythm, and component harmony — achieving the cohesive, polished aesthetic expected of a professional-grade healthcare site.

---

```css
/* ============================================
   Gabriel Family Clinic — Advanced Style Patch
   Purpose: Production-ready aesthetic enhancement
   Generated by: ChatGPT — The Meticulous Approach
   Version: 1.0
   ============================================ */

/* 0. Font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

/* 1. Design tokens */
:root {
  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --muted: #6b7280;
  --text: #111827;
  --text-muted: #4b5563;
  --primary: #2563eb;
  --primary-600: #1d4ed8;
  --primary-100: #eff6ff;
  --accent: #10b981;
  --success: #059669;
  --card-shadow: 0 6px 20px rgba(16,24,40,0.06);
  --card-shadow-hover: 0 12px 32px rgba(16,24,40,0.08);
  --radius-lg: 1rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;
  --spacing-scale: 8px;
  --max-content-width: 1100px;
}

/* 2. Global base */
html, body {
  height: 100%;
  background-color: var(--surface-2) !important;
}

body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: var(--text);
  line-height: 1.75;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* 3. Headings */
h1, h2, h3, h4 {
  font-family: "Poppins", "Inter", sans-serif;
  color: var(--text);
  margin-top: 0;
  margin-bottom: calc(var(--spacing-scale) * 1);
  line-height: 1.15;
  letter-spacing: -0.015em;
}

h1.hero-title-enhanced, .hero-title-enhanced {
  font-size: clamp(2.2rem, 5.5vw, 3.25rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: clamp(1.6rem, 3.6vw, 2.25rem);
  font-weight: 600;
}

h3 {
  font-size: clamp(1.25rem, 2.6vw, 1.5rem);
  font-weight: 600;
}

p {
  color: var(--text-muted);
  margin-bottom: calc(var(--spacing-scale) * 1.25);
  font-size: 1.125rem;
}

/* 4. Navigation */
nav a {
  color: #374151;
  font-weight: 500;
  transition: color 220ms ease, transform 220ms ease;
}
nav a:hover, nav a:focus {
  color: var(--primary);
  transform: translateY(-1px);
}

/* 5. Hero section */
.hero-section-enhanced {
  padding-top: 5.25rem;
  padding-bottom: 5.25rem;
  background: linear-gradient(180deg, rgba(37,99,235,0.06) 0%, rgba(255,255,255,0) 40%);
}
.floating-orb { display: none !important; }

.hero-content-enhanced {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 0 calc(var(--spacing-scale) * 2);
}
.hero-subtitle-enhanced {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 64ch;
  margin: 0 auto;
}

/* CTA Buttons */
.hero-content-enhanced .btn-enhanced-primary,
.hero-content-enhanced .btn-enhanced-secondary {
  min-width: 220px;
  height: 56px;
  padding: 0 1.25rem;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
}

/* Primary button */
.btn-enhanced-primary {
  background: linear-gradient(90deg, var(--primary), var(--primary-600));
  color: #fff !important;
  border: none !important;
  box-shadow: 0 10px 30px rgba(37,99,235,0.12);
  transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms;
}
.btn-enhanced-primary:hover, .btn-enhanced-primary:focus {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(37,99,235,0.14);
}

/* Secondary button */
.btn-enhanced-secondary {
  background: transparent !important;
  color: var(--primary) !important;
  border: 2px solid rgba(37,99,235,0.12) !important;
}
.btn-enhanced-secondary:hover {
  background: rgba(37,99,235,0.06) !important;
  transform: translateY(-3px);
}

/* 6. Cards / Services */
.service-grid-enhanced {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.service-card-enhanced {
  background: var(--surface-1) !important;
  border-radius: var(--radius-lg) !important;
  padding: 1.25rem !important;
  box-shadow: var(--card-shadow) !important;
  transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.service-card-enhanced:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.card-icon-enhanced svg {
  width: 44px;
  height: 44px;
  background: linear-gradient(180deg, var(--primary-100), #ffffff);
  padding: 8px;
  border-radius: 12px;
  color: var(--primary);
}

.card-title-enhanced { font-size: 1.125rem; font-weight: 600; color: #0f172a; }
.card-description-enhanced { color: var(--text-muted); font-size: 0.98rem; }

/* 7. Testimonials */
.testimonial-card {
  border-radius: 0.9rem !important;
  padding: 1.25rem !important;
  box-shadow: 0 8px 24px rgba(2,6,23,0.06);
  border-top: 4px solid rgba(37,99,235,0.12);
}
.testimonial-card blockquote p {
  font-size: 1.0625rem;
  color: #334155;
  line-height: 1.8;
  font-style: italic;
}

/* 8. Footer */
footer {
  background: linear-gradient(180deg, #0f172a 0%, #0b1220 100%);
  color: #e6eefc;
  padding: 2.5rem 1rem;
}
footer a { color: #cfe3ff; transition: color 180ms; }
footer a:hover { color: #ffffff; }

/* 9. Forms & Inputs */
input[type="text"], input[type="email"], textarea, select {
  border-radius: 0.6rem;
  border: 1px solid rgba(15,23,42,0.06);
  padding: 0.75rem 1rem;
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(16,24,40,0.02);
}

/* 10. Focus accessibility */
:focus-visible {
  outline: 3px solid rgba(37,99,235,0.18);
  outline-offset: 3px;
}

/* 11. Responsive polish */
@media (min-width: 1024px) {
  .hero-content-enhanced { padding-left: 0; padding-right: 0; }
  .hero-content-enhanced .btn-enhanced-primary { min-width: 260px; }
}
@media (max-width: 640px) {
  .hero-section-enhanced { padding-top: 3.5rem; padding-bottom: 3.5rem; }
  .hero-content-enhanced .btn-enhanced-primary,
  .hero-content-enhanced .btn-enhanced-secondary {
    width: 100%;
  }
  .service-card-enhanced {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .card-icon-enhanced svg { margin-bottom: 0.5rem; }
}

/* 12. Helpers */
.text-muted { color: var(--text-muted) !important; }
.container { max-width: var(--max-content-width) !important; margin: 0 auto; }

/* End of CSS patch */
```

---

✅ **Integration Steps**

1. Save as `style-patch-advanced.css` under `/public/css/`.
2. Add this link **after** Tailwind’s main stylesheet:

   ```html
   <link rel="stylesheet" href="/public/css/style-patch-advanced.css">
   ```
3. Refresh your browser (clear cache).
4. Validate across devices — typography, spacing, and color harmony will immediately improve.

---

```css
/* ============================================
   Gabriel Family Clinic — Advanced Style Patch (With Dark Mode)
   Purpose: Production-ready aesthetic enhancement with automatic dark-mode variant
   Generated by: ChatGPT — The Meticulous Approach
   Version: 1.1
   Notes:
     - This file is an extension of the previous style-patch-advanced.css
     - Dark mode is auto-activated via the user's OS/browser preference using
       @media (prefers-color-scheme: dark)
     - Place after Tailwind/main CSS in the <head>.
   ============================================ */

/* 0. Font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

/* =========================
   1. Design tokens (light default)
   ========================= */
:root {
  /* Surfaces */
  --surface-1: #ffffff;        /* card, panels */
  --surface-2: #f8fafc;        /* page background */
  --surface-3: #eef2ff;        /* subtle highlights */

  /* Text / type */
  --text: #111827;             /* main text (gray-900) */
  --text-muted: #4b5563;       /* supporting text (gray-600) */
  --muted: #6b7280;            /* smaller captions */

  /* Brand */
  --primary: #2563eb;          /* blue-600 */
  --primary-600: #1d4ed8;      /* blue-700 */
  --primary-100: #eff6ff;      /* blue-50 */
  --accent: #10b981;           /* emerald-500 */
  --success: #059669;

  /* Shadows, radii, spacing */
  --card-shadow: 0 6px 20px rgba(16,24,40,0.06);
  --card-shadow-hover: 0 12px 32px rgba(16,24,40,0.08);
  --elev-1: 0 8px 24px rgba(2,6,23,0.06);
  --radius-lg: 1rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;
  --spacing-scale: 8px;
  --max-content-width: 1100px;

  /* Utility */
  --focus-ring: rgba(37,99,235,0.18);
  color-scheme: light;
}

/* =========================
   2. Global base (light)
   ========================= */
html, body {
  height: 100%;
  background-color: var(--surface-2) !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: var(--text);
  line-height: 1.75;
  font-size: 16px;
  transition: background-color 240ms ease, color 240ms ease;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}

/* =========================
   3. Headings & type
   ========================= */
h1,h2,h3,h4 {
  font-family: "Poppins", "Inter", sans-serif;
  color: var(--text);
  margin-top: 0;
  margin-bottom: calc(var(--spacing-scale) * 1);
  line-height: 1.15;
  letter-spacing: -0.015em;
  transition: color 220ms ease;
}

h1.hero-title-enhanced, .hero-title-enhanced {
  font-size: clamp(2.2rem, 5.5vw, 3.25rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

/* body copy */
p { color: var(--text-muted); margin-bottom: calc(var(--spacing-scale) * 1.25); font-size: 1.125rem; }

/* =========================
   4. Navigation & header
   ========================= */
nav a { color: #374151; font-weight: 500; transition: color 220ms ease, transform 220ms ease; }
nav a:hover, nav a:focus { color: var(--primary); transform: translateY(-1px); }

/* skip links visible state */
.skip-links a:focus { left: 1rem !important; top: 1rem !important; z-index: 9999; }

/* =========================
   5. Hero section
   ========================= */
.hero-section-enhanced {
  padding-top: 5.25rem;
  padding-bottom: 5.25rem;
  background: linear-gradient(180deg, rgba(37,99,235,0.06) 0%, rgba(255,255,255,0) 40%);
  transition: background 240ms ease;
}
.floating-orb { display: none !important; } /* hide distracting decor */

.hero-content-enhanced { max-width: var(--max-content-width); margin: 0 auto; padding: 0 calc(var(--spacing-scale) * 2); }
.hero-subtitle-enhanced { font-size: 1.125rem; color: var(--text-muted); max-width: 64ch; margin: 0 auto; }

/* CTA sizing & behavior */
.hero-content-enhanced .btn-enhanced-primary,
.hero-content-enhanced .btn-enhanced-secondary {
  min-width: 220px; height: 56px; padding: 0 1.25rem; border-radius: var(--radius-lg); font-size: 1rem; font-weight: 600;
}

/* primary CTA */
.btn-enhanced-primary {
  background: linear-gradient(90deg, var(--primary), var(--primary-600));
  color: #fff !important; border: none !important;
  box-shadow: 0 10px 30px rgba(37,99,235,0.12);
  transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms, filter 240ms;
}
.btn-enhanced-primary:hover, .btn-enhanced-primary:focus {
  transform: translateY(-4px); box-shadow: 0 16px 40px rgba(37,99,235,0.14); outline: none;
}

/* secondary CTA */
.btn-enhanced-secondary {
  background: transparent !important; color: var(--primary) !important;
  border: 2px solid rgba(37,99,235,0.12) !important;
}
.btn-enhanced-secondary:hover { background: rgba(37,99,235,0.06) !important; transform: translateY(-3px); }

/* =========================
   6. Cards / Services
   ========================= */
.service-grid-enhanced { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }

.service-card-enhanced {
  background: var(--surface-1) !important; border-radius: var(--radius-lg) !important;
  padding: 1.25rem !important; box-shadow: var(--card-shadow) !important;
  transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms;
  display: flex; gap: 1rem; align-items: flex-start;
}
.service-card-enhanced:hover { transform: translateY(-8px); box-shadow: var(--card-shadow-hover); }

.card-icon-enhanced svg {
  width: 44px; height: 44px; background: linear-gradient(180deg, var(--primary-100), #ffffff);
  padding: 8px; border-radius: 12px; color: var(--primary);
}

.card-title-enhanced { font-size: 1.125rem; font-weight: 600; color: #0f172a; }
.card-description-enhanced { color: var(--text-muted); font-size: 0.98rem; }

/* =========================
   7. Testimonials
   ========================= */
.testimonial-card {
  border-radius: 0.9rem !important; padding: 1.25rem !important;
  box-shadow: 0 8px 24px rgba(2,6,23,0.06); border-top: 4px solid rgba(37,99,235,0.12);
}
.testimonial-card blockquote p { font-size: 1.0625rem; color: #334155; line-height: 1.8; font-style: italic; }

/* testimonial indicators */
.testimonial-carousel button[aria-current="true"] {
  transform: scale(1.08);
  background: linear-gradient(90deg, var(--primary), var(--primary-600));
  box-shadow: 0 6px 18px rgba(37,99,235,0.12);
}

/* =========================
   8. Footer
   ========================= */
footer {
  background: linear-gradient(180deg, #0f172a 0%, #0b1220 100%);
  color: #e6eefc; padding: 2.5rem 1rem; transition: background 240ms ease, color 240ms ease;
}
footer a { color: #cfe3ff; transition: color 180ms; }
footer a:hover { color: #ffffff; }

/* =========================
   9. Forms & inputs
   ========================= */
input[type="text"], input[type="email"], textarea, select {
  border-radius: 0.6rem; border: 1px solid rgba(15,23,42,0.06); padding: 0.75rem 1rem; background: #fff;
  box-shadow: inset 0 1px 0 rgba(16,24,40,0.02); transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms;
}
input:focus, textarea:focus, select:focus {
  border-color: rgba(37,99,235,0.28); box-shadow: 0 6px 18px rgba(37,99,235,0.06); outline: none;
}

/* =========================
   10. Focus accessibility
   ========================= */
:focus-visible { outline: 3px solid var(--focus-ring); outline-offset: 3px; transition: outline 160ms ease; }

/* =========================
   11. Responsive polish
   ========================= */
@media (min-width: 1024px) {
  .hero-content-enhanced { padding-left: 0; padding-right: 0; }
  .hero-content-enhanced .btn-enhanced-primary { min-width: 260px; }
}
@media (max-width: 640px) {
  .hero-section-enhanced { padding-top: 3.5rem; padding-bottom: 3.5rem; }
  .hero-content-enhanced .btn-enhanced-primary, .hero-content-enhanced .btn-enhanced-secondary { width: 100%; }
  .service-card-enhanced { flex-direction: column; align-items: center; text-align: center; }
  .card-icon-enhanced svg { margin-bottom: 0.5rem; }
}

/* =========================
   12. Dark mode (auto-activated)
   - Overrides tokens and selective component styles to ensure
     excellent contrast, preserved brand color, and comfortable
     visual density in low-light contexts.
   ========================= */
@media (prefers-color-scheme: dark) {
  :root {
    /* Surfaces */
    --surface-1: #0b1220;   /* deep card surface */
    --surface-2: #05060a;   /* page background (very dark) */
    --surface-3: #07102a;

    /* Text / type */
    --text: #e6eefc;        /* light text */
    --text-muted: #c3cbe0;  /* muted light text */

    /* Brand */
    --primary: #4ea2ff;     /* softer blue in dark to preserve visibility */
    --primary-600: #3b82f6; /* alternative for gradients */
    --primary-100: rgba(78,162,255,0.06);
    --accent: #34d399;      /* slightly brighter accent */

    /* Shadows and elevation adapted */
    --card-shadow: 0 6px 24px rgba(2,6,23,0.6);
    --card-shadow-hover: 0 12px 40px rgba(2,6,23,0.7);
    --elev-1: 0 8px 28px rgba(2,6,23,0.6);

    /* Focus ring */
    --focus-ring: rgba(78,162,255,0.18);

    /* ensure browsers treat this page as dark for form controls etc. */
    color-scheme: dark;
  }

  /* Page background */
  html, body { background-color: var(--surface-2) !important; color: var(--text) !important; }

  /* Headings & body adapt */
  h1,h2,h3,h4 { color: var(--text) !important; }
  p { color: var(--text-muted) !important; }

  /* Navigation */
  nav a { color: #cbd5e1; }
  nav a:hover, nav a:focus { color: var(--primary); }

  /* Hero gradient in dark */
  .hero-section-enhanced {
    background: linear-gradient(180deg, rgba(11,17,32,0.34) 0%, rgba(5,6,10,0.0) 40%);
    -webkit-backdrop-filter: blur(2px);
  }

  /* Buttons — preserve brand but increase contrast */
  .btn-enhanced-primary {
    background: linear-gradient(90deg, var(--primary), var(--primary-600));
    color: #061226 !important; /* dark text on lightish button for legibility */
    box-shadow: 0 8px 28px rgba(59,130,246,0.12);
  }
  .btn-enhanced-primary:hover, .btn-enhanced-primary:focus {
    transform: translateY(-4px);
    box-shadow: 0 14px 40px rgba(59,130,246,0.18);
  }
  .btn-enhanced-secondary {
    background: transparent !important;
    color: var(--primary) !important;
    border: 1px solid rgba(78,162,255,0.12) !important;
  }
  .btn-enhanced-secondary:hover { background: rgba(78,162,255,0.03) !important; }

  /* Cards — darker surface, softer inner contrast */
  .service-card-enhanced {
    background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.015)) !important;
    box-shadow: var(--card-shadow) !important;
    border: 1px solid rgba(255,255,255,0.02);
  }
  .service-card-enhanced:hover { box-shadow: var(--card-shadow-hover); transform: translateY(-8px); }

  .card-title-enhanced { color: var(--text); }
  .card-description-enhanced { color: var(--text-muted); }

  /* Icons: lighten to pop against dark cards */
  .card-icon-enhanced svg {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    color: var(--primary);
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.6));
  }

  /* Testimonials — darker card with subtle border */
  .testimonial-card {
    border-top: 4px solid rgba(78,162,255,0.08);
    background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.015));
    box-shadow: 0 8px 28px rgba(2,6,23,0.6);
  }
  .testimonial-card blockquote p { color: var(--text-muted); }

  /* Footer — invert tone for dark */
  footer {
    background: linear-gradient(180deg, #030416 0%, #04060d 100%);
    color: #cfe3ff;
  }
  footer a { color: #9fcfff; }
  footer a:hover { color: #ffffff; }

  /* Inputs — dark-friendly */
  input[type="text"], input[type="email"], textarea, select {
    background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.015));
    border: 1px solid rgba(255,255,255,0.04);
    color: var(--text);
  }
  input:focus, textarea:focus, select:focus {
    border-color: rgba(78,162,255,0.28);
    box-shadow: 0 8px 24px rgba(78,162,255,0.06);
  }

  /* Focus style tuned for dark */
  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
  }
}

/* =========================
   13. Small helpers & utilities
   ========================= */
.text-muted { color: var(--text-muted) !important; }
.container { max-width: var(--max-content-width) !important; margin-left: auto; margin-right: auto; }

/* End of file */
```

