"use client";

import * as React from "react";
import { Star, CheckCircle, User } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, spacing, typography } from "@/lib/design-system";
import { ElderCard } from "./elder-card";
import type { Testimonial } from "@/types/testimonial";

/**
 * TestimonialCard Component - Display patient testimonials with ratings
 * 
 * Features:
 * - Patient information (name, condition)
 * - 5-star rating display
 * - Testimonial text with proper typography
 * - Doctor/provider information
 * - Verified badge
 * - Elder-friendly design
 * - WCAG AAA compliant
 */

const testimonialCardVariants = cva(
  "testimonial-card",
  {
    variants: {
      variant: {
        standard: "",
        compact: "text-sm",
        featured: "border-2 border-primary-400",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

export interface TestimonialCardProps
  extends VariantProps<typeof testimonialCardVariants> {
  /** Testimonial data */
  testimonial: Testimonial;
  /** Additional CSS classes */
  className?: string;
  /** Enable animation */
  animated?: boolean;
}

/**
 * StarRating Component - Display rating as stars
 */
function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={cn(
            "transition-colors",
            star <= rating
              ? "fill-warning-500 text-warning-500"
              : "fill-gray-300 text-gray-300"
          )}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </div>
  );
}

export function TestimonialCard({
  testimonial,
  variant,
  className,
  animated = true,
}: TestimonialCardProps) {
  const {
    patientName,
    condition,
    rating,
    text,
    treatmentDate,
    doctorName,
    doctorTitle,
    avatar,
    verified,
    location,
  } = testimonial;

  // Format treatment date
  const formattedDate = new Date(treatmentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const cardContent = (
    <ElderCard
      as="article"
      variant="elevated"
      padding="lg"
      className={cn(testimonialCardVariants({ variant }), className)}
      animated={animated}
    >
      {/* Header: Patient info and rating */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"
            aria-hidden="true"
          >
            {avatar ? (
              <img
                src={avatar}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={24} className="text-primary-600" />
            )}
          </div>

          {/* Patient name and condition */}
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-lg"
                style={{ color: colors.text.primary }}
              >
                {patientName}
              </h3>
              {verified && (
                <CheckCircle
                  size={16}
                  className="text-success-500"
                  aria-label="Verified testimonial"
                />
              )}
            </div>
            <p
              className="text-sm"
              style={{ color: colors.text.secondary }}
            >
              {condition}
            </p>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={rating} />
      </div>

      {/* Testimonial text */}
      <blockquote
        className="mb-4 text-base leading-relaxed"
        style={{
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        <p className="before:content-['\201C'] after:content-['\201D'] italic">
          {text}
        </p>
      </blockquote>

      {/* Footer: Doctor and date */}
      <footer className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div style={{ color: colors.text.tertiary }}>
            <p className="font-medium">
              {doctorName}
              {doctorTitle && `, ${doctorTitle}`}
            </p>
            {location && (
              <p className="text-xs mt-1">{location}</p>
            )}
          </div>
          <time
            dateTime={treatmentDate}
            className="text-xs"
            style={{ color: colors.text.muted }}
          >
            {formattedDate}
          </time>
        </div>
      </footer>
    </ElderCard>
  );

  return cardContent;
}

export { testimonialCardVariants };
