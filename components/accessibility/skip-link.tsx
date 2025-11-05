"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { colors, spacing } from "@/lib/design-system";

/**
 * SkipLink Component - Skip navigation for keyboard users
 * 
 * Features:
 * - Hidden by default, visible on keyboard focus
 * - High contrast styling
 * - Links to main content area
 * - WCAG AAA compliant
 * - Prominent visual indicator
 */

export interface SkipLinkProps {
  /** ID of the main content area to skip to */
  href?: string;
  /** Link text */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        // Positioning - absolute, off-screen by default
        "absolute left-[-9999px] top-0 z-[9999]",
        // Visible styles (when focused)
        "focus:fixed focus:left-4 focus:top-4",
        // Appearance
        "inline-block px-6 py-3 rounded-lg",
        "font-semibold text-base",
        "transition-all duration-200",
        // High contrast
        "bg-primary-600 text-white",
        "focus:outline-none focus:ring-4 focus:ring-primary-300",
        // Ensure it's above everything
        "focus:shadow-2xl",
        className
      )}
      style={{
        minHeight: spacing.accessibility.minTouchTarget,
        backgroundColor: colors.primary[600],
        color: colors.text.inverse,
      }}
    >
      {children}
    </a>
  );
}

/**
 * SkipLinks Component - Multiple skip navigation links
 * 
 * Provides skip links to multiple page sections
 */

export interface SkipLinksProps {
  /** Array of skip link configurations */
  links?: Array<{
    href: string;
    label: string;
  }>;
  /** Additional CSS classes */
  className?: string;
}

export function SkipLinks({
  links = [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#footer", label: "Skip to footer" },
  ],
  className,
}: SkipLinksProps) {
  return (
    <div
      className={cn("skip-links", className)}
      role="navigation"
      aria-label="Skip navigation links"
    >
      {links.map((link) => (
        <SkipLink key={link.href} href={link.href}>
          {link.label}
        </SkipLink>
      ))}
    </div>
  );
}
