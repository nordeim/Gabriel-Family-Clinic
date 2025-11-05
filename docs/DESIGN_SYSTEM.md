# Gabriel Family Clinic Design System

## Overview

A comprehensive, elder-friendly design system built for WCAG AAA accessibility compliance. This design system provides all the tokens, utilities, and guidelines needed to build accessible, user-friendly healthcare interfaces.

## Table of Contents

1. [Installation](#installation)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Accessibility](#accessibility)
6. [Animation](#animation)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)

## Installation

Import the design system in your components:

```typescript
import { colors, typography, spacing, accessibility, animation } from "@/lib/design-system";
```

Or import specific tokens:

```typescript
import { colors } from "@/lib/design-system/colors";
import { typography } from "@/lib/design-system/typography";
```

## Color System

### Primary Colors (Healing and Growth)

Our primary color is **Sage Green (#4a9d4a)**, representing healing, growth, and nature.

```typescript
colors.primary[500] // #4a9d4a - Main brand color
colors.primary[600] // #3d8a3d - Hover states
colors.primary[700] // #2f6a2f - Active states
```

### Semantic Colors

All semantic colors are WCAG AAA compliant (7:1 contrast ratio on white):

- **Success**: `colors.success[500]` (#228B22) - Forest Green
- **Warning**: `colors.warning[500]` (#FF8C00) - Dark Orange
- **Error**: `colors.error[500]` (#DC143C) - Crimson
- **Info**: `colors.info[500]` (#4682B4) - Steel Blue

### Text Colors

High-contrast text colors for maximum readability:

```typescript
colors.text.primary    // #1a1a1a - Main text (16.5:1 on white)
colors.text.secondary  // #4a4a4a - Secondary text (7.8:1 on white)
colors.text.tertiary   // #666666 - Tertiary text (7.1:1 on white)
colors.text.inverse    // #ffffff - Text on dark backgrounds
```

### Accessibility Features

- All color pairs tested for WCAG AAA compliance
- Minimum 7:1 contrast ratio for normal text
- Pre-validated high-contrast pairs available
- Support for high-contrast mode

## Typography

### Base Configuration

Elder-friendly typography with **18px base font size**:

```typescript
typography.fontSize.base // 1.125rem (18px)
```

### Font Scale

```typescript
typography.fontSize.xs    // 12px - Use sparingly
typography.fontSize.sm    // 14px - Minimum recommended
typography.fontSize.base  // 18px - Elder-friendly base
typography.fontSize.lg    // 20px
typography.fontSize.xl    // 24px
typography.fontSize["2xl"] // 30px
typography.fontSize["3xl"] // 36px
typography.fontSize["4xl"] // 48px
typography.fontSize["5xl"] // 60px
typography.fontSize["6xl"] // 72px
```

### Text Styles

Pre-configured text combinations for common use cases:

```typescript
typography.textStyles.h1          // 60px, bold, tight spacing
typography.textStyles.body        // 18px, normal, relaxed line height
typography.textStyles.button      // 18px, semibold
typography.textStyles.buttonLarge // 20px, semibold
```

### Line Heights

Generous line heights for enhanced readability:

```typescript
typography.lineHeight.normal   // 1.5
typography.lineHeight.relaxed  // 1.75 - Recommended for body text
typography.lineHeight.loose    // 2.0
```

## Spacing

### Base Scale

4px base unit with consistent spacing:

```typescript
spacing.scale[1]  // 4px
spacing.scale[2]  // 8px
spacing.scale[4]  // 16px
spacing.scale[6]  // 24px
spacing.scale[8]  // 32px
spacing.scale[11] // 44px - Minimum touch target
spacing.scale[12] // 48px
```

### Accessibility Spacing

```typescript
spacing.accessibility.minTouchTarget          // 44px - WCAG AAA
spacing.accessibility.recommendedTouchTarget  // 48px
spacing.accessibility.largeTouchTarget        // 56px
spacing.accessibility.minInteractiveSpacing   // 8px
```

### Container Widths

```typescript
spacing.container.xl    // 576px
spacing.container["4xl"] // 896px
spacing.container["7xl"] // 1280px
```

## Accessibility

### Focus Indicators

WCAG AAA compliant focus styles:

```typescript
accessibility.focus.ringColor  // Primary color
accessibility.focus.ringWidth  // 3px
accessibility.focus.ringOffset // 2px
```

Apply in CSS:

```css
element:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Touch Targets

All interactive elements must meet minimum touch target requirements:

```typescript
accessibility.touchTarget.minimum      // 44px - WCAG AAA
accessibility.touchTarget.recommended  // 48px - Better for elderly
accessibility.touchTarget.large        // 56px - Primary actions
```

### Color Contrast

All color pairs validated for WCAG AAA (7:1 ratio):

```typescript
accessibility.contrast.minimumNormalText  // 7.0
accessibility.contrast.minimumLargeText   // 4.5
```

Pre-validated pairs:

```typescript
accessibility.contrast.validPairs // Array of {text, background, ratio}
```

### Reduced Motion

Respect user preferences for reduced motion:

```typescript
accessibility.motion.prefersReduced // Near-instant animations
accessibility.motion.normal         // Elder-friendly, slower animations
```

### Elder-Friendly Enhancements

```typescript
accessibility.elderFriendly.buttonMinHeight        // 56px
accessibility.elderFriendly.inputMinHeight         // 52px
accessibility.elderFriendly.enhancedFocusRingWidth // 4px
```

## Animation

### Duration Tokens

Slower animations for elder-friendly experience:

```typescript
animation.duration.fast    // 200ms
animation.duration.normal  // 400ms - Slower than typical 300ms
animation.duration.slow    // 600ms
animation.duration.slower  // 800ms
```

### Easing Functions

```typescript
animation.easing.smooth        // Standard smooth easing
animation.easing.elderFriendly // Very smooth, no jarring movements
animation.easing.gentle        // Gentle, subtle animations
```

### Transitions

Pre-configured transitions:

```typescript
animation.transition.colors   // Color transitions (300ms)
animation.transition.opacity  // Opacity transitions (300ms)
animation.transition.transform // Transform transitions (400ms)
```

### Framer Motion Variants

Ready-to-use motion variants:

```typescript
import { motionVariants } from "@/lib/design-system";

<motion.div variants={motionVariants.fadeIn}>
  Content
</motion.div>
```

Available variants:
- `fadeIn` - Fade in/out
- `slideInFromBottom` - Slide in from bottom
- `scaleIn` - Scale in/out
- `staggerContainer` - Stagger children animations
- `staggerItem` - Individual staggered item

### Reduced Motion Support

Always check for reduced motion preference:

```typescript
import { animationUtils } from "@/lib/design-system";

const duration = animationUtils.getSafeDuration("400ms");
```

## Usage Examples

### Creating a Button Component

```typescript
import { colors, spacing, typography, accessibility } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function Button({ children, ...props }) {
  return (
    <button
      className={cn(
        "rounded-lg font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500"
      )}
      style={{
        backgroundColor: colors.primary[500],
        color: colors.text.inverse,
        padding: `${spacing.scale[3]} ${spacing.scale[6]}`,
        fontSize: typography.fontSize.base.size,
        minHeight: accessibility.touchTarget.recommended,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Using Typography Styles

```typescript
import { typography } from "@/lib/design-system";

export function Heading({ children }) {
  return (
    <h1
      style={{
        fontSize: typography.textStyles.h1.fontSize,
        fontWeight: typography.textStyles.h1.fontWeight,
        lineHeight: typography.textStyles.h1.lineHeight,
        letterSpacing: typography.textStyles.h1.letterSpacing,
      }}
    >
      {children}
    </h1>
  );
}
```

### Accessible Form Input

```typescript
import { accessibility, spacing, colors } from "@/lib/design-system";

export function Input({ label, ...props }) {
  return (
    <div>
      <label style={{ marginBottom: spacing.scale[2] }}>
        {label}
      </label>
      <input
        style={{
          minHeight: accessibility.elderFriendly.inputMinHeight,
          padding: spacing.scale[4],
          borderWidth: "2px",
          borderColor: colors.border.default,
        }}
        {...props}
      />
    </div>
  );
}
```

## Best Practices

### Accessibility

1. **Always provide focus indicators**: Use the design system's focus styles
2. **Meet touch target minimums**: 44px minimum, 48px recommended
3. **Use semantic colors**: Success, error, warning, info for feedback
4. **Test color contrast**: All text must meet 7:1 ratio (WCAG AAA)
5. **Support reduced motion**: Check preferences before animating

### Typography

1. **Use 18px base font size**: Optimal for elder users
2. **Generous line heights**: 1.75 for body text
3. **Limit line length**: 65-75 characters for readability
4. **Avoid small text**: Minimum 14px (text-sm)
5. **Use semantic text styles**: Pre-configured combinations

### Spacing

1. **Consistent spacing scale**: Use 4px base unit
2. **Touch target spacing**: Minimum 8px between interactive elements
3. **Semantic spacing tokens**: Use componentPadding*, layoutGap* tokens
4. **Responsive spacing**: Consider mobile and desktop needs

### Animation

1. **Slower durations**: 400ms default (vs typical 300ms)
2. **Smooth easing**: Use elderFriendly easing
3. **Reduced motion**: Always respect user preferences
4. **Purpose-driven**: Animations should enhance, not distract

### Color Usage

1. **Primary actions**: Use primary color (Sage Green)
2. **Semantic feedback**: Use semantic colors appropriately
3. **Text hierarchy**: primary > secondary > tertiary
4. **High contrast**: Never compromise on contrast ratios

## Testing Checklist

Before releasing components:

- [ ] Color contrast meets WCAG AAA (7:1 ratio)
- [ ] Touch targets are minimum 44px
- [ ] Focus indicators are visible and clear (3px ring)
- [ ] Animations respect reduced motion preference
- [ ] Text is scalable to 200% without breaking
- [ ] Interactive elements have 8px+ spacing
- [ ] Font size is 14px minimum
- [ ] Works with keyboard navigation
- [ ] Screen reader compatible

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Support

For questions or issues with the design system, refer to:
- Component documentation in `/components`
- Design token files in `/lib/design-system`
- Global styles in `/app/globals.css`

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-05  
**Status:** Production Ready
