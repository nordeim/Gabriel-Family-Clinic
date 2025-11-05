/**
 * Testimonial Type Definitions
 * For Gabriel Family Clinic patient testimonials
 */

/**
 * Star rating for testimonials (1-5)
 */
export type Rating = 1 | 2 | 3 | 4 | 5;

/**
 * Testimonial interface
 */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  
  /** Patient name (can be anonymized, e.g., "Sarah M.") */
  patientName: string;
  
  /** Medical condition or reason for treatment */
  condition: string;
  
  /** Star rating (1-5) */
  rating: Rating;
  
  /** Testimonial content/quote */
  text: string;
  
  /** Treatment date (ISO format) */
  treatmentDate: string;
  
  /** Doctor/provider name */
  doctorName: string;
  
  /** Doctor's title (optional) */
  doctorTitle?: string;
  
  /** Patient avatar URL (optional) */
  avatar?: string;
  
  /** Verified testimonial flag */
  verified: boolean;
  
  /** Location (optional) */
  location?: string;
}

/**
 * Carousel configuration options
 */
export interface CarouselConfig {
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  
  /** Enable auto-play */
  enableAutoPlay?: boolean;
  
  /** Pause on hover */
  pauseOnHover?: boolean;
  
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  
  /** Enable touch/swipe */
  enableTouch?: boolean;
  
  /** Number of testimonials to show at once */
  itemsPerView?: number;
  
  /** Enable infinite loop */
  loop?: boolean;
}

/**
 * Default carousel configuration
 */
export const defaultCarouselConfig: Required<CarouselConfig> = {
  autoPlayInterval: 8000, // 8 seconds
  enableAutoPlay: true,
  pauseOnHover: true,
  enableKeyboard: true,
  enableTouch: true,
  itemsPerView: 1,
  loop: true,
};
