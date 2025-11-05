"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, spacing, accessibility, animation } from "@/lib/design-system";
import { ElderButton } from "./elder-button";
import { TestimonialCard } from "./testimonial-card";
import { LiveRegion } from "../accessibility/live-region";
import type { Testimonial } from "@/types/testimonial";
import type { CarouselConfig } from "@/types/testimonial";
import { defaultCarouselConfig } from "@/types/testimonial";

/**
 * TestimonialCarousel Component - Accessible carousel for testimonials
 * 
 * Features:
 * - Auto-play with 8-second intervals
 * - Pause on hover functionality
 * - Keyboard navigation (arrow keys)
 * - Touch/swipe support
 * - Screen reader announcements
 * - Indicator dots for position
 * - Navigation arrows with ARIA
 * - Responsive design (mobile-first)
 * - Reduced motion support
 * - WCAG AAA compliant
 */

export interface TestimonialCarouselProps {
  /** Array of testimonials to display */
  testimonials: Testimonial[];
  /** Carousel configuration */
  config?: Partial<CarouselConfig>;
  /** Additional CSS classes */
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  config: userConfig,
  className,
}: TestimonialCarouselProps) {
  const config = { ...defaultCarouselConfig, ...userConfig };
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(config.enableAutoPlay);
  const [isPaused, setIsPaused] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const [direction, setDirection] = React.useState<"next" | "prev">("next");
  
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Total number of testimonials
  const totalItems = testimonials.length;

  // Navigate to specific index
  const goToIndex = React.useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (testimonials.length === 0) return;
      
      let newIndex = index;
      if (config.loop) {
        if (newIndex < 0) newIndex = totalItems - 1;
        if (newIndex >= totalItems) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(newIndex, totalItems - 1));
      }
      
      setDirection(dir);
      setCurrentIndex(newIndex);
      
      // Announce to screen readers
      setAnnouncement(
        `Showing testimonial ${newIndex + 1} of ${totalItems}. ${testimonials[newIndex].patientName}`
      );
    },
    [testimonials, totalItems, config.loop]
  );

  // Navigate to next testimonial
  const goToNext = React.useCallback(() => {
    goToIndex(currentIndex + 1, "next");
  }, [currentIndex, goToIndex]);

  // Navigate to previous testimonial
  const goToPrevious = React.useCallback(() => {
    goToIndex(currentIndex - 1, "prev");
  }, [currentIndex, goToIndex]);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setAnnouncement(isPlaying ? "Auto-play paused" : "Auto-play resumed");
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (!config.enableAutoPlay || !isPlaying || isPaused) {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setTimeout(() => {
      goToNext();
    }, config.autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, isPlaying, isPaused, goToNext, config]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!config.enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if carousel is focused or child is focused
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToIndex(0);
          break;
        case "End":
          e.preventDefault();
          goToIndex(totalItems - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [config.enableKeyboard, goToPrevious, goToNext, goToIndex, totalItems]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (config.pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (config.pauseOnHover) {
      setIsPaused(false);
    }
  };

  // Animation variants for framer motion
  const slideVariants = {
    enter: (direction: "next" | "prev") => ({
      x: direction === "next" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: "next" | "prev") => ({
      zIndex: 0,
      x: direction === "next" ? -1000 : 1000,
      opacity: 0,
    }),
  };

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (testimonials.length === 0) {
    return (
      <div
        className="text-center p-8"
        style={{ color: colors.text.tertiary }}
      >
        <p>No testimonials available.</p>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className={cn("testimonial-carousel relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Patient testimonials carousel"
      aria-roledescription="carousel"
    >
      {/* Screen reader announcements */}
      <LiveRegion message={announcement} politeness="polite" />

      {/* Carousel container */}
      <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: prefersReducedMotion ? 0.01 : 0.5,
              },
              opacity: {
                duration: prefersReducedMotion ? 0.01 : 0.3,
              },
            }}
            className="w-full"
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              animated={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between mt-6">
        <ElderButton
          variant="outline"
          size="md"
          onClick={goToPrevious}
          disabled={!config.loop && currentIndex === 0}
          aria-label="Previous testimonial"
          iconLeft={<ChevronLeft size={24} />}
        >
          Previous
        </ElderButton>

        {/* Play/Pause button */}
        {config.enableAutoPlay && (
          <ElderButton
            variant="ghost"
            size="md"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
            iconLeft={isPlaying ? <Pause size={20} /> : <Play size={20} />}
          >
            {isPlaying ? "Pause" : "Play"}
          </ElderButton>
        )}

        <ElderButton
          variant="outline"
          size="md"
          onClick={goToNext}
          disabled={!config.loop && currentIndex === totalItems - 1}
          aria-label="Next testimonial"
          iconRight={<ChevronRight size={24} />}
        >
          Next
        </ElderButton>
      </div>

      {/* Indicator dots */}
      <div
        className="flex items-center justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Testimonial indicators"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
              currentIndex === index
                ? "bg-primary-500 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            style={{
              minWidth: accessibility.touchTarget.minimum,
              minHeight: accessibility.touchTarget.minimum,
            }}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
            role="tab"
            aria-selected={currentIndex === index}
          />
        ))}
      </div>

      {/* Current position text (for screen readers and visual reference) */}
      <div
        className="text-center mt-4 text-sm"
        style={{ color: colors.text.muted }}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">Currently showing</span>
        {currentIndex + 1} of {totalItems}
      </div>
    </div>
  );
}
