"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * LiveRegion Component - ARIA live region for dynamic content announcements
 * 
 * Features:
 * - Screen reader announcements
 * - Polite and assertive modes
 * - Atomic announcements
 * - Auto-clear functionality
 */

export interface LiveRegionProps {
  /** Message to announce */
  message?: string;
  /** Politeness level */
  politeness?: "polite" | "assertive";
  /** Atomic announcement */
  atomic?: boolean;
  /** Auto-clear message after delay (ms) */
  clearDelay?: number;
  /** Additional CSS classes */
  className?: string;
}

export function LiveRegion({
  message = "",
  politeness = "polite",
  atomic = true,
  clearDelay,
  className,
}: LiveRegionProps) {
  const [currentMessage, setCurrentMessage] = React.useState(message);

  React.useEffect(() => {
    setCurrentMessage(message);

    if (clearDelay && message) {
      const timer = setTimeout(() => {
        setCurrentMessage("");
      }, clearDelay);

      return () => clearTimeout(timer);
    }
  }, [message, clearDelay]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className={cn("sr-only", className)}
    >
      {currentMessage}
    </div>
  );
}

/**
 * useLiveRegion Hook - Hook for managing live region announcements
 */
export function useLiveRegion(clearDelay = 3000) {
  const [message, setMessage] = React.useState("");

  const announce = React.useCallback(
    (newMessage: string) => {
      setMessage(newMessage);

      if (clearDelay) {
        setTimeout(() => {
          setMessage("");
        }, clearDelay);
      }
    },
    [clearDelay]
  );

  return { message, announce };
}
