'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Phone, 
  MapPin, 
  Heart, 
  User,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface EnhancedNavigationProps {
  items: NavigationItem[];
  currentSection?: string;
  onItemClick?: (href: string) => void;
  className?: string;
}

const navVariants = {
  hidden: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    }
  })
};

const activeIndicatorVariants = {
  inactive: {
    width: 0,
    opacity: 0
  },
  active: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

export const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  items,
  currentSection,
  onItemClick,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      const showTop = window.scrollY > 500;
      
      setIsScrolled(scrolled);
      setShowScrollTop(showTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleItemClick = (href: string) => {
    onItemClick?.(href);
    setIsOpen(false);
  };

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
    ${isScrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
      : 'bg-transparent'
    }
    ${className}
  `;

  return (
    <>
      <motion.nav
        ref={navRef}
        className={navClasses}
        variants={shouldReduceMotion ? undefined : navVariants}
        initial="hidden"
        animate="visible"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Heart className="w-8 h-8 text-primary-600" />
                <motion.div
                  className="absolute inset-0 text-primary-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                >
                  <Heart className="w-8 h-8" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-neutral-900">
                  Gabriel Family Clinic
                </h1>
                <p className="text-xs lg:text-sm text-neutral-600 hidden sm:block">
                  Senior Healthcare Excellence
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {items.map((item, index) => {
                const isActive = currentSection === item.href.replace('#', '');
                
                return (
                  <motion.div
                    key={item.href}
                    className="relative"
                    variants={shouldReduceMotion ? undefined : itemVariants}
                    custom={index}
                  >
                    <a
                      href={item.href}
                      onClick={() => handleItemClick(item.href)}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                        transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                        ${isActive 
                          ? 'text-primary-600 bg-primary-50' 
                          : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.icon && (
                        <span aria-hidden="true">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                      
                      {/* Active indicator */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary-600 rounded-full"
                        variants={shouldReduceMotion ? undefined : activeIndicatorVariants}
                        animate={isActive ? 'active' : 'inactive'}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Button (Desktop) */}
            <motion.div
              className="hidden lg:flex items-center gap-4"
              variants={shouldReduceMotion ? undefined : itemVariants}
              custom={items.length}
            >
              <motion.a
                href="tel:+14155550123"
                className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Call Gabriel Family Clinic"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">6269 6681</span>
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500
                ${isOpen ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'}
              `}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/50"
              variants={shouldReduceMotion ? undefined : mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const isActive = currentSection === item.href.replace('#', '');
                    
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={() => handleItemClick(item.href)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                          transition-all duration-200 ease-out
                          focus:outline-none focus:ring-2 focus:ring-primary-500
                          ${isActive 
                            ? 'text-primary-600 bg-primary-50' 
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                          }
                        `}
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        custom={index}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.icon && (
                          <span aria-hidden="true">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                        
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                  
                  {/* Mobile Contact */}
                  <motion.div
                    className="pt-4 mt-4 border-t border-neutral-200"
                    variants={shouldReduceMotion ? undefined : itemVariants}
                    custom={items.length}
                  >
                    <a
                      href="tel:+6562696681"
                      className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Phone className="w-5 h-5" />
                      <div>
                        <div className="font-medium">6269 6681</div>
                        <div className="text-sm text-neutral-500">Call us now</div>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavigation;