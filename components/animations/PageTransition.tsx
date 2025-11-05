'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'scale';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
}

const pageVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: (direction: string) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: string) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
    }),
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  direction = 'right',
  duration = 0.3,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.4, 0.0, 0.2, 1],
  };

  const variants = pageVariants[type];

  // For slide animations, we need to handle direction
  const slideVariants = type === 'slide' ? {
    initial: (direction: string) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: string) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
    }),
  } : variants;

  const currentVariants = type === 'slide' ? slideVariants : variants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'server'}
        initial={shouldReduceMotion ? currentVariants.animate : currentVariants.initial}
        animate={currentVariants.animate}
        exit={shouldReduceMotion ? currentVariants.animate : currentVariants.exit}
        transition={transitionConfig}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;