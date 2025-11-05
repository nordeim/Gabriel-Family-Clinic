"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors, spacing, accessibility, animation } from "@/lib/design-system";

/**
 * ElderButton Component - Elder-friendly, WCAG AAA compliant button
 * 
 * Features:
 * - Minimum 44px touch targets (WCAG AAA)
 * - High contrast focus indicators
 * - Loading and disabled states
 * - Multiple variants and sizes
 * - Keyboard accessible
 * - Screen reader optimized
 */

const elderButtonVariants = cva(
  // Base styles - shared by all variants
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-lg font-semibold transition-all",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-500 text-text-inverse",
          "hover:bg-primary-600",
          "focus-visible:ring-primary-500",
          "shadow-md hover:shadow-lg",
        ],
        secondary: [
          "bg-secondary-500 text-text-inverse",
          "hover:bg-secondary-600",
          "focus-visible:ring-secondary-500",
          "shadow-md hover:shadow-lg",
        ],
        outline: [
          "border-2 border-primary-500 text-primary-700",
          "hover:bg-primary-50",
          "focus-visible:ring-primary-500",
        ],
        ghost: [
          "text-primary-700",
          "hover:bg-primary-50",
          "focus-visible:ring-primary-500",
        ],
        destructive: [
          "bg-error-500 text-text-inverse",
          "hover:bg-error-600",
          "focus-visible:ring-error-500",
          "shadow-md hover:shadow-lg",
        ],
      },
      size: {
        sm: "h-[40px] min-w-[40px] px-4 text-sm", // 40px minimum for small
        md: "h-[48px] min-w-[48px] px-6 text-base", // 48px recommended
        lg: "h-[56px] min-w-[56px] px-8 text-lg", // 56px large
        xl: "h-[64px] min-w-[64px] px-10 text-xl", // 64px extra large
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ElderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof elderButtonVariants> {
  /** Render as child component (for composition) */
  asChild?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Icon to display before text */
  iconLeft?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
}

const ElderButton = React.forwardRef<HTMLButtonElement, ElderButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(elderButtonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        style={{
          minHeight: spacing.accessibility.minTouchTarget,
        }}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin"
            size={size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28}
            aria-hidden="true"
          />
        )}
        {!loading && iconLeft && (
          <span className="inline-flex" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <span>{children}</span>
        {!loading && iconRight && (
          <span className="inline-flex" aria-hidden="true">
            {iconRight}
          </span>
        )}
        {loading && <span className="sr-only">Loading...</span>}
      </Comp>
    );
  }
);

ElderButton.displayName = "ElderButton";

export { ElderButton, elderButtonVariants };
