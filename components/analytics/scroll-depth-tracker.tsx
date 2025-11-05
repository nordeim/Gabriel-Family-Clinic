"use client";

import { useEffect, useRef, useCallback } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * Scroll Depth Tracker
 * Tracks user scroll behavior for engagement analytics
 * Particularly important for elderly users to understand engagement patterns
 */
export function useScrollDepthTracking() {
  const depthsTracked = useRef<Set<number>>(new Set());
  const scrollThresholds = [25, 50, 75, 90, 100];

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

    // Track each threshold once
    scrollThresholds.forEach((threshold) => {
      if (scrollPercentage >= threshold && !depthsTracked.current.has(threshold)) {
        depthsTracked.current.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  }, []);

  useEffect(() => {
    // Throttle scroll events for performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);
}

/**
 * Scroll Depth Tracker Component
 * Drop this component into your page to enable scroll tracking
 */
export function ScrollDepthTracker() {
  useScrollDepthTracking();
  return null;
}
