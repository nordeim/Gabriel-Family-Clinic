"use client";

import * as React from "react";

/**
 * FocusManager - Global focus management for accessibility
 * 
 * Features:
 * - Focus trap for modals and dialogs
 * - Focus restoration
 * - Tab order management
 * - Keyboard event handling
 */

interface FocusManagerProps {
  children: React.ReactNode;
  /** Enable focus trap */
  trap?: boolean;
  /** Restore focus on unmount */
  restoreFocus?: boolean;
  /** Initial focus element selector */
  initialFocus?: string;
}

export function FocusManager({
  children,
  trap = false,
  restoreFocus = true,
  initialFocus,
}: FocusManagerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Save previous focus
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Set initial focus
    if (initialFocus) {
      const element = containerRef.current.querySelector(initialFocus) as HTMLElement;
      element?.focus();
    }

    // Focus trap implementation
    if (trap) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !containerRef.current) return;

        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        
        // Restore focus
        if (restoreFocus && previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [trap, restoreFocus, initialFocus]);

  return (
    <div ref={containerRef} className="focus-manager">
      {children}
    </div>
  );
}
