# Component Library Documentation

## Gabriel Family Clinic - Core UI Components

This document provides comprehensive documentation for all UI and accessibility components in the Gabriel Family Clinic healthcare platform.

## Table of Contents

1. [UI Components](#ui-components)
   - [ElderButton](#elderbutton)
   - [ElderCard](#eldercard)
2. [Accessibility Components](#accessibility-components)
   - [TextSizeControl](#textsizecontrol)
   - [SkipLink](#skiplink)
   - [FocusManager](#focusmanager)
   - [LiveRegion](#liveregion)
   - [VisuallyHidden](#visuallyhidden)

---

## UI Components

### ElderButton

Elder-friendly button component with WCAG AAA compliance.

#### Features

- Minimum 44px touch targets (WCAG AAA)
- High contrast focus indicators (3px ring, 2px offset)
- Loading and disabled states
- Multiple variants and sizes
- Icon support (left and right)
- Keyboard accessible
- Screen reader optimized

#### Usage

```typescript
import { ElderButton } from "@/components/ui";

// Basic usage
<ElderButton>Click me</ElderButton>

// With variant
<ElderButton variant="primary">Primary</ElderButton>
<ElderButton variant="secondary">Secondary</ElderButton>
<ElderButton variant="outline">Outline</ElderButton>
<ElderButton variant="ghost">Ghost</ElderButton>
<ElderButton variant="destructive">Delete</ElderButton>

// With size
<ElderButton size="sm">Small (40px)</ElderButton>
<ElderButton size="md">Medium (48px)</ElderButton>
<ElderButton size="lg">Large (56px)</ElderButton>
<ElderButton size="xl">Extra Large (64px)</ElderButton>

// With loading state
<ElderButton loading>Loading...</ElderButton>

// With disabled state
<ElderButton disabled>Disabled</ElderButton>

// With icons
<ElderButton iconLeft={<ChevronLeft />}>Back</ElderButton>
<ElderButton iconRight={<ChevronRight />}>Next</ElderButton>

// Full width
<ElderButton fullWidth>Full Width Button</ElderButton>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | `"primary"` | Button variant |
| size | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Button size |
| loading | `boolean` | `false` | Show loading spinner |
| disabled | `boolean` | `false` | Disable button |
| iconLeft | `React.ReactNode` | - | Icon before text |
| iconRight | `React.ReactNode` | - | Icon after text |
| fullWidth | `boolean` | `false` | Full width button |
| asChild | `boolean` | `false` | Render as child component |

#### Accessibility

- Meets WCAG AAA touch target size (44px minimum)
- High contrast focus ring (3px solid, 2px offset)
- Loading state announced to screen readers (`aria-busy="true"`)
- Disabled state properly marked (`aria-disabled="true"`)
- Icons marked as decorative (`aria-hidden="true"`)

---

### ElderCard

Card component with glass-morphism design and semantic HTML structure.

#### Features

- Glass-morphism effect with backdrop blur
- Multiple variants (default, elevated, outlined, glass)
- Semantic HTML structure (article, section, div)
- Proper heading hierarchy (h2, h3, h4)
- Generous padding options
- Hover and focus states
- Framer Motion animations

#### Usage

```typescript
import { ElderCard } from "@/components/ui";

// Basic usage
<ElderCard>
  <p>Card content</p>
</ElderCard>

// With title
<ElderCard title="Card Title" titleLevel="h2">
  <p>Card content with heading</p>
</ElderCard>

// With header and footer
<ElderCard
  header={<div>Custom header</div>}
  footer={<div>Custom footer</div>}
>
  <p>Card content</p>
</ElderCard>

// Variants
<ElderCard variant="default">Default card</ElderCard>
<ElderCard variant="elevated">Elevated card</ElderCard>
<ElderCard variant="outlined">Outlined card</ElderCard>
<ElderCard variant="glass">Glass morphism</ElderCard>

// Padding options
<ElderCard padding="sm">Small padding</ElderCard>
<ElderCard padding="md">Medium padding</ElderCard>
<ElderCard padding="lg">Large padding</ElderCard>

// Semantic HTML
<ElderCard as="article" title="Article Title" titleLevel="h2">
  <p>Article content</p>
</ElderCard>

// Hoverable
<ElderCard hoverable onClick={() => console.log("clicked")}>
  <p>Click me!</p>
</ElderCard>

// Without animation
<ElderCard animated={false}>
  <p>Static card (no animation)</p>
</ElderCard>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "elevated" \| "outlined" \| "glass"` | `"default"` | Card variant |
| padding | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Internal padding |
| hoverable | `boolean` | `false` | Enable hover effects |
| as | `"article" \| "section" \| "div"` | `"div"` | Semantic element |
| title | `string` | - | Card title |
| titleLevel | `"h2" \| "h3" \| "h4"` | `"h3"` | Heading level |
| header | `React.ReactNode` | - | Custom header |
| footer | `React.ReactNode` | - | Custom footer |
| animated | `boolean` | `true` | Enable animations |

#### Accessibility

- Semantic HTML structure (article, section)
- Proper heading hierarchy (h2, h3, h4)
- Focus management for interactive cards
- Respects reduced motion preferences

---

## Accessibility Components

### TextSizeControl

Text size adjustment controls for elder-friendly reading.

#### Features

- Three size levels: normal (18px), large (22px), extra-large (26px)
- Persistent storage using localStorage
- Keyboard navigation (arrow keys, Home)
- ARIA live announcements
- Visual indicators
- Smooth transitions (200ms)

#### Usage

```typescript
import { TextSizeControl } from "@/components/accessibility";

// Basic usage
<TextSizeControl />

// With default size
<TextSizeControl defaultSize="large" />

// With callback
<TextSizeControl
  onSizeChange={(size) => console.log("Size changed to:", size)}
/>

// Custom styling
<TextSizeControl className="my-custom-class" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultSize | `"normal" \| "large" \| "extra-large"` | `"normal"` | Initial size |
| onSizeChange | `(size: TextSize) => void` | - | Callback on change |
| className | `string` | - | Additional classes |

#### Keyboard Navigation

- **Arrow Up/Right**: Increase text size
- **Arrow Down/Left**: Decrease text size
- **Home**: Reset to normal size

#### Accessibility

- Minimum 44px touch targets
- ARIA live announcements for size changes
- Keyboard navigation support
- Visual indicators for current size
- Persistent preferences (localStorage)

---

### SkipLink

Skip navigation link for keyboard users.

#### Features

- Hidden by default, visible on focus
- High contrast styling
- Links to main content area
- WCAG AAA compliant
- Fixed positioning when focused

#### Usage

```typescript
import { SkipLink, SkipLinks } from "@/components/accessibility";

// Single skip link
<SkipLink href="#main-content">
  Skip to main content
</SkipLink>

// Multiple skip links
<SkipLinks
  links={[
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#footer", label: "Skip to footer" },
  ]}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| href | `string` | `"#main-content"` | Target element ID |
| children | `React.ReactNode` | `"Skip to main content"` | Link text |
| className | `string` | - | Additional classes |

#### Accessibility

- Positioned off-screen by default
- Visible on keyboard focus (Tab)
- High contrast colors (primary on white)
- 4px focus ring for visibility
- Minimum 44px touch target

---

### FocusManager

Global focus management for accessibility.

#### Features

- Focus trap for modals/dialogs
- Focus restoration
- Tab order management
- Keyboard event handling

#### Usage

```typescript
import { FocusManager } from "@/components/accessibility";

// Basic focus trap
<FocusManager trap>
  <div>Content with trapped focus</div>
</FocusManager>

// With focus restoration
<FocusManager trap restoreFocus>
  <Modal>Modal content</Modal>
</FocusManager>

// With initial focus
<FocusManager trap initialFocus="#first-input">
  <form>
    <input id="first-input" />
  </form>
</FocusManager>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trap | `boolean` | `false` | Enable focus trap |
| restoreFocus | `boolean` | `true` | Restore focus on unmount |
| initialFocus | `string` | - | Initial focus selector |

---

### LiveRegion

ARIA live region for dynamic content announcements.

#### Features

- Screen reader announcements
- Polite and assertive modes
- Atomic announcements
- Auto-clear functionality

#### Usage

```typescript
import { LiveRegion, useLiveRegion } from "@/components/accessibility";

// Direct usage
<LiveRegion message="Form submitted successfully" politeness="polite" />

// With hook
function MyComponent() {
  const { message, announce } = useLiveRegion();
  
  const handleSubmit = () => {
    // ... submit logic
    announce("Form submitted successfully");
  };
  
  return (
    <>
      <LiveRegion message={message} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

// Auto-clear
<LiveRegion
  message="Notification"
  clearDelay={3000}
  politeness="assertive"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | `string` | `""` | Message to announce |
| politeness | `"polite" \| "assertive"` | `"polite"` | Politeness level |
| atomic | `boolean` | `true` | Atomic announcement |
| clearDelay | `number` | - | Auto-clear delay (ms) |

---

### VisuallyHidden

Hide content visually but keep accessible to screen readers.

#### Features

- Content hidden from visual display
- Accessible to screen readers
- Follows WCAG guidelines
- Focusable option for interactive elements

#### Usage

```typescript
import { VisuallyHidden } from "@/components/accessibility";

// Basic usage
<VisuallyHidden>
  This text is hidden visually but read by screen readers
</VisuallyHidden>

// Focusable (useful for skip links)
<VisuallyHidden focusable>
  <a href="#content">Skip to content</a>
</VisuallyHidden>

// With custom styling
<VisuallyHidden className="custom-class">
  Hidden content
</VisuallyHidden>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| focusable | `boolean` | `false` | Make visible on focus |
| className | `string` | - | Additional classes |

---

## Best Practices

### Component Usage

1. **Always use ElderButton for actions**: Ensures consistent touch targets and accessibility
2. **Use semantic HTML**: Choose appropriate `as` prop for ElderCard (article, section)
3. **Include TextSizeControl**: Allow users to adjust text size
4. **Add SkipLinks**: Essential for keyboard navigation
5. **Use LiveRegion for dynamic content**: Announce changes to screen readers

### Accessibility Guidelines

1. **Touch Targets**: All interactive elements meet 44px minimum
2. **Focus Indicators**: Always visible, high contrast (3px ring)
3. **Color Contrast**: WCAG AAA (7:1 ratio minimum)
4. **Keyboard Navigation**: All components keyboard accessible
5. **Screen Readers**: Proper ARIA attributes and announcements

### Testing

Run tests with:
```bash
pnpm test
```

Test accessibility with:
```bash
pnpm test:a11y
```

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-05  
**Status:** Production Ready
