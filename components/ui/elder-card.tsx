"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, spacing, animation } from "@/lib/design-system";

/**
 * ElderCard Component - Elder-friendly card with glass-morphism design
 * 
 * Features:
 * - Glass-morphism effect with backdrop blur
 * - Semantic HTML structure (article or section)
 * - Proper heading hierarchy
 * - Generous padding for readability
 * - Hover and focus states
 * - WCAG AAA compliant
 */

const elderCardVariants = cva(
  // Base styles
  [
    "rounded-xl overflow-hidden",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white border border-gray-200",
          "shadow-md",
        ],
        elevated: [
          "bg-white",
          "shadow-lg hover:shadow-xl",
        ],
        outlined: [
          "bg-white border-2 border-primary-300",
        ],
        glass: [
          "bg-white/70 backdrop-blur-md",
          "border border-white/40",
          "shadow-lg",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hoverable: {
        true: "hover:scale-[1.01] hover:shadow-xl cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hoverable: false,
    },
  }
);

export interface ElderCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof elderCardVariants> {
  /** Semantic HTML element */
  as?: "article" | "section" | "div";
  /** Card header content */
  header?: React.ReactNode;
  /** Card title (renders as h2, h3, or h4) */
  title?: string;
  /** Title heading level */
  titleLevel?: "h2" | "h3" | "h4";
  /** Card footer content */
  footer?: React.ReactNode;
  /** Enable framer motion animations */
  animated?: boolean;
}

const ElderCard = React.forwardRef<HTMLElement, ElderCardProps>(
  (
    {
      className,
      variant,
      padding,
      hoverable,
      as: Component = "div",
      header,
      title,
      titleLevel = "h3",
      footer,
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    const TitleTag = titleLevel;
    
    const cardContent = (
      <>
        {(header || title) && (
          <div className="mb-4" style={{ marginBottom: spacing.scale[4] }}>
            {title && (
              <TitleTag
                className={cn(
                  "font-semibold",
                  titleLevel === "h2" && "text-3xl",
                  titleLevel === "h3" && "text-2xl",
                  titleLevel === "h4" && "text-xl"
                )}
                style={{
                  color: colors.text.primary,
                  lineHeight: "1.25",
                }}
              >
                {title}
              </TitleTag>
            )}
            {header}
          </div>
        )}
        
        {children && (
          <div
            className="card-content"
            style={{
              color: colors.text.secondary,
              lineHeight: "1.75",
            }}
          >
            {children}
          </div>
        )}
        
        {footer && (
          <div
            className="mt-4 pt-4 border-t border-gray-200"
            style={{ marginTop: spacing.scale[4], paddingTop: spacing.scale[4] }}
          >
            {footer}
          </div>
        )}
      </>
    );

    const cardClasses = cn(elderCardVariants({ variant, padding, hoverable, className }));

    if (animated) {
      return (
        <motion.div
          // @ts-ignore - motion div with custom component
          as={Component}
          ref={ref}
          className={cardClasses}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: parseFloat(animation.duration.normal) / 1000,
            ease: animation.easing.elderFriendly,
          }}
          {...props}
        >
          {cardContent}
        </motion.div>
      );
    }

    return (
      <Component
        ref={ref as any}
        className={cardClasses}
        {...props}
      >
        {cardContent}
      </Component>
    );
  }
);

ElderCard.displayName = "ElderCard";

export { ElderCard, elderCardVariants };
