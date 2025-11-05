/**
 * Gabriel Family Clinic - Component Library
 * Elder-friendly, WCAG AAA compliant components
 */

// UI Components
export * from "./ui";

// Accessibility Components
export * from "./accessibility";

// Re-export commonly used components for convenience
export { ElderButton, type ElderButtonProps } from "./ui/elder-button";
export { ElderCard, type ElderCardProps } from "./ui/elder-card";
export { TestimonialCard, type TestimonialCardProps } from "./ui/testimonial-card";
export { TestimonialCarousel, type TestimonialCarouselProps } from "./ui/testimonial-carousel";
export { TextSizeControl, type TextSizeControlProps } from "./accessibility/text-size-control";
export { SkipLink, SkipLinks, type SkipLinkProps } from "./accessibility/skip-link";
