'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  stagger?: boolean;
  childrenCount?: number;
}

const directionVariants = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  threshold = 0.1,
  className = '',
  stagger = false,
  childrenCount = 1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getInitialPosition = () => {
    const baseDirection = directionVariants[direction];
    return {
      x: baseDirection.x * (distance / 40),
      y: baseDirection.y * (distance / 40),
    };
  };

  const getVariants = () => ({
    hidden: {
      ...getInitialPosition(),
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.4, 0.0, 0.2, 1],
        ...(stagger && {
          staggerChildren: shouldReduceMotion ? 0 : 0.05,
          delayChildren: delay,
        }),
      },
    },
  });

  const variants = getVariants();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      ...getInitialPosition(),
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration * 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  // If stagger is true, we need to wrap children with motion variants
  if (stagger && React.Children.count(children) > 1) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;