'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Download, Mail, Phone } from 'lucide-react';

interface FormSuccessProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  showDownloadButton?: boolean;
  onDownload?: () => void;
  showEmailButton?: boolean;
  onEmail?: () => void;
  showCallButton?: boolean;
  onCall?: () => void;
  autoCloseMs?: number;
  className?: string;
}

const successVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -180,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotate: 45,
    y: -100,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.7 + custom * 0.1,
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const particleVariants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: (custom: { x: number; y: number; delay: number }) => ({
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    x: custom.x,
    y: custom.y,
    transition: {
      duration: 1,
      delay: custom.delay,
      ease: [0.4, 0.0, 0.2, 1]
    }
  })
};

export const FormSuccess: React.FC<FormSuccessProps> = ({
  isVisible,
  onClose,
  title = "Success!",
  message = "Your form has been submitted successfully.",
  showDownloadButton = false,
  onDownload,
  showEmailButton = false,
  onEmail,
  showCallButton = false,
  onCall,
  autoCloseMs,
  className = ''
}) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate floating particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);

      // Auto-close if specified
      if (autoCloseMs) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseMs);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoCloseMs, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Success Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-description"
          >
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-60"
                  variants={particleVariants}
                  custom={particle}
                  initial="hidden"
                  animate="visible"
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
              aria-label="Close success message"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 text-center relative z-10">
              {/* Success Icon */}
              <motion.div
                className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
              </motion.div>

              {/* Title and Message */}
              <motion.div variants={contentVariants}>
                <h2
                  id="success-title"
                  className="text-2xl font-bold text-neutral-900 mb-3"
                >
                  {title}
                </h2>
                <p
                  id="success-description"
                  className="text-neutral-600 mb-8 leading-relaxed"
                >
                  {message}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
              >
                {showDownloadButton && (
                  <motion.button
                    variants={buttonVariants}
                    custom={0}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={onDownload}
                    className="w-full flex items-center justify-center gap-3 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Confirmation
                  </motion.button>
                )}

                {showEmailButton && (
                  <motion.button
                    variants={buttonVariants}
                    custom={1}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={onEmail}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Confirmation
                  </motion.button>
                )}

                {showCallButton && (
                  <motion.button
                    variants={buttonVariants}
                    custom={2}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={onCall}
                    className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </motion.button>
                )}

                {/* Close Button */}
                <motion.button
                  variants={buttonVariants}
                  custom={3}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onClose}
                  className="w-full bg-neutral-100 text-neutral-700 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                >
                  Continue
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSuccess;