'use client';

import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface EnhancedFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
  ariaDescribedBy?: string;
  autoComplete?: string;
  maxLength?: number;
  className?: string;
}

const fieldVariants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  focus: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const labelVariants = {
  normal: {
    y: 0,
    scale: 1,
    color: '#6B7280'
  },
  focused: {
    y: -2,
    scale: 0.85,
    color: '#0891B2'
  },
  filled: {
    y: -2,
    scale: 0.85,
    color: '#0891B2'
  }
};

const inputVariants = {
  normal: {
    borderColor: '#D1D5DB',
    boxShadow: '0 0 0 0px rgba(8, 145, 178, 0)'
  },
  focused: {
    borderColor: '#0891B2',
    boxShadow: '0 0 0 3px rgba(8, 145, 178, 0.1)'
  },
  error: {
    borderColor: '#FF6B6B',
    boxShadow: '0 0 0 3px rgba(255, 107, 107, 0.1)'
  },
  success: {
    borderColor: '#10B981',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
  }
};

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
    rotate: -180 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

export const EnhancedFormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, EnhancedFormFieldProps>(
  ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    success = false,
    required = false,
    disabled = false,
    showPasswordToggle = false,
    icon,
    ariaDescribedBy,
    autoComplete,
    maxLength,
    className = '',
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);

    const hasValue = value.length > 0;
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const shouldFloatLabel = isFocused || hasValue;

    const currentInputType = type === 'password' && showPassword ? 'text' : type;

    useEffect(() => {
      // Auto-focus if there's an error
      if (hasError && inputRef.current) {
        inputRef.current.focus();
      }
    }, [hasError]);

    const handleFocus = () => {
      setIsFocused(true);
      if (fieldRef.current) {
        fieldRef.current.style.transform = 'scale(1.02)';
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (fieldRef.current) {
        fieldRef.current.style.transform = 'scale(1)';
      }
      onBlur?.();
    };

    const getInputState = () => {
      if (hasError) return 'error';
      if (hasSuccess) return 'success';
      if (isFocused) return 'focused';
      return 'normal';
    };

    const getInputClasses = () => {
      const baseClasses = `
        w-full px-4 py-3 text-neutral-900 bg-white border-2 rounded-lg
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-0
        disabled:bg-neutral-100 disabled:cursor-not-allowed
        ${icon ? 'pl-12' : ''}
        ${hasError ? 'pr-12' : ''}
        ${hasSuccess ? 'pr-12' : ''}
      `;
      
      return baseClasses;
    };

    return (
      <motion.div
        ref={fieldRef}
        className={`relative group ${className}`}
        initial="hidden"
        animate="visible"
        variants={fieldVariants}
      >
        {/* Floating Label */}
        <motion.label
          htmlFor={name}
          className={`
            absolute left-4 pointer-events-none select-none
            font-medium transition-all duration-200 ease-out
            ${icon ? 'left-12' : 'left-4'}
            ${hasError ? 'text-red-500' : hasSuccess ? 'text-green-500' : 'text-neutral-500'}
          `}
          style={{
            top: shouldFloatLabel ? '8px' : '50%',
            transform: shouldFloatLabel ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: shouldFloatLabel ? '14px' : '16px'
          }}
          animate={shouldFloatLabel ? 'filled' : 'normal'}
          variants={labelVariants}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </motion.label>

        {/* Input Container */}
        <div className="relative">
          {/* Leading Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-200">
              {icon}
            </div>
          )}

          {/* Input Field */}
          {type === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={shouldFloatLabel ? placeholder : ''}
              disabled={disabled}
              autoComplete={autoComplete}
              maxLength={maxLength}
              aria-invalid={hasError}
              aria-describedby={ariaDescribedBy}
              className={`${getInputClasses()} min-h-[120px] resize-none`}
              rows={4}
              {...props}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              id={name}
              name={name}
              type={currentInputType}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={shouldFloatLabel ? placeholder : ''}
              disabled={disabled}
              autoComplete={autoComplete}
              maxLength={maxLength}
              aria-invalid={hasError}
              aria-describedby={ariaDescribedBy}
              className={getInputClasses()}
              {...props}
            />
          )}

          {/* Status Icons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <AnimatePresence>
              {hasError && (
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
              {hasSuccess && (
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Password Toggle */}
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus:text-primary-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-red-500 text-sm font-medium"
              id={ariaDescribedBy}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

EnhancedFormField.displayName = 'EnhancedFormField';