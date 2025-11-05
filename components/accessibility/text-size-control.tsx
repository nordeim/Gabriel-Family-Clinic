"use client";

import * as React from "react";
import { Type, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors, spacing, accessibility } from "@/lib/design-system";

/**
 * TextSizeControl Component - Text size adjustment for elder-friendly reading
 * 
 * Features:
 * - Three size levels: normal (18px), large (22px), extra-large (26px)
 * - Persistent storage using localStorage
 * - Keyboard navigation (arrow keys)
 * - ARIA live announcements
 * - Visual indicators for current size
 * - Smooth transitions
 */

type TextSize = "normal" | "large" | "extra-large";

const TEXT_SIZE_CONFIG = {
  normal: {
    label: "Normal",
    value: "18px",
    scale: 1,
  },
  large: {
    label: "Large",
    value: "22px",
    scale: 1.22,
  },
  "extra-large": {
    label: "Extra Large",
    value: "26px",
    scale: 1.44,
  },
} as const;

const STORAGE_KEY = "gabriel-clinic-text-size";

export interface TextSizeControlProps {
  /** Initial text size */
  defaultSize?: TextSize;
  /** Callback when size changes */
  onSizeChange?: (size: TextSize) => void;
  /** Additional CSS classes */
  className?: string;
}

export function TextSizeControl({
  defaultSize = "normal",
  onSizeChange,
  className,
}: TextSizeControlProps) {
  const [currentSize, setCurrentSize] = React.useState<TextSize>(defaultSize);
  const [announcement, setAnnouncement] = React.useState<string>("");

  // Load saved text size from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as TextSize | null;
      if (saved && saved in TEXT_SIZE_CONFIG) {
        setCurrentSize(saved);
        applyTextSize(saved);
      }
    } catch (error) {
      console.error("Failed to load text size preference:", error);
    }
  }, []);

  // Apply text size to document root
  const applyTextSize = React.useCallback((size: TextSize) => {
    const config = TEXT_SIZE_CONFIG[size];
    document.documentElement.style.fontSize = config.value;
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, size);
    } catch (error) {
      console.error("Failed to save text size preference:", error);
    }

    // Announce to screen readers
    setAnnouncement(`Text size changed to ${config.label}`);
    
    // Callback
    onSizeChange?.(size);
  }, [onSizeChange]);

  const handleSizeChange = (newSize: TextSize) => {
    setCurrentSize(newSize);
    applyTextSize(newSize);
  };

  const increase = () => {
    const sizes: TextSize[] = ["normal", "large", "extra-large"];
    const currentIndex = sizes.indexOf(currentSize);
    if (currentIndex < sizes.length - 1) {
      handleSizeChange(sizes[currentIndex + 1]);
    }
  };

  const decrease = () => {
    const sizes: TextSize[] = ["normal", "large", "extra-large"];
    const currentIndex = sizes.indexOf(currentSize);
    if (currentIndex > 0) {
      handleSizeChange(sizes[currentIndex - 1]);
    }
  };

  const reset = () => {
    handleSizeChange("normal");
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "ArrowRight":
        e.preventDefault();
        increase();
        break;
      case "ArrowDown":
      case "ArrowLeft":
        e.preventDefault();
        decrease();
        break;
      case "Home":
        e.preventDefault();
        reset();
        break;
    }
  };

  return (
    <div
      className={cn("inline-flex items-center gap-2 p-2 rounded-lg border-2 border-gray-300 bg-white", className)}
      role="group"
      aria-label="Text size controls"
      onKeyDown={handleKeyDown}
      style={{
        minHeight: accessibility.touchTarget.recommended,
      }}
    >
      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Decrease button */}
      <button
        onClick={decrease}
        disabled={currentSize === "normal"}
        aria-label="Decrease text size"
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        style={{
          minWidth: accessibility.touchTarget.minimum,
          minHeight: accessibility.touchTarget.minimum,
        }}
      >
        <Minus size={20} />
      </button>

      {/* Current size indicator */}
      <div className="flex items-center gap-2 px-3">
        <Type size={24} aria-hidden="true" />
        <span className="font-medium text-base whitespace-nowrap">
          {TEXT_SIZE_CONFIG[currentSize].label}
        </span>
      </div>

      {/* Increase button */}
      <button
        onClick={increase}
        disabled={currentSize === "extra-large"}
        aria-label="Increase text size"
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        style={{
          minWidth: accessibility.touchTarget.minimum,
          minHeight: accessibility.touchTarget.minimum,
        }}
      >
        <Plus size={20} />
      </button>

      {/* Visual size indicators */}
      <div className="flex gap-1 ml-2 pl-2 border-l-2 border-gray-300">
        {(["normal", "large", "extra-large"] as TextSize[]).map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            aria-label={`Set text size to ${TEXT_SIZE_CONFIG[size].label}`}
            aria-pressed={currentSize === size}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSize === size
                ? "bg-primary-500 ring-2 ring-primary-300"
                : "bg-gray-300 hover:bg-gray-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            )}
            style={{
              minWidth: accessibility.touchTarget.minimum,
              minHeight: accessibility.touchTarget.minimum,
            }}
          />
        ))}
      </div>
    </div>
  );
}
