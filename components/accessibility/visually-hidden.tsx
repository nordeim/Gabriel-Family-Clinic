import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * VisuallyHidden Component - Hide content visually but keep accessible to screen readers
 * 
 * Features:
 * - Content hidden from visual display
 * - Accessible to screen readers
 * - Follows WCAG guidelines
 * - Can be made visible on focus (useful for skip links)
 */

export interface VisuallyHiddenProps {
  children: React.ReactNode;
  /** Make visible on focus (useful for interactive elements) */
  focusable?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function VisuallyHidden({
  children,
  focusable = false,
  className,
}: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "sr-only",
        focusable && "focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
